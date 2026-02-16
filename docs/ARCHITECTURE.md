# Home Server Management Platform Architecture

## Current-state analysis
The repository originally started as a single-file browser demo with no server-side security boundary.

Primary limitations identified:
- No backend auth/RBAC enforcement
- No API abstraction for system/docker/file actions
- No durable data model for users, logs, plugins, and rules
- No real-time transport for metrics and state changes

## Target architecture
- **Frontend**: React + Tailwind SPA (dark-first, responsive).
- **Backend**: Node.js/Express REST API + Socket.IO realtime channel.
- **Data**: Prisma schema for PostgreSQL models.
- **Runtime integration**: Docker API through dockerode.

## Scalable module boundaries

### Backend modules
- Auth + access control
- Metrics + history sampling
- Docker manager (containers + compose scaffold)
- Plugin marketplace
- Reverse proxy manager
- File manager (sandboxed root)
- Logs + audit
- Alert rules + notification event stream
- Platform utilities (backup import/export, API usage stats)

### Frontend modules
- Authentication shell
- Dashboard overview widgets
- Docker controls
- Plugin manager
- Monitoring/alerts widgets
- Logs and analytics panels

## Security and reliability guardrails
- Helmet headers
- API and auth rate limiting
- JWT auth and role middleware
- Audited privileged actions
- File path sandbox resolver
- Session timeout scaffold on client

## Implementation strategy (feature-by-feature)
1. Harden API foundation and auth.
2. Add realtime metrics + history storage.
3. Introduce Docker management endpoints.
4. Add plugin discovery and lifecycle APIs.
5. Deliver reverse proxy + backup scaffolds.
6. Build responsive frontend panels per module.
7. Add tests and deployment packaging.

## Deployment topology
Docker Compose services:
- `postgres`
- `backend`
- `frontend` (Nginx static serve)

Optional: mount `/var/run/docker.sock` for real container controls.
