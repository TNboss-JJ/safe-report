/**
 * 공공데이터포털 (data.go.kr) API 클라이언트
 * PUBLIC_DATA_API_KEY 하나로 전체 API 사용
 */

const API_KEY = process.env.PUBLIC_DATA_API_KEY!
const BASE_URL = 'https://api.odcloud.kr/api'

// ── 공통 fetch 래퍼 ──────────────────────────────────────────
async function publicDataFetch<T>(url: string, params: Record<string, string | number> = {}): Promise<T> {
  const searchParams = new URLSearchParams({
    serviceKey: API_KEY,
    page: '1',
    perPage: '1000',
    returnType: 'JSON',
    ...Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)])),
  })

  const res = await fetch(`${url}?${searchParams}`, {
    next: { revalidate: 60 * 60 * 24 }, // 24시간 캐시
  })

  if (!res.ok) {
    throw new Error(`공공데이터 API 오류: ${res.status} ${url}`)
  }

  return res.json()
}

// ── 타입 정의 ────────────────────────────────────────────────

export interface CCTVData {
  관리기관명: string
  소재지도로명주소: string
  소재지지번주소: string
  설치목적구분: string  // '방범' | '교통' | '재난' | '기타'
  카메라대수: number
  카메라화소수: string
  촬영방면정보: string
  설치연월: string
  위도: number
  경도: number
}

export interface SafetyBellData {
  관리기관명: string
  소재지도로명주소: string
  소재지지번주소: string
  설치장소상세내용: string
  위도: number
  경도: number
}

export interface PoliceFacilityData {
  치안시설명: string
  치안시설분류: string  // '경찰서' | '지구대' | '파출소' | '치안센터'
  소재지도로명주소: string
  위도: number
  경도: number
  전화번호: string
}

export interface SafeBoxData {
  관리기관명: string
  소재지도로명주소: string
  소재지지번주소: string
  운영시간: string
  위도: number
  경도: number
}

interface ApiResponse<T> {
  currentCount: number
  data: T[]
  matchCount: number
  page: number
  perPage: number
  totalCount: number
}

// ── API 함수들 ───────────────────────────────────────────────

/**
 * 전국 방범 CCTV 위치 조회
 * apis.data.go.kr/1741000/cctv_info
 */
export async function fetchCCTVData(params?: { page?: number; perPage?: number }) {
  const numOfRows = params?.perPage ?? 1000
  const pageNo = params?.page ?? 1

  const searchParams = new URLSearchParams({
    serviceKey: API_KEY,
    pageNo: String(pageNo),
    numOfRows: String(numOfRows),
    type: 'json',
  })

  const res = await fetch(
    `https://apis.data.go.kr/1741000/cctv_info?${searchParams}`,
    { next: { revalidate: 60 * 60 * 24 } },
  )
  if (!res.ok) throw new Error(`CCTV API 오류: ${res.status}`)

  const json = await res.json()

  // apis.data.go.kr 응답 형식: { response: { body: { items: [...], totalCount } } }
  // 또는 직접 배열인 경우도 있음
  const items: CCTVData[] =
    json?.response?.body?.items ??
    json?.items ??
    json?.data ??
    []

  return {
    data: Array.isArray(items) ? items : Object.values(items),
    totalCount: json?.response?.body?.totalCount ?? items.length,
    currentCount: items.length,
    page: pageNo,
    perPage: numOfRows,
    matchCount: items.length,
  } as ApiResponse<CCTVData>
}

/**
 * 전국 안전비상벨 위치 조회
 * data.go.kr/data/15055804
 */
export async function fetchSafetyBellData(params?: { page?: number; perPage?: number }) {
  return publicDataFetch<ApiResponse<SafetyBellData>>(
    `${BASE_URL}/15055804/v1/uddi:b2ea2006-d897-4d39-9d90-f37c5d96a3e4`,
    params,
  )
}

/**
 * 생활안전지도 치안시설 (경찰서·파출소·지구대) 조회
 * data.go.kr/data/15101889
 */
export async function fetchPoliceFacilityData(params?: { page?: number; perPage?: number }) {
  return publicDataFetch<ApiResponse<PoliceFacilityData>>(
    'https://safemap.go.kr/openApiService/data/getPoliceData.do',
    params,
  )
}

/**
 * 전국 여성안심택배함 위치 조회
 * data.go.kr/data/15056975
 */
export async function fetchSafeBoxData(params?: { page?: number; perPage?: number }) {
  return publicDataFetch<ApiResponse<SafeBoxData>>(
    `${BASE_URL}/15056975/v1/uddi:43d35f56-1e53-485f-b4d1-e2f19f9d5af8`,
    params,
  )
}

/**
 * 좌표 기반 반경 내 CCTV 필터링
 */
export function filterByRadius<T extends { 위도: number; 경도: number }>(
  items: T[],
  centerLat: number,
  centerLng: number,
  radiusKm: number,
): T[] {
  return items.filter((item) => {
    const dist = getDistanceKm(centerLat, centerLng, item.위도, item.경도)
    return dist <= radiusKm
  })
}

/**
 * Haversine 공식으로 두 좌표 간 거리(km) 계산
 */
export function getDistanceKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

function toRad(deg: number) {
  return (deg * Math.PI) / 180
}
