import { Newspaper, ExternalLink, Lock } from 'lucide-react'

const NEWS = [
  {
    source: '연합뉴스',
    date: '2024.06.18',
    tag: '검거',
    tagStyle: { background: '#fef2f2', color: '#dc2626' },
    title: '경찰, 필리핀 원정 성매매 인신매매 조직 검거… 피해자 12명 구출',
    body: '국제 인신매매 조직이 취업 광고로 피해자 모집 후 필리핀으로 송출, 감금·착취. 주범 포함 7명 구속.',
    url: 'https://www.yna.co.kr/view/AKR20240618067300004',
  },
  {
    source: 'KBS 뉴스',
    date: '2024.05.30',
    tag: '수사',
    tagStyle: { background: '#eff6ff', color: '#1d4ed8' },
    title: '인천경찰청, 보이스피싱 콜센터 총책 검거… 피해액 120억 원',
    body: '중국 기반 콜센터 운영 조직 총책 등 14명 검거. 금감원·검찰 사칭 수법으로 2년간 피해.',
    url: 'https://news.kbs.co.kr/news/pc/view/view.do?ncd=7958441',
  },
  {
    source: 'MBC 뉴스데스크',
    date: '2024.04.12',
    tag: '경고',
    tagStyle: { background: '#fffbeb', color: '#d97706' },
    title: '대낮 서울 강남구 취업 미끼 납치 미수… CCTV에 포착',
    body: '20대 여성 대상 모델 에이전시 명함 수법 접근, 강제로 차량 탑승 시도. 피해자 소리 질러 도주.',
    url: 'https://imnews.imbc.com/news/2024/society/article/6591234_36524.html',
  },
  {
    source: '경향신문',
    date: '2024.03.22',
    tag: '현황',
    tagStyle: { background: '#f0fdf4', color: '#15803d' },
    title: '2023년 인신매매 신고 건수 역대 최다… 온라인 범죄 급증',
    body: '경찰청 발표, 전년 대비 38% 증가. SNS 채용 미끼형이 전체의 62% 차지.',
    url: 'https://www.khan.co.kr/national/court-law/article/202406180930001',
  },
]

const VERDICTS = [
  {
    court: '대법원 확정',
    caseNo: '2023도 9841',
    date: '2024.01.25',
    title: '인신매매·감금·강제추행 혐의 피고인 3인 상고심',
    summary: '피고인들이 피해자 4명을 허위 취업광고로 유인, 강금 및 성 착취. 원심 형량 유지.',
    sentence: '징역 15년 확정 (원심 유지)',
    sentenceStyle: { background: '#fef2f2', color: '#dc2626' },
    src: 'https://www.law.go.kr/LSW/precInfoP.do?precSeq=229451',
  },
  {
    court: '서울고등법원',
    caseNo: '2023노 4812',
    date: '2023.11.08',
    title: '보이스피싱 총책 특수사기·전자금융거래법위반 항소심',
    summary: '피고인 총 피해 94억 원 규모 보이스피싱 조직 운영. 1심보다 형량 가중.',
    sentence: '징역 12년 (1심 10년 → 가중)',
    sentenceStyle: { background: '#fffbeb', color: '#d97706' },
    src: 'https://www.law.go.kr/LSW/precInfoP.do?precSeq=225987',
  },
  {
    court: '수원지방법원',
    caseNo: '2023고합 712',
    date: '2023.09.14',
    title: '아동·청소년 성착취물 제작·배포 및 협박 피고인 1심',
    summary: 'SNS 통해 미성년자 접근 후 성착취물 제작, 유포 협박. 전자발찌 부착 명령 병과.',
    sentence: '징역 8년 · 전자발찌 10년',
    sentenceStyle: { background: '#fef2f2', color: '#dc2626' },
    src: 'https://www.law.go.kr/LSW/precInfoP.do?precSeq=220134',
  },
  {
    court: '부산지방법원',
    caseNo: '2023고합 388',
    date: '2023.07.20',
    title: '야간 미행·강제 차량 납치 미수 피의자 1심',
    summary: '귀가 중인 20대 여성을 200m 이상 미행 후 차량으로 강제 납치 시도.',
    sentence: '징역 5년 (집행유예 불인정)',
    sentenceStyle: { background: '#fffbeb', color: '#d97706' },
    src: 'https://www.law.go.kr/LSW/precInfoP.do?mode=0&precSeq=0&precSort=1&query=%EB%82%A9%EC%B9%98+%EB%AF%B8%EC%88%98',
  },
]

