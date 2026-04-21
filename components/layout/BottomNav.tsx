'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Dumbbell, Utensils, Droplets, TrendingUp, Home, Scale } from 'lucide-react'

const tabs = [
  { href: '/', icon: Home, label: 'Início' },
  { href: '/treino', icon: Dumbbell, label: 'Treino' },
  { href: '/alimentacao', icon: Utensils, label: 'Dieta' },
  { href: '/hidratacao', icon: Droplets, label: 'Água' },
  { href: '/perfil', icon: Scale, label: 'Medidas' },
  { href: '/insights', icon: TrendingUp, label: 'Insights' },
]

export default function BottomNav() {
  const pathname = usePathname()
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#0f0f0f] border-t border-white/[0.06] z-50 safe-area-pb">
      <div className="max-w-md mx-auto flex">
        {tabs.map(({ href, icon: Icon, label }) => {
          const active = pathname === href
          return (
            <Link key={href} href={href} className="flex-1 flex flex-col items-center py-3 gap-0.5">
              <Icon size={19} className={active ? 'text-[#7F77DD]' : 'text-white/30'} />
              <span className={`text-[9px] ${active ? 'text-[#7F77DD] font-medium' : 'text-white/30'}`}>
                {label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
