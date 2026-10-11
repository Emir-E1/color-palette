import PaletteSection from "./PaletteSection";

function PaletteRoulette({ palettes }) {
  //GET THE MAX 10 HISTORY OF RANDOM USER
  //STOCK THEM
  //PASS THEM IN THE ROULETTE MENU DASHBOARD
  console.log(palettes);

  return (
    <>
      {palettes ??
        palettes.map((e) => <div key={e} className="p-4 rounded-4x"></div>)}
    </>
  );
}
export default PaletteRoulette;
