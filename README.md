# NearFix v2 — AI-Powered Local Service Marketplace

NearFix is a single-project, single-command hackathon/business demo that connects customers with nearby service professionals. The original package was mostly a polished localStorage UI with a very small backend. This v2 keeps the existing UI and moves the core business flows onto a real server-backed API.

## What changed from the uploaded source

### Before
- Frontend stored most users, bookings, payments, chats and complaints in browser localStorage.
- Backend had only login, signup, technicians, bookings, reviews and notifications.
- AI diagnosis/pricing was presented in the UI but was not a server-backed workflow.
- No server-side quote approval flow.
- No server-side payment/invoice/dispute/analytics workflow.
- Technician authorization was not enforced consistently by technician identity.

### Now
- One Node.js process serves frontend + REST API.
- JWT-style signed session tokens with role checks.
- Server-persisted customer/technician/admin data.
- AI Problem Analyzer with deterministic fallback mode.
- Fair Price Engine with labour/parts/urgency logic.
- Smart technician matching with match percentage + ETA.
- Booking lifecycle: REQUESTED → ACCEPTED → ON_THE_WAY → ARRIVED → INSPECTION → AWAITING_APPROVAL / IN_PROGRESS → COMPLETED / CANCELLED.
- Technician quotation creation.
- Customer quote approval/rejection before extra work.
- Razorpay Standard Checkout test-mode integration with server-side order creation and signature verification; offline demo fallback when keys are absent.
- Invoice generation.
- Reviews with structured themes/tags.
- Booking chat + notifications.
- Customer disputes and admin resolution.
- Admin live analytics endpoint.
- Separate identity/skill/experience verification fields.
- Graceful demo mode when provider API keys are missing.
- Existing polished UI retained instead of replacing it with a generic template.

## Run once

Requirements: Node.js 18+ and VS Code.

```bash
npm start
```

That is the only development command you need after extracting the ZIP. `start.js` launches the backend, checks health, automatically finds the next free port if 5000 is busy, and opens the browser.

No frontend/backend terminals need to be started separately. No `npm install` is required because this local package intentionally uses Node built-ins and the existing static frontend.

## Demo accounts

Customer
- Email: `customer@nearfix.demo`
- Password: `demo123`

Technician
- Email: `technician@nearfix.demo`
- Password: `demo123`

Admin
- Email: `admin@nearfix.demo`
- Password: `demo123`

Additional seeded technician accounts all use `demo123`, for example `vikas@nearfix.demo`, `amit@nearfix.demo`, `pankaj@nearfix.demo` and `sahil@nearfix.demo`.

## Hackathon demo journey

1. Login as Customer.
2. Click **🤖 AI Diagnose**.
3. Enter: `My AC is running but not cooling and making unusual noise.`
4. Review service, urgency, likely causes and estimated price.
5. Start booking from the AI result.
6. Choose a nearby verified technician.
7. Login as the matching technician account and accept the booking.
8. Progress through On the way → Arrived → Inspection.
9. Create a quotation.
10. Login as Customer and approve the quotation.
11. Technician completes the service.
12. Technician uploads before/after work evidence.
13. Admin reviews the evidence and verifies the job.
14. Customer pays through the Razorpay test gateway (or records an offline demo payment).
13. Generate invoice and submit a review.
14. Login as Admin to inspect live analytics.

For the default `technician@nearfix.demo` account, the seeded profile is Ramesh Kumar (Plumbing). For an AC demonstration, use the seeded Vikas account: `vikas@nearfix.demo` / `demo123`.

## Reset demo data

If you want a completely clean local database:

```bash
npm run reset-demo
```

Then run `npm start` again.

## Environment

Copy `.env.example` to `.env` when enabling the optional Razorpay test gateway. Maps/location still require no Google key.

