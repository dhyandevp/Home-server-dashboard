# Home Server Management Platform

A lightweight, production-oriented homelab platform inspired by UmbrelOS, CasaOS, and TrueNAS SCALE.

## What was improved
- Added architecture-first documentation and modular monorepo structure.
- Expanded backend with API usage analytics, metric history, alert evaluation, backup import/export, compose deployment scaffold, and richer plugin lifecycle APIs.
- Expanded frontend dashboard with:
  - Dark/light mode toggle
  - Container action controls (start/stop/restart)
  - Plugin enable/disable controls
  - CPU history sparkline
  - Alert rule quick-create panel
  - API usage analytics panel
- Added session timeout scaffolding and optional 2FA code field.

## Stack
- Frontend: React + Vite + TailwindCSS
- Backend: Express + Socket.IO
- Database schema: Prisma (PostgreSQL)
- Docker integration: dockerode

## Folder Structure
```text
.
├── backend/
│   ├── prisma/schema.prisma
│   ├── src/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   └── ws/
│   └── tests/
├── frontend/
│   └── src/
│       ├── components/
│       ├── hooks/
│       ├── pages/
│       └── services/
├── docs/ARCHITECTURE.md
├── docker-compose.yml
└── .env.example
```

## Implemented Features
1. **Dashboard Overview**: realtime CPU/RAM/disk/network/uptime/temp + history panel.
2. **Docker Manager**: list containers + start/stop/restart + logs + compose deploy scaffold.
3. **Service Marketplace**: plugin auto-discovery + install/toggle/delete endpoints.
4. **Reverse Proxy Manager**: domain->target records + nginx snippet preview.
5. **File Manager**: sandboxed list/read/write/upload APIs.
6. **Logs Center**: audit logs, search filter, JSON export.
7. **Monitoring & Alerts**: alert rules + in-memory notification events.
8. **Authentication & Security**: JWT, RBAC, login limiter, API limiter, helmet, session timeout scaffold.
9. **API Layer**: REST + Socket.IO + Swagger docs + API usage stats endpoint.
10. **Mobile Mode**: responsive Tailwind layout and compact controls.

## Database Schema
`backend/prisma/schema.prisma`
- User
- AuditLog
- Plugin
- AlertRule
- ProxyRoute

## Local Development
```bash
npm install
npm run dev:backend
npm run dev:frontend
```

Default login:
- `admin@homeserver.local`
- `admin123!`

## Tests
```bash
npm --workspace backend run test
npm --workspace frontend run test
```

## Deployment (Docker)
```bash
cp .env.example .env
docker compose up --build
```

## Security recommendations
- Rotate JWT secret and default credentials before deployment.
- Protect Docker socket access.
- Put behind TLS reverse proxy.
- Add persistent DB integration + migrations for production.
- Implement real TOTP verification and webhook delivery workers.
