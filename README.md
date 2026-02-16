# Home Server Management Platform

A lightweight, production-ready homelab control panel inspired by UmbrelOS/CasaOS/TrueNAS SCALE with a modular architecture.

## Architecture Summary
Detailed architecture and scaling design is documented in `docs/ARCHITECTURE.md`.

### Stack
- **Frontend**: React + Vite + Tailwind (dark-first responsive UI)
- **Backend**: Express + Socket.IO (REST + realtime)
- **Database**: PostgreSQL schema via Prisma (`backend/prisma/schema.prisma`)
- **Container runtime**: Docker socket integration (`dockerode`)

## Folder Structure

```text
.
├── backend
│   ├── prisma
│   │   └── schema.prisma
│   ├── src
│   │   ├── config
│   │   ├── middleware
│   │   ├── plugins
│   │   ├── routes
│   │   ├── services
│   │   ├── ws
│   │   ├── app.ts
│   │   └── server.ts
│   ├── tests
│   └── Dockerfile
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── hooks
│   │   ├── pages
│   │   ├── services
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── Dockerfile
├── docs
│   └── ARCHITECTURE.md
├── docker-compose.yml
└── .env.example
```

## Database Schema
Defined in `backend/prisma/schema.prisma` with production entities:
- `User` (auth + RBAC)
- `AuditLog` (security/event trail)
- `Plugin` (marketplace registry)
- `AlertRule` (monitoring/notification thresholds)
- `ProxyRoute` (reverse proxy manager records)

## Feature-by-Feature Implementation

### 1) Dashboard Overview
- Realtime CPU/RAM/Disk/Network/Uptime/Temperature via `Socket.IO` metric events.
- Frontend metric cards and telemetry panels.

### 2) Docker Manager
- List containers, start/stop/restart endpoints, and container logs endpoint.
- Graceful fallback when Docker API is unavailable.

### 3) Service Marketplace (Plugin System)
- Auto-discovery of plugin descriptors from `backend/src/plugins/*.json`.
- Enable/disable plugins through API.

### 4) Reverse Proxy Manager
- Domain + upstream registration endpoint.
- Auto-generated Nginx server block preview in API response.

### 5) File Manager
- Sandboxed directory read/write/list/upload endpoints.
- Root protection via `FILE_MANAGER_ROOT` path resolver.

### 6) Logs Center
- Audit log collection service and API endpoint.

### 7) Monitoring & Alerts
- Alert rule CRUD scaffold (`metric`, `threshold`, `channel`, `destination`).

### 8) Authentication & Security
- JWT login, role checks, rate limiting, helmet headers, and IP-aware audit logs.

### 9) API Layer
- REST routes under `/api/*`.
- Swagger docs at `/docs`.

### 10) Mobile Mode
- Responsive Tailwind grid layouts and touch-friendly controls.

## Run Locally

```bash
npm install
npm run dev:backend
npm run dev:frontend
```

Default login:
- email: `admin@homeserver.local`
- password: `admin123!`

## Testing

```bash
npm --workspace backend run test
npm --workspace frontend run test
```

## Deployment (Dockerized)

```bash
cp .env.example .env
docker compose up --build
```

Services:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:4000`
- Swagger: `http://localhost:4000/docs`

## Security Recommendations
- Replace default JWT secret and admin seed password before first run.
- Put backend behind TLS reverse proxy (Nginx/Caddy/Traefik).
- Restrict Docker socket mount to trusted hosts only.
- Add persistent DB layer (Prisma migrations + managed Postgres backups).
- Enable 2FA/TOTP in next iteration.

## Performance Tips
- Reduce metric emission frequency in `ws/socket.ts` for low-power devices.
- Add Redis cache for plugin/metrics snapshots in multi-node setups.
- Paginate large log queries and stream download exports.
- Use frontend code splitting for plugin-specific panels.
