import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'series',
  title: '시리즈',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: '시리즈명',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: '설명',
      type: 'text',
    }), 
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
    },
  },
}) 