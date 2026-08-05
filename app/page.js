"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileLink, setfileLink] = useState(null);
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setSelectedFile(file);
    }
  };

  useEffect(() => {
    const fileLink = selectedFile ? URL.createObjectURL(selectedFile) : "";
    setfileLink(fileLink);
    console.log(selectedFile);

    return () => {
      URL.revokeObjectURL(fileLink);
      setfileLink(null);
    };
  }, [selectedFile]);

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="flex min-h-[500px] min-w-[500px] items-center justify-center rounded-4xl border-2 border-slate-400 p-10">
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />

        <button
          onClick={() => inputRef.current?.click()}
          className="rounded bg-slate-700 px-4 py-2 text-white "
        >
          Upload It!
        </button>
      </div>
      <h1>Color Pallet</h1>
      <img src={fileLink} />
    </div>
  );
}
