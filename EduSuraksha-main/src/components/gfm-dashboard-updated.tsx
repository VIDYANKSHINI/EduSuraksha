import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ScrollArea } from "./ui/scroll-area";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar";
import {
  Upload,
  FileSpreadsheet,
  Users,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  XCircle,
  Eye,
  Download,
  RefreshCw,
  Plus,
  Edit,
  Trash2,
  BookOpen,
  Calendar,
  DollarSign,
  GraduationCap,
  Target,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Brain,
  Heart,
  UserPlus,
  FileText,
  Save,
  X,
  Check,
  AlertCircle,
  Clock,
  Star,
  Filter,
  Settings,
  Search,
  Phone,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Cell,
} from "recharts";
import { AttendanceUploadModal, MarksUploadModal, FeesUploadModal } from "./data-upload-modals";

// Mock data for GFM Dashboard
const classData = {
  className: "Computer Science - 2nd Year (Section A)",
  totalStudents: 42,
  activeStudents: 39,
  atRiskStudents: 8,
  averageAttendance: 78.5,
  averageGrades: 74.2,
  pendingFees: 6,
};

const studentData = [
  {
    id: 1,
    name: "Aditya yelmar",
    rollNo: "CS2023001",
    attendance: 65,
    attendanceTrend: "down",
    grades: 72,
    gradesTrend: "down",
    fees: "Pending",
    riskLevel: "high",
    lastUpdate: "2 days ago",
    contact: "+91-9876543210",
    email: "aditya@example.com",
    subjects: {
      math: 68,
      physics: 75,
      chemistry: 70,
      english: 76,
    },
  },
  {
    id: 2,
    name: "Siddhesh waghmare",
    rollNo: "CS2023002",
    attendance: 89,
    attendanceTrend: "stable",
    grades: 85,
    gradesTrend: "up",
    fees: "Paid",
    riskLevel: "safe",
    lastUpdate: "1 hour ago",
    contact: "+91-9876543211",
    email: "siddhesh@example.com",
    subjects: {
      math: 88,
      physics: 82,
      chemistry: 85,
      english: 87,
    },
  },
  {
    id: 3,
    name: "Aman umre",
    rollNo: "CS2023003",
    attendance: 82,
    attendanceTrend: "up",
    grades: 79,
    gradesTrend: "up",
    fees: "Paid",
    riskLevel: "safe",
    lastUpdate: "30 min ago",
    contact: "+91-9876543212",
    email: "aman@example.com",
    subjects: {
      math: 82,
      physics: 78,
      chemistry: 77,
      english: 80,
    },
  },
  {
    id: 4,
    name: "sujal singh",
    rollNo: "CS2023004",
    attendance: 71,
    attendanceTrend: "down",
    grades: 68,
    gradesTrend: "stable",
    fees: "Partial",
    riskLevel: "medium",
    lastUpdate: "3 hours ago",
    contact: "+91-9876543213",
    email: "sujal@example.com",
    subjects: {
      math: 65,
      physics: 70,
      chemistry: 68,
      english: 69,
    },
  },
  {
    id: 5,
    name: "shravani tanksale",
    rollNo: "CS2023005",
    attendance: 58,
    attendanceTrend: "down",
    grades: 61,
    gradesTrend: "down",
    fees: "Pending",
    riskLevel: "high",
    lastUpdate: "1 day ago",
    contact: "+91-9876543214",
    email: "shravani@example.com",
    subjects: {
      math: 58,
      physics: 62,
      chemistry: 60,
      english: 64,
    },
  },
  // Continue with the rest of the 42 students...
  {
    id: 6,
    name: "Rahul Sharma",
    rollNo: "CS2023006",
    attendance: 92,
    attendanceTrend: "up",
    grades: 88,
    gradesTrend: "up",
    fees: "Paid",
    riskLevel: "safe",
    lastUpdate: "2 hours ago",
    contact: "+91-9876543215",
    email: "rahul@example.com",
    subjects: {
      math: 90,
      physics: 86,
      chemistry: 89,
      english: 87,
    },
  },
  {
    id: 7,
    name: "Priya Patel",
    rollNo: "CS2023007",
    attendance: 76,
    attendanceTrend: "stable",
    grades: 73,
    gradesTrend: "up",
    fees: "Paid",
    riskLevel: "medium",
    lastUpdate: "4 hours ago",
    contact: "+91-9876543216",
    email: "priya@example.com",
    subjects: {
      math: 75,
      physics: 71,
      chemistry: 73,
      english: 74,
    },
  },
  {
    id: 8,
    name: "Arjun Kumar",
    rollNo: "CS2023008",
    attendance: 84,
    attendanceTrend: "up",
    grades: 81,
    gradesTrend: "stable",
    fees: "Paid",
    riskLevel: "safe",
    lastUpdate: "1 hour ago",
    contact: "+91-9876543217",
    email: "arjun@example.com",
    subjects: {
      math: 83,
      physics: 79,
      chemistry: 82,
      english: 80,
    },
  },
  {
    id: 9,
    name: "Sneha Gupta",
    rollNo: "CS2023009",
    attendance: 69,
    attendanceTrend: "down",
    grades: 66,
    gradesTrend: "down",
    fees: "Pending",
    riskLevel: "medium",
    lastUpdate: "3 hours ago",
    contact: "+91-9876543218",
    email: "sneha@example.com",
    subjects: {
      math: 64,
      physics: 68,
      chemistry: 65,
      english: 67,
    },
  },
  {
    id: 10,
    name: "Vikram Joshi",
    rollNo: "CS2023010",
    attendance: 78,
    attendanceTrend: "stable",
    grades: 75,
    gradesTrend: "up",
    fees: "Paid",
    riskLevel: "safe",
    lastUpdate: "2 hours ago",
    contact: "+91-9876543219",
    email: "vikram@example.com",
    subjects: {
      math: 77,
      physics: 73,
      chemistry: 76,
      english: 74,
    },
  },
  {
    id: 11,
    name: "Kavya Nair",
    rollNo: "CS2023011",
    attendance: 87,
    attendanceTrend: "up",
    grades: 83,
    gradesTrend: "up",
    fees: "Paid",
    riskLevel: "safe",
    lastUpdate: "1 hour ago",
    contact: "+91-9876543220",
    email: "kavya@example.com",
    subjects: {
      math: 85,
      physics: 81,
      chemistry: 84,
      english: 82,
    },
  },
  {
    id: 12,
    name: "Rohit Mehta",
    rollNo: "CS2023012",
    attendance: 63,
    attendanceTrend: "down",
    grades: 59,
    gradesTrend: "down",
    fees: "Pending",
    riskLevel: "high",
    lastUpdate: "5 hours ago",
    contact: "+91-9876543221",
    email: "rohit@example.com",
    subjects: {
      math: 57,
      physics: 61,
      chemistry: 58,
      english: 60,
    },
  },
  {
    id: 13,
    name: "Ananya Singh",
    rollNo: "CS2023013",
    attendance: 91,
    attendanceTrend: "stable",
    grades: 89,
    gradesTrend: "up",
    fees: "Paid",
    riskLevel: "safe",
    lastUpdate: "30 min ago",
    contact: "+91-9876543222",
    email: "ananya@example.com",
    subjects: {
      math: 91,
      physics: 87,
      chemistry: 90,
      english: 88,
    },
  },
  {
    id: 14,
    name: "Karan Malhotra",
    rollNo: "CS2023014",
    attendance: 74,
    attendanceTrend: "stable",
    grades: 71,
    gradesTrend: "stable",
    fees: "Partial",
    riskLevel: "medium",
    lastUpdate: "4 hours ago",
    contact: "+91-9876543223",
    email: "karan@example.com",
    subjects: {
      math: 69,
      physics: 73,
      chemistry: 70,
      english: 72,
    },
  },
  {
    id: 15,
    name: "Meera Reddy",
    rollNo: "CS2023015",
    attendance: 86,
    attendanceTrend: "up",
    grades: 82,
    gradesTrend: "up",
    fees: "Paid",
    riskLevel: "safe",
    lastUpdate: "2 hours ago",
    contact: "+91-9876543224",
    email: "meera@example.com",
    subjects: {
      math: 84,
      physics: 80,
      chemistry: 83,
      english: 81,
    },
  },
  {
    id: 16,
    name: "Deepak Yadav",
    rollNo: "CS2023016",
    attendance: 67,
    attendanceTrend: "down",
    grades: 64,
    gradesTrend: "down",
    fees: "Pending",
    riskLevel: "medium",
    lastUpdate: "6 hours ago",
    contact: "+91-9876543225",
    email: "deepak@example.com",
    subjects: {
      math: 62,
      physics: 66,
      chemistry: 63,
      english: 65,
    },
  },
  {
    id: 17,
    name: "Pooja Agarwal",
    rollNo: "CS2023017",
    attendance: 93,
    attendanceTrend: "up",
    grades: 90,
    gradesTrend: "up",
    fees: "Paid",
    riskLevel: "safe",
    lastUpdate: "1 hour ago",
    contact: "+91-9876543226",
    email: "pooja@example.com",
    subjects: {
      math: 92,
      physics: 88,
      chemistry: 91,
      english: 89,
    },
  },
  {
    id: 18,
    name: "Amit Verma",
    rollNo: "CS2023018",
    attendance: 79,
    attendanceTrend: "stable",
    grades: 76,
    gradesTrend: "up",
    fees: "Paid",
    riskLevel: "safe",
    lastUpdate: "3 hours ago",
    contact: "+91-9876543227",
    email: "amit@example.com",
    subjects: {
      math: 78,
      physics: 74,
      chemistry: 77,
      english: 75,
    },
  },
  {
    id: 19,
    name: "Nisha Kapoor",
    rollNo: "CS2023019",
    attendance: 72,
    attendanceTrend: "down",
    grades: 69,
    gradesTrend: "stable",
    fees: "Partial",
    riskLevel: "medium",
    lastUpdate: "4 hours ago",
    contact: "+91-9876543228",
    email: "nisha@example.com",
    subjects: {
      math: 67,
      physics: 71,
      chemistry: 68,
      english: 70,
    },
  },
  {
    id: 20,
    name: "Ravi Tiwari",
    rollNo: "CS2023020",
    attendance: 88,
    attendanceTrend: "up",
    grades: 85,
    gradesTrend: "up",
    fees: "Paid",
    riskLevel: "safe",
    lastUpdate: "2 hours ago",
    contact: "+91-9876543229",
    email: "ravi@example.com",
    subjects: {
      math: 87,
      physics: 83,
      chemistry: 86,
      english: 84,
    },
  },
  // Continue with remaining students to reach 42 total...
  {
    id: 21,
    name: "Divya Chandra",
    rollNo: "CS2023021",
    attendance: 81,
    attendanceTrend: "stable",
    grades: 78,
    gradesTrend: "up",
    fees: "Paid",
    riskLevel: "safe",
    lastUpdate: "1 hour ago",
    contact: "+91-9876543230",
    email: "divya@example.com",
    subjects: {
      math: 80,
      physics: 76,
      chemistry: 79,
      english: 77,
    },
  },
  {
    id: 22,
    name: "Gaurav Saxena",
    rollNo: "CS2023022",
    attendance: 64,
    attendanceTrend: "down",
    grades: 61,
    gradesTrend: "down",
    fees: "Pending",
    riskLevel: "medium",
    lastUpdate: "5 hours ago",
    contact: "+91-9876543231",
    email: "gaurav@example.com",
    subjects: {
      math: 59,
      physics: 63,
      chemistry: 60,
      english: 62,
    },
  },
  {
    id: 23,
    name: "Shruti Jain",
    rollNo: "CS2023023",
    attendance: 89,
    attendanceTrend: "up",
    grades: 86,
    gradesTrend: "up",
    fees: "Paid",
    riskLevel: "safe",
    lastUpdate: "30 min ago",
    contact: "+91-9876543232",
    email: "shruti@example.com",
    subjects: {
      math: 88,
      physics: 84,
      chemistry: 87,
      english: 85,
    },
  },
  {
    id: 24,
    name: "Akash Pandey",
    rollNo: "CS2023024",
    attendance: 75,
    attendanceTrend: "stable",
    grades: 72,
    gradesTrend: "stable",
    fees: "Paid",
    riskLevel: "safe",
    lastUpdate: "3 hours ago",
    contact: "+91-9876543233",
    email: "akash@example.com",
    subjects: {
      math: 74,
      physics: 70,
      chemistry: 73,
      english: 71,
    },
  },
  {
    id: 25,
    name: "Ritika Sinha",
    rollNo: "CS2023025",
    attendance: 70,
    attendanceTrend: "down",
    grades: 67,
    gradesTrend: "down",
    fees: "Partial",
    riskLevel: "medium",
    lastUpdate: "4 hours ago",
    contact: "+91-9876543234",
    email: "ritika@example.com",
    subjects: {
      math: 65,
      physics: 69,
      chemistry: 66,
      english: 68,
    },
  },
  {
    id: 26,
    name: "Harsh Agarwal",
    rollNo: "CS2023026",
    attendance: 85,
    attendanceTrend: "up",
    grades: 82,
    gradesTrend: "up",
    fees: "Paid",
    riskLevel: "safe",
    lastUpdate: "2 hours ago",
    contact: "+91-9876543235",
    email: "harsh@example.com",
    subjects: {
      math: 84,
      physics: 80,
      chemistry: 83,
      english: 81,
    },
  },
  {
    id: 27,
    name: "Sakshi Bansal",
    rollNo: "CS2023027",
    attendance: 77,
    attendanceTrend: "stable",
    grades: 74,
    gradesTrend: "up",
    fees: "Paid",
    riskLevel: "safe",
    lastUpdate: "1 hour ago",
    contact: "+91-9876543236",
    email: "sakshi@example.com",
    subjects: {
      math: 76,
      physics: 72,
      chemistry: 75,
      english: 73,
    },
  },
  {
    id: 28,
    name: "Varun Khanna",
    rollNo: "CS2023028",
    attendance: 66,
    attendanceTrend: "down",
    grades: 63,
    gradesTrend: "down",
    fees: "Pending",
    riskLevel: "medium",
    lastUpdate: "6 hours ago",
    contact: "+91-9876543237",
    email: "varun@example.com",
    subjects: {
      math: 61,
      physics: 65,
      chemistry: 62,
      english: 64,
    },
  },
  {
    id: 29,
    name: "Tanvi Goyal",
    rollNo: "CS2023029",
    attendance: 90,
    attendanceTrend: "up",
    grades: 87,
    gradesTrend: "up",
    fees: "Paid",
    riskLevel: "safe",
    lastUpdate: "45 min ago",
    contact: "+91-9876543238",
    email: "tanvi@example.com",
    subjects: {
      math: 89,
      physics: 85,
      chemistry: 88,
      english: 86,
    },
  },
  {
    id: 30,
    name: "Nikhil Dubey",
    rollNo: "CS2023030",
    attendance: 73,
    attendanceTrend: "stable",
    grades: 70,
    gradesTrend: "stable",
    fees: "Paid",
    riskLevel: "safe",
    lastUpdate: "3 hours ago",
    contact: "+91-9876543239",
    email: "nikhil@example.com",
    subjects: {
      math: 72,
      physics: 68,
      chemistry: 71,
      english: 69,
    },
  },
  {
    id: 31,
    name: "Ishita Mishra",
    rollNo: "CS2023031",
    attendance: 68,
    attendanceTrend: "down",
    grades: 65,
    gradesTrend: "down",
    fees: "Partial",
    riskLevel: "medium",
    lastUpdate: "5 hours ago",
    contact: "+91-9876543240",
    email: "ishita@example.com",
    subjects: {
      math: 63,
      physics: 67,
      chemistry: 64,
      english: 66,
    },
  },
  {
    id: 32,
    name: "Abhishek Roy",
    rollNo: "CS2023032",
    attendance: 83,
    attendanceTrend: "up",
    grades: 80,
    gradesTrend: "up",
    fees: "Paid",
    riskLevel: "safe",
    lastUpdate: "2 hours ago",
    contact: "+91-9876543241",
    email: "abhishek@example.com",
    subjects: {
      math: 82,
      physics: 78,
      chemistry: 81,
      english: 79,
    },
  },
  {
    id: 33,
    name: "Swati Bhatt",
    rollNo: "CS2023033",
    attendance: 94,
    attendanceTrend: "up",
    grades: 91,
    gradesTrend: "up",
    fees: "Paid",
    riskLevel: "safe",
    lastUpdate: "1 hour ago",
    contact: "+91-9876543242",
    email: "swati@example.com",
    subjects: {
      math: 93,
      physics: 89,
      chemistry: 92,
      english: 90,
    },
  },
  {
    id: 34,
    name: "Manish Kumar",
    rollNo: "CS2023034",
    attendance: 71,
    attendanceTrend: "stable",
    grades: 68,
    gradesTrend: "stable",
    fees: "Paid",
    riskLevel: "medium",
    lastUpdate: "4 hours ago",
    contact: "+91-9876543243",
    email: "manish@example.com",
    subjects: {
      math: 66,
      physics: 70,
      chemistry: 67,
      english: 69,
    },
  },
  {
    id: 35,
    name: "Aditi Sharma",
    rollNo: "CS2023035",
    attendance: 86,
    attendanceTrend: "up",
    grades: 83,
    gradesTrend: "up",
    fees: "Paid",
    riskLevel: "safe",
    lastUpdate: "2 hours ago",
    contact: "+91-9876543244",
    email: "aditi@example.com",
    subjects: {
      math: 85,
      physics: 81,
      chemistry: 84,
      english: 82,
    },
  },
  {
    id: 36,
    name: "Siddharth Bose",
    rollNo: "CS2023036",
    attendance: 76,
    attendanceTrend: "stable",
    grades: 73,
    gradesTrend: "up",
    fees: "Paid",
    riskLevel: "safe",
    lastUpdate: "3 hours ago",
    contact: "+91-9876543245",
    email: "siddharth@example.com",
    subjects: {
      math: 75,
      physics: 71,
      chemistry: 74,
      english: 72,
    },
  },
  {
    id: 37,
    name: "Pallavi Das",
    rollNo: "CS2023037",
    attendance: 62,
    attendanceTrend: "down",
    grades: 59,
    gradesTrend: "down",
    fees: "Pending",
    riskLevel: "high",
    lastUpdate: "7 hours ago",
    contact: "+91-9876543246",
    email: "pallavi@example.com",
    subjects: {
      math: 57,
      physics: 61,
      chemistry: 58,
      english: 60,
    },
  },
  {
    id: 38,
    name: "Yash Chopra",
    rollNo: "CS2023038",
    attendance: 80,
    attendanceTrend: "stable",
    grades: 77,
    gradesTrend: "up",
    fees: "Paid",
    riskLevel: "safe",
    lastUpdate: "2 hours ago",
    contact: "+91-9876543247",
    email: "yash@example.com",
    subjects: {
      math: 79,
      physics: 75,
      chemistry: 78,
      english: 76,
    },
  },
  {
    id: 39,
    name: "Neha Kulkarni",
    rollNo: "CS2023039",
    attendance: 87,
    attendanceTrend: "up",
    grades: 84,
    gradesTrend: "up",
    fees: "Paid",
    riskLevel: "safe",
    lastUpdate: "1 hour ago",
    contact: "+91-9876543248",
    email: "neha@example.com",
    subjects: {
      math: 86,
      physics: 82,
      chemistry: 85,
      english: 83,
    },
  },
  {
    id: 40,
    name: "Rohan Iyer",
    rollNo: "CS2023040",
    attendance: 69,
    attendanceTrend: "down",
    grades: 66,
    gradesTrend: "stable",
    fees: "Partial",
    riskLevel: "medium",
    lastUpdate: "5 hours ago",
    contact: "+91-9876543249",
    email: "rohan@example.com",
    subjects: {
      math: 64,
      physics: 68,
      chemistry: 65,
      english: 67,
    },
  },
  {
    id: 41,
    name: "Priyanka Shah",
    rollNo: "CS2023041",
    attendance: 92,
    attendanceTrend: "up",
    grades: 89,
    gradesTrend: "up",
    fees: "Paid",
    riskLevel: "safe",
    lastUpdate: "30 min ago",
    contact: "+91-9876543250",
    email: "priyanka@example.com",
    subjects: {
      math: 91,
      physics: 87,
      chemistry: 90,
      english: 88,
    },
  },
  {
    id: 42,
    name: "Aryan Ghosh",
    rollNo: "CS2023042",
    attendance: 74,
    attendanceTrend: "stable",
    grades: 71,
    gradesTrend: "up",
    fees: "Paid",
    riskLevel: "safe",
    lastUpdate: "3 hours ago",
    contact: "+91-9876543251",
    email: "aryan@example.com",
    subjects: {
      math: 73,
      physics: 69,
      chemistry: 72,
      english: 70,
    },
  },
];

