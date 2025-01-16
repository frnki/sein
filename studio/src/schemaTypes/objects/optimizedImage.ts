import { defineType } from 'sanity'

export default defineType({
  name: 'optimizedImage',
  title: '최적화된 이미지',
  type: 'image',
  options: {
    hotspot: true,
    accept: 'image/*',
    storeOriginalFilename: true,
    metadata: ['blurhash', 'lqip', 'palette'],
    sources: [
      {
        name: 'custom',
        title: '이미지 업로드',
        component: (props) => {
          // 이미지 최적화 로직은 여기서 구현
          return props.children
        },
        options: {
          accept: 'image/*',
          maxSizeMB: 2,
          maxWidthOrHeight: 1920,
          quality: 0.85,
        },
      },
    ],
  },
}) 