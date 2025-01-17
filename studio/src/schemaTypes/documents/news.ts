import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'news',
  title: '뉴스',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '제목',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: '발행일',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: '본문',
      type: 'array',
      of: [
        { 
          type: 'block',
          styles: [
            { title: '본문', value: 'normal' },
            { title: '인용', value: 'blockquote' }
          ],
          lists: [
            { title: '글머리 기호', value: 'bullet' },
            { title: '번호 매기기', value: 'number' }
          ]
        },
        {
          type: 'image',
          preview: {
            select: {
              imageUrl: 'asset.url',
              title: 'caption'
            },
            prepare(selection) {
              const {imageUrl, title} = selection
              return {
                title: title || '이미지',
                media: imageUrl ? {asset: {url: imageUrl}} : undefined
              }
            }
          },
          options: {
            hotspot: true,
            accept: 'image/*',
            storeOriginalFilename: true,
            metadata: ['blurhash', 'lqip', 'palette'],
          },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: '이미지 설명',
              description: '이미지에 대한 설명을 입력하세요'
            },
            {
              name: 'alt',
              type: 'string',
              title: '대체 텍스트',
              description: '스크린 리더를 위한 대체 텍스트를 입력하세요'
            }
          ]
        }
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'publishedAt',
    },
    prepare({ title, date }) {
      return {
        title,
        subtitle: date ? new Date(date).toLocaleDateString('ko-KR') : '',
      }
    },
  },
  orderings: [
    {
      title: '발행일순',
      name: 'publishedAtDesc',
      by: [
        { field: 'publishedAt', direction: 'desc' }
      ]
    }
  ]
}) 