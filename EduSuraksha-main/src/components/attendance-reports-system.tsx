import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar as CalendarComponent } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Calendar, 
  Download, 
  FileText, 
  User, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Filter,
  CalendarDays,
  BarChart3,
  PieChart as PieChartIcon,
  Target,
  Award,
  Eye,
  Printer,
  Send,
  RefreshCw,
  Activity,
  Users,
  BookOpen
} from 'lucide-react';
import { format } from 'date-fns';

interface AttendanceRecord {
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  subject?: string;
  period?: number;
  remarks?: string;
}

interface StudentAttendance {
  studentId: string;
  studentName: string;
  className: string;
  totalDays: number;
  presentDays: number;
  absentDays: number;
  lateDays: number;
  excusedDays: number;
  percentage: number;
  trend: 'improving' | 'declining' | 'stable';
  records: AttendanceRecord[];
  monthlyData: { month: string; percentage: number; total: number; present: number }[];
  subjectWise?: { subject: string; percentage: number; total: number; present: number }[];
}

const mockAttendanceData: StudentAttendance[] = [
  {
    studentId: 'CS2023001',
    studentName: 'Aditya Yelmar',
    className: 'Computer Science - 2nd Year',
    totalDays: 120,
    presentDays: 78,
    absentDays: 30,
    lateDays: 8,
    excusedDays: 4,
    percentage: 65,
    trend: 'declining',
    records: [
      { date: '2024-02-29', status: 'absent', subject: 'Mathematics', period: 1 },
      { date: '2024-02-28', status: 'present', subject: 'Physics', period: 2 },
      { date: '2024-02-27', status: 'late', subject: 'Chemistry', period: 3, remarks: 'Traffic delay' },
      { date: '2024-02-26', status: 'present', subject: 'English', period: 1 },
      { date: '2024-02-25', status: 'absent', subject: 'Mathematics', period: 2 },
    ],
    monthlyData: [
      { month: 'Sep', percentage: 75, total: 20, present: 15 },
      { month: 'Oct', percentage: 68, total: 22, present: 15 },
      { month: 'Nov', percentage: 60, total: 21, present: 13 },
      { month: 'Dec', percentage: 58, total: 19, present: 11 },
      { month: 'Jan', percentage: 62, total: 23, present: 14 },
      { month: 'Feb', percentage: 65, total: 20, present: 13 },
    ],
    subjectWise: [
      { subject: 'Mathematics', percentage: 58, total: 24, present: 14 },
      { subject: 'Physics', percentage: 70, total: 20, present: 14 },
      { subject: 'Chemistry', percentage: 65, total: 23, present: 15 },
      { subject: 'English', percentage: 72, total: 25, present: 18 },
      { subject: 'Computer Science', percentage: 68, total: 22, present: 15 },
    ]
  },
  {
    studentId: 'CS2023002',
    studentName: 'Siddhesh Waghmare',
    className: 'Computer Science - 2nd Year',
    totalDays: 120,
    presentDays: 107,
    absentDays: 8,
    lateDays: 3,
    excusedDays: 2,
    percentage: 89,
    trend: 'stable',
    records: [
      { date: '2024-02-29', status: 'present', subject: 'Mathematics', period: 1 },
      { date: '2024-02-28', status: 'present', subject: 'Physics', period: 2 },
      { date: '2024-02-27', status: 'present', subject: 'Chemistry', period: 3 },
      { date: '2024-02-26', status: 'present', subject: 'English', period: 1 },
      { date: '2024-02-25', status: 'present', subject: 'Mathematics', period: 2 },
    ],
    monthlyData: [
      { month: 'Sep', percentage: 90, total: 20, present: 18 },
      { month: 'Oct', percentage: 86, total: 22, present: 19 },
      { month: 'Nov', percentage: 88, total: 21, present: 18 },
      { month: 'Dec', percentage: 90, total: 19, present: 17 },
      { month: 'Jan', percentage: 91, total: 23, present: 21 },
      { month: 'Feb', percentage: 89, total: 20, present: 18 },
    ],
    subjectWise: [
      { subject: 'Mathematics', percentage: 92, total: 24, present: 22 },
      { subject: 'Physics', percentage: 85, total: 20, present: 17 },
      { subject: 'Chemistry', percentage: 87, total: 23, present: 20 },
      { subject: 'English', percentage: 88, total: 25, present: 22 },
      { subject: 'Computer Science', percentage: 91, total: 22, present: 20 },
    ]
  }
];

