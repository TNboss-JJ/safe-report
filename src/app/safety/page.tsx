'use client'

import { useState } from 'react'
import { Camera, Car, MapPin, Share2, Route, Shield, Search, ChevronRight } from 'lucide-react'

const TOOLS = [
  { id: 'cctv',     label: 'CCTV',    Icon: Camera },
  { id: 'taxi',     label: '택시',    Icon: Car },
  { id: 'location', label: '위치공유', Icon: MapPin },
  { id: 'sns',      label: 'SNS',     Icon: Share2 },
  { id: 'routine',  label: '루틴경로', Icon: Route },
  { id: 'guide',    label: '대처법',  Icon: Shield },
]

const GUIDES = [
  {
    Icon: Route,
    title: '미행·추적 당하는 것 같을 때',
    steps: [
      { title: '방향을 바꿔 확인 후 밝은 곳으로', body: '편의점·카페 등 밝고 사람 많은 곳으로 즉시 들어가세요. 동일인이 따라오면 미행 확실.' },
      { title: '큰 소리로 전화 통화', body: '"지금 ○○역 앞 편의점이야 거기서 기다려" — 위치를 공개적으로 알리면 범행 억제 효과.' },
      { title: '112 신고 또는 주변인에게 도움 요청', body: '경찰 오기 전까지 조용한 골목·계단으로 절대 가지 마세요.' },
    ],
    warn: '절대 하지 말 것: 이어폰 양쪽 끼고 걷기, 핸드폰 보며 걷기, 어두운 골목 지름길',
  },
  {
    Icon: Car,
    title: '차량이 강제로 접근하거나 따라올 때',
    steps: [
      { title: '차량 반대 방향으로 걷기', body: '차량은 유턴이 필요 — 도보는 즉시 반대 방향으로. 같은 방향으로 절대 도망치지 마세요.' },
      { title: '번호판 즉시 사진 촬영', body: '112 신고 시 번호판 정보가 결정적 증거. 본 앱에 즉시 제보하세요.' },
      { title: '건물 안으로 대피', body: '편의점·식당·지하철역 등 사람이 많은 실내로 즉시 이동.' },
    ],
    warn: '차량에 절대 탑승하지 마세요 — 탑승 후 대처는 훨씬 어렵습니다.',
  },
]

export default function SafetyPage() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="max-w-lg mx-auto">
      <div className="px-4 py-5 text-white" style={{ background: 'linear-gradient(160deg, var(--p800), var(--p700))' }}>
        <p className="text-[10px] font-black tracking-[1.5px] uppercase mb-1 opacity-60">Safety Toolkit</p>
        <h1 className="text-[23px] font-black mb-1">안전 도구 모음</h1>
        <p className="text-[12.5px] leading-relaxed opacity-70">CCTV 확인부터 택시번호 조회, 실시간 위치 공유까지</p>
      </div>

      {/* 필터 */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto scrollbar-hide">
        {TOOLS.map(({ id, label, Icon }) => (
          <button key={id} className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-bold border transition-all"
            style={{ background: 'var(--white)', color: 'var(--text3)', borderColor: 'var(--border)' }}>
            <Icon size={12} /> {label}
          </button>
        ))}
      </div>

      {/* 대처법 가이드 */}
      <p className="px-4 text-[10.5px] font-black tracking-widest uppercase flex items-center gap-1.5 mb-2" style={{ color: 'var(--p600)' }}>
        <Shield size={13} /> 상황별 대처법
      </p>
      <div className="px-4 space-y-2 mb-4">
        {GUIDES.map((g, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm border overflow-hidden" style={{ borderColor: 'var(--border)' }}>
            <button
              className="w-full flex items-center gap-3 p-4 text-left"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'var(--p50)', color: 'var(--p700)' }}>
                <g.Icon size={20} />
              </div>
              <span className="flex-1 text-[14px] font-black" style={{ color: 'var(--text)' }}>{g.title}</span>
              <ChevronRight size={18} style={{ color: 'var(--text3)', transform: open === i ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>
            {open === i && (
              <div className="px-4 pb-4 border-t" style={{ borderColor: 'var(--border)', paddingTop: '14px' }}>
                {g.steps.map((s, j) => (
                  <div key={j} className="flex gap-3 mb-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-[12px] font-black text-white shrink-0" style={{ background: 'var(--p600)' }}>{j + 1}</div>
                    <div className="text-[13px] leading-relaxed" style={{ color: 'var(--text2)' }}>
                      <strong className="block text-[13.5px] font-black mb-0.5" style={{ color: 'var(--text)' }}>{s.title}</strong>
                      {s.body}
                    </div>
                  </div>
                ))}
                <div className="flex gap-2 items-start mt-1 p-3 rounded-xl text-[12.5px] font-semibold" style={{ background: 'var(--danger-bg)', color: 'var(--danger)' }}>
                  <Shield size={14} className="shrink-0 mt-0.5" /> {g.warn}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 안전시설 링크 */}
      <p className="px-4 text-[10.5px] font-black tracking-widest uppercase flex items-center gap-1.5 mb-2" style={{ color: 'var(--p600)' }}>
        <Camera size={13} /> 안전 시설 확인
      </p>
      <div className="px-4 grid grid-cols-2 gap-2.5 mb-4">
        {[
          { label: 'CCTV 위치', sub: '내 주변 방범 CCTV', Icon: Camera, bg: '#eff6ff', color: '#1d4ed8' },
          { label: '안전 비상벨', sub: '가장 가까운 비상벨', Icon: MapPin, bg: 'var(--p50)', color: 'var(--p700)' },
          { label: '여성안심택배함', sub: '안전한 택배 수령', Icon: Search, bg: '#f3e8ff', color: '#7c3aed' },
          { label: '경찰서·파출소', sub: '주변 치안 시설', Icon: Shield, bg: 'var(--warn-bg)', color: 'var(--warn)' },
        ].map((item) => (
          <div key={item.label} className="rounded-2xl p-4 flex flex-col gap-3 border cursor-pointer shadow-sm"
            style={{ background: item.bg, borderColor: 'transparent' }}>
            <item.Icon size={24} style={{ color: item.color }} />
            <div>
              <p className="font-bold text-[13px]" style={{ color: 'var(--text)' }}>{item.label}</p>
              <p className="text-[11px] mt-0.5" style={{ color: 'var(--text3)' }}>{item.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
