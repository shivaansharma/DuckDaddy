"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { IconCloudDemo } from "./ui/cloud_icon";
import { useOutsideClick } from "@/hooks/use-outside-click";

// Icons components
function IconClipboardCopy({ className }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
    </svg>
  );
}

function IconBoxAlignRightFilled({ className }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M19 5h-6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1zM6.5 17a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm0-7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"></path>
    </svg>
  );
}

function IconAppWindow({ className }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="3" width="20" height="18" rx="2" ry="2"></rect>
      <line x1="2" y1="8" x2="22" y2="8"></line>
      <line x1="6" y1="5.5" x2="6.01" y2="5.5"></line>
      <line x1="10" y1="5.5" x2="10.01" y2="5.5"></line>
    </svg>
  );
}

function IconLayout({ className }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="3" y1="9" x2="21" y2="9"></line>
      <line x1="9" y1="21" x2="9" y2="9"></line>
    </svg>
  );
}

function IconDatabase({ className }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
    </svg>
  );
}

function SkeletonOne() {
  return (
   <div className="flex justify-center items-center h-full w-full bg-gradient-to-r from-orange-100 to-pink-200 dark:from-orange-900 dark:to-pink-900 rounded-xl p-4">
    <div className="w-full space-y-2">
      <div className="flex items-center gap-2">
        <div className="h-4 w-4 rounded-full bg-orange-300 dark:bg-orange-600"></div>
        <div className="h-2 w-24 bg-orange-200 dark:bg-orange-700 rounded-full"></div>
      </div>
      <div className="h-32 w-full rounded-lg bg-orange-100/70 dark:bg-orange-800/40 flex items-center justify-center">
        <img
          src="/peach.png"
          alt="Peach"
          className="h-40 w-40 object-contain drop-shadow-md"
        />
      </div>
    </div>
  </div>
  );
}

function SkeletonTwo() {
  return (
    <div className="flex justify-center items-center h-full w-full bg-gradient-to-r from-rose-100 to-red-200 dark:from-rose-950 dark:to-red-900 rounded-xl p-4">
      <div className="w-full space-y-2">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-red-400 dark:bg-red-500"></div>
          <div className="h-2 w-24 bg-red-200 dark:bg-red-700 rounded-full"></div>
        </div>
        <div className="h-32 w-full rounded-lg bg-red-100/80 dark:bg-red-800/50 flex items-center justify-center">
          <img
            src="/squid-game-6758084_640.webp"
            alt="Preview"
            className="h-40 w-40 object-contain"
          />
        </div>
      </div>
    </div>
  );
}

