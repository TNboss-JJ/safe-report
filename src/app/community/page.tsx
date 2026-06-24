import Link from 'next/link'
import { REPORT_TYPES } from '@/constants'

// 임시 목업 데이터 (Supabase 연결 후 교체)
const MOCK_REPORTS = [
  {
    id: '1',
    report_type: 'suspicious_vehicle' as const,
    title: '검은 승합차 어린이 접근 시도',
    body: '오늘 오후 3시경 초등학교 앞에서 검은색 카니발이 어린이에게 접근하는 것을 목격했습니다.',
    address: '서울 마포구 망원동',
    risk_level: 'high' as const,
    verify_count: 12,
    is_verified: true,
    is_anonymous: true,
    created_at: '2026-06-23T09:00:00Z',
  },
  {
    id: '2',
    report_type: 'stalking' as const,
    title: '귀갓길 미행 의심 남성',
    body: '지하철역에서 집까지 같은 방향으로 계속 따라오는 남성이 있었습니다.',
    address: '서울 강남구 역삼동',
    risk_level: 'medium' as const,
    verify_count: 5,
    is_verified: false,
    is_anonymous: true,
    created_at: '2026-06-23T07:30:00Z',
  },
  {
    id: '3',
    report_type: 'danger_zone' as const,
    title: 'CCTV 사각지대 골목 위험',
    body: '이면도로 골목 전체가 CCTV 없이 가로등도 없어 밤에 매우 위험합니다.',
    address: '서울 노원구 상계동',
    risk_level: 'medium' as const,
    verify_count: 8,
    is_verified: true,
    is_anonymous: false,
    created_at: '2026-06-22T20:00:00Z',
  },
]

const RISK_STYLES: Record<string, string> = {
  low:      'bg-gray-100 text-gray-600',
  medium:   'bg-yellow-100 text-yellow-700',
  high:     'bg-red-100 text-red-600',
  critical: 'bg-red-600 text-white',
}

const RISK_LABELS: Record<string, string> = {
  low: '낮음', medium: '주의', high: '위험', critical: '긴급',
}

function getTypeLabel(type: string) {
  return REPORT_TYPES.find((t) => t.id === type)?.label ?? type
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const h = Math.floor(diff / 3600000)
  if (h < 1) return '방금 전'
  if (h < 24) return `${h}시간 전`
  return `${Math.floor(h / 24)}일 전`
}

export default function CommunityPage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-5 space-y-4">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-900">시민 제보</h1>
        <Link
          href="/community/new"
          className="bg-[#16a34a] text-white text-sm font-semibold px-4 py-2 rounded-full"
        >
          + 제보하기
        </Link>
      </div>

      {/* 필터 탭 */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {['전체', '납치 시도', '의심 차량', '미행·감시', '위험 장소', '취업 미끼'].map((label, i) => (
          <button
            key={label}
            className={`shrink-0 text-xs px-3 py-1.5 rounded-full font-medium ${
              i === 0 ? 'bg-[#052e16] text-white' : 'bg-white text-gray-500 border border-gray-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* 제보 목록 */}
      <div className="space-y-3">
        {MOCK_REPORTS.map((report) => (
          <Link key={report.id} href={`/community/${report.id}`}>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-green-50 active:bg-green-50">
              <div className="flex items-start gap-2 mb-2">
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${RISK_STYLES[report.risk_level]}`}>
                  {RISK_LABELS[report.risk_level]}
                </span>
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                  {getTypeLabel(report.report_type)}
                </span>
                {report.is_verified && (
                  <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full ml-auto shrink-0">
                    ✓ 목격확인
                  </span>
                )}
              </div>
              <h2 className="font-semibold text-gray-900 mb-1">{report.title}</h2>
              <p className="text-sm text-gray-500 line-clamp-2 mb-3">{report.body}</p>
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <span>📍 {report.address}</span>
                <span>👁 {report.verify_count}명 목격</span>
                <span className="ml-auto">{timeAgo(report.created_at)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="h-4" />
    </div>
  )
}
