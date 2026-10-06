import { useState } from 'react'
import { storage } from '../utils/storage'
import { firstError, validateContact } from '../utils/validation'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [fieldErrors, setFieldErrors] = useState({})
  const [banner, setBanner] = useState({ type: '', text: '' })

  function onChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  function onSubmit(e) {
    e.preventDefault()
    const errors = validateContact(form)
    setFieldErrors(errors)
    if (Object.keys(errors).length) {
      setBanner({ type: 'error', text: firstError(errors) })
      return
    }
    const items = storage.getContacts()
    items.unshift({ ...form, sentAt: new Date().toISOString() })
    storage.setContacts(items)
    setBanner({ type: 'success', text: 'Message sent successfully. We will get back to you soon.' })
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="section form-page">
      <div className="section-head">
        <div>
          <p className="eyebrow">Concierge</p>
          <h1>Contact us</h1>
          <p className="muted">Questions about a package, a booking, or the demo? Send a note.</p>
        </div>
      </div>

      {banner.type === 'error' && banner.text ? (
        <div className="alert error" id="contact-error" role="alert">
          {banner.text}
        </div>
      ) : (
        <div id="contact-error" className="alert error hidden" />
      )}
      {banner.type === 'success' ? (
        <div className="alert success" id="contact-success" role="status">
          {banner.text}
        </div>
      ) : (
        <div id="contact-success" className="alert success hidden" />
      )}

      <form className="panel form-grid" onSubmit={onSubmit} noValidate id="contact-form">
        <div>
          <label htmlFor="contact-name">Name</label>
          <input id="contact-name" name="name" value={form.name} onChange={onChange} />
          {fieldErrors.name ? <p className="field-error">{fieldErrors.name}</p> : null}
        </div>
        <div>
          <label htmlFor="contact-email">Email</label>
          <input id="contact-email" name="email" type="email" value={form.email} onChange={onChange} />
          {fieldErrors.email ? <p className="field-error">{fieldErrors.email}</p> : null}
        </div>
        <div className="full">
          <label htmlFor="contact-subject">Subject</label>
          <input id="contact-subject" name="subject" value={form.subject} onChange={onChange} />
          {fieldErrors.subject ? <p className="field-error">{fieldErrors.subject}</p> : null}
        </div>
        <div className="full">
          <label htmlFor="contact-message">Message</label>
          <textarea id="contact-message" name="message" rows="5" value={form.message} onChange={onChange} />
          {fieldErrors.message ? <p className="field-error">{fieldErrors.message}</p> : null}
        </div>
        <button type="submit" className="btn gold" id="contact-submit">
          Send message
        </button>
      </form>
    </div>
  )
}
