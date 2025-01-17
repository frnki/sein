import { client } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/image'
import { groq } from 'next-sanity'
import { notFound } from 'next/navigation'
import { ProjectDetail } from './ProjectDetail'

// Sanity 쿼리
const projectQuery = groq`*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  details {
    year,
    client
  },
  description,
  mainImage,
  images[],
  "products": products[]-> {
    _id,
    name,
    code,
    "slug": slug.current,
    mainImage,
    images,
    material,
    dimensions {
      width,
      depth,
      height
    },
    "series": series->name,
    "category": category->name,
    "categorySlug": category->slug.current,
    "seriesSlug": series->slug.current
  },
  "otherProjects": *[_type == "project" && slug.current != $slug] | order(_createdAt desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    mainImage
  }
}`

async function getProjectData(slug: string) {
  try {
    const project = await client.fetch(projectQuery, { slug })
    if (!project) {
      throw new Error('Project not found')
    }

    return {
      ...project,
      details: project.details || {
        year: '',
        client: ''
      },
      description: Array.isArray(project.description) ? project.description : [],
      mainImageUrl: urlForImage(project.mainImage)?.width(1200)?.url() || null,
      images: (project.images || []).map(image => 
        urlForImage(image)?.width(1000)?.url() || null
      ).filter(Boolean),
      products: (project.products || []).map(product => ({
        ...product,
        href: `/product/${product.slug || ''}`,
        categoryHref: `/category/${product.categorySlug || ''}`,
        seriesHref: `/series/${product.seriesSlug || ''}`,
        imageUrl: urlForImage(product.mainImage)?.url() || null,
        additionalImages: (product.images || []).map(image => 
          urlForImage(image)?.width(800)?.url() || null
        ).filter(Boolean)
      })),
      otherProjects: (project.otherProjects || []).map(project => ({
        ...project,
        href: `/project/${project.slug || ''}`,
        imageUrl: urlForImage(project.mainImage)?.width(800)?.url() || null
      }))
    }
  } catch (error) {
    console.error('프로젝트 데이터 로딩 실패:', error)
    throw error
  }
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params
  
  if (!slug) {
    return notFound()
  }

  const projectData = await getProjectData(slug)
  return <ProjectDetail initialData={projectData} />
}

