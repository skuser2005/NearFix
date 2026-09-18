# NearFix API

- `GET /api/health`
- `GET /api/public`
- `POST /api/auth/login`
- `POST /api/auth/register`
- `GET /api/bootstrap` (authenticated)
- `GET /api/technicians`
- `POST /api/ai/analyze-problem`
- `POST /api/ai/estimate-price`
- `POST /api/matching/find`
- `GET /api/bookings`
- `POST /api/bookings`
- `PATCH /api/bookings/:id`
- `POST /api/quotes`
- `POST /api/quotes/:id/approve`
- `POST /api/quotes/:id/reject`
- `POST /api/payments`
- `POST /api/invoices`
- `GET /api/invoices`
- `POST /api/reviews`
- `GET /api/messages`
- `POST /api/messages`
- `GET /api/notifications`
- `PATCH /api/notifications/read`
- `POST /api/disputes`
- `GET /api/admin/analytics`
- `PATCH /api/admin/technicians/:id`
- `PATCH /api/admin/disputes/:id`


### Parts / barcode

- `GET /api/parts?q=...&barcode=...&category=...` — search the shared spare-parts catalog.
- `GET /api/parts/:barcode` — exact barcode lookup used by the scanner.
- `POST /api/admin/parts` — admin-only catalog item creation.
- `PATCH /api/admin/parts/:id` — admin-only catalog update.
- `DELETE /api/admin/parts/:id` — admin-only catalog deletion.


## Arrival OTP check-in
- `GET /api/bookings/:id/arrival-verification` — customer can view the demo OTP when SMS is not configured; technician/admin receive status only.
- `POST /api/bookings/:id/arrival-otp/verify` — assigned technician submits the customer's 6-digit arrival OTP. Successful verification moves the booking from `ARRIVED` to `INSPECTION`.
- A technician cannot move an `ARRIVED` booking to `INSPECTION` directly.
- The OTP is generated when the assigned technician marks the booking `ARRIVED`, expires after 5 minutes, and is delivered by Twilio when configured; otherwise it is shown in demo mode.
