import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Users, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  Brain, 
  MessageCircle,
  Bell,
  Phone,
  UserPlus,
  Heart,
  Calendar,
  DollarSign,
  Award,
  Target,
  Zap,
  Clock,
  Star,
  CheckCircle,
  AlertCircle,
  Plus,
  Send,
  Sparkles,
  Bot,
  Lightbulb,
  Timer,
  PlayCircle,
  PauseCircle,
  BarChart3,
  Activity,
  Crown,
  Flame,
  TrendingUp as TrendUp,
  ArrowRight,
  Eye,
  Filter,
  Settings,
  Download,
  RefreshCw,
  UserCheck,
  MessageSquare,
  PlusCircle,
  Edit,
  Copy,
  ExternalLink,
  Mic,
  Video,
  FileText
} from 'lucide-react';
import { ParentReportsSystem } from './parent-reports-system';
import { AttendanceReportsSystem } from './attendance-reports-system';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

// AI Priority Queue Data
const urgentStudents = [
  {
    id: 1,
    name: 'Ramesh Sharma',
    urgencyScore: 95,
    urgencyReason: 'Marks fell 30% in 2 weeks',
    attendance: { current: 45, previous: 85, trend: -40 },
    marks: { current: 52, previous: 82, trend: -30 },
    fees: 'Overdue 45 days',
    lastActivity: '3 days ago',
    riskFactors: ['Academic decline', 'Financial stress', 'Attendance drop'],
    aiInsight: 'Critical intervention needed within 24 hours',
    avatar: 'RS',
    stressLevel: 'high',
    interventionHistory: ['Email sent', 'Parent called'],
    timeToIntervene: '< 24h'
  },
  {
    id: 2,
    name: 'Priya Patel',
    urgencyScore: 87,
    urgencyReason: 'Stress detected in chatbot + attendance drop',
    attendance: { current: 65, previous: 89, trend: -24 },
    marks: { current: 74, previous: 78, trend: -4 },
    fees: 'Partial payment',
    lastActivity: '1 day ago',
    riskFactors: ['Mental health', 'Attendance issues'],
    aiInsight: 'Schedule counseling session immediately',
    avatar: 'PP',
    stressLevel: 'high',
    interventionHistory: ['Chatbot session', 'Wellness check'],
    timeToIntervene: '2-3 days'
  },
  {
    id: 3,
    name: 'Aarti Singh',
    urgencyScore: 76,
    urgencyReason: 'Fee payment delayed + peer isolation detected',
    attendance: { current: 78, previous: 82, trend: -4 },
    marks: { current: 71, previous: 75, trend: -4 },
    fees: 'Pending 15 days',
    lastActivity: '2 hours ago',
    riskFactors: ['Financial delay', 'Social isolation'],
    aiInsight: 'Connect with financial aid + peer mentoring',
    avatar: 'AS',
    stressLevel: 'medium',
    interventionHistory: ['Reminder sent'],
    timeToIntervene: '1 week'
  }
];

// Kanban Board Data
const kanbanColumns = [
  {
    id: 'new-alerts',
    title: 'New Alerts',
    color: 'from-red-500 to-orange-500',
    count: 8,
    students: [
      { id: 'st1', name: 'Rohit Kumar', issue: 'Attendance dropped below 60%', urgency: 'high', time: '2h ago' },
      { id: 'st2', name: 'Sneha Rao', issue: 'Failed 2 consecutive tests', urgency: 'medium', time: '4h ago' },
      { id: 'st3', name: 'Vikram Joshi', issue: 'Fee payment overdue', urgency: 'low', time: '1d ago' }
    ]
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    color: 'from-yellow-500 to-orange-500',
    count: 12,
    students: [
      { id: 'st4', name: 'Ramesh Sharma', issue: 'Academic intervention started', urgency: 'high', time: '2d ago' },
      { id: 'st5', name: 'Meera Gupta', issue: 'Counseling scheduled', urgency: 'medium', time: '3d ago' }
    ]
  },
  {
    id: 'counseling',
    title: 'Counseling Scheduled',
    color: 'from-blue-500 to-purple-500',
    count: 6,
    students: [
      { id: 'st6', name: 'Arjun Patel', issue: 'Session tomorrow 2 PM', urgency: 'medium', time: 'Tomorrow' },
      { id: 'st7', name: 'Kavya Nair', issue: 'Session today 4 PM', urgency: 'high', time: 'Today' }
    ]
  },
  {
    id: 'resolved',
    title: 'Resolved',
    color: 'from-green-500 to-teal-500',
    count: 23,
    students: [
      { id: 'st8', name: 'Anil Sharma', issue: 'Improved attendance to 85%', urgency: 'resolved', time: '1w ago' },
      { id: 'st9', name: 'Pooja Das', issue: 'Fee payment completed', urgency: 'resolved', time: '3d ago' }
    ]
  }
];

