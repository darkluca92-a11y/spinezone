'use client';

import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { 
  LogOut, 
  Calendar, 
  TrendingUp, 
  Activity, 
  FileText, 
  Settings,
  Clock,
  MapPin,
  Phone,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  BarChart3
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PatientDashboardProps {
  user: User;
}

// Mock data for demonstration
const progressData = [
  { date: '2024-01-01', painLevel: 8, mobility: 3 },
  { date: '2024-01-08', painLevel: 7, mobility: 4 },
  { date: '2024-01-15', painLevel: 6, mobility: 5 },
  { date: '2024-01-22', painLevel: 5, mobility: 6 },
  { date: '2024-01-29', painLevel: 4, mobility: 7 },
  { date: '2024-02-05', painLevel: 3, mobility: 8 },
];

const upcomingAppointments = [
  {
    id: 1,
    date: '2024-02-15',
    time: '10:00 AM',
    therapist: 'Dr. Sarah Mitchell',
    type: 'Physical Therapy Session',
    location: 'SpineZone Downtown',
    status: 'confirmed'
  },
  {
    id: 2,
    date: '2024-02-20',
    time: '2:30 PM',
    therapist: 'Michael Chen',
    type: 'Progress Evaluation',
    location: 'SpineZone La Jolla',
    status: 'pending'
  }
];

const recentActivities = [
  {
    id: 1,
    type: 'exercise',
    description: 'Completed daily stretching routine',
    date: '2024-02-10',
    status: 'completed'
  },
  {
    id: 2,
    type: 'appointment',
    description: 'Attended PT session with Dr. Mitchell',
    date: '2024-02-08',
    status: 'completed'
  },
  {
    id: 3,
    type: 'pain_log',
    description: 'Logged pain level: 3/10',
    date: '2024-02-10',
    status: 'completed'
  }
];

export default function PatientDashboard({ user }: PatientDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      if (!supabase) {
        alert('Authentication service not available');
        return;
      }
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Sign out error:', error);
        alert('Error signing out. Please try again.');
      }
    } catch (error) {
      console.error('Sign out error:', error);
      alert('Error signing out. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const currentPainLevel = progressData[progressData.length - 1].painLevel;
  const currentMobility = progressData[progressData.length - 1].mobility;
  const painImprovement = progressData[0].painLevel - currentPainLevel;
  const mobilityImprovement = currentMobility - progressData[0].mobility;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container-max">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">SpineZone Portal</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <div className="font-semibold text-gray-900">
                  {user.user_metadata?.full_name || 'Patient'}
                </div>
                <div className="text-sm text-gray-600">{user.email}</div>
              </div>
              <button
                onClick={handleSignOut}
                disabled={loading}
                className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-5 h-5" aria-hidden="true" />
                <span className="ml-2 hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container-max py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="bg-white rounded-xl shadow-lg p-6">
              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === 'overview' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <BarChart3 className="w-5 h-5 mr-3" aria-hidden="true" />
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('appointments')}
                  className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === 'appointments' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Calendar className="w-5 h-5 mr-3" aria-hidden="true" />
                  Appointments
                </button>
                <button
                  onClick={() => setActiveTab('progress')}
                  className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === 'progress' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <TrendingUp className="w-5 h-5 mr-3" aria-hidden="true" />
                  Progress
                </button>
                <button
                  onClick={() => setActiveTab('exercises')}
                  className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === 'exercises' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Activity className="w-5 h-5 mr-3" aria-hidden="true" />
                  Exercises
                </button>
                <button
                  onClick={() => setActiveTab('records')}
                  className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === 'records' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <FileText className="w-5 h-5 mr-3" aria-hidden="true" />
                  Records
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === 'settings' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Settings className="w-5 h-5 mr-3" aria-hidden="true" />
                  Settings
                </button>
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Welcome Card */}
                <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-xl shadow-lg p-8 text-white">
                  <h2 className="text-2xl font-bold mb-2">
                    Welcome back, {user.user_metadata?.full_name || 'Patient'}!
                  </h2>
                  <p className="text-blue-100">
                    Here's your latest progress summary and upcoming activities.
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 bg-red-100 rounded-lg">
                        <AlertCircle className="w-6 h-6 text-red-600" aria-hidden="true" />
                      </div>
                      <span className="text-2xl font-bold text-gray-900">{currentPainLevel}/10</span>
                    </div>
                    <h3 className="font-semibold text-gray-900">Current Pain Level</h3>
                    <p className="text-sm text-green-600">↓ {painImprovement} points improvement</p>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Activity className="w-6 h-6 text-green-600" aria-hidden="true" />
                      </div>
                      <span className="text-2xl font-bold text-gray-900">{currentMobility}/10</span>
                    </div>
                    <h3 className="font-semibold text-gray-900">Mobility Score</h3>
                    <p className="text-sm text-green-600">↑ {mobilityImprovement} points improvement</p>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Calendar className="w-6 h-6 text-blue-600" aria-hidden="true" />
                      </div>
                      <span className="text-2xl font-bold text-gray-900">{upcomingAppointments.length}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900">Upcoming Appointments</h3>
                    <p className="text-sm text-gray-600">Next: Feb 15</p>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <CheckCircle className="w-6 h-6 text-purple-600" aria-hidden="true" />
                      </div>
                      <span className="text-2xl font-bold text-gray-900">18</span>
                    </div>
                    <h3 className="font-semibold text-gray-900">Sessions Completed</h3>
                    <p className="text-sm text-gray-600">85% attendance rate</p>
                  </div>
                </div>

                {/* Progress Chart */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Progress Over Time</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={progressData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="date" 
                          tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        />
                        <YAxis domain={[0, 10]} />
                        <Tooltip 
                          labelFormatter={(date) => new Date(date).toLocaleDateString()}
                          formatter={(value, name) => [value, name === 'painLevel' ? 'Pain Level' : 'Mobility Score']}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="painLevel" 
                          stroke="#ef4444" 
                          strokeWidth={3}
                          name="Pain Level"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="mobility" 
                          stroke="#22c55e" 
                          strokeWidth={3}
                          name="Mobility Score"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-center p-4 bg-gray-50 rounded-lg">
                        <div className="p-2 bg-green-100 rounded-full mr-4">
                          <CheckCircle className="w-4 h-4 text-green-600" aria-hidden="true" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{activity.description}</p>
                          <p className="text-sm text-gray-600">{new Date(activity.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'appointments' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Appointments</h2>
                    <button className="btn-primary">
                      Schedule New
                    </button>
                  </div>

                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <div key={appointment.id} className="p-6 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <Calendar className="w-5 h-5 text-blue-600 mr-2" aria-hidden="true" />
                              <span className="font-semibold text-gray-900">
                                {new Date(appointment.date).toLocaleDateString('en-US', { 
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </span>
                              <span className="ml-2 text-gray-600">at {appointment.time}</span>
                            </div>
                            
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              {appointment.type}
                            </h3>
                            
                            <div className="space-y-1 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-2" aria-hidden="true" />
                                With {appointment.therapist}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-2" aria-hidden="true" />
                                {appointment.location}
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                              appointment.status === 'confirmed'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {appointment.status}
                            </span>
                            <div className="mt-2">
                              <ChevronRight className="w-5 h-5 text-gray-400" aria-hidden="true" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'progress' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Progress Tracking</h2>
                  
                  <div className="h-96 mb-8">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={progressData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="date"
                          tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        />
                        <YAxis domain={[0, 10]} />
                        <Tooltip 
                          labelFormatter={(date) => new Date(date).toLocaleDateString()}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="painLevel" 
                          stackId="1"
                          stroke="#ef4444" 
                          fill="#fca5a5"
                          name="Pain Level"
                        />
                        <Area 
                          type="monotone" 
                          dataKey="mobility" 
                          stackId="2"
                          stroke="#22c55e" 
                          fill="#86efac"
                          name="Mobility Score"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="p-6 bg-red-50 rounded-lg">
                      <h4 className="font-semibold text-red-800 mb-2">Pain Level Trend</h4>
                      <p className="text-red-700">
                        Your pain has decreased by {painImprovement} points over the past 6 weeks. 
                        Keep up the great work with your exercises!
                      </p>
                    </div>
                    <div className="p-6 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">Mobility Improvement</h4>
                      <p className="text-green-700">
                        Your mobility score has improved by {mobilityImprovement} points. 
                        This shows excellent progress in your range of motion.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Placeholder content for other tabs */}
            {activeTab === 'exercises' && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Exercise Program</h2>
                <p className="text-gray-600 mb-4">Your personalized exercise routine will appear here.</p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-blue-800">Feature coming soon - Exercise tracking and video guides</p>
                </div>
              </div>
            )}

            {activeTab === 'records' && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Medical Records</h2>
                <p className="text-gray-600 mb-4">Access your treatment history and medical documents.</p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-blue-800">Feature coming soon - Digital records access</p>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>
                <p className="text-gray-600 mb-4">Manage your account preferences and notifications.</p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-blue-800">Feature coming soon - Account management</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}