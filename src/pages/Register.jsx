import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { firstError, validateRegister } from '../utils/validation'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' })
  const [fieldErrors, setFieldErrors] = useState({})
  const [banner, setBanner] = useState({ type: '', text: '' })

  function onChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  function onSubmit(e) {
    e.preventDefault()
    const errors = validateRegister(form)
    setFieldErrors(errors)
    if (Object.keys(errors).length) {
      setBanner({ type: 'error', text: firstError(errors) })
      return
    }
    const result = register(form)
    if (!result.ok) {
      setBanner({ type: 'error', text: result.message })
      return
    }
    setBanner({ type: 'success', text: result.message })
    setTimeout(() => navigate('/'), 700)
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <p className="eyebrow">Join Agile Travel</p>
        <h1>Create your account</h1>

        {banner.type === 'error' && banner.text ? (
          <div className="alert error" id="register-error" role="alert">
            {banner.text}
          </div>
        ) : (
          <div id="register-error" className="alert error hidden" />
        )}
        {banner.type === 'success' ? (
          <div className="alert success" id="register-success" role="status">
            {banner.text}
          </div>
        ) : (
          <div id="register-success" className="alert success hidden" />
        )}

        <form onSubmit={onSubmit} noValidate id="register-form">
          <label htmlFor="register-name">Full name</label>
          <input id="register-name" name="name" value={form.name} onChange={onChange} />
          {fieldErrors.name ? <p className="field-error">{fieldErrors.name}</p> : null}

          <label htmlFor="register-email">Email</label>
          <input id="register-email" name="email" type="email" value={form.email} onChange={onChange} />
          {fieldErrors.email ? <p className="field-error">{fieldErrors.email}</p> : null}

          <label htmlFor="register-phone">Phone</label>
          <input id="register-phone" name="phone" value={form.phone} onChange={onChange} placeholder="10-15 digits" />
          {fieldErrors.phone ? <p className="field-error">{fieldErrors.phone}</p> : null}

          <label htmlFor="register-password">Password</label>
          <input
            id="register-password"
            name="password"
            type="password"
            value={form.password}
            onChange={onChange}
          />
          {fieldErrors.password ? <p className="field-error">{fieldErrors.password}</p> : null}

          <label htmlFor="register-confirm">Confirm password</label>
          <input
            id="register-confirm"
            name="confirm"
            type="password"
            value={form.confirm}
            onChange={onChange}
          />
          {fieldErrors.confirm ? <p className="field-error">{fieldErrors.confirm}</p> : null}

          <button type="submit" className="btn gold full" id="register-submit">
            Register
          </button>
        </form>
        <p className="muted">
          Already registered? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  )
}
