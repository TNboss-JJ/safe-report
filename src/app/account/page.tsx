'use client'

import { ShieldCheck, LogOut, Calendar, Megaphone, Star, Link as LinkIcon } from 'lucide-react'
import { useAuth } from '@/lib/auth/AuthContext'

const EARN_ITEMS = [
  { Icon: Calendar, name: '매일 출석', sub: '하루 1회', pts: '+10P' },
  { Icon: Megaphone, name: '제보 작성', sub: '검증 후 지급', pts: '+50P' },
  { Icon: Star, name: '제보 검증 참여', sub: '"나도 목격" 클릭', pts: '+5P' },
  { Icon: LinkIcon, name: '친구 초대', sub: '가입 확인 후', pts: '+100P' },
]

function KakaoIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M12 3C6.48 3 2 6.69 2 11.25c0 2.9 1.9 5.46 4.75 6.93l-1.2 4.5c-.1.38.32.68.65.46L11.5 20.1c.16.02.33.03.5.03 5.52 0 10-3.69 10-8.25C22 6.69 17.52 3 12 3z"/>
    </svg>
  )
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  )
}

export default function AccountPage() {
  const { user, signInWithKakao, signInWithGoogle, signOut } = useAuth()

  if (user) {
    return (
      <div className="max-w-lg mx-auto px-4 py-5 space-y-4">
        <div className="rounded-2xl p-5 text-white" style={{ background: 'linear-gradient(135deg, var(--p700), var(--p500))', boxShadow: '0 6px 22px rgba(22,163,74,0.3)' }}>
          <p className="text-[12px] opacity-80 mb-1">내 포인트</p>
          <p className="text-[38px] font-black mb-1">0 P</p>
          <p className="text-[13px] opacity-75">{user.email ?? '사용자'}</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'var(--p100)', color: 'var(--p700)' }}>
              <ShieldCheck size={24} />
            </div>
            <div>
              <p className="font-black text-[16px]" style={{ color: 'var(--text)' }}>로그인됨</p>
              <p className="text-[12px]" style={{ color: 'var(--text3)' }}>{user.email}</p>
            </div>
          </div>
          <button onClick={signOut}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-[14px] font-bold border"
            style={{ background: 'var(--white)', borderColor: 'var(--border)', color: 'var(--text3)' }}>
            <LogOut size={16} /> 로그아웃
          </button>
        </div>

        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border" style={{ borderColor: 'var(--border)' }}>
          {EARN_ITEMS.map((item, i) => (
            <div key={item.name} className="flex items-center gap-3 px-4 py-3.5"
              style={{ borderBottom: i < EARN_ITEMS.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'var(--p50)', color: 'var(--p700)' }}>
                <item.Icon size={17} />
              </div>
              <div className="flex-1">
                <div className="text-[13px] font-bold" style={{ color: 'var(--text)' }}>{item.name}</div>
                <div className="text-[11px] mt-0.5" style={{ color: 'var(--text3)' }}>{item.sub}</div>
              </div>
              <div className="text-[15px] font-black" style={{ color: 'var(--p700)' }}>{item.pts}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-5 space-y-4">
      <div className="rounded-2xl p-5 text-white" style={{ background: 'linear-gradient(135deg, var(--p700), var(--p500))', boxShadow: '0 6px 22px rgba(22,163,74,0.3)' }}>
        <p className="text-[12px] opacity-80 mb-1">내 포인트</p>
        <p className="text-[38px] font-black mb-3">0 P</p>
        <p className="text-[13px] opacity-75">로그인하여 포인트 적립 시작</p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border space-y-3" style={{ borderColor: 'var(--border)' }}>
        <div className="text-center mb-2">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ background: 'var(--p100)', color: 'var(--p700)' }}>
            <ShieldCheck size={28} />
          </div>
          <p className="text-[20px] font-black" style={{ color: 'var(--text)' }}>시작하기</p>
          <p className="text-[13px] mt-1" style={{ color: 'var(--text3)' }}>소셜 계정으로 간편하게 가입하세요</p>
        </div>

        <button onClick={signInWithGoogle}
          className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl text-[14.5px] font-bold border"
          style={{ background: 'var(--white)', borderColor: '#dadce0', color: '#3c4043' }}>
          <GoogleIcon /> Gmail로 시작하기
        </button>

        <button onClick={signInWithKakao}
          className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl text-[14.5px] font-black"
          style={{ background: '#FEE500', color: '#3A1D1D' }}>
          <KakaoIcon /> 카카오로 시작하기
        </button>

        <p className="text-[11px] leading-relaxed text-center pt-1" style={{ color: 'var(--text3)' }}>
          익명 보장 · 위치 인증 후 제보 가능 · 탈퇴 시 즉시 삭제
        </p>
      </div>

      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border" style={{ borderColor: 'var(--border)' }}>
        {EARN_ITEMS.map((item, i) => (
          <div key={item.name} className="flex items-center gap-3 px-4 py-3.5"
            style={{ borderBottom: i < EARN_ITEMS.length - 1 ? '1px solid var(--border)' : 'none' }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'var(--p50)', color: 'var(--p700)' }}>
              <item.Icon size={17} />
            </div>
            <div className="flex-1">
              <div className="text-[13px] font-bold" style={{ color: 'var(--text)' }}>{item.name}</div>
              <div className="text-[11px] mt-0.5" style={{ color: 'var(--text3)' }}>{item.sub}</div>
            </div>
            <div className="text-[15px] font-black" style={{ color: 'var(--p700)' }}>{item.pts}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
