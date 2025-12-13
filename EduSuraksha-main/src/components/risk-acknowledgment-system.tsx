import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  User, 
  Calendar, 
  MessageSquare, 
  FileText, 
  Phone, 
  Mail,
  X,
  Download,
  Star,
  TrendingDown,
  Target,
  Heart,
  BookOpen,
  DollarSign,
  Eye,
  Send,
  CheckSquare,
  AlertCircle,
  Info
} from 'lucide-react';

interface RiskAlert {
  id: string;
  studentName: string;
  studentId: string;
  riskLevel: 'high' | 'medium' | 'low';
  riskFactors: string[];
  description: string;
  recommendations: string[];
  sentDate: string;
  acknowledgedDate?: string;
  status: 'pending' | 'acknowledged' | 'action_taken';
  mentorName: string;
  parentResponse?: string;
  actionPlan?: string;
  followUpDate?: string;
  attendanceData: {
    current: number;
    target: number;
    trend: 'improving' | 'declining' | 'stable';
  };
  academicData: {
    currentGrade: number;
    previousGrade: number;
    subjects: { name: string; grade: number; concern: boolean }[];
  };
  financialData?: {
    feeStatus: 'paid' | 'pending' | 'partial';
    amount?: number;
    dueDate?: string;
  };
}

const mockRiskAlerts: RiskAlert[] = [
  {
    id: '1',
    studentName: 'Aditya Yelmar',
    studentId: 'CS2023001',
    riskLevel: 'high',
    riskFactors: ['Low Attendance (65%)', 'Declining Grades', 'Pending Fees'],
    description: 'Aditya has shown concerning patterns in multiple areas. His attendance has dropped significantly this semester, and his academic performance is declining. There are also pending fee payments that may be affecting his enrollment status.',
    recommendations: [
      'Schedule immediate parent-teacher conference',
      'Provide academic tutoring support',
      'Create attendance monitoring plan',
      'Discuss fee payment options',
      'Consider counseling sessions'
    ],
    sentDate: '2024-02-28T10:00:00Z',
    status: 'pending',
    mentorName: 'Dr. Sarah Wilson',
    attendanceData: {
      current: 65,
      target: 75,
      trend: 'declining'
    },
    academicData: {
      currentGrade: 72,
      previousGrade: 78,
      subjects: [
        { name: 'Mathematics', grade: 68, concern: true },
        { name: 'Physics', grade: 75, concern: false },
        { name: 'Chemistry', grade: 70, concern: true },
        { name: 'English', grade: 76, concern: false }
      ]
    },
    financialData: {
      feeStatus: 'pending',
      amount: 25000,
      dueDate: '2024-03-15'
    }
  },
  {
    id: '2',
    studentName: 'Shravani Tanksale',
    studentId: 'CS2023005',
    riskLevel: 'high',
    riskFactors: ['Very Low Attendance (58%)', 'Poor Academic Performance'],
    description: 'Shravani requires immediate attention. Her attendance is critically low and academic performance has significantly declined.',
    recommendations: [
      'Urgent parent meeting required',
      'Academic intervention plan',
      'Attendance improvement strategy',
      'Mental health assessment'
    ],
    sentDate: '2024-02-27T14:30:00Z',
    acknowledgedDate: '2024-02-28T09:15:00Z',
    status: 'acknowledged',
    mentorName: 'Dr. Sarah Wilson',
    parentResponse: 'We acknowledge the concerns and are committed to working with the school to improve Shravani\'s performance.',
    attendanceData: {
      current: 58,
      target: 75,
      trend: 'declining'
    },
    academicData: {
      currentGrade: 61,
      previousGrade: 68,
      subjects: [
        { name: 'Mathematics', grade: 58, concern: true },
        { name: 'Physics', grade: 62, concern: true },
        { name: 'Chemistry', grade: 60, concern: true },
        { name: 'English', grade: 64, concern: true }
      ]
    }
  }
];

