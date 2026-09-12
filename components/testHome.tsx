"use client";

import React, { useRef, useEffect, useState, UIEvent } from "react";
import { motion, useMotionValue, useTransform, MotionValue } from "framer-motion";
import { Rye } from "next/font/google";
import { TestExp } from "./testExp";
import { TestProjects } from "./testProjects";
import { TestSkills } from "./testSkills";
import { TestContact } from "./testContact";

// Initialize the Western font
const westernFont = Rye({ 
  subsets: ["latin"],
  weight: "400",
});

/* =================================================
   SCENE DEFINITIONS
   ================================================= */
const SCENES = [
  {
    name: "forest",
    layers: [
      { src: "/Super Mountain Dusk Files/Assets/version B/Layers/sky.png", speed: 0, scale: 1.5 },
      { src: "/Super Mountain Dusk Files/Assets/version B/Layers/far-mountains.png", speed: 0.1, scale: 1 },
      { src: "/Super Mountain Dusk Files/Assets/version B/Layers/middle-mountains.png", speed: 0.2, scale: 1.15 },
      { src: "/Super Mountain Dusk Files/Assets/version B/Layers/far-trees.png", speed: 0.35, scale: 1.1 },
      { src: "/Super Mountain Dusk Files/Assets/version B/Layers/myst.png", speed: 0.5, scale: 1.2 },
      { src: "/Super Mountain Dusk Files/Assets/version B/Layers/near-trees.png", speed: 0.8, scale: 1.3 },
    ],
  },
  {
    name: "dusk-mountains",
    layers: [
      { src: "/MountainDuskGodot/MountainsLayers/sky.png", speed: 0, scale: 1 },
      { src: "/MountainDuskGodot/MountainsLayers/far-clouds.png", speed: 0.1, scale: 1.1 },
      { src: "/MountainDuskGodot/MountainsLayers/far-mountains.png", speed: 0.2, scale: 1.15 },
      { src: "/MountainDuskGodot/MountainsLayers/mountains.png", speed: 0.35, scale: 1.2 },
      { src: "/MountainDuskGodot/MountainsLayers/near-clouds.png", speed: 0.5, scale: 0.8 },
      { src: "/MountainDuskGodot/MountainsLayers/trees.png", speed: 0.8, scale: 1.2},
    ],
  },
  {
    name: "desert",
    layers: [
      { src: "/Super Mountain Dusk Files/Assets/Version C/layers/sky.png", speed: 0, scale: 1 },
      { src: "/Super Mountain Dusk Files/Assets/Version C/layers/clouds.png", speed: 0.1, scale: 1.05 },
      { src: "/Super Mountain Dusk Files/Assets/Version C/layers/far-mountains.png", speed: 0.25, scale: 1.1 },
      { src: "/Super Mountain Dusk Files/Assets/Version C/layers/canyon.png", speed: 0.45, scale: 1.2 },
      { src: "/Super Mountain Dusk Files/Assets/Version C/layers/front.png", speed: 0.8, scale: 1.3 },
    ],
  },
];

const SCENE_LENGTH = 1800; 
const FADE_ZONE = 300;
const STAGGER_DISTANCE = 1000;

/* =================================================
   RUNNING COWBOY (Back & Forth, Scaled Up)
   ================================================= */
