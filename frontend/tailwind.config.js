/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        // System Base
        background: '#020617', // Slate 950
        panel: '#0f172a',      // Slate 900
        surface: '#1e293b',    // Slate 800

        // Borders
        border: '#1e293b',     // Slate 800

        // Accents (Cyan/Blue Cyberpunk)
        primary: {
          DEFAULT: '#06b6d4', // Cyan 500
          foreground: '#ffffff',
        },
        accent: {
          DEFAULT: '#0ea5e9', // Sky 500
          foreground: '#ffffff',
        },

        // Semantic
        destructive: {
          DEFAULT: '#ef4444', // Red 500
          foreground: '#ffffff',
        },
        success: '#22c55e', // Green 500
        warning: '#eab308', // Yellow 500
        info: '#3b82f6',    // Blue 500

        // UI Elements
        input: '#1e293b',
        ring: '#06b6d4',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    }
  },
  plugins: []
};
