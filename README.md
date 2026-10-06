# Agile Travel

## Tech stack

- React + Vite
- JavaScript
- React Router
- CSS
- localStorage and mock/local data (no backend)

A polished, fully interactive travel booking website. The UI is designed for **Software Testing** (including Katalon Recorder) with stable element IDs and deterministic validation.

## Demo credentials

| Field | Value |
| --- | --- |
| Email | `test@agiletravel.com` |
| Password | `Test@123` |

Valid demo card: `4111111111111111`  
Expiry: any future `MM/YY` (example `12/28`)  
CVV: any 3 digits (example `123`)

## Setup

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

Production build:

```bash
npm run build
npm run preview
```

## Features

- Home landing page with hero search, popular destinations, featured packages
- Login and registration with field validation
- Destination search and region filters (empty query lists all destinations)
- Travel packages with details, category filters, and Book Now
- Booking form with date, traveler capacity, email/phone validation
- Demo payment that generates a booking ID
- My Bookings list with cancellation and empty state
- Contact form with success/error messages
- Session and bookings persisted in `localStorage`

## Project structure

```
src/
  components/
  context/
  data/
  pages/
  styles/
  utils/
```

## Testing

See [TESTING.md](./TESTING.md) for modules, IDs, decision tables, and boundary cases.

## Notes

This is a **demo**. Payments are simulated. Do not enter real card details.
