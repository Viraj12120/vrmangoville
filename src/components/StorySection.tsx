'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function StorySection({ 
  title, 
  subtitle, 
  content, 
  color = 'saffron' 
}: { 
  title: string; 
  subtitle: string; 
  content: string;
  color?: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(textRef.current, {
      y: 100,
      opacity: 0,
      duration: 1.2,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      }
    });
  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-32 px-6 relative"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        <span className={`text-${color} font-display text-sm uppercase tracking-widest mb-4`}>
          {subtitle}
        </span>
        <h2 className="text-5xl md:text-7xl font-display font-bold text-foreground mb-8 leading-[1.1]">
          {title}
        </h2>
        <p className="text-xl md:text-2xl text-foreground/70 font-sans leading-relaxed max-w-2xl">
          {content}
        </p>
      </div>
      
      {/* Decorative Parallax Element */}
      <div className={`absolute -right-20 top-1/2 -translate-y-1/2 w-96 h-96 bg-${color}/10 blur-[100px] rounded-full pointer-events-none`} />
    </section>
  );
}
