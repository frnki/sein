'use client'

import { motion, Variants } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface ProjectItemProps {
  id: string | number
  title: string
  slug: string
  image: string
  location?: string
  size?: string
  year?: string | number
  tags?: string[]
  itemAnimation?: Variants
}

export function ProjectItem({
  id,
  title,
  slug,
  image,
  location,
  size,
  year,
  tags,
  itemAnimation
}: ProjectItemProps) {
  const router = useRouter()

  const Component = itemAnimation ? motion.div : 'div'

  return (
    <Component
      key={id}
      variants={itemAnimation}
      onClick={() => router.push(`/project/${slug}`)}
      className="group cursor-pointer"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-4">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 p-6">
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="text-white space-y-2">
              {location && <p className="text-sm font-medium">{location}</p>}
              {size && <p className="text-sm">{size}</p>}
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="font-medium text-lg group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {year && (
            <span className="text-sm text-gray-500">{year}</span>
          )}
          {tags?.map((tag) => (
            <span
              key={tag}
              className="text-xs text-gray-500 hover:text-primary transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </Component>
  )
} 