// Attendance Report Detail Modal
const AttendanceDetailModal = ({ student, isOpen, onClose }: any) => {
  const [viewMode, setViewMode] = useState<'daily' | 'monthly' | 'subject'>('daily');
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined
  });

  if (!student) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200';
      case 'absent': return 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200';
      case 'late': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200';
      case 'excused': return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-950 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'absent': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'late': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'excused': return <AlertTriangle className="h-4 w-4 text-blue-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const pieChartData = [
    { name: 'Present', value: student.presentDays, color: '#10b981' },
    { name: 'Absent', value: student.absentDays, color: '#ef4444' },
    { name: 'Late', value: student.lateDays, color: '#f59e0b' },
    { name: 'Excused', value: student.excusedDays, color: '#3b82f6' },
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
            className="bg-card rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto glass-morphism border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-card/80 backdrop-blur-sm border-b border-white/10 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold gradient-text">Attendance Report</h2>
                    <p className="text-muted-foreground">{student.studentName} - {student.className}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className={`${
                    student.percentage >= 75 ? 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200' :
                    student.percentage >= 60 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200' :
                    'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200'
                  }`}>
                    {student.percentage}% Attendance
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button variant="ghost" size="sm" onClick={onClose}>
                    ×
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Total Days', value: student.totalDays, icon: CalendarDays, color: 'from-blue-500 to-blue-600' },
                  { label: 'Present', value: student.presentDays, icon: CheckCircle, color: 'from-green-500 to-green-600' },
                  { label: 'Absent', value: student.absentDays, icon: XCircle, color: 'from-red-500 to-red-600' },
                  { label: 'Late', value: student.lateDays, icon: Clock, color: 'from-yellow-500 to-yellow-600' },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="glass-morphism">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color} text-white`}>
                            <stat.icon className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-2xl font-bold">{stat.value}</p>
                            <p className="text-sm text-muted-foreground">{stat.label}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* View Mode Selector */}
              <div className="flex space-x-2">
                {[
                  { mode: 'daily', label: 'Daily Records', icon: Calendar },
                  { mode: 'monthly', label: 'Monthly Trends', icon: BarChart3 },
                  { mode: 'subject', label: 'Subject-wise', icon: BookOpen },
                ].map((tab) => (
                  <Button
                    key={tab.mode}
                    variant={viewMode === tab.mode ? 'default' : 'outline'}
                    onClick={() => setViewMode(tab.mode as any)}
                    className={viewMode === tab.mode ? 'bg-gradient-to-r from-blue-500 to-purple-600' : ''}
                  >
                    <tab.icon className="h-4 w-4 mr-2" />
                    {tab.label}
                  </Button>
                ))}
              </div>

              {/* Content based on view mode */}
              {viewMode === 'daily' && (
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Recent Records */}
                  <div className="lg:col-span-2">
                    <Card className="glass-morphism">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Calendar className="h-5 w-5 text-blue-500" />
                          <span>Recent Attendance Records</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {student.records.map((record: AttendanceRecord, index: number) => (
                            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex items-center space-x-3">
                                {getStatusIcon(record.status)}
                                <div>
                                  <p className="font-medium">{format(new Date(record.date), 'PPP')}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {record.subject} - Period {record.period}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <Badge className={getStatusColor(record.status)}>
                                  {record.status}
                                </Badge>
                                {record.remarks && (
                                  <p className="text-xs text-muted-foreground mt-1">{record.remarks}</p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Attendance Distribution */}
                  <div>
                    <Card className="glass-morphism">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <PieChartIcon className="h-5 w-5 text-purple-500" />
                          <span>Distribution</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={pieChartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={40}
                                outerRadius={80}
                                dataKey="value"
                              >
                                {pieChartData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <Tooltip />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-4">
                          {pieChartData.map((item, index) => (
                            <div key={index} className="flex items-center space-x-2 text-sm">
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: item.color }}
                              />
                              <span>{item.name}: {item.value}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {viewMode === 'monthly' && (
                <Card className="glass-morphism">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BarChart3 className="h-5 w-5 text-blue-500" />
                      <span>Monthly Attendance Trends</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={student.monthlyData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip 
                            content={({ active, payload, label }) => {
                              if (active && payload && payload.length) {
                                const data = payload[0].payload;
                                return (
                                  <div className="bg-card p-3 border rounded-lg shadow-lg">
                                    <p className="font-medium">{label}</p>
                                    <p className="text-blue-600">Attendance: {data.percentage}%</p>
                                    <p className="text-sm text-muted-foreground">
                                      Present: {data.present}/{data.total} days
                                    </p>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                          <Area
                            type="monotone"
                            dataKey="percentage"
                            stroke="#3b82f6"
                            fill="#3b82f6"
                            fillOpacity={0.3}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              )}

              {viewMode === 'subject' && (
                <Card className="glass-morphism">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BookOpen className="h-5 w-5 text-green-500" />
                      <span>Subject-wise Attendance</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {student.subjectWise?.map((subject: any, index: number) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">{subject.subject}</h3>
                            <Badge className={`${
                              subject.percentage >= 75 ? 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200' :
                              subject.percentage >= 60 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200' :
                              'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200'
                            }`}>
                              {subject.percentage}%
                            </Badge>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                subject.percentage >= 75 ? 'bg-green-500' :
                                subject.percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${subject.percentage}%` }}
                            />
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Present: {subject.present}/{subject.total} classes
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-4 border-t">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Printer className="h-4 w-4 mr-2" />
                    Print Report
                  </Button>
                  <Button variant="outline" size="sm">
                    <Send className="h-4 w-4 mr-2" />
                    Email Report
                  </Button>
                </div>
                <Button onClick={onClose}>
                  Close
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Main Attendance Reports System Component
export const AttendanceReportsSystem = () => {
  const [selectedStudent, setSelectedStudent] = useState<StudentAttendance | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const filteredStudents = mockAttendanceData.filter(student => {
    const matchesSearch = student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = filterClass === 'all' || student.className.includes(filterClass);
    return matchesSearch && matchesClass;
  });

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    switch (sortBy) {
      case 'name': return a.studentName.localeCompare(b.studentName);
      case 'attendance': return b.percentage - a.percentage;
      case 'class': return a.className.localeCompare(b.className);
      default: return 0;
    }
  });

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 75) return 'from-green-500 to-green-600';
    if (percentage >= 60) return 'from-yellow-500 to-yellow-600';
    return 'from-red-500 to-red-600';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'declining': return <TrendingDown className="h-4 w-4 text-red-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  // Calculate overall statistics
  const overallStats = {
    totalStudents: mockAttendanceData.length,
    averageAttendance: Math.round(mockAttendanceData.reduce((acc, student) => acc + student.percentage, 0) / mockAttendanceData.length),
    aboveTarget: mockAttendanceData.filter(student => student.percentage >= 75).length,
    belowTarget: mockAttendanceData.filter(student => student.percentage < 75).length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold gradient-text mb-2">Student Attendance Reports</h2>
        <p className="text-muted-foreground">
          Comprehensive attendance tracking and analysis for all students
        </p>
      </div>

      {/* Overall Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Students', value: overallStats.totalStudents, icon: Users, color: 'from-blue-500 to-blue-600' },
          { label: 'Average Attendance', value: `${overallStats.averageAttendance}%`, icon: Target, color: 'from-green-500 to-green-600' },
          { label: 'Above Target (75%)', value: overallStats.aboveTarget, icon: Award, color: 'from-purple-500 to-purple-600' },
          { label: 'Below Target', value: overallStats.belowTarget, icon: AlertTriangle, color: 'from-red-500 to-red-600' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass-morphism">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color} text-white`}>
                    <stat.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filters and Search */}
      <Card className="glass-morphism">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-blue-500" />
            <span>Filter and Search</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Search Student</Label>
              <Input
                placeholder="Search by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Filter by Class</Label>
              <Select value={filterClass} onValueChange={setFilterClass}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Sort by</Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Student Name</SelectItem>
                  <SelectItem value="attendance">Attendance %</SelectItem>
                  <SelectItem value="class">Class</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Actions</Label>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Student List */}
      <Card className="glass-morphism">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-green-500" />
            <span>Student Attendance Records</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sortedStudents.map((student, index) => (
              <motion.div
                key={student.studentId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${getAttendanceColor(student.percentage)} text-white`}>
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{student.studentName}</h3>
                      <p className="text-sm text-muted-foreground">{student.studentId} • {student.className}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold">{student.percentage}%</span>
                        {getTrendIcon(student.trend)}
                      </div>
                      <p className="text-sm text-muted-foreground">{student.presentDays}/{student.totalDays} days</p>
                    </div>
                    <Badge className={`${
                      student.percentage >= 75 ? 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200' :
                      student.percentage >= 60 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200' :
                      'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200'
                    }`}>
                      {student.percentage >= 75 ? 'Good' : student.percentage >= 60 ? 'Average' : 'Poor'}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-3">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Present</p>
                    <p className="font-semibold text-green-600">{student.presentDays}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Absent</p>
                    <p className="font-semibold text-red-600">{student.absentDays}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Late</p>
                    <p className="font-semibold text-yellow-600">{student.lateDays}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Excused</p>
                    <p className="font-semibold text-blue-600">{student.excusedDays}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-4">
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r ${getAttendanceColor(student.percentage)}`}
                      style={{ width: `${student.percentage}%` }}
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedStudent(student);
                      setShowDetailModal(true);
                    }}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detail Modal */}
      <AttendanceDetailModal
        student={selectedStudent}
        isOpen={showDetailModal}
        onClose={() => {
          setShowDetailModal(false);
          setSelectedStudent(null);
        }}
      />
    </div>
  );
};