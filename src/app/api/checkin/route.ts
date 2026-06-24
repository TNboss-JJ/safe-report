import { NextResponse } from 'next/server'
import { createServerSupabase, createServiceClient } from '@/lib/api/supabase-server'

export async function POST() {
  const supabase = await createServerSupabase()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: '로그인 필요' }, { status: 401 })

  const svc = await createServiceClient()
  const today = new Date().toISOString().split('T')[0]

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: profile } = await (svc as any)
    .from('sr_profiles')
    .select('last_checkin, streak_days, points')
    .eq('id', user.id)
    .single() as { data: { last_checkin: string | null; streak_days: number | null; points: number | null } | null }

  if (!profile) return NextResponse.json({ error: '프로필 없음' }, { status: 404 })
  if (profile.last_checkin === today) return NextResponse.json({ error: '오늘 이미 출석했어요', points: profile.points }, { status: 409 })

  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
  const newStreak = profile.last_checkin === yesterday ? (profile.streak_days ?? 0) + 1 : 1

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (svc as any).from('sr_profiles').update({
    last_checkin: today,
    streak_days: newStreak,
    points: (profile.points ?? 0) + 10,
  }).eq('id', user.id)

  await svc.from('point_logs').insert({
    user_id: user.id,
    delta: 10,
    reason: 'checkin',
  } as never)

  return NextResponse.json({ ok: true, streak: newStreak, points: (profile.points ?? 0) + 10 })
}
