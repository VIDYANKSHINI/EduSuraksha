import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  User, 
  Calendar, 
  BookOpen, 
  Award, 
  TrendingUp, 
  Heart, 
  MessageCircle,
  Target,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  Trophy,
  Brain,
  Users,
  Bell,
  Send,
  Phone,
  Video,
  UserPlus,
  Shield,
  Lock,
  Sparkles,
  Zap,
  Plus,
  Eye,
  ThumbsUp,
  ThumbsDown,
  AlertTriangle,
  Calendar as CalendarIcon,
  X,
  Check,
  MessageSquare,
  Smile,
  Frown,
  Meh,
  PlusCircle,
  Settings,
  Volume2,
  VolumeX,
  Headphones,
  BarChart3,
  DollarSign,
  FileText,
  Upload,
  GraduationCap,
  Banknote,
  XCircle
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, PieChart, Pie, Cell } from 'recharts';
import { EmergencyAlertSystem } from './emergency-alert-system';

// Mock data for reminders and notifications
const upcomingReminders = [
  {
    id: 1,
    type: 'counseling',
    title: 'Counseling Session with Dr. Sarah Wilson',
    time: 'Today, 2:00 PM',
    location: 'Counseling Center - Room 204',
    urgent: true,
    icon: MessageCircle
  },
  {
    id: 2,
    type: 'meeting',
    title: 'Parent-Teacher Meeting',
    time: 'Tomorrow, 10:00 AM',
    location: 'Main Hall',
    urgent: false,
    icon: Users
  },
  {
    id: 3,
    type: 'wellness',
    title: 'Wellness Check-in',
    time: 'Friday, 3:00 PM',
    location: 'Online Session',
    urgent: false,
    icon: Heart
  }
];

// Mock peer support data
const peerChats = [
  {
    id: 1,
    user: 'Anonymous Student',
    message: 'Anyone else struggling with the Physics assignment? Need some study tips!',
    time: '5m ago',
    replies: 3,
    helpful: 12,
    category: 'academic'
  },
  {
    id: 2,
    user: 'StudyBuddy23',
    message: 'Just wanted to share - meditation really helped me with exam stress. Try the Headspace app!',
    time: '15m ago',
    replies: 7,
    helpful: 25,
    category: 'wellness'
  },
  {
    id: 3,
    user: 'TechGeek',
    message: 'Forming a study group for Database Systems. DM if interested!',
    time: '1h ago',
    replies: 12,
    helpful: 8,
    category: 'study-group'
  }
];

// Mock counseling feedback form
const feedbackQuestions = [
  { id: 1, question: 'How helpful was your counseling session?', type: 'rating' },
  { id: 2, question: 'Did you feel comfortable during the session?', type: 'rating' },
  { id: 3, question: 'Any specific topics you\'d like to discuss next time?', type: 'text' },
  { id: 4, question: 'Additional feedback (anonymous)', type: 'text' }
];

