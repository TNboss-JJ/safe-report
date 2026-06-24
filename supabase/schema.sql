-- ================================================================
-- 세이프리포트 Supabase 스키마
-- ================================================================

-- PostGIS (지리 좌표 쿼리용)
create extension if not exists postgis;

-- ── users (auth.users 확장) ──────────────────────────────────
create table public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  nickname    text not null default '익명제보자',
  avatar_url  text,
  points      int  not null default 0,
  report_count int not null default 0,
  created_at  timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "누구나 프로필 조회 가능" on public.profiles
  for select using (true);

create policy "본인 프로필만 수정 가능" on public.profiles
  for update using (auth.uid() = id);

-- ── reports (시민 제보) ──────────────────────────────────────
create type report_type_enum as enum (
  'kidnap_attempt',
  'suspicious_vehicle',
  'stalking',
  'job_bait',
  'danger_zone',
  'other'
);

create type risk_level_enum as enum ('low', 'medium', 'high', 'critical');

create table public.reports (
  id            uuid        primary key default gen_random_uuid(),
  author_id     uuid        references public.profiles(id) on delete set null,
  is_anonymous  boolean     not null default true,
  report_type   report_type_enum not null,
  title         text        not null,
  body          text        not null,
  risk_level    risk_level_enum not null default 'medium',
  location      geography(Point, 4326),
  address       text,
  images        text[]      default '{}',
  source_note   text,       -- 출처 (목격, SNS 공유, 뉴스 등)
  verify_count  int         not null default 0,
  view_count    int         not null default 0,
  is_verified   boolean     not null default false,
  is_hidden     boolean     not null default false, -- 관리자 숨김
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

alter table public.reports enable row level security;

create policy "공개 제보 누구나 조회" on public.reports
  for select using (not is_hidden);

create policy "로그인 사용자 제보 작성" on public.reports
  for insert with check (auth.uid() is not null);

create policy "본인 제보 수정/삭제" on public.reports
  for update using (auth.uid() = author_id);

-- 최신 제보 빠른 조회 인덱스
create index on public.reports (created_at desc);
-- 위치 기반 반경 쿼리 인덱스
create index on public.reports using gist(location);
-- 제보 유형 필터 인덱스
create index on public.reports (report_type);

-- ── report_verifies (제보 목격 확인) ────────────────────────
create table public.report_verifies (
  id         uuid        primary key default gen_random_uuid(),
  report_id  uuid        not null references public.reports(id) on delete cascade,
  user_id    uuid        not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(report_id, user_id)
);

alter table public.report_verifies enable row level security;

create policy "로그인 사용자 목격 확인" on public.report_verifies
  for insert with check (auth.uid() = user_id);

create policy "목격 확인 조회" on public.report_verifies
  for select using (true);

-- verify_count 자동 갱신 트리거
create or replace function update_verify_count()
returns trigger language plpgsql as $$
begin
  update public.reports
  set verify_count = (
    select count(*) from public.report_verifies where report_id = coalesce(new.report_id, old.report_id)
  )
  where id = coalesce(new.report_id, old.report_id);
  return coalesce(new, old);
end;
$$;

create trigger trg_verify_count
after insert or delete on public.report_verifies
for each row execute function update_verify_count();

-- ── comments ────────────────────────────────────────────────
create table public.comments (
  id           uuid        primary key default gen_random_uuid(),
  report_id    uuid        not null references public.reports(id) on delete cascade,
  author_id    uuid        references public.profiles(id) on delete set null,
  is_anonymous boolean     not null default true,
  body         text        not null,
  created_at   timestamptz not null default now()
);

alter table public.comments enable row level security;

create policy "댓글 조회" on public.comments for select using (true);
create policy "로그인 댓글 작성" on public.comments
  for insert with check (auth.uid() is not null);

-- ── cctv_cache (공공데이터 동기화 캐시) ─────────────────────
create table public.cctv_cache (
  id          serial      primary key,
  location    geography(Point, 4326) not null,
  address     text,
  agency      text,
  purpose     text,       -- '방범' | '교통' | '재난' | '기타'
  camera_count int,
  synced_at   timestamptz not null default now()
);

create index on public.cctv_cache using gist(location);

-- ── safety_bells (비상벨 캐시) ──────────────────────────────
create table public.safety_bells (
  id       serial primary key,
  location geography(Point, 4326) not null,
  address  text,
  agency   text,
  detail   text,
  synced_at timestamptz not null default now()
);

create index on public.safety_bells using gist(location);

-- ── point_logs (포인트 내역) ─────────────────────────────────
create table public.point_logs (
  id         uuid        primary key default gen_random_uuid(),
  user_id    uuid        not null references public.profiles(id) on delete cascade,
  delta      int         not null,  -- 양수: 적립, 음수: 차감
  reason     text        not null,  -- 'report' | 'verify' | 'daily_login' | 'invite'
  ref_id     uuid,                  -- 관련 report_id 등
  created_at timestamptz not null default now()
);

alter table public.point_logs enable row level security;

create policy "본인 포인트 내역 조회" on public.point_logs
  for select using (auth.uid() = user_id);

-- 포인트 적립 시 profiles.points 자동 갱신
create or replace function update_user_points()
returns trigger language plpgsql as $$
begin
  update public.profiles
  set points = points + new.delta
  where id = new.user_id;
  return new;
end;
$$;

create trigger trg_points
after insert on public.point_logs
for each row execute function update_user_points();

-- ── 반경 내 제보 조회 헬퍼 함수 ─────────────────────────────
create or replace function reports_near(lat float, lng float, radius_m float)
returns setof public.reports language sql stable as $$
  select * from public.reports
  where not is_hidden
    and ST_DWithin(
      location,
      ST_SetSRID(ST_MakePoint(lng, lat), 4326)::geography,
      radius_m
    )
  order by created_at desc;
$$;
