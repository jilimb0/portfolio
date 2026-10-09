# 🖥️ Interactive macOS-Style Portfolio

A premium, interactive desktop environment portfolio built with **React** and **CSS Modules**. It simulates a macOS desktop experience, featuring draggable icons, responsive grid snapping, an animated dock, and live interactive project windows using iframe embeds.

Live Deployed URL: **[maksympanasenko.netlify.app](https://maksympanasenko.netlify.app)**

---

## ✨ Features

- **📱 Live Iframe Embedding**: Opening a portfolio item loads the actual live site directly inside a draggable macOS-style window, with fallback loading spinners and a mobile-friendly screenshot layout.
- **🎛️ Dynamic Glassmorphic Dock**: A custom dock featuring scale magnification physics depending on mouse distance and standard running indicators (active status dots).
- **🤏 Interactive Desktop Icons**: Fully draggable icons that snap to a custom alignment grid.
- **📏 Spilling Prevention**: Automatically snaps icon boundaries back inside safe screen coordinates when resizing the browser window.
- **🌓 System Theme Detection**: Automatically matches your system light or dark preferences.
- **🔋 Performance Optimized**: Throttled drag-and-drop triggers using `requestAnimationFrame` to keep rendering at a smooth 60fps.

---

## 🛠️ Tech Stack & Tooling

- **Core**: React 19, TypeScript, HTML5, CSS Modules
- **Bundler & Dev Server**: Vite 6
- **Test Runner**: Vitest + React Testing Library
- **Quality Assurance**: Biome (Linter, formatter, import organizer)
- **Package Manager**: pnpm 10

---

## 📂 Codebase Architecture

The project is structured with modular TypeScript components:

```text
src/
├── assets/                  # Icons and wallpaper background WebP images
├── components/
│   ├── DesktopApp/
│   │   ├── components/
│   │   │   ├── AppWindow.tsx   # Project detail view, iframe embedder & actions
│   │   │   ├── DesktopDock.tsx # Bottom dock with macOS magnification physics
│   │   │   ├── DesktopIcon.tsx # Single draggable icon component
│   │   │   ├── MenuBar.tsx     # Top menu, clock, and options panel
│   │   │   └── Terminal.tsx    # Interactive terminal emulator
│   │   ├── utils/
│   │   │   └── layout.ts       # Drag clamping, grid snap calculations
│   │   ├── index.tsx           # Desktop main coordinator
│   │   └── style.module.css    # Glassmorphic custom theme system
│   └── ErrorBoundary.tsx
├── types/
│   └── portfolio.ts         # TypeScript interfaces & types
├── App.tsx                  # Application root
├── index.css                # Base HTML reset & variables
└── portfolio-db.json        # Unified project database configuration
```

---

## 🚀 Running Locally

Ensure you have [Node.js](https://nodejs.org/) installed, then run:

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Start Dev Server
```bash
pnpm dev
# or: pnpm start
```
Open **[http://localhost:3000](http://localhost:3000)** to view it in the browser.

### 3. Code Standards & Linting
Run Biome formatter and linter check:
```bash
pnpm lint
```
Auto-fix formatting and linting rules:
```bash
pnpm lint:fix
```

### 4. Build for Production
```bash
pnpm build
```