- `PORT` — optional, default 5050.
- `JWT_SECRET` — recommended for any non-demo deployment.
- `AI_API_KEY` — optional provider key for the AI chat endpoint.
- `AI_API_URL` — optional OpenAI-compatible chat endpoint.
- `AI_MODEL` — optional provider model name, default `gpt-4o-mini`.
- `RAZORPAY_KEY_ID` — optional Razorpay test key ID.
- `RAZORPAY_KEY_SECRET` — optional Razorpay test secret; server-side only.


## Final role-separated workflow

- **Customer** can discover 4–5+ nearby professionals when the selected radius contains them, create requests with issue photos/videos, cancel eligible bookings, chat with the assigned technician, track GPS, approve/reject itemized quotations, pay and review.
- **Technician** sees only jobs assigned to their own technician profile. They receive customer requests, accept/reject pending requests, cancel eligible jobs with a reason, update job status in order, share live GPS, upload before/after evidence, create catalog-backed quotations and view customer contact details for assigned jobs.
- **Admin** has a separate control center with platform-wide users, technicians, bookings, quotes, payments, invoices, reviews, messages, notifications, disputes, AI analyses, audit logs, parts and evidence. Admin can open job media, verify/reject work evidence, review price exceptions and manage technician verification.
- A technician account cannot create a customer booking or send a request to another technician.
- Booking status notifications are delivered to the correct opposite party: customer → assigned technician, technician → customer.
- Technician status changes are server-authorized so a technician can update only their assigned job and only through the valid lifecycle.
- Technician availability and profile edits are server-persisted rather than local-only.

## Important implementation limitation

This is intentionally a dependency-free hackathon/demo build. It uses JSON persistence rather than PostgreSQL/Prisma. Real production deployment should migrate persistence to PostgreSQL/Prisma, store photos/videos in object storage instead of JSON, add HTTPS, refresh-token rotation, WebSockets, production secrets management, a dedicated routing/geocoding provider, and Razorpay webhooks/payment-status reconciliation. The included Razorpay flow is intentionally test-mode ready.

The AI assistant is a real backend-backed chat endpoint with a deterministic local assistant that classifies common service problems and can optionally call an OpenAI-compatible provider when AI_API_KEY and AI_API_URL are configured. It is still not a substitute for a real appliance inspection.

## Project structure

```text
NearFix/
├── frontend/
│   ├── index.html
│   ├── app.js
│   ├── styles.css
│   └── assets/
├── backend/
│   ├── server.js
│   └── data/data.json
├── docs/
│   ├── architecture.md
│   └── api.md
├── scripts/
│   └── reset-demo.js
├── .env.example
├── .gitignore
├── package.json
├── start.js
└── README.md
```

## Verification performed

The final source was syntax-checked and the core end-to-end API flow was exercised locally: authentication, AI analysis, matching, booking, technician status changes, quotation, customer approval, completion, payment, review, invoice and admin analytics.


## Real Location + Free OpenStreetMap Stack

NearFix does not require a Google Maps API key or Google Cloud billing for its map/location demo. It uses:

- Browser W3C Geolocation API for customer and technician GPS (permission required).
- Leaflet for the interactive map UI.
- OpenStreetMap tiles for map data.
- OSRM for road routes, distance and ETA.
- Nominatim reverse geocoding for converting GPS coordinates to a readable address during low-volume demos.

### Run

1. Copy `.env.example` to `.env`.
2. Keep Google Maps keys out of the project — they are not needed.
3. Optional: add Razorpay TEST keys to `.env` to enable secure checkout.
4. Run `npm start` (no separate frontend/backend process).
5. Open the URL printed by `npm start`.
6. Customer: click **Use current location** and allow location access.
7. Technician: open the technician dashboard and click **Share GPS**.
8. Customer: when the booking reaches **On the way**, open **Live Map** to see the technician and road route.

### Important public-service note

The public OpenStreetMap tile service, Nominatim service and OSRM demo router are community/public infrastructure with usage policies and rate limits. They are suitable for a hackathon/demo with low traffic, not as a guaranteed production backend. For production scale, use a hosted routing/geocoding provider or self-host these services while retaining the same NearFix frontend/backend interfaces.

