'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth/AuthContext'
import { MessageCircle, Send } from 'lucide-react'
import Link from 'next/link'

interface Comment {
  id: string
  author_id: string | null
  is_anonymous: boolean
  body: string
  created_at: string
}

function timeAgo(iso: string) {
  const m = Math.floor((Date.now() - new Date(iso).getTime()) / 60000)
  if (m < 1) return '방금 전'
  if (m < 60) return `${m}분 전`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}시간 전`
  return `${Math.floor(h / 24)}일 전`
}

export default function CommentSection({ reportId }: { reportId: string }) {
  const { user } = useAuth()
  const [comments, setComments] = useState<Comment[]>([])
  const [body, setBody] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(true)
  const [posting, setPosting] = useState(false)

  useEffect(() => {
    fetch(`/api/reports/${reportId}/comments`)
      .then(r => r.json())
      .then(d => setComments(d.comments ?? []))
  }, [reportId])

  async function handlePost(e: React.FormEvent) {
    e.preventDefault()
    if (!body.trim() || posting) return
    setPosting(true)
    try {
      const res = await fetch(`/api/reports/${reportId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body, is_anonymous: isAnonymous }),
      })
      if (res.ok) {
        const { comment } = await res.json()
        setComments(prev => [...prev, comment])
        setBody('')
      }
    } finally {
      setPosting(false)
    }
  }

  return (
    <div className="mt-5 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
      <h2 className="text-[16px] font-black mb-3 flex items-center gap-2" style={{ color: 'var(--text)' }}>
        <MessageCircle size={16} /> 댓글 {comments.length}
      </h2>

      {/* 댓글 목록 */}
      <div className="space-y-2 mb-4">
        {comments.length === 0 && (
          <p className="text-center text-[13px] py-4" style={{ color: 'var(--text3)' }}>첫 댓글을 남겨보세요</p>
        )}
        {comments.map(c => (
          <div key={c.id} className="rounded-xl p-3" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[12px] font-bold" style={{ color: 'var(--p700)' }}>
                {c.is_anonymous ? '익명' : '실명'}
              </span>
              <span className="text-[11px]" style={{ color: 'var(--text3)' }}>{timeAgo(c.created_at)}</span>
            </div>
            <p className="text-[13.5px] leading-relaxed" style={{ color: 'var(--text2)' }}>{c.body}</p>
          </div>
        ))}
      </div>

      {/* 입력 폼 */}
      {user ? (
        <form onSubmit={handlePost} className="space-y-2">
          <textarea
            value={body}
            onChange={e => setBody(e.target.value)}
            placeholder="댓글을 남겨주세요 (관찰 사실만, 단정·비하 금지)"
            rows={3}
            maxLength={300}
            className="w-full rounded-xl border px-3 py-2.5 text-[13.5px] resize-none focus:outline-none"
            style={{ borderColor: 'var(--border)', background: 'var(--white)', color: 'var(--text)' }}
          />
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-[12.5px] cursor-pointer" style={{ color: 'var(--text3)' }}>
              <input type="checkbox" checked={isAnonymous} onChange={e => setIsAnonymous(e.target.checked)} className="accent-green-600" />
              익명으로 작성
            </label>
            <button
              type="submit"
              disabled={!body.trim() || posting}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-bold text-white disabled:opacity-40"
              style={{ background: 'var(--p600)' }}>
              <Send size={13} /> {posting ? '등록 중' : '등록'}
            </button>
          </div>
        </form>
      ) : (
        <div className="rounded-2xl p-4 text-center" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
          <p className="text-[13px]" style={{ color: 'var(--text3)' }}>댓글을 남기려면 로그인이 필요해요</p>
          <Link href="/account" className="inline-block mt-2 text-[13px] font-bold" style={{ color: 'var(--p600)' }}>
            로그인하기 →
          </Link>
        </div>
      )}
    </div>
  )
}
