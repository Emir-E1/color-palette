"use client";
import { Upload } from "lucide-react";
import { useRef } from "react";

function Uploader({ onUpload }) {
  const inputRef = useRef(null);

  function handleUpload(e) {
    if (e.target.files && e.target.files.length > 0) {
      onUpload(e.target.files[0]);
    }
  }

  return (
    <button
      type="button"
      onClick={() => inputRef.current.click()}
      className="flex w-full py-10 flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-stone-300 bg-stone-50 text-stone-600 transition hover:border-stone-400 hover:bg-stone-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900"
    >
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        className="hidden"
        onChange={handleUpload}
      />
      <Upload size={32} color="#d32d5a" />
      <span className="font-medium text-stone-900">Choose an image</span>
      <span className="text-sm">PNG, JPEG or GIF</span>
    </button>
  );
}

export default Uploader;
