'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Megaphone, Eye, MessageCircle, AlertTriangle, CheckCircle, MapPin, Flame } from 'lucide-react'
import { REPORT_TYPES } from '@/constants'
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTypeLabel(type: string) {
  return REPORT_TYPES.find((t) => t.id === type)?.label ?? type
}

export default function CommunityPage() {
  const [reports, setReports] = useState<ReportRow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/reports?limit=20')
      .then(r => r.json())
      .then(data => { setReports(data.reports ?? []) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

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
          <Link href="/community/new"
            className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-[13.5px] text-white"
            style={{ background: 'var(--p600)' }}>
            <MessageCircle size={16} /> 글쓰기
          </Link>
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
        {loading ? (
          <div className="py-10 text-center text-[13px]" style={{ color: 'var(--text3)' }}>불러오는 중...</div>
        ) : reports.length === 0 ? (
          <div className="py-10 text-center text-[13px]" style={{ color: 'var(--text3)' }}>아직 제보가 없어요</div>
        ) : reports.map((report) => {
          const risk = RISK_STYLES[report.risk_level ?? 'medium']
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
                    {(report.verify_count ?? 0) >= 3 && (
                      <span className="text-[10.5px] font-bold px-2 py-0.5 rounded" style={{ background: 'var(--warn-bg)', color: 'var(--warn)' }}>
                        <Flame size={10} className="inline mr-0.5" /> 핫이슈
                      </span>
                    )}
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
                    {report.address && <span className="flex items-center gap-1"><MapPin size={11} /> {report.address}</span>}
                    <span className="flex items-center gap-1"><Eye size={11} /> {report.view_count ?? 0}</span>
                    <span className="flex items-center gap-1"><CheckCircle size={11} /> {report.verify_count ?? 0}</span>
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
