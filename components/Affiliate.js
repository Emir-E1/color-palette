import { Apple } from "lucide-react";

function Affiliate() {
  return (
    <div className="w-full flex items-center flex-col gap-6 ">
      <div className="flex w-full justify-center">
        <div className="flex max-w-2xl flex-col gap-5 text-center">
          <h2 className="font-bold leading-tight text-foreground">
            Trusted by many <span className="text-primary">Creatives</span> and
            Teams worldwide
          </h2>

          <p className="text-body leading-relaxed text-secondary">
            See what our users have to say about palettes.
          </p>
        </div>
      </div>
      <div className="flex justify-center gap-10">
        <Apple />
        <Apple />
        <Apple />
        <Apple />
      </div>
    </div>
  );
}

export default Affiliate;
