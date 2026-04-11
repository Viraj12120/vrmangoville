'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useRef } from 'react';
import { GALLERY_IMAGES } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

// Duplicate and stagger data to create long portrait stacks
const DUP = [...GALLERY_IMAGES, ...GALLERY_IMAGES, ...GALLERY_IMAGES, ...GALLERY_IMAGES];
const COL1 = DUP.slice(0, 6);
const COL2 = DUP.slice(5, 11).reverse();
const COL3 = DUP.slice(10, 16);
const COL4 = DUP.slice(15, 21).reverse();
const COL5 = DUP.slice(18, 24);

export default function Social() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    // Master Timeline for Pinning
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=150%',
        pin: true,
        scrub: true,
        refreshPriority: -1
      }
    });

    // Explicitly colorize the generated pin-spacer to fix the "huge white space" bug
    if (container.parentElement?.classList.contains('pin-spacer')) {
      container.parentElement.style.backgroundColor = '#050505';
      container.parentElement.style.width = '100%';
    }

    const upCols = gsap.utils.toArray('.col-up');
    const downCols = gsap.utils.toArray('.col-down');

    // Columns scrolling UP
    tl.fromTo(upCols,
      { yPercent: 15 },
      { yPercent: -15, ease: 'none' },
      0
    );

    // Columns scrolling DOWN
    tl.fromTo(downCols,
      { yPercent: -15 },
      { yPercent: 15, ease: 'none' },
      0
    );

  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="social" className="relative w-full h-screen bg-[#050505] overflow-hidden">
      {/* Central Social Title -> Locked and centered */}
      <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none mix-blend-difference">
        <h2 className="font-display text-6xl md:text-9xl font-bold text-white tracking-widest uppercase">
          Social
        </h2>
      </div>

      {/* Masonry Flex Container */}
      <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 flex items-center justify-center gap-2 md:gap-4 px-2 md:px-4 h-[120vh] overflow-visible">

        {/* Column 1 -> Scrolls Up */}
        <div className="flex-1 flex flex-col gap-2 md:gap-4 col-up">
          {COL1.map((item, idx) => (
            <div key={`c1-${idx}`} className="relative flex-shrink-0 w-full aspect-[9/16] overflow-hidden rounded opacity-80 hover:opacity-100 transition-opacity">
              <Image src={item.image} alt={item.alt} fill sizes="20vw" className="object-cover" />
            </div>
          ))}
        </div>

        {/* Column 2 -> Scrolls Down */}
        <div className="flex-1 flex flex-col gap-2 md:gap-4 col-down">
          {COL2.map((item, idx) => (
            <div key={`c2-${idx}`} className="relative flex-shrink-0 w-full aspect-[9/16] overflow-hidden rounded opacity-80 hover:opacity-100 transition-opacity">
              <Image src={item.image} alt={item.alt} fill sizes="20vw" className="object-cover" />
            </div>
          ))}
        </div>

        {/* Column 3 -> Scrolls Up */}
        <div className="flex-1 flex flex-col gap-2 md:gap-4 col-up">
          {COL3.map((item, idx) => (
            <div key={`c3-${idx}`} className="relative flex-shrink-0 w-full aspect-[9/16] overflow-hidden rounded opacity-80 hover:opacity-100 transition-opacity">
              <Image src={item.image} alt={item.alt} fill sizes="20vw" className="object-cover" />
            </div>
          ))}
        </div>

        {/* Column 4 -> Scrolls Down (Desktop Only) */}
        <div className="hidden md:flex flex-1 flex-col gap-2 md:gap-4 col-down">
          {COL4.map((item, idx) => (
            <div key={`c4-${idx}`} className="relative flex-shrink-0 w-full aspect-[9/16] overflow-hidden rounded opacity-80 hover:opacity-100 transition-opacity">
              <Image src={item.image} alt={item.alt} fill sizes="20vw" className="object-cover" />
            </div>
          ))}
        </div>

        {/* Column 5 -> Scrolls Up (Desktop Only) */}
        <div className="hidden md:flex flex-1 flex-col gap-2 md:gap-4 col-up">
          {COL5.map((item, idx) => (
            <div key={`c5-${idx}`} className="relative flex-shrink-0 w-full aspect-[9/16] overflow-hidden rounded opacity-80 hover:opacity-100 transition-opacity">
              <Image src={item.image} alt={item.alt} fill sizes="20vw" className="object-cover" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
