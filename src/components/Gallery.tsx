'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { ALL_GALLERY_IMAGES } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

// We will handle row generation inside the component to support client-side randomization

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
  const modalCloseRef = useRef<HTMLButtonElement>(null);

  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);
  const [row1Images, setRow1Images] = useState<any[]>([]);
  const [row2Images, setRow2Images] = useState<any[]>([]);

  // Randomize on mount
  useEffect(() => {
    const storyImages = ALL_GALLERY_IMAGES.filter(img => img.isStory);
    const otherImages = ALL_GALLERY_IMAGES.filter(img => !img.isStory);

    // Shuffle only the "Other" images
    const shuffledOthers = [...otherImages].sort(() => Math.random() - 0.5);
    const combined = [...shuffledOthers, ...storyImages];

    // Reduce DOM nodes: duplicate 2x instead of 4x for the scroll range
    setRow1Images([...combined, ...combined]);
    setRow2Images([...combined, ...combined].reverse());
  }, []);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container || !row1InnerRef.current || !row2ContainerRef.current || !row2InnerRef.current || row1Images.length === 0) return;

    // Fast CSS hints for transform operations
    gsap.set([row1InnerRef.current, row2InnerRef.current], {
      willChange: "transform",
      force3D: true
    });

    // Master Timeline for Pinning and Scrubbing
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=300%', // Increased for better pinned feeling
        pin: true,
        scrub: true, // Sync perfectly with Lenis, avoid delay compounding
        refreshPriority: -1
      }
    });

    // Row 1: LEFT TO RIGHT
    // With 2 copies, 50% is exactly one full set of images
    gsap.set(row1InnerRef.current, { x: "-50%" });
    tl.to(row1InnerRef.current, { x: "0%", ease: 'none' }, 0);

    // Row 2: RIGHT TO LEFT
    gsap.set(row2InnerRef.current, { x: "0%" });
    tl.to(row2InnerRef.current, { x: "-50%", ease: 'none' }, 0);

    // Row 2 Pop up effect
    gsap.fromTo(row2ContainerRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 50%',
          once: true,
          refreshPriority: -1
        }
      }
    );
  }, { scope: containerRef, dependencies: [row1Images] });

  // Modal Animation Logic - Refactored for Content Left, Image Bottom-Right
  useGSAP(() => {
    if (!selectedItem || !modalRef.current || !modalImageRef.current || !modalTextLeftRef.current) return;

    const isDesktop = window.innerWidth > 768;

    gsap.set(modalRef.current, { pointerEvents: 'auto', display: 'flex', autoAlpha: 1 });

    // Hide original node
    gsap.set(selectedItem.domNode, { opacity: 0 });

    // Initial state for image with hardware acceleration hints
    gsap.set(modalImageRef.current, {
      left: selectedItem.rect.left,
      top: selectedItem.rect.top,
      width: selectedItem.rect.width,
      height: selectedItem.rect.height,
      borderRadius: '2px',
      xPercent: 0,
      yPercent: 0,
      willChange: 'transform, left, top, width, height',
      force3D: true
    });

    // Content container starts hidden
    gsap.set(modalTextLeftRef.current, {
      autoAlpha: 0,
      x: isDesktop ? -100 : 0,
      y: isDesktop ? 0 : 50,
      willChange: 'transform, opacity',
      force3D: true
    });
    gsap.set(modalCloseRef.current, { autoAlpha: 0 });

    const tl = gsap.timeline();

    // Target layout params
    const targetWidth = isDesktop ? '55vw' : '90vw';
    const targetHeight = isDesktop ? '75vh' : '50vh';

    tl.to(modalImageRef.current, {
      left: isDesktop ? '100%' : '50%',
      top: isDesktop ? '100%' : '60%',
      xPercent: isDesktop ? -100 : -50,
      yPercent: isDesktop ? -100 : -50,
      width: targetWidth,
      height: targetHeight,
      borderRadius: isDesktop ? '24px 0 0 0' : '16px',
      duration: 1.1,
      ease: 'expo.inOut'
    });

    // Slide in text stack
    tl.to(modalTextLeftRef.current, {
      autoAlpha: 1,
      x: 0,
      y: 0,
      duration: 0.8,
      ease: 'power4.out'
    }, "-=0.5");

    tl.to(modalCloseRef.current, {
      autoAlpha: 1,
      duration: 0.5
    }, "-=0.3");

  }, [selectedItem]);

  const handleImageClick = (item: any, e: React.MouseEvent<HTMLDivElement>) => {
    const node = e.currentTarget as HTMLElement;
    setSelectedItem({
      ...item,
      rect: node.getBoundingClientRect(),
      domNode: node
    });
  };

  const handleClose = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!selectedItem || !modalImageRef.current || !modalTextLeftRef.current) return;

    const isDesktop = window.innerWidth > 768;
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(selectedItem.domNode, { opacity: 1 });
        setSelectedItem(null);
      }
    });

    // Reverse slide and fade
    tl.to([modalCloseRef.current], { autoAlpha: 0, duration: 0.2 });

    tl.to(modalTextLeftRef.current, {
      autoAlpha: 0,
      x: isDesktop ? -100 : 0,
      y: isDesktop ? 0 : 50,
      duration: 0.4,
      ease: 'power3.in'
    }, 0);

    tl.to(modalImageRef.current, {
      left: selectedItem.rect.left,
      top: selectedItem.rect.top,
      width: selectedItem.rect.width,
      height: selectedItem.rect.height,
      xPercent: 0,
      yPercent: 0,
      borderRadius: '2px',
      duration: 0.8,
      ease: 'expo.inOut'
    }, "-=0.3");

    tl.to(modalRef.current, { autoAlpha: 0, duration: 0.2 });
  };

  return (
    <section ref={containerRef} id="gallery" className="relative w-full min-h-screen bg-[#fdfbf7] overflow-hidden flex flex-col pt-16 md:pt-24 pb-16 md:pb-24">

      {/* Viewport Title */}
      <div className="w-full text-center flex-shrink-0 mb-8 md:mb-12 px-6">
        <h2 className="font-display text-5xl md:text-8xl font-bold text-stone-900 tracking-tighter uppercase whitespace-nowrap">
          Gallery
        </h2>
      </div>

      {/* Rows Container */}
      <div className="flex-grow flex flex-col justify-center gap-8 md:gap-12 overflow-visible">

        {/* Row 1 */}
        <div className="w-full relative z-10 overflow-visible">
          <div ref={row1InnerRef} className="flex w-max gap-1">
            {row1Images.map((item, idx: number) => (
              <div
                onClick={(e) => handleImageClick(item, e)}
                key={`r1-${idx}`}
                className="gallery-item group relative w-[40vw] sm:w-[30vw] md:w-[20vw] lg:w-[15vw] aspect-[4/5] cursor-pointer transition-transform duration-300 ease-out hover:scale-105 hover:z-50 hover:shadow-2xl overflow-hidden rounded-sm"
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 40vw, 15vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 */}
        <div ref={row2ContainerRef} className="w-full relative z-10 overflow-visible">
          <div ref={row2InnerRef} className="flex w-max gap-1">
            {row2Images.map((item, idx: number) => (
              <div
                onClick={(e) => handleImageClick(item, e)}
                key={`r2-${idx}`}
                className="gallery-item group relative w-[40vw] sm:w-[30vw] md:w-[20vw] lg:w-[15vw] aspect-[4/5] cursor-pointer transition-transform duration-300 ease-out hover:scale-105 hover:z-50 hover:shadow-2xl overflow-hidden rounded-sm"
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 40vw, 15vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Optimized Modal: Content Left, Image Bottom-Right */}
      {selectedItem && (
        <div
          ref={modalRef}
          onClick={() => handleClose()}
          className="fixed inset-0 z-[999] bg-[#fdfbf7]/98 flex items-center justify-center invisible cursor-zoom-out"
        >

          {/* Close Button */}
          <button
            ref={modalCloseRef}
            onClick={(e) => handleClose(e)}
            className="absolute top-8 right-8 md:top-12 md:right-12 z-[1000] group flex flex-col items-center pointer-events-auto cursor-pointer"
          >
            <span className="font-display font-bold tracking-[0.2em] text-[10px] md:text-xs uppercase text-stone-900 pb-1">Close</span>
            <div className="w-8 h-[1px] bg-stone-900" />
          </button>

          {/* Combined Text Stack: Uniformly shifted from edge */}
          <div
            ref={modalTextLeftRef}
            className="absolute left-0 md:left-[5vw] lg:left-[6vw] top-0 w-full md:w-[40vw] h-full flex flex-col justify-start md:justify-center px-8 md:px-0 pt-24 md:pt-0 z-[60] pointer-events-none"
          >
            <div className="max-w-2xl flex flex-col items-start text-left">
              <h3 className="font-display text-5xl md:text-8xl lg:text-9xl font-bold text-stone-900 tracking-[-0.05em] leading-[0.85] mb-8 md:mb-12">
                {selectedItem.alt}
              </h3>

              <div className="flex flex-col items-start">
                <span className="inline-block text-[#c47728] font-display text-[10px] md:text-xs uppercase tracking-[0.5em] mb-4 font-bold">
                  Heritage Story
                </span>
                <p className="font-sans text-lg md:text-xl lg:text-2xl text-stone-700 leading-relaxed font-light max-w-lg">
                  {selectedItem.description}
                </p>
              </div>
            </div>
          </div>

          {/* Image Layer: Sticky to Bottom-Right on Desktop */}
          <div
            ref={modalImageRef}
            onClick={(e) => e.stopPropagation()}
            className="absolute z-50 overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] bg-stone-200 cursor-default"
          >
            <Image
              src={selectedItem.image}
              alt={selectedItem.alt}
              fill
              priority
              className="object-cover"
            />
          </div>

        </div>
      )}

    </section>
  );
}
