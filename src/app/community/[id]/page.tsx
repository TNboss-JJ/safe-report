import { ArrowLeft, MapPin, Eye, AlertTriangle, CheckCircle, Flame, ShieldAlert } from 'lucide-react'
import Link from 'next/link'
import { createServerSupabase } from '@/lib/api/supabase-server'
import VerifyButton from './VerifyButton'
import CommentSection from './CommentSection'
import type { ReportRow } from '@/types/database'

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

export default async function ReportDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createServerSupabase()

  const { data: report } = await supabase
    .from('reports')
    .select('*')
    .eq('id', id)
    .eq('is_hidden', false)
    .maybeSingle() as { data: ReportRow | null }

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

  const risk = RISK_STYLES[report.risk_level ?? 'medium']

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ borderColor: 'var(--border)', background: 'var(--white)' }}>
        <Link href="/community" className="p-1 rounded-lg" style={{ color: 'var(--text)' }}>
          <ArrowLeft size={22} />
        </Link>
        <span className="text-[15px] font-black" style={{ color: 'var(--text)' }}>제보 상세</span>
      </div>

      <div className="px-4 py-4">
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
          {(report.verify_count ?? 0) >= 3 && (
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1"
              style={{ background: 'var(--warn-bg)', color: 'var(--warn)' }}>
              <Flame size={11} /> 핫이슈
            </span>
          )}
        </div>

        <h1 className="text-[20px] font-black leading-snug mb-3" style={{ color: 'var(--text)' }}>{report.title}</h1>

        <div className="flex flex-wrap gap-3 text-[12px] mb-4 pb-4 border-b" style={{ color: 'var(--text3)', borderColor: 'var(--border)' }}>
          {report.address && <span className="flex items-center gap-1"><MapPin size={12} /> {report.address}</span>}
          <span className="flex items-center gap-1"><Eye size={12} /> {report.view_count ?? 0}</span>
          <span className="flex items-center gap-1"><CheckCircle size={12} /> 목격 {report.verify_count ?? 0}</span>
          <span className="ml-auto">{timeAgo(report.created_at)}</span>
        </div>

        <p className="text-[14.5px] leading-relaxed mb-5" style={{ color: 'var(--text2)' }}>{report.body}</p>

        <div className="rounded-2xl p-4 mb-4 space-y-2" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
          <div className="flex justify-between text-[12.5px]">
            <span style={{ color: 'var(--text3)' }}>출처</span>
            <span className="font-bold" style={{ color: 'var(--text)' }}>{report.source_note ?? '직접 목격'}</span>
          </div>
          <div className="flex justify-between text-[12.5px]">
            <span style={{ color: 'var(--text3)' }}>작성자</span>
            <span className="font-bold" style={{ color: 'var(--text)' }}>{report.is_anonymous ? '익명' : '실명'}</span>
          </div>
        </div>

        <VerifyButton reportId={report.id} verifyCount={report.verify_count ?? 0} />

        <div className="flex gap-2 mt-3">
          <button className="flex-1 py-3 rounded-xl text-[13.5px] font-bold border flex items-center justify-center gap-2"
            style={{ borderColor: 'var(--border)', color: 'var(--text3)' }}>
            <ShieldAlert size={15} /> 허위 신고
          </button>
          <button className="flex-1 py-3 rounded-xl text-[13.5px] font-bold border flex items-center justify-center gap-2"
            style={{ borderColor: 'var(--border)', color: 'var(--text3)' }}>
            공유하기
          </button>
        </div>

        <CommentSection reportId={report.id} />
      </div>
    </div>
  )
}
