import { type LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ContactMethodCardProps {
  title: string
  icon: LucideIcon
  content: string[]
  color: string
  action: {
    label: string
    href: string
  }
}

export default function ContactMethodCard({ title, icon: Icon, content, color, action }: ContactMethodCardProps) {
  return (
    <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
      <div className="flex items-center mb-4">
        <Icon className={`h-8 w-8 ${color} mr-3`} />
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="flex-grow">
        {content.map((line, index) => (
          <p key={index} className={index === 0 ? "text-base mb-1" : "text-sm text-gray-600"}>
            {line}
          </p>
        ))}
      </div>
      <Button
        className="mt-4 w-full"
        variant="outline"
        asChild
      >
        <a href={action.href} target="_blank" rel="noopener noreferrer">
          {action.label}
        </a>
      </Button>
    </div>
  )
}

