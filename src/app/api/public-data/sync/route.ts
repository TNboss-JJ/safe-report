/**
 * POST /api/public-data/sync
 * 공공데이터 → Supabase 동기화 (Vercel Cron 또는 수동 실행)
 * Authorization: Bearer {SUPABASE_SERVICE_ROLE_KEY}
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import {
  fetchCCTVData,
  fetchSafetyBellData,
  fetchSafeBoxData,
} from '@/lib/api/publicData'

export async function POST(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )
  // 간단한 인증
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const results: Record<string, unknown> = {}

  try {
    // 1. CCTV 동기화
    const cctvRes = await fetchCCTVData({ perPage: 3000 })
    const cctvRows = cctvRes.data
      .filter((d) => d.위도 && d.경도)
      .map((d) => ({
        address: d.소재지도로명주소 || d.소재지지번주소,
        lat: Number(d.위도),
        lng: Number(d.경도),
        purpose: d.설치목적구분,
        camera_count: Number(d.카메라대수) || 1,
        installed_at: d.설치연월 || null,
        manager: d.관리기관명,
        is_active: true,
        synced_at: new Date().toISOString(),
      }))

    const { error: cctvErr } = await supabase
      .from('cctv_locations')
      .upsert(cctvRows, { onConflict: 'lat,lng' })

    results.cctv = cctvErr ? `오류: ${cctvErr.message}` : `${cctvRows.length}건 동기화`

    // 2. 안전비상벨 동기화
    const bellRes = await fetchSafetyBellData({ perPage: 3000 })
    const bellRows = bellRes.data
      .filter((d) => d.위도 && d.경도)
      .map((d) => ({
        type: 'bell',
        name: d.설치장소상세내용,
        address: d.소재지도로명주소,
        lat: Number(d.위도),
        lng: Number(d.경도),
        synced_at: new Date().toISOString(),
      }))

    const { error: bellErr } = await supabase
      .from('safety_facilities')
      .upsert(bellRows, { onConflict: 'type,lat,lng' })

    results.bells = bellErr ? `오류: ${bellErr.message}` : `${bellRows.length}건 동기화`

    // 3. 여성안심택배함 동기화
    const safeboxRes = await fetchSafeBoxData({ perPage: 3000 })
    const safeboxRows = safeboxRes.data
      .filter((d) => d.위도 && d.경도)
      .map((d) => ({
        type: 'safebox',
        name: d.관리기관명,
        address: d.소재지도로명주소,
        lat: Number(d.위도),
        lng: Number(d.경도),
        synced_at: new Date().toISOString(),
      }))

    const { error: safeboxErr } = await supabase
      .from('safety_facilities')
      .upsert(safeboxRows, { onConflict: 'type,lat,lng' })

    results.safebox = safeboxErr ? `오류: ${safeboxErr.message}` : `${safeboxRows.length}건 동기화`

    return NextResponse.json({
      success: true,
      synced_at: new Date().toISOString(),
      results,
    })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