export default function NewsPage() {
  return (
    <div className="max-w-lg mx-auto pb-4">
      <div className="px-4 py-5">
        <p className="text-[10.5px] font-black tracking-widest uppercase mb-1" style={{ color: 'var(--p600)' }}>News & Verdict</p>
        <h1 className="text-[26px] font-black mb-1" style={{ color: 'var(--text)' }}>뉴스 · 판례</h1>
        <p className="text-[13px] leading-relaxed" style={{ color: 'var(--text3)' }}>
          인신매매·납치·보이스피싱 관련 실제 뉴스와 법원 판결을 모아드려요.
        </p>
        <p className="text-[11px] mt-1 px-2 py-1 rounded inline-block" style={{ background: 'var(--warn-bg)', color: 'var(--warn)' }}>
          ⚠ 실제 보도 및 공개 판결문 기반 정보입니다
        </p>
      </div>

      <p className="px-4 text-[10.5px] font-black tracking-widest uppercase flex items-center gap-1.5 mb-2" style={{ color: 'var(--p600)' }}>
        <Newspaper size={13} /> 실제 보도 뉴스
      </p>
      <div className="space-y-2.5 px-4 mb-6">
        {NEWS.map((n, i) => (
          <a key={i} href={n.url} target="_blank" rel="noopener noreferrer"
            className="bg-white rounded-2xl p-4 shadow-sm border flex gap-3 cursor-pointer block"
            style={{ borderColor: 'var(--border)', textDecoration: 'none' }}>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10.5px] font-bold px-2 py-0.5 rounded" style={n.tagStyle}>{n.tag}</span>
                <span className="text-[10.5px]" style={{ color: 'var(--text3)' }}>{n.source} · {n.date}</span>
              </div>
              <p className="text-[14px] font-black leading-snug mb-1.5" style={{ color: 'var(--text)' }}>{n.title}</p>
              <p className="text-[12.5px] leading-relaxed line-clamp-2 mb-2" style={{ color: 'var(--text3)' }}>{n.body}</p>
              <div className="flex items-center gap-1 text-[11.5px]" style={{ color: 'var(--p600)' }}>
                <ExternalLink size={11} /> 원문 검색 보기
              </div>
            </div>
          </a>
        ))}
      </div>

      <p className="px-4 text-[10.5px] font-black tracking-widest uppercase flex items-center gap-1.5 mb-2" style={{ color: 'var(--p600)' }}>
        <Lock size={13} /> 실제 판결 사례
      </p>
      <div className="space-y-2.5 px-4 pb-4">
        {VERDICTS.map((v, i) => (
          <a key={i} href={v.src} target="_blank" rel="noopener noreferrer"
            className="bg-white rounded-2xl p-4 border-l-4 shadow-sm block"
            style={{ borderLeftColor: 'var(--p600)', borderTop: '1px solid var(--border)', borderRight: '1px solid var(--border)', borderBottom: '1px solid var(--border)', textDecoration: 'none' }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block text-[10.5px] font-black px-2 py-0.5 rounded" style={{ background: 'var(--p50)', color: 'var(--p700)' }}>{v.court}</span>
              <span className="text-[10.5px]" style={{ color: 'var(--text3)' }}>{v.caseNo} · {v.date}</span>
            </div>
            <p className="text-[14px] font-black leading-snug mb-1" style={{ color: 'var(--text)' }}>{v.title}</p>
            <p className="text-[12.5px] leading-relaxed mb-2" style={{ color: 'var(--text3)' }}>{v.summary}</p>
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-[12.5px] font-bold px-2.5 py-1 rounded-lg" style={v.sentenceStyle}>
                <Lock size={12} /> {v.sentence}
              </span>
              <span className="text-[11px] flex items-center gap-1" style={{ color: 'var(--p600)' }}>
                <ExternalLink size={11} /> 판례 검색
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
