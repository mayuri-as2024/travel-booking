import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { generateBookingId, storage } from '../utils/storage'

const BookingContext = createContext(null)

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState(() => storage.getBookings())
  const [pending, setPending] = useState(() => storage.getPendingBooking())

  useEffect(() => {
    storage.setBookings(bookings)
  }, [bookings])

  useEffect(() => {
    storage.setPendingBooking(pending)
  }, [pending])

  const value = useMemo(
    () => ({
      bookings,
      pending,
      saveDraft(draft) {
        setPending(draft)
      },
      clearDraft() {
        setPending(null)
      },
      confirmPayment() {
        if (!pending) return { ok: false, message: 'No booking to pay for' }
        const booking = {
          ...pending,
          id: generateBookingId(),
          status: 'Confirmed',
          paidAt: new Date().toISOString(),
        }
        setBookings((prev) => [booking, ...prev])
        setPending(null)
        return { ok: true, booking }
      },
      cancelBooking(id) {
        setBookings((prev) =>
          prev.map((b) => (b.id === id && b.status !== 'Cancelled' ? { ...b, status: 'Cancelled' } : b)),
        )
      },
      userBookings(email) {
        return bookings.filter((b) => b.email.toLowerCase() === String(email).toLowerCase())
      },
    }),
    [bookings, pending],
  )

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}

export function useBookings() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBookings must be used within BookingProvider')
  return ctx
}