// Risk Alert Detail Modal
const RiskAlertDetailModal = ({ alert, isOpen, onClose, onAcknowledge }: any) => {
  const [acknowledgmentText, setAcknowledgmentText] = useState('');
  const [actionPlan, setActionPlan] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'from-red-500 to-orange-500';
      case 'medium': return 'from-yellow-500 to-orange-500';
      case 'low': return 'from-green-500 to-emerald-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const handleAcknowledge = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onAcknowledge({
      alertId: alert.id,
      response: acknowledgmentText,
      actionPlan,
      followUpDate,
      acknowledgedDate: new Date().toISOString()
    });
    
    setIsSubmitting(false);
    onClose();
  };

  if (!alert) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            className="bg-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto glass-morphism border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-card/80 backdrop-blur-sm border-b border-white/10 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${getRiskColor(alert.riskLevel)} text-white`}>
                    <AlertTriangle className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold gradient-text">Risk Assessment Alert</h2>
                    <p className="text-muted-foreground">Detailed report for {alert.studentName}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className={`bg-gradient-to-r ${getRiskColor(alert.riskLevel)} text-white`}>
                    {alert.riskLevel.toUpperCase()} RISK
                  </Badge>
                  <Button variant="ghost" size="sm" onClick={onClose}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Student Information */}
              <Card className="glass-morphism">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-blue-500" />
                    <span>Student Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-lg">{alert.studentName}</h3>
                        <p className="text-muted-foreground">Student ID: {alert.studentId}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Report sent by:</p>
                        <p className="font-medium">{alert.mentorName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Date sent:</p>
                        <p className="font-medium">{new Date(alert.sentDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Status:</p>
                        <Badge className={
                          alert.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200' :
                          alert.status === 'acknowledged' ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200' :
                          'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200'
                        }>
                          {alert.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </div>
                      {alert.acknowledgedDate && (
                        <div>
                          <p className="text-sm text-muted-foreground">Acknowledged on:</p>
                          <p className="font-medium">{new Date(alert.acknowledgedDate).toLocaleDateString()}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Risk Factors */}
              <Card className="glass-morphism">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                    <span>Risk Factors Identified</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {alert.riskFactors.map((factor: string, index: number) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                        <AlertCircle className="h-4 w-4 text-orange-500" />
                        <span>{factor}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Detailed Analysis */}
              <div className="grid md:grid-cols-3 gap-6">
                {/* Attendance Analysis */}
                <Card className="glass-morphism">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-blue-600">
                      <Calendar className="h-4 w-4" />
                      <span>Attendance</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>Current:</span>
                        <span className="font-bold text-lg">{alert.attendanceData.current}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Target:</span>
                        <span className="text-muted-foreground">{alert.attendanceData.target}%</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span>Trend:</span>
                        <div className="flex items-center space-x-1">
                          {alert.attendanceData.trend === 'declining' ? (
                            <TrendingDown className="h-4 w-4 text-red-500" />
                          ) : (
                            <span className="text-muted-foreground">stable</span>
                          )}
                          <span className={
                            alert.attendanceData.trend === 'declining' ? 'text-red-500' : 'text-muted-foreground'
                          }>
                            {alert.attendanceData.trend}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Academic Analysis */}
                <Card className="glass-morphism">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-purple-600">
                      <BookOpen className="h-4 w-4" />
                      <span>Academic</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>Current Grade:</span>
                        <span className="font-bold text-lg">{alert.academicData.currentGrade}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Previous:</span>
                        <span className="text-muted-foreground">{alert.academicData.previousGrade}%</span>
                      </div>
                      <div className="space-y-1">
                        {alert.academicData.subjects.map((subject, index) => (
                          <div key={index} className="flex justify-between items-center text-sm">
                            <span className={subject.concern ? 'text-red-600' : ''}>{subject.name}:</span>
                            <span className={subject.concern ? 'text-red-600 font-medium' : ''}>{subject.grade}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Financial Analysis */}
                {alert.financialData && (
                  <Card className="glass-morphism">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 text-green-600">
                        <DollarSign className="h-4 w-4" />
                        <span>Financial</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span>Fee Status:</span>
                          <Badge className={
                            alert.financialData.feeStatus === 'pending' ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200' :
                            alert.financialData.feeStatus === 'partial' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200' :
                            'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200'
                          }>
                            {alert.financialData.feeStatus}
                          </Badge>
                        </div>
                        {alert.financialData.amount && (
                          <div className="flex justify-between items-center">
                            <span>Amount:</span>
                            <span className="font-medium">₹{alert.financialData.amount.toLocaleString()}</span>
                          </div>
                        )}
                        {alert.financialData.dueDate && (
                          <div className="flex justify-between items-center">
                            <span>Due Date:</span>
                            <span className="text-red-600">{new Date(alert.financialData.dueDate).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Description */}
              <Card className="glass-morphism">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-gray-600" />
                    <span>Detailed Description</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{alert.description}</p>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card className="glass-morphism">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5 text-green-600" />
                    <span>Recommended Actions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {alert.recommendations.map((recommendation: string, index: number) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                        <CheckSquare className="h-4 w-4 text-green-600 mt-0.5" />
                        <span>{recommendation}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Previous Response (if acknowledged) */}
              {alert.parentResponse && (
                <Card className="glass-morphism border-blue-200 dark:border-blue-800">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MessageSquare className="h-5 w-5 text-blue-600" />
                      <span>Your Previous Response</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{alert.parentResponse}</p>
                  </CardContent>
                </Card>
              )}

              {/* Acknowledgment Form (if not acknowledged) */}
              {alert.status === 'pending' && (
                <Card className="glass-morphism border-green-200 dark:border-green-800">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Acknowledge Risk Alert</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Your Response *</Label>
                      <Textarea
                        placeholder="Please acknowledge that you have reviewed this risk alert and provide your response..."
                        value={acknowledgmentText}
                        onChange={(e) => setAcknowledgmentText(e.target.value)}
                        className="min-h-[100px]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Action Plan (Optional)</Label>
                      <Textarea
                        placeholder="Describe what actions you plan to take to address these concerns..."
                        value={actionPlan}
                        onChange={(e) => setActionPlan(e.target.value)}
                        className="min-h-[80px]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Follow-up Meeting Date (Optional)</Label>
                      <Input
                        type="date"
                        value={followUpDate}
                        onChange={(e) => setFollowUpDate(e.target.value)}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <label htmlFor="terms" className="text-sm">
                        I acknowledge that I have read and understood this risk assessment
                      </label>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4 border-t">
                      <Button variant="outline" onClick={onClose}>
                        Review Later
                      </Button>
                      <Button
                        onClick={handleAcknowledge}
                        disabled={!acknowledgmentText.trim() || isSubmitting}
                        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                      >
                        {isSubmitting ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="h-4 w-4 mr-2"
                          >
                            <Clock className="h-4 w-4" />
                          </motion.div>
                        ) : (
                          <CheckCircle className="h-4 w-4 mr-2" />
                        )}
                        {isSubmitting ? 'Submitting...' : 'Acknowledge Alert'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Main Risk Acknowledgment System Component
export const RiskAcknowledgmentSystem = () => {
  const [alerts, setAlerts] = useState<RiskAlert[]>(mockRiskAlerts);
  const [selectedAlert, setSelectedAlert] = useState<RiskAlert | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const handleAcknowledge = (acknowledgmentData: any) => {
    setAlerts(alerts.map(alert => 
      alert.id === acknowledgmentData.alertId 
        ? { 
            ...alert, 
            status: 'acknowledged',
            acknowledgedDate: acknowledgmentData.acknowledgedDate,
            parentResponse: acknowledgmentData.response,
            actionPlan: acknowledgmentData.actionPlan,
            followUpDate: acknowledgmentData.followUpDate
          }
        : alert
    ));
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'from-red-500 to-orange-500';
      case 'medium': return 'from-yellow-500 to-orange-500';
      case 'low': return 'from-green-500 to-emerald-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200';
      case 'acknowledged': return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200';
      case 'action_taken': return 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-950 dark:text-gray-200';
    }
  };

  const pendingAlerts = alerts.filter(alert => alert.status === 'pending');
  const acknowledgedAlerts = alerts.filter(alert => alert.status !== 'pending');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold gradient-text mb-2">Risk Assessment Alerts</h2>
        <p className="text-muted-foreground">
          Review and acknowledge important notifications about your child's academic progress
        </p>
      </div>

      {/* Pending Alerts */}
      {pendingAlerts.length > 0 && (
        <Card className="glass-morphism border-red-200 dark:border-red-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <span>Requires Your Attention</span>
              <Badge className="bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200">
                {pendingAlerts.length} pending
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingAlerts.map((alert, index) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-950/20"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${getRiskColor(alert.riskLevel)} text-white`}>
                        <User className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{alert.studentName}</h3>
                        <p className="text-sm text-muted-foreground">Sent by {alert.mentorName}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={`bg-gradient-to-r ${getRiskColor(alert.riskLevel)} text-white`}>
                        {alert.riskLevel.toUpperCase()}
                      </Badge>
                      <Badge className={getStatusColor(alert.status)}>
                        Action Required
                      </Badge>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex flex-wrap gap-2">
                      {alert.riskFactors.slice(0, 3).map((factor, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {factor}
                        </Badge>
                      ))}
                      {alert.riskFactors.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{alert.riskFactors.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(alert.sentDate).toLocaleDateString()}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>Urgent response needed</span>
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedAlert(alert);
                          setShowDetailModal(true);
                        }}
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        Review
                      </Button>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                        onClick={() => {
                          setSelectedAlert(alert);
                          setShowDetailModal(true);
                        }}
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Acknowledge
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Acknowledged Alerts */}
      {acknowledgedAlerts.length > 0 && (
        <Card className="glass-morphism">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Previously Acknowledged</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {acknowledgedAlerts.map((alert, index) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${getRiskColor(alert.riskLevel)} text-white`}>
                        <User className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{alert.studentName}</h3>
                        <p className="text-sm text-muted-foreground">
                          Acknowledged on {alert.acknowledgedDate && new Date(alert.acknowledgedDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(alert.status)}>
                        {alert.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </div>
                  </div>

                  {alert.parentResponse && (
                    <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                      <p className="text-sm italic">"{alert.parentResponse}"</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(alert.sentDate).toLocaleDateString()}</span>
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedAlert(alert);
                        setShowDetailModal(true);
                      }}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View Details
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* No Alerts Message */}
      {alerts.length === 0 && (
        <Card className="glass-morphism">
          <CardContent className="text-center py-12">
            <CheckCircle className="h-16 w-16 mx-auto text-green-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Risk Alerts</h3>
            <p className="text-muted-foreground">
              Great news! There are currently no risk assessment alerts for your child.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Detail Modal */}
      <RiskAlertDetailModal
        alert={selectedAlert}
        isOpen={showDetailModal}
        onClose={() => {
          setShowDetailModal(false);
          setSelectedAlert(null);
        }}
        onAcknowledge={handleAcknowledge}
      />
    </div>
  );
};