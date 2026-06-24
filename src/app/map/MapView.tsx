'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Bell, AlertTriangle, MapPin, Megaphone, Map } from 'lucide-react'
import type { MapMarker } from '@/components/map/KakaoMap'

const KakaoMap = dynamic(() => import('@/components/map/KakaoMap'), { ssr: false })

type LayerKey = 'cctv' | 'bell' | 'report'

const LAYER_LABELS: Record<LayerKey, React.ReactNode> = {
  cctv:   <>📷 CCTV</>,
  bell:   <><Bell size={13} /> 비상벨</>,
  report: <><AlertTriangle size={13} /> 제보</>,
}

const HAS_KAKAO_KEY = !!process.env.NEXT_PUBLIC_KAKAO_MAP_KEY

export default function MapView() {
  const [activeLayers, setActiveLayers] = useState<Set<LayerKey>>(new Set(['cctv', 'bell', 'report']))
  const [center, setCenter] = useState({ lat: 37.5665, lng: 126.978 })
  const [markers, setMarkers] = useState<MapMarker[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      (pos) => setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => {},
      { timeout: 5000 },
    )
  }, [])

  useEffect(() => {
    if (!HAS_KAKAO_KEY) { setLoading(false); return }
    async function loadMarkers() {
      setLoading(true)
      try {
        const res = await fetch(`/api/map-markers?lat=${center.lat}&lng=${center.lng}&layers=${[...activeLayers].join(',')}`)
        if (res.ok) setMarkers((await res.json()).markers ?? [])
      } catch { /* 오프라인 */ } finally { setLoading(false) }
    }
    loadMarkers()
  }, [center, activeLayers])

  function toggleLayer(key: LayerKey) {
    setActiveLayers(prev => { const n = new Set(prev); n.has(key) ? n.delete(key) : n.add(key); return n })
  }

  function goToMyLocation() {
    navigator.geolocation?.getCurrentPosition(
      (pos) => setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => alert('위치 권한을 허용해주세요'),
    )
  }

  return (
    <div className="relative" style={{ height: 'calc(100dvh - 54px - 36px - 42px - var(--nav-h))' }}>
      {/* 레이어 토글 */}
      <div className="absolute top-3 left-3 right-3 z-10 flex gap-2 flex-wrap">
        {(Object.keys(LAYER_LABELS) as LayerKey[]).map((key) => (
          <button key={key} onClick={() => toggleLayer(key)}
            className={`text-xs px-3 py-1.5 rounded-full font-semibold shadow transition-colors ${
              activeLayers.has(key) ? 'bg-[#052e16] text-white' : 'bg-white text-gray-500 border border-gray-200'
            }`}>
            {LAYER_LABELS[key]}
          </button>
        ))}
        {loading && <span className="text-xs text-gray-400 self-center ml-1">로딩중...</span>}
      </div>

      {/* 지도 or 플레이스홀더 */}
      {HAS_KAKAO_KEY ? (
        <KakaoMap center={center} level={5} markers={markers} className="w-full h-full" />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-3"
          style={{ background: 'var(--bg)' }}>
          <Map size={48} style={{ color: 'var(--p300)' }} />
          <p className="text-[15px] font-black" style={{ color: 'var(--text)' }}>카카오맵 키 미설정</p>
          <p className="text-[12.5px] text-center leading-relaxed px-8" style={{ color: 'var(--text3)' }}>
            Vercel 환경변수에 NEXT_PUBLIC_KAKAO_MAP_KEY를 추가하고<br/>
            카카오 개발자 콘솔에서 도메인을 등록해주세요.
          </p>
          <a href="https://developers.kakao.com" target="_blank" rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl text-white text-[13px] font-bold"
            style={{ background: 'var(--p600)' }}>
            카카오 개발자 콘솔 →
          </a>
        </div>
      )}

      {/* 내 위치 */}
      <button onClick={goToMyLocation}
        className="absolute bottom-4 right-4 z-10 bg-white rounded-full w-11 h-11 shadow-lg flex items-center justify-center border"
        style={{ borderColor: 'var(--border)' }}>
        <MapPin size={20} style={{ color: 'var(--p600)' }} />
      </button>

      {/* 제보 FAB */}
      <a href="/community/new"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 text-white px-5 py-3 rounded-full font-semibold shadow-lg flex items-center gap-2"
        style={{ background: 'var(--p600)' }}>
        <Megaphone size={16} /> 이 위치 제보하기
      </a>
    </div>
  )
}
