'use client';

import { useExperienceStore } from '@/lib/store';
import MediaInterstitial from './MediaInterstitial';
import DetailsModal from './DetailsModal';
import { useEffect } from 'react';

export default function ExperienceManager({ children }: { children: React.ReactNode }) {
  const { isVideoActive, triggerVideo } = useExperienceStore();

  // Periodically check for video trigger if interaction is happening
  useEffect(() => {
    const handleTrigger = () => {
      // Small chance to trigger video takeover on mouse movement
      if (Math.random() < 0.001 && !isVideoActive) {
        triggerVideo();
      }
    };

    window.addEventListener('mousemove', handleTrigger);
    return () => window.removeEventListener('mousemove', handleTrigger);
  }, [isVideoActive, triggerVideo]);

  return (
    <>
      <MediaInterstitial />
      <DetailsModal />
      {children}
    </>
  );
}
