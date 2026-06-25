import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/api/supabase-server'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: reportId } = await params
  const supabase = await createServerSupabase()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase as any)
    .from('sr_comments')
    .select('id, author_id, is_anonymous, body, created_at')
    .eq('report_id', reportId)
    .order('created_at', { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ comments: data ?? [] })
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: reportId } = await params
  const supabase = await createServerSupabase()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: '로그인 필요' }, { status: 401 })

  const { body, is_anonymous } = await req.json()
  if (!body?.trim()) return NextResponse.json({ error: '내용을 입력하세요' }, { status: 400 })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase as any)
    .from('sr_comments')
    .insert({ report_id: reportId, author_id: user.id, is_anonymous: is_anonymous ?? true, body: body.trim() })
    .select('id, author_id, is_anonymous, body, created_at')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ comment: data }, { status: 201 })
}
