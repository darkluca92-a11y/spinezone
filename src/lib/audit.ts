// Demo audit utilities - simplified for static export

export interface AuditLogEntry {
  user_id?: string;
  action: string;
  resource: string;
  ip_address: string;
  user_agent?: string;
  metadata?: Record<string, any>;
  timestamp?: string;
}

export const logAuditEvent = async (entry: AuditLogEntry): Promise<void> => {
  // Demo implementation - log to console instead of database
  console.log('Audit Event:', {
    user_id: entry.user_id || 'anonymous',
    action: entry.action,
    resource: entry.resource,
    ip_address: 'hidden', // Don't log real IP in demo
    user_agent: entry.user_agent?.substring(0, 50) || 'unknown',
    metadata: entry.metadata,
    timestamp: entry.timestamp || new Date().toISOString(),
  });
};

// Audit action constants
export const AUDIT_ACTIONS = {
  LOGIN: 'user.login',
  LOGOUT: 'user.logout',
  SIGNUP: 'user.signup',
  PASSWORD_CHANGE: 'user.password_change',
  FORM_SUBMIT: 'form.submit',
  PAGE_VIEW: 'page.view',
  CONTACT_SUBMIT: 'contact.submit',
  ASSESSMENT_COMPLETE: 'assessment.complete',
  DOWNLOAD: 'resource.download',
  ERROR: 'system.error'
} as const;

// Client info helper for Next.js Request objects  
export const getClientInfo = (request: any) => {
  return {
    ip: 'demo-ip', // Demo IP
    userAgent: 'demo-user-agent', // Demo user agent
    timestamp: new Date().toISOString()
  };
};