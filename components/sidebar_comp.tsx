"use client";
import React, { useState, useEffect, useRef } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar_ui";
import {
  IconHome,
  IconBriefcase,
  IconUserBolt,
  IconTrophy,
  IconMail,
  IconMoon,
  IconSun,
  IconDownload,
  IconSettingsHeart,
  IconConfetti,
  IconPaw,
  IconHeart,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { BentoGridThirdDemo } from "./bento-component";
import { BackgroundLinesDemo } from "./home";
import { AuroraBackgroundDemo } from "./exp";
import Achievement from "./achiv";
import ContactMe from "./contactme";
import SkillComponent from "./skills";

export function SidebarDemo() {
  // Core states
  const [clicked, setClicked] = useState("home");
  const [darkMode, setDarkMode] = useState(false);
  const [partyMode, setPartyMode] = useState(false);
  const [open, setOpen] = useState(false);
  const audioRef = useRef(null);

  // Pet zoo states
  const [petZooOpen, setPetZooOpen] = useState(false);
  const [currentPet, setCurrentPet] = useState(null);
  const [petName, setPetName] = useState("");
  const [happiness, setHappiness] = useState(100);
  const [hunger, setHunger] = useState(100);
  const [petMessage, setPetMessage] = useState(null);
  const [petAnimation, setPetAnimation] = useState(null);
  
  // Available pets
  const availablePets = [
    { emoji: "🐢", type: "turtle" },
    { emoji: "🐱", type: "cat" },
    { emoji: "🦙", type: "llama" },
    { emoji: "🦄", type: "unicorn" },
    { emoji: "🐰", type: "rabbit" },
    { emoji: "🧸", type: "teddy" },
    { emoji: "🐥", type: "duck" }, // Easter egg
    { emoji: "🐶", type: "dog" },
    { emoji: "🦖", type: "t-rex" }
  ];
  
  // Duck coding advice
  const codingAdvice = [
    "Pray to the code gods !!!",
    "Linus himself cannot help u !!"
  ];
  
  // Load pet from localStorage on initial render
  useEffect(() => {
    const savedPet = localStorage.getItem("currentPet");
    if (savedPet) {
      try {
        const petData = JSON.parse(savedPet);
        setCurrentPet(petData.pet);
        setPetName(petData.name || "");
        setHappiness(petData.happiness || 100);
        setHunger(petData.hunger || 100);
      } catch (e) {
        console.error("Error loading pet data", e);
      }
    }
    
    // Load dark mode preference
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);
  
  // Save pet data when it changes
  useEffect(() => {
    if (currentPet) {
      const petData = {
        pet: currentPet,
        name: petName,
        happiness: happiness,
        hunger: hunger
      };
      localStorage.setItem("currentPet", JSON.stringify(petData));
    } else {
      localStorage.removeItem("currentPet");
    }
  }, [currentPet, petName, happiness, hunger]);
  
  // Pet gets sad/hungry over time
  useEffect(() => {
    if (!currentPet) return;
    
    const interval = setInterval(() => {
      setHappiness(prev => Math.max(0, prev - 3));
      setHunger(prev => Math.max(0, prev - 2));
    }, 60000); // Decrease every minute
    
    return () => clearInterval(interval);
  }, [currentPet]);
  
  // Toggle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);
  
  // Play sound when party mode is activated
  useEffect(() => {
    if (partyMode && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.log("Audio error:", e));
    }
  }, [partyMode]);
  
  // Pet interaction functions
  const petYourPet = () => {
    setHappiness(prev => Math.min(100, prev + 15));
    showPetReaction("❤️");
    
    // Set petting animation
    setPetAnimation("petting");
    setTimeout(() => setPetAnimation(null), 1000);
    
    // If it's the rubber duck, give coding advice
    if (currentPet?.type === "duck") {
      const advice = codingAdvice[Math.floor(Math.random() * codingAdvice.length)];
      setTimeout(() => {
        showPetReaction(advice);
      }, 500);
    }
  };
  
  const feedYourPet = () => {
    setHunger(prev => Math.min(100, prev + 20));
    showPetReaction("😋");
    
    // Set eating animation
    setPetAnimation("eating");
    setTimeout(() => setPetAnimation(null), 1000);
  };
  
  const showPetReaction = (message) => {
    setPetMessage(message);
    setTimeout(() => setPetMessage(null), 2000);
  };
  
  const adoptPet = (pet) => {
    setCurrentPet(pet);
    setHappiness(100);
    setHunger(100);
    setPetZooOpen(false);
    setOpen(true)
  };
  
  const togglePetZoo = () => {
    setPetZooOpen(!petZooOpen);
  };
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  
  const togglePartyMode = () => {
    setPartyMode(!partyMode);
  };
  
  const handleDownloadCV = () => {
    const cvUrl = "https://drive.google.com/file/d/1VLn1W8goDFpBS3koGNAzKFiTN-meQX2j/view?usp=sharing";
    const link = document.createElement("a");
    link.href = cvUrl;
    link.download = "my-cv.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Animation variants
  const danceAnimation = {
    dance: {
      rotate: [0, -10, 10, -10, 10, 0],
      y: [0, -5, 0, -5, 0],
      transition: { duration: 1, repeat: Infinity }
    }
  };
  
  const pulseColors = {
    pulse: {
      backgroundColor: [
        "rgb(255, 0, 128, 0.2)",
        "rgb(255, 153, 0, 0.2)",
        "rgb(0, 255, 0, 0.2)",
        "rgb(0, 128, 255, 0.2)",
        "rgb(127, 0, 255, 0.2)",
        "rgb(255, 0, 128, 0.2)",
      ],
      transition: { duration: 3, repeat: Infinity }
    }
  };
  
  const petAnimationVariants = {
    petting: {
      scale: [1, 1.2, 1],
      rotate: [0, 5, -5, 5, 0],
      transition: { duration: 0.8 }
    },
    eating: {
      y: [0, -5, 0],
      scale: [1, 1.1, 1],
      transition: { duration: 0.8 }
    },
    happy: {
      y: [0, -2, 0],
      transition: { duration: 1.5, repeat: Infinity }
    },
    sad: {
      rotate: [-3, 3, -3],
      transition: { duration: 2, repeat: Infinity }
    }
  };
  
  // Navigation links
  // Update the links array to close the sidebar on mobile when clicking
const links = [
  {
    label: "Home",
    href: "#",
    id: "home",
    onClick: () => {
      setClicked("home");
      setOpen(false); // Close sidebar on mobile
    },
    icon: <IconHome className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
  },
  {
    label: "Skills",
    href: "#",
    id: "Skills", // ID has capital S
    onClick: () => {
      setClicked("Skills"); // But here you're setting lowercase "skills"
      setOpen(false);
    },
    icon: <IconSettingsHeart className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
  },
  {
    label: "Projects",
    href: "#",
    id: "exp",
    onClick: () => {
      setClicked("project");
      setOpen(false); // Close sidebar on mobile
    },
    icon: <IconBriefcase className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
  },
  {
    label: "Experience",
    href: "#",
    id: "proj",
    onClick: () => {
      setClicked("exp");
      setOpen(false); // Close sidebar on mobile
    },
    icon: <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
  },
  {
    label: "Achievements",
    href: "#",
    id: "ach",
    onClick: () => {
      setClicked("ach");
      setOpen(false); // Close sidebar on mobile
    },
    icon: <IconTrophy className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
  },
  {
    label: "Contact Me",
    href: "#",
    id: "contact",
    onClick: () => {
      setClicked("contact");
      setOpen(false); // Close sidebar on mobile
    },
    icon: <IconMail className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
  },
  
];

  // Calculate pet mood based on happiness and hunger
  const petMood = () => {
    const average = (happiness + hunger) / 2;
    if (average < 30) return "sad";
    if (average > 70) return "happy";
    return null;
  };

  return (
    <div className={cn("flex w-full flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800", "h-screen")}>
      {/* Party mode audio */}
      <audio ref={audioRef} className="hidden">
        <source src="/party-sound.mp3" type="audio/mpeg" />
      </audio>
      
      <Sidebar 
        open={open} 
        setOpen={setOpen} 
        className={partyMode ? "relative overflow-hidden" : ""}
      >
        {/* Party mode background */}
        {partyMode && (
          <motion.div 
            className="absolute inset-0 z-0 opacity-50"
            variants={pulseColors}
            animate="pulse"
          />
        )}
        
        <SidebarBody className="justify-between gap-6">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {/* Logo */}
            {open ? (
              <Link href="#" className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black dark:text-white">
                <motion.span 
                  className="text-2xl"
                  animate={partyMode ? { rotate: [0, -10, 10, -10, 10, 0], scale: [1, 1.2, 1, 1.2, 1], transition: { duration: 1, repeat: Infinity } } : {}}
                >
                  {partyMode ? "🥳" : "👋"}
                </motion.span>
                <motion.span 
                  initial={{ opacity: 0 }} 
                  animate={{ 
                    opacity: 1,
                    ...(partyMode && { color: ["#ff0080", "#ff9900", "#00ff00", "#0080ff", "#7f00ff", "#ff0080"], transition: { duration: 3, repeat: Infinity } })
                  }} 
                  className="font-medium whitespace-pre text-black dark:text-white"
                >
                  {partyMode ? "LET'S PARTY!!!" : "Hi, it's me!!!!"}
                </motion.span>
              </Link>
            ) : (
              <Link href="#" className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black dark:text-white">
                <motion.div 
                  className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm"
                  animate={
                    partyMode 
                      ? { 
                          backgroundColor: ["#ff0080", "#ff9900", "#00ff00", "#0080ff", "#7f00ff", "#ff0080"],
                          rotate: [0, -5, 5, -5, 5, 0],
                          transition: { duration: 3, repeat: Infinity }
                        } 
                      : { backgroundColor: "currentColor" }
                  }
                />
              </Link>
            )}
            
            {/* Navigation links */}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink 
                  key={idx} 
                  link={{
                    ...link,
                    icon: partyMode ? (
                      <motion.div variants={danceAnimation} animate="dance">
                        {link.icon}
                      </motion.div>
                    ) : link.icon
                  }} 
                />
              ))}
              
              {/* Current Pet Display (when sidebar is open) */}
              {open && currentPet && (
                <div className="mt-4 border-t border-neutral-200 pt-4 dark:border-neutral-700">
                  <div className="px-3 py-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                        {petName || currentPet.type}
                      </span>
                    </div>
                    
                    <div className="flex flex-col space-y-1 mb-2">
                      {/* Happiness bar */}
                      <div className="flex items-center">
                        <span className="text-xs w-16 text-neutral-500">Happiness</span>
                        <div className="h-1.5 flex-grow bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${happiness > 70 ? 'bg-green-500' : happiness > 30 ? 'bg-yellow-500' : 'bg-red-500'}`}
                            style={{ width: `${happiness}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      {/* Hunger bar */}
                      <div className="flex items-center">
                        <span className="text-xs w-16 text-neutral-500">Fullness</span>
                        <div className="h-1.5 flex-grow bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${hunger > 70 ? 'bg-green-500' : hunger > 30 ? 'bg-yellow-500' : 'bg-red-500'}`}
                            style={{ width: `${hunger}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Pet display */}
                    <div className="relative flex items-center justify-center h-16 bg-gray-100 dark:bg-neutral-800 rounded-lg">
                      <motion.div
                        className="text-4xl cursor-pointer"
                        onClick={petYourPet}
                        animate={petAnimation || petMood()}
                        variants={petAnimationVariants}
                        whileHover={{ scale: 1.1 }}
                      >
                        {currentPet.emoji}
                      </motion.div>
                      
                      {/* Pet speech bubble */}
                      <AnimatePresence>
                        {petMessage && (
                          <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.8 }}
                            animate={{ opacity: 1, y: -30, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8, y: -40 }}
                            className={`absolute top-0 ${currentPet?.type === "duck" && petMessage.length > 2 ? 
                              'px-2 py-1 bg-yellow-100 dark:bg-yellow-900 rounded text-xs max-w-32 text-center' : 
                              'text-2xl'}`}
                          >
                            {petMessage}
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      {/* Pet interaction buttons */}
                      <div className="absolute -bottom-3 right-2 flex space-x-2">
                        <button 
                          onClick={feedYourPet}
                          className="p-1 bg-white dark:bg-neutral-700 rounded-full shadow-sm hover:shadow-md transition-shadow"
                          title="Feed pet"
                        >
                          <span className="text-lg">🍕</span>
                        </button>
                        <button 
                          onClick={petYourPet}
                          className="p-1 bg-white dark:bg-neutral-700 rounded-full shadow-sm hover:shadow-md transition-shadow"
                          title="Pet"
                        >
                          <IconHeart className="h-4 w-4 text-pink-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Download CV Option */}
              <div className="mt-4 border-t border-neutral-200 pt-4 dark:border-neutral-700">
                <SidebarLink
                  link={{
                    label: "Download CV",
                    href: "#",
                    onClick: handleDownloadCV,
                    icon: partyMode ? (
                      <motion.div variants={danceAnimation} animate="dance">
                        <IconDownload className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
                      </motion.div>
                    ) : (
                      <IconDownload className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
                    ),
                  }}
                />
              </div>
            
            
            </div>
          </div>
          
          {/* Bottom sidebar buttons */}
          <div className="flex flex-col gap-2">
            {/* Petting Zoo Button */}
            <SidebarLink
  link={{
    label: "Petting Zoo",
    href: "#",
    onClick: () => {
      togglePetZoo();
      setOpen(false); // Close sidebar on mobile
    },
    icon: partyMode ? (
      <motion.div variants={danceAnimation} animate="dance">
        <IconPaw className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      </motion.div>
    ) : (
      <IconPaw className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  }}
/>
            
            {/* Party Mode Button */}
            <SidebarLink
  link={{
    label: partyMode ? "End Party" : "Party Mode",
    href: "#",
    onClick: () => {
      togglePartyMode();
      setOpen(false); // Close sidebar on mobile
    },
    icon: partyMode ? (
      <motion.div variants={danceAnimation} animate="dance">
        <IconConfetti className="h-5 w-5 shrink-0 text-pink-500" />
      </motion.div>
    ) : (
      <IconConfetti className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  }}
/>
            {/* Dark Mode Toggle */}
            <SidebarLink
  link={{
    label: darkMode ? "Light Mode" : "Dark Mode",
    href: "#",
    onClick: () => {
      toggleDarkMode();
      setOpen(false); // Close sidebar on mobile
    },
    icon: partyMode ? (
      <motion.div variants={danceAnimation} animate="dance">
        {darkMode ? 
          <IconSun className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" /> : 
          <IconMoon className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
        }
      </motion.div>
    ) : (
      darkMode ? 
      <IconSun className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" /> : 
      <IconMoon className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  }}
/>
          </div>
        </SidebarBody>
      </Sidebar>

      {/* Pet Zoo Modal */}
      {petZooOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={(e) => {
            // Close when clicking outside the modal
            if (e.target === e.currentTarget) setPetZooOpen(false);
          }}
        >
          <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 max-w-md w-full m-4">
            <h3 className="text-xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
              {currentPet ? "Your Pet" : "Choose a Pet"}
            </h3>
            
            {currentPet ? (
              <div className="space-y-4">
                {/* Pet details and interaction */}
                <div className="flex items-center justify-center text-6xl mb-4">
                  {currentPet.emoji}
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Pet Name
                  </label>
                  <input
                    type="text"
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                    placeholder="Name your pet"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-600 rounded-md dark:bg-neutral-700 dark:text-white"
                  />
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center">
                    <span className="text-sm mr-2 w-20 text-neutral-700 dark:text-neutral-300">Happiness</span>
                    <div className="h-2 flex-grow bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${happiness > 70 ? 'bg-green-500' : happiness > 30 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${happiness}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm mr-2 w-20 text-neutral-700 dark:text-neutral-300">Fullness</span>
                    <div className="h-2 flex-grow bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${hunger > 70 ? 'bg-green-500' : hunger > 30 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${hunger}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={petYourPet}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors"
                  >
                    Pet
                  </button>
                  <button
                    onClick={feedYourPet}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-1"
                  >
                    <span>Feed</span>
                    <span className="text-lg">🍕</span>
                  </button>
                </div>
                
                <button
                  onClick={() => setCurrentPet(null)}
                  className="w-full mt-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-colors"
                >
                  Release Pet
                </button>
                
                {currentPet.type === "duck" && (
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 italic mt-4">
                    Psst... this rubber duck might give you coding advice if you pet it!
                  </p>
                )}
              </div>
            ) : (
              <div>
                <p className="mb-4 text-neutral-700 dark:text-neutral-300">
                  Choose a virtual pet to adopt and take care of!
                </p>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {availablePets.map((pet) => (
                    <button
                      key={pet.type}
                      onClick={() => adoptPet(pet)}
                      className="h-20 flex items-center justify-center text-4xl bg-gray-100 hover:bg-gray-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 rounded-lg transition-colors"
                    >
                      {pet.emoji}
                    </button>
                  ))}
                </div>
                
                <div className="text-xs text-neutral-500 dark:text-neutral-400 italic">
                  Tip: One of these pets might give you coding advice...
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main content area */}
      <div className="flex flex-1">
        <div className="flex flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
          {partyMode && (
            <motion.div 
              className="absolute inset-0 z-0 opacity-20 pointer-events-none"
              variants={pulseColors}
              animate="pulse"
            />
          )}
          <AnimatePresence mode="wait">
            {clicked === "home" && (
              <motion.div
                key="home"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative z-10"
              >
                <BackgroundLinesDemo />
              </motion.div>
            )}
            {clicked === "Skills" && ( 
  <motion.div
    key="Skills"
    initial={{ y: 50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: -50, opacity: 0 }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
    className="relative z-10"
  >
    <SkillComponent/>
  </motion.div>
)}
            {clicked === "project" && (
              <motion.div
                key="project"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative z-10"
              >
                <BentoGridThirdDemo />
              </motion.div>
            )}
            {clicked === "exp" && (
              <motion.div
                key="exp"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative z-10"
              >
                <AuroraBackgroundDemo/>
              </motion.div>
            )}
            {clicked === "ach" && (
              <motion.div
                key="ach"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative z-10"
              >
             
  <Achievement />

              </motion.div>
            )} 
            {clicked === "contact" && (
              <motion.div
                key="contact"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative z-10"
              >
                <ContactMe/>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}