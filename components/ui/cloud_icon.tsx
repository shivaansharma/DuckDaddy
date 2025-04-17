"use client";

import { IconCloud } from "@/components/magicui/icon-cloud";
import { motion } from "framer-motion";

const slugs = [
  "typescript",
  "javascript",
  // "dart",
  "java",
  "react",
  "flutter",
  // "android",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  // "nextdotjs",
  "prisma",
  "amazonaws",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  // "testinglibrary",
  "jest",
  // "cypress",
  "docker",
  "git",
  // "jira",
  "github",
  "gitlab",
  "visualstudiocode",
  "androidstudio",
  "sonarqube",
  "figma",
];

export function IconCloudDemo() {
  const images = slugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
  );

  return (
    <div className="relative flex size-full h-full w-full items-center justify-center overflow-hidden">
      {/* Background Icon Cloud (Dull & Blurred) */}
      <div className="absolute inset-0 opacity-90 blur-sm">
        <IconCloud images={images} />
      </div>

      {/* Draggable Floating Boxed Icons */}
      <div className="relative flex flex-wrap gap-4 justify-center items-center">
        {images.map((img, idx) => (
          <motion.div
            key={idx}
            drag
            dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
            whileHover={{ scale: 1.1 }}
            animate={{
              y: [0, -10, 0],
              transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            }}
            className=" w-16 h-16 p-2 bg-white/10 backdrop-blur-md border border-neutral-300 dark:border-neutral-700 shadow-md rounded-lg flex items-center justify-center cursor-grab"
          >
            <img
              src={img}
              alt="tech-icon"
              className="w-10 h-10 object-contain opacity-80 transition-opacity duration-300 hover:opacity-100"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}