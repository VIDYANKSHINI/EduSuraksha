import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ScrollArea } from './ui/scroll-area';
import { 
  FileText, 
  Send, 
  MessageSquare, 
  Phone, 
  Download, 
  Calendar, 
  GraduationCap, 
  DollarSign,
  Clock,
  AlertTriangle,
  CheckCircle,
  X,
  Eye,
  Printer,
  Share,
  Smartphone,
  MessageCircle,
  Bell,
  Target,
  TrendingUp,
  TrendingDown,
  User,
  BookOpen
} from 'lucide-react';

interface Report {
  id: string;
  studentName: string;
  studentId: string;
  type: 'attendance' | 'academic' | 'behavior' | 'comprehensive';
  period: string;
  generatedDate: string;
  status: 'draft' | 'sent' | 'acknowledged';
  parentContact: string;
  urgency: 'low' | 'medium' | 'high';
  summary: string;
  data: any;
}

interface NotificationTemplate {
  id: string;
  name: string;
  type: 'sms' | 'whatsapp';
  template: string;
  category: 'attendance' | 'academic' | 'emergency' | 'general';
}

const mockReports: Report[] = [
  {
    id: '1',
    studentName: 'Aditya Yelmar',
    studentId: 'CS2023001',
    type: 'comprehensive',
    period: 'Monthly - February 2024',
    generatedDate: '2024-02-28',
    status: 'sent',
    parentContact: '+91-9876543210',
    urgency: 'high',
    summary: 'Declining attendance and academic performance. Immediate intervention required.',
    data: { attendance: 65, grades: 72, behavior: 'concerning' }
  },
  {
    id: '2',
    studentName: 'Siddhesh Waghmare',
    studentId: 'CS2023002',
    type: 'academic',
    period: 'Weekly - Feb 19-25, 2024',
    generatedDate: '2024-02-25',
    status: 'acknowledged',
    parentContact: '+91-9876543211',
    urgency: 'low',
    summary: 'Excellent academic performance. Continue current trajectory.',
    data: { attendance: 89, grades: 85, behavior: 'excellent' }
  }
];

const notificationTemplates: NotificationTemplate[] = [
  {
    id: '1',
    name: 'Attendance Alert',
    type: 'sms',
    template: 'Dear Parent, {studentName}\'s attendance is {percentage}% which is below the required 75%. Please ensure regular attendance. - EduCare AI',
    category: 'attendance'
  },
  {
    id: '2',
    name: 'Academic Concern',
    type: 'whatsapp',
    template: 'Hello! {studentName} needs academic support in {subject}. Current grade: {grade}%. Let\'s work together to improve. 📚',
    category: 'academic'
  },
  {
    id: '3',
    name: 'Emergency Alert',
    type: 'sms',
    template: 'URGENT: Please contact the school immediately regarding {studentName}. Emergency contact: {emergencyNumber}',
    category: 'emergency'
  }
];

