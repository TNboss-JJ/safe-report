# 세이프리포트 (SafeReport) — CLAUDE.md

## 프로젝트 개요
시민 안전 제보 커뮤니티 PWA
"우리 동네 위험 정보를 함께 만드는 시민 안전망"

## 핵심 원칙 (절대 위반 금지)
1. 포지셔닝 언어: 관찰·제보·목격 ✅ | 진단·범인특정·국적비하 ❌
2. 모든 제보에 출처·익명 여부 필드 필수
3. 허위 제보 방지 문구 모든 제보 폼에 포함
4. 미성년자 관련 정보는 별도 보호 처리

## 스택
- Next.js 14 App Router + TypeScript
- Tailwind CSS (그린 테마)
- Supabase (PostgreSQL + RLS)
- Vercel 배포
- 카카오맵 SDK
- 공공데이터포털 API (data.go.kr)

## 폴더 구조
src/app/          → 페이지 라우트 (map, community, ranking, safety, news, kids, sos, account)
src/app/api/      → API 라우트 (reports, cctv, taxi, location, public-data, auth)
src/components/   → UI 컴포넌트 (ui, map, community, safety, news, kids, sos, shared)
src/lib/api/      → 외부 API 클라이언트 (publicData, kakaoMap, supabase)
src/lib/db/       → Supabase 쿼리 함수
src/types/        → TypeScript 타입
src/constants/    → 상수 (긴급연락처, API URL 등)

## 공공데이터 API (PUBLIC_DATA_API_KEY 하나로 전체 사용)
- 전국CCTV표준데이터     → CCTV 경로 확인 레이어 (주 1회 동기화)
- 전국안전비상벨위치     → 지도 비상벨 마커
- 생활안전지도 치안시설  → 경찰서·파출소 마커
- 여성안심택배함         → 귀가 안전 시설
- 교통CCTV              → 도로 CCTV 보조 레이어

## 환경변수
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_KAKAO_MAP_KEY=
PUBLIC_DATA_API_KEY=        ← data.go.kr 인증키
ANTHROPIC_API_KEY=
SOLAPI_API_KEY=
SOLAPI_API_SECRET=

## 디자인 토큰 (그린 테마)
헤더/탭바: #052e16 (딥 포레스트)
주요 버튼: #16a34a
액센트:   #22c55e
위험:     #dc2626 (SOS, 고위험)
주의:     #d97706
배경:     #f0fdf4

## 커밋 & 배포
git add . && git commit -m "feat: [내용]" && git push origin main

## 긴급 연락처 상수
112 경찰 | 182 실종 | 1366 여성긴급 | 1388 청소년 | 119 소방
