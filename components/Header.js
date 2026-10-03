import { CloudUpload, Sun } from "lucide-react";
import { SidebarTrigger } from "./ui/sidebar";

function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-stone-200 bg-white px-4 md:px-8">
      <SidebarTrigger />

      <div className="flex items-center gap-4">
        <div className="rounded-xl border border-stone-300 px-4 py-2 hover:bg-stone-50">
          <Sun size={20} className="text-stone-600 " />
        </div>
        <button className="flex items-center gap-2 rounded-xl border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50">
          <CloudUpload size={18} className="text-primary" />
          Upload image
        </button>
      </div>
    </header>
  );
}

export default Header;
