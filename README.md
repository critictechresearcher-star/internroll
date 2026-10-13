# Internroll website recreation

## What is included
- `index.html`: HTML recovered from the uploaded Chrome `view-source` file. The file is a snapshot of the **frontend** (HTML/CSS/client JavaScript), not the original server implementation.
- `server.js`: a new, illustrative Express backend with internship search, newsletter subscription, and application endpoints.
- `package.json`: Node dependencies and start command.

## Run locally
Install Node.js, then run:
```bash
npm install
npm start
```
Open http://localhost:3000

## Backend endpoints
- `GET /api/health`
- `GET /api/internships?q=python&category=Development`
- `POST /api/subscribe` with JSON `{ "email": "you@example.com" }`
- `POST /api/applications` with JSON `{ "name": "Your Name", "email": "you@example.com", "internshipId": 1 }`

## Important limitations
The backend is a fresh demo scaffold, **not** the original Internroll backend. It stores data in memory, so records reset when the server restarts. For production, add a database, authentication, input validation/rate limiting, payment provider integration, and secrets/configuration. Google sign-in, payments, real enrollment, and original user data cannot be reconstructed from a page-source snapshot alone.

The supplied source is a browser-rendered `view-source` wrapper. The extraction recovers the source lines it contains, but third-party images/fonts and routes still depend on their original URLs and availability. Exact pixel-for-pixel matching cannot be guaranteed from a screenshot/source snapshot alone.
