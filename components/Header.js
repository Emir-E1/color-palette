import { CloudUpload, Sun } from "lucide-react";
import { SidebarTrigger } from "./ui/sidebar";

function Header() {
  return (
    <header className="flex w-full p-4 items-center justify-between border-b-1 shadow-2xs border-b-secondary/10">
      <SidebarTrigger />
      <div className="flex gap-4 items-center ">
        <Sun />
        <button className="px-2 py-2 md:px-3 md:py-2 bg-primary/15 rounded-2xl flex gap-2 md:gap-4 items-center ">
          <CloudUpload color="#d32d5a" />
          <p className="text-primary "> Upload Image</p>
        </button>
      </div>
    </header>
  );
}

export default Header;
