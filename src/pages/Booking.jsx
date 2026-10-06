import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useBookings } from '../context/BookingContext'
import { destinations } from '../data/destinations'
import { packages } from '../data/packages'
import { firstError, todayISO, validateBooking } from '../utils/validation'

export default function Booking() {
  const { currentUser } = useAuth()
  const { saveDraft } = useBookings()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const preselect = params.get('packageId') || ''

  const [form, setForm] = useState({
    packageId: preselect,
    destination: '',
    date: '',
    travelers: '1',
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
  })
  const [fieldErrors, setFieldErrors] = useState({})
  const [banner, setBanner] = useState({ type: '', text: '' })

  const selected = useMemo(
    () => packages.find((p) => p.id === form.packageId) || null,
    [form.packageId],
  )

  useEffect(() => {
    if (selected) {
      setForm((f) => ({ ...f, destination: selected.destination }))
    }
  }, [selected])

  const total = selected ? selected.price * Math.max(0, Number(form.travelers) || 0) : 0

  function onChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  function onSubmit(e) {
    e.preventDefault()
    const errors = validateBooking({
      ...form,
      capacity: selected?.capacity,
    })
    setFieldErrors(errors)
    if (Object.keys(errors).length) {
      setBanner({ type: 'error', text: firstError(errors) })
      return
    }
    const draft = {
      packageId: selected.id,
      packageName: selected.name,
      destination: form.destination,
      date: form.date,
      travelers: Number(form.travelers),
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      unitPrice: selected.price,
      amount: selected.price * Number(form.travelers),
      capacity: selected.capacity,
    }
    saveDraft(draft)
    setBanner({
      type: 'success',
      text: `Booking details valid. Total: $${draft.amount}. Continue to payment.`,
    })
    setTimeout(() => navigate('/payment'), 600)
  }

  return (
    <div className="section form-page">
      <div className="section-head">
        <div>
          <p className="eyebrow">Secure your dates</p>
          <h1>Book a package</h1>
        </div>
      </div>

      {banner.type === 'error' && banner.text ? (
        <div className="alert error" id="booking-error" role="alert">
          {banner.text}
        </div>
      ) : (
        <div id="booking-error" className="alert error hidden" />
      )}
      {banner.type === 'success' ? (
        <div className="alert success" id="booking-success" role="status">
          {banner.text}
        </div>
      ) : (
        <div id="booking-success" className="alert success hidden" />
      )}

      <form className="panel form-grid" onSubmit={onSubmit} noValidate id="booking-form">
        <div>
          <label htmlFor="booking-package">Package</label>
          <select id="booking-package" name="packageId" value={form.packageId} onChange={onChange}>
            <option value="">Select a package</option>
            {packages.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} — {p.destination} (${p.price}, cap {p.capacity})
              </option>
            ))}
          </select>
          {fieldErrors.packageId ? <p className="field-error">{fieldErrors.packageId}</p> : null}
        </div>

        <div>
          <label htmlFor="booking-destination">Destination</label>
          <input
            id="booking-destination"
            name="destination"
            list="destination-options"
            value={form.destination}
            onChange={onChange}
          />
          <datalist id="destination-options">
            {destinations.map((d) => (
              <option key={d.id} value={d.name} />
            ))}
          </datalist>
          {fieldErrors.destination ? <p className="field-error">{fieldErrors.destination}</p> : null}
        </div>

        <div>
          <label htmlFor="booking-date">Travel date</label>
          <input
            id="booking-date"
            name="date"
            type="date"
            min={todayISO()}
            value={form.date}
            onChange={onChange}
          />
          {fieldErrors.date ? <p className="field-error">{fieldErrors.date}</p> : null}
        </div>

        <div>
          <label htmlFor="booking-travelers">Travelers</label>
          <input
            id="booking-travelers"
            name="travelers"
            type="number"
            min="0"
            step="1"
            value={form.travelers}
            onChange={onChange}
          />
          {selected ? (
            <p className="hint">
              Capacity for this package: <span id="booking-capacity">{selected.capacity}</span>
            </p>
          ) : null}
          {fieldErrors.travelers ? <p className="field-error">{fieldErrors.travelers}</p> : null}
        </div>

        <div>
          <label htmlFor="booking-name">Full name</label>
          <input id="booking-name" name="name" value={form.name} onChange={onChange} />
          {fieldErrors.name ? <p className="field-error">{fieldErrors.name}</p> : null}
        </div>

        <div>
          <label htmlFor="booking-email">Email</label>
          <input id="booking-email" name="email" type="email" value={form.email} onChange={onChange} />
          {fieldErrors.email ? <p className="field-error">{fieldErrors.email}</p> : null}
        </div>

        <div>
          <label htmlFor="booking-phone">Phone</label>
          <input id="booking-phone" name="phone" value={form.phone} onChange={onChange} placeholder="10-15 digits" />
          {fieldErrors.phone ? <p className="field-error">{fieldErrors.phone}</p> : null}
        </div>

        <div className="total-box" id="booking-total">
          Estimated total: <strong>${Number.isFinite(total) ? total : 0}</strong>
        </div>

        <button type="submit" className="btn gold" id="booking-submit">
          Continue to payment
        </button>
      </form>
    </div>
  )
}
