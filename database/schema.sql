-- Audit logging table for HIPAA compliance
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  resource TEXT NOT NULL,
  ip_address TEXT NOT NULL, -- Stored as hashed value
  user_agent TEXT,
  metadata JSONB,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  
  -- Indexes for performance
  CONSTRAINT audit_logs_action_check CHECK (action IN (
    'USER_LOGIN',
    'USER_LOGOUT', 
    'USER_REGISTER',
    'PASSWORD_CHANGE',
    'PATIENT_DATA_ACCESS',
    'PATIENT_DATA_UPDATE',
    'APPOINTMENT_CREATE',
    'APPOINTMENT_UPDATE',
    'APPOINTMENT_DELETE',
    'CONTACT_FORM_SUBMIT',
    'API_ACCESS_DENIED',
    'RATE_LIMIT_EXCEEDED',
    'SECURITY_VIOLATION'
  ))
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_timestamp ON audit_logs(timestamp);
CREATE INDEX IF NOT EXISTS idx_audit_logs_resource ON audit_logs(resource);

-- Encrypted patient data fields (existing patients table enhancements)
-- Note: This assumes you already have a patients table
-- ALTER TABLE patients ADD COLUMN IF NOT EXISTS encrypted_ssn TEXT;
-- ALTER TABLE patients ADD COLUMN IF NOT EXISTS encrypted_dob TEXT;
-- ALTER TABLE patients ADD COLUMN IF NOT EXISTS data_encrypted_at TIMESTAMPTZ;

-- Analytics events table (privacy compliant)
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event TEXT NOT NULL,
  page TEXT NOT NULL,
  session_id UUID NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  ip_hash TEXT NOT NULL, -- Hashed IP for privacy
  browser_family TEXT,
  
  -- Indexes
  CONSTRAINT analytics_events_event_check CHECK (event IN (
    'page_view',
    'contact_form_view',
    'contact_form_submit',
    'appointment_request',
    'blog_read',
    'service_page_view'
  ))
);

CREATE INDEX IF NOT EXISTS idx_analytics_events_event ON analytics_events(event);
CREATE INDEX IF NOT EXISTS idx_analytics_events_timestamp ON analytics_events(timestamp);
CREATE INDEX IF NOT EXISTS idx_analytics_events_session ON analytics_events(session_id);

-- Row Level Security policies
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Only allow service role to access audit logs (admin only)
CREATE POLICY "Service role can access audit logs" ON audit_logs
  FOR ALL USING (auth.role() = 'service_role');

-- Users can only see their own audit logs
CREATE POLICY "Users can view their own audit logs" ON audit_logs
  FOR SELECT USING (auth.uid() = user_id);

-- Analytics events - no direct user access (service role only)
CREATE POLICY "Service role can access analytics" ON analytics_events
  FOR ALL USING (auth.role() = 'service_role');

-- Comments for documentation
COMMENT ON TABLE audit_logs IS 'HIPAA-compliant audit trail for patient data access and system events';
COMMENT ON TABLE analytics_events IS 'Privacy-compliant analytics events with anonymized data';
COMMENT ON COLUMN audit_logs.ip_address IS 'IP address stored as SHA-256 hash for privacy';
COMMENT ON COLUMN analytics_events.ip_hash IS 'IP address stored as SHA-256 hash for privacy';

-- Example data retention policy (run periodically)
-- DELETE FROM audit_logs WHERE timestamp < NOW() - INTERVAL '7 years';
-- DELETE FROM analytics_events WHERE timestamp < NOW() - INTERVAL '2 years';