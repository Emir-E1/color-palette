"use client";
import { useRef, useState, useEffect } from "react";
import { useImageContext } from "@/context/ImageContext";
import { rgbToHex } from "@/_utils/rgbToHex";
import PaletteSection from "./PaletteSection";

const DOT_SIZE = 40;

function ColorPickSection() {
  const { preview, palette } = useImageContext();

  const wrapperRef = useRef(null);
  const canvasRef = useRef(null); // canvas caché, juste pour lire les pixels
  const draggingName = useRef(null);
  const timerRef = useRef(null);

  const [positions, setPositions] = useState({});
  const [customPalette, setCustomPalette] = useState(null);

  // --- Init : dessine l'image dans le canvas caché + place les points au centre ---
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

  // --- Lit la couleur du pixel à une position % donnée ---
  const getColorAt = (xPct, yPct) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const x = Math.round((xPct / 100) * canvas.width);
    const y = Math.round((yPct / 100) * canvas.height);
    const [r, g, b] = ctx.getImageData(x, y, 1, 1).data;
    return [r, g, b];
  };

  // --- Drag handlers ---
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

    // déplacement visuel immédiat
    setPositions((prev) => ({ ...prev, [name]: { x: xPct, y: yPct } }));

    // couleur mise à jour après 1s d'inactivité (debounce)
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
    <div className="w-full flex flex-col items-center gap-8">
      {/* Image + points draggables */}
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
          onLoad={drawImageOnCanvas}
          className="block max-h-[400px] max-w-full rounded-4xl object-contain"
        />

        {Object.entries(positions).map(([name, pos]) => {
          const rgb = customPalette?.[name]?.rgb;
          if (!rgb) return null;
          return (
            <div
              key={name}
              onMouseDown={handleDown(name)}
              onTouchStart={handleDown(name)}
              className="absolute rounded-full border-2 border-white shadow-md cursor-grab"
              style={{
                width: DOT_SIZE,
                height: DOT_SIZE,
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: "translate(-50%, -50%)",
                backgroundColor: `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.85)`,
              }}
            />
          );
        })}

        <canvas ref={canvasRef} className="hidden" />
      </div>
      {customPalette && <PaletteSection palette={customPalette} />}
    </div>
  );
}

export default ColorPickSection;
