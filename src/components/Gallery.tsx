'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useRef } from 'react';
import { GALLERY_IMAGES } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

// Duplicate images to give enough horizontal width for marquee scrolling
const ROW_1_IMAGES = [...GALLERY_IMAGES, ...GALLERY_IMAGES, ...GALLERY_IMAGES, ...GALLERY_IMAGES];
const ROW_2_IMAGES = [...GALLERY_IMAGES, ...GALLERY_IMAGES, ...GALLERY_IMAGES, ...GALLERY_IMAGES].reverse();

export default function Gallery() {
  const containerRef = useRef<HTMLElement>(null);
  const row1InnerRef = useRef<HTMLDivElement>(null);
  const row2ContainerRef = useRef<HTMLDivElement>(null);
  const row2InnerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container || !row1InnerRef.current || !row2ContainerRef.current || !row2InnerRef.current) return;

    // Master Timeline for Pinning and Scrubbing
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top', // Pin when section reaches top of viewport
        end: '+=200%',    // Hold pin for 2x screen height for smoother scrub
        pin: true,
        scrub: true,
        refreshPriority: -1
      }
    });

    // Row 1: LEFT TO RIGHT (start negative, go to 0)
    gsap.set(row1InnerRef.current, { x: "-25%" });
    tl.to(row1InnerRef.current, { x: "0%", ease: 'none' }, 0);

    // Row 2: RIGHT TO LEFT (start 0, go to negative)
    gsap.set(row2InnerRef.current, { x: "0%" });
    tl.to(row2InnerRef.current, { x: "-25%", ease: 'none' }, 0);

    // Row 2 Pop up effect (triggers independently as section comes into view)
    gsap.fromTo(row2ContainerRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 50%', // triggers before pinning starts
          once: true,
          refreshPriority: -1
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-screen h-screen bg-[#fdfbf7] overflow-hidden flex flex-col pt-8 md:pt-16 pb-8">

      {/* Viewport Title - Safe at the top */}
      <div className="w-full text-center flex-shrink-0">
        <h2 className="font-display text-5xl md:text-8xl font-bold text-black tracking-tighter uppercase whitespace-nowrap">
          Visual Gallery
        </h2>
      </div>

      {/* Flexible Spacer that centers rows precisely in remaining screen estate */}
      <div className="flex-grow flex flex-col justify-center gap-8 md:gap-12 overflow-visible">

        {/* Row 1 */}
        <div className="w-full relative z-10 overflow-visible" style={{ perspective: '1000px' }}>
          <div ref={row1InnerRef} className="flex w-max gap-[2px]">
            {ROW_1_IMAGES.map((item, idx) => (
              <div
                key={`r1-${idx}`}
                className="gallery-item group relative w-[35vw] sm:w-[25vw] md:w-[15vw] lg:w-[13vw] aspect-[4/5] cursor-pointer transition-transform duration-100 ease-out hover:scale-110 hover:z-50 hover:shadow-2xl overflow-hidden rounded-sm"
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 30vw, 15vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 */}
        <div ref={row2ContainerRef} className="w-full relative z-10 overflow-visible" style={{ perspective: '1000px' }}>
          <div ref={row2InnerRef} className="flex w-max gap-[2px]">
            {ROW_2_IMAGES.map((item, idx) => (
              <div
                key={`r2-${idx}`}
                className="gallery-item group relative w-[35vw] sm:w-[25vw] md:w-[15vw] lg:w-[13vw] aspect-[4/5] cursor-pointer transition-transform duration-200 ease-out hover:scale-110 hover:z-50 hover:shadow-2xl overflow-hidden rounded-sm"
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 30vw, 15vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
}
