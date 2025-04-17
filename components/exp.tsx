"use client";

import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { TimelineDemo } from "./tl";

export function AuroraBackgroundDemo() {
  return (
   
    <div className="relative w-full min-h-screen overflow-y-scroll">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.3,
        duration: 0.8,
        ease: "easeInOut",
      }}
      className="h-full w-full relative z-10 flex flex-col gap-4 items-center min-h-screen px-4 py-10"
    >
      <div className="max-h-[80vh] overflow-y-auto w-full">
        <TimelineDemo />
      </div>
    </motion.div>
  </div>
    
  );
}