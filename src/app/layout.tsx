import type { Metadata, Viewport } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import BottomNav from '@/components/shared/BottomNav'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })

export const metadata: Metadata = {
  title: '세이프리포트 — 우리 동네 안전망',
  description: '시민이 함께 만드는 동네 위험 제보 커뮤니티',
  manifest: '/manifest.json',
  appleWebApp: { capable: true, statusBarStyle: 'black-translucent', title: '세이프리포트' },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#052e16',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${geist.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#f0fdf4]">
        <header className="sticky top-0 z-40 h-14 flex items-center px-4 bg-[#052e16] shadow-md">
          <span className="text-white font-bold text-lg tracking-tight">🛡️ 세이프리포트</span>
        </header>

        <main className="flex-1 pb-safe">{children}</main>

        <BottomNav />
      </body>
    </html>
  )
}
