import { Baby, Search, Shield } from 'lucide-react'

const SCHOOLS = [
  { name: '화곡초등학교', addr: '서울 강서구 화곡동', reports: 3, blind: 2, safe: 87, reportColor: 'danger', blindColor: 'warn', safeColor: 'safe' },
  { name: '신도림초등학교', addr: '서울 구로구 신도림동', reports: 1, blind: 0, safe: 96, reportColor: 'warn', blindColor: 'safe', safeColor: 'safe' },
]

const TIPS = [
  '낯선 사람이 "엄마·아빠가 보냈어"라고 해도 절대 따라가지 않기',
  '등하교 시 반드시 정해진 경로만 이용, CCTV 있는 큰길 우선',
  '위험하면 크게 소리 지르며 가장 가까운 가게나 편의점으로 뛰기',
  '부모 연락처를 외워두고, 위급 시 112에 직접 신고하기',
  '의심 차량·사람을 보면 즉시 선생님·부모님에게 알리기',
]

const COLOR_MAP: Record<string, string> = { danger: 'var(--danger)', warn: 'var(--warn)', safe: 'var(--p600)' }

export default function KidsPage() {
  return (
    <div className="max-w-lg mx-auto">
      <div className="px-4 py-5 text-white" style={{ background: 'linear-gradient(135deg, #7c3aed, #5b21b6)' }}>
        <p className="text-[10px] font-black tracking-[1.5px] uppercase mb-1 opacity-60">Children Safety</p>
        <h1 className="text-[22px] font-black mb-1">어린이 안전</h1>
        <p className="text-[12.5px] leading-relaxed opacity-75">학교 주변 위험 지역, CCTV 현황, 안전 귀가 팁을 모아드려요.</p>
      </div>

      <div className="px-4 py-3 flex gap-2">
        <input className="flex-1 px-3 py-2.5 rounded-xl text-[13.5px] outline-none border" style={{ borderColor: 'var(--border)', background: 'var(--white)' }}
          placeholder="학교 이름 또는 주소 검색" />
        <button className="px-4 py-2.5 rounded-xl text-white text-[13px] font-bold flex items-center gap-1" style={{ background: 'var(--p600)' }}>
          <Search size={14} /> 검색
        </button>
      </div>

      <p className="px-4 text-[10.5px] font-black tracking-widest uppercase flex items-center gap-1.5 mb-2" style={{ color: 'var(--p600)' }}>
        <Baby size={13} /> 주변 학교 현황
      </p>
      <div className="px-4 space-y-2.5 mb-4">
        {SCHOOLS.map((s) => (
          <div key={s.name} className="bg-white rounded-2xl p-4 shadow-sm border cursor-pointer" style={{ borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#f3e8ff', color: '#7c3aed' }}>
                <Baby size={20} />
              </div>
              <div>
                <div className="font-black text-[14px]" style={{ color: 'var(--text)' }}>{s.name}</div>
                <div className="text-[11.5px]" style={{ color: 'var(--text3)' }}>{s.addr}</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { num: s.reports, label: '이번주 제보', color: s.reportColor },
                { num: s.blind,   label: 'CCTV 사각',  color: s.blindColor },
                { num: `${s.safe}%`, label: '안전 경로율', color: s.safeColor },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl p-2 text-center border" style={{ background: 'var(--bg)', borderColor: 'var(--border)' }}>
                  <div className="text-[18px] font-black" style={{ color: COLOR_MAP[stat.color] }}>{stat.num}</div>
                  <div className="text-[10px] mt-0.5" style={{ color: 'var(--text3)' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="px-4 text-[10.5px] font-black tracking-widest uppercase flex items-center gap-1.5 mb-2" style={{ color: 'var(--p600)' }}>
        <Shield size={13} /> 어린이 안전 수칙
      </p>
      <div className="mx-4 bg-white rounded-2xl p-4 shadow-sm border mb-4" style={{ borderColor: 'var(--border)' }}>
        <h3 className="text-[14px] font-black flex items-center gap-2 mb-3" style={{ color: 'var(--text)' }}>
          <Shield size={16} style={{ color: '#7c3aed' }} /> 자녀와 함께 알아두세요
        </h3>
        <div className="space-y-2.5">
          {TIPS.map((tip, i) => (
            <div key={i} className="flex gap-3 text-[13px] leading-relaxed" style={{ color: 'var(--text2)' }}>
              <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[11.5px] font-black"
                style={{ background: '#f3e8ff', color: '#7c3aed' }}>{i + 1}</div>
              {tip}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
