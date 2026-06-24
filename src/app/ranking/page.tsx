'use client'

import { Trophy, Flame, Share2 } from 'lucide-react'

const PODIUM = [
  { rank: 2, medal: '🥈', gu: '광진구', city: '서울', count: 379 },
  { rank: 1, medal: '🥇', gu: '송파구', city: '서울', count: 393 },
  { rank: 3, medal: '🥉', gu: '중랑구', city: '서울', count: 360 },
]

const PT_LIST = [
  { rank: 1, nick: 'lvbec10843afd', streak: 7, score: 685 },
  { rank: 2, nick: 'YCSTN', streak: 7, score: 670 },
  { rank: 3, nick: 'lvb8428c40bf7', streak: 2, score: 500 },
  { rank: 4, nick: 'lvb38663073c2', streak: 3, score: 480 },
  { rank: 5, nick: 'lvbe0544e4418', streak: 3, score: 430 },
]

const RANK_BG = ['var(--p600)', '#e5e7eb', '#fde68a', 'var(--bg)', 'var(--bg)']
const RANK_COLOR = ['white', 'var(--text)', '#78350f', 'var(--text3)', 'var(--text3)']

async function handleShare() {
  const text = '세이프리포트 제보 랭킹 — 이번 주 1위 송파구 393건!\n우리 동네 안전을 함께 만들어요 👇'
  if (navigator.share) {
    await navigator.share({ title: '세이프리포트 랭킹', text, url: 'https://safe-report-olive.vercel.app/ranking' })
  } else {
    await navigator.clipboard.writeText(`${text}\nhttps://safe-report-olive.vercel.app/ranking`)
    alert('링크가 복사되었어요!')
  }
}

export default function RankingPage() {
  return (
    <div className="max-w-lg mx-auto">
      <div className="px-4 pt-5 pb-0">
        <p className="text-[10.5px] font-black tracking-widest uppercase mb-1" style={{ color: 'var(--p600)' }}>Report League</p>
        <h1 className="text-[26px] font-black mb-1" style={{ color: 'var(--text)' }}>제보 랭킹</h1>
        <p className="text-[13px] mb-4" style={{ color: 'var(--text3)' }}>지역별 참여 순위를 실시간으로 비교합니다.</p>
      </div>

      <button onClick={handleShare}
        className="mx-4 w-[calc(100%-32px)] flex items-center justify-center gap-2 py-3 rounded-xl border text-[14px] font-bold mb-4 shadow-sm"
        style={{ background: 'var(--white)', borderColor: 'var(--border)', color: 'var(--text)' }}>
        <Share2 size={16} /> 공유하기
      </button>

      {/* 포디움 */}
      <div className="px-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[15.5px] font-black flex items-center gap-1.5" style={{ color: 'var(--text)' }}>
            <Trophy size={16} /> 상위 지역
          </h2>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded" style={{ background: 'var(--danger-bg)', color: 'var(--danger)' }}>실시간</span>
        </div>
        <div className="flex items-end gap-2">
          {PODIUM.map((p) => (
            <div key={p.rank}
              className="flex-1 rounded-t-2xl flex flex-col items-center py-3"
              style={{
                background: p.rank === 1 ? 'var(--p600)' : p.rank === 2 ? '#f3f4f6' : '#fdf6e3',
                paddingTop: p.rank === 1 ? '24px' : '14px',
                color: p.rank === 1 ? 'white' : 'var(--text)',
              }}>
              <span className="text-2xl mb-1">{p.medal}</span>
              <div className="text-[12.5px] font-black">{p.gu}</div>
              <div className="text-[10px] opacity-65 mb-1">{p.city}</div>
              <div className="text-[18px] font-black">{p.count}<span className="text-[10px] opacity-70">건</span></div>
            </div>
          ))}
        </div>
      </div>

      {/* 포인트 랭킹 */}
      <div className="px-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[15.5px] font-black flex items-center gap-1.5" style={{ color: 'var(--text)' }}>
            <Trophy size={16} /> 포인트 랭킹
          </h2>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded" style={{ background: 'var(--p50)', color: 'var(--p700)' }}>TOP 10</span>
        </div>
        <div className="space-y-2">
          {PT_LIST.map((u, i) => (
            <div key={u.rank} className="flex items-center gap-3 px-4 py-3 rounded-xl shadow-sm border"
              style={{ background: 'var(--white)', borderColor: 'var(--border)' }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-[13.5px] font-black shrink-0"
                style={{ background: RANK_BG[i], color: RANK_COLOR[i] }}>
                {u.rank}
              </div>
              <div className="flex-1">
                <div className="text-[13.5px] font-bold" style={{ color: 'var(--text)' }}>{u.nick}</div>
                <div className="flex items-center gap-1 text-[11.5px] mt-0.5" style={{ color: 'var(--text3)' }}>
                  <Flame size={12} /> 연속 {u.streak}일
                </div>
              </div>
              <div className="text-[17px] font-black" style={{ color: 'var(--p600)' }}>{u.score}P</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
