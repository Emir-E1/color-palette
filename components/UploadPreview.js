"use client";

import { useImageContext } from "@/context/ImageContext";
import { Scan, Trash } from "lucide-react";
import { useEffect } from "react";

function UploadPreview({ file, onDelete, sendUpload }) {
  const { preview, setPreview } = useImageContext();

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setPreview(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  if (!preview) return null;

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="flex w-full justify-center rounded-2xl bg-stone-100 p-3 md:p-6">
        <img
          src={preview}
          alt="Preview"
          className="block max-h-[400px] max-w-full rounded-xl object-contain"
        />
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onDelete}
          className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-5 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50"
        >
          <Trash size={16} />
          Remove
        </button>
        <button
          type="button"
          onClick={() => sendUpload(file)}
          className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-stone-700"
        >
          <Scan size={16} />
          Scan colors
        </button>
      </div>
    </div>
  );
}

export default UploadPreview;
