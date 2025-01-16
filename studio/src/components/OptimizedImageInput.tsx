import { AssetSource } from '@sanity/types'
import imageCompression from 'browser-image-compression'
import { useCallback } from 'react'

export const OptimizedImageInput: AssetSource = {
  name: 'optimizedImage',
  title: '이미지 업로드',
  component: ({ onSelect }) => {
    const handleFileSelect = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (!file) return

      try {
        const options = {
          maxSizeMB: 2,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
          preserveExif: true,
          initialQuality: 0.85
        }

        const optimizedFile = await imageCompression(file, options)
        
        // Sanity에 최적화된 파일 전달
        onSelect([{
          kind: 'file',
          file: optimizedFile,
          options: {
            filename: file.name,
            contentType: file.type
          }
        }])
      } catch (error) {
        console.error('이미지 최적화 실패:', error)
      }
    }, [onSelect])

    return (
      <div className="p-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="block w-full"
        />
        <p className="mt-2 text-sm text-gray-500">
          이미지는 자동으로 최적화되어 업로드됩니다. (최대 1920px, 2MB)
        </p>
      </div>
    )
  }
} 