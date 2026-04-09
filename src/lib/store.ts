import { create } from 'zustand';

interface ExperienceDetail {
  title: string;
  content: string;
  img: string;
}

interface ExperienceState {
  isVideoActive: boolean;
  activeDetail: ExperienceDetail | null;
  isMenuOpen: boolean;
  
  triggerVideo: () => void;
  startVideo: () => void;
  closeVideo: () => void;
  
  openDetail: (detail: ExperienceDetail) => void;
  closeDetail: () => void;
  setMenuOpen: (open: boolean) => void;
}

export const useExperienceStore = create<ExperienceState>((set) => ({
  isVideoActive: false,
  activeDetail: null,

  triggerVideo: () => {
    // 10% probability trigger
    if (Math.random() < 0.1) {
      set({ isVideoActive: true });
    }
  },

  startVideo: () => set({ isVideoActive: true }),

  closeVideo: () => set({ isVideoActive: false }),

  openDetail: (detail) => set({ activeDetail: detail }),

  closeDetail: () => set({ activeDetail: null }),

  isMenuOpen: false,

  setMenuOpen: (open) => set({ isMenuOpen: open }),
}));
