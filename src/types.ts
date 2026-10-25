export interface ImageAsset {
  src: string;
  alt: string;
  caption?: string;
  quote?: string;
}

export interface TimelineItem {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
  quote: string;
  details: string[];
}

export interface ScrapbookPage {
  id: string;
  title: string;
  date: string;
  memory: string;
  image: string;
  polaroidCaption: string;
  decorator: "rose" | "sparkle" | "heart" | "gold-leaf";
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  url: string;
}

export interface WeddingEvent {
  id: string;
  title: string;
  subTitle: string;
  date: string;
  time: string;
  venue: string;
  dressCode: string;
  description: string;
  badge: string;
  iconName: "music" | "sun" | "sparkles" | "flame" | "glass";
}

export interface GuestBlessing {
  id: string;
  author: string;
  relation: "Family" | "College Friend" | "Childhood Friend" | "Colleague" | "Well-Wisher";
  message: string;
  sealEmoji: string;
  timestamp: string;
  likes: number;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  funFact: string;
}

export type ThemeMode = "midnight" | "emerald" | "ruby";

export interface RSVPRecord {
  id: string;
  passCode: string;
  guestName: string;
  email: string;
  phone: string;
  attending: "yes" | "no";
  guestCount: number;
  ceremonies: string[];
  dietary: "Royal Mughlai Feast" | "Pure Vegetarian Feast" | "Jain Traditional" | "Vegan & Gluten-Free";
  songRequest: string;
  personalNote: string;
  createdAt: string;
}

export interface PalaceHotspot {
  id: string;
  name: string;
  hindiTitle: string;
  subtitle: string;
  description: string;
  timing: string;
  vibe: string;
  features: string[];
  image: string;
  mapCoordinates: { x: number; y: number }; // percentage on interactive palace map
}

export interface JukeboxSong {
  id: string;
  title: string;
  artist: string;
  genre: "Bhangra & Dhol" | "Bollywood Romance" | "Sufi & Qawwali" | "Retro 90s Golden";
  votes: number;
  duration: string;
  suggestedBy?: string;
  previewFrequency?: number;
}

export interface LanternWish {
  id: string;
  author: string;
  wish: string;
  color: "gold" | "rose" | "emerald" | "violet";
  timestamp: string;
  xPos: number; // percentage 5 - 90
}

export interface WeddingData {
  couple: {
    groom: string;
    bride: string;
    namesJoined: string;
    weddingDate: string;
    weddingVenue: string;
    targetTimestamp: number;
  };
  quotes: string[];
  timeline: TimelineItem[];
  scrapbook: ScrapbookPage[];
  slideshowImages: ImageAsset[];
  playlist: Song[];
  events: WeddingEvent[];
  quiz: QuizQuestion[];
  initialBlessings: GuestBlessing[];
}