// AI Message Templates
const aiMessageTemplates = {
  parent: [
    {
      id: 'attendance',
      title: 'Attendance Concern',
      template: 'Dear Parent, we noticed {studentName} needs some extra support with attendance. Current attendance is {attendance}%. Let\'s work together to help {pronoun} succeed. Best regards, {mentorName}',
      usage: 'For attendance below 75%'
    },
    {
      id: 'academic',
      title: 'Academic Support',
      template: 'Dear Parent, {studentName} is showing great potential but could benefit from additional academic support in {subject}. We recommend {recommendation}. Please let us know how we can help.',
      usage: 'For grade improvements'
    },
    {
      id: 'positive',
      title: 'Positive Update',
      template: 'Dear Parent, we\'re delighted to share that {studentName} has shown excellent improvement in {area}. {specificAchievement}. Congratulations!',
      usage: 'For celebrating achievements'
    }
  ],
  student: [
    {
      id: 'motivation',
      title: 'Motivational Check-in',
      template: 'Hi {studentName}! I noticed you\'ve been working hard. Remember, every small step counts toward your goals. How are you feeling about your progress?',
      usage: 'For encouragement'
    },
    {
      id: 'support',
      title: 'Support Offer',
      template: 'Hi {studentName}, I\'m here to support you. I noticed {concern}. Would you like to schedule a quick chat to discuss how we can help?',
      usage: 'For offering assistance'
    }
  ]
};

// Mentor Impact Analytics
const mentorImpactData = {
  thisMonth: {
    studentsImproved: 12,
    interventionsCompleted: 8,
    parentsEngaged: 15,
    averageImprovement: 23,
    successRate: 87
  },
  trends: [
    { month: 'Jan', improved: 8, interventions: 6, success: 82 },
    { month: 'Feb', improved: 10, interventions: 7, success: 85 },
    { month: 'Mar', improved: 12, interventions: 8, success: 87 },
    { month: 'Apr', improved: 15, interventions: 10, success: 90 }
  ]
};

// Early Warning Predictions
const earlyWarnings = [
  {
    id: 1,
    prediction: '5 students predicted to fail next internal exam',
    confidence: 89,
    students: ['Ramesh S.', 'Priya P.', 'Rohit K.', 'Sneha R.', 'Vikram J.'],
    action: 'Immediate academic intervention required',
    timeframe: '2 weeks',
    type: 'academic'
  },
  {
    id: 2,
    prediction: '3 students at high dropout risk',
    confidence: 92,
    students: ['Ramesh S.', 'Aarti S.', 'Meera G.'],
    action: 'Schedule counseling + financial support',
    timeframe: '1 month',
    type: 'retention'
  },
  {
    id: 3,
    prediction: '8 students showing stress indicators',
    confidence: 76,
    students: ['Priya P.', 'Kavya N.', 'Arjun P.', '+5 more'],
    action: 'Mental health check-in recommended',
    timeframe: '1 week',
    type: 'wellness'
  }
];

