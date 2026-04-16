'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';

// Reels provided by user - Optimized with Cloudinary Speed Boost (q_auto, f_auto)
const REELS = [
  { video: "https://res.cloudinary.com/dkwrwuuob/video/upload/q_auto,f_auto/v1776321583/Amba_Diaries_Part_1_...Share_follow_for_more_content_%EF%B8%8F_viral_reels_minivlogs_business_sta_qw7d9o.mp4", link: "https://www.instagram.com/reel/DW5BBQMADXd/" },
  { video: "https://res.cloudinary.com/dkwrwuuob/video/upload/q_auto,f_auto/v1776321470/%E0%A4%95%E0%A4%BE%E0%A4%B0%E0%A5%8D%E0%A4%AC%E0%A4%BE%E0%A4%88%E0%A4%A1%E0%A4%A8%E0%A5%87_%E0%A4%AA%E0%A4%BF%E0%A4%95%E0%A4%B5%E0%A4%B2%E0%A5%87%E0%A4%B2%E0%A5%87_%E0%A4%86%E0%A4%82%E0%A4%AC%E0%A5%87_%E0%A4%A4%E0%A5%81%E0%A4%AE%E0%A4%9A%E0%A5%8D%E0%A4%AF%E0%A4%BE_%E0%A4%86%E0%A4%B0%E0%A5%8B%E0%A4%97%E0%A5%8D%E0%A4%AF%E0%A4%BE%E0%A4%B8%E0%A4%BE%E0%A4%A0%E0%A5%80_%E0%A4%A7%E0%A5%8B%E0%A4%95%E0%A4%BE%E0%A4%A6%E0%A4%BE%E0%A4%AF%E0%A4%95_%E0%A4%A0%E0%A4%B0%E0%A5%82_%E0%A4%B6%E0%A4%95%E0%A4%A4%E0%A4%BE%E0%A4%A4_%EF%B8%8F%E0%A4%95%E0%A5%85%E0%A4%A8%E0%A5%8D%E0%A4%B8%E0%A4%B0_%E0%A4%B2%E0%A4%BF%E0%A4%B5%E0%A5%8D%E0%A4%B9%E0%A4%B0_%E0%A4%86%E0%A4%A3%E0%A4%BF_%E0%A4%95%E0%A4%BF%E0%A4%A1%E0%A4%A8%E0%A5%80%E0%A4%B5%E0%A4%B0_hjeamb.mp4", link: "https://www.instagram.com/reel/C5y5T5vS_8C/" },
  { video: "https://res.cloudinary.com/dkwrwuuob/video/upload/q_auto,f_auto/v1776320476/%E0%A4%B8%E0%A4%A4%E0%A5%8D%E0%A4%A4%E0%A4%B0_%E0%A4%9F%E0%A4%A8_%E0%A4%86%E0%A4%AB%E0%A4%AC%E0%A5%8D%E0%A4%AF%E0%A4%BE%E0%A4%9C%E0%A5%80_%E0%A5%A9%E0%A5%A6%E0%A5%A6_%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A4%A4%E0%A4%BF_%E0%A4%95%E0%A4%BF%E0%A4%B2%E0%A5%8B_%E0%A4%A6%E0%A4%B0%E0%A4%BE%E0%A4%A8%E0%A5%87_%E0%A4%B5%E0%A4%BF%E0%A4%95%E0%A5%8D%E0%A4%B0%E0%A5%80_%E0%A4%9D%E0%A4%BE%E0%A4%B2%E0%A5%80_%E0%A4%AF%E0%A4%BE_%E0%A4%AF%E0%A4%B6%E0%A4%BE%E0%A4%AC%E0%A4%A6%E0%A5%8D%E0%A4%A6%E0%A4%B2_%E0%A4%97%E0%A5%8B%E0%A4%AA%E0%A5%80%E0%A4%9A%E0%A4%82%E0%A4%A6_%E0%A4%AA%E0%A4%A1%E0%A4%B3%E0%A4%95%E0%A4%B0_%E0%A4%AF%E0%A4%BE%E0%A4%82%E0%A4%A8%E0%A5%80_%E0%A4%86%E0%A4%AA%E0%A4%B2%E0%A5%8D%E0%A4%AF%E0%A4%BE_v5p5v0.mp4", link: "https://www.instagram.com/reel/C5y4jVvS_8C/" },
  { video: "https://res.cloudinary.com/dkwrwuuob/video/upload/q_auto,f_auto/v1776320470/Summer_has_arrived_reels_reelsinstagram_trending_mango_king_love_reelitfeelit_relax_n_jxnvi1.mp4", link: "https://www.instagram.com/reel/C5y3jVvS_8C/" },
];

// Local Images Restoration
const LOCAL_SOCIAL_IMAGES = [
  { image: "/SOCIAL/SOCIAL1.PNG", link: "https://www.instagram.com/vr_mangoville/" },
  { image: "/SOCIAL/SOCIAL2.PNG", link: "https://www.instagram.com/vr_mangoville/" },
  { image: "/SOCIAL/SOCIAL3.PNG", link: "https://www.instagram.com/vr_mangoville/" },
  { image: "/SOCIAL/SOCIAL4.jpeg", link: "https://www.instagram.com/vr_mangoville/" },
  { image: "/SOCIAL/SOCIAL5.jpeg", link: "https://www.instagram.com/vr_mangoville/" },
  { image: "/SOCIAL/SOCIAL6.jpeg", link: "https://www.instagram.com/vr_mangoville/" },

];

