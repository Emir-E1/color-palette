function PaletteRoulette({ palettes }) {
  const duplicatedPalettes = palettes ? [...palettes, ...palettes] : [];

  return (
    <div className="w-full overflow-hidden  relative">
      <style>{`
        @keyframes marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .animate-marquee-infinite {
          display: flex;
          width: max-content;
          animation: marquee 30s linear infinite;
          will-change: transform;
        }
        /* Smooth hover slowdown using a CSS variable approach to prevent snapping */
        .marquee-container:hover .animate-marquee-infinite {
          animation-duration: 55s;
        }
      `}</style>

      <div className="flex gap-5 animate-marquee-infinite w-max">
        {duplicatedPalettes.map((palette, paletteIndex) => (
          <div
            key={paletteIndex}
            className="w-80 shrink-0 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
          >
            <div className="flex h-32 overflow-hidden rounded-xl">
              {palette.map((color, colorIndex) => (
                <div
                  key={colorIndex}
                  className="flex-1"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>

            <div className="mt-4">
              <p className="text-xs text-gray-500">Auto-scrolling roulette</p>

              <div className="mt-3 flex flex-wrap gap-2">
                {palette.map((color, colorIndex) => (
                  <span
                    key={colorIndex}
                    className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-600 font-mono"
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PaletteRoulette;
