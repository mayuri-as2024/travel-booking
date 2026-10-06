export const DEMO_EMAIL = 'test@agiletravel.com'
export const DEMO_PASSWORD = 'Test@123'
export const DEMO_CARD = '4111111111111111'

export function todayISO() {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim())
}

export function isStrongPassword(value) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(
    String(value),
  )
}

export function isValidPhone(value) {
  return /^\+?[0-9]{10,15}$/.test(String(value).replaceAll(' ', ''))
}

export function isValidName(value) {
  return /^[A-Za-z][A-Za-z ]{1,49}$/.test(String(value).trim())
}

export function validateLogin({ email, password }) {
  const errors = {}
  if (!email?.trim()) errors.email = 'Email is required'
  else if (!isValidEmail(email)) errors.email = 'Enter a valid email address'
  if (!password) errors.password = 'Password is required'
  return errors
}

export function validateRegister({ name, email, phone, password, confirm }) {
  const errors = {}
  if (!name?.trim()) errors.name = 'Name is required'
  else if (!isValidName(name)) errors.name = 'Enter a valid name (letters only, min 2 characters)'
  if (!email?.trim()) errors.email = 'Email is required'
  else if (!isValidEmail(email)) errors.email = 'Enter a valid email address'
  if (!phone?.trim()) errors.phone = 'Phone is required'
  else if (!isValidPhone(phone)) errors.phone = 'Enter a valid phone number (10-15 digits)'
  if (!password) errors.password = 'Password is required'
  else if (!isStrongPassword(password)) {
    errors.password =
      'Password must be at least 8 characters with uppercase, lowercase, number and special character'
  }
  if (!confirm) errors.confirm = 'Confirm password is required'
  else if (password !== confirm) errors.confirm = 'Passwords do not match'
  return errors
}

export function validateBooking({
  packageId,
  destination,
  date,
  travelers,
  name,
  email,
  phone,
  capacity,
}) {
  const errors = {}
  if (!packageId) errors.packageId = 'Please select a package'
  if (!destination?.trim()) errors.destination = 'Destination is required'
  if (!date) errors.date = 'Travel date is required'
  else if (date < todayISO()) errors.date = 'Travel date cannot be in the past'

  if (travelers === '' || travelers === null || travelers === undefined) {
    errors.travelers = 'Number of travelers is required'
  } else {
    const n = Number(travelers)
    if (!Number.isInteger(n)) errors.travelers = 'Travelers must be a whole number'
    else if (n < 1) errors.travelers = 'Travelers must be at least 1'
    else if (capacity && n > capacity) {
      errors.travelers = `Travelers cannot exceed package capacity of ${capacity}`
    }
  }

  if (!name?.trim()) errors.name = 'Name is required'
  else if (!isValidName(name)) errors.name = 'Enter a valid name (letters only, min 2 characters)'
  if (!email?.trim()) errors.email = 'Email is required'
  else if (!isValidEmail(email)) errors.email = 'Enter a valid email address'
  if (!phone?.trim()) errors.phone = 'Phone is required'
  else if (!isValidPhone(phone)) errors.phone = 'Enter a valid phone number (10-15 digits)'
  return errors
}

export function digitsOnly(value) {
  return String(value).replace(/\D/g, '')
}

export function validatePayment({ cardholder, cardNumber, expiry, cvv }) {
  const errors = {}
  if (!cardholder?.trim()) errors.cardholder = 'Cardholder name is required'
  else if (!isValidName(cardholder)) {
    errors.cardholder = 'Enter a valid cardholder name (letters only)'
  }

  const number = digitsOnly(cardNumber)
  if (!cardNumber?.trim()) errors.cardNumber = 'Card number is required'
  else if (number.length !== 16) errors.cardNumber = 'Card number must be 16 digits'
  else if (number !== DEMO_CARD) errors.cardNumber = 'Invalid card number'

  if (!expiry?.trim()) errors.expiry = 'Expiry is required'
  else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry.trim())) {
    errors.expiry = 'Expiry must be in MM/YY format'
  } else {
    const [mm, yy] = expiry.trim().split('/')
    const expDate = new Date(2000 + Number(yy), Number(mm), 0)
    const now = new Date()
    const endOfCurrentMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)
    if (expDate < endOfCurrentMonth) errors.expiry = 'Card has expired'
  }

  const cvvDigits = digitsOnly(cvv)
  if (!cvv?.trim()) errors.cvv = 'CVV is required'
  else if (cvvDigits.length !== 3) errors.cvv = 'CVV must be 3 digits'

  return errors
}

export function validateContact({ name, email, subject, message }) {
  const errors = {}
  if (!name?.trim()) errors.name = 'Name is required'
  else if (!isValidName(name)) errors.name = 'Enter a valid name (letters only, min 2 characters)'
  if (!email?.trim()) errors.email = 'Email is required'
  else if (!isValidEmail(email)) errors.email = 'Enter a valid email address'
  if (!subject?.trim()) errors.subject = 'Subject is required'
  else if (subject.trim().length < 3) errors.subject = 'Subject must be at least 3 characters'
  if (!message?.trim()) errors.message = 'Message is required'
  else if (message.trim().length < 10) errors.message = 'Message must be at least 10 characters'
  return errors
}

export function firstError(errors) {
  const key = Object.keys(errors)[0]
  return key ? errors[key] : ''
}
