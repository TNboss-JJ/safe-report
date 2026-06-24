'use client'

import { useState } from 'react'
import { Phone, Shield, Search, Users, Flame, X } from 'lucide-react'
import { EMERGENCY_CONTACTS } from '@/constants'

const CONTACT_ICONS: Record<string, React.ReactNode> = {
  '112':  <Shield size={20} />,
  '182':  <Search size={20} />,
  '1366': <Users size={20} />,
  '1388': <Users size={20} />,
  '119':  <Flame size={20} />,
  '1332': <Phone size={20} />,
}

export default function SosFloat() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* SOS 버튼 */}
      <button
        onClick={() => setOpen(true)}
        className="fixed z-50 flex flex-col items-center justify-center gap-0.5 rounded-full"
        style={{
          bottom: 'calc(var(--nav-h) + 14px)',
          right: '14px',
          width: '58px',
          height: '58px',
          background: 'var(--danger)',
          boxShadow: '0 4px 20px rgba(220,38,38,0.55)',
          animation: 'pulse 2s ease-in-out infinite',
        }}
      >
        <Phone size={20} className="text-white" />
        <span className="text-white text-[11px] font-black tracking-wide">SOS</span>
      </button>

      {/* SOS 모달 */}
      {open && (
        <div className="fixed inset-0 z-[100] flex items-end"
          style={{ background: 'rgba(5,46,22,0.5)', backdropFilter: 'blur(3px)' }}
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
          <div className="w-full bg-white rounded-t-3xl max-h-[90vh] overflow-y-auto pb-8"
            style={{ animation: 'slideUp 0.28s ease' }}>
            <div className="w-10 h-1 rounded-full mx-auto mt-3 mb-5" style={{ background: 'var(--border)' }} />
            <h2 className="text-[19px] font-black px-5 mb-4" style={{ color: 'var(--text)' }}>긴급 연락처</h2>

            {/* 112 배너 */}
            <div className="mx-4 mb-4 rounded-2xl p-5 text-white text-center"
              style={{ background: 'var(--danger)', boxShadow: '0 6px 24px rgba(220,38,38,0.4)' }}>
              <div className="text-[52px] font-black leading-none mb-1">112</div>
              <p className="text-[13px] opacity-85 mb-4">지금 위험하다면 즉시 경찰에 신고하세요</p>
              <a href="tel:112"
                className="inline-flex items-center gap-2 bg-white rounded-xl px-7 py-3 text-[16px] font-black"
                style={{ color: 'var(--danger)' }}>
                <Phone size={18} /> 112 바로 전화
              </a>
            </div>

            {/* 연락처 목록 */}
            <div className="mx-4 rounded-2xl overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
              {EMERGENCY_CONTACTS.map((c, i) => (
                <a key={c.number} href={`tel:${c.number}`}
                  className="flex items-center gap-4 px-4 py-4 transition-colors hover:bg-gray-50"
                  style={{ borderBottom: i < EMERGENCY_CONTACTS.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: 'var(--p50)', color: 'var(--p700)' }}>
                    {CONTACT_ICONS[c.number] ?? <Phone size={20} />}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-[14.5px]" style={{ color: 'var(--text)' }}>{c.name}</div>
                    <div className="text-[12.5px] mt-0.5" style={{ color: 'var(--text3)' }}>{c.desc}</div>
                  </div>
                  <span className="text-[20px] font-black" style={{ color: 'var(--p600)' }}>{c.number}</span>
                </a>
              ))}
            </div>

            <button onClick={() => setOpen(false)}
              className="mx-4 mt-3 w-[calc(100%-32px)] flex items-center justify-center gap-2 py-3 rounded-xl text-[14px] font-bold"
              style={{ background: 'var(--bg)', color: 'var(--text3)', border: '1px solid var(--border)' }}>
              <X size={16} /> 닫기
            </button>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes pulse {
          0%,100% { box-shadow: 0 4px 20px rgba(220,38,38,0.55); }
          50% { box-shadow: 0 4px 28px rgba(220,38,38,0.8); }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { scrollbar-width: none; }
      `}</style>
    </>
  )
}
