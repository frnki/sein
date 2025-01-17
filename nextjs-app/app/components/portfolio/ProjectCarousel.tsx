'use client'

import { Button } from '@/components/ui/button'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { ProjectItem } from './ProjectItem'

interface Project {
  id: string
  title: string
  slug: string
  year: string
  image: string
  location?: string
  size?: string
  tags?: string[]
}

interface ProjectCarouselProps {
  projects: Project[]
}

export function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
    skipSnaps: false,
    dragFree: true
  })

  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, onSelect])

  if (!projects.length) return null

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-6">
          {projects.map((project) => (
            <div key={project.id} className="flex-[0_0_280px] min-w-0 pl-6">
              <ProjectItem
                id={project.id}
                title={project.title}
                slug={project.slug}
                year={project.year}
                image={project.image}
                location={project.location}
                size={project.size}
                tags={project.tags}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="outline"
        size="icon"
        className={`absolute top-1/2 -translate-y-1/2 -left-4 rounded-full bg-white shadow-md
          ${!canScrollPrev ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
        onClick={scrollPrev}
        disabled={!canScrollPrev}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous projects</span>
      </Button>

      <Button
        variant="outline"
        size="icon"
        className={`absolute top-1/2 -translate-y-1/2 -right-4 rounded-full bg-white shadow-md
          ${!canScrollNext ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
        onClick={scrollNext}
        disabled={!canScrollNext}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next projects</span>
      </Button>
    </div>
  )
} 