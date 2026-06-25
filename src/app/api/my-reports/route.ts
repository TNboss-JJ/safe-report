import { NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/api/supabase-server'

export async function GET() {
  const supabase = await createServerSupabase()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: '로그인 필요' }, { status: 401 })

  const { data, error } = await supabase
    .from('reports')
    .select('id, title, risk_level, address, verify_count, view_count, created_at, is_hidden')
    .eq('author_id', user.id)
    .order('created_at', { ascending: false })
    .limit(20)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ reports: data ?? [] })
}
