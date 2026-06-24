import { ArrowLeft, MapPin, Eye, MessageCircle, AlertTriangle, CheckCircle, Flame, ShieldAlert } from 'lucide-react'
import Link from 'next/link'

const MOCK_REPORTS = [
  { id: '1', report_type: 'suspicious_person', title: '신도림역 환승통로 — 팔 잡으려는 남성 목격', body: '회색 후드티·검은 마스크 40대 남성이 혼자 이동하는 20대 여성을 뒤따라 팔을 잡으려 시도. 소리치자 도주했습니다. 환승통로 CCTV가 있는 구간이지만 사각지대 쪽에서 발생. 비슷한 목격 경험 있으신 분 댓글 달아주세요.', address: '서울 구로구 신도림동', risk_level: 'high', verify_count: 12, is_verified: true, created_at: '2026-06-24T01:00:00Z', views: 1204, comments: 47, source_note: '직접 목격', is_anonymous: true },
  { id: '2', report_type: 'suspicious_vehicle', title: '화곡동 초등학교 앞 — 흰 스타렉스 3일째 하교 시간 정차', body: '하교 시간대에만 나타나고 창문 완전 선팅. 번호판 앞 두 자리 69. 3명 동일 차량 제보 중. 학교 측에 연락했으나 아직 미확인 상태입니다.', address: '서울 강서구 화곡동', risk_level: 'high', verify_count: 8, is_verified: false, created_at: '2026-06-24T00:00:00Z', views: 283, comments: 26, source_note: '직접 목격', is_anonymous: true },
  { id: '3', report_type: 'job_bait', title: '부평지하상가 취업 미끼 접근당했어요 — 비슷한 경험?', body: '모델 채용이라며 명함 주고 상가 안쪽으로 유도하려 했어요. 40대 여성+30대 남성 2인조. 명함에 적힌 번호는 없는 번호였습니다.', address: '인천 부평구 부평동', risk_level: 'medium', verify_count: 5, is_verified: false, created_at: '2026-06-23T21:00:00Z', views: 592, comments: 0, source_note: '직접 경험', is_anonymous: false },
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

export default function ReportDetailPage({ params }: { params: { id: string } }) {
  const report = MOCK_REPORTS.find(r => r.id === params.id)

  if (!report) {
    return (
      <div className="max-w-lg mx-auto px-4 py-10 text-center">
        <ShieldAlert size={40} className="mx-auto mb-3" style={{ color: 'var(--text3)' }} />
        <p className="text-[18px] font-black mb-2" style={{ color: 'var(--text)' }}>제보를 찾을 수 없어요</p>
        <p className="text-[13px] mb-5" style={{ color: 'var(--text3)' }}>삭제되었거나 존재하지 않는 제보입니다.</p>
        <Link href="/community" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-[14px] font-bold" style={{ background: 'var(--p600)' }}>
          커뮤니티로 돌아가기
        </Link>
      </div>
    )
  }

  const risk = RISK_STYLES[report.risk_level]

  return (
    <div className="max-w-lg mx-auto">
      {/* 상단 바 */}
      <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ borderColor: 'var(--border)', background: 'var(--white)' }}>
        <Link href="/community" className="p-1 rounded-lg" style={{ color: 'var(--text)' }}>
          <ArrowLeft size={22} />
        </Link>
        <span className="text-[15px] font-black" style={{ color: 'var(--text)' }}>제보 상세</span>
      </div>

      <div className="px-4 py-4">
        {/* 배지 */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1"
            style={{ background: risk.bg, color: risk.color }}>
            <AlertTriangle size={11} /> {risk.label}
          </span>
          {report.is_verified && (
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1"
              style={{ background: 'var(--p50)', color: 'var(--p700)' }}>
              <CheckCircle size={11} /> 목격 확인됨
            </span>
          )}
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1"
            style={{ background: 'var(--warn-bg)', color: 'var(--warn)' }}>
            <Flame size={11} /> 핫이슈
          </span>
        </div>

        {/* 제목 */}
        <h1 className="text-[20px] font-black leading-snug mb-3" style={{ color: 'var(--text)' }}>{report.title}</h1>

        {/* 메타 */}
        <div className="flex flex-wrap gap-3 text-[12px] mb-4 pb-4 border-b" style={{ color: 'var(--text3)', borderColor: 'var(--border)' }}>
          <span className="flex items-center gap-1"><MapPin size={12} /> {report.address}</span>
          <span className="flex items-center gap-1"><Eye size={12} /> {report.views}</span>
          <span className="flex items-center gap-1"><MessageCircle size={12} /> {report.comments}</span>
          <span className="ml-auto">{timeAgo(report.created_at)}</span>
        </div>

        {/* 본문 */}
        <p className="text-[14.5px] leading-relaxed mb-5" style={{ color: 'var(--text2)' }}>{report.body}</p>

        {/* 출처/익명 */}
        <div className="rounded-2xl p-4 mb-4 space-y-2" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
          <div className="flex justify-between text-[12.5px]">
            <span style={{ color: 'var(--text3)' }}>출처</span>
            <span className="font-bold" style={{ color: 'var(--text)' }}>{report.source_note}</span>
          </div>
          <div className="flex justify-between text-[12.5px]">
            <span style={{ color: 'var(--text3)' }}>작성자</span>
            <span className="font-bold" style={{ color: 'var(--text)' }}>{report.is_anonymous ? '익명' : '실명'}</span>
          </div>
        </div>

        {/* 나도 목격 버튼 */}
        <button className="w-full py-4 rounded-2xl text-white text-[15px] font-black flex items-center justify-center gap-2 mb-3"
          style={{ background: 'var(--p600)' }}>
          <CheckCircle size={18} /> 나도 목격했어요 +5P
        </button>

        <div className="flex gap-2">
          <button className="flex-1 py-3 rounded-xl text-[13.5px] font-bold border flex items-center justify-center gap-2"
            style={{ borderColor: 'var(--border)', color: 'var(--text3)' }}>
            <ShieldAlert size={15} /> 허위 신고
          </button>
          <button className="flex-1 py-3 rounded-xl text-[13.5px] font-bold border flex items-center justify-center gap-2"
            style={{ borderColor: 'var(--border)', color: 'var(--text3)' }}>
            공유하기
          </button>
        </div>

        {/* 댓글 섹션 */}
        <div className="mt-5 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
          <h2 className="text-[16px] font-black mb-3 flex items-center gap-2" style={{ color: 'var(--text)' }}>
            <MessageCircle size={16} /> 댓글 {report.comments}
          </h2>
          <div className="rounded-2xl p-4 text-center" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
            <p className="text-[13px]" style={{ color: 'var(--text3)' }}>댓글을 남기려면 로그인이 필요해요</p>
            <Link href="/account" className="inline-block mt-2 text-[13px] font-bold" style={{ color: 'var(--p600)' }}>
              로그인하기 →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
