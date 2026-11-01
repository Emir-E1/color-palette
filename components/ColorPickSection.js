"use client";

import { useEffect, useRef, useState } from "react";
import { useImageContext } from "@/context/ImageContext";
import PaletteSection from "./PaletteSection";
import { saveCustomPalette } from "@/lib/action";

const DOT_SIZE = 40;

function ColorPickSection() {
  const { preview, palette } = useImageContext();

  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const draggingName = useRef(null);

  const [positions, setPositions] = useState({});
  const [customPalette, setCustomPalette] = useState(null);

  // Initialize canvas and sample initial colors
  useEffect(() => {
    if (!preview || !palette) return;

    setCustomPalette(null);
    setPositions({});

    const img = new Image();

    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      const entries = Object.entries(palette);

      const initialPositions = {};
      const initialPalette = {};

      entries.forEach(([name, color], index) => {
        const x =
          entries.length === 1 ? 50 : 20 + index * (60 / (entries.length - 1));

        const y = 50;

        initialPositions[name] = { x, y };

        const pixelX = Math.min(
          canvas.width - 1,
          Math.max(0, Math.floor((x / 100) * canvas.width))
        );

        const pixelY = Math.min(
          canvas.height - 1,
          Math.max(0, Math.floor((y / 100) * canvas.height))
        );

        const [r, g, b] = ctx.getImageData(pixelX, pixelY, 1, 1).data;

        initialPalette[name] = {
          ...color,
          rgb: [r, g, b],
        };
      });

      setPositions(initialPositions);
      setCustomPalette(initialPalette);
    };

    img.src = preview;

    return () => {
      img.onload = null;
    };
  }, [preview, palette]);

  // Convert pointer coordinates to image percentages
  const getCoordinates = (clientX, clientY) => {
    const rect = wrapperRef.current?.getBoundingClientRect();

    if (!rect) return null;

    return {
      x: Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)),
      y: Math.min(100, Math.max(0, ((clientY - rect.top) / rect.height) * 100)),
    };
  };

  // Update position without sampling while dragging
  const moveDot = (name, clientX, clientY) => {
    const coordinates = getCoordinates(clientX, clientY);

    if (!coordinates) return;

    setPositions((previous) => ({
      ...previous,
      [name]: coordinates,
    }));
  };

  // Sample the exact pixel under the dot
  const sampleColor = (name, clientX, clientY) => {
    const coordinates = getCoordinates(clientX, clientY);
    const canvas = canvasRef.current;

    if (!coordinates || !canvas) return;

    const ctx = canvas.getContext("2d");

    const pixelX = Math.min(
      canvas.width - 1,
      Math.max(0, Math.floor((coordinates.x / 100) * canvas.width))
    );

    const pixelY = Math.min(
      canvas.height - 1,
      Math.max(0, Math.floor((coordinates.y / 100) * canvas.height))
    );

    const [r, g, b] = ctx.getImageData(pixelX, pixelY, 1, 1).data;

    setPositions((previous) => ({
      ...previous,
      [name]: coordinates,
    }));

    setCustomPalette((previous) => ({
      ...previous,
      [name]: {
        ...previous[name],
        rgb: [r, g, b],
      },
    }));
  };

  // Start dragging
  const handlePointerDown = (name) => (event) => {
    event.preventDefault();

    draggingName.current = name;

    event.currentTarget.setPointerCapture(event.pointerId);

    moveDot(name, event.clientX, event.clientY);
  };

  // Move the dot without sampling
  const handlePointerMove = (event) => {
    const name = draggingName.current;

    if (!name) return;

    moveDot(name, event.clientX, event.clientY);
  };

  // Sample only when the user releases the dot
  const handlePointerUp = (event) => {
    const name = draggingName.current;

    if (!name) return;

    sampleColor(name, event.clientX, event.clientY);

    draggingName.current = null;
  };

  const handlePointerCancel = () => {
    draggingName.current = null;
  };

  // Save custom palette. PaletteSection handles favorites.
  const handleSavePalette = async () => {
    if (!customPalette) {
      return {
        success: false,
        error: "No palette available.",
      };
    }

    return await saveCustomPalette(customPalette);
  };

  if (!preview || !palette) return null;

  // Reset PaletteSection when the picked colors change
  const paletteKey = customPalette
    ? Object.values(customPalette)
        .map(({ rgb }) => rgb.join(","))
        .join("|")
    : "empty";

  return (
    <section className="flex flex-col gap-8 rounded-3xl border border-stone-200 bg-white p-5 shadow-sm md:p-8">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">
          2. Pick colors by hand
        </h2>

        <p className="mt-1 text-sm text-stone-500">
          Drag the dots over your image to pick your own colors.
        </p>
      </div>

      <div className="flex w-full justify-center rounded-2xl bg-stone-100 p-3 md:p-6">
        <div
          ref={wrapperRef}
          className="relative inline-block select-none"
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
        >
          <img
            src={preview}
            alt="Image used to pick colors"
            draggable={false}
            className="pointer-events-none block max-h-[420px] max-w-full rounded-xl object-contain"
          />

          {Object.entries(positions).map(([name, position]) => {
            const rgb = customPalette?.[name]?.rgb;

            if (!rgb) return null;

            return (
              <div
                key={name}
                onPointerDown={handlePointerDown(name)}
                className="absolute cursor-grab touch-none rounded-full border-[3px] border-white shadow-lg ring-1 ring-black/20 transition-transform hover:scale-110 active:cursor-grabbing active:scale-125"
                style={{
                  width: DOT_SIZE,
                  height: DOT_SIZE,
                  left: `${position.x}%`,
                  top: `${position.y}%`,
                  transform: "translate(-50%, -50%)",
                  backgroundColor: `rgb(${rgb.join(",")})`,
                }}
              />
            );
          })}

          <canvas ref={canvasRef} className="hidden" />
        </div>
      </div>

      {customPalette && (
        <div className="border-t border-stone-200 pt-8">
          <PaletteSection
            key={paletteKey}
            palette={customPalette}
            title="Your picked palette"
            showFavorite={true}
            onSavePalette={handleSavePalette}
          />
        </div>
      )}
    </section>
  );
}

export default ColorPickSection;
