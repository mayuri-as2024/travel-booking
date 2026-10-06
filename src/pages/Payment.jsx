import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useBookings } from '../context/BookingContext'
import { DEMO_CARD, firstError, validatePayment } from '../utils/validation'

export default function Payment() {
  const { pending, confirmPayment } = useBookings()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    cardholder: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  })
  const [fieldErrors, setFieldErrors] = useState({})
  const [banner, setBanner] = useState({ type: '', text: '' })
  const [bookingId, setBookingId] = useState('')

  function onChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  function onSubmit(e) {
    e.preventDefault()
    if (!pending) {
      setBanner({ type: 'error', text: 'No booking found. Please complete the booking form first.' })
      return
    }
    const errors = validatePayment(form)
    setFieldErrors(errors)
    if (Object.keys(errors).length) {
      setBanner({ type: 'error', text: firstError(errors) })
      return
    }
    const result = confirmPayment()
    if (!result.ok) {
      setBanner({ type: 'error', text: result.message })
      return
    }
    setBookingId(result.booking.id)
    setBanner({
      type: 'success',
      text: `Payment successful. Booking ID: ${result.booking.id}`,
    })
    setTimeout(() => navigate('/bookings'), 1200)
  }

  return (
    <div className="section form-page">
      <div className="section-head">
        <div>
          <p className="eyebrow">Demo checkout</p>
          <h1>Payment</h1>
          <p className="muted">
            Valid demo card: <strong>{DEMO_CARD}</strong> · any future MM/YY · any 3-digit CVV
          </p>
        </div>
      </div>

      {pending ? (
        <div className="panel summary" id="payment-summary">
          <p>
            <strong>{pending.packageName}</strong> · {pending.destination}
          </p>
          <p>
            {pending.date} · {pending.travelers} traveler(s)
          </p>
          <p className="price">Amount due: ${pending.amount}</p>
        </div>
      ) : (
        <div className="alert error" id="payment-missing">
          No pending booking.{' '}
          <Link to="/booking">Go to booking</Link>
        </div>
      )}

      {banner.type === 'error' && banner.text ? (
        <div className="alert error" id="payment-error" role="alert">
          {banner.text}
        </div>
      ) : (
        <div id="payment-error" className="alert error hidden" />
      )}
      {banner.type === 'success' ? (
        <div className="alert success" id="payment-success" role="status">
          {banner.text}
          {bookingId ? (
            <span id="payment-booking-id">
              {' '}
              ({bookingId})
            </span>
          ) : null}
        </div>
      ) : (
        <div id="payment-success" className="alert success hidden" />
      )}

      <form className="panel form-grid" onSubmit={onSubmit} noValidate id="payment-form">
        <div>
          <label htmlFor="payment-cardholder">Cardholder name</label>
          <input id="payment-cardholder" name="cardholder" value={form.cardholder} onChange={onChange} />
          {fieldErrors.cardholder ? <p className="field-error">{fieldErrors.cardholder}</p> : null}
        </div>
        <div>
          <label htmlFor="payment-card-number">Card number</label>
          <input
            id="payment-card-number"
            name="cardNumber"
            inputMode="numeric"
            placeholder="4111111111111111"
            value={form.cardNumber}
            onChange={onChange}
          />
          {fieldErrors.cardNumber ? <p className="field-error">{fieldErrors.cardNumber}</p> : null}
        </div>
        <div>
          <label htmlFor="payment-expiry">Expiry (MM/YY)</label>
          <input
            id="payment-expiry"
            name="expiry"
            placeholder="12/28"
            value={form.expiry}
            onChange={onChange}
          />
          {fieldErrors.expiry ? <p className="field-error">{fieldErrors.expiry}</p> : null}
        </div>
        <div>
          <label htmlFor="payment-cvv">CVV</label>
          <input id="payment-cvv" name="cvv" inputMode="numeric" value={form.cvv} onChange={onChange} />
          {fieldErrors.cvv ? <p className="field-error">{fieldErrors.cvv}</p> : null}
        </div>
        <button type="submit" className="btn gold" id="payment-submit">
          Pay now
        </button>
      </form>
    </div>
  )
}
