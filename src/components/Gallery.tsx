'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { GALLERY_IMAGES } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

// Duplicate images to give enough horizontal width for marquee scrolling
const ROW_1_IMAGES = [...GALLERY_IMAGES, ...GALLERY_IMAGES, ...GALLERY_IMAGES, ...GALLERY_IMAGES];
const ROW_2_IMAGES = [...GALLERY_IMAGES, ...GALLERY_IMAGES, ...GALLERY_IMAGES, ...GALLERY_IMAGES].reverse();

interface SelectedItem {
  image: string;
  alt: string;
  description: string;
  rect: DOMRect;
  domNode: HTMLElement;
}

export default function Gallery() {
  const containerRef = useRef<HTMLElement>(null);
  const row1InnerRef = useRef<HTMLDivElement>(null);
  const row2ContainerRef = useRef<HTMLDivElement>(null);
  const row2InnerRef = useRef<HTMLDivElement>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const modalImageRef = useRef<HTMLDivElement>(null);
  const modalTextLeftRef = useRef<HTMLDivElement>(null);
  const modalTextRightRef = useRef<HTMLDivElement>(null);
  const modalCloseRef = useRef<HTMLButtonElement>(null);

  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);

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

  // Modal Animation Logic - Centered Image with dual text reveal
  useGSAP(() => {
    if (!selectedItem || !modalRef.current || !modalImageRef.current || !modalTextLeftRef.current || !modalTextRightRef.current) return;

    gsap.set(modalRef.current, { pointerEvents: 'auto', display: 'flex', autoAlpha: 1 });
    
    // Hide original node to sell the extraction effect
    gsap.set(selectedItem.domNode, { opacity: 0 });

    // Animate Image from original rect mapping exactly
    gsap.set(modalImageRef.current, {
      left: selectedItem.rect.left,
      top: selectedItem.rect.top,
      width: selectedItem.rect.width,
      height: selectedItem.rect.height,
      borderRadius: '2px',
      xPercent: 0,
      yPercent: 0
    });

    // Text starting positions (tucked slightly behind where the image will be)
    gsap.set(modalTextLeftRef.current, { autoAlpha: 0, x: 50 });
    gsap.set(modalTextRightRef.current, { autoAlpha: 0, x: -50 });
    gsap.set(modalCloseRef.current, { autoAlpha: 0 });

    const tl = gsap.timeline();

    const targetWidth = window.innerWidth > 768 ? '30vw' : '80vw';
    const targetHeight = window.innerWidth > 768 ? '80vh' : '50vh';
    
    tl.to(modalImageRef.current, {
      left: '50%',
      top: '50%',
      xPercent: -50,
      yPercent: -50,
      width: targetWidth,
      height: targetHeight,
      borderRadius: '8px',
      duration: 0.8,
      ease: 'power3.inOut'
    });

    // Dual sided text push reveal
    tl.to(modalTextLeftRef.current, {
      autoAlpha: 1,
      x: 0,
      duration: 0.6,
      ease: 'power2.out'
    }, "-=0.3");

    tl.to(modalTextRightRef.current, {
      autoAlpha: 1,
      x: 0,
      duration: 0.6,
      ease: 'power2.out'
    }, "<");

    tl.to(modalCloseRef.current, {
      autoAlpha: 1,
      duration: 0.6,
      ease: 'power2.out'
    }, "<");

  }, [selectedItem]);

  const handleImageClick = (item: any, e: React.MouseEvent<HTMLDivElement>) => {
    const node = e.currentTarget as HTMLElement;
    setSelectedItem({
      ...item,
      rect: node.getBoundingClientRect(),
      domNode: node
    });
  };

  const handleClose = () => {
    if (!selectedItem || !modalImageRef.current || !modalTextLeftRef.current || !modalTextRightRef.current) return;
    
    const tl = gsap.timeline({
      onComplete: () => {
        // Show original item again
        gsap.set(selectedItem.domNode, { opacity: 1 });
        setSelectedItem(null);
      }
    });

    // Fade out text layers and close button
    tl.to([modalTextLeftRef.current, modalTextRightRef.current, modalCloseRef.current], {
      autoAlpha: 0,
      duration: 0.3,
      ease: 'power2.in'
    });

    // Return image to original grid slot
    tl.to(modalImageRef.current, {
      left: selectedItem.rect.left,
      top: selectedItem.rect.top,
      width: selectedItem.rect.width,
      height: selectedItem.rect.height,
      xPercent: 0,
      yPercent: 0,
      borderRadius: '2px', // matches grid radius
      duration: 0.6,
      ease: 'power3.inOut'
    }, "-=0.1");

    tl.to(modalRef.current, { pointerEvents: 'none', autoAlpha: 0, duration: 0.1 });
  };

  return (
    <section ref={containerRef} className="relative w-screen h-screen bg-[#fdfbf7] overflow-hidden flex flex-col pt-8 md:pt-16 pb-8">
      
      {/* Viewport Title - Safe at the top */}
      <div className="w-full text-center flex-shrink-0 mb-8 md:mb-12 px-6">
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
                onClick={(e) => handleImageClick(item, e)}
                key={`r1-${idx}`}
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

        {/* Row 2 */}
        <div ref={row2ContainerRef} className="w-full relative z-10 overflow-visible" style={{ perspective: '1000px' }}>
          <div ref={row2InnerRef} className="flex w-max gap-[2px]">
            {ROW_2_IMAGES.map((item, idx) => (
              <div
                onClick={(e) => handleImageClick(item, e)}
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

      {/* Animated Full Viewport Modal Overlay */}
      {selectedItem && (
        <div ref={modalRef} className="fixed inset-0 z-[999] bg-[#fdfbf7]/90 backdrop-blur-md flex items-center justify-center invisible">
          
          {/* Top Right Close Button */}
          <button 
            ref={modalCloseRef}
            onClick={handleClose}
            className="absolute top-6 right-6 md:top-12 md:right-12 z-50 group interactive flex flex-col items-center"
          >
            <span className="font-display font-bold tracking-widest text-xs uppercase text-stone-900 pb-1">Close</span>
            <div className="w-full h-[1.5px] bg-stone-900 origin-left scale-x-100 group-hover:scale-x-0 transition-transform duration-500" />
          </button>

          {/* Left Text Layer (Title) */}
          <div 
            ref={modalTextLeftRef}
            className="absolute left-0 top-0 w-full md:w-1/3 h-[25vh] md:h-screen flex items-end md:items-center justify-center md:justify-end px-8 md:px-16 pb-8 md:pb-0 z-20"
          >
            <h3 className="font-display text-4xl md:text-6xl font-bold text-stone-900 tracking-tighter text-center md:text-right">
              {selectedItem.alt}
            </h3>
          </div>

          {/* Central Image Layer */}
          <div 
            ref={modalImageRef}
            className="absolute z-30 overflow-hidden shadow-2xl bg-black"
          >
            <Image 
              src={selectedItem.image} 
              alt={selectedItem.alt} 
              fill 
              className="object-cover" 
            />
          </div>

          {/* Right Text Layer (Description) */}
          <div 
            ref={modalTextRightRef} 
            className="absolute right-0 bottom-0 md:top-0 w-full md:w-1/3 h-[25vh] md:h-screen flex flex-col justify-start md:justify-center items-center md:items-start px-8 md:px-16 pt-8 md:pt-0 z-20"
          >
            <div className="max-w-sm flex flex-col items-center md:items-start text-center md:text-left">
              <span className="inline-block text-saffron font-display text-xs md:text-sm uppercase tracking-[0.3em] mb-4">
                Details
              </span>
              <p className="font-sans text-sm md:text-lg text-stone-700 leading-relaxed">
                {selectedItem.description}
              </p>
            </div>
          </div>

        </div>
      )}

    </section>
  );
}
