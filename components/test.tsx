"use client";

import { useEffect, useState } from "react";

export function Test({
  type = "sheet",

  // For sprite sheet
  url,
  sheetWidth,
  sheetHeight,
  columns,
  rows,
  c = 1,

  // For multiple PNGs
  frames = [],

  scale = 1,
  startFrame = 0,
  numberOfFrames,
  row = 0,
  playing = false,
}) {
  const [curr, setCurr] = useState(startFrame);

  // --------------------------------
  // Calculate sprite-sheet dimensions
  // --------------------------------

  const frameWidth =
    type === "sheet" ? sheetWidth / columns : 32;

  const frameHeight =
    type === "sheet" ? sheetHeight / rows : 32;

  const totalFrames =
    type === "sheet"
      ? numberOfFrames
      : frames.length;

  // --------------------------------
  // Reset animation
  // --------------------------------

  useEffect(() => {
    setCurr(startFrame);
  }, [startFrame]);

  // --------------------------------
  // Animation
  // --------------------------------

  useEffect(() => {
    if (!playing) return;

    const interval = setInterval(() => {
      setCurr((prev) => {
        if (prev >= startFrame + totalFrames - 1) {
          return startFrame;
        }

        return prev + 1;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [playing, startFrame, totalFrames]);

  // --------------------------------
  // Multiple PNG mode
  // --------------------------------

  if (type === "frames") {
    return (
      <img
        src={frames[curr]}
        alt=""
        style={{
          width: frameWidth * scale * c ,
          height: frameHeight * scale ,
          imageRendering: "pixelated",
        }}
      />
    );
  }

  // --------------------------------
  // Sprite sheet mode
  // --------------------------------

  return (
    <div
      style={{
        width: frameWidth * scale,
        height: frameHeight * scale,

        backgroundImage: `url('${url}')`,

        backgroundSize: `
          ${sheetWidth * scale}px
          ${sheetHeight * scale}px
        `,

        backgroundPosition: `
          -${curr * frameWidth * scale}px
          -${row * frameHeight * scale}px
        `,

        backgroundRepeat: "no-repeat",

        imageRendering: "pixelated",
      }}
    />
  );
}