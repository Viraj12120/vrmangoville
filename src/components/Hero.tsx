'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import Magnetic from './Magnetic';
import LeafParticles from './LeafParticles';
import { useExperienceStore } from '@/lib/store';
import { HERO_CONTENT, NAV_LINKS } from '@/lib/data';

export default function Hero() {
  const { isVideoActive, startVideo, setMenuOpen } = useExperienceStore();
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
      {/* EXPERIENCE Button - Top Left on Mobile, Top Right on Desktop */}
      <div className="absolute top-8 left-8 md:left-auto md:right-8 z-[100]">
        <Magnetic>
          <button
            onClick={startVideo}
            className="group relative interactive py-2 overflow-hidden px-2"
            onMouseEnter={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              window.dispatchEvent(new CustomEvent('magnetize-stick', {
                detail: { hover: true, x: rect.left, y: rect.bottom, width: rect.width },
              }));
            }}
            onMouseLeave={() => {
              window.dispatchEvent(new CustomEvent('magnetize-stick', {
                detail: { hover: false },
              }));
            }}
          >
            <span className={`font-display font-bold text-xs md:text-base tracking-widest transition-colors ${isVideoActive ? 'text-white' : 'text-foreground'}`}>
              EXPERIENCE
            </span>
          </button>
        </Magnetic>
      </div>

      {/* HAMBURGER - Top Right for Mobile */}
      <div className="absolute top-8 right-8 z-[100] lg:hidden">
        <Magnetic>
          <button
            onClick={() => setMenuOpen(true)}
            className={`flex flex-col gap-1.5 p-2 transition-colors ${isVideoActive ? 'text-white' : 'text-foreground'}`}
          >
            <div className="w-6 h-[2px] bg-current" />
            <div className="w-6 h-[2px] bg-current" />
            <div className="w-4 h-[2px] bg-current self-end" />
          </button>
        </Magnetic>
      </div>

      {/* Centered Navbar - Hidden on Mobile */}
      <nav className={`absolute top-8 left-1/2 -track-x-1/2 z-[100] hidden lg:flex gap-12 items-center transition-colors duration-1000 ${isVideoActive ? 'text-white' : 'text-foreground'}`} style={{ transform: 'translateX(-50%)' }}>
        {NAV_LINKS.map((item, idx) => (
          <Magnetic key={idx}>
            <button
              onClick={() => document.getElementById(item.href)?.scrollIntoView({ behavior: 'smooth' })}
              className="relative interactive py-2 font-display font-bold text-base tracking-widest px-2"
              onMouseEnter={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                window.dispatchEvent(new CustomEvent('magnetize-stick', {
                  detail: { hover: true, x: rect.left, y: rect.bottom, width: rect.width },
                }));
              }}
              onMouseLeave={() => {
                window.dispatchEvent(new CustomEvent('magnetize-stick', {
                  detail: { hover: false },
                }));
              }}
            >
              {item.label}
            </button>
          </Magnetic>
        ))}
      </nav>

      <LeafParticles />

      <div
        ref={visualRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-gradient-to-br from-saffron via-golden to-green opacity-10 blur-[80px] md:blur-[120px] rounded-full"
      />

      <div className="relative z-10 text-center w-full max-w-4xl mx-auto flex flex-col items-center">
        <span className={`inline-block ${accentColor} font-display text-[10px] md:text-sm uppercase tracking-[0.3em] mb-8 md:mb-12 overflow-hidden transition-colors duration-1000 animate-pulse`}>
          {HERO_CONTENT.tagline}
        </span>
        <h1
          ref={titleRef}
          className={`interactive font-display text-5xl md:text-9xl ${textColor} font-bold leading-[0.9] tracking-tighter cursor-pointer transition-colors duration-1000`}
        >
          {HERO_CONTENT.title.split(' ').map((word, i) => (
            <div key={i} className="inline-block mr-[0.2em] last:mr-0">
              {word.split('').map((char, j) => (
                <div key={j} className="char inline-block">{char}</div>
              ))}
              {i === 0 && <br className="md:hidden" />}
            </div>
          ))}
        </h1>

        <div className="h-8 md:h-16 w-full" />

        <p className={`text-sm md:text-xl ${isVideoActive ? 'text-white/70' : 'text-foreground/60'} max-w-xl mx-auto font-sans leading-relaxed transition-colors duration-1000 `}>
          {HERO_CONTENT.description.split('Raw & Ripened')[0]}
          <span className={`${accentColor} font-semibold transition-colors duration-1000`}>Raw & Ripened</span>
          {HERO_CONTENT.description.split('Raw & Ripened')[1]}
        </p>


        <div className="h-8 md:h-16 w-full" />

        <div className="mt-52 md:mt-24 flex flex-col md:flex-row gap-6 md:gap-12 justify-center items-center">
          <Magnetic>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative interactive py-2 overflow-hidden"
            >
              <span className={`font-display font-semibold tracking-wider transition-colors ${isVideoActive ? 'text-white' : 'text-foreground'}`}>
                {HERO_CONTENT.primaryCTA}
              </span>
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-saffron origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </button>
          </Magnetic>
          <Magnetic>
            <button 
              onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative interactive py-2 overflow-hidden"
            >
              <span className={`font-display font-semibold tracking-wider transition-colors ${isVideoActive ? 'text-white' : 'text-foreground'}`}>
                {HERO_CONTENT.secondaryCTA}
              </span>
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-saffron/40 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </button>
          </Magnetic>
        </div>
      </div>

      {/* Bottom Scroll Indicator - Simplified for Mobile */}
      <div
        onClick={() => {
          document.getElementById('story-start')?.scrollIntoView({ behavior: 'smooth' });
        }}
        className={`absolute bottom-8 md:bottom-12 cursor-pointer transition-colors duration-1000 ${isVideoActive ? 'text-white/40' : 'opacity-40'}`}
      >
        <div className="animate-bounce">
          <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
          </svg>
        </div>
      </div>
    </section>
  );
}