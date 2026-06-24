export type ReportType =
  | 'kidnap_attempt'
  | 'suspicious_vehicle'
  | 'stalking'
  | 'job_bait'
  | 'danger_zone'
  | 'fire'
  | 'voice_phishing'
  | 'other'

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical'

// ── Row types ──────────────────────────────────────────────────

export interface ProfileRow {
  id: string
  nickname: string
  avatar_url: string | null
  points: number
  report_count: number
  created_at: string
}

export interface ReportRow {
  id: string
  author_id: string | null
  is_anonymous: boolean
  report_type: ReportType
  title: string
  body: string
  risk_level: RiskLevel
  location: unknown | null
  address: string | null
  images: string[]
  source_note: string | null
  verify_count: number
  view_count: number
  is_verified: boolean
  is_hidden: boolean
  created_at: string
  updated_at: string
}

export interface ReportInsert {
  author_id?: string | null
  is_anonymous?: boolean
  report_type: ReportType
  title: string
  body: string
  risk_level?: RiskLevel
  location?: unknown | null
  address?: string | null
  images?: string[]
  source_note?: string | null
}

export interface CommentRow {
  id: string
  report_id: string
  author_id: string | null
  is_anonymous: boolean
  body: string
  created_at: string
}

export interface PointLogInsert {
  user_id: string
  delta: number
  reason: string
  ref_id?: string | null
}

// ── Supabase Database generic ───────────────────────────────────

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: ProfileRow
        Insert: Partial<ProfileRow> & { id: string }
        Update: Partial<ProfileRow>
      }
      reports: {
        Row: ReportRow
        Insert: ReportInsert
        Update: Partial<ReportRow>
      }
      report_verifies: {
        Row: { id: string; report_id: string; user_id: string; created_at: string }
        Insert: { report_id: string; user_id: string }
        Update: Record<string, never>
      }
      comments: {
        Row: CommentRow
        Insert: Omit<CommentRow, 'id' | 'created_at'>
        Update: Record<string, never>
      }
      point_logs: {
        Row: { id: string; user_id: string; delta: number; reason: string; ref_id: string | null; created_at: string }
        Insert: PointLogInsert
        Update: Record<string, never>
      }
    }
    Functions: {
      reports_near: {
        Args: { lat: number; lng: number; radius_m: number }
        Returns: ReportRow[]
      }
    }
    Views: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
