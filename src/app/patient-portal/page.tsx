'use client';

import { useState, useEffect } from 'react';
import { supabase, isSupabaseEnabled } from '@/lib/supabase';
import { User, Session } from '@supabase/supabase-js';
import PatientDashboard from '@/components/PatientDashboard';
import AuthForm from '@/components/AuthForm';
import type { Metadata } from 'next';

export default function PatientPortalPage() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Show setup message if Supabase is not configured
  if (!isSupabaseEnabled) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Patient Portal Setup Required</h1>
          <p className="text-gray-600 mb-6">
            The patient portal requires Supabase configuration. Please click the "Connect to Supabase" button 
            in the top right to set up your database connection.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
            <h3 className="font-semibold text-blue-800 mb-2">Demo Features Available:</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Secure patient authentication</li>
              <li>• Progress tracking dashboard</li>
              <li>• Appointment management</li>
              <li>• Exercise history logging</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  useEffect(() => {
    if (!supabase) return;
    
    const getInitialSession = async () => {
      if (!supabase) return;
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getInitialSession();
    
    // Listen for auth changes
    let subscription: any = null;
    if (supabase) {
      const { data: { subscription: sub } } = supabase.auth.onAuthStateChange(
        (event, session) => {
          setSession(session);
          setUser(session?.user ?? null);
          setLoading(false);
        }
      );
      subscription = sub;
    }

    return () => subscription?.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {user ? (
        <PatientDashboard user={user} />
      ) : (
        <AuthForm />
      )}
    </main>
  );
}