// Mock scholarship data
const availableScholarships = [
  {
    id: 1,
    title: 'Merit Excellence Scholarship',
    amount: '₹50,000',
    category: 'Merit-Based',
    deadline: '2024-03-15',
    description: 'For students with exceptional academic performance (CGPA > 8.5)',
    requirements: ['CGPA above 8.5', 'No pending fees', 'Letter of recommendation'],
    status: 'eligible',
    icon: Trophy,
    color: 'from-yellow-500 to-amber-600'
  },
  {
    id: 2,
    title: 'Financial Aid Scholarship',
    amount: '₹75,000',
    category: 'Need-Based',
    deadline: '2024-04-20',
    description: 'Financial assistance for students from economically disadvantaged backgrounds',
    requirements: ['Family income certificate', 'Bank statements', 'Academic transcripts'],
    status: 'eligible',
    icon: DollarSign,
    color: 'from-green-500 to-emerald-600'
  },
  {
    id: 3,
    title: 'Innovation & Research Grant',
    amount: '₹1,00,000',
    category: 'Research-Based',
    deadline: '2024-05-10',
    description: 'For students engaged in innovative research projects',
    requirements: ['Research proposal', 'Faculty endorsement', 'Previous research work'],
    status: 'applied',
    icon: Brain,
    color: 'from-purple-500 to-violet-600'
  },
  {
    id: 4,
    title: 'Sports Excellence Award',
    amount: '₹30,000',
    category: 'Sports',
    deadline: '2024-02-28',
    description: 'Recognition for outstanding achievements in sports',
    requirements: ['Sports certificates', 'Performance records', 'Coach recommendation'],
    status: 'not_eligible',
    icon: Trophy,
    color: 'from-blue-500 to-cyan-600'
  },
  {
    id: 5,
    title: 'Community Service Grant',
    amount: '₹25,000',
    category: 'Service',
    deadline: '2024-06-30',
    description: 'For students with significant community service contributions',
    requirements: ['Service certificates', 'Impact report', 'Community leader reference'],
    status: 'eligible',
    icon: Heart,
    color: 'from-pink-500 to-rose-600'
  }
];

const appliedScholarships = [
  {
    id: 3,
    title: 'Innovation & Research Grant',
    amount: '₹1,00,000',
    appliedDate: '2024-01-15',
    status: 'under_review',
    statusText: 'Under Review',
    nextStep: 'Interview scheduled for Feb 20, 2024'
  }
];

const ReminderCard = ({ reminder }: any) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    whileHover={{ scale: 1.02 }}
    className={`p-4 rounded-xl border relative overflow-hidden ${
      reminder.urgent 
        ? 'bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 border-red-200 dark:border-red-800' 
        : 'glass-morphism'
    }`}
  >
    {reminder.urgent && (
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500" />
    )}
    
    <div className="flex items-start space-x-3">
      <motion.div
        className={`p-2 rounded-lg ${
          reminder.urgent 
            ? 'bg-gradient-to-r from-red-500 to-orange-500' 
            : 'bg-gradient-to-r from-blue-500 to-purple-600'
        } text-white`}
        whileHover={{ rotate: 15, scale: 1.1 }}
      >
        <reminder.icon className="h-4 w-4" />
      </motion.div>
      
      <div className="flex-1">
        <h4 className="font-semibold text-sm mb-1">{reminder.title}</h4>
        <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-2">
          <Clock className="h-3 w-3" />
          <span>{reminder.time}</span>
        </div>
        <p className="text-xs text-muted-foreground">{reminder.location}</p>
      </div>
      
      <div className="flex space-x-1">
        <Button variant="outline" size="sm" className="h-7 px-2">
          <Bell className="h-3 w-3" />
        </Button>
        <Button size="sm" className="h-7 px-2 bg-gradient-to-r from-blue-500 to-purple-600">
          <Check className="h-3 w-3" />
        </Button>
      </div>
    </div>
  </motion.div>
);

