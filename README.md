# 💍 Eternal Love — Royal Digital Wedding Portal & Experience

A luxury-tier, highly interactive royal wedding invitation, storybook, and celebration portal crafted with **React 19**, **TypeScript**, **Tailwind CSS v4**, and **Motion**. Designed to deliver an unforgettable royal palace celebration experience featuring digital RSVP boarding pass generation, 3D wax-sealed unboxing, venue blueprint exploration with Jaipur weather, DJ Sangeet voting jukebox, sky lantern release ceremony, live countdowns, couple trivia, Web Audio synthesis, and downloadable HD canvas keepsakes.

---

## ✨ Advanced Royal Capabilities

### 🎫 1. Digital RSVP & Royal Boarding Pass Generator
- Multi-step digital RSVP: guest party size (+1s counter), ceremony attendance checklist (Haldi, Mehendi, Sangeet, Vedic Pheras, Reception), gourmet royal feast dietary preference (Royal Mughlai, Pure Vegetarian Rajasthani Thali, Jain Traditional, Vegan/Gluten-Free), and Sangeet song requests.
- **Instant High-Res Boarding Pass Generator:** HTML5 Canvas engine generates an authentic royal gold-framed boarding pass complete with unique booking code (`#ROYAL-2026-xxxx`), VIP seating tier, venue gate protocol, barcode graphic, and scannable QR monogram.
- Downloadable directly as an HD PNG souvenir pass, with persistent `localStorage` preservation.

### 🏰 2. Interactive Palace Grounds 360° Explorer & Concierge
- Interactive estate blueprint mapping the 5 key ceremonial grounds:
  - *The Sacred Mandap by the Lotus Waters* (Pheras & Vedic Vows)
  - *The Sheesh Mahal Glass Ballroom* (Royal Sangeet & Musical Night)
  - *Courtyard of 100 Fountains* (Royal Baraat Welcome)
  - *The Scented Mughal Gardens* (Haldi & Yellow Splendor)
  - *The Sunset Heritage Terraces* (Mehendi & Folk High Tea)
- **Live Jaipur Climate Forecast:** Real-time 23°C clear skies indicator, sunset golden hour photography recommendations, and evening shawl advisories.
- **Palace Concierge Desk:** Airport & railway distances, 24/7 valet service details, and one-click Google Maps navigation.

### 🏮 3. Deep Daan & Sky Lantern Release Ceremony
- Sacred Vedic Diya Altar: Interactive brass diya that ignites with a flickering sacred flame when tapped.
- **Sky Lantern Release:** Inscribe a personal prayer or wish, pick a royal flame glow (24K Amber, Rose Ruby, Emerald, or Celestial Violet), and watch your lantern ascend into the starry midnight canopy above the Aravali hills.
- Web Audio ascending sine synthesizer (`playLanternRise`) accompanied by gold petal confetti.
- Community lantern feed and live counter preserved in `localStorage`.

### 📻 4. The Royal Sangeet DJ Jukebox & Dance Floor Voting
- Interactive wedding DJ chart with top dance floor anthems across 4 curated genres: *Bhangra & Dhol*, *Bollywood Romance*, *Sufi & Qawwali*, and *Retro 90s Golden*.
- **Live Guest Upvoting:** Guests can upvote tracks to climb the DJ leaderboard (🥇 Gold, 🥈 Silver, 🥉 Bronze), with sound feedback.
- **Request a Song for the DJ:** Add custom tracks to the live chart with dedications.
- Audio pitch synthesizer preview buttons for song melodies.

### 🎨 5. Royal Palace Atmosphere Theme Switcher
- One-click atmosphere switcher in the floating navigation:
  - **Midnight Obsidian:** Classic deep onyx with 24K polished gold and warm amber.
  - **Emerald Palace:** Imperial peacock emerald with gold filigree and champagne accents.
  - **Velvet Ruby:** Rich Rajasthani crimson ruby with antique gold and candlelight glow.

### 🎵 6. Stereo Audio Player with Real-time Spectrum Visualizer
- Multi-track royal wedding symphony player with volume slider, progress seeker, and playlist drawer.
- **Dynamic Equalizer Waveform:** 24-channel dancing gold spectrum frequency bars synced to track playback.

### 👑 7. 3D Royal Wax-Sealed Envelope Unboxing
- Realistic crimson & 24K gold envelope with monograms `A & A`.
- Tap to crack the wax seal with tactile audio feedback and unfold the royal parchment invitation scroll.

### ⏳ 8. Auspicious Live Countdown & Milestones
- Real-time countdown clock (Days, Hours, Minutes, Seconds) ticking down to the wedding moment.
- Togetherness counters (Days of Love, Coffee Dates, Cities Explored, Infinite Promises).
- One-tap **Add to Google Calendar** and **.ics export** for Apple Calendar & Outlook.
- Instant venue address clipboard copy.

### 📜 9. The Royal Itinerary & Ceremonies Guide
- Five royal event spotlights with timings, dress code recommendations, color palettes, and venue coordinates.

### 📖 10. Interactive Memory Scrapbook
- Digital physical book experience with realistic page-turning animations, polaroid snapshots with captions, and dried floral decorators.

### 💖 11. Digital Guestbook & Live Wishes Wall
- Guests can leave personalized wedding blessings with custom ceremonial seal stamps (`🌸`, `💍`, `🥂`, `🪷`, `🕊️`, `✨`).
- Persistent storage using `localStorage` with real-time like counters and floating reaction bursts.

### 🏆 12. Romantic Couple Trivia Challenge
- "How Well Do You Know Aarav & Ananya?" mini-quiz with answer feedback, fun facts, and Cupid's VIP ranking badges.

### 🖼️ 13. Digital Keepsake Invitation Card Generator
- Instant HTML5 Canvas rendering of a high-resolution royal invitation keepsake card with PNG download.

### 🌸 14. Dual-Cannon Rose Petal & Gold Foil Confetti
- Floating "Shower Blessings" action button that cascades vibrant rose petals and gold foil flakes across the screen.


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
