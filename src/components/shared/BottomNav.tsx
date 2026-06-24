'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Map, Megaphone, Trophy, ShieldCheck, Siren } from 'lucide-react'

const NAV_ITEMS = [
  { href: '/map',       label: '지도',  Icon: Map },
  { href: '/community', label: '제보',  Icon: Megaphone },
  { href: '/ranking',   label: '랭킹',  Icon: Trophy },
  { href: '/safety',    label: '안전',  Icon: ShieldCheck },
  { href: '/sos',       label: 'SOS',   Icon: Siren },
] as const

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 h-16 bg-[#052e16] flex items-center justify-around px-2 pb-[env(safe-area-inset-bottom)]">
      {NAV_ITEMS.map(({ href, label, Icon }) => {
        const active = pathname.startsWith(href)
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors ${
              active ? 'text-[#22c55e]' : 'text-green-200/70 hover:text-white'
            }`}
          >
            <Icon size={20} />
            <span className="text-[10px] font-medium">{label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
