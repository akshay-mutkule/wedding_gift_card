import { WeddingData } from "../types";
import firstSmileImg from "../assets/images/couple_first_smile_1784539763659.jpg";
import proposalImg from "../assets/images/couple_proposal_1784539778986.jpg";
import palaceImg from "../assets/images/couple_palace_1784539793889.jpg";
import weddingImg from "../assets/images/couple_wedding_1784539809510.jpg";
import themeBgImg from "../assets/images/wedding_theme_bg_1784539824601.jpg";

// Bundled high-resolution assets
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
    weddingVenue: "The Royal Palace Resort, Jaipur",
    // Target timestamp: Dec 18, 2026 18:00:00 (Jaipur / IST)
    targetTimestamp: new Date("2026-12-18T18:00:00+05:30").getTime(),
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
  ],
  events: [
    {
      id: "evt-mehendi",
      title: "Mehendi & Sangeet Gala",
      subTitle: "An Evening of Music, Henna & Rhythmic Joy",
      date: "Dec 17, 2026",
      time: "5:30 PM Onwards",
      venue: "Courtyard of Whispering Fountains",
      dressCode: "Festive Indian & Vivid Jewel Tones",
      badge: "Evening Soirée",
      iconName: "music",
      description: "Delicate henna swirls, live dhol beats, spontaneous dance performances by family, and an enchanting twilight banquet under fairy lights."
    },
    {
      id: "evt-haldi",
      title: "Haldi & Phoolon Ki Holi",
      subTitle: "A Sunlit Morning of Turmeric & Flower Petals",
      date: "Dec 18, 2026",
      time: "10:00 AM – 1:00 PM",
      venue: "The Lotus Pavilion Terraces",
      dressCode: "Sunshine Yellow, Ochre & Warm Pastels",
      badge: "Morning Blessing",
      iconName: "sun",
      description: "A joyful traditional ceremony of fragrant turmeric paste and thousands of marigold petals showered in celebration of auspicious beginnings."
    },
    {
      id: "evt-baraat",
      title: "The Royal Baraat & Varmala",
      subTitle: "The Grand Procession & Exchange of Garlands",
      date: "Dec 18, 2026",
      time: "4:30 PM",
      venue: "Grand Palace Forecourt",
      dressCode: "Regal Traditional Elegance",
      badge: "Grand Entrance",
      iconName: "sparkles",
      description: "A majestic arrival with brass band serenades, royal turbans, and the emotional Varmala exchange as rose petals fall like celestial confetti."
    },
    {
      id: "evt-pheras",
      title: "The Sacred Pheras",
      subTitle: "Seven Sacred Vows Around the Holy Fire",
      date: "Dec 18, 2026",
      time: "6:30 PM – 8:30 PM",
      venue: "The Celestial Star Mandap",
      dressCode: "Traditional Royal Attire",
      badge: "Sacred Union",
      iconName: "flame",
      description: "Circling the eternal flame, reciting age-old Sanskrit mantras, and sealing seven lifelong promises under the starlit Rajasthani sky."
    },
    {
      id: "evt-reception",
      title: "Imperial Reception Dinner",
      subTitle: "Toasts, Fine Dining & Starlight Dancing",
      date: "Dec 18, 2026",
      time: "8:30 PM Till Midnight",
      venue: "The Sheesh Mahal Grand Ballroom",
      dressCode: "Black Tie or Royal Indian Haute Couture",
      badge: "Celebration Gala",
      iconName: "glass",
      description: "A royal culinary banquet, sparkling champagne toasts, heartfelt speeches, and music that carries the celebration well into the night."
    }
  ],
  quiz: [
    {
      id: 1,
      question: "Where did Aarav & Ananya share their very first conversation?",
      options: [
        "At a rooftop sunset party in Mumbai",
        "In a cozy artisan coffee cafe in Jaipur",
        "During a college library study group",
        "At an airport transit terminal"
      ],
      correctAnswerIndex: 1,
      funFact: "Aarav was so nervous he ordered a hot latte in peak summer just to keep talking!"
    },
    {
      id: 2,
      question: "Who said 'I Love You' first?",
      options: [
        "Aarav during a midnight stargazing drive",
        "Ananya right after her graduation ceremony",
        "Both simultaneously while getting caught in the rain",
        "Aarav's Golden Retriever accidentally spilled the secret"
      ],
      correctAnswerIndex: 0,
      funFact: "Aarav practiced the speech for 3 weeks before finally whispering it under the stars."
    },
    {
      id: 3,
      question: "What is their absolute favorite shared weekend ritual?",
      options: [
        "Marathon binge-watching historical dramas with homemade pizza",
        "Extreme mountain biking and rock climbing",
        "Going to vintage flea markets and vinyl record stores",
        "Competing in weekend pottery classes"
      ],
      correctAnswerIndex: 0,
      funFact: "They have a strict rule: the person who loses rock-paper-scissors handles dessert duty!"
    },
    {
      id: 4,
      question: "What special song was playing when Aarav proposed?",
      options: [
        "An acoustic violin rendition of their favorite indie melody",
        "A classical symphony by Chopin",
        "A lively acoustic folk duet",
        "Total silence except for the wind in the garden"
      ],
      correctAnswerIndex: 0,
      funFact: "Aarav secretly hired a classical violinist who hid behind the garden trellis until the ring came out!"
    }
  ],
  initialBlessings: [
    {
      id: "blessing-1",
      author: "Vikram & Sunita (Parents)",
      relation: "Family",
      message: "May your journey together be as timeless as the stars and as sweet as the fragrance of jasmines. Our heartfelt blessings for a lifetime of unconditional love and companionship.",
      sealEmoji: "🌸",
      timestamp: "Today at 2:15 PM",
      likes: 24
    },
    {
      id: "blessing-2",
      author: "Rohan & Dev",
      relation: "Childhood Friend",
      message: "From watching Aarav stress over his first text to seeing him marry his dream girl today—could not be prouder. May your life be filled with non-stop laughter and adventures!",
      sealEmoji: "🥂",
      timestamp: "Today at 3:40 PM",
      likes: 19
    },
    {
      id: "blessing-3",
      author: "Meera & Shreya",
      relation: "College Friend",
      message: "Ananya, you are the most radiant bride the world has ever seen. Aarav, you are one lucky gentleman. Wishing you both endless romance and dance parties!",
      sealEmoji: "💍",
      timestamp: "Today at 4:10 PM",
      likes: 31
    },
    {
      id: "blessing-4",
      author: "Dr. K. N. Sharma",
      relation: "Well-Wisher",
      message: "May God bless this sacred union with peace, abundance, and unwavering respect. May every day deepen your devotion to each other.",
      sealEmoji: "🪷",
      timestamp: "Today at 5:02 PM",
      likes: 14
    }
  ]
};

