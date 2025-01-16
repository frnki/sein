import { defineField, defineType } from 'sanity'
import { OptimizedImageInput } from '../../components/OptimizedImageInput'

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
      name: 'subtitle',
      title: '부제목',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
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
        { name: 'location', title: '위치', type: 'string' },
        { name: 'program', title: '프로그램', type: 'string' },
        { name: 'area', title: '면적', type: 'string' },
        { name: 'architect', title: '건축가', type: 'string' },
        { name: 'team', title: '팀', type: 'string' },
        { name: 'construction', title: '시공사', type: 'string' },
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
        sources: [OptimizedImageInput],
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
            sources: [OptimizedImageInput],
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

    // 메타 정보
    defineField({
      name: 'featured',
      title: '메인 노출',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: '노출 순서',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'publishedAt',
      title: '발행일',
      type: 'datetime',
    }),

    // 카테고리 정보
    defineField({
      name: 'category',
      title: '카테고리',
      type: 'string',
      options: {
        list: [
          { title: '주거', value: 'residential' },
          { title: '상업', value: 'commercial' },
          { title: '교육', value: 'education' },
          { title: '공공', value: 'public' },
          { title: '리모델링', value: 'remodeling' },
        ],
      },
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