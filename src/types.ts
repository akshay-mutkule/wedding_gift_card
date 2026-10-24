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
