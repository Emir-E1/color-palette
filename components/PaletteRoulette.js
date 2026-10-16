const marqueeStyles = `
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
  .marquee-container:hover .animate-marquee-infinite {
    animation-duration: 55s;
  }
`;

function PaletteRoulette({ palettes }) {
  const duplicatedPalettes = palettes ? [...palettes, ...palettes] : [];

  return (
    <section className="marquee-container relative flex w-full flex-col items-center overflow-hidden py-16">
      <style>{marqueeStyles}</style>

      <div className="mb-12 px-4 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
          Community
        </p>
        <h2 className="text-4xl font-bold leading-tight text-foreground md:text-5xl">
          Fresh palettes,{" "}
          <span className="text-primary">straight from the feed</span>
        </h2>
        <p className="mx-auto mt-4 max-w-md text-base text-gray-500">
          Colors extracted from real images by people like you.
        </p>
      </div>

      {/* Fade sur les bords */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />

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

            <div className="mt-3 flex flex-wrap gap-2">
              {palette.map((color, colorIndex) => (
                <span
                  key={colorIndex}
                  className="rounded-md bg-gray-100 px-2 py-1 font-mono text-xs text-gray-600"
                >
                  {color}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PaletteRoulette;
