'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import CinematicSlide from './CinematicSlide';
import Hero from './Hero';
import { STORY_DATA, FOOTER_QUOTE } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] pointer-events-none opacity-[0.03] md:opacity-[0.05] overflow-hidden w-full h-full flex items-center justify-center">
          <h1 className="text-stone-900 font-display text-5xl md:text-[15rem] font-bold whitespace-nowrap uppercase tracking-tighter rotate-[-5deg] md:rotate-0">
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

        {/* Horizontal Progress Indicator */}
        <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 md:gap-4 px-6 w-full max-w-sm md:max-w-xl">
          {STORY_DATA.map((_, i) => (
            <div 
              key={i} 
              className="flex-1 h-[2px] bg-white/20 relative overflow-hidden rounded-full"
            >
              <div className={`absolute inset-0 bg-saffron origin-left scale-x-0 progress-bar-${i}`} />
            </div>
          ))}
        </div>
      </section>

      {/* Footer / End Quote Section */}
      <section className="h-screen flex items-center justify-center bg-white relative z-20 px-6 overflow-hidden">
        <h2 className="text-2xl md:text-6xl font-display text-stone-900 text-center italic font-light max-w-4xl leading-snug">
          "{FOOTER_QUOTE}"
        </h2>
      </section>
    </main>
  );
}
