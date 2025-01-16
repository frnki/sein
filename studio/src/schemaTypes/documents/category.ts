import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'category',
  title: '카테고리',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: '카테고리명',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }), 
    defineField({
      name: 'order',
      title: '정렬 순서',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
}) 