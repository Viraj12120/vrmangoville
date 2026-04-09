'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

const MANGO_LEAF_SVG = `
  <path d="M12 2C11 2 8 4 6 8C4 12 3 16 4 19C5 22 8 23 12 23C16 23 19 22 20 19C21 16 20 12 18 8C16 4 13 2 12 2Z" fill="currentColor"/>
  <path d="M12 2V23" stroke="currentColor" stroke-width="0.5" opacity="0.4" fill="none"/>
`;

const SMALL_BRANCH_SVG = `
  <path d="M0 17 L35 17" stroke="currentColor" stroke-width="4" stroke-linecap="round" fill="none"/>
`;



export default function LeafParticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const numItems = 25;
    const items: HTMLDivElement[] = [];

    for (let i = 0; i < numItems; i++) {
      const item = document.createElement('div');
      const innerItem = document.createElement('div');

      let type: 'stick' | 'leaf';
      if (i === 0) type = 'stick'; // Exactly ONE plain stick for nav underline
      else type = 'leaf';

      item.dataset.type = type;

      const isGolden = Math.random() > 0.7;
      let itemColor = '';
      if (type === 'stick') {
        itemColor = 'text-[#4A342C]/40';
      } else {
        itemColor = isGolden ? 'text-saffron/40' : 'text-green/40';
      }

      item.className = `absolute pointer-events-auto cursor-pointer ${itemColor} transition-opacity duration-1000 z-50`;

      const width = type === 'stick' ? (Math.random() * 40 + 30) : (Math.random() * 30 + 15);
      item.style.width = `${width}px`;
      item.style.height = `${width * (type === 'stick' ? 1 : 2)}px`;

      innerItem.className = 'w-full h-full';
      if (type === 'stick') {
        innerItem.innerHTML = `<svg viewBox="0 0 35 35" style="width: 100%; height: 100%;" preserveAspectRatio="none">${SMALL_BRANCH_SVG}</svg>`;
      } else {
        innerItem.innerHTML = `<svg viewBox="0 0 24 25" style="transform: scaleX(0.6); width: 100%; height: 100%;">${MANGO_LEAF_SVG}</svg>`;
      }

      item.appendChild(innerItem);
      container.appendChild(item);
      items.push(item);

      // "Too Interactive" logic! (Hover & Click make it pop violently)
      const triggerPop = (e: Event) => {
        // Ensure we don't pop the designated nav stick
        if (item === activeNavStick) return;

        e.stopPropagation();
        gsap.killTweensOf(innerItem);

        const randomX = (Math.random() - 0.5) * 300; // Large displacement
        const randomY = (Math.random() - 0.5) * 300;
        const randomRot = (Math.random() - 0.5) * 720; // Crazy spin
        const randomScale = Math.random() * 1.5 + 1.5; // Bubble up

        const tl = gsap.timeline();
        tl.to(innerItem, {
          x: randomX,
          y: randomY,
          rotation: randomRot,
          scale: randomScale,
          duration: 0.3,
          ease: 'power4.out'
        })
          .to(innerItem, {
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            duration: 2.5,
            ease: 'elastic.out(1, 0.2)'
          });
      };

      item.addEventListener('pointerdown', triggerPop);
      item.addEventListener('pointerenter', triggerPop); // Extra interactive!

      // Deterministic Symmetrical Split using real container percentages
      const isRightSide = i < numItems / 2;
      const xStart = isRightSide ? (Math.random() * 12 + 88) : (Math.random() * 12);

      const yStart = Math.random() * 110 - 5;
      const scale = Math.random() * 1.5 + 0.5;

      gsap.set(item, {
        left: `${xStart}%`,
        top: `${yStart}%`,
        rotate: Math.random() * 360,
        scale: scale,
        opacity: 0,
        xPercent: -50,
        yPercent: -50,
      });

      gsap.to(item, {
        opacity: 1,
        duration: 2,
        delay: Math.random() * 2,
      });

      // Symmetrical drift physics
      gsap.to(item, {
        x: isRightSide ? `-=${Math.random() * 40}` : `+=${Math.random() * 40}`,
        y: `+=${Math.random() * 100 + 100}`,
        rotate: `+=${Math.random() * 60 - 30}`,
        duration: Math.random() * 15 + 15,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: Math.random() * -30,
      });
    }

    // --- Magnetization Logic ---
    const actualBranches = items.filter(item => item.className.includes('#4A342C'));
    let activeNavStick: HTMLDivElement | null = null;
    let hoverTimeout: NodeJS.Timeout;

    const handleMagnetize = (e: any) => {
      if (!container) return;
      const { hover, x, y, width } = e.detail;

      if (hover && actualBranches.length > 0) {
        clearTimeout(hoverTimeout);

        // Claim the first available stick exactly once, so it jumps between items seamlessly
        if (!activeNavStick) {
          activeNavStick = actualBranches[0];
        }

        const item = activeNavStick;
        const innerItem = item.firstElementChild as HTMLDivElement;

        gsap.killTweensOf(item);
        gsap.killTweensOf(innerItem);

        const containerRect = container.getBoundingClientRect();

        // Calculate center of target (bottom edge of nav item + exact visual clearance)
        const targetCenterX = x + (width / 2) - containerRect.left;
        const targetCenterY = y - containerRect.top + 6;

        // Calculate item's origin from percentages assigned in creation
        const originX = (parseFloat(item.style.left) / 100) * containerRect.width;
        const originY = (parseFloat(item.style.top) / 100) * containerRect.height;

        const dx = targetCenterX - originX;
        const dy = targetCenterY - originY;

        // Move item to dead center below the text's bottom, kill parent drift rotation, and darken color
        gsap.to(item, {
          x: dx,
          y: dy,
          rotate: 0, // CRITICAL: Negates the parent's drifting spin angle 
          color: '#4A342C', // Make underline dark and solid
          duration: 0.5,
          ease: 'power3.out',
          overwrite: 'auto'
        });

        // Form the underline perfectly horizontal (0 deg) matching the exact text width
        const originalWidth = parseFloat(item.style.width);
        const stretchScale = width / originalWidth;

        gsap.to(innerItem, {
          rotation: 0,
          scaleX: stretchScale,
          scaleY: 1, // Keep natural branch thickness
          duration: 0.5,
          ease: 'power3.out',
          overwrite: 'auto'
        });

      } else if (!hover && activeNavStick) {
        // Start a un-hover timer in case they are just moving to the next link
        clearTimeout(hoverTimeout);
        hoverTimeout = setTimeout(() => {
          if (!activeNavStick) return;
          const item = activeNavStick;
          const innerItem = activeNavStick.firstElementChild as HTMLDivElement;

          gsap.to(innerItem, {
            rotation: (Math.random() - 0.5) * 360,
            scaleX: 1,
            scaleY: 1,
            duration: 1.5,
            ease: 'elastic.out(1, 0.3)'
          });

          // Revert colors and bindings back to float behavior
          gsap.to(item, {
            x: `+=${(Math.random() - 0.5) * 100}`,
            y: `+=${Math.random() * 100 + 50}`,
            rotate: `+=${(Math.random() - 0.5) * 180}`,
            color: 'rgba(74, 52, 44, 0.4)', // Revert to semi-transparent 40%
            duration: Math.random() * 15 + 15,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
          });

          activeNavStick = null;
        }, 150);
      }
    };

    window.addEventListener('magnetize-stick', handleMagnetize);

    return () => {
      window.removeEventListener('magnetize-stick', handleMagnetize);
      items.forEach(l => l.remove());
    };
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
