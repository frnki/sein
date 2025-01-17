import category from './documents/category'
import material from './documents/material'
import news from './documents/news'
import page from './documents/page'
import person from './documents/person'
import post from './documents/post'
import product from './documents/product'
import project from './documents/project'
import series from './documents/series'
import blockContent from './objects/blockContent'
import callToAction from './objects/callToAction'
import infoSection from './objects/infoSection'
import link from './objects/link'
import settings from './singletons/settings'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types

export const schemaTypes = [
  // Singletons
  settings,
  // Documents
  product,
  project,
  page,
  post,
  person,
  category,
  series,
  material,
  news,
  // Objects
  blockContent,
  infoSection,
  callToAction,
  link,
]
