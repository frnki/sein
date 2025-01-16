import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'material',
  title: '재질',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: '재질명',
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
      subtitle: 'code',
    },
  },
}) 