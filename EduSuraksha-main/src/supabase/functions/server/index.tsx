import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { cors } from 'npm:hono/cors';
import { Hono } from 'npm:hono';
import { logger } from 'npm:hono/logger';
import * as kv from './kv_store.tsx';

const app = new Hono();

// Apply middleware
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['*'],
}));

app.use('*', logger(console.log));

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

// Helper function to verify authentication
async function verifyAuth(request: Request) {
  const accessToken = request.headers.get('Authorization')?.split(' ')[1];
  const isDemoMode = request.headers.get('X-Demo-Mode') === 'true';
  
  if (!accessToken) {
    return { user: null, error: 'No authorization token' };
  }
  
  // Handle demo mode
  if (isDemoMode || accessToken === 'demo-token') {
    return { 
      user: { 
        id: 'demo-user',
        email: 'demo@educare.ai',
        user_metadata: { role: 'demo', name: 'Demo User' }
      }, 
      error: null 
    };
  }
  
  const { data: { user }, error } = await supabase.auth.getUser(accessToken);
  return { user, error };
}

// Authentication Routes
app.post('/make-server-7dbafdfc/auth/signup', async (c) => {
  try {
    const { email, password, role, name } = await c.req.json();
    
    // Create user with Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { 
        name, 
        role,
        created_at: new Date().toISOString()
      },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.log('Signup error:', error);
      return c.json({ error: `Signup failed: ${error.message}` }, 400);
    }

    // Store additional user data in KV store
    const userProfile = {
      id: data.user.id,
      email,
      name,
      role,
      created_at: new Date().toISOString(),
      last_login: new Date().toISOString(),
      profile_setup_complete: false
    };

    await kv.set(`user:${data.user.id}`, userProfile);
    await kv.set(`user_email:${email}`, data.user.id);

    return c.json({ 
      user: data.user, 
      profile: userProfile,
      message: 'User created successfully' 
    });
  } catch (error) {
    console.log('Signup error:', error);
    return c.json({ error: `Signup failed: ${error}` }, 500);
  }
});

// Student Data Routes
app.get('/make-server-7dbafdfc/students', async (c) => {
  try {
    const { user, error: authError } = await verifyAuth(c.req.raw);
    if (!user) {
      return c.json({ error: `Unauthorized: ${authError}` }, 401);
    }

    // For demo mode, skip role check
    if (user.id === 'demo-user') {
      // Return mock student data for demo
      const mockStudents = [
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
      ];
      return c.json({ students: mockStudents });
    }

    // Get user profile to check role
    const userProfile = await kv.get(`user:${user.id}`);
    if (!userProfile || userProfile.role !== 'mentor') {
      return c.json({ error: 'Access denied. Mentor role required.' }, 403);
    }

    // Get all students from KV store
    const studentKeys = await kv.getByPrefix('student:');
    const students = studentKeys || [];

    return c.json({ students });
  } catch (error) {
    console.log('Get students error:', error);
    return c.json({ error: `Failed to fetch students: ${error}` }, 500);
  }
});

app.post('/make-server-7dbafdfc/students', async (c) => {
  try {
    const { user, error: authError } = await verifyAuth(c.req.raw);
    if (!user) {
      return c.json({ error: `Unauthorized: ${authError}` }, 401);
    }

    const studentData = await c.req.json();
    const studentId = `student:${Date.now()}`;
    
    const student = {
      id: studentId,
      ...studentData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_by: user.id
    };

    await kv.set(studentId, student);

    return c.json({ student, message: 'Student created successfully' });
  } catch (error) {
    console.log('Create student error:', error);
    return c.json({ error: `Failed to create student: ${error}` }, 500);
  }
});

app.get('/make-server-7dbafdfc/students/:id', async (c) => {
  try {
    const { user, error: authError } = await verifyAuth(c.req.raw);
    if (!user) {
      return c.json({ error: `Unauthorized: ${authError}` }, 401);
    }

    const studentId = c.req.param('id');
    const student = await kv.get(`student:${studentId}`);

    if (!student) {
      return c.json({ error: 'Student not found' }, 404);
    }

    return c.json({ student });
  } catch (error) {
    console.log('Get student error:', error);
    return c.json({ error: `Failed to fetch student: ${error}` }, 500);
  }
});

app.put('/make-server-7dbafdfc/students/:id', async (c) => {
  try {
    const { user, error: authError } = await verifyAuth(c.req.raw);
    if (!user) {
      return c.json({ error: `Unauthorized: ${authError}` }, 401);
    }

    const studentId = c.req.param('id');
    const updates = await c.req.json();
    
    const existingStudent = await kv.get(`student:${studentId}`);
    if (!existingStudent) {
      return c.json({ error: 'Student not found' }, 404);
    }

    const updatedStudent = {
      ...existingStudent,
      ...updates,
      updated_at: new Date().toISOString(),
      updated_by: user.id
    };

    await kv.set(`student:${studentId}`, updatedStudent);

    return c.json({ student: updatedStudent, message: 'Student updated successfully' });
  } catch (error) {
    console.log('Update student error:', error);
    return c.json({ error: `Failed to update student: ${error}` }, 500);
  }
});

