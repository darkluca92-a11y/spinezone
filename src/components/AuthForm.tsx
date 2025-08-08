'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Lock, Mail, User, Eye, EyeOff, Shield, Check, X } from 'lucide-react';
import { signUpSchema, signInSchema } from '@/lib/validation';
import { validatePasswordStrength } from '@/lib/security';
import { authRateLimiter } from '@/lib/rate-limiter';
import { logAuditEvent, AUDIT_ACTIONS } from '@/lib/audit';

export default function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState<{ isValid: boolean; errors: string[] }>({ isValid: false, errors: [] });
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    
    if (!supabase) {
      setError('Authentication service not available. Please contact support.');
      setLoading(false);
      return;
    }

    // Validate inputs with schema
    const validationData = isSignUp 
      ? { email: email.trim(), password, fullName: fullName.trim() }
      : { email: email.trim(), password };
    
    const schema = isSignUp ? signUpSchema : signInSchema;
    const validationResult = schema.safeParse(validationData);
    
    if (!validationResult.success) {
      const errors = validationResult.error.issues.map(err => `${err.path.join('.')}: ${err.message}`);
      setValidationErrors(errors);
      setError('Please fix the validation errors above');
      setLoading(false);
      return;
    }
    
    // Additional password strength validation for sign up
    if (isSignUp) {
      const strengthCheck = validatePasswordStrength(password);
      if (!strengthCheck.isValid) {
        setError('Password does not meet security requirements. Please check the requirements below.');
        setLoading(false);
        return;
      }
    }
    
    setValidationErrors([]);

    try {
      // Get client IP for audit logging
      const ip = '127.0.0.1'; // In production, get from request headers
      const userAgent = navigator.userAgent;
      
      if (isSignUp) {
        // Log registration attempt
        await logAuditEvent({
          action: AUDIT_ACTIONS.SIGNUP,
          resource: 'auth',
          ip_address: ip,
          user_agent: userAgent,
          metadata: { email: email.trim() }
        });
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            }
          }
        });

        if (error) throw error;

        if (data.user) {
          setMessage('Check your email for the confirmation link!');
        }
      } else {
        // Log login attempt
        await logAuditEvent({
          action: AUDIT_ACTIONS.LOGIN,
          resource: 'auth',
          ip_address: ip,
          user_agent: userAgent,
          metadata: { email: email.trim() }
        });
        
        const { error } = await supabase!.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
      }
    } catch (error: any) {
      setError(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      setError('Please enter your email first');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const { error } = await supabase!.auth.resetPasswordForEmail(email);
      
      if (error) throw error;
      
      setMessage('Check your email for the password reset link!');
    } catch (error: any) {
      setError(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-padding">
      <div className="container-max">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-blue-600" aria-hidden="true" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Patient Portal
            </h1>
            <p className="text-gray-600">
              {isSignUp 
                ? 'Create your secure patient account' 
                : 'Sign in to access your health information'
              }
            </p>
          </div>

          {/* Auth Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <form onSubmit={handleAuth} className="space-y-6">
              {isSignUp && (
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required={isSignUp}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="pl-10 w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (isSignUp && e.target.value) {
                        const strength = validatePasswordStrength(e.target.value);
                        const errors: string[] = [];
                        if (!strength.feedback.hasLowerCase) errors.push('Add lowercase letters');
                        if (!strength.feedback.hasUpperCase) errors.push('Add uppercase letters');
                        if (!strength.feedback.hasNumbers) errors.push('Add numbers');
                        if (!strength.feedback.hasSpecialChar) errors.push('Add special characters');
                        if (!strength.feedback.hasMinLength) errors.push('Use at least 8 characters');
                        
                        setPasswordStrength({ isValid: strength.isValid, errors });
                      }
                    }}
                    className="pl-10 pr-10 w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={isSignUp ? "Create a strong password" : "Enter your password"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 h-5 w-5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
                {isSignUp && (
                  <div className="mt-2">
                    <div className="text-xs font-medium text-gray-700 mb-2">Password Requirements:</div>
                    <div className="space-y-1">
                      <div className={`text-xs flex items-center ${password.length >= 12 ? 'text-green-600' : 'text-gray-400'}`}>
                        {password.length >= 12 ? <Check className="w-3 h-3 mr-1" /> : <X className="w-3 h-3 mr-1" />}
                        At least 12 characters
                      </div>
                      <div className={`text-xs flex items-center ${/[A-Z]/.test(password) ? 'text-green-600' : 'text-gray-400'}`}>
                        {/[A-Z]/.test(password) ? <Check className="w-3 h-3 mr-1" /> : <X className="w-3 h-3 mr-1" />}
                        One uppercase letter
                      </div>
                      <div className={`text-xs flex items-center ${/[a-z]/.test(password) ? 'text-green-600' : 'text-gray-400'}`}>
                        {/[a-z]/.test(password) ? <Check className="w-3 h-3 mr-1" /> : <X className="w-3 h-3 mr-1" />}
                        One lowercase letter
                      </div>
                      <div className={`text-xs flex items-center ${/[0-9]/.test(password) ? 'text-green-600' : 'text-gray-400'}`}>
                        {/[0-9]/.test(password) ? <Check className="w-3 h-3 mr-1" /> : <X className="w-3 h-3 mr-1" />}
                        One number
                      </div>
                      <div className={`text-xs flex items-center ${/[!@#$%^&*(),.?":{}|<>]/.test(password) ? 'text-green-600' : 'text-gray-400'}`}>
                        {/[!@#$%^&*(),.?":{}|<>]/.test(password) ? <Check className="w-3 h-3 mr-1" /> : <X className="w-3 h-3 mr-1" />}
                        One special character
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {validationErrors.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800 text-sm font-medium mb-2">Validation Errors:</p>
                  <ul className="text-red-700 text-sm space-y-1">
                    {validationErrors.map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800 text-sm">{error}</p>
                </div>
              )}

              {message && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 text-sm">{message}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full"
              >
                {loading 
                  ? 'Processing...' 
                  : isSignUp 
                    ? 'Create Account' 
                    : 'Sign In'
                }
              </button>

              {!isSignUp && (
                <button
                  type="button"
                  onClick={handlePasswordReset}
                  disabled={loading}
                  className="w-full text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Forgot your password?
                </button>
              )}
            </form>

            {/* Toggle Sign Up/Sign In */}
            <div className="mt-6 pt-6 border-t border-gray-200 text-center">
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                  setMessage('');
                }}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                {isSignUp 
                  ? 'Already have an account? Sign in' 
                  : "Don't have an account? Sign up"
                }
              </button>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start">
              <Shield className="w-5 h-5 text-blue-600 mr-2 mt-0.5" aria-hidden="true" />
              <div>
                <h4 className="text-blue-800 font-semibold text-sm">Secure & Private</h4>
                <p className="text-blue-700 text-xs mt-1">
                  Your health information is protected with bank-level security and HIPAA compliance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}