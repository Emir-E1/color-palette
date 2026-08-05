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

  return (
    <div className="relative max-w-full overflow-hidden rounded-4xl border-2 border-gray-500">
      <img
        src={fileLink}
        alt="Preview"
        className=" block max-h-[400px] max-w-full rounded-4xl object-contain "
      />
      <button
        className="absolute top-4 right-4 bg-background p-4 rounded-full border-1 cursor-pointer"
        onClick={() => onDelete(null)}
      >
        {" "}
        <Trash />
      </button>{" "}
      <button
        className="absolute bottom-4 right-4 bg-background p-4 rounded-full border-1 cursor-pointer"
        onClick={() => sendUpload(file)}
      >
        {" "}
        <Scan />
      </button>
    </div>
  );
}

export default UploadPreview;
