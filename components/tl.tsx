"use client";
import Image from "next/image";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Custom Timeline component with enhanced visuals
const Timeline = ({ data }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  return (
    <div className="relative">
      {/* Timeline center line */}
      <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-blue-500 to-emerald-500 rounded-full"></div>
      
      <div className="space-y-12">
        {data.map((item, index) => {
          const isEven = index % 2 === 0;
          const isExpanded = expandedIndex === index;
          
          return (
            <div key={index} className="relative">
              {/* Timeline dot */}
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 rounded-full border-4 border-white dark:border-black bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg flex items-center justify-center z-10">
                {index + 1}
              </div>
              
              {/* Content container */}
              <div 
                className={cn(
                  "ml-16 md:ml-0",
                  isEven ? "md:mr-[50%] md:pr-12" : "md:ml-[50%] md:pl-12"
                )}
              >
                <motion.div
                  layoutId={`timeline-card-${index}`}
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  className={cn(
                    "bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800",
                    "cursor-pointer transition-all duration-300 hover:shadow-xl",
                    "bg-gradient-to-br",
                    index === 0 ? "from-purple-50 to-indigo-50 dark:from-purple-950 dark:to-indigo-950" :
                    index === 1 ? "from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950" :
                    "from-emerald-50 to-green-50 dark:from-emerald-950 dark:to-green-950"
                  )}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className={cn(
                      "text-lg font-bold px-4 py-1 rounded-full",
                      index === 0 ? "bg-purple-200 text-purple-800 dark:bg-purple-900 dark:text-purple-200" :
                      index === 1 ? "bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-200" :
                      "bg-emerald-200 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
                    )}>
                      {item.title}
                    </span>
                    <div className="h-px flex-grow bg-gradient-to-r from-gray-200 to-transparent dark:from-gray-700"></div>
                  </div>
                  
                  <div className="space-y-4">
                    {React.cloneElement(item.content, { isExpanded })}
                  </div>
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Enhanced content components
const TimelineContent = ({ title, description, images, isExpanded }) => {
  return (
    <>
      <h3 className="text-lg md:text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
        {title}
      </h3>
      
      <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base">
        {description}
      </p>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-4">
              <div className="grid grid-cols-2 gap-4">
                {images.map((img, idx) => (
                  <div key={idx} className="relative overflow-hidden rounded-xl group">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                    <Image 
                      src={img.src} 
                      alt={img.alt} 
                      width={500} 
                      height={500} 
                      className="rounded-xl object-cover h-full w-full transition-transform duration-500 ease-out group-hover:scale-110" 
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="flex justify-center mt-4">
        <button className={`px-3 py-1 text-sm rounded-full border transition-colors duration-300 ${isExpanded ? 'border-gray-400 dark:border-gray-600' : 'border-gray-300 dark:border-gray-700'}`}>
          {isExpanded ? 'Show less' : 'Show more'}
        </button>
      </div>
    </>
  );
};

export function TimelineDemo() {
  const data = [
    {
      title: "2025",
      content: (
        <TimelineContent
          title="Internship at IIT Roorkee"
          description="Analyzed and visualized datasets using AI-driven techniques, developing scalable data processing pipelines and interactive dashboards for cutting-edge research applications."
          images={[
            { src: "/download.jpeg", alt: "IIT Roorkee" },
            { src: "/iitroorkeebreaksallpreviousrecordsinthisplacementseason388130611271.webp", alt: "IIT Roorkee Campus" }
          ]}
        />
      ),
    },
    {
      title: "2024",
      content: (
        <TimelineContent
          title="Internship at Template Farm"
          description="Specialized in advanced frontend development with Next.js and Tailwind CSS, creating high-performance, reusable UI components that optimized user interfaces and experiences."
          images={[
            { src: "/Screenshot 2025-03-28 at 11.11.53 AM.png", alt: "Template Farm Logo" },
            { src: "/Screenshot 2025-03-28 at 11.09.15 AM.png", alt: "Template Showcase" }
          ]}
        />
      ),
    },
    {
      title: "2024",
      content: (
        <TimelineContent
          title="Internship at TBI GEHU"
          description="Built AI-powered web applications for startups, creating dynamic responsive interfaces and integrating AI-driven automation solutions that transformed business processes."
          images={[
            { src: "/Screenshot 2025-03-28 at 11.13.03 AM.png", alt: "TBI GEHU Logo" },
            { src: "/graphic-era-hill-(3).avif", alt: "TBI GEHU Innovation Lab" }
          ]}
        />
      ),
    },
  ];

  return (
    <div className="w-full py-16 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 text-transparent bg-clip-text">
            My Professional Journey
          </h2>
          <div className="h-1 w-24 mx-auto bg-gradient-to-r from-purple-500 via-blue-500 to-emerald-500 rounded-full"></div>
        </div>
        <Timeline data={data} />
      </div>
    </div>
  );
}