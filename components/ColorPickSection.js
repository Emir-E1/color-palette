"use client";
import { useRef, useState, useEffect } from "react";
import { useImageContext } from "@/context/ImageContext";
import PaletteSection from "./PaletteSection";

const DOT_SIZE = 40;

function ColorPickSection() {
  const { preview, palette } = useImageContext();

  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const draggingName = useRef(null);
  const timerRef = useRef(null);

  const [positions, setPositions] = useState({});
  const [customPalette, setCustomPalette] = useState(null);

  useEffect(() => {
    if (!palette) return;
    setCustomPalette(palette);

    const initial = {};
    Object.keys(palette).forEach((name, i) => {
      initial[name] = { x: 20 + i * 15, y: 50 };
    });
    setPositions(initial);
  }, [palette]);

  const drawImageOnCanvas = () => {
    const img = wrapperRef.current.querySelector("img");
    const canvas = canvasRef.current;
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    canvas.getContext("2d").drawImage(img, 0, 0);
  };

  const getColorAt = (xPct, yPct) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const x = Math.round((xPct / 100) * canvas.width);
    const y = Math.round((yPct / 100) * canvas.height);
    const [r, g, b] = ctx.getImageData(x, y, 1, 1).data;
    return [r, g, b];
  };

  const handleDown = (name) => (e) => {
    e.preventDefault();
    draggingName.current = name;
  };

  const handleMove = (e) => {
    const name = draggingName.current;
    if (!name) return;

    const rect = wrapperRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    let xPct = ((clientX - rect.left) / rect.width) * 100;
    let yPct = ((clientY - rect.top) / rect.height) * 100;
    xPct = Math.min(100, Math.max(0, xPct));
    yPct = Math.min(100, Math.max(0, yPct));

    setPositions((prev) => ({ ...prev, [name]: { x: xPct, y: yPct } }));

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      const rgb = getColorAt(xPct, yPct);
      setCustomPalette((prev) => ({ ...prev, [name]: { ...prev[name], rgb } }));
    }, 500);
  };

  const handleUp = () => {
    draggingName.current = null;
  };

  if (!palette) return null;

  return (
    <section className="flex flex-col gap-8 rounded-3xl border border-stone-200 bg-white p-5 shadow-sm md:p-8">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold tracking-tight">
          2. Pick colors by hand
        </h2>
        <p className="text-sm text-stone-500">
          Drag the dots over your image. Each dot samples the color underneath
          it.
        </p>
      </div>

      <div className="flex w-full justify-center rounded-2xl bg-stone-100 p-3 md:p-6">
        <div
          ref={wrapperRef}
          className="relative inline-block select-none"
          onMouseMove={handleMove}
          onMouseUp={handleUp}
          onMouseLeave={handleUp}
          onTouchMove={handleMove}
          onTouchEnd={handleUp}
        >
          <img
            src={preview}
            alt="Uploaded image to sample colors from"
            onLoad={drawImageOnCanvas}
            className="block max-h-[420px] max-w-full rounded-xl object-contain"
          />

          {Object.entries(positions).map(([name, pos]) => {
            const rgb = customPalette?.[name]?.rgb;
            if (!rgb) return null;
            return (
              <div
                key={name}
                onMouseDown={handleDown(name)}
                onTouchStart={handleDown(name)}
                className="absolute cursor-grab touch-none rounded-full border-[3px] border-white shadow-lg ring-1 ring-black/20 transition-transform hover:scale-110 active:cursor-grabbing active:scale-125"
                style={{
                  width: DOT_SIZE,
                  height: DOT_SIZE,
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: "translate(-50%, -50%)",
                  backgroundColor: `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`,
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
            palette={customPalette}
            title="Your picked palette"
            showFavorite={false}
          />
        </div>
      )}
    </section>
  );
}

export default ColorPickSection;
