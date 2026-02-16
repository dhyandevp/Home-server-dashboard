# Home Server Management Platform Architecture

## 1) Current State Analysis
The original repository shipped as a single `index.html` demo with client-side mock data, localStorage persistence, and no backend security boundary.

### Gaps identified
- No server-side authentication or authorization.
- No secure API layer for Docker, files, or logs.
- No persistent database for users, plugins, alerts, and audit trails.
- No real-time metrics transport channel.
- No modular plugin lifecycle.
- No deployment topology for production.

## 2) Target System Design
A lightweight but production-oriented split architecture:

- **Frontend**: React + Vite + TailwindCSS SPA.
- **Backend**: Node.js + Express REST API + Socket.IO real-time transport.
- **Database**: PostgreSQL via Prisma ORM.
- **Reverse Proxy**: Nginx in front of frontend/backend.
- **Container Runtime**: Docker socket integration through Dockerode.

## 3) Modular Boundaries

### Backend modules
- `auth`: JWT login, role checks, brute-force and rate limiting.
- `metrics`: system telemetry (CPU, RAM, Disk, Net, uptime, temperature).
- `docker`: container inventory and lifecycle actions.
- `plugins`: plugin registry + auto-discovery.
- `proxy`: reverse proxy records and generated Nginx config snippets.
- `files`: sandboxed file browsing/editing/upload.
- `logs`: API, security, and docker log streams.
- `alerts`: threshold + webhook/email channel settings.
- `audit`: append-only trail for critical actions.

### Frontend modules
- `dashboard`: real-time system cards.
- `docker manager`: container controls, health, logs.
- `marketplace`: plugin install/enable/disable UX.
- `logs center`: search/filter/export JSON.
- `file manager`: safe path-limited browser/editor.
- `settings`: auth/session/preferences.

## 4) Security Design
- JWT access tokens with expiration.
- BCrypt password hashing.
- Role-based middleware (`admin`, `user`).
- IP-aware login attempt throttling.
- Global API rate limiter.
- File manager sandbox root (`FILE_MANAGER_ROOT`).
- Audit trails for login, docker actions, file writes, proxy updates.

## 5) Scalability and Performance
- Socket.IO push updates every 5s (configurable).
- Batched metric polling to avoid excessive syscalls.
- Prisma indexes for query-heavy tables.
- Stateless API pods (horizontal scaling friendly).
- Plugin registry loaded once + watched for changes.

## 6) Deployment
- Docker Compose stack with services:
  - `frontend` (Nginx serving built SPA)
  - `backend` (Node API)
  - `postgres`
- Optional docker socket mount for live container control.
