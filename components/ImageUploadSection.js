"use client";

import { useState } from "react";

import Uploader from "./Uploader";
import UploadPreview from "./UploadPreview";

function ImageUploadSection({ setPalette, setPaletteId }) {
  const [file, setFile] = useState(null);

  async function sendUpload(file) {
    const fileUpload = new FormData();
    fileUpload.append("imageUpload", file);

    const res = await fetch("/api/colorscan/upload", {
      method: "POST",
      body: fileUpload,
    });

    const data = await res.json();

    setPalette(data.palette);
    setPaletteId(data.paletteId);

    return data;
  }

  function handleDelete() {
    setPalette(null);
    setPaletteId(null);
    setFile(null);
  }

  return (
    <div className="flex w-full flex-col items-center gap-4">
      {file ? (
        <UploadPreview
          file={file}
          onDelete={handleDelete}
          sendUpload={sendUpload}
        />
      ) : (
        <Uploader onUpload={setFile} />
      )}
    </div>
  );
}

export default ImageUploadSection;
