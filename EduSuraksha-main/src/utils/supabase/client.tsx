import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info';

export const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

export type UserRole = 'mentor' | 'student' | 'parent';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  created_at: string;
  last_login: string;
  profile_setup_complete: boolean;
  mood_history?: Array<{ mood: string; timestamp: string }>;
  last_wellness_check?: string;
}

export interface Student {
  id: string;
  name: string;
  student_id: string;
  class: string;
  email: string;
  attendance: number;
  grades: number;
  engagement: number;
  fees_status: 'paid' | 'pending' | 'partial';
  risk_level: 'safe' | 'medium' | 'high';
  wellness_score: number;
  created_at: string;
  updated_at: string;
  created_by: string;
}

export interface ChatSession {
  id: string;
  user_id: string;
  message: string;
  mood: string;
  timestamp: string;
  ai_response: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  recipient_id: string;
  sender_id: string;
  created_at: string;
  read: boolean;
}

// API helper functions
const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-7dbafdfc`;

export async function apiCall(
  endpoint: string, 
  options: RequestInit = {},
  useAuth: boolean = true
): Promise<any> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers as Record<string, string>,
  };

  // Check if we're in demo mode
  const isDemoMode = localStorage.getItem('educare_demo_mode') === 'true';
  
  if (useAuth) {
    if (isDemoMode) {
      // Use demo token for demo mode
      headers['Authorization'] = `Bearer demo-token`;
      headers['X-Demo-Mode'] = 'true';
    } else {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.access_token) {
        headers['Authorization'] = `Bearer ${session.access_token}`;
      } else {
        headers['Authorization'] = `Bearer ${publicAnonKey}`;
      }
    }
  }

  // If in demo mode, return mock data instead of making API calls
  if (isDemoMode) {
    return getMockData(endpoint);
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(errorData.error || `HTTP ${response.status}`);
  }

  return response.json();
}

// Mock data generator for demo mode
function getMockData(endpoint: string): any {
  console.log('Demo mode: returning mock data for', endpoint);
  
  if (endpoint === '/analytics/dashboard') {
    return {
      analytics: {
        totalStudents: 1247,
        atRiskStudents: 73,
        avgEngagement: 84,
        recentActivities: [
          {
            id: '1',
            type: 'alert',
            message: 'High dropout risk detected in CS-2nd year',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
          },
          {
            id: '2', 
            type: 'improvement',
            message: 'Peer mentoring program shows 23% engagement boost',
            timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
          },
          {
            id: '3',
            type: 'trend',
            message: 'Stress levels increasing before mid-term exams',
            timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
          }
        ],
        lastUpdated: new Date().toISOString()
      }
    };
  }
  
  if (endpoint === '/students') {
    return {
      students: [
        {
          id: 'student:1',
          name: 'Ramesh Sharma',
          student_id: 'CS-2023-0123',
          class: 'Computer Science - 2nd Year',
          email: 'ramesh@example.com',
          attendance: 65,
          grades: 72,
          engagement: 45,
          fees_status: 'pending',
          risk_level: 'high',
          wellness_score: 55,
          created_at: '2023-09-01T00:00:00Z',
          updated_at: new Date().toISOString()
        },
        {
          id: 'student:2',
          name: 'Neha Gupta',
          student_id: 'CS-2023-0142',
          class: 'Computer Science - 2nd Year',
          email: 'neha@example.com',
          attendance: 89,
          grades: 85,
          engagement: 84,
          fees_status: 'paid',
          risk_level: 'safe',
          wellness_score: 78,
          created_at: '2023-09-01T00:00:00Z',
          updated_at: new Date().toISOString()
        }
      ]
    };
  }
  
  if (endpoint === '/notifications') {
    return {
      notifications: [
        {
          id: 'notif:1',
          title: 'Excellent Performance',
          message: 'Neha scored 92% in Database Systems exam',
          type: 'achievement', 
          created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          read: false
        },
        {
          id: 'notif:2',
          title: 'Attendance Alert',
          message: 'Rohan missed 3 classes this week',
          type: 'warning',
          created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          read: false
        }
      ]
    };
  }
  
  if (endpoint === '/wellness/sessions') {
    return {
      sessions: [
        {
          id: 'chat:1',
          user_id: 'demo-user',
          message: 'I feel stressed about exams',
          mood: 'sad',
          timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
          ai_response: 'I understand exam stress can be overwhelming. Let\'s work through some techniques to help you manage this feeling.'
        }
      ]
    };
  }
  
  // Default mock response
  return { message: 'Demo mode active', data: [] };
}

// Authentication functions
export async function signUp(email: string, password: string, role: UserRole, name: string) {
  try {
    const response = await apiCall('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, role, name }),
    }, false);
    
    return { data: response, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { error: null };
  } catch (error) {
    return { error: error as Error };
  }
}

export async function getCurrentSession() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return { data: session, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

// Student management functions
export async function getStudents(): Promise<{ students: Student[]; error: Error | null }> {
  try {
    const data = await apiCall('/students');
    return { students: data.students, error: null };
  } catch (error) {
    return { students: [], error: error as Error };
  }
}

export async function createStudent(studentData: Partial<Student>): Promise<{ student: Student | null; error: Error | null }> {
  try {
    const data = await apiCall('/students', {
      method: 'POST',
      body: JSON.stringify(studentData),
    });
    return { student: data.student, error: null };
  } catch (error) {
    return { student: null, error: error as Error };
  }
}

export async function updateStudent(id: string, updates: Partial<Student>): Promise<{ student: Student | null; error: Error | null }> {
  try {
    const data = await apiCall(`/students/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
    return { student: data.student, error: null };
  } catch (error) {
    return { student: null, error: error as Error };
  }
}

