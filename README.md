# 💍 Eternal Love — Digital Wedding Gift Card & Memory Book

A modern, elegant, and interactive digital wedding experience crafted with **React 18**, **Tailwind CSS**, and **Framer Motion**. Designed to celebrate love with responsive animations, interactive photo scrapbooks, a romantic story timeline, customizable vows, and ambient background music.

---

## ✨ Features

- **⚡ Instant Interactive Hero:** Fast and fluid entrance transition triggered by tapping the heart icon.
- **📖 Memory Scrapbook:** Page-turning digital memory book featuring polaroid photos, wax seals, and romantic journal entries.
- **⏳ Romantic Journey Timeline:** Interactive 3D carousel highlighting milestone moments from first smile to wedding day.
- **📸 High-Definition Slideshow:** Auto-playing photo slideshow with custom controls and romantic captions.
- **🎵 Ambient Music Player:** Built-in floating audio player with playlist selector and ambient web audio synthesis.
- **💌 Wedding Vows & Wishes:** Interactive blessing card and virtual guestbook section to leave heartfelt messages.
- **📱 100% Mobile Friendly:** Optimised responsive layouts with smooth touch controls for smartphone and tablet screens.

---

## 🛠️ Tech Stack

- **Frontend Framework:** React 18 with Vite
- **Styling & Layout:** Tailwind CSS
- **Animations:** `motion/react` (Framer Motion)
- **Icons:** `lucide-react`
- **Backend / Deployment Server:** Node.js Express server (`server.js`)
- **Language:** TypeScript

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.x or later)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/akshay-mutkule/wedding_gift_card.git
   cd wedding_gift_card
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start local development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   Open your browser at `http://localhost:3000`.

---

## 📦 Building & Production Deployment

### Local Production Build

To test the production build locally:

```bash
npm run build
npm start
```

### Deploying to Render / Heroku / Cloud Hosts

This repository includes a production Express server (`server.js`) that serves static assets from `dist/`:

- **Build Command:** `npm run build` (or `yarn build`)
- **Start Command:** `npm start` (or `yarn start`)
- **Port:** Uses `process.env.PORT` or defaults to `3000`.

---

## 📁 Project Structure

```text
├── src/
│   ├── assets/        # High-res bundled couple photos & backgrounds
│   ├── components/    # Modular React components
│   │   ├── LoadingScreen.tsx
│   │   ├── HeroSection.tsx
│   │   ├── TimelineSection.tsx
│   │   ├── SlideshowSection.tsx
│   │   ├── MemoryBookSection.tsx
│   │   ├── VowsSection.tsx
│   │   └── MusicPlayer.tsx
│   ├── data/          # Wedding data & story content
│   ├── types.ts       # Shared TypeScript interfaces
│   ├── App.tsx        # Main application layout
│   └── main.tsx       # Entry point
├── server.js          # Express server for static file hosting in production
├── package.json       # Build scripts and dependencies
└── vite.config.ts     # Vite configuration
```

---

## 💖 Customization

To personalize this wedding gift card for a different couple:
1. Update photo assets in `src/assets/images/`.
2. Edit story milestones and memories in `src/data/weddingData.ts`.
3. Customize page titles in `index.html`.

---

## 📄 License

Created with ❤️ for special celebrations.
