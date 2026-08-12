"use client";
import { createContext, useContext, useState } from "react";
const ImageContext = createContext();

function ImageContextProvider({ children }) {
  const [preview, setPreview] = useState(null);
  const [palette, setPalette] = useState(null);
  return (
    <ImageContext.Provider value={{ setPreview, preview, setPalette, palette }}>
      {children}
    </ImageContext.Provider>
  );
}

function useImageContext() {
  const context = useContext(ImageContext);
  return context;
}

export { ImageContextProvider, useImageContext };
