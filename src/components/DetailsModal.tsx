'use client';

import { useExperienceStore } from '@/lib/store';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import Image from 'next/image';

export default function DetailsModal() {
  const { activeDetail, closeDetail } = useExperienceStore();
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (activeDetail) {
      gsap.to(modalRef.current, {
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.5,
        ease: 'power3.out',
      });
      gsap.from(contentRef.current, {
        scale: 0.9,
        y: 20,
        opacity: 0,
        duration: 0.6,
        delay: 0.2,
        ease: 'back.out(1.7)',
      });
    } else {
      gsap.to(modalRef.current, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.4,
        ease: 'power3.in',
      });
    }
  }, { dependencies: [activeDetail] });

  if (!activeDetail) return <div ref={modalRef} className="fixed inset-0 z-[10006] pointer-events-none opacity-0" />;

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 z-[10006] flex items-center justify-center p-6 bg-black/40 backdrop-blur-xl"
    >
      <div 
        ref={contentRef}
        className="relative bg-background max-w-4xl w-full rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
      >
        <button 
          onClick={closeDetail}
          className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-black/10 flex items-center justify-center hover:bg-black/20 transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="relative w-full md:w-1/2 h-[300px] md:h-auto">
          <Image 
            src={activeDetail.img} 
            alt={activeDetail.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left">
          <span className="text-saffron font-display uppercase tracking-widest text-xs mb-4">Discovery</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight mb-6">
            {activeDetail.title}
          </h2>
          <p className="text-foreground/70 text-lg leading-relaxed mb-8">
            {activeDetail.content}
          </p>
          <button 
            onClick={closeDetail}
            className="self-center md:self-start px-8 py-3 bg-saffron text-white rounded-full font-display font-semibold hover:scale-105 transition-transform"
          >
            BACK TO STORY
          </button>
        </div>
      </div>
    </div>
  );
}
