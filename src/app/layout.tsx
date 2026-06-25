import type { Metadata, Viewport } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import BottomNav from '@/components/shared/BottomNav'
import TopTabBar from '@/components/shared/TopTabBar'
import SosFloat from '@/components/shared/SosFloat'
import AppHeader from '@/components/shared/AppHeader'
import { AuthProvider } from '@/lib/auth/AuthContext'
import SwRegister from '@/components/shared/SwRegister'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })

export const metadata: Metadata = {
  title: '세이프리포트 | SafeReport',
  description: '시민이 함께 만드는 동네 위험 제보 커뮤니티',
  manifest: '/manifest.json',
  appleWebApp: { capable: true, statusBarStyle: 'black-translucent', title: '세이프리포트' },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#14532d',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={geist.variable}>
      <body className="min-h-screen flex flex-col" style={{ background: 'var(--bg)' }}>
        <AuthProvider>
          <AppHeader />
          <TopTabBar />
          <main className="flex-1 pb-nav">{children}</main>
          <SosFloat />
          <BottomNav />
          <SwRegister />
        </AuthProvider>
      </body>
    </html>
  )
}
