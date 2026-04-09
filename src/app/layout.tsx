import type { Metadata } from "next";
import "./globals.css";
import { outfit, inter } from "@/lib/fonts";
import SmoothScroll from "@/components/SmoothScroll";
import Texture from "@/components/Texture";
import ExpressiveCursor from "@/components/ExpressiveCursor";
import HoverReveal from "@/components/HoverReveal";
import ExperienceManager from "@/components/ExperienceManager";

export const metadata: Metadata = {
  title: "VR Mangoville | Premium Kesar Mangoes",
  description: "Experience the sun-drenched essence of the world’s finest Kesar mangoes from VR Mangoville. Raw & Ripened Delicacies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable} h-full`}>
      <body className="antialiased min-h-full flex flex-col">
        <ExperienceManager>
          <Texture />
          <ExpressiveCursor />
          <HoverReveal />
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </ExperienceManager>
      </body>
    </html>
  );
}
