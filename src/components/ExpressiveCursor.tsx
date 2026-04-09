'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function ExpressiveCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      // Immediate movement for the main dot
      gsap.to(cursor, {
        x: clientX,
        y: clientY,
        duration: 0.1,
        ease: 'power2.out',
      });

      // Delayed movement for the follower (trail)
      gsap.to(follower, {
        x: clientX,
        y: clientY,
        duration: 0.6,
        ease: 'power3.out',
      });
    };

    const onMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, .interactive')) {
        gsap.to([cursor, follower], {
          scale: 2,
          opacity: 0.5,
          filter: 'blur(4px)',
          duration: 0.3,
        });
      }
    };

    const onMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, .interactive')) {
        gsap.to([cursor, follower], {
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.3,
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseEnter);
    window.addEventListener('mouseout', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseEnter);
      window.removeEventListener('mouseout', onMouseLeave);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 bg-saffron rounded-full pointer-events-none z-[10001] -translate-x-1/2 -translate-y-1/2"
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 border border-saffron rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2"
      />
    </>
  );
}
