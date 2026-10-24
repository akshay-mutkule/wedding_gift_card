# 💍 Eternal Love — Royal Digital Wedding Gift Card & Memory Experience

A luxury-tier, highly interactive digital wedding invitation, storybook, and celebration portal crafted with **React 18**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. Designed to deliver an unforgettable royal experience with 3D wax-sealed unboxing, live countdowns, ceremonial itineraries, interactive guestbooks, couple trivia, sound effects synthesis, and high-resolution keepsake souvenir generation.

---

## ✨ Advanced Features

### 👑 1. 3D Royal Wax-Sealed Envelope Unboxing
- Realistic crimson & 24K gold envelope with monograms `A & A`.
- Tap to crack the wax seal with tactile audio feedback and unfold the royal parchment invitation scroll.

### ⏳ 2. Auspicious Live Countdown & Milestones
- Real-time countdown clock (Days, Hours, Minutes, Seconds) ticking down to the wedding moment.
- Togetherness counters (Days of Love, Coffee Dates, Cities Explored, Infinite Promises).
- One-tap **Add to Google Calendar** and **.ics export** for Apple Calendar & Outlook.
- Instant venue address clipboard copy.

### 📜 3. The Royal Itinerary & Ceremonies Guide
- Five royal event spotlights: *Mehendi & Sangeet*, *Haldi & Phoolon Ki Holi*, *The Royal Baraat*, *The Sacred Pheras*, and *Imperial Reception Gala*.
- Detailed event timing, venue locations, dress code color swatches, and Google Maps directions link.

### 📖 4. Interactive Memory Scrapbook
- Digital physical book experience with realistic page-turning animations.
- Polaroid snapshots with captions, dried floral decorators, and wax seals.
- Responsive two-page desktop spread and single-page mobile flip.

### 💖 5. Digital Guestbook & Live Wishes Wall
- Guests can leave personalized wedding blessings with custom ceremonial seal stamps (`🌸`, `💍`, `🥂`, `🪷`, `🕊️`, `✨`).
- Persistent storage using `localStorage` so messages stay saved across sessions.
- Real-time like counters and floating live emoji reaction bursts across the screen.

### 🏆 6. Romantic Couple Trivia Challenge
- "How Well Do You Know Aarav & Ananya?" mini-quiz.
- Instant answer feedback, behind-the-scenes fun facts, score tallying, and Cupid's VIP ranking badges.

### 🖼️ 7. Digital Keepsake Invitation Card Generator
- Instant HTML5 Canvas rendering of a high-resolution royal invitation keepsake card.
- Download directly as a high-definition PNG image or share via the Web Share API.

### 🌸 8. Dual-Cannon Rose Petal & Gold Foil Confetti
- Floating "Shower Blessings" action button that cascades vibrant rose petals and 24K gold foil flakes across the viewport.

### 🎵 9. Ambient Audio Player & Web Audio SoundFX Synthesizer
- Built-in multi-track romantic music player with volume slider and playlist drawer.
- Zero-latency Web Audio API synthesizer for harp glissandos, wax seal stamps, page-turn swooshes, and wedding blessing bells.
- Interactive SFX mute/unmute control.

---

## 🛠️ Tech Stack

- **Frontend:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS with custom glassmorphism and gold gradients
- **Animations:** Framer Motion (`motion/react`)
- **Particle Effects:** `canvas-confetti` + Custom Canvas Petal Physics
- **Audio Engine:** HTML5 Audio + Web Audio API synthesizer
- **Icons:** `lucide-react`
- **Backend / Production Server:** Node.js Express server (`server.js`)

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

```bash
npm run build
npm start
```

### Deploying to Render, Heroku, or Cloud VPS

This repository is pre-configured with a production-ready Express server (`server.js`):

- **Build Command:** `npm run build` (or `yarn build`)
- **Start Command:** `npm start` (or `yarn start`)
- **Port:** Uses `process.env.PORT` or defaults to `3000`.

---

## 📁 Project Structure

```text
├── src/
│   ├── assets/images/       # Bundled high-resolution couple photographs
│   ├── components/          # Modular React components
│   │   ├── AmbientBackground.tsx    # Canvas floating petals & bokeh engine
│   │   ├── BlessingCannonFAB.tsx    # Floating flower petal & gold confetti cannon
│   │   ├── CountdownSection.tsx     # Live countdown, stats & calendar export
│   │   ├── FinalSection.tsx         # Floating lanterns & wedding rings finale
│   │   ├── HeroSection.tsx          # Majestic landing & quick action triggers
│   │   ├── KeepsakeModal.tsx        # Canvas digital invitation card generator
│   │   ├── LoadingScreen.tsx        # Asset preloading with gold progress bar
│   │   ├── LoveQuizSection.tsx      # Interactive romantic trivia challenge
│   │   ├── MemoryBookSection.tsx    # Page-flipping polaroid scrapbook
│   │   ├── MusicPlayer.tsx          # Ambient playlist audio deck
│   │   ├── RoyalEnvelopeModal.tsx   # 3D wax-sealed invitation unboxing
│   │   ├── RoyalItinerarySection.tsx# Ceremonies guide & dress code schedules
│   │   ├── SlideshowSection.tsx     # Fullscreen photo slideshow
│   │   ├── TimelineSection.tsx      # 3D carousel milestone journey
│   │   └── WishesWallSection.tsx    # Guestbook, likes & floating reactions
│   ├── data/
│   │   └── weddingData.ts   # Couple details, events, trivia & playlists
│   ├── utils/
│   │   └── soundFX.ts       # Web Audio API romantic sound effect synthesizer
│   ├── types.ts             # Shared TypeScript models
│   ├── App.tsx              # Main orchestrator & floating header navigation
│   └── main.tsx             # React DOM entry point
├── server.js                # Express static server for cloud hosting
├── package.json             # Build scripts and dependencies
└── vite.config.ts           # Vite configuration
```

---

## 💖 Customization

To adapt this card for any other wedding or celebration:
1. Replace or add photos in `src/assets/images/`.
2. Update names, dates, events, trivia questions, and vows in `src/data/weddingData.ts`.
3. Customize the document title in `index.html`.

---

## 📄 License

Created with ❤️ for special celebrations.
