import Link from 'next/link'
import { EMERGENCY_CONTACTS, REPORT_TYPES } from '@/constants'
import {
  Map, Megaphone, Siren, AlertTriangle, Car, Eye, BriefcaseBusiness,
  MapPin, Flame, Phone, Search, Phone as PhoneIcon,
} from 'lucide-react'

const TYPE_ICONS: Record<string, React.ReactNode> = {
  alert:    <AlertTriangle size={22} className="text-red-500" />,
  car:      <Car size={22} className="text-yellow-600" />,
  eye:      <Eye size={22} className="text-blue-500" />,
  chat:     <BriefcaseBusiness size={22} className="text-orange-500" />,
  location: <MapPin size={22} className="text-green-600" />,
  flame:    <Flame size={22} className="text-orange-600" />,
  phone:    <Phone size={22} className="text-purple-600" />,
  search:   <Search size={22} className="text-gray-500" />,
}

const CONTACT_COLORS: Record<string, string> = {
  danger: 'bg-red-100 text-red-600',
  safe:   'bg-green-100 text-green-700',
  blue:   'bg-blue-100 text-blue-700',
  purple: 'bg-purple-100 text-purple-700',
}

export default function HomePage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-6 space-y-6">

      {/* 히어로 */}
      <section className="bg-[#052e16] rounded-2xl p-5 text-white">
        <p className="text-xs text-green-300 mb-1">우리 동네 안전망</p>
        <h1 className="text-xl font-bold leading-snug mb-4">
          위험 정보를 함께 나눠<br />더 안전한 동네를 만들어요
        </h1>
        <div className="flex gap-3">
          <Link
            href="/community/new"
            className="flex-1 bg-[#16a34a] text-white text-sm font-semibold py-2.5 rounded-xl text-center flex items-center justify-center gap-1.5"
          >
            <Megaphone size={15} /> 제보하기
          </Link>
          <Link
            href="/map"
            className="flex-1 bg-white/10 text-white text-sm font-semibold py-2.5 rounded-xl text-center flex items-center justify-center gap-1.5"
          >
            <Map size={15} /> 지도 보기
          </Link>
        </div>
      </section>

      {/* SOS 긴급 배너 */}
      <Link href="/sos" className="flex items-center gap-3 bg-[#dc2626] rounded-2xl p-4 text-white">
        <Siren size={32} className="shrink-0" />
        <div>
          <p className="font-bold">지금 위험한가요?</p>
          <p className="text-sm text-red-200">즉시 신고 · 긴급연락처 바로가기</p>
        </div>
        <span className="ml-auto text-2xl leading-none">›</span>
      </Link>

      {/* 제보 유형 빠른 선택 */}
      <section>
        <h2 className="text-sm font-semibold text-gray-500 mb-3">어떤 상황인가요?</h2>
        <div className="grid grid-cols-4 gap-2">
          {REPORT_TYPES.map((type) => (
            <Link
              key={type.id}
              href={`/community/new?type=${type.id}`}
              className="bg-white rounded-xl p-3 text-center shadow-sm border border-green-100 active:bg-green-50 flex flex-col items-center gap-1"
            >
              {TYPE_ICONS[type.icon]}
              <p className="text-[11px] font-medium text-gray-700 leading-tight">{type.label}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 긴급 연락처 */}
      <section>
        <h2 className="text-sm font-semibold text-gray-500 mb-3">긴급 연락처</h2>
        <div className="space-y-2">
          {EMERGENCY_CONTACTS.map((c) => (
            <a
              key={c.number}
              href={`tel:${c.number}`}
              className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm border border-green-100"
            >
              <span className={`w-14 text-center text-base font-black rounded-lg py-1 ${CONTACT_COLORS[c.color] ?? 'bg-gray-100 text-gray-600'}`}>
                {c.number}
              </span>
              <div>
                <p className="text-sm font-semibold text-gray-800">{c.name}</p>
                <p className="text-xs text-gray-400">{c.desc}</p>
              </div>
              <PhoneIcon size={16} className="ml-auto text-green-500 shrink-0" />
            </a>
          ))}
        </div>
      </section>

      <div className="h-4" />
    </div>
  )
}
