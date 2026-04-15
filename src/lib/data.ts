export const NAV_LINKS = [
  { label: 'STORY', href: 'story-start' },
  { label: 'SOCIAL', href: 'social' },
];

export const HERO_CONTENT = {
  tagline: "Trusted since 2023",
  title: "VR Mangoville",
  description: "Kesar Mango Specialists. Savor the authentic essence of our Raw & Ripened delicacies, nurtured with generations of trust.",
  primaryCTA: "SHOP KESAR",
  secondaryCTA: "OUR ORCHARDS"
};

export const STORY_DATA = [
  {
    title: "Inherited Wisdom",
    subtitle: "The Origin",
    content: "At VR Mangoville, every tree tells a story of generations. We don't just grow mangoes; we nurture a legacy of authentic Kesar and Alphonso, rooted in the rich soil of Atpadi.",
    image: "/story/1.jpeg"
  },
  {
    title: "The Honest Harvest",
    subtitle: "Authenticity",
    content: "No chemicals, no shortcuts. Our harvest is a rhythmic ritual where each mango is hand-picked at the perfect moment, ensuring the purity that mass-market produce simply can't match.",
    image: "/story/7.jpeg"
  },
  {
    title: "Crafted with Care",
    subtitle: "Precision",
    content: "Quality is in the details. From individual protective cushioning to rigorous selection, we ensure that every mango arriving at your doorstep is a flawless masterpiece of nature.",
    image: "/story/16.jpeg"
  },
  {
    title: "The Liquid Gold",
    subtitle: "The Experience",
    content: "A taste that lingers. Our Kesar mangoes are known for their deep saffron hue and an aroma that fills the room—a sensory journey that brings the essence of rural Maharashtra to your table.",
    image: "/story/1.jpeg"
  },
  {
    title: "From Farm to Soul",
    subtitle: "Commitment",
    content: "Direct from our orchards to your home. By choosing VR Mangoville, you're not just buying fruit; you're supporting a community of passionate farmers dedicated to true taste.",
    image: "/story/22.jpeg"
  }
];

export const FOOTER_QUOTE = "From our roots to your table, cultivating joy organically.";

export const TESTIMONIALS = [
  {
    name: "Pascal Tolley Ward",
    title: "Founder & CEO, Eartcere",
    avatar: "https://i.pravatar.cc/150?img=11",
    text: "Working with VR Mangoville has been like having a team of wizards on my side. They took my vision and turned it into reality. From flawless orchard care to incredibly fresh produce, they turned my expectations into an absolute delight. The team actually makes you feel like their top priority."
  },
  {
    name: "Tarak Patel",
    title: "Co-Founder, Zymo Cosmooon",
    avatar: "https://i.pravatar.cc/150?img=12",
    text: "VR Mangoville didn't just sell us mangoes, they transformed our understanding of quality. From a sleek organic tracking system to an engaging farm-to-table experience, they've fueled our appreciation since day one. We've seen better taste, better engagement, and a stronger brand."
  },
  {
    name: "Sarah Jenkins",
    title: "Head of Procurement, FreshFoods",
    avatar: "https://i.pravatar.cc/150?img=5",
    text: "Absolutely stunning produce and a joy to partner with. Deadlines? Met. Urgent deliveries? Done. The reliability is just unparalleled. They are truly the best in the organic mango business, delivering highly curated experiences every single harvest effortlessly."
  }
];

