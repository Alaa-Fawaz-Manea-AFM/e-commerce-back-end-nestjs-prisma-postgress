"use client";

import Image from "next/image";
import { useState } from "react";

interface ImagesSliderProps {
  images: string[];
  productTitle?: string;
}

const ImagesSlider = ({
  images = [],
  productTitle = "Product",
}: ImagesSliderProps) => {
  const [activeImage, setActiveImage] = useState<string>(images[0] || "");
  const [activeIndex, setActiveIndex] = useState<number>(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-[450px] bg-gray-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center text-gray-400">
        No images available
      </div>
    );
  }

  return (
    <div className="col-span-5 md:col-span-2 flex flex-col gap-4 w-full max-w-[500px] mx-auto">
      <div className="w-full h-[400px] md:h-[450px] relative bg-primary dark:bg-zinc-900 rounded-2xl overflow-hidden border border-custom-green shadow-sm group">
        <Image
          width={800}
          height={800}
          alt={`${productTitle} - Main View`}
          className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105 rounded-md"
          src={activeImage || images[0]}
          priority
          unoptimized
        />
      </div>

      <div className="flex flex-wrap gap-3 justify-center items-center px-1">
        {images.map((img, i) => (
          <button
            key={img + i}
            type="button"
            onClick={() => {
              setActiveImage(img);
              setActiveIndex(i);
            }}
            className={`relative rounded-xl overflow-hidden bg-white dark:bg-zinc-900 border-2 p-1 transition-all duration-300 transform active:scale-95 cursor-pointer h-16 w-16 min-w-[64px] ${
              activeIndex === i
                ? "border-custom-green shadow-md scale-105"
                : "border-gray-200 dark:border-zinc-700 opacity-70 hover:opacity-100 hover:border-gray-400"
            }`}
          >
            <Image
              width={64}
              height={64}
              src={img}
              alt={`${productTitle} thumbnail ${i + 1}`}
              className="object-contain w-full h-full rounded-lg"
              unoptimized
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImagesSlider;
