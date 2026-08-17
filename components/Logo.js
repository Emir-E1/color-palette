import Image from "next/image";
import Icon from "@/public/assets/Logo_2.png";

function Logo() {
  return (
    <div className="relative h-10 w-10 shrink-0 ">
      <Image
        src={Icon}
        alt="Logo"
        fill
        className="object-contain bg-transparent "
      />
    </div>
  );
}

export default Logo;
