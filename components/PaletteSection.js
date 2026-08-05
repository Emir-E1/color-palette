function PaletteSection({ palette }) {
  if (!palette) return null;
  console.log(palette); // ← juste ça, pour voir toute la structure
  return (
    <div className="flex flex-wrap gap-3 p-4">
      {Object.entries(palette).map(([name, swatch]) => {
        const [r, g, b] = swatch.rgb;
        return (
          <div
            key={name}
            className="w-24 h-24 rounded-xl flex items-end p-2"
            style={{ backgroundColor: `rgb(${r}, ${g}, ${b})` }}
          >
            <span className="text-xs text-white bg-black/40 px-1 rounded">
              {name}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default PaletteSection;