const KanbanCard = ({ student, columnId }: any) => {
  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'resolved': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileHover={{ scale: 1.02, y: -2 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border hover:shadow-md transition-all cursor-move"
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-sm">{student.name}</h4>
        <Badge className={`text-xs px-2 py-0.5 ${getUrgencyColor(student.urgency)}`}>
          {student.urgency}
        </Badge>
      </div>
      <p className="text-xs text-muted-foreground mb-2">{student.issue}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{student.time}</span>
        <div className="flex space-x-1">
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <Eye className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <MessageCircle className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const UrgentStudentCard = ({ student }: any) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    whileHover={{ scale: 1.02, y: -2 }}
    className="glass-morphism p-4 rounded-2xl border border-red-200 dark:border-red-800 relative overflow-hidden group"
  >
    {/* Urgency Indicator */}
    <div className="absolute top-2 right-2">
      <div className="flex items-center space-x-1">
        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        <span className="text-xs font-medium text-red-600 dark:text-red-400">
          {student.urgencyScore}/100
        </span>
      </div>
    </div>

    {/* Animated Background */}
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-orange-500/5"
      animate={{ x: ['-100%', '100%'] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
    />

    <div className="relative z-10">
      <div className="flex items-start space-x-3">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="relative"
        >
          <Avatar className="h-12 w-12 border-2 border-red-300">
            <AvatarFallback className="bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold">
              {student.avatar}
            </AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
            <AlertTriangle className="h-2.5 w-2.5 text-white" />
          </div>
        </motion.div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-semibold text-sm truncate">{student.name}</h3>
            <Badge variant="destructive" className="text-xs animate-pulse">
              URGENT
            </Badge>
          </div>
          
          <p className="text-xs text-red-600 dark:text-red-400 font-medium mb-2">
            {student.urgencyReason}
          </p>

          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Attendance</span>
                <span className="text-red-600 font-medium">{student.attendance.current}%</span>
              </div>
              <Progress value={student.attendance.current} className="h-1" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Performance</span>
                <span className="text-red-600 font-medium">{student.marks.current}%</span>
              </div>
              <Progress value={student.marks.current} className="h-1" />
            </div>
          </div>

          <div className="flex items-center space-x-1 mb-2">
            <Brain className="h-3 w-3 text-blue-500" />
            <p className="text-xs text-muted-foreground">{student.aiInsight}</p>
          </div>

          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-xs">
              <Timer className="h-3 w-3 mr-1" />
              {student.timeToIntervene}
            </Badge>
            <div className="flex space-x-1">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="outline" size="sm" className="h-7 px-2">
                  <MessageCircle className="h-3 w-3" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="outline" size="sm" className="h-7 px-2">
                  <Phone className="h-3 w-3" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button size="sm" className="h-7 px-2 bg-gradient-to-r from-blue-500 to-purple-600">
                  <Zap className="h-3 w-3" />
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const EarlyWarningCard = ({ warning }: any) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'academic': return 'from-red-500 to-orange-500';
      case 'retention': return 'from-purple-500 to-pink-500';
      case 'wellness': return 'from-blue-500 to-cyan-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'academic': return <BarChart3 className="h-4 w-4" />;
      case 'retention': return <AlertTriangle className="h-4 w-4" />;
      case 'wellness': return <Heart className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="glass-morphism p-4 rounded-xl border relative overflow-hidden group"
    >
      <div className="flex items-start space-x-3">
        <motion.div
          className={`p-2 rounded-lg bg-gradient-to-r ${getTypeColor(warning.type)} text-white`}
          whileHover={{ rotate: 15, scale: 1.1 }}
        >
          {getTypeIcon(warning.type)}
        </motion.div>

        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="font-semibold text-sm">{warning.prediction}</h3>
            <Badge variant="secondary" className="text-xs">
              {warning.confidence}% confidence
            </Badge>
          </div>

          <p className="text-xs text-muted-foreground mb-2">
            Students: {warning.students.join(', ')}
          </p>

          <div className="flex items-center space-x-2 mb-3">
            <Lightbulb className="h-3 w-3 text-yellow-500" />
            <p className="text-xs font-medium text-blue-600 dark:text-blue-400">
              {warning.action}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-xs">
              <Clock className="h-3 w-3 mr-1" />
              {warning.timeframe}
            </Badge>
            <Button size="sm" className="h-7 text-xs">
              Take Action
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export function MentorDashboard() {
  const [activeTab, setActiveTab] = useState('priority-queue');
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [draggedStudent, setDraggedStudent] = useState<any>(null);

  return (
    <div className="min-h-screen relative">
      <div className="container mx-auto p-6 space-y-6">
        {/* Super Header with AI Branding */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            className="inline-flex items-center space-x-3 mb-4"
            animate={{ 
              background: [
                'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                'linear-gradient(135deg, #06b6d4, #3b82f6)'
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            style={{ 
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent'
            }}
          >
            <Crown className="h-8 w-8 text-yellow-500" />
            <h1 className="text-4xl font-bold">Smart Mentor Copilot</h1>
            <Bot className="h-8 w-8 text-blue-500" />
          </motion.div>
          <p className="text-lg text-muted-foreground">
            AI-Powered Student Success Management System
          </p>
          <div className="flex items-center justify-center space-x-4 mt-4">
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
              <Flame className="h-3 w-3 mr-1" />
              28 Active Interventions
            </Badge>
            <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <TrendUp className="h-3 w-3 mr-1" />
              87% Success Rate
            </Badge>
            <Badge className="bg-gradient-to-r from-orange-500 to-red-600 text-white animate-pulse">
              <AlertTriangle className="h-3 w-3 mr-1" />
              8 Urgent Cases
            </Badge>
          </div>
        </motion.div>

        {/* Quick Action Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between glass-morphism p-4 rounded-2xl"
        >
          <div className="flex items-center space-x-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
                <Zap className="h-4 w-4 mr-2" />
                AI Emergency Alert
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline">
                <MessageSquare className="h-4 w-4 mr-2" />
                Draft Messages (5)
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Sessions
              </Button>
            </motion.div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-8 glass-morphism">
            <TabsTrigger value="priority-queue" className="relative">
              <AlertTriangle className="h-4 w-4 mr-2" />
              AI Priority Queue
              <Badge className="ml-2 bg-red-500 text-white text-xs">8</Badge>
            </TabsTrigger>
            <TabsTrigger value="kanban">
              <Target className="h-4 w-4 mr-2" />
              Task Board
            </TabsTrigger>
            <TabsTrigger value="reports">
              <FileText className="h-4 w-4 mr-2" />
              Parent Reports
            </TabsTrigger>
            <TabsTrigger value="attendance">
              <Calendar className="h-4 w-4 mr-2" />
              Attendance Reports
            </TabsTrigger>
            <TabsTrigger value="ai-assistant">
              <Bot className="h-4 w-4 mr-2" />
              AI Assistant
            </TabsTrigger>
            <TabsTrigger value="counseling">
              <Heart className="h-4 w-4 mr-2" />
              Counseling
            </TabsTrigger>
            <TabsTrigger value="insights">
              <Activity className="h-4 w-4 mr-2" />
              Emotional Insights
            </TabsTrigger>
            <TabsTrigger value="impact">
              <Award className="h-4 w-4 mr-2" />
              My Impact
            </TabsTrigger>
          </TabsList>

          {/* AI Priority Queue Tab */}
          <TabsContent value="priority-queue" className="space-y-6">
            {/* Early Warning Alerts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="glass-morphism border-orange-200 dark:border-orange-800">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Brain className="h-5 w-5 text-orange-500" />
                    </motion.div>
                    <span className="gradient-text">Early Warning System</span>
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white animate-pulse">
                      LIVE PREDICTIONS
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {earlyWarnings.map((warning, index) => (
                      <motion.div
                        key={warning.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <EarlyWarningCard warning={warning} />
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Urgent Students Queue */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="glass-morphism border-red-200 dark:border-red-800">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                      <span>Urgency to Intervene Queue</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="destructive">High Priority: 3</Badge>
                      <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {urgentStudents.map((student, index) => (
                      <motion.div
                        key={student.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <UrgentStudentCard student={student} />
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Parent Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <ParentReportsSystem />
          </TabsContent>

          {/* Attendance Reports Tab */}
          <TabsContent value="attendance" className="space-y-6">
            <AttendanceReportsSystem />
          </TabsContent>

          {/* Kanban Task Board Tab */}
          <TabsContent value="kanban" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="glass-morphism">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5 text-blue-500" />
                    <span>Student Case Management Board</span>
                    <Badge variant="secondary">49 Total Cases</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[600px]">
                    {kanbanColumns.map((column, index) => (
                      <motion.div
                        key={column.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="space-y-4"
                      >
                        <div className={`p-4 rounded-xl bg-gradient-to-r ${column.color} text-white`}>
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold">{column.title}</h3>
                            <Badge className="bg-white/20 text-white">{column.count}</Badge>
                          </div>
                        </div>
                        
                        <ScrollArea className="h-[500px]">
                          <div className="space-y-3 pr-4">
                            <AnimatePresence>
                              {column.students.map((student) => (
                                <KanbanCard 
                                  key={student.id} 
                                  student={student} 
                                  columnId={column.id}
                                />
                              ))}
                            </AnimatePresence>
                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              className="border-2 border-dashed border-muted rounded-lg p-4 text-center text-muted-foreground hover:border-blue-300 cursor-pointer"
                            >
                              <Plus className="h-4 w-4 mx-auto mb-2" />
                              <span className="text-sm">Add Case</span>
                            </motion.div>
                          </div>
                        </ScrollArea>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* AI Assistant Tab */}
          <TabsContent value="ai-assistant" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Message Templates */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card className="glass-morphism">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Bot className="h-5 w-5 text-blue-500" />
                      <span>AI Message Generator</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <Label>Message Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select message type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="parent">Parent Communication</SelectItem>
                          <SelectItem value="student">Student Outreach</SelectItem>
                          <SelectItem value="emergency">Emergency Alert</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label>Select Student</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose student" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ramesh">Ramesh Sharma</SelectItem>
                          <SelectItem value="priya">Priya Patel</SelectItem>
                          <SelectItem value="aarti">Aarti Singh</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label>AI-Generated Message</Label>
                      <Textarea 
                        placeholder="AI will generate a personalized message here..."
                        className="min-h-[120px] glass-morphism"
                        value="Dear Mr. Sharma, we noticed Ramesh needs some extra support with attendance. His current attendance is 45% which is below our recommended 75%. We'd love to work together to help him succeed. Could we schedule a brief call this week? Best regards, Dr. Sarah Wilson"
                      />
                    </div>

                    <div className="flex space-x-2">
                      <Button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600">
                        <Sparkles className="h-4 w-4 mr-2" />
                        Generate New
                      </Button>
                      <Button variant="outline">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="outline">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Meeting Prep */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card className="glass-morphism">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-purple-500" />
                      <span>Meeting Prep Assistant</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg">
                      <h4 className="font-semibold text-sm mb-2">
                        📅 Upcoming: Ramesh Sharma (Today 2:00 PM)
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <TrendingDown className="h-3 w-3 text-red-500" />
                          <span>Attendance fell from 85% → 45% (3 months)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="h-3 w-3 text-orange-500" />
                          <span>Fee payment overdue 45 days</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Brain className="h-3 w-3 text-blue-500" />
                          <span>Chatbot detected: "stressed, overwhelmed, money"</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm">AI Suggested Talking Points:</h4>
                      <div className="space-y-2">
                        {[
                          'Start with empathy - acknowledge his challenges',
                          'Discuss financial aid options and payment plans',
                          'Suggest peer study group for academic support',
                          'Recommend stress management workshops'
                        ].map((point, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start space-x-2 text-sm"
                          >
                            <CheckCircle className="h-3 w-3 text-green-500 mt-0.5" />
                            <span>{point}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" className="flex-1">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Full Profile
                      </Button>
                      <Button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600">
                        <Video className="h-4 w-4 mr-2" />
                        Start Meeting
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* AI Intervention Suggestions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="glass-morphism">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                    <span>AI Intervention Recommendations</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      {
                        title: 'Peer Study Groups',
                        description: 'Connect struggling students with high performers',
                        impact: 'Improves grades by avg 18%',
                        students: 5,
                        color: 'from-blue-500 to-cyan-500'
                      },
                      {
                        title: 'Weekly Check-ins',
                        description: 'Personalized 15-min motivational calls',
                        impact: 'Reduces dropout risk by 34%',
                        students: 8,
                        color: 'from-green-500 to-emerald-500'
                      },
                      {
                        title: 'Financial Counseling',
                        description: 'Connect with financial aid office',
                        impact: 'Resolves 89% of fee issues',
                        students: 3,
                        color: 'from-purple-500 to-pink-500'
                      }
                    ].map((suggestion, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        className="glass-morphism p-4 rounded-xl border relative overflow-hidden group cursor-pointer"
                      >
                        <div className={`absolute inset-0 bg-gradient-to-r ${suggestion.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                        <div className="relative z-10">
                          <h4 className="font-semibold mb-2">{suggestion.title}</h4>
                          <p className="text-sm text-muted-foreground mb-3">{suggestion.description}</p>
                          <div className="space-y-2">
                            <Badge className={`bg-gradient-to-r ${suggestion.color} text-white text-xs`}>
                              {suggestion.impact}
                            </Badge>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-muted-foreground">
                                {suggestion.students} students recommended
                              </span>
                              <Button size="sm" variant="outline">
                                Apply
                              </Button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* My Impact Tab */}
          <TabsContent value="impact" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="glass-morphism border-green-200 dark:border-green-800">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-yellow-500" />
                    <span className="gradient-text">Your Impact This Month</span>
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white animate-pulse">
                      OUTSTANDING
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    {[
                      {
                        title: 'Students Improved',
                        value: mentorImpactData.thisMonth.studentsImproved,
                        suffix: '',
                        icon: TrendingUp,
                        color: 'from-green-500 to-emerald-600'
                      },
                      {
                        title: 'Interventions Completed',
                        value: mentorImpactData.thisMonth.interventionsCompleted,
                        suffix: '',
                        icon: CheckCircle,
                        color: 'from-blue-500 to-cyan-600'
                      },
                      {
                        title: 'Parents Re-engaged',
                        value: mentorImpactData.thisMonth.parentsEngaged,
                        suffix: '',
                        icon: Users,
                        color: 'from-purple-500 to-pink-600'
                      },
                      {
                        title: 'Success Rate',
                        value: mentorImpactData.thisMonth.successRate,
                        suffix: '%',
                        icon: Star,
                        color: 'from-yellow-500 to-orange-600'
                      }
                    ].map((metric, index) => (
                      <motion.div
                        key={metric.title}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="text-center p-6 glass-morphism rounded-2xl border relative overflow-hidden group"
                      >
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-r ${metric.color} opacity-0 group-hover:opacity-10 transition-opacity`}
                        />
                        <div className="relative z-10">
                          <motion.div
                            className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${metric.color} flex items-center justify-center text-white`}
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                          >
                            <metric.icon className="h-8 w-8" />
                          </motion.div>
                          <motion.div
                            className="text-3xl font-bold gradient-text mb-2"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            {metric.value}{metric.suffix}
                          </motion.div>
                          <div className="text-sm text-muted-foreground">{metric.title}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="glass-morphism">
                      <CardHeader>
                        <CardTitle className="text-lg">Impact Trend</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={mentorImpactData.trends}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="month" />
                              <YAxis />
                              <Tooltip />
                              <Area
                                type="monotone"
                                dataKey="improved"
                                stackId="1"
                                stroke="#10b981"
                                fill="#10b981"
                                fillOpacity={0.3}
                              />
                              <Area
                                type="monotone"
                                dataKey="interventions"
                                stackId="1"
                                stroke="#3b82f6"
                                fill="#3b82f6"
                                fillOpacity={0.3}
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="glass-morphism">
                      <CardHeader>
                        <CardTitle className="text-lg">Success Stories</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {[
                          {
                            student: 'Ramesh Sharma',
                            achievement: 'Improved from 45% → 78% attendance',
                            timeframe: '6 weeks'
                          },
                          {
                            student: 'Priya Patel',
                            achievement: 'Overcame anxiety, grades up 25%',
                            timeframe: '2 months'
                          },
                          {
                            student: 'Aarti Singh',
                            achievement: 'Secured scholarship, fees resolved',
                            timeframe: '3 weeks'
                          }
                        ].map((story, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg"
                          >
                            <div className="font-semibold text-sm">{story.student}</div>
                            <div className="text-sm text-muted-foreground">{story.achievement}</div>
                            <div className="text-xs text-green-600 dark:text-green-400">
                              Completed in {story.timeframe}
                            </div>
                          </motion.div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Placeholder tabs for other features */}
          <TabsContent value="counseling">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <Heart className="h-16 w-16 mx-auto mb-4 text-purple-500" />
              <h3 className="text-2xl font-semibold mb-2">Counseling Management</h3>
              <p className="text-muted-foreground mb-6">
                Coming soon: Smart scheduling, session notes, and anonymous counseling mode
              </p>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-600">
                <PlusCircle className="h-4 w-4 mr-2" />
                Schedule Session
              </Button>
            </motion.div>
          </TabsContent>

          <TabsContent value="insights">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <Activity className="h-16 w-16 mx-auto mb-4 text-blue-500" />
              <h3 className="text-2xl font-semibold mb-2">Emotional Insights</h3>
              <p className="text-muted-foreground mb-6">
                AI stress detection, sentiment analysis, and emotional trend monitoring
              </p>
              <Button className="bg-gradient-to-r from-blue-500 to-cyan-600">
                <Brain className="h-4 w-4 mr-2" />
                View Insights
              </Button>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}