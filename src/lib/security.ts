// Demo security utilities - simplified for static export

// Encryption utilities - demo versions
export const encryptData = (data: string): string => {
  // Demo implementation - returns base64 encoded data
  return Buffer.from(data).toString('base64');
};

export const decryptData = (encryptedData: string): string => {
  // Demo implementation - returns base64 decoded data
  return Buffer.from(encryptedData, 'base64').toString();
};

// Password hashing utilities - demo versions
export const hashPassword = async (password: string): Promise<string> => {
  // Demo implementation - returns a simple hash
  return `demo_hash_${Buffer.from(password).toString('base64')}`;
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  // Demo implementation - simple comparison
  const expectedHash = await hashPassword(password);
  return hash === expectedHash;
};

// JWT utilities - demo versions
export const createJWT = (payload: object): string => {
  // Demo implementation - returns encoded payload
  return Buffer.from(JSON.stringify(payload)).toString('base64');
};

export const verifyJWT = (token: string): object | null => {
  try {
    // Demo implementation - decodes payload
    return JSON.parse(Buffer.from(token, 'base64').toString());
  } catch {
    return null;
  }
};

// IP hashing for privacy
export const hashIP = (ip: string): string => {
  // Demo implementation - simple hash
  return Buffer.from(ip).toString('base64');
};

// Create audit token
export const createAuditToken = (): string => {
  // Demo implementation - random string
  return Math.random().toString(36).substring(7);
};

// Password strength validation
export const validatePasswordStrength = (password: string) => {
  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasMinLength = password.length >= 8;
  
  const score = [hasLowerCase, hasUpperCase, hasNumbers, hasSpecialChar, hasMinLength]
    .filter(Boolean).length;
  
  return {
    score,
    isValid: score >= 4, // Require at least 4 out of 5 criteria
    feedback: {
      hasLowerCase,
      hasUpperCase, 
      hasNumbers,
      hasSpecialChar,
      hasMinLength
    }
  };
};