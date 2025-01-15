'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

interface CarouselImage {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
}

interface PortfolioCarouselProps {
  images: CarouselImage[];
}

export default function PortfolioCarousel({ images }: PortfolioCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    duration: 30,
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative bg-black">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {images.map((item) => (
            <div key={item.id} className="flex-[0_0_100%] min-w-0">
              <div className="relative h-[60vh]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
                  <div className="container mx-auto">
                    <Badge 
                      variant="outline" 
                      className="mb-4 text-white border-white/30 bg-black/30 backdrop-blur-sm 
                        font-semibold px-4 py-2 text-sm tracking-wide hover:bg-black/40 transition-colors"
                    >
                      {item.category}
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                      {item.title}
                    </h2>
                    <p className="text-lg md:text-xl text-white/80">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-white w-6'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            onClick={() => emblaApi?.scrollTo(index)}
          />
        ))}
      </div>

      <Button
        variant="outline"
        size="icon"
        className={`absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 border-white/20 transition-opacity ${
          !canScrollPrev && 'opacity-0'
        }`}
        onClick={scrollPrev}
        disabled={!canScrollPrev}
      >
        <ChevronLeft className="h-4 w-4 text-white" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className={`absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 border-white/20 transition-opacity ${
          !canScrollNext && 'opacity-0'
        }`}
        onClick={scrollNext}
        disabled={!canScrollNext}
      >
        <ChevronRight className="h-4 w-4 text-white" />
      </Button>
    </div>
  );
} 