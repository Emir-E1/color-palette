"use client";

import { Scan, Trash, Upload } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

function UploadPreview({ file, onDelete, sendUpload }) {
  const [fileLink, setFileLink] = useState(null);

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setFileLink(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  if (!fileLink) return null;

  const buttonShadow = {
    boxShadow: `
      0 12px 24px -4px rgba(0,0,0,0.15),
      0 6px 12px -4px rgba(0,0,0,0.1),
      inset 0 1px 1px rgba(255,255,255,0.4)
    `,
  };

  return (
    <div className="relative max-w-full overflow-hidden rounded-4xl border-2 border-gray-500">
      <img
        src={fileLink}
        alt="Preview"
        className=" block max-h-[400px] max-w-full rounded-4xl object-contain "
      />
      <button
        className="absolute top-4 right-4 bg-background p-4 rounded-full cursor-pointer"
        style={buttonShadow}
        onClick={onDelete}
      >
        <Trash />
      </button>
      <button
        className="absolute bottom-4 right-4 bg-background p-4 rounded-full cursor-pointer"
        style={buttonShadow}
        onClick={() => sendUpload(file)}
      >
        <Scan />
      </button>
    </div>
  );
}

export default UploadPreview;
