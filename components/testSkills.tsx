"use client";

import { motion } from "framer-motion";

const skillGroups = [
  {
    label: "Languages",
    skills: ["JavaScript", "TypeScript", "Python", "C++", "SQL"],
  },
  {
    label: "Frameworks & Runtime",
    skills: ["React.js", "Next.js", "Node.js", "Frappe", "ERPNext", "Godot"],
  },
  {
    label: "Data & Infra",
    skills: ["PostgreSQL", "MariaDB", "Redis", "Docker"],
  },
  {
    label: "Tools & Craft",
    skills: ["Framer Motion", "Tailwind CSS", "Git", "Duck Taming"],
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const badge = {
  hidden: { opacity: 0, y: 10, rotate: -2 },
  show: { opacity: 1, y: 0, rotate: 0 },
};

function GrainOverlay() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 opacity-[0.06] mix-blend-overlay"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />
  );
}

export function TestSkills({ font }) {
  return (
    <section className="relative min-h-[80vh] w-full flex items-center justify-center px-4 py-24 overflow-hidden">
      <GrainOverlay />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="w-full max-w-5xl text-center relative z-10"
      >
        <h3
          className={`text-4xl md:text-6xl text-[#d95a41] ${font.className} uppercase mb-3 tracking-wider drop-shadow-[0_2px_0_rgba(0,0,0,0.6)]`}
        >
          Skills
        </h3>
        <p className="text-[#e8dcb8]/70 font-mono text-sm tracking-[0.35em] uppercase mb-4">
          Inventory manifest
        </p>
        <div className="flex items-center justify-center gap-4 mb-16">
          <span className="h-[2px] w-24 bg-[#e8dcb8]/30" />
          <span className="text-[#e8dcb8]/50 text-lg">✦</span>
          <span className="h-[2px] w-24 bg-[#e8dcb8]/30" />
        </div>

        <div className="space-y-14">
          {skillGroups.map((group) => (
            <div key={group.label} className="text-left max-w-3xl mx-auto">
              <div className="flex items-baseline gap-3 mb-5 border-b border-dashed border-[#e8dcb8]/30 pb-2">
                <span className="text-[#d95a41] font-mono text-sm">§</span>
                <h4 className="text-sm md:text-base font-mono uppercase tracking-[0.3em] text-[#f5ecd8]">
                  {group.label}
                </h4>
              </div>

              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                className="flex flex-wrap gap-3"
              >
                {group.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    variants={badge}
                    whileHover={{
                      scale: 1.05,
                      rotate: 0,
                      backgroundColor: "rgba(217,90,65,0.18)",
                    }}
                    className="relative text-[#f5ecd8] font-mono text-sm md:text-base uppercase tracking-wide bg-[#1a0f0a]/70 border-2 border-dashed border-[#e8dcb8]/40 px-4 py-2 -rotate-1 cursor-default"
                  >
                    <span className="absolute -top-1 -left-1 text-[#e8dcb8]/40 text-[10px]">✦</span>
                    {skill}
                    <span className="absolute -bottom-1 -right-1 text-[#e8dcb8]/40 text-[10px]">✦</span>
                  </motion.span>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}