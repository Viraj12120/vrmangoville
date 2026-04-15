"use client";

import { useExperienceStore } from "@/lib/store";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

const VIDEOS = [
	"https://res.cloudinary.com/dkwrwuuob/video/upload/v1776256808/IMG_0816_nxlwwm.mov",
	"https://res.cloudinary.com/dkwrwuuob/video/upload/v1776256812/IMG_0850_uurc6s.mov",
];

export default function MediaInterstitial() {
	const { isVideoActive, closeVideo } = useExperienceStore();
	const videoRef = useRef<HTMLDivElement>(null);
	const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

	useGSAP(
		() => {
			if (isVideoActive) {
				setCurrentVideoIndex(0); // Restart from first video when opened
				gsap.to(videoRef.current, {
					opacity: 1,
					pointerEvents: "auto",
					duration: 1,
					ease: "power3.inOut",
				});
			} else {
				gsap.to(videoRef.current, {
					opacity: 0,
					pointerEvents: "none",
					duration: 0.8,
					ease: "power3.inOut",
				});
			}
		},
		{ dependencies: [isVideoActive] },
	);

	const handleVideoEnded = () => {
		if (currentVideoIndex < VIDEOS.length - 1) {
			setCurrentVideoIndex((prev) => prev + 1);
		} else {
			setCurrentVideoIndex(0);
		}
	};

	return (
		<div
			ref={videoRef}
			className="fixed inset-0 z-[10010] bg-black pointer-events-none opacity-0">
			<div className="absolute inset-0">
				<video
					key={currentVideoIndex}
					src={VIDEOS[currentVideoIndex]}
					autoPlay
					muted
					playsInline
					onEnded={handleVideoEnded}
					className="w-full h-full object-cover opacity-60"
				/>
			</div>
			<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

			<div className="absolute bottom-12 left-12 z-20">
				<span className="text-white/40 font-display text-sm uppercase tracking-[0.4em] mb-4 block">
					Cinematic Atmosphere
				</span>
				<h3 className="text-white text-4xl md:text-6xl font-display font-bold max-w-4xl leading-tight">
					The Golden Heritage.<br />
					<span className="text-xl md:text-3xl text-white/80 font-normal mt-2 md:mt-4 block tracking-wide">
						Cultivated in Atpadi, Maharashtra — VR Mangoville
					</span>
				</h3>
			</div>

			<button
				onClick={closeVideo}
				className="absolute top-12 right-12 z-20 text-white/50 hover:text-white transition-colors uppercase tracking-widest text-xs font-display flex items-center gap-4">
				Close Experience
				<div className="w-8 h-[1px] bg-white/20" />
			</button>
		</div>
	);
}
