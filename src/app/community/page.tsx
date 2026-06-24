import Link from 'next/link'
import { Megaphone, Eye, MessageCircle, AlertTriangle, CheckCircle, MapPin, Flame } from 'lucide-react'
import { REPORT_TYPES } from '@/constants'

const MOCK_REPORTS = [
  { id: '1', report_type: 'suspicious_vehicle', title: '신도림역 환승통로 — 팔 잡으려는 남성 목격', body: '회색 후드티·검은 마스크 40대 남성이 혼자 이동하는 20대 여성을 뒤따라 팔을 잡으려 시도. 소리치자 도주...', address: '서울 구로구 신도림동', risk_level: 'high', verify_count: 12, is_verified: true, created_at: '2026-06-24T01:00:00Z', views: 1204, comments: 47 },
  { id: '2', report_type: 'suspicious_vehicle', title: '화곡동 초등학교 앞 — 흰 스타렉스 3일째 하교 시간 정차', body: '하교 시간대에만 나타나고 창문 완전 선팅. 번호판 앞 두 자리 69. 3명 동일 차량 제보 중...', address: '서울 강서구 화곡동', risk_level: 'high', verify_count: 8, is_verified: false, created_at: '2026-06-24T00:00:00Z', views: 283, comments: 26 },
  { id: '3', report_type: 'job_bait', title: '부평지하상가 취업 미끼 접근당했어요 — 비슷한 경험?', body: '모델 채용이라며 명함 주고 상가 안쪽으로 유도하려 했어요. 40대 여성+30대 남성 2인조...', address: '인천 부평구 부평동', risk_level: 'medium', verify_count: 5, is_verified: false, created_at: '2026-06-23T21:00:00Z', views: 592, comments: 0 },
]

const RISK_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  low:      { bg: '#f3f4f6', color: '#6b7280', label: '낮음' },
  medium:   { bg: 'var(--warn-bg)', color: 'var(--warn)', label: '주의' },
  high:     { bg: 'var(--danger-bg)', color: 'var(--danger)', label: '위험' },
  critical: { bg: 'var(--danger)', color: '#fff', label: '긴급' },
}

function timeAgo(iso: string) {
  const h = Math.floor((Date.now() - new Date(iso).getTime()) / 3600000)
  if (h < 1) return '방금 전'
  if (h < 24) return `${h}시간 전`
  return `${Math.floor(h / 24)}일 전`
}

function getTypeLabel(type: string) {
  return REPORT_TYPES.find((t) => t.id === type)?.label ?? type
}

export default function CommunityPage() {
  return (
    <div className="max-w-lg mx-auto">
      <div className="px-4 pt-5 pb-0">
        <p className="text-[10.5px] font-black tracking-widest uppercase mb-1" style={{ color: 'var(--p600)' }}>Community</p>
        <h1 className="text-[26px] font-black mb-1" style={{ color: 'var(--text)' }}>커뮤니티</h1>
        <p className="text-[13px] leading-relaxed mb-4" style={{ color: 'var(--text3)' }}>안전 제보, 목격담, 이웃과 자유롭게 나눠보세요.</p>
        <div className="grid grid-cols-2 gap-2.5 mb-4">
          <Link href="/community/new"
            className="flex items-center justify-center gap-2 py-3 rounded-xl border font-bold text-[13.5px] transition-colors"
            style={{ borderColor: 'var(--border)', background: 'var(--white)', color: 'var(--text)' }}>
            <Megaphone size={16} /> 제보하기
          </Link>
          <button className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-[13.5px] text-white"
            style={{ background: 'var(--p600)' }}>
            <MessageCircle size={16} /> 글쓰기
          </button>
        </div>
      </div>

      {/* 필터 */}
      <div className="flex items-center justify-between px-4 mb-3">
        <h2 className="text-[17px] font-black" style={{ color: 'var(--text)' }}>안전 이야기</h2>
        <div className="flex gap-1.5">
          {['추천순', '지역'].map((f, i) => (
            <button key={f} className="px-3 py-1 rounded-full text-[12px] font-semibold border"
              style={{ background: i === 0 ? 'var(--p50)' : 'var(--white)', color: i === 0 ? 'var(--p700)' : 'var(--text3)', borderColor: i === 0 ? 'var(--p600)' : 'var(--border)' }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 space-y-2.5">
        {MOCK_REPORTS.map((report) => {
          const risk = RISK_STYLES[report.risk_level]
          return (
            <Link key={report.id} href={`/community/${report.id}`}>
              <div className="bg-white rounded-2xl p-4 shadow-sm border flex gap-3 transition-all cursor-pointer"
                style={{ borderColor: 'var(--border)' }}>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap gap-1.5 mb-1.5">
                    <span className="text-[10.5px] font-bold px-2 py-0.5 rounded flex items-center gap-1"
                      style={{ background: risk.bg, color: risk.color }}>
                      <AlertTriangle size={10} /> {risk.label}
                    </span>
                    <span className="text-[10.5px] font-bold px-2 py-0.5 rounded" style={{ background: 'var(--warn-bg)', color: 'var(--warn)' }}>
                      <Flame size={10} className="inline mr-0.5" /> 핫이슈
                    </span>
                    {report.is_verified && (
                      <span className="text-[10.5px] font-bold px-2 py-0.5 rounded flex items-center gap-1 ml-auto"
                        style={{ background: 'var(--p50)', color: 'var(--p700)' }}>
                        <CheckCircle size={10} /> 목격확인
                      </span>
                    )}
                  </div>
                  <p className="text-[14.5px] font-black leading-snug mb-1.5" style={{ color: 'var(--text)' }}>{report.title}</p>
                  <p className="text-[12.5px] leading-relaxed mb-2 line-clamp-2" style={{ color: 'var(--text3)' }}>{report.body}</p>
                  <div className="flex items-center gap-3 text-[11px]" style={{ color: '#9ca3af' }}>
                    <span className="flex items-center gap-1"><MapPin size={11} /> {report.address}</span>
                    <span className="flex items-center gap-1"><Eye size={11} /> {report.views}</span>
                    <span className="flex items-center gap-1"><MessageCircle size={11} /> {report.comments}</span>
                    <span className="ml-auto">{timeAgo(report.created_at)}</span>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
      <div className="h-4" />
    </div>
  )
}
