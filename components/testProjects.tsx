"use client";

import { motion } from "framer-motion";

const proj = [
  {
    projectName: "BabuLang",
    year: "2023",
    status: "Personal Project",
    projectDes:
      "My implementation of a recursive descent parser from scratch — a small compiler front-end handling tokenization, grammar rules, and syntax tree generation without any external parsing libraries.",
    tools: ["C++", "CMake"],
  },
  {
    projectName: "Micky Farms",
    year: "2026",
    status: "Client Work",
    projectDes:
      "An advanced, enterprise-grade Agricultural Resource Planning (ERP) platform built on the Frappe Framework — tracking land, livestock, labor, and daily produce across a working farm operation.",
    tools: ["Frappe", "ERPNext", "SQL", "MariaDB", "JavaScript"],
  },
  {
    projectName: "Neural Net From Scratch",
    year: "2024",
    status: "Learning Project",
    projectDes:
      "A basic implementation of a deep neural network built without ML frameworks, trainable on the MNIST dataset — covering forward pass, backpropagation, and gradient descent by hand.",
    tools: ["Python", "Math", "Pandas", "NumPy"],
  },
  {
    projectName: "Red Light, Green Light",
    year: "2023",
    status: "Game Jam",
    projectDes:
      "A fun body-pose recognition game inspired by Squid Game — players freeze on cue and the webcam tracks movement in real time to catch anyone who moves too soon.",
    tools: ["JavaScript", "ML", "p5.js", "ml5.js"],
  },
];

function CornerMarks() {
  return (
    <>
      <span className="absolute top-2 left-2 text-[#e8dcb8]/50 text-sm">✦</span>
      <span className="absolute top-2 right-2 text-[#e8dcb8]/50 text-sm">✦</span>
      <span className="absolute bottom-2 left-2 text-[#e8dcb8]/50 text-sm">✦</span>
      <span className="absolute bottom-2 right-2 text-[#e8dcb8]/50 text-sm">✦</span>
    </>
  );
}

export function TestProjects({ font }) {
  return (
    <section className="min-h-screen w-full flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-full max-w-6xl"
      >
        <h3
          className={`text-4xl md:text-6xl text-[#f5ecd8] ${font.className} uppercase text-center mb-2 tracking-wider drop-shadow-md`}
        >
          Projects
        </h3>
        <p className="text-center text-[#e8dcb8]/70 font-mono text-sm tracking-[0.3em] uppercase mb-12">
          Wanted for outstanding work
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {proj.map((item, itr) => (
            <motion.div
              key={itr}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: itr * 0.05 }}
              className="relative backdrop-blur-md border-2 border-dashed border-[#e8dcb8]/40 p-6 rounded-sm hover:border-[#d95a41] transition-colors group"
            >
              <CornerMarks />

              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#e8dcb8]/60">
                  File No. {String(itr + 1).padStart(2, "0")}
                </span>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#d95a41]/80">
                  {item.year} · {item.status}
                </span>
              </div>

              <h4
                className={`text-2xl md:text-3xl text-white mb-3 ${font.className} tracking-wide group-hover:text-[#d95a41] transition-colors`}
              >
                {item.projectName}
              </h4>

              <div className="h-[1px] w-full bg-[#e8dcb8]/20 mb-4" />

              <p className="text-[#f5ecd8]/90 mb-5 text-base leading-relaxed">
                {item.projectDes}
              </p>

              <div className="flex flex-wrap gap-2 text-xs font-mono font-bold text-[#f5ecd8]">
                {item.tools.map((t, i) => (
                  <span
                    key={i}
                    className="bg-[#d95a41]/15 border border-[#d95a41]/30 px-2 py-1 rounded-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}