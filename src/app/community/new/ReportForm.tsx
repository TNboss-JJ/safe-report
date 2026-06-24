'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { REPORT_TYPES } from '@/constants'
import type { ReportType, RiskLevel } from '@/types/database'

const RISK_OPTIONS: { value: RiskLevel; label: string; color: string }[] = [
  { value: 'low',      label: '낮음 — 주의 필요',   color: 'border-gray-300 text-gray-600' },
  { value: 'medium',   label: '주의 — 위험 가능성', color: 'border-yellow-400 text-yellow-700' },
  { value: 'high',     label: '위험 — 즉시 주의',   color: 'border-red-400 text-red-600' },
  { value: 'critical', label: '긴급 — 경찰 신고 권고', color: 'border-red-600 text-red-600' },
]

export default function ReportForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    report_type: '' as ReportType | '',
    title: '',
    body: '',
    risk_level: 'medium' as RiskLevel,
    address: '',
    source_note: '',
    is_anonymous: true,
  })

  function set<K extends keyof typeof form>(key: K, value: typeof form[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.report_type || !form.title.trim() || !form.body.trim()) return

    setLoading(true)
    try {
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        const { id } = await res.json()
        router.push(`/community/${id}`)
      } else {
        alert('제보 등록 중 오류가 발생했습니다.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* 허위 제보 방지 안내 (핵심 원칙 #3) */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-xs text-yellow-800">
        ⚠️ <strong>허위 제보는 법적 책임이 발생할 수 있습니다.</strong><br />
        관찰한 사실만 제보해주세요. 진단·범인 특정·국적 비하 표현은 삭제됩니다.
      </div>

      {/* 제보 유형 */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">제보 유형 *</label>
        <div className="grid grid-cols-3 gap-2">
          {REPORT_TYPES.map((type) => (
            <button
              type="button"
              key={type.id}
              onClick={() => set('report_type', type.id)}
              className={`p-2 rounded-xl border text-sm font-medium transition-colors ${
                form.report_type === type.id
                  ? 'border-[#16a34a] bg-green-50 text-[#15803d]'
                  : 'border-gray-200 bg-white text-gray-600'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* 제목 */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">제목 *</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => set('title', e.target.value)}
          placeholder="목격한 상황을 간단히 적어주세요"
          maxLength={80}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#16a34a]"
          required
        />
      </div>

      {/* 내용 */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">내용 *</label>
        <textarea
          value={form.body}
          onChange={(e) => set('body', e.target.value)}
          placeholder="언제, 어디서, 어떤 상황을 목격했는지 구체적으로 적어주세요&#10;(추측이나 단정은 피해주세요)"
          rows={5}
          maxLength={1000}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:border-[#16a34a]"
          required
        />
        <p className="text-xs text-gray-400 mt-1 text-right">{form.body.length}/1000</p>
      </div>

      {/* 위치 */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">위치</label>
        <input
          type="text"
          value={form.address}
          onChange={(e) => set('address', e.target.value)}
          placeholder="예: 서울 마포구 망원동 초등학교 앞"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#16a34a]"
        />
      </div>

      {/* 위험도 */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">위험도</label>
        <div className="space-y-2">
          {RISK_OPTIONS.map((opt) => (
            <label key={opt.value} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="risk_level"
                value={opt.value}
                checked={form.risk_level === opt.value}
                onChange={() => set('risk_level', opt.value)}
                className="accent-[#16a34a]"
              />
              <span className={`text-sm font-medium border rounded-lg px-3 py-1 ${opt.color}`}>
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* 출처 (핵심 원칙 #2) */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">출처 *</label>
        <input
          type="text"
          value={form.source_note}
          onChange={(e) => set('source_note', e.target.value)}
          placeholder="예: 직접 목격 / SNS 공유 / 지인 전달"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#16a34a]"
          required
        />
        <p className="text-xs text-gray-400 mt-1">직접 목격이 아닌 경우 출처를 정확히 표시해주세요</p>
      </div>

      {/* 익명 여부 (핵심 원칙 #2) */}
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={form.is_anonymous}
          onChange={(e) => set('is_anonymous', e.target.checked)}
          className="w-4 h-4 accent-[#16a34a]"
        />
        <span className="text-sm text-gray-700">익명으로 제보하기 (닉네임 숨김)</span>
      </label>

      {/* 제출 */}
      <button
        type="submit"
        disabled={loading || !form.report_type || !form.title || !form.body || !form.source_note}
        className="w-full bg-[#16a34a] disabled:bg-gray-300 text-white font-semibold py-3.5 rounded-xl transition-colors"
      >
        {loading ? '등록 중...' : '📢 제보 등록하기'}
      </button>

      <div className="h-4" />
    </form>
  )
}