// Analytics functions
export async function getDashboardAnalytics() {
  try {
    const data = await apiCall('/analytics/dashboard');
    return { analytics: data.analytics, error: null };
  } catch (error) {
    return { analytics: null, error: error as Error };
  }
}

// Wellness functions
export async function sendWellnessMessage(message: string, mood: string) {
  try {
    // Check if we're in demo mode
    const isDemoMode = localStorage.getItem('educare_demo_mode') === 'true';
    
    if (isDemoMode) {
      // Generate demo AI response
      const responses = {
        sad: [
          "I hear you, and I want you to know that what you're feeling is valid. It's okay to not feel okay sometimes. Let's work through this together.",
          "Thank you for sharing with me. Your feelings matter, and I'm here to support you through this difficult time.",
          "I understand you're going through something challenging. Remember, it's brave to reach out when you need support."
        ],
        happy: [
          "That's wonderful to hear! I'm glad you're feeling positive. It's great when we can recognize and appreciate good moments.",
          "Your positive energy is infectious! It's beautiful to see you in such a good space.",
          "I love hearing when things are going well for you. What's been bringing you joy lately?"
        ],
        neutral: [
          "Thanks for checking in with me. I'm here to support you in whatever way you need today.",
          "I appreciate you taking time to connect. How can I best support you right now?",
          "It's good to hear from you. I'm here to listen and help however I can."
        ]
      };
      
      const moodResponses = responses[mood as keyof typeof responses] || responses.neutral;
      const aiResponse = moodResponses[Math.floor(Math.random() * moodResponses.length)];
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return { 
        response: { 
          response: aiResponse,
          mood_detected: mood,
          session_id: 'demo-session-' + Date.now()
        }, 
        error: null 
      };
    }
    
    const data = await apiCall('/wellness/chat', {
      method: 'POST',
      body: JSON.stringify({ message, mood }),
    });
    return { response: data, error: null };
  } catch (error) {
    return { response: null, error: error as Error };
  }
}

export async function getWellnessSessions(): Promise<{ sessions: ChatSession[]; error: Error | null }> {
  try {
    const data = await apiCall('/wellness/sessions');
    return { sessions: data.sessions, error: null };
  } catch (error) {
    return { sessions: [], error: error as Error };
  }
}

// Notification functions
export async function getNotifications(): Promise<{ notifications: Notification[]; error: Error | null }> {
  try {
    const data = await apiCall('/notifications');
    return { notifications: data.notifications, error: null };
  } catch (error) {
    return { notifications: [], error: error as Error };
  }
}

export async function sendNotification(
  title: string, 
  message: string, 
  type: string, 
  recipientId: string
): Promise<{ notification: Notification | null; error: Error | null }> {
  try {
    const data = await apiCall('/notifications', {
      method: 'POST',
      body: JSON.stringify({ title, message, type, recipient_id: recipientId }),
    });
    return { notification: data.notification, error: null };
  } catch (error) {
    return { notification: null, error: error as Error };
  }
}