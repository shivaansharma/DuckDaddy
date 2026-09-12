"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface TestContactProps {
  font: {
    className: string;
  };
}

export function TestContact({ font }: TestContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/mailSender", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        console.error("Mail API error:", data);

        throw new Error(
          data?.error ||
            data?.message ||
            `Failed to send message (${response.status})`
        );
      }

      setSubmitted(true);

      setFormData({
        name: "",
        email: "",
        message: "",
      });

      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } catch (err) {
      console.error("Error sending email:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while sending the telegram."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/shivaansharma",
      icon: "GH",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/shivaan-sharma-2b7797168/",
      icon: "IN",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/shivaansharma/",
      icon: "IG",
    },
    {
      name: "LeetCode",
      url: "https://leetcode.com/shivaansharma",
      icon: "LC",
    },
  ];

  return (
    <section className="relative min-h-[95vh] w-full flex items-center justify-center px-4 py-24 overflow-hidden">
      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="w-full max-w-6xl relative z-10">

        {/* ================= TITLE ================= */}

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-4"
        >
          <p className="text-[#e8dcb8]/60 font-mono text-xs md:text-sm tracking-[0.4em] uppercase mb-3">
            Western Union · Frontier Line
          </p>

          <h3
            className={`text-4xl md:text-6xl text-[#f5ecd8] ${font.className} uppercase tracking-widest mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]`}
          >
            Send a Telegram
          </h3>

          <div className="flex items-center justify-center gap-4 mb-14">
            <span className="h-px w-24 bg-[#e8dcb8]/30" />

            <span className="text-[#d95a41] text-lg">
              ✦
            </span>

            <span className="h-px w-24 bg-[#e8dcb8]/30" />
          </div>
        </motion.div>

        {/* ================= CONTENT ================= */}

        <div className="grid md:grid-cols-2 gap-10 items-start">

          {/* ================= TELEGRAM ================= */}

          <motion.div
            initial={{ opacity: 0, x: -30, rotate: -1.5 }}
            whileInView={{ opacity: 1, x: 0, rotate: -1.5 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative"
          >

            {/* POSTAGE STAMP */}

            <div className="absolute -top-4 -right-4 z-20 w-16 h-20 bg-[#e8dcb8]/80 border-2 border-[#5c4033]/70 rotate-6 flex flex-col items-center justify-center shadow-[0_6px_12px_rgba(0,0,0,0.4)]">

              <span className="text-[#5c4033]/70 text-[9px] font-mono uppercase tracking-widest">
                Postage
              </span>

              <span className="text-[#d95a41]/70 text-xl">
                ★
              </span>

              <span className="text-[#5c4033]/70 text-[9px] font-mono">
                10¢
              </span>

              <div className="absolute inset-0 border border-dashed border-[#5c4033]/40 m-[3px]" />
            </div>

            {/* ================= PAPER ================= */}

            <div
              className="
                bg-[#e8dcb8]/90
                border-4 border-[#5c4033]/70
                rounded-sm
                p-8 md:p-10
                shadow-[0_20px_50px_rgba(0,0,0,0.55)]
                relative
              "
              style={{
                clipPath:
                  "polygon(0% 1%, 2% 0%, 98% 0%, 100% 2%, 100% 98%, 99% 100%, 1% 100%, 0% 99%)",
              }}
            >

              {/* ================= HEADER ================= */}

              <div className="flex items-center justify-between mb-6 border-b-2 border-dashed border-[#5c4033]/25 pb-4">

                <span className="font-mono text-[10px] uppercase tracking-widest text-[#5c4033]/60">
                  No. 001-A
                </span>

                <span className="font-mono text-[10px] uppercase tracking-widest text-[#d95a41]/65 font-bold border border-[#d95a41]/45 px-2 py-0.5 -rotate-3">
                  Priority
                </span>

              </div>

              {/* ================= INTRO ================= */}

              <p className="text-[#5c4033]/60 text-center font-mono mb-8 font-bold tracking-wide">
                Looking to form a posse? Drop me a line.
              </p>

              {/* ================= SUCCESS ================= */}

              {submitted ? (

                <div className="py-12 text-center">

                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-[#2a1a11]/70 text-3xl text-[#2a1a11]/70 mb-4 -rotate-6">
                    ✓
                  </div>

                  <h3
                    className={`text-3xl ${font.className} text-[#2a1a11]/80 uppercase mb-3`}
                  >
                    Telegram Sent!
                  </h3>

                  <p className="font-mono font-bold text-[#5c4033]/70">
                    Your message is on its way, stranger.
                  </p>

                </div>

              ) : (

                /* ================= FORM ================= */

                <form
                  className="space-y-4 font-mono"
                  onSubmit={handleSubmit}
                >

                  {/* NAME */}

                  <div>

                    <label
                      htmlFor="name"
                      className="block text-[#2a1a11]/65 text-sm font-bold mb-1"
                    >
                      Your Name, Stranger
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="
                        w-full
                        bg-transparent
                        border-b-2
                        border-[#5c4033]/45
                        focus:outline-none
                        focus:border-[#d95a41]/70
                        p-2
                        text-[#2a1a11]/70
                        font-bold
                        placeholder:text-[#5c4033]/35
                        transition-colors
                      "
                    />

                  </div>

                  {/* EMAIL */}

                  <div>

                    <label
                      htmlFor="email"
                      className="block text-[#2a1a11]/65 text-sm font-bold mb-1"
                    >
                      Return Address (Email)
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@saloon.com"
                      required
                      className="
                        w-full
                        bg-transparent
                        border-b-2
                        border-[#5c4033]/45
                        focus:outline-none
                        focus:border-[#d95a41]/70
                        p-2
                        text-[#2a1a11]/70
                        font-bold
                        placeholder:text-[#5c4033]/35
                        transition-colors
                      "
                    />

                  </div>

                  {/* MESSAGE */}

                  <div>

                    <label
                      htmlFor="message"
                      className="block text-[#2a1a11]/65 text-sm font-bold mb-1"
                    >
                      The Message
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="State your business..."
                      rows={4}
                      required
                      className="
                        w-full
                        bg-transparent
                        border-b-2
                        border-[#5c4033]/45
                        focus:outline-none
                        focus:border-[#d95a41]/70
                        p-2
                        text-[#2a1a11]/70
                        font-bold
                        placeholder:text-[#5c4033]/35
                        resize-none
                        transition-colors
                      "
                    />

                  </div>

                  {/* ERROR */}

                  {error && (
                    <div className="bg-[#d95a41]/15 border border-[#d95a41]/60 p-3 text-[#2a1a11]/80 text-sm font-bold">
                      {error}
                    </div>
                  )}

                  {/* ================= FIRE AWAY ================= */}

                  <div className="pt-2 flex justify-center">

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`
                        relative
                        w-40
                        h-40
                        rounded-full
                        bg-[#7a1f1f]/90
                        hover:bg-[#8f2626]
                        text-[#f5ecd8]
                        border-4
                        border-[#5c1414]/80
                        shadow-[0_10px_25px_rgba(0,0,0,0.5),inset_0_2px_6px_rgba(0,0,0,0.4)]
                        transition-all
                        disabled:opacity-60
                        disabled:cursor-not-allowed
                        flex
                        flex-col
                        items-center
                        justify-center
                        ${font.className}
                      `}
                    >

                      <span className="text-2xl uppercase tracking-widest">
                        {isSubmitting ? "..." : "Fire"}
                      </span>

                      <span className="text-2xl uppercase tracking-widest -mt-1">
                        {isSubmitting ? "" : "Away"}
                      </span>

                      <span className="absolute inset-2 rounded-full border border-[#f5ecd8]/30" />

                    </button>

                  </div>

                </form>
              )}

            </div>
          </motion.div>

          {/* ================= RIGHT COLUMN ================= */}

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >

            {/* ================= SOCIAL LINKS ================= */}

            <div className="relative bg-[#1a0f0a]/70 backdrop-blur-sm border-2 border-dashed border-[#e8dcb8]/40 rounded-sm p-6 md:p-8">

              <span className="absolute -top-1 -left-1 text-[#e8dcb8]/40 text-xs">
                ✦
              </span>

              <span className="absolute -top-1 -right-1 text-[#e8dcb8]/40 text-xs">
                ✦
              </span>

              <span className="absolute -bottom-1 -left-1 text-[#e8dcb8]/40 text-xs">
                ✦
              </span>

              <span className="absolute -bottom-1 -right-1 text-[#e8dcb8]/40 text-xs">
                ✦
              </span>

              <h4
                className={`text-2xl ${font.className} text-[#f5ecd8] uppercase tracking-wide mb-6 text-center`}
              >
                Track Me Down
              </h4>

              <div className="grid grid-cols-2 gap-4">

                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      group
                      relative
                      flex
                      flex-col
                      items-center
                      justify-center
                      gap-2
                      p-4
                      bg-[#e8dcb8]/85
                      border-2
                      border-[#5c4033]/60
                      hover:border-[#d95a41]
                      transition-colors
                    "
                    style={{
                      clipPath:
                        "polygon(6% 0%, 94% 0%, 100% 6%, 100% 94%, 94% 100%, 6% 100%, 0% 94%, 0% 6%)",
                    }}
                  >

                    <span className="absolute inset-[3px] border border-dashed border-[#5c4033]/30 pointer-events-none" />

                    <span className="text-[#2a1a11]/70 font-bold text-2xl group-hover:text-[#d95a41] transition-colors">
                      {link.icon}
                    </span>

                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#5c4033]/65">
                      {link.name}
                    </span>

                  </a>
                ))}

              </div>
            </div>

            {/* ================= QUICK RESPONSE ================= */}

            <div className="relative bg-[#1a0f0a]/70 backdrop-blur-sm border-2 border-dashed border-[#e8dcb8]/40 rounded-sm p-6 md:p-8">

              <span className="absolute -top-1 -left-1 text-[#e8dcb8]/40 text-xs">
                ✦
              </span>

              <span className="absolute -top-1 -right-1 text-[#e8dcb8]/40 text-xs">
                ✦
              </span>

              <span className="absolute -bottom-1 -left-1 text-[#e8dcb8]/40 text-xs">
                ✦
              </span>

              <span className="absolute -bottom-1 -right-1 text-[#e8dcb8]/40 text-xs">
                ✦
              </span>

              <h4
                className={`text-xl ${font.className} text-[#f5ecd8] uppercase tracking-wide mb-3`}
              >
                Word Travels Fast
              </h4>

              <p className="text-[#e8dcb8]/70 font-mono text-sm leading-relaxed mb-4">
                Most telegrams get a reply within 24 hours. For urgent
                business, ride straight to my inbox.
              </p>

              <div className="flex items-center gap-2 text-sm font-mono text-[#d95a41]/80">

                <span>
                  ◆
                </span>

                <span className="uppercase tracking-wide text-xs">
                  Open for freelance work
                </span>

              </div>

            </div>

            {/* ================= MORSE ================= */}

            <div className="text-center font-mono text-[10px] tracking-[0.3em] text-[#e8dcb8]/30 uppercase">
              ·−·· ···· ·−· −− ·−· ··· −−−−−− ·− ·− ·−· −− ·−
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}