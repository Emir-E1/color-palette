"use client";

import { createContext, useContext, useState } from "react";

const ImageContext = createContext();

function ImageContextProvider({ children }) {
  const [preview, setPreview] = useState(null);

  const [palette, setPalette] = useState(null);

  // ID de la palette enregistrée dans MongoDB
  const [paletteId, setPaletteId] = useState(null);

  return (
    <ImageContext.Provider
      value={{
        preview,
        setPreview,
        palette,
        setPalette,
        paletteId,
        setPaletteId,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
}

function useImageContext() {
  const context = useContext(ImageContext);

  return context;
}

export { ImageContextProvider, useImageContext };
