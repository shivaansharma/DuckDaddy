'use client'

import { LineShadowText } from "./magicui/line-shadow-text";
import { BackgroundLines } from "@/components/ui/backGroundLines";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const achievements = [
  { 
    title: "350+ LeetCode Submissions", 
    description: "Solved over 350 algorithmic problems on LeetCode, improving problem-solving skills across data structures and algorithms.",
    color: "from-violet-600 to-purple-600",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17"></path>
      </svg>
    )
  },
  { 
    title: "Walmart Hackathon", 
    description: "Participated in the Walmart Hackathon, developing innovative solutions under time constraints in a competitive environment.",
    color: "from-blue-600 to-sky-500",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path>
      </svg>
    )
  },
  { 
    title: "Kaggle Submission", 
    description: "Made my first Kaggle submission and explored the platform's data science competitions.",
    color: "from-purple-500 to-indigo-500",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
      </svg>
    )
  },
  { 
    title: "Babu Programming Language", 
    description: "Created a unique Hindi-inspired programming language with custom syntax and compiler.",
    color: "from-blue-500 to-cyan-500",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
    )
  },
  { 
    title: "Open Source Contribution", 
    description: "Contributed to multiple open-source projects, including bug fixes and feature implementations for community tools.",
    color: "from-green-600 to-emerald-500",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"></path>
      </svg>
    )
  },
  { 
    title: "Portfolio Website", 
    description: "Built an interactive portfolio website using Next.js, Tailwind CSS and Framer Motion.",
    color: "from-emerald-500 to-green-500",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
        <line x1="8" y1="21" x2="16" y2="21"></line>
        <line x1="12" y1="17" x2="12" y2="21"></line>
      </svg>
    )
  },
  
  
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
};

export default function Achievement() {
  return (
    <section className="h-screen md:h-auto overflow-y-auto md:overflow-y-visible">
    <div className="flex flex-col items-center justify-start relative min-h-[100dvh] overflow-y-auto md:overflow-y-visible px-4 py-10">
      {/* Decorative gradient orbs */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
      
      <div className="relative z-10 mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-balance text-5xl font-bold leading-none tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl mb-4"
        >
          <LineShadowText className="italic">
            ACHIEVEMENTS
          </LineShadowText>
        </motion.h1>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: '60%' }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
          className="h-1 mx-auto bg-gradient-to-r from-purple-500 via-blue-500 to-emerald-500 rounded-full"
        ></motion.div>
      </div>
      
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-20"
      >
        {achievements.map((achieve, index) => (
          <motion.div
            key={index}
            variants={item}
            whileHover={{ 
              scale: 1.03,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
            className="relative rounded-2xl overflow-hidden backdrop-blur-lg transform transition-all duration-300"
          >
            {/* Gradient background */}
            <div className={cn(
              "absolute inset-0 bg-gradient-to-br opacity-10",
              achieve.color
            )}></div>
            
            {/* Top bar gradient */}
            <div className={cn(
              "h-2 w-full bg-gradient-to-r",
              achieve.color
            )}></div>
            
            <div className="p-8 bg-white/80 dark:bg-black/80 border border-gray-200 dark:border-gray-800">
              <div className={cn(
                "h-12 w-12 rounded-xl mb-5 flex items-center justify-center text-white",
                "bg-gradient-to-br shadow-lg",
                achieve.color
              )}>
                {achieve.icon}
              </div>
              
              <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-3">
                {achieve.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300">
                {achieve.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
    </section>
  );
}