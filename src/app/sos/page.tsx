import { EMERGENCY_CONTACTS } from '@/constants'
import { Siren, Phone, ShieldAlert } from 'lucide-react'

const CONTACT_COLORS: Record<string, string> = {
  danger: 'bg-red-500 text-white',
  safe:   'bg-green-600 text-white',
  blue:   'bg-blue-600 text-white',
  purple: 'bg-purple-600 text-white',
}

export default function SosPage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-6 space-y-5">

      <div className="bg-[#dc2626] rounded-2xl p-5 text-white text-center">
        <Siren size={40} className="mx-auto mb-2" />
        <h1 className="text-xl font-bold mb-1">긴급 신고</h1>
        <p className="text-sm text-red-200">아래 번호를 눌러 즉시 연결하세요</p>
      </div>

      <div className="space-y-3">
        {EMERGENCY_CONTACTS.map((c) => (
          <a
            key={c.number}
            href={`tel:${c.number}`}
            className="flex items-center gap-4 bg-white rounded-2xl px-5 py-4 shadow-sm border border-green-100 active:scale-[0.98] transition-transform"
          >
            <span className={`w-16 text-center text-xl font-black rounded-xl py-2 ${CONTACT_COLORS[c.color] ?? 'bg-gray-500 text-white'}`}>
              {c.number}
            </span>
            <div className="flex-1">
              <p className="font-bold text-gray-900">{c.name}</p>
              <p className="text-xs text-gray-400 mt-0.5">{c.desc}</p>
            </div>
            <Phone size={20} className="text-gray-400 shrink-0" />
          </a>
        ))}
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 flex gap-3">
        <ShieldAlert size={20} className="text-yellow-600 shrink-0 mt-0.5" />
        <p className="text-xs text-yellow-800">
          <strong>생명이 위험한 상황</strong>이라면 112 또는 119로 즉시 신고하세요.<br />
          위치는 자동으로 전송됩니다.
        </p>
      </div>
    </div>
  )
}