function RunningCowboy() {
  const [frame, setFrame] = useState(0);

  const size = 4; // 👈 change this to make him bigger/smaller

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % 10);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="absolute z-50 pointer-events-none"
      animate={{
        x: ["-80vw", "80vw", "80vw", "-80vw", "-80vw"],
        scaleX: [size, size, -size, -size, size],
        scaleY: [size, size, size, size, size],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "linear",
        times: [0, 0.45, 0.5, 0.95, 1],
      }}
      style={{
        width: "128px",
        height: "128px",

        left: "50%",
        marginLeft: "-64px",

        top: "-120px",

        backgroundImage: "url('/run.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: `-${frame * 128}px 0px`,
        imageRendering: "pixelated",
      }}
    />
  );
}
export function TestHome() {
  const scrollY = useMotionValue(0);
  const idleX = useMotionValue(0); 
  
  const isAutoScrolling = useRef(true);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  
  // --- AUDIO SETUP ---
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    let animationFrameId: number;

    const autoScrollTick = () => {
      if (isAutoScrolling.current) {
        idleX.set(idleX.get() + 1.5); 
      }
      animationFrameId = requestAnimationFrame(autoScrollTick);
    };
    
    animationFrameId = requestAnimationFrame(autoScrollTick);
    
    return () => cancelAnimationFrame(animationFrameId);
  }, [idleX]);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    scrollY.set(e.currentTarget.scrollTop);
    isAutoScrolling.current = false;
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
    scrollTimeout.current = setTimeout(() => {
      isAutoScrolling.current = true;
    }, 1000);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#1a1a1a]">
      
      <audio 
        ref={audioRef} 
        src="/The Good, the Bad and the Ugly Theme Extended - 10 minutes - Mario Luiz.mp3" 
        loop 
      />

      <div className="fixed inset-0 z-0 pointer-events-none">
        {SCENES.map((scene, i) => (
          <Scene key={scene.name} index={i} layers={scene.layers} scrollY={scrollY} idleX={idleX} />
        ))}
      </div>

      <button 
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-[99999] flex items-center justify-center rounded-full bg-white/10 p-4 text-[#e8dcb8] backdrop-blur-md transition-all hover:bg-white/20 hover:scale-105 active:scale-95 shadow-lg border border-[#e8dcb8]/20"
        aria-label="Toggle Music"
      >
        {isPlaying ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" rx="1"/>
            <rect x="14" y="4" width="4" height="16" rx="1"/>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      <div 
        className="absolute inset-0 z-10 overflow-y-auto overflow-x-hidden scroll-smooth"
        onScroll={handleScroll}
      >
        
        {/* 1. HERO SECTION */}
        <section className="relative h-screen w-full flex items-center justify-center px-4 overflow-hidden">
          
          <div className={`relative z-10 text-center text-[#e8dcb8] ${westernFont.className} uppercase`}>
            {/* The Cowboy is now inside the text container, making him perfectly relative to the name */}
            <RunningCowboy />

            <h2 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold drop-shadow-[0_8px_8px_rgba(0,0,0,0.9)]">
              Shivaan Sharma
            </h2>
            <p className="max-w-4xl mx-auto mt-6 text-xl sm:text-2xl md:text-3xl lg:text-4xl drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)] tracking-wide">
             Software Engineer
            </p>
          </div>
          
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#e8dcb8] opacity-70"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </motion.div>
        </section>

        {/* EXTERNAL SECTIONS */}
        <TestExp font={westernFont} />
        <TestProjects font={westernFont} />
        <TestSkills font={westernFont} />
        <TestContact font={westernFont} />

      </div>
    </div>
  );
}

/* =================================================
   SCENE CONTAINER
   ================================================= */
function Scene({
  index,
  layers,
  scrollY,
  idleX,
}: {
  index: number;
  layers: { src: string; speed: number; scale: number }[];
  scrollY: MotionValue<number>;
  idleX: MotionValue<number>;
}) {
  const totalScenes = SCENES.length;
  const totalLength = totalScenes * SCENE_LENGTH;

  const zIndex = useTransform(scrollY, (raw) => {
    const sceneStart = index * SCENE_LENGTH;
    const phase = (((raw - sceneStart) % totalLength) + totalLength) % totalLength;
    return Math.round(totalLength - phase);
  });

  return (
    <motion.div className="absolute inset-0" style={{ zIndex }}>
      {layers.map((layer) => (
        <ScrollingLayer 
          key={layer.src} 
          {...layer} 
          scrollY={scrollY} 
          idleX={idleX} 
          sceneIndex={index} 
        />
      ))}
    </motion.div>
  );
}

/* =================================================
   SCROLLING LAYER
   ================================================= */
function ScrollingLayer({
  src,
  speed = 0.3,
  scale = 1,
  scrollY,
  idleX,
  sceneIndex,
}: {
  src: string;
  speed?: number;
  scale?: number;
  scrollY: MotionValue<number>;
  idleX: MotionValue<number>;
  sceneIndex: number;
}) {
  const totalScenes = SCENES.length;

  const backgroundPositionX = useTransform(
    [scrollY, idleX],
    ([latestY, latestX]) => {
      const y = latestY as number;
      const x = latestX as number;
      return `${-((y * 1.5 + x) * speed)}px`; 
    }
  );

  const MAX_SPEED = 0.8;
  const depthRatio = Math.max(0, MAX_SPEED - speed) / MAX_SPEED;
  const fadeDelay = depthRatio * STAGGER_DISTANCE;

  const layerStart = sceneIndex * SCENE_LENGTH + fadeDelay;

  const opacity = useTransform(scrollY, (raw) => {
    const maxScroll = totalScenes * SCENE_LENGTH;
    const looped = raw % maxScroll;

    let dist = looped - layerStart;
    if (dist < -maxScroll / 2) dist += maxScroll;
    if (dist > maxScroll / 2) dist -= maxScroll;

    if (dist < -FADE_ZONE || dist > SCENE_LENGTH + FADE_ZONE) return 0;
    if (dist < 0) return 1 + dist / FADE_ZONE;
    if (dist > SCENE_LENGTH) return 1 - (dist - SCENE_LENGTH) / FADE_ZONE;
    return 1;
  });

  return (
    <motion.div
      className="absolute inset-0"
      style={{
        opacity,
        backgroundImage: `url('${src}')`,
        backgroundRepeat: "repeat-x",
        backgroundSize: `auto ${scale * 100}%`,
        backgroundPositionX,
        backgroundPositionY: "bottom",
        imageRendering: "pixelated",
      }}
    />
  );
}