export const palaceHotspots = [
  {
    id: "mandap",
    name: "The Sacred Mandap by the Lotus Waters",
    hindiTitle: "पवित्र मण्डप",
    subtitle: "Sacred Vedic Pheras & Eternal Vows",
    description: "Framed with 10,000 scented marigolds and Mogra creepers, situated on an illuminated floating marble pavilion overlooking reflections of the Aravali hills.",
    timing: "Dec 18 • 07:00 PM onwards",
    vibe: "Divine, spiritual, candle-lit tranquility with temple bells & Vedic chants.",
    features: ["Sacred Fire Pit (Havan Kund)", "Flower Petal Showers", "Gold Brocade Seating", "Live Shenai Ensemble"],
    image: weddingImages.wedding,
    mapCoordinates: { x: 50, y: 72 }
  },
  {
    id: "sheesh-mahal",
    name: "The Sheesh Mahal Glass Ballroom",
    hindiTitle: "शीश महल",
    subtitle: "The Royal Sangeet & Musical Night",
    description: "An awe-inspiring royal hall adorned with hand-cut Belgian concave mirrors, crystal chandeliers, and an acoustic sound amphitheatre.",
    timing: "Dec 17 • 07:30 PM till late",
    vibe: "Electrifying, opulent, cocktail sparkle and bass-heavy dance floor.",
    features: ["Mirror Mosaic Walls", "LED Dance Floor", "Royal Craft Cocktail Bar", "DJ & Live Dhol Stage"],
    image: weddingImages.palace,
    mapCoordinates: { x: 74, y: 38 }
  },
  {
    id: "fountain-courtyard",
    name: "Courtyard of 100 Fountains",
    hindiTitle: "शाही बाराती प्रांगण",
    subtitle: "Royal Baraat Procession & Rose Welcome",
    description: "The grand stone ceremonial gateway where the royal procession arrives with royal caparisoned vintage cars, traditional Nagadas, and gold rose water sprays.",
    timing: "Dec 18 • 05:00 PM",
    vibe: "Regal fanfare, energetic brass band, and warm Rajasthani hospitality.",
    features: ["Illuminated Jet Fountains", "Vintage Car Arches", "Gulab Jal Welcome Gate", "Trumpet & Nagada Balcony"],
    image: weddingImages.firstSmile,
    mapCoordinates: { x: 26, y: 44 }
  },
  {
    id: "mughal-gardens",
    name: "The Scented Mughal Gardens",
    hindiTitle: "मुगल उद्यान",
    subtitle: "Sunny Haldi Ceremony & Yellow Splendor",
    description: "Manicured geometric gardens planted with night-blooming jasmine, marigold canopies, and herbal turmeric basins under the morning winter sun.",
    timing: "Dec 17 • 10:30 AM",
    vibe: "Vibrant yellow sunshine, organic marigold pool dips, and family laughs.",
    features: ["Floral Holi Flower Pool", "Turmeric Champa Stations", "Fresh Sugarcane Juice Bar", "Traditional Dholki Beats"],
    image: weddingImages.proposal,
    mapCoordinates: { x: 42, y: 22 }
  },
  {
    id: "sunset-terrace",
    name: "The Sunset Heritage Terraces",
    hindiTitle: "धरोहर छत",
    subtitle: "Mehendi & Folk High Tea",
    description: "Open-air sandstone ramparts offering an uninterrupted 360-degree panoramic vista of Jaipur's pink city skyline and golden sunset.",
    timing: "Dec 16 • 03:30 PM",
    vibe: "Intricate henna fragrance, Kalbelia folk performances, and artisan chaat.",
    features: ["Artisan Henna Master Pavilions", "Rajasthani Puppeteers", "Royal Kulhad Chai & Jalebi", "Sunset Viewpoint"],
    image: weddingImages.themeBg,
    mapCoordinates: { x: 82, y: 68 }
  }
];

