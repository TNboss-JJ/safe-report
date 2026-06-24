'use client'

import Link from 'next/link'
import { Bell, Gift, ShieldCheck } from 'lucide-react'
import { useAuth } from '@/lib/auth/AuthContext'
import { useState } from 'react'

export default function AppHeader() {
  const { user } = useAuth()
  const [toast, setToast] = useState<string | null>(null)

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }

  return (
    <>
      <header className="sticky top-0 z-50 h-[54px] flex items-center justify-between px-4"
        style={{ background: 'var(--p800)', boxShadow: '0 2px 12px rgba(5,46,22,0.3)' }}>
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-[10px] flex items-center justify-center"
            style={{ background: 'var(--p500)', boxShadow: '0 0 0 3px rgba(34,197,94,0.3)' }}>
            <ShieldCheck size={18} className="text-white" />
          </div>
          <div>
            <div className="text-white font-black text-[16px] tracking-tight leading-none">세이프리포트</div>
            <div className="text-[9.5px] font-semibold tracking-widest leading-none mt-0.5" style={{ color: 'var(--p300)' }}>
              SafeReport · 시민 안전망
            </div>
          </div>
        </div>
        <div className="flex gap-1">
          <button onClick={() => showToast('알림 기능은 준비 중이에요 🔔')}
            className="w-9 h-9 rounded-[10px] flex items-center justify-center relative" style={{ color: 'var(--p300)' }}>
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
              style={{ background: 'var(--danger)', border: '1.5px solid var(--p800)' }} />
          </button>
          <Link href="/account"
            className="w-9 h-9 rounded-[10px] flex items-center justify-center" style={{ color: 'var(--p300)' }}>
            <Gift size={20} />
          </Link>
          <Link href="/account"
            className="w-9 h-9 rounded-[10px] flex items-center justify-center relative"
            style={{ color: user ? 'var(--p400)' : 'var(--p300)' }}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
            </svg>
            {user && (
              <span className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
                style={{ background: 'var(--p500)', border: '1.5px solid var(--p800)' }} />
            )}
          </Link>
        </div>
      </header>

      {/* 티커 */}
      <div className="flex items-center gap-2 px-3 py-2 overflow-hidden" style={{ background: 'var(--p700)' }}>
        <span className="shrink-0 flex items-center gap-1 text-white text-[11px] font-bold px-2 py-0.5 rounded"
          style={{ background: 'rgba(255,255,255,0.15)' }}>
          📢 공지
        </span>
        <div className="text-[12px] whitespace-nowrap overflow-hidden" style={{ color: 'rgba(255,255,255,0.9)' }}>
          <span className="inline-block animate-[ticker_22s_linear_infinite]">
            감사합니다. 많은 제보 부탁드립니다 &nbsp;•&nbsp; CCTV 확인 도구 베타 오픈 &nbsp;•&nbsp; 택시 번호 조회 서비스 시작 &nbsp;•&nbsp; 어린이 안전 필터 신규 오픈 &nbsp;•&nbsp; 허위 제보 시 계정 영구 정지
            &nbsp;&nbsp;&nbsp;&nbsp;
            감사합니다. 많은 제보 부탁드립니다 &nbsp;•&nbsp; CCTV 확인 도구 베타 오픈 &nbsp;•&nbsp; 택시 번호 조회 서비스 시작
          </span>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed top-[70px] left-1/2 z-[200] -translate-x-1/2 px-4 py-2.5 rounded-xl text-white text-[13px] font-bold shadow-lg"
          style={{ background: 'rgba(5,46,22,0.92)', backdropFilter: 'blur(6px)' }}>
          {toast}
        </div>
      )}
    </>
  )
}
