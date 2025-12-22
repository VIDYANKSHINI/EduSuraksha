import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Alert, AlertDescription } from './ui/alert';
import { RiskAcknowledgmentSystem } from './risk-acknowledgment-system';
import { 
  User, 
  Calendar, 
  BookOpen, 
  Award, 
  TrendingUp, 
  TrendingDown,
  Heart, 
  MessageCircle,
  Phone,
  Mail,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Volume2,
  Globe,
  Bell,
  Star,
  Users,
  Target
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, RadialBarChart, RadialBar } from 'recharts';

export function ParentDashboard() {
  const [selectedChild, setSelectedChild] = useState(0);
  const [language, setLanguage] = useState('en');

  // Mock data for children
  const children = [
    {
      id: 1,
      name: 'Neha Gupta',
      class: 'Computer Science - 2nd Year',
      studentId: 'CS-2023-0142',
      profileImage: '',
      currentStats: {
        attendance: 89,
        grades: 85,
        fees: 'Paid',
        wellnessScore: 78,
        riskLevel: 'safe'
      }
    },
    {
      id: 2,
      name: 'Rohan Gupta',
      class: 'Mechanical Engineering - 1st Year',
      studentId: 'ME-2024-0089',
      profileImage: '',
      currentStats: {
        attendance: 76,
        grades: 72,
        fees: 'Pending',
        wellnessScore: 65,
        riskLevel: 'medium'
      }
    }
  ];

  const performanceData = [
    { month: 'Jan', attendance: 92, grades: 85, fees: 100 },
    { month: 'Feb', attendance: 88, grades: 82, fees: 100 },
    { month: 'Mar', attendance: 95, grades: 88, fees: 100 },
    { month: 'Apr', attendance: 89, grades: 86, fees: 100 },
    { month: 'May', attendance: 91, grades: 89, fees: 100 },
    { month: 'Sep', attendance: 89, grades: 85, fees: 100 }
  ];

  const recentUpdates = [
    {
      id: 1,
      type: 'achievement',
      title: 'Excellent Performance',
      message: 'Neha scored 92% in Database Systems exam',
      timestamp: '2 hours ago',
      priority: 'positive'
    },
    {
      id: 2,
      type: 'attendance',
      title: 'Attendance Alert',
      message: 'Rohan missed 3 classes this week',
      timestamp: '1 day ago',
      priority: 'warning'
    },
    {
      id: 3,
      type: 'fees',
      title: 'Fee Reminder',
      message: 'Semester fee payment due in 5 days',
      timestamp: '2 days ago',
      priority: 'info'
    },
    {
      id: 4,
      type: 'wellness',
      title: 'Wellness Check',
      message: 'Neha completed stress management session',
      timestamp: '3 days ago',
      priority: 'positive'
    }
  ];

  const suggestedActions = [
    {
      id: 1,
      title: 'Schedule Parent-Teacher Meeting',
      description: 'Discuss Rohan\'s recent performance',
      urgency: 'high',
      estimatedTime: '30 min'
    },
    {
      id: 2,
      title: 'Review Study Schedule',
      description: 'Help optimize daily study routine',
      urgency: 'medium',
      estimatedTime: '15 min'
    },
    {
      id: 3,
      title: 'Fee Payment',
      description: 'Complete pending semester fee',
      urgency: 'One paid one remaining',
      estimatedTime: '10 min'
    }
  ];

  const currentChild = children[selectedChild];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-600 bg-red-50 dark:bg-red-950 dark:text-red-400';
      case 'medium': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-950 dark:text-yellow-400';
      case 'safe': return 'text-green-600 bg-green-50 dark:bg-green-950 dark:text-green-400';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-950 dark:text-gray-400';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'positive': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'info': return <Bell className="h-4 w-4 text-blue-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950';
      case 'medium': return 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950';
      case 'low': return 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950';
      default: return 'border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950';
    }
  };

  const handleVoiceSummary = () => {
    // Simulate voice summary
    const message = `नमस्ते! आपकी बेटी नेहा का प्रदर्शन अच्छा है। उसकी उपस्थिति 89% है और ग्रेड 85% है। हाल ही में उसने डेटाबेस सिस्टम की परीक्षा में 92% अंक प्राप्त किए हैं।`;
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.lang = 'hi-IN';
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-gray-900 dark:via-red-900 dark:to-pink-900">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
              Parent Dashboard
            </h1>
            <p className="text-muted-foreground">
              Monitor your child's academic progress and well-being
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={handleVoiceSummary}>
              <Volume2 className="h-4 w-4 mr-2" />
              Voice Summary (हिंदी)
            </Button>
            <Button variant="outline">
              <Globe className="h-4 w-4 mr-2" />
              Language
            </Button>
            <Button className="bg-gradient-to-r from-orange-500 to-red-500">
              <MessageCircle className="h-4 w-4 mr-2" />
              Contact School
            </Button>
          </div>
        </motion.div>

        {/* Child Selector */}
        {children.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex space-x-4"
          >
            {children.map((child, index) => (
              <Card 
                key={child.id}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedChild === index 
                    ? 'ring-2 ring-orange-500 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950' 
                    : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedChild(index)}
              >
                <CardContent className="flex items-center space-x-3 p-4">
                  <Avatar>
                    <AvatarFallback className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                      {child.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{child.name}</p>
                    <p className="text-sm text-muted-foreground">{child.class}</p>
                  </div>
                  <Badge className={getRiskColor(child.currentStats.riskLevel)}>
                    {child.currentStats.riskLevel.toUpperCase()}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        )}

        {/* Quick Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              title: 'Attendance', 
              value: currentChild.currentStats.attendance, 
              unit: '%', 
              icon: Calendar, 
              color: 'from-blue-500 to-blue-600',
              trend: currentChild.currentStats.attendance >= 85 ? 'up' : 'down'
            },
            { 
              title: 'Academic Performance', 
              value: currentChild.currentStats.grades, 
              unit: '%', 
              icon: BookOpen, 
              color: 'from-green-500 to-green-600',
              trend: currentChild.currentStats.grades >= 80 ? 'up' : 'down'
            },
            { 
              title: 'Fee Status', 
              value: currentChild.currentStats.fees === 'Paid' ? 'Paid' : 'Pending', 
              unit: '', 
              icon: DollarSign, 
              color: 'from-purple-500 to-purple-600',
              trend: currentChild.currentStats.fees === 'Paid' ? 'up' : 'down'
            },
            { 
              title: 'Wellness Score', 
              value: currentChild.currentStats.wellnessScore, 
              unit: '%', 
              icon: Heart, 
              color: 'from-pink-500 to-pink-600',
              trend: currentChild.currentStats.wellnessScore >= 75 ? 'up' : 'down'
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="relative overflow-hidden">
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5`}
                  whileHover={{ opacity: 0.1 }}
                  transition={{ duration: 0.3 }}
                />
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm">{stat.title}</CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline space-x-1">
                      <span className="text-2xl font-bold">{stat.value}</span>
                      <span className="text-sm text-muted-foreground">{stat.unit}</span>
                    </div>
                    {stat.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                  {typeof stat.value === 'number' && (
                    <Progress value={stat.value} className="h-2 mt-2" />
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="academics">Academics</TabsTrigger>
            <TabsTrigger value="risk-alerts" className="text-red-600">
              Risk Alerts
            </TabsTrigger>
            <TabsTrigger value="communications">Messages</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Performance Chart */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center">
                        <TrendingUp className="h-5 w-5 mr-2" />
                        Academic Progress
                      </span>
                      <Button variant="outline" size="sm">
                        <Volume2 className="h-4 w-4 mr-1" />
                        Listen
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={performanceData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis domain={[0, 100]} />
                          <Tooltip />
                          <Line 
                            type="monotone" 
                            dataKey="attendance" 
                            stroke="#3b82f6" 
                            strokeWidth={2}
                            name="Attendance %"
                          />
                          <Line 
                            type="monotone" 
                            dataKey="grades" 
                            stroke="#10b981" 
                            strokeWidth={2}
                            name="Grades %"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Recent Updates & AI Insights */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Bell className="h-5 w-5 mr-2" />
                      Recent Updates
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentUpdates.map((update) => (
                      <div key={update.id} className="flex items-start space-x-3 p-3 rounded-lg border">
                        {getPriorityIcon(update.priority)}
                        <div className="flex-1">
                          <p className="font-medium text-sm">{update.title}</p>
                          <p className="text-sm text-muted-foreground">{update.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{update.timestamp}</p>
                        </div>
                      </div>
                    ))}
                    
                    <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Target className="h-4 w-4 text-blue-600" />
                        <p className="text-sm text-blue-700 dark:text-blue-300">AI Parent Assistant</p>
                      </div>
                      <p className="text-sm text-blue-600 dark:text-blue-400">
                        Based on recent patterns, consider discussing time management strategies with {currentChild.name}. 
                        Their performance shows potential for improvement with better study habits.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Suggested Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="h-5 w-5 mr-2" />
                    Suggested Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {suggestedActions.map((action) => (
                      <div key={action.id} className={`p-4 rounded-lg border-2 ${getUrgencyColor(action.urgency)}`}>
                        <div className="flex items-start justify-between mb-2">
                          <Badge variant={action.urgency === 'high' ? 'destructive' : action.urgency === 'medium' ? 'default' : 'secondary'}>
                            {action.urgency.toUpperCase()}
                          </Badge>
                          <Clock className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <h4 className="font-medium mb-1">{action.title}</h4>
                        <p className="text-sm text-muted-foreground mb-3">{action.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">Est. {action.estimatedTime}</span>
                          <Button size="sm">Take Action</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="academics" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <h3>Detailed Academic Report</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Subject-wise performance, assignment tracking, and teacher feedback.
                </p>
                <Button className="bg-gradient-to-r from-green-500 to-blue-500">
                  View Full Report
                </Button>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="risk-alerts" className="space-y-6">
            <RiskAcknowledgmentSystem />
          </TabsContent>

          <TabsContent value="communications" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Communication Center
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="h-20 flex-col">
                      <Phone className="h-6 w-6 mb-2" />
                      <span>Call Teacher</span>
                      <span className="text-xs text-muted-foreground">Direct line available</span>
                    </Button>
                    
                    <Button variant="outline" className="h-20 flex-col">
                      <Mail className="h-6 w-6 mb-2" />
                      <span>Send Message</span>
                      <span className="text-xs text-muted-foreground">Auto-translated</span>
                    </Button>
                    
                    <Button variant="outline" className="h-20 flex-col">
                      <Calendar className="h-6 w-6 mb-2" />
                      <span>Schedule Meeting</span>
                      <span className="text-xs text-muted-foreground">Parent-teacher conference</span>
                    </Button>
                    
                    <Button variant="outline" className="h-20 flex-col">
                      <Users className="h-6 w-6 mb-2" />
                      <span>Parent Community</span>
                      <span className="text-xs text-muted-foreground">Connect with other parents</span>
                    </Button>
                  </div>
                  
                  <Alert>
                    <Volume2 className="h-4 w-4" />
                    <AlertDescription>
                      All messages can be received as voice notes in your preferred language (Hindi, English, etc.)
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="support" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="h-5 w-5 mr-2 text-pink-500" />
                    Parent Support Resources
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">How You Can Help</h4>
                      <div className="space-y-3">
                        <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950">
                          <h5 className="font-medium text-sm mb-1">Study Environment</h5>
                          <p className="text-sm text-muted-foreground">Create a quiet, well-lit study space at home</p>
                        </div>
                        <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950">
                          <h5 className="font-medium text-sm mb-1">Routine</h5>
                          <p className="text-sm text-muted-foreground">Help establish consistent daily study routines</p>
                        </div>
                        <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-950">
                          <h5 className="font-medium text-sm mb-1">Communication</h5>
                          <p className="text-sm text-muted-foreground">Regular check-ins about school and well-being</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-medium">Support Resources</h4>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full justify-start">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Parenting Tips (Available in Hindi)
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Users className="h-4 w-4 mr-2" />
                          Parent Support Groups
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Heart className="h-4 w-4 mr-2" />
                          Student Wellness Guidelines
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Phone className="h-4 w-4 mr-2" />
                          24/7 Counselor Helpline
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Star className="h-4 w-4 text-orange-600" />
                      <p className="text-sm text-orange-700 dark:text-orange-300">Family Success Tip</p>
                    </div>
                    <p className="text-sm text-orange-600 dark:text-orange-400">
                      Research shows that parental involvement increases student success by 30%. 
                      Your engagement makes a real difference in {currentChild.name}'s academic journey!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
