"use client";
import { Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function Uploader({ onUpload }) {
  const inputRef = useRef(null);

  function handleUpload(e) {
    if (e.target.files && e.target.files.length > 0) {
      onUpload(e.target.files[0]);
    }
  }

  return (
    <div className=" flex min-w-[200px] md:min-w-[400px] aspect-square flex-col bg-background border-2 rounded-3xl border-dashed border-separate border-mist-400 gap-4 justify-center items-center">
      <input
        type="file"
        ref={inputRef}
        className="hidden"
        onChange={handleUpload}
      />
      <div
        className="flex flex-col justify-center items-center cursor-pointer "
        onClick={() => inputRef.current.click()}
      >
        <Upload size={40} />
        <div className="text-center cursor-pointer">
          <h4>Uplaod it here</h4>
          <p>PNG JPEG GIF</p>
        </div>
      </div>
    </div>
  );
}

export default Uploader;
