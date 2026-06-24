'use client'

import { useState } from 'react'
import { CheckCircle } from 'lucide-react'
import { useAuth } from '@/lib/auth/AuthContext'
import { useRouter } from 'next/navigation'

export default function VerifyButton({ reportId, verifyCount }: { reportId: string; verifyCount: number }) {
  const { user } = useAuth()
  const router = useRouter()
  const [count, setCount] = useState(verifyCount)
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleVerify() {
    if (!user) { router.push('/account'); return }
    if (done || loading) return
    setLoading(true)
    try {
      const res = await fetch(`/api/reports/${reportId}/verify`, { method: 'POST' })
      if (res.ok) {
        setCount(c => c + 1)
        setDone(true)
      } else if (res.status === 409) {
        setDone(true)
        alert('이미 목격 확인한 제보입니다')
      } else {
        alert('오류가 발생했습니다')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleVerify}
      disabled={done || loading}
      className="w-full py-4 rounded-2xl text-white text-[15px] font-black flex items-center justify-center gap-2"
      style={{ background: done ? 'var(--p400)' : 'var(--p600)', opacity: loading ? 0.7 : 1 }}>
      <CheckCircle size={18} />
      {done ? `목격 확인됨 (${count}명)` : loading ? '처리 중...' : `나도 목격했어요 +5P (${count}명)`}
    </button>
  )
}
