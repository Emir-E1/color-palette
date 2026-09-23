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

    // Enregistre les couleurs dans le contexte
    setPalette(data.palette);

    // Enregistre l'ID MongoDB de la palette
    setPaletteId(data.paletteId);

    return data;
  }

  function handleDelete() {
    setPalette(null);
    setPaletteId(null);
    setFile(null);
  }

  return (
    <section className="w-full grid grid-rows-1 place-items-center gap-4 p-0">
      {file ? (
        <UploadPreview
          file={file}
          onDelete={handleDelete}
          sendUpload={sendUpload}
        />
      ) : (
        <Uploader onUpload={setFile} />
      )}
    </section>
  );
}

export default ImageUploadSection;