// ALL Images found in public/story
export const ALL_GALLERY_IMAGES = [
  // STORY IMAGES (These will be pinned to the end)
  { image: '/story/5.jpeg', alt: 'Inherited Wisdom', description: 'At VR Mangoville, every tree tells a story of generations. We don\'t just grow mangoes; we nurture a legacy of authentic Kesar and Alphonso.', isStory: true },
  { image: '/story/7.jpeg', alt: 'The Honest Harvest', description: 'No chemicals, no shortcuts. Our harvest is a rhythmic ritual where each mango is hand-picked at the perfect moment.', isStory: true },
  { image: '/story/16.jpeg', alt: 'Crafted with Care', description: 'Quality is in the details. From individual protective cushioning to rigorous selection, we ensure every mango is a masterpiece.', isStory: true },
  { image: '/story/1.jpeg', alt: 'The Liquid Gold', description: 'A taste that lingers. Our Kesar mangoes are known for their deep saffron hue and an aroma that fills the room.', isStory: true },
  { image: '/story/22.jpeg', alt: 'From Farm to Soul', description: 'Direct from our orchards to your home. We support a community of passionate farmers dedicated to true taste.', isStory: true },

  // GENERAL GALLERY IMAGES
  { image: '/story/1.jpeg', alt: 'Bountiful Yield', description: 'A celebratory look at the season’s most vibrant Kesar harvest.', isStory: false },
  { image: '/story/2.jpeg', alt: 'Ripened Perfection', description: 'Experience the soft, honey-sweet texture of naturally matured fruit.', isStory: false },
  { image: '/story/2.jpeg', alt: 'Field Selection', description: 'Every piece of fruit is inspected on the branch before harvest.', isStory: false },
  { image: '/story/3.jpeg', alt: 'Saffron Essence', description: 'The intense golden interior that makes our Kesar world-famous.', isStory: false },
  { image: '/story/3.jpeg', alt: 'Orchard Morning', description: 'Morning dew blankets the trees, keeping the fruit fresh and hydrated.', isStory: false },
  { image: '/story/4.jpeg', alt: 'Golden Harvest', description: 'Baskets overflowing with the pride of Atpadi.', isStory: false },
  { image: '/story/4.jpeg', alt: 'Summer Ripening', description: 'The intense summer heat develops the complex natural sugars.', isStory: false },
  { image: '/story/5.jpeg', alt: 'Nature\'s Canopy', description: 'Dense leaf coverage protects the delicate mangoes from direct sun scorch.', isStory: false },
  { image: '/story/6.jpeg', alt: 'Lush Growth', description: 'Health and vitality in every leaf, ensuring a robust flavor profile.', isStory: false },
  { image: '/story/6.jpeg', alt: 'Artisanal Care', description: 'Minimal intervention allows nature to express its true flavors.', isStory: false },
  { image: '/story/7.jpeg', alt: 'Careful Packaging', description: 'Traditional wooden crates lined with straw for the perfect aeration.', isStory: false },
  { image: '/story/8.jpeg', alt: 'Sorting Rituals', description: 'Removing heat from the fruit immediately after picking to preserve freshness.', isStory: false },
  { image: '/story/8.jpeg', alt: 'Harvest Tools', description: 'Traditional tools designed to pick fruit without causing bruises.', isStory: false },
  { image: '/story/9.jpeg', alt: 'Community Spirit', description: 'The local community coming together for the peak harvest season.', isStory: false },
  { image: '/story/9.jpeg', alt: 'Legacy of Trust', description: 'Built on years of delivering the absolute best to our customers.', isStory: false },
  { image: '/story/11.jpeg', alt: 'Packing Integrity', description: 'Every box is a promise of quality delivered to your doorstep.', isStory: false },
  { image: '/story/12.jpeg', alt: 'Hand-Picked Heritage', description: 'Decades of experience in identifying the exact micro-moment of ripeness.', isStory: false },
  { image: '/story/14.jpeg', alt: 'Quality Checks', description: 'Rigorous inspection ensures only healthy fruit enters the supply chain.', isStory: false },
  { image: '/story/17.jpeg', alt: 'Foam Protection', description: 'Individual sleeves for each mango to prevent transport friction.', isStory: false },
  { image: '/story/18.jpeg', alt: 'Ready for Home', description: 'Clean, labeled, and ready for their final journey.', isStory: false },
  { image: '/story/19.jpeg', alt: 'The Final Touch', description: 'A final polish before sealing the crates of gold.', isStory: false },
  { image: '/story/115.jpeg', alt: 'Natural Maturation', description: 'Straw-ripening techniques that respect the fruit’s natural timeline.', isStory: false },
  { image: '/story/growth.png', alt: 'Sustainable Growth', description: 'Focusing on the long-term health of our orchards.', isStory: false },
  { image: '/story/origin.png', alt: 'Rooted Wisdom', description: 'The ancient trees that form the backbone of our premium yield.', isStory: false },
  { image: '/story/present.png', alt: 'Modern Standards', description: 'Blending traditional farm wisdom with modern quality standards.', isStory: false },
];
