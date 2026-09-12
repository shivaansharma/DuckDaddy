"use client";

import { motion } from "framer-motion";

const exp = [
  {
    company: "Freelance Software Engineer",
    post: "Self-Employed",
    timeLine: "June 2026 - September 2026",
    description: [
      "Designed and deployed a custom, AI-powered ERP system ",
      "Implemented tracking for 100+ acres, 20+ livestock, 50+ workers, and 100L+ daily milk distribution",
      "contributing to ₹10 Lakhs in reported savings.",
    ],
    url: "testUrl",
  },
  {
    company: "Digitalis Tech Pvt. Ltd.",
    post: "Software Engineer Intern",
    timeLine: "January 2026 - April 2026",
    description: [
      "Developed and maintained full-stack web applications.",
      "Built responsive interfaces using React and Next.js.",
      "Integrated APIs and optimized application performance.",
    ],
    url: "testUrl",
  },
  {
    company: "Template Farm",
    post: "Summer Intern",
    timeLine: "April 2025 - June 2025",
    description: [
      "Developed and deployed full-stack web applications.",
      "Built responsive UI components using React and modern web technologies.",
      "Worked on APIs, databases, and application optimization.",
    ],
    url: "testUrl",
  },
  {
    company: "Indian Institute of Technology",
    post: "Research Intern",
    timeLine: "January 2025 - March 2025",
    description: [
      "Conducted research and analyzed technical data.",
      "Implemented and tested solutions for research problems.",
      "Documented findings and presented technical results.",
    ],
    url: "testUrl",
  },
  {
    company: "TBI - Gehu",
    post: "Full Stack Developer Intern",
    timeLine: "July 2024 - October 2024",
    description: [
      "Developed full-stack web applications and backend services.",
      "Built responsive interfaces and integrated REST APIs.",
      "Worked with databases and optimized application performance.",
    ],
    url: "testUrl",
  },
];

function FilmGrain() {
  return (
    <div
      
    />
  );
}

function Divider() {
  return (
    <div className="flex items-center justify-center gap-4 my-2 text-[#e8dcb8]/70">
      <span className="h-[1px] w-16 bg-current" />
      <span className="text-xl leading-none">★</span>
      <span className="h-[1px] w-16 bg-current" />
    </div>
  );
}

export function TestExp({ font }: { font: any }) {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center px-4 py-24 overflow-hidden">
      <FilmGrain />

      <div className="w-full max-w-3xl relative z-10 text-center">
        {/* SECTION TITLE */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`
            text-5xl md:text-6xl
            text-[#f5ecd8]
            ${font.className}
            uppercase
            tracking-widest
            mb-16
            drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]
          `}
        >
          Experience
        </motion.h2>

        <div className="space-y-16">
          {exp.map((item, itr) => (
            <motion.div
              key={itr}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              {/* Role, credits-style: "STARRING" line */}
              <p className="text-base md:text-lg uppercase tracking-[0.35em] text-[#f5ecd8]/90 font-medium mb-2">
                {item.post}
              </p>

              {/* Company as the "name" */}
              <h4
                className={`
                  text-3xl md:text-4xl
                  text-white
                  ${font.className}
                  uppercase
                  tracking-wide
                  mb-2
                  drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]
                `}
              >
                {item.company}
              </h4>

              {/* Timeline, subtitle style */}
              <p className="text-sm md:text-base uppercase tracking-[0.2em] text-[#f5ecd8]/75 mb-6">
                {item.timeLine}
              </p>

              {/* Description, like scrolling credit notes */}
              <div className="space-y-2 max-w-xl mx-auto">
                {item.description.map((point, i) => (
                  <p
                    key={i}
                    className="text-base md:text-lg text-[#f5ecd8]/95 leading-relaxed"
                  >
                    {point}
                  </p>
                ))}
              </div>

              {itr < exp.length - 1 && <Divider />}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}