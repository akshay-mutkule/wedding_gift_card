import { WeddingData } from "../types";
import firstSmileImg from "../assets/images/couple_first_smile_1784539763659.jpg";
import proposalImg from "../assets/images/couple_proposal_1784539778986.jpg";
import palaceImg from "../assets/images/couple_palace_1784539793889.jpg";
import weddingImg from "../assets/images/couple_wedding_1784539809510.jpg";
import themeBgImg from "../assets/images/wedding_theme_bg_1784539824601.jpg";

// Note: Using the imported assets so they are bundled correctly in production
export const weddingImages = {
  firstSmile: firstSmileImg,
  proposal: proposalImg,
  palace: palaceImg,
  wedding: weddingImg,
  themeBg: themeBgImg
};

export const weddingData: WeddingData = {
  couple: {
    groom: "Aarav",
    bride: "Ananya",
    namesJoined: "Aarav ❤️ Ananya",
    weddingDate: "December 18, 2026",
    weddingVenue: "The Royal Palace Resort, Jaipur"
  },
  quotes: [
    "Every love story is beautiful, but ours is my favorite.",
    "You are my today and all of my tomorrows.",
    "Forever begins now, with hand in hand and hearts aligned.",
    "Our journey has just begun, and the best is yet to come.",
    "In your smile, I see something more beautiful than the stars.",
    "Two lives, two hearts, joined together in one everlasting love."
  ],
  timeline: [
    {
      id: "first-meet",
      title: "Our First Smile",
      date: "September 14, 2023",
      description: "A random encounter in a cozy corner cafe turned into a beautiful conversation that neither of us wanted to end.",
      image: weddingImages.firstSmile,
      quote: "It only took a single smile to change my world forever.",
      details: [
        "Met at the Artisan Coffee Roasters, Jaipur",
        "Talked for 4 hours about books, travel, and dreams",
        "Exchanged numbers with trembling hands"
      ]
    },
    {
      id: "proposal",
      title: "The Golden Proposal",
      date: "October 20, 2024",
      description: "Under a canopy of shimmering fairy lights, Aarav got down on one knee in a fragrant manicured garden as the sun dipped behind the hills.",
      image: weddingImages.proposal,
      quote: "My easiest 'Yes' in a lifetime of decisions.",
      details: [
        "Happened at the Private Mughal Gardens",
        "Aarav customized a rose-gold diamond ring",
        "Accompanied by a violin playing their favorite melody"
      ]
    },
    {
      id: "palace-shoot",
      title: "Moments We Treasure",
      date: "April 12, 2025",
      description: "Walking hand-in-hand through the majestic arches of Jaipur's royal courtyards, creating memories we would cherish for eternity.",
      image: weddingImages.palace,
      quote: "In the midst of timeless royalty, we found our forever.",
      details: [
        "Pre-wedding shoot at Amber Fort Courtyard",
        "Dressed in traditional royal fusion pastel attire",
        "Caught in authentic moments of laughter and grace"
      ]
    },
    {
      id: "forever",
      title: "Our Beautiful Journey",
      date: "December 18, 2026",
      description: "The culmination of our promise. Dressed in royal sherwani and a breathtaking rose-gold lehenga, gazing into the future together.",
      image: weddingImages.wedding,
      quote: "Forever begins now.",
      details: [
        "Traditional Anand Karaj & Royal Hindu Wedding Ceremony",
        "Surrounded by family, lifelong friends, and infinite blessings",
        "A grand celebration of love, laughter, and new beginnings"
      ]
    }
  ],
  scrapbook: [
    {
      id: "scrap-1",
      title: "The Coffee Date",
      date: "Sept 14, 2023",
      memory: "Aarav spilled half his latte because he was so distracted by Ananya's eyes. It was clumsy, funny, and absolutely perfect.",
      image: weddingImages.firstSmile,
      polaroidCaption: "Where it all began ☕",
      decorator: "sparkle"
    },
    {
      id: "scrap-2",
      title: "The Perfect Ring",
      date: "Oct 20, 2024",
      memory: "Ananya couldn't stop crying of happiness. She said 'Yes' before Aarav could even finish his speech. We stood hugging for ten minutes.",
      image: weddingImages.proposal,
      polaroidCaption: "He asked, She said yes! 💍",
      decorator: "rose"
    },
    {
      id: "scrap-3",
      title: "Palace Wanderlust",
      date: "Apr 12, 2025",
      memory: "We spent the day exploring ancient corridors. We raced up the spiral stairs and watched the sunrise paint the city pink.",
      image: weddingImages.palace,
      polaroidCaption: "Lost in history, found in love ✨",
      decorator: "gold-leaf"
    },
    {
      id: "scrap-4",
      title: "The Royal Beginning",
      date: "Dec 18, 2026",
      memory: "Looking into each other's eyes before walking towards the sacred vows. Our hearts beat as one, knowing we had finally arrived home.",
      image: weddingImages.wedding,
      polaroidCaption: "Two hearts, one path ❤️",
      decorator: "heart"
    }
  ],
  slideshowImages: [
    {
      src: weddingImages.firstSmile,
      alt: "Aarav & Ananya Sharing a Smile",
      caption: "Our First Smile",
      quote: "In your laugh, I heard the song of my soul."
    },
    {
      src: weddingImages.proposal,
      alt: "The Sunset Proposal",
      caption: "The Proposal",
      quote: "And suddenly, all the love songs were about you."
    },
    {
      src: weddingImages.palace,
      alt: "Timeless Palace Walk",
      caption: "Moments in Jaipur",
      quote: "With you, every day is a walk through paradise."
    },
    {
      src: weddingImages.wedding,
      alt: "Our Forever Bond",
      caption: "Our Wedding Promise",
      quote: "I will love you today, tomorrow, and for all eternity."
    },
    {
      src: weddingImages.themeBg,
      alt: "Aarav & Ananya Theme",
      caption: "Our Love Story",
      quote: "Two Hearts. One Journey. One Forever."
    }
  ],
  playlist: [
    {
      id: "song-1",
      title: "Romantic Memories",
      artist: "Acoustic Piano & Cello",
      url: "https://assets.mixkit.co/music/preview/mixkit-romantic-memories-138.mp3"
    },
    {
      id: "song-2",
      title: "Delicate Keys",
      artist: "Soft Instrumental Piano",
      url: "https://assets.mixkit.co/music/preview/mixkit-delicate-keys-571.mp3"
    },
    {
      id: "song-3",
      title: "Beautiful Dream",
      artist: "Symphonic Strings Orchestral",
      url: "https://assets.mixkit.co/music/preview/mixkit-beautiful-dream-preview-583.mp3"
    },
    {
      id: "song-4",
      title: "Dreaming Big",
      artist: "Inspiring Romance Piano",
      url: "https://assets.mixkit.co/music/preview/mixkit-dreaming-big-31.mp3"
    }
  ]
};