function SkeletonThree() {
  return (
    <div className="flex flex-col justify-between h-full w-full bg-gradient-to-r from-emerald-100 to-teal-200 dark:from-emerald-950 dark:to-teal-900 rounded-xl p-4">
      <div className="flex justify-between items-start">
        <div className="h-6 w-6 rounded-full bg-emerald-500 dark:bg-emerald-400"></div>
        <div className="flex flex-col items-end gap-1">
          <div className="h-2 w-12 bg-emerald-200 dark:bg-emerald-700 rounded-full"></div>
          <div className="h-2 w-8 bg-emerald-200 dark:bg-emerald-700 rounded-full"></div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="relative h-24 w-24">
          <div className="absolute inset-0 rounded-full bg-emerald-200 dark:bg-emerald-800/60 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="100"
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-emerald-700 dark:text-emerald-300"
            >
              <text x="50%" y="50%" fontSize="48" textAnchor="middle" dominantBaseline="middle">
                69
              </text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function SkeletonFour() {
  return (
    <div className="flex justify-center items-center h-full w-full bg-gradient-to-r from-amber-200 to-yellow-300 dark:from-amber-900 dark:to-yellow-950 rounded-xl p-4">
      <div className="w-full space-y-2">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-amber-400 dark:bg-amber-500"></div>
          <div className="h-2 w-24 bg-amber-300 dark:bg-amber-700 rounded-full"></div>
        </div>
        <div className="h-32 w-full rounded-lg bg-amber-100 dark:bg-amber-800/60 flex items-center justify-center">
          <div className="h-28 w-28 rounded-full overflow-hidden shadow-md">
            <img
              src="/BabbuMaan.png"
              alt="Babbu Maan"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// New skeleton for N Queen Visualizer
function SkeletonSix() {
  return (
    <div className="flex justify-center items-center h-full w-full bg-gradient-to-r from-indigo-100 to-violet-200 dark:from-indigo-950 dark:to-violet-900 rounded-xl p-4">
      <div className="w-full space-y-2">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-violet-400 dark:bg-violet-500"></div>
          <div className="h-2 w-24 bg-violet-200 dark:bg-violet-700 rounded-full"></div>
        </div>
        <div className="h-32 w-full rounded-lg bg-indigo-100/70 dark:bg-indigo-800/50 flex items-center justify-center">
          <div className="grid grid-cols-4 grid-rows-4 gap-1 h-28 w-28 p-2 bg-white/80 dark:bg-black/40 rounded-md shadow-md">
            {/* Render a simple 4x4 chessboard pattern */}
            {Array(16).fill(0).map((_, i) => {
              const isEvenRow = Math.floor(i / 4) % 2 === 0;
              const isEvenCol = i % 4 % 2 === 0;
              const isDark = (isEvenRow && !isEvenCol) || (!isEvenRow && isEvenCol);
              
              // Add queen to some squares
              const hasQueen = [1, 6, 11, 14].includes(i);
              
              return (
                <div 
                  key={i} 
                  className={`flex items-center justify-center ${
                    isDark ? 'bg-indigo-900 dark:bg-indigo-800' : 'bg-indigo-100 dark:bg-indigo-300'
                  }`}
                >
                  {hasQueen && (
                    <div className="text-xs text-violet-600 dark:text-violet-300 font-bold">♕</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function SkeletonFive() {
  return (
    <div className="grid grid-cols-3 gap-2 h-full w-full bg-gradient-to-r from-slate-100 to-blue-100 dark:from-slate-950 dark:to-blue-950 rounded-xl p-4">
      <div className="flex items-center justify-center rounded-lg bg-white dark:bg-gray-800 p-2 shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
          <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
        </svg>
      </div>
      <div className="flex items-center justify-center rounded-lg bg-white dark:bg-gray-800 p-2 shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
        </svg>
      </div>
      <div className="flex items-center justify-center rounded-lg bg-white dark:bg-gray-800 p-2 shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      </div>
      <div className="flex items-center justify-center rounded-lg bg-white dark:bg-gray-800 p-2 shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500">
          <path d="M10.5 9A4.5 4.5 0 1 0 15 4.5"></path>
          <path d="M13.5 15A4.5 4.5 0 1 0 9 19.5"></path>
        </svg>
      </div>
      <div className="flex items-center justify-center rounded-lg bg-white dark:bg-gray-800 p-2 shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
          <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path>
        </svg>
      </div>
      <div className="flex items-center justify-center rounded-lg bg-white dark:bg-gray-800 p-2 shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="m14.31 8 5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16 3.95 6.06M14.31 16H2.83M16.62 12l-5.74 9.94"></path>
        </svg>
      </div>
    </div>
  );
}



export function BentoGridThirdDemo() {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const ref = useOutsideClick(() => setActiveItem(null));
  return (
    <>
    <div className="overflow-y-auto max-h-screen">
    <BentoGrid className="md:auto-rows-[20rem]">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={
              item.title !== "Tech Stack used" ? (
                <motion.div
                  layoutId={`card-${i}`}
                  onClick={() => setActiveItem(i)}
                  className="h-full cursor-pointer"
                >
                  {item.header}
                </motion.div>
              ) : (
                item.header
              )
            }
            className={cn("[&>p:text-lg]", item.className)}
            icon={item.icon}
          />
        ))}
      </BentoGrid>
  {/* Your grid or content here */}
</div>
      
      <AnimatePresence>
        {activeItem !== null && items[activeItem].title !== "Tech Stack used" && (
          <motion.div className="fixed inset-0 bg-black/50 backdrop-blur z-50 flex items-center justify-center p-4">
            <motion.div
              layoutId={`card-${activeItem}`}
              ref={ref}
              className="bg-white dark:bg-black rounded-xl max-w-4xl w-full p-6"
            >
              <motion.div className="mb-4">
                {items[activeItem].header}
              </motion.div>
              
              <motion.h2 className="text-2xl font-bold mb-2">
                {items[activeItem].title}
              </motion.h2>
              
              <motion.p className="text-neutral-600 dark:text-neutral-300 mb-4">
                {items[activeItem].description}
              </motion.p>
              <motion.div className="space-y-4">
                {items[activeItem].content?.()}
              </motion.div>
              <button
                onClick={() => setActiveItem(null)}
                className="mt-6 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Complete items array with content for expansion
const items = [
  {
    title: "Babu Lang",
    description: "A recursive descent parsed language written in C++ with C-like syntax",
    header: <SkeletonOne />,
    className: "md:col-span-1",
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
    content: () => (
      <div className="space-y-2">
        <p>• Implemented lexical analysis and parsing from scratch</p>
        <p>• Supports variables, loops, and conditional statements</p>
        <p>• Features include type checking and error reporting</p>
        <a href="https://github.com/shivaansharma/babu-lang" className="text-blue-500 block">GitHub Repository →</a>
      </div>
    )
  },
  {
    title: "Red Light - Green Light game",
    description: "A real-time reaction-based web game inspired by Red Light, Green Light",
    header: <SkeletonTwo />,
    className: "md:col-span-1",
    icon: <IconAppWindow className="h-4 w-4 text-neutral-500" />,
    content: () => (
      <div className="space-y-2">
        <p>• Built a web-based reaction game using React and TypeScript</p>
        <p>• Players must move only during 'Green Light' and stop instantly at 'Red Light'</p>
        <p>• Smooth animations and sound effects enhance game immersion</p>
        <p>• Features a timer, score tracker, and randomized light changes for difficulty</p>
        <a href="https://github.com/shivaansharma/red_green_game" className="text-blue-500 block">GitHub Repository →</a>
      </div>
    )
  },
  {
    title: "Handwritten Digit Recognition from Scratch",
    description: "A neural network built from scratch to classify digits from the MNIST dataset",
    header: <SkeletonThree />,
    className: "md:col-span-1",
    icon: <IconLayout className="h-4 w-4 text-neutral-500" />,
    content: () => (
      <div className="space-y-2">
        <p>• Developed a feedforward neural network using only NumPy (no deep learning libraries)</p>
        <p>• Trained on the MNIST dataset with customizable epochs, learning rate, and layers</p>
        <p>• Achieved high accuracy through techniques like weight initialization and ReLU activation</p>
        <p>• Includes a drawing canvas for real-time digit prediction via a web interface</p>
        <a href="#" className="text-blue-500 block">GitHub Repository →</a>
      </div>
    )
  },
  {
    title: "Music Streaming Platform",
    description: "A simple Spotify clone built with Node.js, Express, and MongoDB",
    header: <SkeletonFour />,
    className: "md:col-span-1",
    icon: <IconDatabase className="h-4 w-4 text-neutral-500" />,
    content: () => (
      <div className="space-y-2">
        <p>• Built a full-stack music streaming app using Express.js and MongoDB</p>
        <p>• Users can browse songs, create playlists, and stream audio in real-time</p>
        <p>• Includes user authentication, playlist management, and media player controls</p>
        <p>• Designed responsive UI with basic styling for desktop and mobile</p>
        <a href="#" className="text-blue-500 block">GitHub Repository →</a>
      </div>
    )
  },
  {
    title: "N Queen Visualizer",
    description: "Interactive visualization of the N-Queens problem using backtracking",
    header: <SkeletonSix />,
    className: "md:col-span-1",
    icon: <IconDatabase className="h-4 w-4 text-neutral-500" />,
    content: () => (
      <div className="space-y-2">
        <p>• Visualizes the classic N-Queens problem using backtracking algorithms</p>
        <p>• Built with HTML, CSS, and JavaScript (or React, if applicable)</p>
        <p>• Displays step-by-step queen placements with animation and user-adjustable board size</p>
        <p>• Helps users understand recursion and constraint satisfaction visually</p>
        <a href="https://github.com/shivaansharma/n_queen_visualizer" className="text-blue-500 block">GitHub Repository →</a>
      </div>
    )
  },
  {
    title: "Tech Stack Used",
    description: "Technologies I work with",
    header: <SkeletonFive />,
    className: "md:col-span-1",
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
    content: () => (
      <div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Frontend</h3>
            <ul className="space-y-1">
              <li>• React / Next.js</li>
              <li>• TypeScript</li>
              <li>• Tailwind CSS</li>
              <li>• Framer Motion</li>
              <li>• Redux / Zustand</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Backend</h3>
            <ul className="space-y-1">
              <li>• Node.js / Express</li>
              <li>• Python / Django</li>
              <li>• GraphQL</li>
              <li>• RESTful APIs</li>
              <li>• PostgreSQL / MongoDB</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">DevOps</h3>
            <ul className="space-y-1">
              <li>• Docker / Kubernetes</li>
              <li>• CI/CD Pipelines</li>
              <li>• AWS / GCP</li>
              <li>• Terraform</li>
              <li>• GitHub Actions</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Languages</h3>
            <ul className="space-y-1">
              <li>• JavaScript / TypeScript</li>
              <li>• Python</li>
              <li>• C++</li>
              <li>• Java</li>
              <li>• SQL</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Tools</h3>
            <ul className="space-y-1">
              <li>• Git / GitHub</li>
              <li>• VS Code</li>
              <li>• Figma / Adobe XD</li>
              <li>• Postman</li>
              <li>• Jira / Linear</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Machine Learning</h3>
            <ul className="space-y-1">
              <li>• TensorFlow / PyTorch</li>
              <li>• Scikit-learn</li>
              <li>• Natural Language Processing</li>
              <li>• Computer Vision</li>
              <li>• Data Visualization</li>
            </ul>
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-neutral-600 dark:text-neutral-400">Always learning new technologies and expanding my skillset!</p>
        </div>
      </div>
    )
  },
];