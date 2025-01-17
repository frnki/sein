import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: '프로젝트',
  type: 'document',
  fields: [
    // 기본 정보
    defineField({
      name: 'title',
      title: '프로젝트명',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: doc => `project-${doc._id.slice(-6)}`,
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),

    // 프로젝트 상세 정보
    defineField({
      name: 'details',
      title: '프로젝트 상세',
      type: 'object',
      fields: [
        { name: 'year', title: '연도', type: 'string' },
        { name: 'client', title: '클라이언트', type: 'string' },
      ],
    }),

    // 프로젝트 설명
    defineField({
      name: 'description',
      title: '프로젝트 설명',
      type: 'array',
      of: [{ type: 'text' }],
      validation: Rule => Rule.required(),
    }),

    // 이미지
    defineField({
      name: 'mainImage',
      title: '대표 이미지',
      type: 'image',
      options: {
        hotspot: true,
        accept: 'image/*',
        storeOriginalFilename: true,
        metadata: ['blurhash', 'lqip', 'palette'],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: '프로젝트 이미지',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
            accept: 'image/*',
            storeOriginalFilename: true,
            metadata: ['blurhash', 'lqip', 'palette'],
          },
        },
      ],
      options: {
        layout: 'grid',
      },
      validation: Rule => Rule.required(),
    }),

    // 관련 제품
    defineField({
      name: 'products',
      title: '관련 제품',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'product' }],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'mainImage',
    },
  },
}) 