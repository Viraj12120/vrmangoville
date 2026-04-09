'use client';

import Image from 'next/image';
import { useRef } from 'react';

interface CinematicSlideProps {
  title: string;
  subtitle: string;
  content: string;
  image: string;
  index: number;
}

export default function CinematicSlide({ title, subtitle, content, image, index }: CinematicSlideProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 w-full h-screen overflow-hidden flex items-center justify-center cinematic-slide-${index}`}
    >
      {/* Background Image with Dark Cinematic Overlay */}
      <div className="absolute inset-0 bg-black">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover scale-110 slide-image"
          priority={index < 2}
          sizes="100vw"
        />
        {/* Dark overlays */}
        <div className="absolute inset-0 bg-black/40 md:bg-black/50 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl px-6 text-center">
        <span className="block text-saffron font-display text-[10px] md:text-sm uppercase tracking-[0.3em] mb-4 md:mb-6 slide-subtitle opacity-0 translate-y-4">
          {subtitle}
        </span>
        <h2 className="text-3xl md:text-8xl font-display font-bold text-white mb-4 md:mb-8 leading-[1.1] slide-title opacity-0 translate-y-8">
          {title}
        </h2>
        <div className="w-12 md:w-24 h-[1px] bg-saffron/50 mx-auto mb-6 md:mb-8 slide-line scale-x-0" />
        <p className="text-sm md:text-2xl text-white/80 font-sans leading-relaxed max-w-2xl mx-auto slide-content opacity-0 translate-y-4 px-4 md:px-0">
          {content}
        </p>
      </div>
    </div>
  );
}
