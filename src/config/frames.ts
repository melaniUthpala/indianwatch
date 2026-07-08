export interface Frame {
  id: string;
  title: string;
  subtitle: string;
  chapter?: string;
  notes?: string[];
  price?: string | null;
  ctaPrimary?: string;
  ctaSecondary?: string;
}

export const frames: Frame[] = [
  { id: "entry", chapter: "The Portal", title: "Enter the Garden", subtitle: "A fairy plain under purple-blue clouds. Follow the portal. Scroll to awaken each essence.", price: null },
  { id: "maheshwari", chapter: "Chapter I", title: "Maheshwari", subtitle: "Stillness before dawn. White sand, mirrored waters, and white lotus in first light.", price: "₹18,000", notes: ["White lotus", "Soft musk", "White sand accord"], ctaPrimary: "Buy Maheshwari — ₹18,000", ctaSecondary: "Discover Maheshwari" },
  { id: "mahalakshmi", chapter: "Chapter II", title: "Mahalakshmi", subtitle: "Abundance in bloom. Velvet rose petals and champagne gold light.", price: "₹18,000", notes: ["Damask rose", "Champagne pear", "Cashmere amber"], ctaPrimary: "Buy Mahalakshmi — ₹18,000", ctaSecondary: "Discover Mahalakshmi" },
  { id: "mahakali", chapter: "Chapter III", title: "Mahakali", subtitle: "Desert sun, black stone, deep red fire held in glass.", price: "₹20,000", notes: ["Smoked oud", "Black pepper", "Dark amber"], ctaPrimary: "Buy Mahakali — ₹20,000", ctaSecondary: "Discover Mahakali" },
  { id: "mahashakti", chapter: "Chapter IV", title: "Mahashakti", subtitle: "A column of molten gold; divine feminine energy made liquid.", price: "₹22,000", notes: ["Saffron", "Golden vanilla", "White woods"], ctaPrimary: "Buy Mahashakti — ₹22,000", ctaSecondary: "Discover Mahashakti" },
  { id: "jungle-essence", chapter: "Chapter V", title: "Jungle Essence", subtitle: "Wet earth, green thunder, a jungle breathing in slow motion.", price: "₹18,000", notes: ["Green leaves", "Vetiver", "Rain accord"], ctaPrimary: "Buy Jungle Essence — ₹18,000", ctaSecondary: "Discover Jungle Essence" },
  { id: "himalaya-essence", chapter: "Chapter VI", title: "Himalaya Essence", subtitle: "Alpine air, crystal snow, the silence above the clouds.", price: "₹20,000", notes: ["Icy citrus", "Juniper", "White musk"], ctaPrimary: "Buy Himalaya Essence — ₹20,000", ctaSecondary: "Discover Himalaya Essence" },
  { id: "loop-complete", chapter: "The Return", title: "The Garden Awaits.", subtitle: "The circle is complete. Scroll again to walk the path once more.", price: null, ctaPrimary: "Return to the Beginning" },
];

export const framesById = Object.fromEntries(frames.map((f) => [f.id, f]));

export interface Segment {
  id: string;
  frameId: string;
  transitionStart: number;
  transitionEnd: number;
  loopStart: number;
  loopEnd: number;
  scrollResume: number;
}

export const SEGMENTS: Segment[] = [
  { id: "entry", frameId: "entry", transitionStart: 0, transitionEnd: 2, loopStart: 2, loopEnd: 3, scrollResume: 3 },
  { id: "maheshwari", frameId: "maheshwari", transitionStart: 3, transitionEnd: 6, loopStart: 6, loopEnd: 8, scrollResume: 8 },
  { id: "mahalakshmi", frameId: "mahalakshmi", transitionStart: 8, transitionEnd: 12, loopStart: 12, loopEnd: 16, scrollResume: 16 },
  { id: "mahakali", frameId: "mahakali", transitionStart: 16, transitionEnd: 21, loopStart: 21, loopEnd: 24, scrollResume: 24 },
  { id: "mahashakti", frameId: "mahashakti", transitionStart: 24, transitionEnd: 28, loopStart: 28, loopEnd: 32, scrollResume: 32 },
  { id: "jungle-essence", frameId: "jungle-essence", transitionStart: 32, transitionEnd: 36, loopStart: 36, loopEnd: 40, scrollResume: 40 },
  { id: "himalaya-essence", frameId: "himalaya-essence", transitionStart: 40, transitionEnd: 45, loopStart: 45, loopEnd: 50, scrollResume: 50 },
  { id: "outro", frameId: "loop-complete", transitionStart: 50, transitionEnd: 55, loopStart: 50, loopEnd: 55, scrollResume: 55 },
];

export const TOTAL_VIDEO_DURATION = 55;
export const PX_PER_SECOND = 200;
export const TOTAL_SCROLL_PX = TOTAL_VIDEO_DURATION * PX_PER_SECOND;

export const INTRO_VIDEO = "https://res.cloudinary.com/jezkyiu0/video/upload/v1783541883/0708_2_bd6t3o.mp4";
export const EXPERIENCE_VIDEO = "https://res.cloudinary.com/jezkyiu0/video/upload/v1783541883/0708_2_bd6t3o.mp4";
