import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabase, createServiceClient } from '@/lib/api/supabase-server'

export async function GET(req: NextRequest) {
  const supabase = await createServerSupabase()
  const { searchParams } = new URL(req.url)
  const type = searchParams.get('type')
  const limit = parseInt(searchParams.get('limit') ?? '20')

  let query = supabase
    .from('reports')
    .select('*')
    .eq('is_hidden', false)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (type) query = query.eq('report_type', type)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ reports: data })
}

export async function POST(req: NextRequest) {
  const supabase = await createServerSupabase()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return NextResponse.json({ error: '로그인이 필요합니다' }, { status: 401 })

  const body = await req.json()
  const { report_type, title, body: content, risk_level, address, source_note, is_anonymous } = body

  if (!report_type || !title?.trim() || !content?.trim() || !source_note?.trim()) {
    return NextResponse.json({ error: '필수 필드를 입력해주세요' }, { status: 400 })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase as any)
    .from('reports')
    .insert({
      author_id: user.id,
      is_anonymous: is_anonymous ?? true,
      report_type,
      title: title.trim(),
      body: content.trim(),
      risk_level: risk_level ?? 'medium',
      address: address?.trim() || null,
      source_note: source_note.trim(),
    })
    .select('id')
    .single() as { data: { id: string } | null; error: { message: string } | null }

  if (error || !data) return NextResponse.json({ error: error?.message ?? '오류' }, { status: 500 })

  // 포인트 적립
  const svc = await createServiceClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (svc as any).from('point_logs').insert({
    user_id: user.id,
    delta: 50,
    reason: 'report',
    ref_id: data.id,
  })

  return NextResponse.json({ id: data.id }, { status: 201 })
}
