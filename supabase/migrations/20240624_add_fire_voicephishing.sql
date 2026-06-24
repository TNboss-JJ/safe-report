-- ReportType check constraint 업데이트
alter table reports drop constraint if exists reports_report_type_check;
alter table reports add constraint reports_report_type_check
  check (report_type in (
    'kidnap_attempt','suspicious_vehicle','stalking',
    'job_bait','danger_zone','fire','voice_phishing','other'
  ));

-- 보이스피싱 전용 컬럼
alter table reports
  add column if not exists phishing_method text[],
  add column if not exists region text;

-- location nullable (보이스피싱은 위치 없음)
alter table reports alter column location drop not null;
