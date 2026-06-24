// 긴급 연락처
export const EMERGENCY_CONTACTS = [
  { name: '경찰청 긴급신고', number: '112', desc: '24시간 운영 · 위치 자동 추적', color: 'danger' },
  { name: '실종아동·가출인 신고', number: '182', desc: '경찰청 실종수사대', color: 'safe' },
  { name: '여성긴급전화', number: '1366', desc: '24시간 · 여성가족부', color: 'blue' },
  { name: '청소년 위기상담', number: '1388', desc: '24시간 · 여성가족부', color: 'safe' },
  { name: '소방·응급 구조', number: '119', desc: '신체적 위해·부상 시', color: 'danger' },
  { name: '금융감독원', number: '1332', desc: '보이스피싱 신고 전용', color: 'purple' },
] as const

// 제보 유형
export const REPORT_TYPES = [
  { id: 'kidnap_attempt',     label: '납치 시도',  icon: 'alert',    map: true  },
  { id: 'suspicious_vehicle', label: '의심 차량',  icon: 'car',      map: true  },
  { id: 'stalking',           label: '미행·감시',  icon: 'eye',      map: true  },
  { id: 'job_bait',           label: '취업미끼',   icon: 'chat',     map: true  },
  { id: 'danger_zone',        label: '위험 장소',  icon: 'location', map: true  },
  { id: 'fire',               label: '화재·재난',  icon: 'flame',    map: true  },
  { id: 'voice_phishing',     label: '보이스피싱', icon: 'phone',    map: false },
  { id: 'other',              label: '기타 의심',  icon: 'search',   map: true  },
] as const

export const PHISHING_METHODS = [
  { id: 'gov_impersonation', label: '기관사칭'     },
  { id: 'loan_bait',         label: '대출빙자'     },
  { id: 'delivery_bait',     label: '택배사칭'     },
  { id: 'refund_bait',       label: '환급금'       },
  { id: 'family_kidnap',     label: '가족납치빙자' },
] as const

// 포인트 정책
export const POINT_POLICY = {
  daily_login: 10,
  report: 50,
  verify: 5,
  invite: 100,
} as const

// 공공데이터 API 엔드포인트
export const PUBLIC_DATA_ENDPOINTS = {
  cctv: 'https://api.odcloud.kr/api/15075538/v1/uddi:58a5b834-0e22-4af4-948b-b7dddf558168_201905231504',
  bell: 'https://api.odcloud.kr/api/15055804/v1/uddi:b2ea2006-d897-4d39-9d90-f37c5d96a3e4',
  police: 'https://safemap.go.kr/openApiService/data/getPoliceData.do',
  safebox: 'https://api.odcloud.kr/api/15056975/v1/uddi:43d35f56-1e53-485f-b4d1-e2f19f9d5af8',
} as const

// 디자인 토큰
export const COLORS = {
  p900: '#052e16',
  p800: '#14532d',
  p700: '#15803d',
  p600: '#16a34a',
  p500: '#22c55e',
  p300: '#86efac',
  p100: '#dcfce7',
  p50: '#f0fdf4',
  danger: '#dc2626',
  warn: '#d97706',
  fire:  '#ea580c',
  phish: '#7c3aed',
} as const
