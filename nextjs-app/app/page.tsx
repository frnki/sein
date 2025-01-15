import dynamic from 'next/dynamic'
import Clients from './components/Clients'
import ContactSection from './components/ContactSection'
import DifferentiationPoints from './components/DifferentiationPoints'
import FeaturedPortfolio from './components/FeaturedPortfolio'
import NewsInventory from './components/NewsInventory'
import ProductCategories from './components/ProductCategories'

// Dynamic import for components that use browser APIs
const HeroBanner = dynamic(() => import('./components/HeroBanner'), {
  ssr: true, // Enable SSR but handle client-side features carefully
})

interface Section {
  id: string
  Component: () => JSX.Element
  className?: string
}

const sections: Section[] = [
  { id: 'categories', Component: ProductCategories },
  { id: 'points', Component: DifferentiationPoints, className: 'bg-white' },
  { id: 'portfolio', Component: FeaturedPortfolio, className: 'bg-gray-50' },
  { id: 'news', Component: NewsInventory, className: 'bg-white' },
  { id: 'clients', Component: Clients, className: 'bg-white' },
  { id: 'contact', Component: ContactSection, className: 'bg-gray-50' }
]

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Render HeroBanner with suspense boundary */}
      <HeroBanner />
      
      {/* Render sections */}
      {sections.map(({ id, Component, className }) => (
        <section 
          key={id} 
          id={id} 
          className={className}
        >
          <Component />
        </section>
      ))}
    </main>
  )
}

