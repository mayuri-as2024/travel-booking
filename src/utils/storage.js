const KEYS = {
  users: 'agileTravel_users',
  session: 'agileTravel_session',
  bookings: 'agileTravel_bookings',
  pending: 'agileTravel_pendingBooking',
  contacts: 'agileTravel_contacts',
}

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export const storage = {
  getUsers: () => read(KEYS.users, []),
  setUsers: (users) => write(KEYS.users, users),
  getSession: () => read(KEYS.session, null),
  setSession: (session) => {
    if (session) write(KEYS.session, session)
    else localStorage.removeItem(KEYS.session)
  },
  getBookings: () => read(KEYS.bookings, []),
  setBookings: (bookings) => write(KEYS.bookings, bookings),
  getPendingBooking: () => read(KEYS.pending, null),
  setPendingBooking: (draft) => {
    if (draft) write(KEYS.pending, draft)
    else localStorage.removeItem(KEYS.pending)
  },
  getContacts: () => read(KEYS.contacts, []),
  setContacts: (items) => write(KEYS.contacts, items),
}

export function generateBookingId() {
  const now = new Date()
  const stamp = now.toISOString().slice(0, 10).replaceAll('-', '')
  const rand = String(Math.floor(1000 + Math.random() * 9000))
  return `AT-${stamp}-${rand}`
}
