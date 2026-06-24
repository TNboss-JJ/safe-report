import { NextRequest, NextResponse } from 'next/server'
import { fetchCCTVData, fetchSafetyBellData, filterByRadius } from '@/lib/api/publicData'
import type { MapMarker } from '@/components/map/KakaoMap'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const lat = parseFloat(searchParams.get('lat') ?? '37.5665')
  const lng = parseFloat(searchParams.get('lng') ?? '126.978')
  const layers = new Set((searchParams.get('layers') ?? 'cctv,bell').split(','))
  const RADIUS_KM = 1.5

  const markers: MapMarker[] = []

  try {
    if (layers.has('cctv')) {
      const res = await fetchCCTVData({ perPage: 3000 })
      const nearby = filterByRadius(
        res.data.filter((d) => d.위도 && d.경도),
        lat, lng, RADIUS_KM,
      )
      nearby.slice(0, 200).forEach((d) => {
        markers.push({
          lat: Number(d.위도),
          lng: Number(d.경도),
          type: 'cctv',
          label: 'CCTV',
          info: d.소재지도로명주소 || d.소재지지번주소,
        })
      })
    }

    if (layers.has('bell')) {
      const res = await fetchSafetyBellData({ perPage: 3000 })
      const nearby = filterByRadius(
        res.data.filter((d) => d.위도 && d.경도),
        lat, lng, RADIUS_KM,
      )
      nearby.forEach((d) => {
        markers.push({
          lat: Number(d.위도),
          lng: Number(d.경도),
          type: 'bell',
          label: '비상벨',
          info: d.설치장소상세내용 || d.소재지도로명주소,
        })
      })
    }
  } catch {
    // API 키 없거나 외부 오류 → 빈 마커 반환
  }

  return NextResponse.json({ markers })
}
