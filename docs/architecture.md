# NearFix v2 Architecture

## Runtime
- One Node.js process serves both the REST API and the static React-free SPA UI.
- `start.js` launches the backend, checks `/api/health`, finds the next free port if needed, and opens the browser.
- Core business data persists in `backend/data/data.json` for a dependency-free hackathon/demo setup.

## Request flow
Customer UI → REST API → business logic → JSON persistence → REST response → UI state.

## AI
`/api/ai/analyze-problem` detects a service, preliminary urgency, likely causes and required skill using deterministic rules. `/api/ai/estimate-price` calculates a transparent range. This is explicitly a demo fallback and is structured so an external LLM provider can be connected later.

## Matching
Technician matching combines service/skill compatibility, availability, distance, reliability, rating, price compatibility and an urgency boost. The response includes a match percentage and ETA.

## Trust
Identity, skill and experience verification are stored separately. The UI can expose individual trust indicators instead of collapsing them into one opaque score.

## Payment
The local flow uses a mock payment abstraction. It generates a transaction ID and never stores raw card data.

## Production migration
For production, replace JSON persistence with PostgreSQL/Prisma, use a real JWT/refresh-token implementation, object storage for uploads, a map provider, a real payment gateway, a real LLM provider, HTTPS, secrets management and WebSocket infrastructure.
