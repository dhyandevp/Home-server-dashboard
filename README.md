# 🏠 Minimalist Home Server Dashboard — DEMO

⚠️ **Note:** This is a demo version. While the full working version exists, it cannot be shared. You are encouraged to make any changes you see fit in this demo.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🔒 Why This is a Demo Version

The full production version of this dashboard includes sensitive configurations and security implementations that cannot be publicly shared:

- **Security Concerns:** Real authentication systems, API keys, server endpoints, and security tokens
- **Privacy Issues:** Personal network configurations, internal IP addresses, and private service URLs
- **Custom Integrations:** Proprietary connections to personal services and hardware
- **Database Credentials:** Sensitive connection strings and authentication details
- **Legal Considerations:** Third-party service integrations with usage restrictions

This demo provides the core functionality and UI/UX experience while using simulated data and client-side storage only.

## ✨ Features (Local Demo)

### Available in Demo:
- **Single File Architecture** — Everything lives in `index.html`. Open directly in your browser.
- **Local-Only Security** — Client-side login (Default: `dhyandev` / `keerthana`).
- **Customizable Themes** — Light/Dark mode, accent colors, background images (local changes only).
- **Local Persistence** — Notes, settings, and uploaded posters are saved in your browser (localStorage).
- **Smart Widgets:**
  - **Weather:** Auto-locates your city using Open-Meteo API.
  - **System Stats:** Simulated CPU, RAM, Disk usage.
  - **App Launcher:** Quick links to home services (Jellyfin, Pi-hole, etc.).
  - **Poster Wall:** Upload and manage a personal media wall.
  - **Notes Widget:** Save quick notes locally.
  - **Clock & Calendar:** Real-time local time and date.
  - **Custom Links:** Add and organize your own local server URLs.
  - **Theme Presets:** Switch between prebuilt themes or customize your own.

⚠️ **Important:** This demo is intended for local use only and is not secure for public hosting.

## 🚀 Professional Features (Full Version Only)

The production version includes enterprise-grade features not available in this demo:

### Security & Authentication
- **Multi-User Support** — Role-based access control (Admin, User, Guest)
- **OAuth Integration** — Login with Authentik, Authelia, or Keycloak
- **2FA/MFA** — Two-factor authentication via TOTP or hardware keys
- **Session Management** — Secure token-based sessions with auto-expiration
- **SSL/TLS Encryption** — End-to-end encrypted communications
- **Audit Logs** — Track all user actions and system events

### Real System Monitoring
- **Live Docker Stats** — Real-time container monitoring (CPU, memory, network, status)
- **Hardware Metrics** — Actual CPU temperature, disk I/O, network throughput
- **Service Health Checks** — Automatic ping monitoring for all services
- **Alert System** — Email/SMS/Push notifications for downtime or threshold breaches
- **Historical Data** — Performance graphs and trends over time (powered by InfluxDB/Prometheus)
- **Resource Predictions** — AI-powered capacity planning and usage forecasts

### Advanced Integrations
- **Docker Management** — Start/stop/restart containers directly from dashboard
- **Portainer Integration** — Full container orchestration
- **Proxmox/ESXi Support** — VM management and monitoring
- **Database Connections** — Direct queries to PostgreSQL, MySQL, MongoDB
- **Home Automation** — Smart home device control (Home Assistant, MQTT)
- **Media Server APIs** — Deep integration with Plex/Jellyfin/Emby (watch history, recommendations)
- **Network Tools** — Wake-on-LAN, port scanning, bandwidth monitoring

### Data & Backup
- **Centralized Logging** — Aggregated logs from all services (Loki, Elasticsearch)
- **Automated Backups** — Scheduled snapshots with version control
- **Cloud Sync** — Optional sync to personal cloud storage (Nextcloud, S3)
- **Export/Import** — Full dashboard configuration portability

### Communication & Collaboration
- **RSS Feed Reader** — Aggregate news and updates
- **Notification Center** — Unified inbox for all system alerts
- **Calendar Integration** — Sync with CalDAV/Google Calendar
- **Task Management** — Built-in to-do lists with reminders
- **File Browser** — Navigate and manage server files (SMB/NFS shares)

### Performance & Scalability
- **Caching Layer** — Redis-powered for instant load times
- **WebSocket Connections** — Real-time updates without page refresh
- **Mobile App** — Native iOS/Android apps with offline support
- **API Access** — RESTful API for third-party integrations
- **Multi-Server Support** — Manage multiple home servers from one dashboard

### Customization & Automation
- **Widget Marketplace** — Install community-created widgets
- **Custom Scripts** — Run bash/Python scripts with one click
- **Automation Rules** — If-this-then-that logic for smart workflows
- **Voice Commands** — Control dashboard via voice assistant integration
- **Public/Private Mode** — Guest view with limited access to non-sensitive data

## 🎯 Getting Started

1. Download `index.html`.
2. Open it in a modern browser on your home server or local machine.
3. Login with default credentials:
   - **User:** `dhyandev`
   - **Pass:** `keerthana`
4. Explore widgets, upload posters or notes, and customize your dashboard — all changes are saved locally.

## ⚙️ Configuration

Click the **Settings Gear (⚙️)** to:

- Set your **Display Name**.
- Enter **City Coordinates** (Lat/Lon) for accurate weather.
- Paste a **Background Image URL** for custom wallpapers.
- Add custom app links for your home server.

**Backup:** Save the `index.html` file to retain your settings and uploaded content.

## 🛠️ Tech Stack

### Demo Version:
- **HTML5 & CSS3** — Modern theming with CSS variables and Glassmorphism.
- **JavaScript (ES6+)** — Vanilla JS, no frameworks.
- **Font Awesome** — Icon library via CDN.
- **Google Fonts** — Inter font via CDN.

### Full Version (Additional):
- **Backend:** Node.js/Python Flask with Express/FastAPI
- **Database:** PostgreSQL, Redis
- **Monitoring:** Prometheus, Grafana, InfluxDB
- **Containerization:** Docker, Docker Compose
- **Authentication:** OAuth 2.0, JWT tokens
- **Real-time:** WebSocket (Socket.io)
- **APIs:** Docker Engine API, System APIs (psutil)

## 🔐 Security Notice

This demo uses client-side authentication which is **NOT SECURE** for production use. The full version implements:
- Server-side authentication with password hashing (bcrypt/Argon2)
- Rate limiting and brute force protection
- CSRF token validation
- Content Security Policy (CSP) headers
- Regular security audits and updates

## 📄 License

MIT License — free to use and modify for personal, local use only.
