'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Lock, Mail, User, Eye, EyeOff, Shield } from 'lucide-react';

export default function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

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

    // Validate inputs
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    if (isSignUp && !fullName.trim()) {
      setError('Please enter your full name');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      if (isSignUp) {
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
                    onChange={(e) => setPassword(e.target.value)}
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
                  <p className="text-xs text-gray-500 mt-1">
                    Password must be at least 6 characters long
                  </p>
                )}
              </div>

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