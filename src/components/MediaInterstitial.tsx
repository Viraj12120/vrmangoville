'use client';

import { useExperienceStore } from '@/lib/store';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

export default function MediaInterstitial() {
  const { isVideoActive, closeVideo } = useExperienceStore();
  const videoRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (isVideoActive) {
      gsap.to(videoRef.current, {
        opacity: 1,
        pointerEvents: 'auto',
        duration: 1,
        ease: 'power3.inOut',
      });

      // Auto-close after 8 seconds
      const timer = setTimeout(() => {
        closeVideo();
      }, 8000);

      return () => clearTimeout(timer);
    } else {
      gsap.to(videoRef.current, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.8,
        ease: 'power3.inOut',
      });
    }
  }, { dependencies: [isVideoActive] });

  return (
    <div 
      ref={videoRef}
      className="fixed inset-0 z-[10010] bg-black pointer-events-none opacity-0"
    >
      <video 
        src="https://cdn.pixabay.com/video/2021/05/09/73634-549538068_large.mp4"
        autoPlay 
        loop 
        muted 
        playsInline
        className="w-full h-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
      
      <div className="absolute bottom-12 left-12 z-20">
        <span className="text-white/40 font-display text-sm uppercase tracking-[0.4em] mb-4 block">
          Cinematic Atmosphere
        </span>
        <h3 className="text-white text-4xl md:text-6xl font-display font-bold max-w-2xl leading-tight">
          Savoring the Harvest of Gujarat.
        </h3>
      </div>

      <button 
        onClick={closeVideo}
        className="absolute top-12 right-12 z-20 text-white/50 hover:text-white transition-colors uppercase tracking-widest text-xs font-display flex items-center gap-4"
      >
        Close Experience
        <div className="w-8 h-[1px] bg-white/20" />
      </button>
    </div>
  );
}
