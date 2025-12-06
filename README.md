# Minimalist Home Server Dashboard  --THIS IS A DEMO

A demo version of a sleek, home lab dashboard. Open in any modern browser — no Node.js, no build steps, fully functional for demonstration purposes.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Features

-   **Single File Architecture**: The entire dashboard is contained in `index.html`. No build steps, no Node.js required.
-   **Security**: Client-side login protection (Default: `dhyandev` / `keerthana`).
-   **Customizable**: Change themes (Light/Dark), accent colors, and background images directly from the UI.
-   **Local Persistence**: All settings, notes, and uploaded posters are saved to your browser's `localStorage`.
-   **Smart Widgets**:
    -   **Weather**: Auto-locating weather widget using Open-Meteo API.
    -   **System Stats**: (Simulated) Real-time CPU/RAM/Disk monitoring.
    -   **App Launcher**: Quick links to common self-hosted services (Jellyfin, Pi-hole, etc.).
    -   **Poster Wall**: Manage your own media art wall with local upload support.

## 🚀 Getting Started

1.  Download `index.html`.
2.  Open it in any modern web browser.
3.  Login with default credentials:
    -   **User**: `dhyandev`
    -   **Pass**: `keerthana`

## ⚙️ Configuration

Click the **Settings Gear (⚙️)** to:
-   Set your **Display Name**.
-   Enter your **City Coordinates** (Lat/Lon) for accurate weather.
-   Paste a **Background Image URL** for custom wallpapers.
-   **Backup**: To backup your dashboard, simply save the `index.html` file and note that data is stored in your browser.

## 🛠️ Tech Stack

-   **HTML5 & CSS3**: Custom CSS variables for theming and Glassmorphism.
-   **JavaScript (ES6+)**: Vanilla JS for logic, no frameworks.
-   **Font Awesome**: Icons (loaded via CDN).
-   **Google Fonts**: Inter (loaded via CDN).

## 📄 License

MIT License. Free to use and modify for your personal homelab.