export const jukeboxPlaylist = [
  {
    id: "track-1",
    title: "London Thumakda & Dhol Mashup",
    artist: "Labh Janjua & Sonu Kakkar",
    genre: "Bhangra & Dhol" as const,
    votes: 42,
    duration: "3:48",
    suggestedBy: "Groom's Squad",
    previewFrequency: 440
  },
  {
    id: "track-2",
    title: "Kesariya (Royal Sitar & Acoustic Reprise)",
    artist: "Arijit Singh & Ustad Shujaat Khan",
    genre: "Bollywood Romance" as const,
    votes: 38,
    duration: "4:12",
    suggestedBy: "Bride's Sister",
    previewFrequency: 523.25
  },
  {
    id: "track-3",
    title: "Mast Magan (Sufi Qawwali Live Ensemble)",
    artist: "Arijit Singh & Chinmayi",
    genre: "Sufi & Qawwali" as const,
    votes: 31,
    duration: "4:40",
    suggestedBy: "Aarav & Ananya",
    previewFrequency: 392
  },
  {
    id: "track-4",
    title: "Balle Balle Ni Amritsar (High Energy)",
    artist: "Sukhwinder Singh",
    genre: "Bhangra & Dhol" as const,
    votes: 27,
    duration: "3:25",
    suggestedBy: "Chacha Ji",
    previewFrequency: 493.88
  },
  {
    id: "track-5",
    title: "Pehla Nasha (Vintage 90s Orchestral)",
    artist: "Udit Narayan & Sadhana Sargam",
    genre: "Retro 90s Golden" as const,
    votes: 25,
    duration: "4:50",
    suggestedBy: "Masi & Fufa Ji",
    previewFrequency: 587.33
  },
  {
    id: "track-6",
    title: "Chaudhary & Rajasthani Folk Fusion",
    artist: "Mame Khan & Amit Trivedi",
    genre: "Sufi & Qawwali" as const,
    votes: 29,
    duration: "4:32",
    suggestedBy: "Jaipur Cultural Troop",
    previewFrequency: 659.25
  }
];

export const initialLanternWishes = [
  {
    id: "lantern-1",
    author: "Grandma Gayatri",
    wish: "May your home always be illuminated with deep peace, abundance, and eternal love.",
    color: "gold" as const,
    timestamp: "Just now",
    xPos: 22
  },
  {
    id: "lantern-2",
    author: "Arjun & Rhea",
    wish: "Dancing through every milestone hand-in-hand! Best couple forever!",
    color: "rose" as const,
    timestamp: "5 mins ago",
    xPos: 48
  },
  {
    id: "lantern-3",
    author: "Uncle Rajesh",
    wish: "Blessed with harmony, laughter, and unbreakable vows under the sacred sky.",
    color: "emerald" as const,
    timestamp: "12 mins ago",
    xPos: 76
  },
  {
    id: "lantern-4",
    author: "Tanvi (Best Friend)",
    wish: "To endless chai dates, world travels, and pure magic together!",
    color: "violet" as const,
    timestamp: "20 mins ago",
    xPos: 35
  }
];

export const conciergeGuide = {
  venue: "The Royal Palace Resort & Spa, Jaipur",
  address: "Palace Highway, Amber Foothills, Jaipur, Rajasthan 302028",
  airportDistance: "24 km from Jaipur International Airport (JAI) (~35 mins via Airport Shuttle)",
  railwayDistance: "14 km from Jaipur Junction Railway Station (~25 mins)",
  weatherForecast: {
    temp: "23°C",
    condition: "Clear Winter Royal Skies",
    humidity: "32%",
    sunset: "5:38 PM (Golden Hour photo session)",
    dressVibe: "Light shawls or Nehru jackets recommended for twilight open-air lawns."
  },
  helpline: "+91 141 289 0000 / concierge@royalpalacejaipur.com",
  valetParking: "Complimentary 24/7 Royal Valet Parking available at Gate 1."
};

