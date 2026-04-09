'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import CinematicSlide from './CinematicSlide';
import Hero from './Hero';

gsap.registerPlugin(ScrollTrigger);

const STORY_DATA = [
  {
    subtitle: "The Ancestry",
    title: "Heirloom Origins",
    content: "The journey begins with heirloom seeds, passed down through generations of master cultivators who understand the unique rhythm of the land.",
    image: "/story/1.png"
  },
  {
    subtitle: "The Soil",
    title: "Rare Red Earth",
    content: "The legendary red volcanic soil of Gujarat provides the essential minerals and soul for every Kesar mango tree in our orchard.",
    image: "/story/2.png"
  },
  {
    subtitle: "The Monsoon",
    title: "Nurtured by Rain",
    content: "Life-giving monsoon rains wash the orchard in vibrant freshness, nourishing the trees for the intense season ahead.",
    image: "/story/3.png"
  },
  {
    subtitle: "The Blossom",
    title: "Promises of Spring",
    content: "In the cool winter, delicate white blossoms appear, carrying the intoxicating aroma that signals the coming of the 'Queen of Mangoes'.",
    image: "/story/4.png"
  },
  {
    subtitle: "The Growth",
    title: "Green Sanctuaries",
    content: "Each mango develops slowly under a dense, lush canopy, protected and shaded by nature’s intricate green embrace.",
    image: "/story/5.png"
  },
  {
    subtitle: "The Care",
    title: "Artisanal Protection",
    content: "We practice sustainable, organic care, ensuring every piece of fruit grows without compromise in a pristine environment.",
    image: "/story/6.png"
  },
  {
    subtitle: "The Sunlight",
    title: "Sun-Drenched Ripeness",
    content: "Intense summer sunlight works its magic, meticulously transforming starch into the pure, golden sweetness we are famous for.",
    image: "/story/7.png"
  },
  {
    subtitle: "The Harvest",
    title: "Hand-Picked Heritage",
    content: "Our harvesters assess every fruit individually, hand-picking only at the precise micro-moment of peak natural ripeness.",
    image: "/story/8.png"
  },
  {
    subtitle: "The Curation",
    title: "Premium Selection",
    content: "The absolute finest specimens are hand-selected and curated into premium crates, ready for their journey to connoisseurs worldwide.",
    image: "/story/9.png"
  },
  {
    subtitle: "The Experience",
    title: "Nature’s Liquid Gold",
    content: "Finally, savor the velvety texture and intoxicating honey-like flavor that makes VR Mangoville a global benchmark of quality.",
    image: "/story/10.png"
  }
];

export default function MangoStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const slides = gsap.utils.toArray('.cinematic-slide');
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: storyRef.current,
        start: "top top",
        end: `+=${STORY_DATA.length * 150}%`,
        pin: true,
        scrub: 1,
      }
    });

    // Initial state for the first slide
    gsap.set('.cinematic-slide-0 .slide-title', { opacity: 1, y: 0 });
    gsap.set('.cinematic-slide-0 .slide-subtitle', { opacity: 1, y: 0 });
    gsap.set('.cinematic-slide-0 .slide-content', { opacity: 1, y: 0 });
    gsap.set('.cinematic-slide-0 .slide-line', { scaleX: 1 });
    gsap.set('.progress-bar-0', { scaleX: 1 });

    slides.forEach((slide: any, i: number) => {
      if (i > 0) {
        tl.fromTo(slide, 
          { clipPath: 'inset(100% 0% 0% 0%)' }, 
          { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', duration: 1.5 }
        );
        
        tl.fromTo(slide.querySelector('.slide-image'),
          { scale: 1.15 },
          { scale: 1, ease: 'none', duration: 1.5 },
          "<"
        );

        tl.fromTo(slide.querySelector('.slide-title'),
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.6"
        );
        
        tl.fromTo(slide.querySelector('.slide-subtitle'),
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "<"
        );

        tl.fromTo(slide.querySelector('.slide-content'),
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "<"
        );

        tl.fromTo(slide.querySelector('.slide-line'),
          { scaleX: 0 },
          { scaleX: 1, duration: 0.6 },
          "<"
        );

        // Progress bar (Horizontal now)
        tl.to(`.progress-bar-${i}`, { scaleX: 1, ease: 'none', duration: 1.5 }, "<");
      } else {
        tl.to('.cinematic-slide-0 .slide-image', { scale: 1.05, ease: 'none', duration: 1.5 });
        tl.to('.progress-bar-0', { scaleX: 1, ease: 'none', duration: 1.5 }, "<");
      }

      tl.to({}, { duration: 0.8 });
    });

  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="bg-white overflow-x-hidden">
      <Hero />
      
      <section id="story-start" ref={storyRef} className="relative h-screen w-full overflow-hidden bg-white">
        {/* Intro Overlay persistent title */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 z-[100] pointer-events-none opacity-5">
          <h1 className="text-stone-900 font-display text-8xl md:text-[12rem] font-bold whitespace-nowrap uppercase tracking-tighter">
            The Story
          </h1>
        </div>

        {STORY_DATA.map((data, i) => (
          <div 
            key={i} 
            className="cinematic-slide absolute inset-0"
            style={{ zIndex: 10 + i }}
          >
            <CinematicSlide
              index={i}
              title={data.title}
              subtitle={data.subtitle}
              content={data.content}
              image={data.image}
            />
          </div>
        ))}

        {/* Horizontal Progress Indicator at the bottom */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-4">
          {STORY_DATA.map((_, i) => (
            <div 
              key={i} 
              className="w-12 h-[2px] bg-white/20 relative overflow-hidden rounded-full"
            >
              <div className={`absolute inset-0 bg-saffron origin-left scale-x-0 progress-bar-${i}`} />
            </div>
          ))}
        </div>
      </section>

      {/* Footer / End Quote Section */}
      <section className="h-screen flex items-center justify-center bg-white relative z-20">
        <h2 className="text-4xl md:text-6xl font-display text-stone-900 text-center px-6 italic font-light max-w-4xl">
          "A legacy of taste, handed down through generations, optimized for the modern world."
        </h2>
      </section>
    </main>
  );
}