// Analytics Routes
app.get('/make-server-7dbafdfc/analytics/dashboard', async (c) => {
  try {
    const { user, error: authError } = await verifyAuth(c.req.raw);
    if (!user) {
      return c.json({ error: `Unauthorized: ${authError}` }, 401);
    }

    // For demo mode, return mock analytics
    if (user.id === 'demo-user') {
      const analytics = {
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
      };
      return c.json({ analytics });
    }

    // Get dashboard analytics data
    const students = await kv.getByPrefix('student:') || [];
    const totalStudents = students.length;
    
    // Calculate at-risk students
    const atRiskStudents = students.filter(student => 
      student.attendance < 75 || student.grades < 70 || student.risk_level === 'high'
    ).length;

    // Calculate average engagement
    const avgEngagement = students.length > 0 
      ? Math.round(students.reduce((sum, student) => sum + (student.engagement || 0), 0) / students.length)
      : 0;

    // Get recent activities
    const activities = await kv.getByPrefix('activity:') || [];
    const recentActivities = activities
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 10);

    const analytics = {
      totalStudents,
      atRiskStudents,
      avgEngagement,
      recentActivities,
      lastUpdated: new Date().toISOString()
    };

    return c.json({ analytics });
  } catch (error) {
    console.log('Analytics error:', error);
    return c.json({ error: `Failed to fetch analytics: ${error}` }, 500);
  }
});

// Mental Health Routes
app.post('/make-server-7dbafdfc/wellness/chat', async (c) => {
  try {
    const { user, error: authError } = await verifyAuth(c.req.raw);
    if (!user) {
      return c.json({ error: `Unauthorized: ${authError}` }, 401);
    }

    const { message, mood } = await c.req.json();
    
    // For demo mode, return immediate response
    if (user.id === 'demo-user') {
      const aiResponse = generateAIResponse(message, mood);
      return c.json({ 
        response: aiResponse,
        mood_detected: mood,
        session_id: 'demo-session-' + Date.now()
      });
    }
    
    // Store chat session
    const chatId = `chat:${user.id}:${Date.now()}`;
    const chatSession = {
      id: chatId,
      user_id: user.id,
      message,
      mood,
      timestamp: new Date().toISOString(),
      ai_response: generateAIResponse(message, mood)
    };

    await kv.set(chatId, chatSession);

    // Update user wellness metrics
    const userProfile = await kv.get(`user:${user.id}`);
    if (userProfile) {
      const updatedProfile = {
        ...userProfile,
        last_wellness_check: new Date().toISOString(),
        mood_history: [...(userProfile.mood_history || []), { mood, timestamp: new Date().toISOString() }].slice(-10)
      };
      await kv.set(`user:${user.id}`, updatedProfile);
    }

    return c.json({ 
      response: chatSession.ai_response,
      mood_detected: mood,
      session_id: chatId
    });
  } catch (error) {
    console.log('Wellness chat error:', error);
    return c.json({ error: `Failed to process wellness chat: ${error}` }, 500);
  }
});

app.get('/make-server-7dbafdfc/wellness/sessions', async (c) => {
  try {
    const { user, error: authError } = await verifyAuth(c.req.raw);
    if (!user) {
      return c.json({ error: `Unauthorized: ${authError}` }, 401);
    }

    // Get user's chat sessions
    const allSessions = await kv.getByPrefix('chat:') || [];
    const userSessions = allSessions
      .filter(session => session.user_id === user.id)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 50);

    return c.json({ sessions: userSessions });
  } catch (error) {
    console.log('Get wellness sessions error:', error);
    return c.json({ error: `Failed to fetch wellness sessions: ${error}` }, 500);
  }
});

// Notifications Routes
app.get('/make-server-7dbafdfc/notifications', async (c) => {
  try {
    const { user, error: authError } = await verifyAuth(c.req.raw);
    if (!user) {
      return c.json({ error: `Unauthorized: ${authError}` }, 401);
    }

    // Get user-specific notifications
    const notifications = await kv.getByPrefix(`notification:${user.id}:`) || [];
    const sortedNotifications = notifications
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 20);

    return c.json({ notifications: sortedNotifications });
  } catch (error) {
    console.log('Get notifications error:', error);
    return c.json({ error: `Failed to fetch notifications: ${error}` }, 500);
  }
});

app.post('/make-server-7dbafdfc/notifications', async (c) => {
  try {
    const { user, error: authError } = await verifyAuth(c.req.raw);
    if (!user) {
      return c.json({ error: `Unauthorized: ${authError}` }, 401);
    }

    const { title, message, type, recipient_id } = await c.req.json();
    
    const notificationId = `notification:${recipient_id}:${Date.now()}`;
    const notification = {
      id: notificationId,
      title,
      message,
      type,
      recipient_id,
      sender_id: user.id,
      created_at: new Date().toISOString(),
      read: false
    };

    await kv.set(notificationId, notification);

    return c.json({ notification, message: 'Notification sent successfully' });
  } catch (error) {
    console.log('Create notification error:', error);
    return c.json({ error: `Failed to create notification: ${error}` }, 500);
  }
});

// AI Helper Functions
function generateAIResponse(message: string, mood: string): string {
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
  return moodResponses[Math.floor(Math.random() * moodResponses.length)];
}

// Health check
app.get('/make-server-7dbafdfc/health', (c) => {
  return c.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    service: 'EduCare AI Backend'
  });
});

// Error handling
app.onError((err, c) => {
  console.error('Server error:', err);
  return c.json({ error: 'Internal server error', details: err.message }, 500);
});

serve(app.fetch);