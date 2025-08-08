// Demo rate limiter implementation - simplified for static export
interface RateLimitResult {
  success: boolean;
  error?: string;
}

export const contactRateLimiter = {
  // Demo implementation - always allows requests
};

export const generalRateLimiter = {
  // Demo implementation - always allows requests  
};

export const authRateLimiter = {
  // Demo implementation - always allows requests
};

// Helper function to handle rate limiting - demo version
export const checkRateLimit = async (
  rateLimiter: any,
  req: any
): Promise<RateLimitResult> => {
  // Demo implementation - always allows requests
  return { success: true };
};