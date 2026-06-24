'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import type { MapMarker } from '@/components/map/KakaoMap'

const KakaoMap = dynamic(() => import('@/components/map/KakaoMap'), { ssr: false })

type LayerKey = 'cctv' | 'bell' | 'report'

const LAYER_LABELS: Record<LayerKey, string> = {
  cctv:   '📷 CCTV',
  bell:   '🔔 비상벨',
  report: '⚠️ 제보',
}

export default function MapView() {
  const [activeLayers, setActiveLayers] = useState<Set<LayerKey>>(new Set(['cctv', 'bell', 'report']))
  const [center, setCenter] = useState({ lat: 37.5665, lng: 126.978 })
  const [markers, setMarkers] = useState<MapMarker[]>([])
  const [loading, setLoading] = useState(true)

  // 현재 위치 가져오기
  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      (pos) => setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => {},
      { timeout: 5000 },
    )
  }, [])

  // 공공데이터 마커 로드
  useEffect(() => {
    async function loadMarkers() {
      setLoading(true)
      try {
        const res = await fetch(
          `/api/map-markers?lat=${center.lat}&lng=${center.lng}&layers=${[...activeLayers].join(',')}`,
        )
        if (res.ok) {
          const data = await res.json()
          setMarkers(data.markers ?? [])
        }
      } catch {
        // 오프라인이거나 API 키 미설정 시 빈 마커
      } finally {
        setLoading(false)
      }
    }
    loadMarkers()
  }, [center, activeLayers])

  function toggleLayer(key: LayerKey) {
    setActiveLayers((prev) => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })
  }

  function goToMyLocation() {
    navigator.geolocation?.getCurrentPosition(
      (pos) => setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => alert('위치 권한을 허용해주세요'),
    )
  }

  return (
    <div className="relative h-[calc(100vh-3.5rem-4rem)]">
      {/* 지도 */}
      <KakaoMap center={center} level={5} markers={markers} className="w-full h-full" />

      {/* 레이어 토글 */}
      <div className="absolute top-3 left-3 right-3 z-10 flex gap-2 flex-wrap">
        {(Object.keys(LAYER_LABELS) as LayerKey[]).map((key) => (
          <button
            key={key}
            onClick={() => toggleLayer(key)}
            className={`text-xs px-3 py-1.5 rounded-full font-semibold shadow transition-colors ${
              activeLayers.has(key)
                ? 'bg-[#052e16] text-white'
                : 'bg-white text-gray-500 border border-gray-200'
            }`}
          >
            {LAYER_LABELS[key]}
          </button>
        ))}
        {loading && <span className="text-xs text-gray-400 self-center ml-1">로딩중...</span>}
      </div>

      {/* 내 위치 버튼 */}
      <button
        onClick={goToMyLocation}
        className="absolute bottom-4 right-4 z-10 bg-white rounded-full w-11 h-11 shadow-lg flex items-center justify-center text-xl border border-green-100"
      >
        📍
      </button>

      {/* 제보하기 FAB */}
      <a
        href="/community/new"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-[#16a34a] text-white px-5 py-3 rounded-full font-semibold shadow-lg flex items-center gap-2"
      >
        <span>📢</span> 이 위치 제보하기
      </a>
    </div>
  )
}
