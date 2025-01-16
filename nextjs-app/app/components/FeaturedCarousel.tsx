"use client";

import { Button } from "@/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const carouselImages = [
  {
    id: 1,
    title: "서울숲 복합문화공원",
    description: "도심 속 휴식 공간을 위한 혁신적인 디자인",
    image: "/images/banner-acrotower.jpg",
  },
  {
    id: 2,
    title: "판교 테크노밸리",
    description: "첨단 기술과 조화를 이루는 휴게 공간",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
  },
  {
    id: 3,
    title: "해운대 해변 공공시설",
    description: "자연과 도시가 공존하는 공공 디자인",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071",
  },
  {
    id: 4,
    title: "스마트시티 프로젝트",
    description: "미래 도시를 위한 스마트 솔루션",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069",
  },
];

export default function FeaturedCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    duration: 30,
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    
    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative bg-black">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {carouselImages.map((item) => (
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
        {carouselImages.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? "bg-white w-6"
                : "bg-white/50 hover:bg-white/75"
            }`}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>

      <Button
        variant="outline"
        size="icon"
        className={`absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 border-white/20 transition-opacity ${
          !canScrollPrev && "opacity-0"
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
          !canScrollNext && "opacity-0"
        }`}
        onClick={scrollNext}
        disabled={!canScrollNext}
      >
        <ChevronRight className="h-4 w-4 text-white" />
      </Button>
    </div>
  );
}
