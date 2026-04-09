'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import Magnetic from './Magnetic';
import LeafParticles from './LeafParticles';
import { useExperienceStore } from '@/lib/store';

export default function Hero() {
  const { isVideoActive, startVideo } = useExperienceStore();
  const container = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  const textColor = isVideoActive ? 'text-white' : 'text-foreground';
  const accentColor = isVideoActive ? 'text-saffron' : 'text-saffron';

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.from(visualRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 1.5,
      delay: 0.2,
    })
      .from(titleRef.current?.querySelectorAll('.char') || [], {
        y: 100,
        opacity: 0,
        stagger: 0.05,
        duration: 1,
      }, '-=1');
  }, { scope: container });

  return (
    <section
      ref={container}
      className={`relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 transition-colors duration-1000 ${isVideoActive ? 'bg-black/20' : ''}`}
    >
      {/* Top Navigation / Experience Trigger */}
      <div className="absolute top-8 right-8 z-[100]">
        <Magnetic>
          <button
            onClick={startVideo}
            onMouseEnter={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              window.dispatchEvent(new CustomEvent('magnetize-stick', { 
                detail: { hover: true, x: rect.left, y: rect.bottom, width: rect.width } 
              }));
            }}
            onMouseLeave={() => {
              window.dispatchEvent(new CustomEvent('magnetize-stick', { 
                detail: { hover: false } 
              }));
            }}
            className="group relative interactive py-2 overflow-hidden px-2"
          >
            <span className={`font-display font-bold text-sm tracking-widest transition-colors ${isVideoActive ? 'text-white' : 'text-foreground'}`}>EXPERIENCE</span>
          </button>
        </Magnetic>
      </div>

      {/* Centered Navbar */}
      <nav className={`absolute top-8 left-1/2 -translate-x-1/2 z-[100] flex gap-12 items-center transition-colors duration-1000 ${isVideoActive ? 'text-white' : 'text-foreground'}`}>
        {['OUR STORY', 'SOCIAL', 'TESTIMONIALS'].map((item, idx) => (
          <Magnetic key={idx}>
            <button
              onMouseEnter={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                window.dispatchEvent(new CustomEvent('magnetize-stick', { 
                  detail: { hover: true, x: rect.left, y: rect.bottom, width: rect.width } 
                }));
              }}
              onMouseLeave={() => {
                window.dispatchEvent(new CustomEvent('magnetize-stick', { 
                  detail: { hover: false } 
                }));
              }}
              className="relative interactive py-2 font-display font-bold text-sm tracking-widest px-2"
            >
              {item}
            </button>
          </Magnetic>
        ))}
      </nav>

      <LeafParticles />

      <div
        ref={visualRef}
        className="absolute w-[600px] h-[600px] bg-gradient-to-br from-saffron via-golden to-green opacity-10 blur-[120px] rounded-full"
      />

      <div className="relative z-10 text-center">
        <span className={`inline-block ${accentColor} font-display text-sm uppercase tracking-[0.3em] mb-12 overflow-hidden transition-colors duration-1000`}>
          Trusted since 2019
        </span>
        <h1
          ref={titleRef}
          data-marquee-trigger="true"
          className={`interactive font-display text-6xl md:text-9xl ${textColor} font-bold leading-none tracking-tighter cursor-pointer transition-colors duration-1000`}
        >
          <div className="char inline-block">V</div>
          <div className="char inline-block">R</div>
          <br />
          <div className="char inline-block">M</div>
          <div className="char inline-block">a</div>
          <div className="char inline-block">n</div>
          <div className="char inline-block">g</div>
          <div className="char inline-block">o</div>
          <div className="char inline-block">v</div>
          <div className="char inline-block">i</div>
          <div className="char inline-block">l</div>
          <div className="char inline-block">l</div>
          <div className="char inline-block">e</div>
        </h1>

        {/* Spacer to prevent overlap with the 'g' descender */}
        <div className="h-2 md:h-16 w-full" />

        <p className={`text-sm md:text-xl ${isVideoActive ? 'text-white/70' : 'text-foreground/60'} max-w-xl mx-auto font-sans leading-relaxed transition-colors duration-1000`}>
          Kesar Mango Specialists. Savor the authentic essence of our <span className={`${accentColor} font-semibold transition-colors duration-1000`}>Raw & Ripened</span> delicacies, nurtured with generations of trust.
        </p>

        <div className="mt-24 flex gap-12 justify-center">
          <Magnetic>
            <button
              data-marquee-trigger="true"
              className="group relative interactive py-2 overflow-hidden"
            >
              <span className={`font-display font-semibold tracking-wider transition-colors ${isVideoActive ? 'text-white' : 'text-foreground'}`}>SHOP KESAR</span>
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-saffron origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </button>
          </Magnetic>
          <Magnetic>
            <button
              data-marquee-trigger="true"
              className="group relative interactive py-2 overflow-hidden"
            >
              <span className={`font-display font-semibold tracking-wider transition-colors ${isVideoActive ? 'text-white' : 'text-foreground'}`}>OUR ORCHARDS</span>
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-saffron/40 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </button>
          </Magnetic>
        </div>
      </div>

      <div 
        onClick={() => {
          document.getElementById('story-start')?.scrollIntoView({ behavior: 'smooth' });
        }}
        className={`absolute bottom-12 cursor-pointer animate-bounce transition-colors duration-1000 ${isVideoActive ? 'text-white/40' : 'opacity-40'}`}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
        </svg>
      </div>
    </section>
  );
}
