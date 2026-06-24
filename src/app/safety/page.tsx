import { ShieldCheck, Cctv, Bell, Package, Building2 } from 'lucide-react'
import Link from 'next/link'

const SAFETY_ITEMS = [
  {
    icon: <Cctv size={24} className="text-blue-600" />,
    title: 'CCTV 위치',
    desc: '내 주변 방범 CCTV 확인',
    href: '/map?layer=cctv',
    bg: 'bg-blue-50',
  },
  {
    icon: <Bell size={24} className="text-green-600" />,
    title: '안전 비상벨',
    desc: '가장 가까운 비상벨 찾기',
    href: '/map?layer=bell',
    bg: 'bg-green-50',
  },
  {
    icon: <Package size={24} className="text-purple-600" />,
    title: '여성안심택배함',
    desc: '안전한 택배 수령 장소',
    href: '/map?layer=safebox',
    bg: 'bg-purple-50',
  },
  {
    icon: <Building2 size={24} className="text-orange-600" />,
    title: '경찰서·파출소',
    desc: '주변 치안 시설 확인',
    href: '/map?layer=police',
    bg: 'bg-orange-50',
  },
]

export default function SafetyPage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-6 space-y-5">

      <div className="flex items-center gap-2">
        <ShieldCheck size={22} className="text-[#16a34a]" />
        <h1 className="text-lg font-bold text-gray-900">안전 시설</h1>
      </div>

      <p className="text-sm text-gray-500">내 주변 안전 시설을 지도에서 확인하세요.</p>

      <div className="grid grid-cols-2 gap-3">
        {SAFETY_ITEMS.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className={`${item.bg} rounded-2xl p-4 flex flex-col gap-3 border border-white shadow-sm active:scale-[0.97] transition-transform`}
          >
            {item.icon}
            <div>
              <p className="font-bold text-gray-900 text-sm">{item.title}</p>
              <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-[#f0fdf4] border border-green-200 rounded-2xl p-4">
        <p className="text-xs text-green-800">
          <strong>공공데이터 기반</strong> — 행정안전부 데이터를 매일 동기화합니다.<br />
          실제 위치와 차이가 있을 수 있으니 참고용으로 활용하세요.
        </p>
      </div>
    </div>
  )
}
