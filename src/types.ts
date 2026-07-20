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
  url: string; // We can use high-quality royalty-free instrumental audio URLs
}

export interface WeddingData {
  couple: {
    groom: string;
    bride: string;
    namesJoined: string;
    weddingDate: string;
    weddingVenue: string;
  };
  quotes: string[];
  timeline: TimelineItem[];
  scrapbook: ScrapbookPage[];
  slideshowImages: ImageAsset[];
  playlist: Song[];
}
