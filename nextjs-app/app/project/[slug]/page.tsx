import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { notFound } from 'next/navigation'
import { ProjectDetail } from './ProjectDetail'

// Sanity 쿼리
const projectQuery = groq`*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  subtitle,
  "slug": slug.current,
  details,
  description,
  category,
  featured,
  order,
  publishedAt,
  "imageUrl": mainImage.asset->url,
  "images": images[].asset->url,
  "products": *[_type == "product" && references(^._id)] {
    _id,
    name,
    "slug": slug.current,
    category,
    "image": mainImage.asset->url,
    price
  },
  "otherProjects": *[_type == "project" && slug.current != $slug] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    "imageUrl": mainImage.asset->url
  }
}`

async function getProjectData(slug: string) {
  try {
    const project = await client.fetch(projectQuery, { slug })
    if (!project) {
      throw new Error('Project not found')
    }

    // Ensure all required fields have default values
    return {
      ...project,
      details: project.details || {
        year: '',
        location: '',
        program: '',
        area: '',
        architect: '',
        team: '',
        construction: ''
      },
      description: Array.isArray(project.description) ? project.description : [],
      images: project.images || [],
      products: project.products || [],
      otherProjects: project.otherProjects || []
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

