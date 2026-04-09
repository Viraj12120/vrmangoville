'use client';

import { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import { useExperienceStore } from '@/lib/store';

const MARQUEE_IMAGES = [
  { 
    id: 1, 
    src: '/kesar_trust.png', 
    title: 'Heritage Roots', 
    detail: 'Since 1994, our mangoes have been nurtured by hands that know every branch and leaf.' 
  },
  { 
    id: 2, 
    src: '/kesar_raw.png', 
    title: 'Pure Kesar Origin', 
    detail: 'The raw, acidic tang of a Kesar mango maturing on the branch—nature’s promise of sweetness.' 
  },
  { 
    id: 3, 
    src: '/kesar_trust.png', // Reusing placeholder for now
    title: 'Saffron Soul', 
    detail: 'Deep golden pulp with a distinct aroma that defines the authentic Kesar experience.' 
  },
  {
    id: 4,
    src: '/kesar_raw.png',
    title: 'Precision Harvest',
    detail: 'Hand-picked at the optimal moment of maturity to preserve natural vitamins and flavor.'
  }
];

export default function HoverReveal() {
  const { openDetail } = useExperienceStore();
  const [activeImage, setActiveImage] = useState<typeof MARQUEE_IMAGES[0] | null>(null);
  const [position, setPosition] = useState({ top: '20%', left: '20%' });
  const [isVisible, setIsVisible] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const onMouseEnter = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-marquee-trigger]');
      if (!target) return;

      // Pick random image
      const randomImg = MARQUEE_IMAGES[Math.floor(Math.random() * MARQUEE_IMAGES.length)];
      setActiveImage(randomImg);

      // Random position (constrained to viewport)
      const safeX = 220; // half width
      const safeY = 150; // half height
      const posX = Math.floor(Math.random() * (window.innerWidth - safeX * 2) + safeX);
      const posY = Math.floor(Math.random() * (window.innerHeight - safeY * 2) + safeY);
      setPosition({ top: `${posY}px`, left: `${posX}px` });

      setIsVisible(true);

      // Scrub In Animation + Bouncy Pop
      if (imageRef.current) {
        gsap.killTweensOf(imageRef.current);
        
        gsap.fromTo(imageRef.current, 
          { clipPath: 'inset(0% 100% 0% 0%)', scale: 0.8, opacity: 0 },
          { 
            clipPath: 'inset(0% 0% 0% 0%)', 
            scale: 1, 
            opacity: 1,
            duration: 0.8, 
            ease: 'back.out(1.7)'
          }
        );
      }
    };

    const onMouseLeave = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-marquee-trigger]');
      if (!target) return;

      // Scrub Out Animation
      if (imageRef.current) {
        gsap.killTweensOf(imageRef.current);

        gsap.to(imageRef.current, {
          clipPath: 'inset(0% 0% 0% 100%)',
          scale: 0.8,
          opacity: 0,
          duration: 0.5,
          ease: 'power3.in',
          onComplete: () => setIsVisible(false)
        });
      }
    };

    window.addEventListener('mouseover', onMouseEnter);
    window.addEventListener('mouseout', onMouseLeave);

    return () => {
      window.removeEventListener('mouseover', onMouseEnter);
      window.removeEventListener('mouseout', onMouseLeave);
    };
  }, []);

  if (!isVisible || !activeImage) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[1000]"
    >
      <div 
        ref={imageRef}
        className="absolute w-[440px] h-[300px] rounded-3xl overflow-hidden shadow-2xl border border-white/20 backdrop-blur-md bg-white/5 pointer-events-auto cursor-pointer"
        style={{ top: position.top, left: position.left, transform: 'translate(-50%, -50%)' }}
        onClick={() => openDetail({ title: activeImage.title, content: activeImage.detail, img: activeImage.src })}
      >
        <Image 
          src={activeImage.src}
          alt={activeImage.title}
          fill
          className="object-cover transition-transform duration-1000 hover:scale-110"
        />
      </div>
    </div>
  );
}
