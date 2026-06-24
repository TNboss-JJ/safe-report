import { NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/api/supabase-server'

export async function GET() {
  const supabase = await createServerSupabase()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: pointsRaw } = await (supabase as any)
    .from('sr_profiles')
    .select('id, nickname, points, streak_days')
    .order('points', { ascending: false })
    .limit(10)
  const points = (pointsRaw ?? []) as Array<{ id: string; nickname: string; points: number; streak_days: number }>

  const { data: reportsRaw } = await supabase
    .from('reports')
    .select('address')
    .eq('is_hidden', false)
    .not('address', 'is', null)

  const reports = (reportsRaw ?? []) as Array<{ address: string | null }>

  const regionCount: Record<string, number> = {}
  for (const r of reports) {
    const match = (r.address ?? '').match(/([가-힣]+[구군시])\s/)
    if (match) {
      const region = match[1]
      regionCount[region] = (regionCount[region] ?? 0) + 1
    }
  }
  const topRegions = Object.entries(regionCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([name, count]) => ({ name, count }))

  return NextResponse.json({ points, regions: topRegions })
}
