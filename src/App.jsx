import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import { BookingProvider } from './context/BookingContext'
import Booking from './pages/Booking'
import Contact from './pages/Contact'
import Destinations from './pages/Destinations'
import Home from './pages/Home'
import Login from './pages/Login'
import MyBookings from './pages/MyBookings'
import PackageDetails from './pages/PackageDetails'
import Packages from './pages/Packages'
import Payment from './pages/Payment'
import Register from './pages/Register'

export default function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/packages" element={<Packages />} />
              <Route path="/packages/:id" element={<PackageDetails />} />
              <Route
                path="/booking"
                element={
                  <ProtectedRoute>
                    <Booking />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/payment"
                element={
                  <ProtectedRoute>
                    <Payment />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/bookings"
                element={
                  <ProtectedRoute>
                    <MyBookings />
                  </ProtectedRoute>
                }
              />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </BookingProvider>
    </AuthProvider>
  )
}
