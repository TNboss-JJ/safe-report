'use client'

import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    kakao: {
      maps: {
        load: (callback: () => void) => void
        Map: new (container: HTMLElement, opts: KakaoMapOptions) => KakaoMapInstance
        LatLng: new (lat: number, lng: number) => KakaoLatLng
        Marker: new (opts: { position: KakaoLatLng; map?: KakaoMapInstance; title?: string }) => KakaoMarker
        InfoWindow: new (opts: { content: string; removable?: boolean }) => KakaoInfoWindow
        MarkerImage: new (src: string, size: KakaoSize) => KakaoMarkerImage
        Size: new (w: number, h: number) => KakaoSize
        event: {
          addListener: (target: unknown, type: string, handler: (...args: unknown[]) => void) => void
        }
      }
    }
  }
}

interface KakaoMapOptions { center: KakaoLatLng; level: number }
interface KakaoMapInstance { setCenter(latlng: KakaoLatLng): void }
interface KakaoLatLng { getLat(): number; getLng(): number }
interface KakaoMarker { setMap(map: KakaoMapInstance | null): void }
interface KakaoInfoWindow { open(map: KakaoMapInstance, marker: KakaoMarker): void; close(): void }
interface KakaoMarkerImage {}
interface KakaoSize {}

export interface MapMarker {
  lat: number
  lng: number
  type: 'cctv' | 'bell' | 'safebox' | 'report'
  label?: string
  info?: string
}

interface KakaoMapProps {
  center?: { lat: number; lng: number }
  level?: number
  markers?: MapMarker[]
  onMapClick?: (lat: number, lng: number) => void
  className?: string
}

const MARKER_ICONS: Record<MapMarker['type'], string> = {
  cctv:    '📷',
  bell:    '🔔',
  safebox: '📦',
  report:  '⚠️',
}

export default function KakaoMap({
  center = { lat: 37.5665, lng: 126.978 },
  level = 5,
  markers = [],
  onMapClick,
  className = 'w-full h-full',
}: KakaoMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<KakaoMapInstance | null>(null)
  const markersRef = useRef<KakaoMarker[]>([])

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY
    if (!key) { console.error('[KakaoMap] NEXT_PUBLIC_KAKAO_MAP_KEY 없음'); return }
    if (!containerRef.current) return

    function initMap() {
      if (!containerRef.current || !window.kakao?.maps) return
      const latlng = new window.kakao.maps.LatLng(center.lat, center.lng)
      mapRef.current = new window.kakao.maps.Map(containerRef.current, { center: latlng, level })
      if (onMapClick) {
        window.kakao.maps.event.addListener(mapRef.current, 'click', (...args: unknown[]) => {
          const e = args[0] as { latLng: KakaoLatLng }
          onMapClick(e.latLng.getLat(), e.latLng.getLng())
        })
      }
    }

    if (window.kakao?.maps) {
      initMap()
      return
    }

    const existing = document.getElementById('kakao-map-sdk')
    if (existing) {
      existing.addEventListener('load', initMap)
      return
    }

    // autoload=false 제거 → SDK가 즉시 자동 초기화
    const script = document.createElement('script')
    script.id = 'kakao-map-sdk'
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${key}`
    script.onload = initMap
    script.onerror = () => console.error('[KakaoMap] SDK 로드 실패 — 도메인/키 확인')
    document.head.appendChild(script)

    return () => {
      document.getElementById('kakao-map-sdk')?.removeEventListener('load', initMap)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 마커 갱신
  useEffect(() => {
    if (!mapRef.current || !window.kakao?.maps) return

    // 기존 마커 제거
    markersRef.current.forEach((m) => m.setMap(null))
    markersRef.current = []

    markers.forEach(({ lat, lng, type, label, info }) => {
      const position = new window.kakao.maps.LatLng(lat, lng)
      const marker = new window.kakao.maps.Marker({ position, map: mapRef.current!, title: label })
      markersRef.current.push(marker)

      if (info) {
        const infoWindow = new window.kakao.maps.InfoWindow({
          content: `<div style="padding:6px 10px;font-size:12px;white-space:nowrap">${MARKER_ICONS[type]} ${info}</div>`,
          removable: true,
        })
        window.kakao.maps.event.addListener(marker, 'click', () => {
          infoWindow.open(mapRef.current!, marker)
        })
      }
    })
  }, [markers])

  return <div ref={containerRef} className={className} />
}
