"use client";

import { Suspense, useState } from "react";
import Uploader from "./Uploader";
import UploadPreview from "./UploadPreview";

function ImageUploadSection({ onPaletteReady, setPalette }) {
  const [file, setFile] = useState(null); //Getting the File it self
  async function sendUpload(file) {
    const fileUpload = new FormData();
    fileUpload.append("imageUpload", file);
    const res = await fetch("/api/colorscan/upload", {
      method: "POST",
      body: fileUpload,
    });
    const data = await res.json();
    onPaletteReady(data.palette);
    return data;
  }
  function handleDelete() {
    setPalette(null);
    setFile(null);
  }

  return (
    <section className={`w-full grid grid-rows-1 place-items-center gap-4 p-0`}>
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
