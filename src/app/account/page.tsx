'use client'

import { useState } from 'react'
import { ShieldCheck, LogOut, Calendar, Megaphone, Star, Link as LinkIcon, Eye, EyeOff } from 'lucide-react'
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

export default function AccountPage() {
  const { user, signInWithKakao, signInWithEmail, signUpWithEmail, signOut } = useAuth()
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)

  async function handleEmail() {
    if (!email || !password) { setError('이메일과 비밀번호를 입력하세요.'); return }
    setLoading(true); setError(null)
    const fn = mode === 'login' ? signInWithEmail : signUpWithEmail
    const { error: err } = await fn(email, password)
    if (err) setError(err)
    else if (mode === 'signup') setSuccess('확인 이메일을 전송했어요! 이메일을 확인해 주세요.')
    setLoading(false)
  }

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

      <div className="bg-white rounded-2xl p-6 shadow-sm border space-y-4" style={{ borderColor: 'var(--border)' }}>
        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ background: 'var(--p100)', color: 'var(--p700)' }}>
            <ShieldCheck size={28} />
          </div>
          <p className="text-[20px] font-black" style={{ color: 'var(--text)' }}>{mode === 'login' ? '로그인' : '회원가입'}</p>
        </div>

        <button onClick={signInWithKakao}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-[14.5px] font-black"
          style={{ background: '#FEE500', color: '#3A1D1D' }}>
          <KakaoIcon /> 카카오로 시작하기
        </button>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
          <span className="text-[11.5px]" style={{ color: 'var(--text3)' }}>또는 이메일</span>
          <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
        </div>

        <div className="space-y-2.5">
          <input type="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="이메일"
            className="w-full px-4 py-3 rounded-xl text-[14px] outline-none border"
            style={{ borderColor: 'var(--border)', background: 'var(--bg)' }} />
          <div className="relative">
            <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
              placeholder="비밀번호"
              className="w-full px-4 py-3 rounded-xl text-[14px] outline-none border pr-11"
              style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}
              onKeyDown={e => e.key === 'Enter' && handleEmail()} />
            <button type="button" onClick={() => setShowPw(v => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text3)' }}>
              {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {error && <p className="text-[12.5px] text-center" style={{ color: 'var(--danger)' }}>{error}</p>}
        {success && <p className="text-[12.5px] text-center" style={{ color: 'var(--p700)' }}>{success}</p>}

        <button onClick={handleEmail} disabled={loading}
          className="w-full py-3.5 rounded-xl text-[14.5px] font-black text-white"
          style={{ background: loading ? 'var(--p400)' : 'var(--p600)' }}>
          {loading ? '처리 중...' : mode === 'login' ? '로그인' : '가입하기'}
        </button>

        <button onClick={() => { setMode(m => m === 'login' ? 'signup' : 'login'); setError(null); setSuccess(null) }}
          className="w-full text-[12.5px] text-center" style={{ color: 'var(--text3)' }}>
          {mode === 'login' ? '계정이 없으신가요? 회원가입' : '이미 계정이 있으신가요? 로그인'}
        </button>

        <p className="text-[11px] leading-relaxed text-center" style={{ color: 'var(--text3)' }}>
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
