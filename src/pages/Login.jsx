import { useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { firstError, validateLogin } from '../utils/validation'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [fieldErrors, setFieldErrors] = useState({})
  const [banner, setBanner] = useState({ type: '', text: location.state?.reason || '' })

  const summaryError = useMemo(
    () => (banner.type === 'error' ? banner.text : ''),
    [banner],
  )

  function onChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  function onSubmit(e) {
    e.preventDefault()
    const errors = validateLogin(form)
    setFieldErrors(errors)
    if (Object.keys(errors).length) {
      setBanner({ type: 'error', text: firstError(errors) })
      return
    }
    const result = login(form.email, form.password)
    if (!result.ok) {
      setBanner({ type: 'error', text: result.message })
      return
    }
    setBanner({ type: 'success', text: result.message })
    const next = location.state?.from || '/'
    setTimeout(() => navigate(next, { replace: true }), 700)
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <p className="eyebrow">Welcome back</p>
        <h1>Log in to Agile Travel</h1>
        <p className="muted">
          Demo: <strong>test@agiletravel.com</strong> / <strong>Test@123</strong>
        </p>

        {banner.type === 'error' && banner.text ? (
          <div className="alert error" id="login-error" role="alert">
            {summaryError}
          </div>
        ) : (
          <div id="login-error" className="alert error hidden" role="alert" />
        )}
        {banner.type === 'success' ? (
          <div className="alert success" id="login-success" role="status">
            {banner.text}
          </div>
        ) : (
          <div id="login-success" className="alert success hidden" role="status" />
        )}

        <form onSubmit={onSubmit} noValidate id="login-form">
          <label htmlFor="login-email">Email</label>
          <input
            id="login-email"
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            autoComplete="username"
          />
          {fieldErrors.email ? <p className="field-error">{fieldErrors.email}</p> : null}

          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            name="password"
            type="password"
            value={form.password}
            onChange={onChange}
            autoComplete="current-password"
          />
          {fieldErrors.password ? <p className="field-error">{fieldErrors.password}</p> : null}

          <button type="submit" className="btn gold full" id="login-submit">
            Login
          </button>
        </form>
        <p className="muted">
          New here? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  )
}
