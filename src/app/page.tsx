import Link from 'next/link'
import { EMERGENCY_CONTACTS, REPORT_TYPES } from '@/constants'

export default function HomePage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-6 space-y-6">

      {/* 히어로 */}
      <section className="bg-[#052e16] rounded-2xl p-5 text-white">
        <p className="text-xs text-green-300 mb-1">우리 동네 안전망</p>
        <h1 className="text-xl font-bold leading-snug mb-3">
          위험 정보를 함께 나눠<br />더 안전한 동네를 만들어요
        </h1>
        <div className="flex gap-3">
          <Link
            href="/community/new"
            className="flex-1 bg-[#16a34a] text-white text-sm font-semibold py-2.5 rounded-xl text-center"
          >
            📢 제보하기
          </Link>
          <Link
            href="/map"
            className="flex-1 bg-white/10 text-white text-sm font-semibold py-2.5 rounded-xl text-center"
          >
            🗺️ 지도 보기
          </Link>
        </div>
      </section>

      {/* SOS 긴급 배너 */}
      <Link href="/sos" className="block bg-[#dc2626] rounded-2xl p-4 text-white flex items-center gap-3">
        <span className="text-3xl">🆘</span>
        <div>
          <p className="font-bold">지금 위험한가요?</p>
          <p className="text-sm text-red-200">즉시 신고 · 긴급연락처 바로가기</p>
        </div>
        <span className="ml-auto text-2xl">›</span>
      </Link>

      {/* 제보 유형 빠른 선택 */}
      <section>
        <h2 className="text-sm font-semibold text-gray-500 mb-3">어떤 상황인가요?</h2>
        <div className="grid grid-cols-3 gap-2">
          {REPORT_TYPES.map((type) => (
            <Link
              key={type.id}
              href={`/community/new?type=${type.id}`}
              className="bg-white rounded-xl p-3 text-center shadow-sm border border-green-100 active:bg-green-50"
            >
              <p className="text-2xl mb-1">
                {type.icon === 'alert' ? '⚠️' :
                 type.icon === 'car'   ? '🚗' :
                 type.icon === 'eye'   ? '👁️' :
                 type.icon === 'chat'  ? '💬' :
                 type.icon === 'location' ? '📍' : '🔍'}
              </p>
              <p className="text-xs font-medium text-gray-700">{type.label}</p>
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
              <span
                className={`w-12 text-center text-lg font-black rounded-lg py-1 ${
                  c.color === 'danger' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-700'
                }`}
              >
                {c.number}
              </span>
              <div>
                <p className="text-sm font-semibold text-gray-800">{c.name}</p>
                <p className="text-xs text-gray-400">{c.desc}</p>
              </div>
              <span className="ml-auto text-green-500">📞</span>
            </a>
          ))}
        </div>
      </section>

      {/* 하단 여백 (탭바) */}
      <div className="h-4" />
    </div>
  )
}
