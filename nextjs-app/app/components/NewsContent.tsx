'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

interface NewsContentProps {
  news: {
    id: number
    date: string
    title: string
    content: string
    image: string | null
  }
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
      {news.image && (
        <div className="mb-4">
          <Image
            src={news.image}
            alt={news.title}
            width={600}
            height={400}
            className="w-full h-auto"
          />
        </div>
      )}
      <div className="prose max-w-none">
        <p>{news.content}</p>
      </div>
    </div>
  )
}

