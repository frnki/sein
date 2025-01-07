'use client'

import Clients from './components/Clients'
import ContactSection from './components/ContactSection'
import DifferentiationPoints from './components/DifferentiationPoints'
import FeaturedPortfolio from './components/FeaturedPortfolio'
import HeroBanner from './components/HeroBanner'
import NewsInventory from './components/NewsInventory'
import ProductCategories from './components/ProductCategories'

const sections = [
  { id: 'categories', Component: ProductCategories },
  { id: 'points', Component: DifferentiationPoints, className: 'bg-white' },
  { id: 'portfolio', Component: FeaturedPortfolio, className: 'bg-gray-50' },
  // { id: 'history', Component: History },
  { id: 'news', Component: NewsInventory, className: 'bg-white' },
  // { id: 'product', Component: FeaturedProduct, className: 'bg-gray-50' },
  { id: 'clients', Component: Clients, className: 'bg-white' },
  { id: 'contact', Component: ContactSection, className: 'bg-gray-50' }
]

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroBanner />
      {sections.map(({ id, Component, className }) => (
        <section key={id} className={className}>
          <Component />
        </section>
      ))}
    </main>
  )
}

