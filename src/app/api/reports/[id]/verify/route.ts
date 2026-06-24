import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabase, createServiceClient } from '@/lib/api/supabase-server'

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: reportId } = await params
  const supabase = await createServerSupabase()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return NextResponse.json({ error: '로그인이 필요합니다' }, { status: 401 })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: existing } = await (supabase as any)
    .from('report_verifies')
    .select('id')
    .eq('report_id', reportId)
    .eq('user_id', user.id)
    .maybeSingle()

  if (existing) return NextResponse.json({ error: '이미 목격 확인한 제보입니다' }, { status: 409 })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error: verifyError } = await (supabase as any)
    .from('report_verifies')
    .insert({ report_id: reportId, user_id: user.id })

  if (verifyError) return NextResponse.json({ error: verifyError.message }, { status: 500 })

  const svc = await createServiceClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const svcAny = svc as any

  const { data: rep } = await svcAny
    .from('reports')
    .select('verify_count')
    .eq('id', reportId)
    .single()

  await svcAny
    .from('reports')
    .update({ verify_count: (rep?.verify_count ?? 0) + 1 })
    .eq('id', reportId)

  await svcAny.from('point_logs').insert({
    user_id: user.id,
    delta: 5,
    reason: 'verify',
    ref_id: reportId,
  })

  return NextResponse.json({ ok: true })
}
