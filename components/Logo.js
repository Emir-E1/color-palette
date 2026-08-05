import Image from "next/image";
import Icon from "@/public/assets/Logo.png";

function Logo() {
  return (
    <div className="relative h-20 w-20 shrink-0">
      <Image src={Icon} alt="Logo" fill className="object-contain" />
    </div>
  );
}

export default Logo;
