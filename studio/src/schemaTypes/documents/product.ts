import { defineField, defineType } from 'sanity'
import { OptimizedImageInput } from '../../components/OptimizedImageInput'

export default defineType({
  name: 'product',
  title: '제품',
  type: 'document',
  fields: [
    // 기본 정보
    defineField({
      name: 'name',
      title: '품명',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'code',
      title: '제품 코드',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'code',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: '대표 이미지',
      type: 'image',
      options: {
        hotspot: true,
        accept: 'image/*',
        storeOriginalFilename: true,
        metadata: ['blurhash', 'lqip', 'palette'],
        sources: [OptimizedImageInput],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: '추가 이미지',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
            accept: 'image/*',
            storeOriginalFilename: true,
            metadata: ['blurhash', 'lqip', 'palette'],
            sources: [OptimizedImageInput],
          },
        },
      ],
      options: {
        layout: 'grid',
      },
      validation: (Rule) => Rule.required(),
    }),

    // 분류
    defineField({
      name: 'series',
      title: '시리즈',
      type: 'reference',
      to: [{type: 'series'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: '카테고리',
      type: 'reference',
      to: [{type: 'category'}],
      validation: (Rule) => Rule.required(),
    }),

    // 상세 정보
    defineField({
      name: 'material',
      title: '재질',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {
            list: [
              {title: 'STL', value: 'STL'},
              {title: 'STONE', value: 'STONE'},
              {title: 'HARDWOOD', value: 'HARDWOOD'},
              {title: 'HPL', value: 'HPL'},
              {title: 'GLASS', value: 'GLASS'},
              {title: 'LED', value: 'LED'},
              {title: 'UPVC', value: 'UPVC'},
              {title: '불투명', value: 'OPAQUE'},
              {title: '투명', value: 'TRANSPARENT'},
              {title: '자연무늬목', value: 'NATURAL_WOOD'},
            ],
          },
        },
      ],
      options: {
        layout: 'grid',
        list: [
          {title: 'STL', value: 'STL'},
          {title: 'STONE', value: 'STONE'},
          {title: 'HARDWOOD', value: 'HARDWOOD'},
          {title: 'HPL', value: 'HPL'},
          {title: 'GLASS', value: 'GLASS'},
          {title: 'LED', value: 'LED'},
          {title: 'UPVC', value: 'UPVC'},
          {title: '불투명', value: 'OPAQUE'},
          {title: '투명', value: 'TRANSPARENT'},
          {title: '자연무늬목', value: 'NATURAL_WOOD'},
        ],
      },
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'dimensions',
      title: '규격',
      type: 'object',
      fields: [
        {
          name: 'width',
          title: '가로(W)',
          type: 'number',
          validation: Rule => Rule.positive(),
        },
        {
          name: 'depth',
          title: '세로(D)',
          type: 'number',
          validation: Rule => Rule.positive(),
        },
        {
          name: 'height',
          title: '높이(H)',
          type: 'number',
          validation: Rule => Rule.positive(),
        },
      ],
      options: {
        columns: 4,
      },
    }),
    defineField({
      name: 'description',
      title: '제품 설명',
      type: 'array',
      of: [{type: 'block'}],
    }),

    // 메타 정보
    defineField({
      name: 'publishedAt',
      title: '출시일',
      type: 'datetime',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'code',
      media: 'mainImage',
    },
  },
})