/** 
 * SMART PLAYER: Optimized for speed with Cloudinary q_auto/f_auto
 */
function SmartReel({ video, link, id }: { video: string; link: string; id: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.current && !hasError) {
          if (entry.isIntersecting) {
            videoRef.current.play().then(() => setIsLoaded(true)).catch(() => { });
          } else {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.1, rootMargin: '200px' }
    );

    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, [id, hasError]);

  if (hasError) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className="block w-full h-full relative">
        <Image 
          src={LOCAL_SOCIAL_IMAGES[0].image} 
          alt="Social Fallback" 
          fill 
          className="object-cover rounded-xl"
        />
      </a>
    );
  }

  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="block w-full h-full relative group">
      <video
        ref={videoRef}
        src={video}
        muted
        loop
        playsInline
        preload="auto"
        onPlaying={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover rounded-xl bg-neutral-900 transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
      {!isLoaded && (
        <div className="absolute inset-0 bg-neutral-800 animate-pulse rounded-xl flex items-center justify-center">
          <svg className="w-8 h-8 text-neutral-600" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
          </svg>
        </div>
      )}
      <div className="absolute top-4 right-4 z-10 opacity-70 group-hover:opacity-100 transition-opacity">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white" className="drop-shadow-lg">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.308 3.608-.975.975-2.242 1.245-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.245-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.245 3.608-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.058 1.281-.072 1.689-.072 4.948s.014 3.667.072 4.947c.2 4.337 2.617 6.78 6.979 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.947s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      </div>
    </a>
  );
}

export default function Social() {
  const containerRef = useRef<HTMLElement>(null);
  const [columns, setColumns] = useState<any[][]>([[], [], [], [], []]);

  useEffect(() => {
    const shuffle = (array: any[]) => [...array].sort(() => Math.random() - 0.5);

    // Pool generation: 1-2 Reels per column mixed with Images
    // Now utilizing the expanded LOCAL_SOCIAL_IMAGES (including SOCIAL5, SOCIAL6)
    const videoPool = [...REELS, ...REELS].map((r, i) => ({ ...r, type: 'video', id: `vid-${i}-${Math.random()}` }));
    const imagePool = shuffle([...LOCAL_SOCIAL_IMAGES, ...LOCAL_SOCIAL_IMAGES, ...LOCAL_SOCIAL_IMAGES]).map((img, i) => ({ ...img, type: 'image', id: `img-${i}-${Math.random()}` }));

    let mixedVideos = shuffle(videoPool);
    let mixedImages = shuffle(imagePool);

    const newColumns: any[][] = [[], [], [], [], []];
    newColumns.forEach((col, colIdx) => {
      // 1-2 videos per column
      const numVideos = Math.floor(Math.random() * 2) + 1;
      for (let i = 0; i < numVideos; i++) {
        if (mixedVideos.length > 0) col.push(mixedVideos.pop());
      }
      // Fill to 4 total with images
      const itemsToFill = 4 - col.length;
      for (let i = 0; i < itemsToFill; i++) {
        if (mixedImages.length > 0) col.push(mixedImages.pop());
      }
      newColumns[colIdx] = shuffle(col);
    });

    setColumns(newColumns);
  }, []);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container || columns[0].length === 0) return;

    ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: '+=250%',
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      refreshPriority: 0,
    });

    const upCols = gsap.utils.toArray('.col-up');
    const downCols = gsap.utils.toArray('.col-down');

    gsap.to(upCols, {
      yPercent: -25,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=250%',
        scrub: 1,
        refreshPriority: 0,
      }
    });

    gsap.fromTo(downCols,
      { yPercent: -25 },
      {
        yPercent: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=250%',
          scrub: 1,
          refreshPriority: 0,
        }
      }
    );
  }, { scope: containerRef, dependencies: [columns] });

  return (
    <section ref={containerRef} id="social" className="relative w-full h-screen bg-[#050505] overflow-hidden">
      <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none mix-blend-difference">
        <h2 className="font-display text-7xl md:text-[12vw] font-bold text-white tracking-widest uppercase opacity-20">
          Social
        </h2>
      </div>

      <div className="absolute inset-0 flex items-center justify-center gap-4 px-4 h-[150vh] overflow-visible">
        {columns.map((col, colIdx) => (
          <div
            key={colIdx}
            className={`flex-1 flex flex-col gap-4 ${colIdx % 2 === 0 ? 'col-up' : 'col-down'} ${colIdx > 2 ? 'hidden md:flex' : 'flex'}`}
          >
            {col.map((item) => (
              <div key={item.id} className="relative flex-shrink-0 w-full aspect-[9/16] overflow-hidden rounded-xl bg-neutral-900 shadow-2xl">
                {item.type === 'video' ? (
                  <SmartReel video={item.video} link={item.link} id={item.id} />
                ) : (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="block w-full h-full relative">
                    <Image
                      src={item.image}
                      alt="Social Post"
                      fill
                      sizes="(max-width: 768px) 100vw, 20vw"
                      className="object-cover"
                    />
                  </a>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
