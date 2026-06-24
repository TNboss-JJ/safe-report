import { ShieldCheck, Phone, Smile, Calendar, Megaphone, Link as LinkIcon, Star } from 'lucide-react'

const EARN_ITEMS = [
  { Icon: Calendar, name: '매일 출석', sub: '하루 1회', pts: '+10P' },
  { Icon: Megaphone, name: '제보 작성', sub: '검증 후 지급', pts: '+50P' },
  { Icon: Star, name: '제보 검증 참여', sub: '"나도 목격" 클릭', pts: '+5P' },
  { Icon: LinkIcon, name: '친구 초대', sub: '가입 확인 후', pts: '+100P' },
]

export default function AccountPage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-5 space-y-4">
      {/* 포인트 카드 */}
      <div className="rounded-2xl p-5 text-white" style={{ background: 'linear-gradient(135deg, var(--p700), var(--p500))', boxShadow: '0 6px 22px rgba(22,163,74,0.3)' }}>
        <p className="text-[12px] opacity-80 mb-1">내 포인트</p>
        <p className="text-[38px] font-black mb-3">0 P</p>
        <button className="text-[13px] font-bold px-4 py-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
          로그인하여 포인트 적립 →
        </button>
      </div>

      {/* 로그인 버튼 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border text-center space-y-4" style={{ borderColor: 'var(--border)' }}>
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto" style={{ background: 'var(--p100)', color: 'var(--p700)' }}>
          <ShieldCheck size={32} />
        </div>
        <div>
          <p className="text-[22px] font-black" style={{ color: 'var(--text)' }}>로그인이 필요해요</p>
          <p className="text-[13.5px] mt-1 leading-relaxed" style={{ color: 'var(--text3)' }}>제보·댓글·포인트 적립은 로그인 후 가능해요.</p>
        </div>
        <a href="tel:+" className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-white text-[15.5px] font-black" style={{ background: 'var(--p600)' }}>
          <Phone size={18} /> 전화번호로 가입하기
        </a>
        <button className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-[14.5px] font-bold border"
          style={{ background: 'var(--white)', borderColor: 'var(--border)', color: 'var(--text)' }}>
          <Smile size={18} /> 카카오로 시작하기
        </button>
        <p className="text-[11.5px] leading-relaxed" style={{ color: 'var(--text3)' }}>익명 보장 · 위치 인증 후 제보 가능 · 탈퇴 시 즉시 삭제</p>
      </div>

      {/* 적립 안내 */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border" style={{ borderColor: 'var(--border)' }}>
        {EARN_ITEMS.map((item, i) => (
          <div key={item.name} className="flex items-center gap-3 px-4 py-3.5"
            style={{ borderBottom: i < EARN_ITEMS.length - 1 ? '1px solid var(--border)' : 'none' }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'var(--p50)', color: 'var(--p700)' }}>
              <item.Icon size={17} />
            </div>
            <div className="flex-1">
              <div className="text-[13px] font-bold" style={{ color: 'var(--text)' }}>{item.name}</div>
              <div className="text-[11px] mt-0.5" style={{ color: 'var(--text3)' }}>{item.sub}</div>
            </div>
            <div className="text-[15px] font-black" style={{ color: 'var(--p700)' }}>{item.pts}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
