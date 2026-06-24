import { Trophy, Star, Megaphone } from 'lucide-react'

const MOCK_RANKING = [
  { rank: 1, nickname: '안전지킴이', points: 1240, reports: 18 },
  { rank: 2, nickname: '망원동수호자', points: 980, reports: 14 },
  { rank: 3, nickname: '익명제보자', points: 750, reports: 10 },
  { rank: 4, nickname: '안전파수꾼', points: 620, reports: 8 },
  { rank: 5, nickname: '동네지킴이', points: 510, reports: 7 },
]

const RANK_STYLES: Record<number, string> = {
  1: 'bg-yellow-400 text-white',
  2: 'bg-gray-300 text-gray-700',
  3: 'bg-orange-400 text-white',
}

export default function RankingPage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-6 space-y-5">

      <div className="flex items-center gap-2">
        <Trophy size={22} className="text-yellow-500" />
        <h1 className="text-lg font-bold text-gray-900">제보 랭킹</h1>
      </div>

      <div className="bg-[#052e16] rounded-2xl p-4 text-white text-center">
        <p className="text-xs text-green-300 mb-1">이번 달 최다 제보자</p>
        <p className="text-2xl font-black">안전지킴이</p>
        <p className="text-sm text-green-300 mt-1">1,240 포인트 · 18건 제보</p>
      </div>

      <div className="space-y-2">
        {MOCK_RANKING.map((u) => (
          <div key={u.rank} className="bg-white rounded-2xl px-4 py-3 flex items-center gap-3 shadow-sm border border-green-50">
            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black shrink-0 ${RANK_STYLES[u.rank] ?? 'bg-green-100 text-green-700'}`}>
              {u.rank}
            </span>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">{u.nickname}</p>
              <div className="flex items-center gap-3 text-xs text-gray-400 mt-0.5">
                <span className="flex items-center gap-1"><Star size={11} /> {u.points}P</span>
                <span className="flex items-center gap-1"><Megaphone size={11} /> {u.reports}건</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-center text-gray-400">매월 1일 초기화 · 상위 3인 배지 지급</p>
    </div>
  )
}