const attendanceTrend = [
  { month: "Sep", attendance: 82 },
  { month: "Oct", attendance: 78 },
  { month: "Nov", attendance: 75 },
  { month: "Dec", attendance: 79 },
  { month: "Jan", attendance: 76 },
  { month: "Feb", attendance: 78 },
];

const gradeDistribution = [
  { grade: "A+", count: 5, color: "#10b981" },
  { grade: "A", count: 8, color: "#3b82f6" },
  { grade: "B+", count: 12, color: "#8b5cf6" },
  { grade: "B", count: 10, color: "#f59e0b" },
  { grade: "C+", count: 5, color: "#ef4444" },
  { grade: "C", count: 2, color: "#6b7280" },
];

// Modal to show pending fees students
const PendingFeesModal = ({ isOpen, onClose }: any) => {
  const pendingFeesStudents = studentData.filter(student => student.fees === 'Pending');

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
              <h2 className="text-xl font-semibold">
                Students with Pending Fees
              </h2>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              {pendingFeesStudents.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback className="bg-gradient-to-r from-red-500 to-orange-500 text-white">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">{student.rollNo}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="destructive">Pending</Badge>
                    <Button variant="outline" size="sm">
                      <Phone className="h-3 w-3 mr-1" />
                      Contact
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-6">
              <Button onClick={onClose}>Close</Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Enhanced Upload Cards for Different Data Types
const DataUploadCard = ({ type, title, description, icon: Icon, gradient, onClick }: any) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="cursor-pointer"
      onClick={onClick}
    >
      <Card className="glass-morphism border-2 border-transparent hover:border-blue-300/50 transition-all duration-300 relative overflow-hidden group">
        {/* Background Animation */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
        />
        
        <CardHeader className="text-center relative z-10">
          <motion.div
            className={`p-4 rounded-2xl bg-gradient-to-br ${gradient} text-white mx-auto w-fit mb-4`}
            whileHover={{ rotate: 15, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Icon className="h-8 w-8" />
          </motion.div>
          
          <CardTitle className="text-xl gradient-text font-bold mb-2">
            {title}
          </CardTitle>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
        </CardHeader>
        
        <CardContent className="text-center relative z-10">
          <Button
            className={`bg-gradient-to-r ${gradient} hover:shadow-xl transition-all duration-300 px-8 py-3`}
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload {title}
          </Button>
          
          <div className="mt-4 pt-4 border-t border-muted/20">
            <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span>Excel</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span>CSV</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3 text-yellow-500" />
                <span>Templates</span>
              </div>
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

const StudentEditModal = ({
  student,
  isOpen,
  onClose,
  onSave,
}: any) => {
  const [editedStudent, setEditedStudent] = useState(student);

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
              <h2 className="text-xl font-semibold">
                Edit Student Details
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Student Name</Label>
                <Input
                  value={editedStudent?.name || ""}
                  onChange={(e) =>
                    setEditedStudent({
                      ...editedStudent,
                      name: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Roll Number</Label>
                <Input
                  value={editedStudent?.rollNo || ""}
                  onChange={(e) =>
                    setEditedStudent({
                      ...editedStudent,
                      rollNo: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Attendance (%)</Label>
                <Input
                  type="number"
                  value={editedStudent?.attendance || 0}
                  onChange={(e) =>
                    setEditedStudent({
                      ...editedStudent,
                      attendance: parseInt(e.target.value),
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Overall Grades (%)</Label>
                <Input
                  type="number"
                  value={editedStudent?.grades || 0}
                  onChange={(e) =>
                    setEditedStudent({
                      ...editedStudent,
                      grades: parseInt(e.target.value),
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Fee Status</Label>
                <Select
                  value={editedStudent?.fees || "Pending"}
                  onValueChange={(value) =>
                    setEditedStudent({
                      ...editedStudent,
                      fees: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Paid">Paid</SelectItem>
                    <SelectItem value="Pending">
                      Pending
                    </SelectItem>
                    <SelectItem value="Partial">
                      Partial
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Contact Number</Label>
                <Input
                  value={editedStudent?.contact || ""}
                  onChange={(e) =>
                    setEditedStudent({
                      ...editedStudent,
                      contact: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  onSave(editedStudent);
                  onClose();
                }}
                className="bg-gradient-to-r from-green-500 to-emerald-600"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const RiskFlagCard = ({ student }: any) => {
  const getRiskColor = (level: string) => {
    switch (level) {
      case "high":
        return "from-red-500 to-orange-500";
      case "medium":
        return "from-yellow-500 to-orange-500";
      case "safe":
        return "from-green-500 to-emerald-500";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getRiskFactors = (student: any) => {
    const factors = [];
    if (student.attendance < 75) factors.push("Low Attendance");
    if (student.grades < 70) factors.push("Poor Performance");
    if (student.fees !== "Paid") factors.push("Fee Issues");
    return factors;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className="glass-morphism p-4 rounded-xl border relative overflow-hidden"
    >
      <div
        className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${getRiskColor(student.riskLevel)}`}
      />

      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-semibold">{student.name}</h4>
          <p className="text-sm text-muted-foreground">
            {student.rollNo}
          </p>
        </div>
        <Badge
          className={`bg-gradient-to-r ${getRiskColor(student.riskLevel)} text-white`}
        >
          {student.riskLevel.toUpperCase()}
        </Badge>
      </div>

      <div className="space-y-2">
        {getRiskFactors(student).map((factor, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 text-sm"
          >
            <AlertTriangle className="h-3 w-3 text-orange-500" />
            <span>{factor}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-4 pt-3 border-t">
        <div className="text-xs text-muted-foreground">
          Updated {student.lastUpdate}
        </div>
        <div className="flex space-x-1">
          <Button
            variant="outline"
            size="sm"
            className="h-7 px-2"
          >
            <Eye className="h-3 w-3" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-7 px-2"
          >
            <AlertCircle className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export function GFMDashboard() {
  const [selectedStudent, setSelectedStudent] =
    useState<any>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [pendingFeesModalOpen, setPendingFeesModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [uploadModalType, setUploadModalType] = useState<'attendance' | 'marks' | 'fees' | null>(null);

  const filteredStudents = studentData.filter(
    (student) =>
      student.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      student.rollNo
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
  );

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200";
      case "safe":
        return "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-950 dark:text-gray-200";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return (
          <TrendingUp className="h-3 w-3 text-green-500" />
        );
      case "down":
        return (
          <TrendingDown className="h-3 w-3 text-red-500" />
        );
      default:
        return (
          <div className="h-3 w-3 rounded-full bg-gray-400" />
        );
    }
  };

  const uploadOptions = [
    {
      type: 'attendance',
      title: 'Attendance Data',
      description: 'Upload daily attendance records, mark present/absent status, and track attendance patterns for better student monitoring.',
      icon: Calendar,
      gradient: 'from-blue-500 to-cyan-600',
    },
    {
      type: 'marks',
      title: 'Marks & Grades',
      description: 'Import exam results, assignment scores, project grades, and assessment data to track academic performance.',
      icon: GraduationCap,
      gradient: 'from-purple-500 to-pink-600',
    },
    {
      type: 'fees',
      title: 'Fee Records',
      description: 'Manage fee payments, installments, due dates, and payment status to maintain accurate financial records.',
      icon: DollarSign,
      gradient: 'from-green-500 to-emerald-600',
    },
  ];

  return (
    <div className="min-h-screen relative">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4"
        >
          <div>
            <motion.h1
              className="text-3xl font-bold gradient-text mb-2"
              animate={{
                backgroundPosition: [
                  "0% 50%",
                  "100% 50%",
                  "0% 50%",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              Class Teacher Dashboard
            </motion.h1>
            <p className="text-muted-foreground">
              {classData.className}
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <Users className="h-3 w-3 mr-1" />
              {classData.totalStudents} Students
            </Badge>
            <Badge className="bg-gradient-to-r from-orange-500 to-red-600 text-white animate-pulse">
              <AlertTriangle className="h-3 w-3 mr-1" />
              {classData.atRiskStudents} At Risk
            </Badge>
            <Button className="bg-gradient-to-r from-green-500 to-emerald-600">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Active Students",
              value: classData.activeStudents,
              total: classData.totalStudents,
              icon: Users,
              color: "from-blue-500 to-blue-600",
              change: "+2 this week",
            },
            {
              title: "Avg Attendance",
              value: `${classData.averageAttendance}%`,
              icon: Calendar,
              color: "from-green-500 to-green-600",
              change: "-2.3% from last month",
            },
            {
              title: "Avg Grades",
              value: `${classData.averageGrades}%`,
              icon: GraduationCap,
              color: "from-purple-500 to-purple-600",
              change: "+1.8% from last month",
            },
            {
              title: "Pending Fees",
              value: classData.pendingFees,
              icon: DollarSign,
              color: "from-orange-500 to-red-600",
              change: "-1 this week",
              onClick: () => setPendingFeesModalOpen(true)
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              onClick={stat.onClick}
              className={stat.onClick ? 'cursor-pointer' : ''}
            >
              <Card className="glass-morphism border relative overflow-hidden group">
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity`}
                />
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    className={`p-2 rounded-lg bg-gradient-to-r ${stat.color} text-white`}
                  >
                    <stat.icon className="h-4 w-4" />
                  </motion.div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stat.value}
                  </div>
                  {stat.total && (
                    <Progress
                      value={(stat.value / stat.total) * 100}
                      className="mt-2"
                    />
                  )}
                  <p className="text-xs text-muted-foreground mt-2">
                    {stat.change}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 glass-morphism">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="students">
              Student Data
            </TabsTrigger>
            <TabsTrigger value="upload">
              Data Upload
            </TabsTrigger>
            <TabsTrigger value="risk-flags">
              Risk Flags
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Attendance Trend */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card className="glass-morphism">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BarChart3 className="h-5 w-5 text-blue-500" />
                      <span>Attendance Trend</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer
                        width="100%"
                        height="100%"
                      >
                        <AreaChart data={attendanceTrend}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Area
                            type="monotone"
                            dataKey="attendance"
                            stroke="#3b82f6"
                            fill="#3b82f6"
                            fillOpacity={0.3}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Grade Distribution */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card className="glass-morphism">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <PieChart className="h-5 w-5 text-purple-500" />
                      <span>Grade Distribution</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer
                        width="100%"
                        height="100%"
                      >
                        <RechartsPieChart>
                          <RechartsPieChart
                            data={gradeDistribution}
                            dataKey="count"
                            nameKey="grade"
                          >
                            {gradeDistribution.map(
                              (entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={entry.color}
                                />
                              ),
                            )}
                          </RechartsPieChart>
                          <Tooltip />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {gradeDistribution.map((grade, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 text-sm"
                        >
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{
                              backgroundColor: grade.color,
                            }}
                          />
                          <span>
                            {grade.grade}: {grade.count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          {/* Student Data Tab */}
          <TabsContent value="students" className="space-y-6">
            {/* Search and Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search students by name or roll number..."
                  className="pl-10 glass-morphism"
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(e.target.value)
                  }
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-48 glass-morphism">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Students</SelectItem>
                  <SelectItem value="safe">Safe</SelectItem>
                  <SelectItem value="medium">Medium Risk</SelectItem>
                  <SelectItem value="high">High Risk</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>

            {/* Students Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-morphism rounded-xl border"
            >
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>Grades</TableHead>
                    <TableHead>Fees</TableHead>
                    <TableHead>Risk Level</TableHead>
                    <TableHead>Last Update</TableHead>
                    <TableHead className="text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <motion.tr
                      key={student.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                      className="transition-colors"
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                              {student.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">
                              {student.name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {student.rollNo}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span>{student.attendance}%</span>
                          {getTrendIcon(
                            student.attendanceTrend,
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span>{student.grades}%</span>
                          {getTrendIcon(
                            student.gradesTrend,
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            student.fees === "Paid"
                              ? "default"
                              : student.fees === "Partial"
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {student.fees}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={getRiskColor(
                            student.riskLevel,
                          )}
                        >
                          {student.riskLevel}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {student.lastUpdate}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex space-x-2 justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              setSelectedStudent(student)
                            }
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedStudent(student);
                              setEditModalOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </motion.div>
          </TabsContent>

          {/* Data Upload Tab */}
          <TabsContent value="upload" className="space-y-6">
            <div className="text-center mb-8">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 className="text-2xl font-bold gradient-text mb-2">
                  Data Upload Center
                </h3>
                <p className="text-muted-foreground">
                  Upload and manage student data with our smart import system
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {uploadOptions.map((option, index) => (
                <motion.div
                  key={option.type}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <DataUploadCard
                    {...option}
                    onClick={() =>
                      setUploadModalType(
                        option.type as 'attendance' | 'marks' | 'fees'
                      )
                    }
                  />
                </motion.div>
              ))}
            </div>

            {/* Upload Instructions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="glass-morphism">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-blue-500" />
                    <span>Upload Instructions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        1
                      </div>
                      <div>
                        <h4 className="font-medium">Choose File Type</h4>
                        <p className="text-sm text-muted-foreground">
                          Select the appropriate data category you want to upload
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        2
                      </div>
                      <div>
                        <h4 className="font-medium">Download Template</h4>
                        <p className="text-sm text-muted-foreground">
                          Use our formatted templates for accurate data import
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        3
                      </div>
                      <div>
                        <h4 className="font-medium">Upload & Process</h4>
                        <p className="text-sm text-muted-foreground">
                          Upload your file and let our system process the data
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Risk Flags Tab */}
          <TabsContent value="risk-flags" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-6"
            >
              <h3 className="text-2xl font-bold gradient-text mb-2">
                Student Risk Assessment
              </h3>
              <p className="text-muted-foreground">
                Monitor and manage students who need extra attention
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studentData
                .filter((student) => student.riskLevel !== "safe")
                .sort((a, b) => {
                  const riskOrder = { high: 0, medium: 1, safe: 2 };
                  return riskOrder[a.riskLevel] - riskOrder[b.riskLevel];
                })
                .map((student, index) => (
                  <motion.div
                    key={student.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <RiskFlagCard student={student} />
                  </motion.div>
                ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Student Edit Modal */}
        <StudentEditModal
          student={selectedStudent}
          isOpen={editModalOpen}
          onClose={() => {
            setEditModalOpen(false);
            setSelectedStudent(null);
          }}
          onSave={(editedStudent: any) => {
            // Handle save logic here
            console.log("Saving student:", editedStudent);
          }}
        />

        {/* Pending Fees Modal */}
        <PendingFeesModal 
          isOpen={pendingFeesModalOpen}
          onClose={() => setPendingFeesModalOpen(false)}
        />

        {/* Upload Modals */}
        <AttendanceUploadModal
          isOpen={uploadModalType === 'attendance'}
          onClose={() => setUploadModalType(null)}
        />
        <MarksUploadModal
          isOpen={uploadModalType === 'marks'}
          onClose={() => setUploadModalType(null)}
        />
        <FeesUploadModal
          isOpen={uploadModalType === 'fees'}
          onClose={() => setUploadModalType(null)}
        />
      </div>
    </div>
  );
}