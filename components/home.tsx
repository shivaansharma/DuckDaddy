import React from "react";
import { BackgroundLines } from "./ui/backGroundLines";

export function BackgroundLinesDemo() {
  return (
   <div className="">
     <BackgroundLines className="flex items-center justify-center w-full flex-col min-h-screen pointer-events-none px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl sm:text-3xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
          Shivaan Sharma
        </h2>
        <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400">
          A computer science engineer & I have a pet Duck quack !!!!!!!
        </p>
      </div>
    </BackgroundLines>
   </div>
  );
}