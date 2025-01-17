import { CogIcon } from '@sanity/icons'
import type { StructureResolver } from 'sanity/structure'

/**
 * Structure builder is useful whenever you want to control how documents are grouped and
 * listed in the studio or for adding additional in-studio previews or content to documents.
 * Learn more: https://www.sanity.io/docs/structure-builder-introduction
 */

export const structure: StructureResolver = (S: any) =>
  S.list()
    .title('Content')
    .items([
      // S.documentTypeListItem('post').title('Posts'),
      // S.documentTypeListItem('page').title('Pages'),
      // S.documentTypeListItem('person').title('People'),
      S.documentTypeListItem('product').title('Products'),
      S.documentTypeListItem('series').title('Products > Series'),
      S.documentTypeListItem('category').title('Products > Category'),
      S.documentTypeListItem('material').title('Products > Material'),
      S.documentTypeListItem('project').title('Projects'),
      S.documentTypeListItem('news').title('News'),

      // Settings Singleton in order to view/edit the one particular document for Settings.  Learn more about Singletons: https://www.sanity.io/docs/create-a-link-to-a-single-edit-page-in-your-main-document-type-list
      S.listItem()
        .title('Site Settings')
        .child(S.document().schemaType('settings').documentId('siteSettings'))
        .icon(CogIcon),
    ])
