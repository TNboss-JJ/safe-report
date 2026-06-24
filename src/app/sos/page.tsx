import { EMERGENCY_CONTACTS } from '@/constants'
import { Siren, Phone, ShieldAlert } from 'lucide-react'

export default function SosPage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-5 space-y-4">
      <div className="rounded-2xl p-5 text-white text-center"
        style={{ background: 'var(--danger)', boxShadow: '0 6px 24px rgba(220,38,38,0.4)' }}>
        <Siren size={40} className="mx-auto mb-2" />
        <div className="text-[52px] font-black leading-none mb-1">112</div>
        <p className="text-[13px] opacity-85 mb-4">지금 위험하다면 즉시 경찰에 신고하세요</p>
        <a href="tel:112"
          className="inline-flex items-center gap-2 bg-white rounded-xl px-7 py-3 text-[16px] font-black"
          style={{ color: 'var(--danger)' }}>
          <Phone size={18} /> 112 바로 전화
        </a>
      </div>

      <div className="rounded-2xl overflow-hidden border shadow-sm" style={{ borderColor: 'var(--border)' }}>
        {EMERGENCY_CONTACTS.map((c, i) => (
          <a key={c.number} href={`tel:${c.number}`}
            className="flex items-center gap-4 px-4 py-4 bg-white transition-colors hover:bg-gray-50"
            style={{ borderBottom: i < EMERGENCY_CONTACTS.length - 1 ? '1px solid var(--border)' : 'none' }}>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'var(--p50)', color: 'var(--p700)' }}>
              <Phone size={20} />
            </div>
            <div className="flex-1">
              <div className="font-black text-[14.5px]" style={{ color: 'var(--text)' }}>{c.name}</div>
              <div className="text-[12.5px] mt-0.5" style={{ color: 'var(--text3)' }}>{c.desc}</div>
            </div>
            <span className="text-[20px] font-black" style={{ color: 'var(--p600)' }}>{c.number}</span>
          </a>
        ))}
      </div>

      <div className="rounded-2xl p-4 flex gap-3" style={{ background: 'var(--warn-bg)', border: '1px solid #fde68a' }}>
        <ShieldAlert size={20} className="shrink-0 mt-0.5" style={{ color: 'var(--warn)' }} />
        <p className="text-[12.5px] leading-relaxed" style={{ color: '#92400e' }}>
          <strong>생명이 위험한 상황</strong>이라면 112 또는 119로 즉시 신고하세요.<br />
          위치는 자동으로 전송됩니다.
        </p>
      </div>
    </div>
  )
}