// Report Generation Modal
const ReportGenerationModal = ({ isOpen, onClose, onGenerate }: any) => {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [reportType, setReportType] = useState('');
  const [period, setPeriod] = useState('');
  const [includeRecommendations, setIncludeRecommendations] = useState(true);

  const students = [
    { id: 'CS2023001', name: 'Aditya Yelmar' },
    { id: 'CS2023002', name: 'Siddhesh Waghmare' },
    { id: 'CS2023003', name: 'Aman Umre' },
  ];

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
            className="bg-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto glass-morphism border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-card/80 backdrop-blur-sm border-b border-white/10 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold gradient-text">Generate Student Report</h2>
                    <p className="text-sm text-muted-foreground">Create comprehensive reports for parent communication</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Select Student</Label>
                  <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose student..." />
                    </SelectTrigger>
                    <SelectContent>
                      {students.map((student) => (
                        <SelectItem key={student.id} value={student.id}>
                          {student.name} ({student.id})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Report Type</Label>
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select report type..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="attendance">Attendance Report</SelectItem>
                      <SelectItem value="academic">Academic Performance</SelectItem>
                      <SelectItem value="behavior">Behavior Assessment</SelectItem>
                      <SelectItem value="comprehensive">Comprehensive Report</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Report Period</Label>
                  <Select value={period} onValueChange={setPeriod}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select period..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Priority Level</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low Priority</SelectItem>
                      <SelectItem value="medium">Medium Priority</SelectItem>
                      <SelectItem value="high">High Priority</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Report Customization</Label>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    'Include Attendance Data',
                    'Include Academic Grades',
                    'Include Behavior Notes',
                    'Include Recommendations',
                    'Include Parent Action Items',
                    'Include Progress Charts'
                  ].map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id={`option-${index}`}
                        defaultChecked={true}
                        className="rounded border-gray-300"
                      />
                      <label htmlFor={`option-${index}`} className="text-sm">{option}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Additional Notes (Optional)</Label>
                <Textarea 
                  placeholder="Add any specific notes or observations for the parents..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  onClick={() => {
                    onGenerate({ selectedStudent, reportType, period });
                    onClose();
                  }}
                  disabled={!selectedStudent || !reportType || !period}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Notification Sending Modal
const NotificationModal = ({ isOpen, onClose, onSend }: any) => {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [messageType, setMessageType] = useState<'sms' | 'whatsapp'>('sms');
  const [recipients, setRecipients] = useState<string[]>([]);
  const [customMessage, setCustomMessage] = useState('');

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
            className="bg-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto glass-morphism border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-card/80 backdrop-blur-sm border-b border-white/10 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold gradient-text">Send Notification</h2>
                    <p className="text-sm text-muted-foreground">Send SMS or WhatsApp messages to parents</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex space-x-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant={messageType === 'sms' ? 'default' : 'outline'}
                    onClick={() => setMessageType('sms')}
                    className={messageType === 'sms' ? 'bg-gradient-to-r from-blue-500 to-blue-600' : ''}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    SMS
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant={messageType === 'whatsapp' ? 'default' : 'outline'}
                    onClick={() => setMessageType('whatsapp')}
                    className={messageType === 'whatsapp' ? 'bg-gradient-to-r from-green-500 to-green-600' : ''}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp
                  </Button>
                </motion.div>
              </div>

              <div className="space-y-2">
                <Label>Message Template</Label>
                <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a template..." />
                  </SelectTrigger>
                  <SelectContent>
                    {notificationTemplates
                      .filter(t => t.type === messageType)
                      .map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name} - {template.category}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Recipients</Label>
                <div className="space-y-2">
                  {mockReports.map((report) => (
                    <div key={report.id} className="flex items-center space-x-2 p-2 border rounded-lg">
                      <input 
                        type="checkbox" 
                        id={`recipient-${report.id}`}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setRecipients([...recipients, report.parentContact]);
                          } else {
                            setRecipients(recipients.filter(r => r !== report.parentContact));
                          }
                        }}
                      />
                      <label htmlFor={`recipient-${report.id}`} className="flex-1">
                        <div className="font-medium">{report.studentName}</div>
                        <div className="text-sm text-muted-foreground">{report.parentContact}</div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Message Content</Label>
                <Textarea 
                  value={customMessage || (selectedTemplate ? notificationTemplates.find(t => t.id === selectedTemplate)?.template : '')}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="Type your message here..."
                  className="min-h-[150px]"
                />
                <div className="text-xs text-muted-foreground">
                  Use placeholders: {'{studentName}'}, {'{percentage}'}, {'{subject}'}, {'{grade}'}
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button 
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                  onClick={() => {
                    onSend({ messageType, recipients, message: customMessage });
                    onClose();
                  }}
                  disabled={recipients.length === 0 || !customMessage}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send {messageType.toUpperCase()}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Main Component
export const ParentReportsSystem = () => {
  const [reports] = useState<Report[]>(mockReports);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200';
      case 'acknowledged': return 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200';
      case 'draft': return 'bg-gray-100 text-gray-800 dark:bg-gray-950 dark:text-gray-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-950 dark:text-gray-200';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-950 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold gradient-text">Parent Communication Center</h2>
          <p className="text-muted-foreground">Generate reports and send notifications to parents</p>
        </div>
        <div className="flex space-x-3">
          <Button
            onClick={() => setShowReportModal(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
          <Button
            onClick={() => setShowNotificationModal(true)}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
          >
            <Send className="h-4 w-4 mr-2" />
            Send Notification
          </Button>
        </div>
      </div>

      {/* Reports List */}
      <Card className="glass-morphism">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-blue-500" />
            <span>Recent Reports</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports.map((report, index) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                      <User className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{report.studentName}</h3>
                      <p className="text-sm text-muted-foreground">{report.period}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getUrgencyColor(report.urgency)}>
                      {report.urgency}
                    </Badge>
                    <Badge className={getStatusColor(report.status)}>
                      {report.status}
                    </Badge>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-3">{report.summary}</p>

                <div className="flex items-center justify-between">
                  <div className="flex space-x-4 text-sm">
                    <span className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{report.generatedDate}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Phone className="h-3 w-3" />
                      <span>{report.parentContact}</span>
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedReport(report)}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                    >
                      <Share className="h-3 w-3 mr-1" />
                      Resend
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <ReportGenerationModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        onGenerate={(data: any) => {
          console.log('Generating report:', data);
        }}
      />

      <NotificationModal
        isOpen={showNotificationModal}
        onClose={() => setShowNotificationModal(false)}
        onSend={(data: any) => {
          console.log('Sending notification:', data);
        }}
      />
    </div>
  );
};