// Scholarship Card Component
const ScholarshipCard = ({ scholarship, onApply }: any) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'eligible': return 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200';
      case 'applied': return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200';
      case 'not_eligible': return 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-950 dark:text-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'eligible': return 'Eligible to Apply';
      case 'applied': return 'Application Submitted';
      case 'not_eligible': return 'Not Eligible';
      default: return 'Unknown';
    }
  };

  const isDeadlineSoon = () => {
    const deadline = new Date(scholarship.deadline);
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays > 0;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="group"
    >
      <Card className="glass-morphism border-2 border-transparent hover:border-blue-300/50 transition-all duration-300 relative overflow-hidden">
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${scholarship.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
        />
        
        <CardHeader className="relative z-10">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <motion.div
                className={`p-3 rounded-2xl bg-gradient-to-br ${scholarship.color} text-white`}
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <scholarship.icon className="h-6 w-6" />
              </motion.div>
              <div>
                <CardTitle className="text-lg">{scholarship.title}</CardTitle>
                <p className="text-2xl font-bold text-green-600 mt-1">{scholarship.amount}</p>
              </div>
            </div>
            <div className="text-right space-y-2">
              <Badge className={getStatusColor(scholarship.status)}>
                {getStatusText(scholarship.status)}
              </Badge>
              {isDeadlineSoon() && (
                <Badge variant="destructive" className="animate-pulse">
                  Deadline Soon
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="relative z-10">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">{scholarship.description}</p>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Deadline: {new Date(scholarship.deadline).toLocaleDateString()}</span>
              </div>
              <Badge variant="outline">{scholarship.category}</Badge>
            </div>

            <Separator />

            <div>
              <p className="text-sm font-medium mb-2">Requirements:</p>
              <div className="space-y-1">
                {scholarship.requirements.slice(0, 2).map((req: string, index: number) => (
                  <div key={index} className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                    <span>{req}</span>
                  </div>
                ))}
                {scholarship.requirements.length > 2 && (
                  <p className="text-xs text-muted-foreground">
                    +{scholarship.requirements.length - 2} more requirements
                  </p>
                )}
              </div>
            </div>

            <div className="flex space-x-2 pt-2">
              {scholarship.status === 'eligible' && (
                <Button 
                  onClick={() => onApply(scholarship)}
                  className={`flex-1 bg-gradient-to-r ${scholarship.color} hover:shadow-lg`}
                >
                  <Award className="h-4 w-4 mr-2" />
                  Apply Now
                </Button>
              )}
              {scholarship.status === 'applied' && (
                <Button variant="outline" className="flex-1" disabled>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Applied
                </Button>
              )}
              {scholarship.status === 'not_eligible' && (
                <Button variant="outline" className="flex-1" disabled>
                  <XCircle className="h-4 w-4 mr-2" />
                  Not Eligible
                </Button>
              )}
              <Button variant="ghost" size="sm">
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>

        {/* Hover Effect Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5"
          initial={{ x: '-100%' }}
          whileHover={{ x: '0%' }}
          transition={{ duration: 0.3 }}
        />
      </Card>
    </motion.div>
  );
};

// Scholarship Application Modal
const ScholarshipApplicationModal = ({ scholarship, isOpen, onClose }: any) => {
  const [formData, setFormData] = useState({
    personalStatement: '',
    achievements: '',
    financialNeed: '',
    parentIncome: '',
    bankAccount: '',
    attachments: []
  });

  const handleSubmit = () => {
    // Handle scholarship application submission
    console.log('Scholarship application submitted:', formData);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-card p-6 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto glass-morphism"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-2xl bg-gradient-to-r ${scholarship?.color} text-white`}>
                  <scholarship?.icon className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{scholarship?.title}</h2>
                  <p className="text-muted-foreground">Apply for {scholarship?.amount} scholarship</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Application Form */}
              <div className="lg:col-span-2 space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Personal Statement</Label>
                    <Textarea
                      placeholder="Explain why you deserve this scholarship and how it will help your academic journey..."
                      value={formData.personalStatement}
                      onChange={(e) => setFormData({...formData, personalStatement: e.target.value})}
                      className="min-h-[120px]"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">Academic Achievements & Extracurriculars</Label>
                    <Textarea
                      placeholder="List your achievements, awards, projects, leadership roles, and activities..."
                      value={formData.achievements}
                      onChange={(e) => setFormData({...formData, achievements: e.target.value})}
                      className="min-h-[100px]"
                    />
                  </div>

                  {scholarship?.category === 'Need-Based' && (
                    <>
                      <div>
                        <Label className="text-sm font-medium mb-2 block">Financial Need Statement</Label>
                        <Textarea
                          placeholder="Describe your financial situation and why you need this scholarship..."
                          value={formData.financialNeed}
                          onChange={(e) => setFormData({...formData, financialNeed: e.target.value})}
                          className="min-h-[100px]"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium mb-2 block">Annual Family Income</Label>
                          <Input
                            placeholder="₹ 0,00,000"
                            value={formData.parentIncome}
                            onChange={(e) => setFormData({...formData, parentIncome: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium mb-2 block">Bank Account Number</Label>
                          <Input
                            placeholder="Account number for disbursement"
                            value={formData.bankAccount}
                            onChange={(e) => setFormData({...formData, bankAccount: e.target.value})}
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div>
                    <Label className="text-sm font-medium mb-2 block">Supporting Documents</Label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                      <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Upload transcripts, certificates, and recommendation letters
                      </p>
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        Select Files
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scholarship Info & Requirements */}
              <div className="space-y-6">
                <Card className="glass-morphism">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Award className="h-5 w-5 text-yellow-500" />
                      <span>Scholarship Details</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium">Amount</p>
                      <p className="text-2xl font-bold text-green-600">{scholarship?.amount}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Category</p>
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200">
                        {scholarship?.category}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Application Deadline</p>
                      <p className="text-sm text-red-600 font-medium">{scholarship?.deadline}</p>
                    </div>
                    <Separator />
                    <div>
                      <p className="text-sm font-medium mb-2">Description</p>
                      <p className="text-sm text-muted-foreground">{scholarship?.description}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-morphism">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Requirements</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {scholarship?.requirements?.map((req: string, index: number) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          <span className="text-sm">{req}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="flex space-x-3">
                  <Button variant="outline" onClick={onClose} className="flex-1">
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSubmit}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Submit Application
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const PeerSupportChat = () => {
  const [newMessage, setNewMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academic': return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200';
      case 'wellness': return 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200';
      case 'study-group': return 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-950 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-4">
      {/* Post a message */}
      <Card className="glass-morphism">
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                  You
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">Share anonymously</span>
              <Shield className="h-4 w-4 text-green-500" />
            </div>
            <Textarea
              placeholder="Share your thoughts, ask for help, or offer support to fellow students..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="min-h-[80px]"
            />
            <div className="flex items-center justify-between">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="academic">Academic</SelectItem>
                  <SelectItem value="wellness">Wellness</SelectItem>
                  <SelectItem value="study-group">Study Group</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600">
                <Send className="h-4 w-4 mr-2" />
                Post Anonymously
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chat messages */}
      <div className="space-y-3">
        {peerChats.map((chat, index) => (
          <motion.div
            key={chat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass-morphism hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
                      {chat.user[0]}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-medium text-sm">{chat.user}</span>
                      <Badge className={getCategoryColor(chat.category)}>
                        {chat.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{chat.time}</span>
                    </div>
                    
                    <p className="text-sm mb-3">{chat.message}</p>
                    
                    <div className="flex items-center space-x-4">
                      <Button variant="ghost" size="sm" className="text-xs">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        {chat.replies} replies
                      </Button>
                      <Button variant="ghost" size="sm" className="text-xs text-green-600">
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        {chat.helpful} helpful
                      </Button>
                      <Button variant="ghost" size="sm" className="text-xs">
                        <Heart className="h-3 w-3 mr-1" />
                        Support
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const CounselingRequestModal = ({ isOpen, onClose }: any) => {
  const [selectedType, setSelectedType] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [preferFemale, setPreferFemale] = useState(false);
  const [description, setDescription] = useState('');

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-card p-6 rounded-2xl max-w-md w-full glass-morphism"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Request Counseling</h2>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Type of Support</label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select counseling type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="academic">Academic Guidance</SelectItem>
                    <SelectItem value="personal">Personal Issues</SelectItem>
                    <SelectItem value="career">Career Counseling</SelectItem>
                    <SelectItem value="mental-health">Mental Health Support</SelectItem>
                    <SelectItem value="harassment">Harassment/Safety Concerns</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="anonymous"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="anonymous" className="text-sm flex items-center">
                    <Lock className="h-3 w-3 mr-1" />
                    Request anonymous counseling
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="female"
                    checked={preferFemale}
                    onChange={(e) => setPreferFemale(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="female" className="text-sm flex items-center">
                    <Users className="h-3 w-3 mr-1" />
                    Prefer female counselor
                  </label>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Brief Description (Optional)</label>
                <Textarea
                  placeholder="Briefly describe what you'd like to discuss..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[80px]"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <Button variant="outline" onClick={onClose} className="flex-1">
                  Cancel
                </Button>
                <Button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Session
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const FeedbackModal = ({ isOpen, onClose }: any) => {
  const [ratings, setRatings] = useState<Record<number, number>>({});
  const [textResponses, setTextResponses] = useState<Record<number, string>>({});
  const [isAnonymous, setIsAnonymous] = useState(true);

  const StarRating = ({ questionId, rating, onRate }: any) => (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.button
          key={star}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onRate(star)}
          className={`text-xl ${
            star <= rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
        >
          <Star className="h-6 w-6 fill-current" />
        </motion.button>
      ))}
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-card p-6 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto glass-morphism"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Session Feedback</h2>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-2 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <Shield className="h-4 w-4 text-green-500" />
                <span className="text-sm">Your feedback helps us improve our counseling services</span>
              </div>

              {feedbackQuestions.map((question) => (
                <div key={question.id} className="space-y-3">
                  <h3 className="font-medium">{question.question}</h3>
                  
                  {question.type === 'rating' ? (
                    <StarRating
                      questionId={question.id}
                      rating={ratings[question.id] || 0}
                      onRate={(rating: number) => 
                        setRatings(prev => ({ ...prev, [question.id]: rating }))
                      }
                    />
                  ) : (
                    <Textarea
                      placeholder="Your response..."
                      value={textResponses[question.id] || ''}
                      onChange={(e) => 
                        setTextResponses(prev => ({ ...prev, [question.id]: e.target.value }))
                      }
                      className="min-h-[80px]"
                    />
                  )}
                </div>
              ))}

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="anonymous-feedback"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded"
                />
                <label htmlFor="anonymous-feedback" className="text-sm flex items-center">
                  <Lock className="h-3 w-3 mr-1" />
                  Submit feedback anonymously
                </label>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button variant="outline" onClick={onClose} className="flex-1">
                  Skip for Now
                </Button>
                <Button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600">
                  <Send className="h-4 w-4 mr-2" />
                  Submit Feedback
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export function StudentDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [showCounselingModal, setShowCounselingModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showScholarshipModal, setShowScholarshipModal] = useState(false);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [scholarshipFilter, setScholarshipFilter] = useState('all');

  // Mock student data
  const studentInfo = {
    name: 'Neha Gupta',
    studentId: 'CS-2023-0142',
    class: 'Computer Science - 2nd Year',
    riskLevel: 'safe'
  };

  const performanceData = [
    { month: 'Jan', attendance: 92, grades: 85, engagement: 78 },
    { month: 'Feb', attendance: 88, grades: 82, engagement: 85 },
    { month: 'Mar', attendance: 95, grades: 88, engagement: 92 },
    { month: 'Apr', attendance: 89, grades: 86, engagement: 88 },
    { month: 'May', attendance: 91, grades: 89, engagement: 90 },
    { month: 'Sep', attendance: 89, grades: 85, engagement: 84 }
  ];

  const currentStats = {
    attendance: 89,
    grades: 85,
    engagement: 84,
    wellness: 78
  };

  // Check if there are urgent reminders
  const hasUrgentReminders = upcomingReminders.some(r => r.urgent);

  const handleScholarshipApply = (scholarship: any) => {
    setSelectedScholarship(scholarship);
    setShowScholarshipModal(true);
  };

  const filteredScholarships = scholarshipFilter === 'all' 
    ? availableScholarships 
    : availableScholarships.filter(s => s.category.toLowerCase().includes(scholarshipFilter.toLowerCase()) || s.status === scholarshipFilter);

  return (
    <div className="min-h-screen relative">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header with Risk Alert */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row items-start justify-between gap-4"
        >
          <div className="flex items-center space-x-4">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="relative"
            >
              <Avatar className="h-16 w-16 border-4 border-white shadow-lg">
                <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-600 text-white text-lg font-semibold">
                  {studentInfo.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                <CheckCircle className="h-3 w-3 text-white" />
              </div>
            </motion.div>
            
            <div>
              <motion.h1 
                className="text-3xl font-bold gradient-text mb-1"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] 
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              >
                Welcome back, {studentInfo.name}!
              </motion.h1>
              <p className="text-muted-foreground">{studentInfo.class}</p>
              <div className="flex items-center space-x-2 mt-2">
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                  <Target className="h-3 w-3 mr-1" />
                  On Track
                </Badge>
                {hasUrgentReminders && (
                  <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white animate-pulse">
                    <Bell className="h-3 w-3 mr-1" />
                    Urgent Reminder
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center space-x-3">
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 0 20px rgba(239, 68, 68, 0.4)",
                  "0 0 40px rgba(239, 68, 68, 0.6)",
                  "0 0 20px rgba(239, 68, 68, 0.4)"
                ]
              }}
              transition={{
                boxShadow: { duration: 2, repeat: Infinity }
              }}
            >
              <Button 
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
                onClick={() => {
                  // Handle emergency alert
                  const tabs = document.querySelector('[value="emergency"]') as HTMLElement;
                  tabs?.click();
                }}
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                Emergency Alert
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={() => setShowCounselingModal(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Request Counseling
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline">
                <Heart className="h-4 w-4 mr-2" />
                Wellness Chat
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Urgent Reminders Alert */}
        {hasUrgentReminders && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 border border-red-200 dark:border-red-800 rounded-2xl p-4"
          >
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <div>
                <h3 className="font-semibold text-red-800 dark:text-red-200">Urgent Reminder</h3>
                <p className="text-sm text-red-600 dark:text-red-300">
                  You have upcoming counseling sessions that require your attention.
                </p>
              </div>
              <Button size="sm" className="bg-gradient-to-r from-red-500 to-orange-500">
                View Details
              </Button>
            </div>
          </motion.div>
        )}

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 glass-morphism">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="scholarships">
              Scholarships
              <Badge className="ml-2 bg-yellow-500 text-white text-xs px-1">
                {availableScholarships.filter(s => s.status === 'eligible').length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="reminders">
              Reminders
              {upcomingReminders.length > 0 && (
                <Badge className="ml-2 bg-blue-500 text-white text-xs px-1">
                  {upcomingReminders.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="emergency" className="text-red-600">
              Emergency
            </TabsTrigger>
            <TabsTrigger value="peer-support">Peer Support</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="wellness">Wellness</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Performance Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Attendance', value: `${currentStats.attendance}%`, icon: Calendar, color: 'from-blue-500 to-blue-600' },
                { title: 'Academic Performance', value: `${currentStats.grades}%`, icon: BookOpen, color: 'from-green-500 to-green-600' },
                { title: 'Engagement', value: `${currentStats.engagement}%`, icon: Target, color: 'from-purple-500 to-purple-600' },
                { title: 'Wellness Score', value: `${currentStats.wellness}%`, icon: Heart, color: 'from-pink-500 to-pink-600' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <Card className="glass-morphism border relative overflow-hidden group">
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity`}
                    />
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                      <motion.div
                        whileHover={{ rotate: 15, scale: 1.1 }}
                        className={`p-2 rounded-lg bg-gradient-to-r ${stat.color} text-white`}
                      >
                        <stat.icon className="h-4 w-4" />
                      </motion.div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <Progress value={parseInt(stat.value)} className="mt-2" />
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Quick Overview Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Performance Chart */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card className="glass-morphism">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BarChart3 className="h-5 w-5 text-blue-500" />
                      <span>Performance Trends</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={performanceData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="attendance" stroke="#3b82f6" strokeWidth={2} />
                          <Line type="monotone" dataKey="grades" stroke="#10b981" strokeWidth={2} />
                          <Line type="monotone" dataKey="engagement" stroke="#8b5cf6" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Quick Actions & Reminders */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <Card className="glass-morphism">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Bell className="h-5 w-5 text-blue-500" />
                      <span>Upcoming Reminders</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {upcomingReminders.slice(0, 2).map((reminder) => (
                        <div key={reminder.id} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                          <reminder.icon className="h-4 w-4 text-blue-500" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{reminder.title}</p>
                            <p className="text-xs text-muted-foreground">{reminder.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Scholarship Quick Access */}
                <Card className="glass-morphism border-yellow-200 dark:border-yellow-800">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 rounded-2xl bg-gradient-to-r from-yellow-500 to-amber-600 text-white">
                        <Award className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">Scholarship Opportunities</h3>
                        <p className="text-sm text-muted-foreground">
                          {availableScholarships.filter(s => s.status === 'eligible').length} scholarships available
                        </p>
                      </div>
                      <Button 
                        size="sm"
                        className="bg-gradient-to-r from-yellow-500 to-amber-600"
                        onClick={() => {
                          const tabs = document.querySelector('[value="scholarships"]') as HTMLElement;
                          tabs?.click();
                        }}
                      >
                        View All
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          {/* Scholarships Tab */}
          <TabsContent value="scholarships" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <h3 className="text-2xl font-bold gradient-text mb-2">
                Scholarship Opportunities
              </h3>
              <p className="text-muted-foreground">
                Explore financial aid and merit-based scholarships to support your education
              </p>
            </motion.div>

            {/* Scholarship Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Available', count: availableScholarships.filter(s => s.status === 'eligible').length, color: 'from-green-500 to-emerald-600', icon: Award },
                { label: 'Applied', count: availableScholarships.filter(s => s.status === 'applied').length, color: 'from-blue-500 to-blue-600', icon: FileText },
                { label: 'Total Amount', count: '₹2,80,000', color: 'from-yellow-500 to-amber-600', icon: DollarSign },
                { label: 'Deadline Soon', count: availableScholarships.filter(s => {
                    const deadline = new Date(s.deadline);
                    const today = new Date();
                    const diffDays = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                    return diffDays <= 7 && diffDays > 0;
                  }).length, color: 'from-red-500 to-orange-600', icon: Clock }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="glass-morphism text-center">
                    <CardContent className="p-4">
                      <motion.div
                        className={`p-2 rounded-lg bg-gradient-to-r ${stat.color} text-white mx-auto w-fit mb-2`}
                        whileHover={{ scale: 1.1, rotate: 15 }}
                      >
                        <stat.icon className="h-4 w-4" />
                      </motion.div>
                      <p className="text-2xl font-bold">{stat.count}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Filter Options */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row gap-4 mb-6"
            >
              <Select value={scholarshipFilter} onValueChange={setScholarshipFilter}>
                <SelectTrigger className="w-48 glass-morphism">
                  <SelectValue placeholder="Filter scholarships" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Scholarships</SelectItem>
                  <SelectItem value="eligible">Eligible</SelectItem>
                  <SelectItem value="applied">Applied</SelectItem>
                  <SelectItem value="merit">Merit-Based</SelectItem>
                  <SelectItem value="need">Need-Based</SelectItem>
                  <SelectItem value="research">Research-Based</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>

            {/* Applied Scholarships Section */}
            {appliedScholarships.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <h4 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Your Applications</span>
                </h4>
                <div className="space-y-4">
                  {appliedScholarships.map((scholarship) => (
                    <Card key={scholarship.id} className="glass-morphism border-blue-200 dark:border-blue-800">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-semibold">{scholarship.title}</h5>
                            <p className="text-sm text-muted-foreground">Applied on {scholarship.appliedDate}</p>
                            <p className="text-lg font-bold text-green-600">{scholarship.amount}</p>
                          </div>
                          <div className="text-right">
                            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200">
                              {scholarship.statusText}
                            </Badge>
                            <p className="text-xs text-muted-foreground mt-2">{scholarship.nextStep}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Available Scholarships Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredScholarships.map((scholarship, index) => (
                <motion.div
                  key={scholarship.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ScholarshipCard 
                    scholarship={scholarship} 
                    onApply={handleScholarshipApply}
                  />
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Reminders Tab */}
          <TabsContent value="reminders" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-6"
            >
              <h3 className="text-2xl font-bold gradient-text mb-2">Upcoming Reminders</h3>
              <p className="text-muted-foreground">Stay on top of your appointments and commitments</p>
            </motion.div>

            <div className="space-y-4">
              {upcomingReminders.map((reminder, index) => (
                <motion.div
                  key={reminder.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ReminderCard reminder={reminder} />
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Emergency Tab */}
          <TabsContent value="emergency">
            <EmergencyAlertSystem />
          </TabsContent>

          {/* Peer Support Tab */}
          <TabsContent value="peer-support" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-6"
            >
              <h3 className="text-2xl font-bold gradient-text mb-2">Peer Support Community</h3>
              <p className="text-muted-foreground">Connect with fellow students for academic and emotional support</p>
            </motion.div>
            
            <PeerSupportChat />
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-6"
            >
              <h3 className="text-2xl font-bold gradient-text mb-2">Academic Performance</h3>
              <p className="text-muted-foreground">Track your progress and identify areas for improvement</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass-morphism">
                <CardHeader>
                  <CardTitle>Performance Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="attendance" stroke="#3b82f6" strokeWidth={3} />
                        <Line type="monotone" dataKey="grades" stroke="#10b981" strokeWidth={3} />
                        <Line type="monotone" dataKey="engagement" stroke="#8b5cf6" strokeWidth={3} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <Card className="glass-morphism">
                  <CardContent className="p-6">
                    <h4 className="font-semibold mb-4">Subject-wise Performance</h4>
                    <div className="space-y-3">
                      {[
                        { subject: 'Mathematics', score: 92, color: 'from-blue-500 to-blue-600' },
                        { subject: 'Physics', score: 85, color: 'from-green-500 to-green-600' },
                        { subject: 'Chemistry', score: 88, color: 'from-purple-500 to-purple-600' },
                        { subject: 'Computer Science', score: 94, color: 'from-pink-500 to-pink-600' }
                      ].map((subject) => (
                        <div key={subject.subject}>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{subject.subject}</span>
                            <span>{subject.score}%</span>
                          </div>
                          <Progress value={subject.score} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Wellness Tab */}
          <TabsContent value="wellness" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-6"
            >
              <h3 className="text-2xl font-bold gradient-text mb-2">Wellness Dashboard</h3>
              <p className="text-muted-foreground">Monitor your mental health and wellbeing</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass-morphism">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="h-5 w-5 text-pink-500" />
                    <span>Wellness Score</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadialBarChart data={[{ wellness: currentStats.wellness }]} innerRadius="60%" outerRadius="90%">
                          <RadialBar dataKey="wellness" fill="#ec4899" />
                        </RadialBarChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold">{currentStats.wellness}%</span>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200">
                      Good Mental Health
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-morphism">
                <CardHeader>
                  <CardTitle>Quick Wellness Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Schedule Counseling Session
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Heart className="h-4 w-4 mr-2" />
                    Join Wellness Chat
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Connect with Peers
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Brain className="h-4 w-4 mr-2" />
                    Mindfulness Exercises
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Modals */}
        <CounselingRequestModal 
          isOpen={showCounselingModal} 
          onClose={() => setShowCounselingModal(false)} 
        />
        
        <FeedbackModal 
          isOpen={showFeedbackModal} 
          onClose={() => setShowFeedbackModal(false)} 
        />

        <ScholarshipApplicationModal
          scholarship={selectedScholarship}
          isOpen={showScholarshipModal}
          onClose={() => {
            setShowScholarshipModal(false);
            setSelectedScholarship(null);
          }}
        />
      </div>
    </div>
  );
}