Do not scrape or bulk-query public services. Cache results and throttle requests.

## Trust and pricing rules

- Customer issue media is attached to the booking so the assigned technician and admin can review the reported problem.
- Technician can upload before/after/service evidence; admin can mark the work `VERIFIED` or request resubmission.
- Payment is intentionally gated behind an approved quotation and admin work verification.
- Spare-part quote items are resolved against the shared NearFix catalog on the server; the technician-supplied unit price is not trusted.
- Quote responses include a pricing audit with catalog total, markup percentage and review warnings.
- Platform fee is configured as 0% in the demo so the customer sees the service/parts charges separately.
- Eligible cancellations store a reason and are surfaced to both parties; already-paid bookings are flagged for admin refund review.

## Razorpay test checkout

The frontend uses Razorpay Standard Checkout only when `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` are configured. The backend creates the order and verifies the returned signature before marking a payment successful. This follows Razorpay's recommended server-side order and signature-verification flow.

Do not put the secret key in frontend JavaScript or commit `.env`. For production, also enable Razorpay webhooks and reconcile payment/order status before treating a payment as final.

## Arrival OTP verification
NearFix does not use OTP for login. The security OTP is specifically a service-arrival handover step: when the assigned technician marks a booking ARRIVED, NearFix generates a 6-digit OTP for the customer. The customer shares it with the technician; only after server-side OTP verification can the technician move the job into INSPECTION. OTPs expire after 5 minutes, allow up to 5 attempts, and have a 30-second resend cooldown.

For local/offline demo mode, no SMS provider is required: the generated OTP is displayed inside the secure demo verification dialog. For real SMS delivery, configure the optional Twilio variables in `.env`:

- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_PHONE_NUMBER`

Do not commit real credentials. Use a secrets manager/environment variables in production.

## NearFix differentiators
The product flow includes five core differentiators: (1) Skill Passport with skill/identity/experience verification, (2) AI preliminary problem diagnosis with photo/problem context and price range, (3) fair-price/itemized quotation checks against the shared parts catalog, (4) before/after work evidence with admin verification, and (5) location-aware technician matching with real browser GPS, technician GPS sharing, nearby results and road routing via OpenStreetMap/Leaflet/OSRM.

## Final business workflow

The final build is role-separated and uses a customer-to-technician service lifecycle:

Customer → Request → Technician Accept/Reject → On the Way → Arrived → Customer Arrival OTP → Inspection → Itemized Fair Quote → Customer Approval → Service → Before/After Evidence → Admin Verification → Payment (Razorpay / manual UPI / Cash) → Invoice → Review.

### Role boundaries
- Customer: discovery, location matching, booking, cancellation, AI guide, barcode/parts price check, approvals, payment and invoices.
- Technician: assigned customer jobs only, live GPS, arrival Arrival OTP verification, inspection, catalog-based parts, quotations, evidence and payment confirmation.
- Admin: platform operations, user/technician/booking/parts/payment/evidence verification, disputes, analytics and audit data. No barcode camera scanner is exposed to the admin role.

### Skill-first model
NearFix does not require a degree field to match a technician. Profiles emphasize practical skills, verified work, experience, response/completion metrics and customer reviews. The demo seed contains at least five field-specific technician profiles for each service category so location-aware discovery can return 5–10 profiles where available.

### Payment verification
- Razorpay test checkout is available when `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` are configured.
- Manual UPI requires a transaction/reference ID and remains `PENDING_CONFIRMATION` until the assigned technician or admin verifies it.
- Cash remains `PENDING_CONFIRMATION` until the assigned technician or admin confirms receipt.
- Verified manual/gateway payments automatically generate an invoice if one does not already exist.

### Customer AI Guide
The customer dashboard includes a lightweight AI guide that works without an external AI key and can route the customer to the relevant service or the full AI diagnosis flow. `AI_API_KEY` can still be supplied for a future provider integration.
