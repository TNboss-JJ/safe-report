'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Map, Megaphone, Trophy, Wrench, Newspaper, Baby } from 'lucide-react'

const TABS = [
  { href: '/',          label: '지도',    Icon: Map },
  { href: '/community', label: '커뮤니티', Icon: Megaphone },
  { href: '/ranking',   label: '랭킹',    Icon: Trophy },
  { href: '/safety',    label: '안전도구', Icon: Wrench },
  { href: '/news',      label: '뉴스',    Icon: Newspaper },
  { href: '/kids',      label: '어린이',  Icon: Baby },
] as const

export default function TopTabBar() {
  const pathname = usePathname()

  return (
    <div className="sticky z-40 flex overflow-x-auto scrollbar-hide px-1"
      style={{ top: '54px', background: 'var(--p800)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      {TABS.map(({ href, label, Icon }) => {
        const active = pathname === href || (href !== '/' && pathname.startsWith(href))
        return (
          <Link key={href} href={href}
            className="shrink-0 flex items-center gap-1.5 px-3 py-2.5 text-[12px] font-bold whitespace-nowrap border-b-2 transition-all"
            style={{
              color: active ? 'var(--p400)' : 'rgba(255,255,255,0.45)',
              borderBottomColor: active ? 'var(--p400)' : 'transparent',
            }}>
            <Icon size={14} />
            {label}
          </Link>
        )
      })}
    </div>
  )
}
