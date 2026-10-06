import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useBookings } from '../context/BookingContext'

export default function MyBookings() {
  const { currentUser } = useAuth()
  const { userBookings, cancelBooking } = useBookings()
  const list = userBookings(currentUser.email)

  return (
    <div className="section">
      <div className="section-head">
        <div>
          <p className="eyebrow">Your trips</p>
          <h1>My Bookings</h1>
        </div>
        <Link to="/packages" className="btn ghost">
          Book another trip
        </Link>
      </div>

      {list.length === 0 ? (
        <div className="empty-state" id="bookings-empty">
          <h2>No bookings yet</h2>
          <p>When you complete a demo payment, your itinerary will appear here.</p>
          <Link to="/packages" className="btn gold">
            Browse packages
          </Link>
        </div>
      ) : (
        <div className="table-wrap">
          <table className="bookings-table" id="bookings-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Package</th>
                <th>Destination</th>
                <th>Date</th>
                <th>Travelers</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {list.map((b, index) => (
                <tr key={b.id} data-booking-id={b.id}>
                  <td>{b.id}</td>
                  <td>{b.packageName}</td>
                  <td>{b.destination}</td>
                  <td>{b.date}</td>
                  <td>{b.travelers}</td>
                  <td>${b.amount}</td>
                  <td>
                    <span className={`status ${b.status.toLowerCase()}`}>{b.status}</span>
                  </td>
                  <td>
                    {b.status === 'Confirmed' ? (
                      <button
                        type="button"
                        className="btn danger"
                        id={index === 0 ? 'cancel-booking' : `cancel-booking-${b.id}`}
                        data-testid="cancel-booking"
                        onClick={() => cancelBooking(b.id)}
                      >
                        Cancel
                      </button>
                    ) : (
                      '—'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
