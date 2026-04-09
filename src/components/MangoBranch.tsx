'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

interface MangoBranchProps {
  side: 'left' | 'right';
}

export default function MangoBranch({ side }: MangoBranchProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(containerRef.current, {
      y: -50,
      x: side === 'left' ? -50 : 50,
      opacity: 0,
      rotate: side === 'left' ? -10 : 10,
      duration: 1.5,
      ease: 'power3.out',
      delay: 0.5,
    });
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className={`absolute top-0 ${side === 'left' ? 'left-0' : 'right-0'} z-50 pointer-events-none w-[300px] md:w-[450px] lg:w-[600px]`}
      style={{ transform: side === 'right' ? 'scaleX(-1)' : 'none' }}
    >
      <svg
        viewBox="0 0 600 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-2xl"
      >
        {/* Main Branch */}
        <path
          d="M0 50C100 50 150 80 250 120C350 160 450 150 600 180"
          stroke="#4A342C"
          strokeWidth="12"
          strokeLinecap="round"
        />

        {/* Sub Branches & Leaves */}
        <g className="leaf-group text-green">
          {/* Leaf 1 */}
          <path d="M120 70C140 40 180 30 210 50C240 70 230 110 200 130C170 150 130 140 110 120C90 100 100 80 120 70Z" fill="currentColor" fillOpacity="0.8" />
          {/* Leaf 2 */}
          <path d="M280 130C310 110 350 110 370 140C390 170 380 210 350 230C320 250 280 240 260 210C240 180 250 150 280 130Z" fill="currentColor" fillOpacity="0.9" />
          {/* Leaf 3 */}
          <path d="M420 160C450 140 490 150 510 180C530 210 520 250 490 270C460 290 420 280 400 250C380 220 390 180 420 160Z" fill="currentColor" fillOpacity="0.85" />
        </g>

        {/* Hanging Mangoes */}
        <g className="mango-group">
          {/* Mango 1 */}
          <circle cx="250" cy="180" r="4" fill="#4A342C" />
          <path d="M250 184C230 200 220 240 250 260C280 280 300 240 280 210C260 180 250 184 250 184Z" fill="#ffcc33" />
          <path d="M255 200C245 210 240 230 255 240C270 250 280 230 270 210C260 190 255 200 255 200Z" fill="#ff9933" fillOpacity="0.6" />

          {/* Mango 2 */}
          <circle cx="450" cy="200" r="4" fill="#4A342C" />
          <path d="M450 204C430 220 420 260 450 280C480 300 500 260 480 230C460 200 450 204 450 204Z" fill="#ffcc33" />
        </g>

        {/* Accents/Highlights */}
        <path d="M100 55C150 55 200 85 240 115" stroke="white" strokeWidth="2" strokeOpacity="0.2" />
      </svg>
    </div>
  );
}
