import { Bell, Gift, User, ShieldCheck } from 'lucide-react'

export default function AppHeader() {
  return (
    <>
      {/* 메인 헤더 */}
      <header className="sticky top-0 z-50 h-[54px] flex items-center justify-between px-4"
        style={{ background: 'var(--p800)', boxShadow: '0 2px 12px rgba(5,46,22,0.3)' }}>
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-[10px] flex items-center justify-center"
            style={{ background: 'var(--p500)', boxShadow: '0 0 0 3px rgba(34,197,94,0.3)' }}>
            <ShieldCheck size={18} className="text-white" />
          </div>
          <div>
            <div className="text-white font-black text-[16px] tracking-tight leading-none">세이프리포트</div>
            <div className="text-[9.5px] font-semibold tracking-widest leading-none mt-0.5" style={{ color: 'var(--p300)' }}>
              SafeReport · 시민 안전망
            </div>
          </div>
        </div>
        <div className="flex gap-1">
          {[
            { Icon: Bell, label: '알림', dot: true },
            { Icon: Gift, label: '혜택', dot: false },
            { Icon: User, label: '계정', dot: false },
          ].map(({ Icon, label, dot }) => (
            <button key={label}
              className="w-9 h-9 rounded-[10px] flex items-center justify-center relative transition-colors"
              style={{ color: 'var(--p300)' }}
            >
              <Icon size={20} />
              {dot && (
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
                  style={{ background: 'var(--danger)', border: '1.5px solid var(--p800)' }} />
              )}
            </button>
          ))}
        </div>
      </header>

      {/* 티커 */}
      <div className="flex items-center gap-2 px-3 py-2 overflow-hidden" style={{ background: 'var(--p700)' }}>
        <span className="shrink-0 flex items-center gap-1 text-white text-[11px] font-bold px-2 py-0.5 rounded"
          style={{ background: 'rgba(255,255,255,0.15)' }}>
          📢 공지
        </span>
        <div className="text-[12px] whitespace-nowrap overflow-hidden" style={{ color: 'rgba(255,255,255,0.9)' }}>
          <span className="inline-block animate-[ticker_22s_linear_infinite]">
            감사합니다. 많은 제보 부탁드립니다 &nbsp;•&nbsp; CCTV 확인 도구 베타 오픈 &nbsp;•&nbsp; 택시 번호 조회 서비스 시작 &nbsp;•&nbsp; 어린이 안전 필터 신규 오픈 &nbsp;•&nbsp; 허위 제보 시 계정 영구 정지
            &nbsp;&nbsp;&nbsp;&nbsp;
            감사합니다. 많은 제보 부탁드립니다 &nbsp;•&nbsp; CCTV 확인 도구 베타 오픈 &nbsp;•&nbsp; 택시 번호 조회 서비스 시작
          </span>
        </div>
      </div>
    </>
  )
}
