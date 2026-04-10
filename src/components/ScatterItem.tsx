'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Flip } from 'gsap/all';
import Image from 'next/image';
import { useRef } from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(Flip);
}

interface ScatterItemProps {
  image: string;
  title: string;
  subtext: string;
  x: number;
  y: number;
  rotation: number;
  isActive: boolean;
  isAnyActive: boolean;
  onToggle: () => void;
}

export default function ScatterItem({ 
  image, title, subtext, x, y, rotation, isActive, isAnyActive, onToggle 
}: ScatterItemProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Hover drift effect when not active
  useGSAP(() => {
    if (!containerRef.current || !imageRef.current || isActive || isAnyActive) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const moveX = (e.clientX - centerX) / 20;
      const moveY = (e.clientY - centerY) / 20;

      gsap.to(imageRef.current, {
        x: moveX,
        y: moveY,
        rotate: rotation + (moveX * 0.5),
        duration: 0.8,
        ease: 'power2.out',
      });
    };

    const onMouseLeave = () => {
      gsap.to(imageRef.current, {
        x: 0,
        y: 0,
        rotate: rotation,
        duration: 1.2,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    containerRef.current.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      containerRef.current?.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isActive, isAnyActive, rotation]);

  // Content reveal logic
  useGSAP(() => {
    if (isActive) {
      gsap.fromTo('.reveal-el', 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.4 }
      );
    }
  }, [isActive]);

  return (
    <div 
      ref={containerRef}
      className={`absolute transition-all duration-700 
        ${isActive ? 'inset-0 z-50 flex items-center justify-center p-4 md:p-12' : 'z-10'}
        ${isAnyActive && !isActive ? 'opacity-10 pointer-events-none' : 'opacity-100'}
      `}
      style={{ 
        left: isActive ? '0' : `${x}%`, 
        top: isActive ? '0' : `${y}%`,
        width: isActive ? '100%' : '18vw',
        height: isActive ? '100%' : '24vw',
        minWidth: isActive ? 'none' : '220px',
        minHeight: isActive ? 'none' : '300px'
      }}
    >
      <div 
        ref={imageRef}
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        data-flip-id={`img-${title}`}
        className={`relative overflow-hidden cursor-pointer shadow-2xl transition-all duration-1000
          ${isActive ? 'w-full h-full md:w-[85%] md:h-[85%] rounded-none' : 'w-full h-full rounded-sm'}
        `}
        style={{ 
          transform: isActive ? 'none' : `rotate(${rotation}deg)`,
        }}
      >
        <Image
          src={image}
          alt={title}
          fill
          className={`object-cover transition-transform duration-1000 ${isActive ? 'scale-100' : 'hover:scale-110'}`}
          sizes={isActive ? "90vw" : "25vw"}
        />

        {/* Content Reveal Overlay */}
        <div 
          ref={contentRef}
          className={`absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-8 text-center transition-opacity duration-700
            ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}
          `}
        >
          <span className="reveal-el text-saffron font-display text-xs uppercase tracking-[0.5em] mb-4">
            ARCHIVE EXHIBIT
          </span>
          <h3 className="reveal-el text-white font-display font-bold text-4xl md:text-8xl tracking-tighter mb-6 uppercase">
            {title}
          </h3>
          <p className="reveal-el text-white/70 font-display text-sm md:text-xl italic max-w-2xl leading-relaxed mb-12">
            {subtext}
          </p>
          
          <button 
            className="reveal-el border border-white/20 px-10 py-4 text-white font-display text-[10px] tracking-[0.3em] uppercase hover:bg-white hover:text-stone-900 transition-all duration-500"
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
          >
            Collapse View
          </button>
        </div>
      </div>
    </div>
  );
}
