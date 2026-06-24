import { User, Star, Megaphone, LogIn } from 'lucide-react'
import Link from 'next/link'

export default function AccountPage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-6 space-y-5">

      {/* 비로그인 상태 (임시) */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-100 text-center space-y-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <User size={32} className="text-green-600" />
        </div>
        <div>
          <p className="font-bold text-gray-900 text-lg">로그인이 필요합니다</p>
          <p className="text-sm text-gray-400 mt-1">제보하고 포인트를 쌓아보세요</p>
        </div>
        <Link
          href="/account/login"
          className="flex items-center justify-center gap-2 bg-[#16a34a] text-white font-semibold py-3 rounded-xl w-full"
        >
          <LogIn size={18} /> 로그인 / 회원가입
        </Link>
      </div>

      {/* 포인트 안내 */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-green-100 space-y-3">
        <p className="font-semibold text-gray-900 text-sm">포인트 적립 안내</p>
        <div className="space-y-2">
          {[
            { label: '매일 출석', point: '+10P' },
            { label: '제보 등록', point: '+50P' },
            { label: '목격 확인', point: '+5P' },
            { label: '친구 초대', point: '+100P' },
          ].map((item) => (
            <div key={item.label} className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Star size={14} className="text-yellow-400" />
                {item.label}
              </div>
              <span className="text-sm font-bold text-green-600">{item.point}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 내 제보 */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-green-100">
        <div className="flex items-center gap-2 mb-3">
          <Megaphone size={16} className="text-gray-500" />
          <p className="font-semibold text-gray-900 text-sm">내 제보</p>
        </div>
        <p className="text-sm text-gray-400 text-center py-4">로그인 후 확인할 수 있습니다</p>
      </div>
    </div>
  )
}
