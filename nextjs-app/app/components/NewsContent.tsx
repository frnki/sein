'use client'

import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { urlForImage } from '@/sanity/lib/image'
import { PortableText } from '@portabletext/react'
import { Share2 } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

interface NewsContentProps {
  news: {
    id: string
    date: string
    title: string
    content: any[]
  }
}

const components = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null
      }
      return (
        <div className="my-8 relative aspect-video">
          <Image
            src={urlForImage(value)?.url() || ''}
            alt={value.alt || ' '}
            fill
            className="object-contain"
          />
          {value.caption && (
            <div className="mt-2 text-sm text-gray-500 text-center">
              {value.caption}
            </div>
          )}
        </div>
      )
    },
  },
}

export default function NewsContent({ news }: NewsContentProps) {
  const { toast } = useToast()
  const [copying, setCopying] = useState(false)

  const handleShare = async () => {
    setCopying(true)
    const url = `${window.location.origin}/news?id=${news.id}`
    
    try {
      await navigator.clipboard.writeText(url)
      toast({
        title: "URL Copied!",
        description: "The link has been copied to your clipboard.",
      })
    } catch (err) {
      console.error('Failed to copy: ', err)
      toast({
        title: "Copy failed",
        description: "Please try again.",
        variant: "destructive",
      })
    } finally {
      setCopying(false)
    }
  }

  return (
    <div className="p-6 relative">
      <Button
        variant="outline"
        size="icon"
        className="absolute top-6 right-6"
        onClick={handleShare}
        disabled={copying}
      >
        <Share2 className="h-4 w-4" />
      </Button>
      <h2 className="text-2xl font-semibold mb-4">{news.title}</h2>
      <p className="text-gray-600 mb-4">{news.date}</p>
      <div className="prose max-w-none">
        <PortableText value={news.content} components={components} />
      </div>
    </div>
  )
}

