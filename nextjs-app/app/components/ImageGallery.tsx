"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { VisuallyHidden } from "./visually-hidden";

interface ImageGalleryProps {
  images: string[];
  initialIndex?: number;
  onClose: () => void;
}

export default function ImageGallery({ images, initialIndex = 0, onClose }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] h-[95vh] p-0 bg-white border-none">
        <VisuallyHidden>
          <DialogTitle>Image Gallery</DialogTitle>
        </VisuallyHidden>
        <div className="relative w-full h-full">
          {/* Navigation buttons */}
          <div className="absolute inset-0 flex items-center justify-between px-4 sm:px-6">
            <button
              onClick={handlePrevious}
              className="p-2 bg-white/80 hover:bg-white shadow-md rounded-full transition-all group"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 bg-white/80 hover:bg-white shadow-md rounded-full transition-all group"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
            </button>
          </div>

          {/* Image */}
          <div className="w-full h-full flex items-center justify-center p-8">
            <div className="relative w-full h-full">
              <Image
                src={images[currentIndex] || '/placeholder.jpg'}
                alt={`Gallery image ${currentIndex + 1}`}
                fill
                className="object-contain"
                quality={100}
                priority
              />
            </div>
          </div>

          {/* Image counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/80 px-4 py-2 rounded-full text-sm font-medium text-gray-600 shadow-md">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 