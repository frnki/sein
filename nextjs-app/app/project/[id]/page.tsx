import { Metadata } from 'next'
import { ProjectDetail } from './ProjectDetail'

// Types
interface ProjectData {
  id: number
  title: string
  subtitle: string
  details: Record<string, string>
  description: string[]
  products: Array<{
    id: number
    name: string
    category: string
    price: string
    image: string
    link: string
  }>
  images: string[]
}

// Server-side data fetching
async function getProjectData(id: number): Promise<ProjectData> {
  // Mock data - replace with actual API call
  return {
    id,
    title: `Project ${id}`,
    subtitle: '도서실 리모델링',
    details: {
      year: '2020',
      location: 'Eunpyeong-gu, Seoul, South Korea',
      program: 'Elementary school library',
      area: '164.71㎡',
      architect: 'SHIN Hyun Bo, JEON So Hyun',
      team: 'LEE Sub',
      construction: 'Baeksang construction',
    },
    description: [
      '서울 서신초등학교의 도서실 리모델링 계획은 기존의 획일화된 도서관 공간을 학생들의 상상력과 창의성을 자극하는 새로운 학습 환경으로 탈바꿈시키는 것을 목표로 했습니다.',
      // ... rest of the description array
    ],
    products: [
      {
        id: 1,
        name: 'Modern Reading Chair',
        category: 'Furniture',
        price: '₩450,000',
        image: '/placeholder.svg?height=400&width=400&text=Chair',
        link: '/shop/chair-1'
      },
      // ... rest of the products array
    ],
    images: [
      '/placeholder.svg?height=800&width=1200&text=Floor+Plan',
      '/placeholder.svg?height=800&width=1200&text=Interior+1',
      '/placeholder.svg?height=800&width=1200&text=Interior+2',
      '/placeholder.svg?height=800&width=1200&text=Interior+3',
    ]
  }
}

// Server Component
export default async function ProjectPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const projectData = await getProjectData(Number(params.id))
  
  return <ProjectDetail initialData={projectData} />
}

// Metadata generation
export async function generateMetadata({ 
  params 
}: { 
  params: { id: string } 
}): Promise<Metadata> {
  const projectData = await getProjectData(Number(params.id))
  
  return {
    title: projectData.title,
    description: projectData.description[0],
  }
}

