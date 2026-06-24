import { Newspaper, Eye, Lock } from 'lucide-react'

const NEWS = [
  { source: '연합뉴스', time: '2시간 전', tag: '주의', tagColor: 'danger', title: '경찰청, 인신매매 전담팀 신설… 연간 적발 건수 35% 증가', views: '12,403' },
  { source: 'KBS', time: '5시간 전', tag: '긴급', tagColor: 'danger', title: '취업 사기로 위장한 납치 조직 17명 검거… 피해자 8명 구출', views: '34,210' },
  { source: 'MBC', time: '어제', tag: '수사', tagColor: 'safe', title: '인천 부평 지하상가 모델 미끼 조직 구속… 피해자 증언 확보', views: '8,910' },
]

const VERDICTS = [
  { court: '대법원 확정', caseNo: '2024도 1842', title: '피의자 A 등 3인 — 인신매매·강요 혐의 상고심', date: '2024.06.12', sentence: '징역 12년 확정 (원심 유지)' },
  { court: '서울고법', caseNo: '2024노 3391', title: '취업 사기 납치 조직 주범 — 특수감금·인신매매 항소심', date: '2024.05.28', sentence: '징역 8년 6개월 (1심 대비 1년 6개월 가중)' },
  { court: '인천지법', caseNo: '2024고합 512', title: '야간 미행·강제 차량 납치 미수 피의자 1심', date: '2024.04.15', sentence: '징역 5년 (집행유예 불인정)' },
]

export default function NewsPage() {
  return (
    <div className="max-w-lg mx-auto pb-4">
      <div className="px-4 py-5">
        <p className="text-[10.5px] font-black tracking-widest uppercase mb-1" style={{ color: 'var(--p600)' }}>News & Verdict</p>
        <h1 className="text-[26px] font-black mb-1" style={{ color: 'var(--text)' }}>뉴스 · 판례</h1>
        <p className="text-[13px] leading-relaxed" style={{ color: 'var(--text3)' }}>인신매매·납치 관련 최신 뉴스와 법원 판결을 모아드려요.</p>
      </div>

      <p className="px-4 text-[10.5px] font-black tracking-widest uppercase flex items-center gap-1.5 mb-2" style={{ color: 'var(--p600)' }}>
        <Newspaper size={13} /> 최신 뉴스
      </p>
      <div className="space-y-2.5 px-4 mb-6">
        {NEWS.map((n, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 flex gap-3 shadow-sm border cursor-pointer" style={{ borderColor: 'var(--border)' }}>
            <div className="w-[72px] h-[72px] rounded-xl shrink-0 flex items-center justify-center" style={{ background: 'var(--p100)', color: 'var(--p600)' }}>
              <Newspaper size={28} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10.5px] font-bold uppercase tracking-wide mb-1" style={{ color: 'var(--p600)' }}>{n.source} · {n.time}</p>
              <p className="text-[14px] font-black leading-snug mb-2 line-clamp-2" style={{ color: 'var(--text)' }}>{n.title}</p>
              <div className="flex items-center gap-2 text-[11px]" style={{ color: '#9ca3af' }}>
                <span className="px-1.5 py-0.5 rounded font-bold text-[10.5px]"
                  style={{ background: n.tagColor === 'danger' ? 'var(--danger-bg)' : 'var(--p50)', color: n.tagColor === 'danger' ? 'var(--danger)' : 'var(--p700)' }}>
                  {n.tag}
                </span>
                <span className="flex items-center gap-1"><Eye size={11} /> {n.views}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="px-4 text-[10.5px] font-black tracking-widest uppercase flex items-center gap-1.5 mb-2" style={{ color: 'var(--p600)' }}>
        <Lock size={13} /> 최근 판례
      </p>
      <div className="space-y-2.5 px-4">
        {VERDICTS.map((v, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 border-l-4 shadow-sm cursor-pointer"
            style={{ borderLeftColor: 'var(--p600)', borderTop: '1px solid var(--border)', borderRight: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
            <span className="inline-block text-[10.5px] font-black px-2 py-0.5 rounded mb-2" style={{ background: 'var(--p50)', color: 'var(--p700)' }}>{v.court}</span>
            <p className="text-[14px] font-black leading-snug mb-1" style={{ color: 'var(--text)' }}>{v.title}</p>
            <p className="text-[11.5px] mb-2" style={{ color: 'var(--text3)' }}>{v.caseNo} · {v.date}</p>
            <span className="inline-flex items-center gap-1.5 text-[12.5px] font-bold px-2.5 py-1 rounded-lg" style={{ background: 'var(--danger-bg)', color: 'var(--danger)' }}>
              <Lock size={13} /> {v.sentence}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
