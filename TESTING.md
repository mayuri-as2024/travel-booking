# Agile Travel — Testing Guide

This app is built for black-box, validation, decision-table, boundary-value, and positive/negative testing. Important controls use **stable IDs**.

## Demo data

- Login: `test@agiletravel.com` / `Test@123`
- Valid card: `4111111111111111`
- Valid expiry: future `MM/YY` (e.g. `12/28`)
- Valid CVV: 3 digits (e.g. `123`)
- Destinations: Paris, Dubai, Bali, Tokyo, Singapore, London, Maldives, Switzerland
- Package capacities: 4, 6, 8, 10 (see package dropdown)

## Key element IDs

| ID | Page |
| --- | --- |
| `login-email`, `login-password`, `login-submit`, `login-error`, `login-success` | Login |
| `register-name`, `register-email`, `register-phone`, `register-password`, `register-confirm`, `register-submit`, `register-error`, `register-success` | Register |
| `search-destination`, `search-submit`, `search-error` | Home / Destinations |
| `booking-package`, `booking-destination`, `booking-date`, `booking-travelers`, `booking-name`, `booking-email`, `booking-phone`, `booking-submit`, `booking-error`, `booking-success` | Booking |
| `payment-cardholder`, `payment-card-number`, `payment-expiry`, `payment-cvv`, `payment-submit`, `payment-error`, `payment-success` | Payment |
| `cancel-booking` | My Bookings (first cancellable row) |
| `contact-name`, `contact-email`, `contact-subject`, `contact-message`, `contact-submit`, `contact-error`, `contact-success` | Contact |
| `nav-home`, `nav-destinations`, `nav-packages`, `nav-bookings`, `nav-contact`, `nav-login`, `logout-button` | Navigation |

Booking, payment, and My Bookings require login. Unauthenticated users are redirected to `/login`.

## Module 1 — Login

Expected messages:

- Empty email → `Email is required` (`login-error`)
- Invalid email format → `Enter a valid email address`
- Empty password → `Password is required`
- Wrong credentials → `Invalid email or password`
- Valid demo credentials → `Login successful` (`login-success`)

### Decision table (login)

| Email valid? | Password valid? | Match stored user? | Result |
| --- | --- | --- | --- |
| N | — | — | Field / format error |
| Y | N (empty) | — | Password required |
| Y | Y | N | Invalid email or password |
| Y | Y | Y | Login successful |

### Example cases

1. `not-an-email` / `Test@123` → invalid email
2. `test@agiletravel.com` / (empty) → password required
3. `test@agiletravel.com` / `Wrong@123` → invalid credentials
4. `test@agiletravel.com` / `Test@123` → success

## Module 2 — Registration

Password rule: min 8 characters, uppercase, lowercase, number, special character.

- Duplicate `test@agiletravel.com` → `An account with this email already exists`
- Mismatched confirm → `Passwords do not match`

## Module 3 — Destination search

- Empty search (submit blank) → all available destinations
- `Paris` → Paris result
- `Atlantis` (unknown) → `No destinations found` in `#search-error`
- Search is case-insensitive (`bali`, `BALI`)

## Module 4 — Booking

Prerequisites: logged in. Open `/booking` or Book Now on a package.

Rules:

- Package required
- Destination required
- Date required and **not in the past**
- Travelers required, integer, **minimum 1**, **cannot exceed package capacity**
- Name letters only, min 2
- Valid email and phone (10–15 digits, optional `+`)

Valid booking shows total price then navigates to payment.

### Boundary value — travelers (example capacity 4)

| Value | Expected |
| --- | --- |
| 0 | Error: at least 1 |
| 1 | Valid (if other fields ok) |
| 4 | Valid (at capacity) |
| 5 | Error: cannot exceed capacity of 4 |

### Decision table (booking, abbreviated)

| Package | Date | Travelers | Other fields | Result |
| --- | --- | --- | --- | --- |
| Missing | Valid | 1 | Valid | Package error |
| Selected | Past | 1 | Valid | Date error |
| Selected | Today/future | 0 | Valid | Travelers min error |
| Selected | Future | capacity+1 | Valid | Capacity error |
| Selected | Future | 1..capacity | Invalid email | Email error |
| Selected | Future | 1..capacity | Valid | Success + total |

## Module 5 — Payment

- Cardholder required, letters/spaces
- Card number must be **exactly 16 digits** and equal `4111111111111111`
- Expiry `MM/YY` and not expired
- CVV exactly 3 digits

Invalid → `#payment-error`. Valid → `#payment-success` with booking ID; booking saved to `localStorage` key `agileTravel_bookings`.

### Negative examples

- Card `4111111111111112` → Invalid card number
- Card `41111` → must be 16 digits
- Expiry `13/28` → MM/YY format error
- Expiry `01/20` → Card has expired
- CVV `12` → must be 3 digits
- CVV `1234` → must be 3 digits

## Module 6 — My Bookings

- No records → `#bookings-empty` “No bookings yet”
- After payment → table with ID, package, destination, date, travelers, amount, status
- `#cancel-booking` sets status to `Cancelled`

## Module 7 — Contact

- Required name, email, subject (≥3 chars), message (≥10 chars)
- Success: `Message sent successfully. We will get back to you soon.`

## Suggested Katalon flow

1. Open home → search `Paris` → assert results
2. Search `UnknownCity` → assert `No destinations found`
3. Login invalid then valid demo user
4. Book a capacity-4 package with 0, 1, 4, 5 travelers
5. Pay with invalid card, then valid card
6. Cancel booking
7. Submit contact form empty then valid

## localStorage keys

- `agileTravel_users`
- `agileTravel_session`
- `agileTravel_bookings`
- `agileTravel_pendingBooking`
- `agileTravel_contacts`
