import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { 
  Upload, 
  FileSpreadsheet, 
  X, 
  Calendar, 
  GraduationCap, 
  DollarSign, 
  CheckCircle, 
  AlertTriangle,
  Download,
  Eye,
  Info,
  Clock,
  Users,
  Target
} from 'lucide-react';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'attendance' | 'marks' | 'fees';
}

// Attendance Upload Modal
const AttendanceUploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, type }) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    setUploadedFile(file);
    setIsUploading(true);
    
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    setIsUploading(false);
    // Here you would typically send the file to your server
    console.log('Uploading attendance file:', file.name);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0 && (files[0].name.endsWith('.xlsx') || files[0].name.endsWith('.csv'))) {
      handleFileUpload(files[0]);
    }
  };

  const sampleData = [
    { field: 'Student Name', example: 'Aditya Yelmar', required: true },
    { field: 'Roll Number', example: 'CS2023001', required: true },
    { field: 'Date', example: '2024-01-15', required: true },
    { field: 'Status', example: 'Present/Absent/Late', required: true },
    { field: 'Period/Subject', example: 'Mathematics', required: false },
    { field: 'Remarks', example: 'Medical leave', required: false },
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
            className="bg-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto glass-morphism border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-card/80 backdrop-blur-sm border-b border-white/10 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <motion.div
                    className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600 text-white"
                    whileHover={{ rotate: 15, scale: 1.1 }}
                  >
                    <Calendar className="h-6 w-6" />
                  </motion.div>
                  <div>
                    <h2 className="text-2xl font-bold gradient-text">Upload Attendance Data</h2>
                    <p className="text-muted-foreground">Import student attendance records from Excel/CSV files</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={onClose} className="hover:bg-red-100 dark:hover:bg-red-950">
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Upload Area */}
              <Card className="glass-morphism border-2 border-dashed border-blue-300/50 hover:border-blue-400/70 transition-colors">
                <CardContent className="p-8">
                  <motion.div
                    className={`text-center transition-all ${dragOver ? 'scale-105' : ''}`}
                    onDrop={handleDrop}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOver(true);
                    }}
                    onDragLeave={() => setDragOver(false)}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".xlsx,.xls,.csv"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file);
                      }}
                    />

                    <motion.div
                      animate={{ rotate: dragOver ? 10 : 0, scale: dragOver ? 1.1 : 1 }}
                      className="mb-6"
                    >
                      <FileSpreadsheet className="h-16 w-16 mx-auto text-blue-500 mb-4" />
                    </motion.div>

                    <h3 className="text-xl font-semibold mb-2">Upload Attendance File</h3>
                    <p className="text-muted-foreground mb-6">
                      Drag & drop your Excel/CSV file here, or click to browse
                    </p>

                    <div className="space-y-4">
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 px-8 py-3"
                        disabled={isUploading}
                      >
                        <Upload className="h-5 w-5 mr-2" />
                        Choose Attendance File
                      </Button>

                      <div className="flex justify-center space-x-6 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Excel (.xlsx, .xls)</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>CSV (.csv)</span>
                        </div>
                      </div>
                    </div>

                    {/* Upload Progress */}
                    {isUploading && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6"
                      >
                        <Progress value={uploadProgress} className="mb-3" />
                        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <Clock className="h-4 w-4" />
                          </motion.div>
                          <span>Processing attendance data... {uploadProgress}%</span>
                        </div>
                      </motion.div>
                    )}

                    {/* Success State */}
                    {uploadedFile && !isUploading && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-6 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800"
                      >
                        <div className="flex items-center justify-center space-x-2 text-green-700 dark:text-green-300">
                          <CheckCircle className="h-5 w-5" />
                          <span className="font-medium">File uploaded successfully!</span>
                        </div>
                        <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                          {uploadedFile.name} • {(uploadedFile.size / 1024).toFixed(1)} KB
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                </CardContent>
              </Card>

              {/* Required Format Information */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Format Requirements */}
                <Card className="glass-morphism">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Info className="h-5 w-5 text-blue-500" />
                      <span>Required Format</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {sampleData.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{item.field}</span>
                              {item.required && (
                                <Badge variant="destructive" className="text-xs px-1 py-0">Required</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{item.example}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <Info className="h-4 w-4 text-blue-500 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-medium text-blue-800 dark:text-blue-200">Pro Tip:</p>
                          <p className="text-blue-600 dark:text-blue-300">
                            Include date ranges for bulk attendance upload. One row per student per date.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Sample Template */}
                <Card className="glass-morphism">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Download className="h-5 w-5 text-green-500" />
                      <span>Sample Template</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Download our sample template to ensure your data is formatted correctly.
                      </p>
                      
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full justify-start">
                          <FileSpreadsheet className="h-4 w-4 mr-2 text-green-600" />
                          <div className="text-left">
                            <div className="font-medium">attendance_template.xlsx</div>
                            <div className="text-xs text-muted-foreground">Excel format with sample data</div>
                          </div>
                        </Button>
                        
                        <Button variant="outline" className="w-full justify-start">
                          <FileSpreadsheet className="h-4 w-4 mr-2 text-blue-600" />
                          <div className="text-left">
                            <div className="font-medium">attendance_template.csv</div>
                            <div className="text-xs text-muted-foreground">CSV format for bulk imports</div>
                          </div>
                        </Button>
                      </div>

                      <div className="pt-3 border-t">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Eye className="h-4 w-4" />
                          <span>Preview your data before uploading</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button 
                  className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
                  disabled={!uploadedFile}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Process Attendance Data
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Marks Upload Modal
const MarksUploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, type }) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedExamType, setSelectedExamType] = useState('');

  const handleFileUpload = async (file: File) => {
    setUploadedFile(file);
    setIsUploading(true);
    
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    setIsUploading(false);
    console.log('Uploading marks file:', file.name);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0 && (files[0].name.endsWith('.xlsx') || files[0].name.endsWith('.csv'))) {
      handleFileUpload(files[0]);
    }
  };

  const marksFields = [
    { field: 'Student Name', example: 'Aditya Yelmar', required: true },
    { field: 'Roll Number', example: 'CS2023001', required: true },
    { field: 'Subject', example: 'Mathematics', required: true },
    { field: 'Exam Type', example: 'Mid-term/Final/Quiz', required: true },
    { field: 'Max Marks', example: '100', required: true },
    { field: 'Obtained Marks', example: '85', required: true },
    { field: 'Exam Date', example: '2024-01-15', required: false },
    { field: 'Grade', example: 'A/B/C', required: false },
  ];

  const examTypes = ['Mid-term Exam', 'Final Exam', 'Quiz', 'Assignment', 'Project', 'Internal Assessment'];

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
                  <motion.div
                    className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white"
                    whileHover={{ rotate: 15, scale: 1.1 }}
                  >
                    <GraduationCap className="h-6 w-6" />
                  </motion.div>
                  <div>
                    <h2 className="text-2xl font-bold gradient-text">Upload Marks Data</h2>
                    <p className="text-muted-foreground">Import student exam marks and grades from Excel/CSV files</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={onClose} className="hover:bg-red-100 dark:hover:bg-red-950">
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Exam Type Selection */}
              <Card className="glass-morphism">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5 text-purple-500" />
                    <span>Exam Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Exam Type</Label>
                      <select 
                        className="w-full p-2 border rounded-lg bg-background"
                        value={selectedExamType}
                        onChange={(e) => setSelectedExamType(e.target.value)}
                      >
                        <option value="">Select exam type...</option>
                        {examTypes.map((type, index) => (
                          <option key={index} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>Academic Year</Label>
                      <Input placeholder="2023-2024" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Upload Area */}
              <Card className="glass-morphism border-2 border-dashed border-purple-300/50 hover:border-purple-400/70 transition-colors">
                <CardContent className="p-8">
                  <motion.div
                    className={`text-center transition-all ${dragOver ? 'scale-105' : ''}`}
                    onDrop={handleDrop}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOver(true);
                    }}
                    onDragLeave={() => setDragOver(false)}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".xlsx,.xls,.csv"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file);
                      }}
                    />

                    <motion.div
                      animate={{ rotate: dragOver ? 10 : 0, scale: dragOver ? 1.1 : 1 }}
                      className="mb-6"
                    >
                      <FileSpreadsheet className="h-16 w-16 mx-auto text-purple-500 mb-4" />
                    </motion.div>

                    <h3 className="text-xl font-semibold mb-2">Upload Marks File</h3>
                    <p className="text-muted-foreground mb-6">
                      Upload student exam marks, assignments, and grade data
                    </p>

                    <div className="space-y-4">
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 px-8 py-3"
                        disabled={isUploading}
                      >
                        <Upload className="h-5 w-5 mr-2" />
                        Choose Marks File
                      </Button>

                      <div className="flex justify-center space-x-6 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Excel (.xlsx, .xls)</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>CSV (.csv)</span>
                        </div>
                      </div>
                    </div>

                    {/* Upload Progress */}
                    {isUploading && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6"
                      >
                        <Progress value={uploadProgress} className="mb-3" />
                        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <Clock className="h-4 w-4" />
                          </motion.div>
                          <span>Processing marks data... {uploadProgress}%</span>
                        </div>
                      </motion.div>
                    )}

                    {/* Success State */}
                    {uploadedFile && !isUploading && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-6 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800"
                      >
                        <div className="flex items-center justify-center space-x-2 text-green-700 dark:text-green-300">
                          <CheckCircle className="h-5 w-5" />
                          <span className="font-medium">File uploaded successfully!</span>
                        </div>
                        <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                          {uploadedFile.name} • {(uploadedFile.size / 1024).toFixed(1)} KB
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                </CardContent>
              </Card>

              {/* Format Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="glass-morphism">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Info className="h-5 w-5 text-purple-500" />
                      <span>Required Format</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {marksFields.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{item.field}</span>
                              {item.required && (
                                <Badge variant="destructive" className="text-xs px-1 py-0">Required</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{item.example}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-morphism">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Download className="h-5 w-5 text-green-500" />
                      <span>Sample Template</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Download sample templates for different exam types.
                      </p>
                      
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full justify-start">
                          <FileSpreadsheet className="h-4 w-4 mr-2 text-purple-600" />
                          <div className="text-left">
                            <div className="font-medium">marks_template.xlsx</div>
                            <div className="text-xs text-muted-foreground">Excel format with formulas</div>
                          </div>
                        </Button>
                        
                        <Button variant="outline" className="w-full justify-start">
                          <FileSpreadsheet className="h-4 w-4 mr-2 text-blue-600" />
                          <div className="text-left">
                            <div className="font-medium">subject_wise_marks.csv</div>
                            <div className="text-xs text-muted-foreground">Subject-wise breakdown</div>
                          </div>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button 
                  className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                  disabled={!uploadedFile || !selectedExamType}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Process Marks Data
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Fees Upload Modal
const FeesUploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, type }) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedSemester, setSelectedSemester] = useState('');

  const handleFileUpload = async (file: File) => {
    setUploadedFile(file);
    setIsUploading(true);
    
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    setIsUploading(false);
    console.log('Uploading fees file:', file.name);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0 && (files[0].name.endsWith('.xlsx') || files[0].name.endsWith('.csv'))) {
      handleFileUpload(files[0]);
    }
  };

  const feesFields = [
    { field: 'Student Name', example: 'Aditya Yelmar', required: true },
    { field: 'Roll Number', example: 'CS2023001', required: true },
    { field: 'Fee Type', example: 'Tuition/Hostel/Transport', required: true },
    { field: 'Total Amount', example: '50000', required: true },
    { field: 'Paid Amount', example: '30000', required: true },
    { field: 'Due Date', example: '2024-01-31', required: true },
    { field: 'Payment Status', example: 'Paid/Pending/Partial', required: true },
    { field: 'Payment Date', example: '2024-01-15', required: false },
    { field: 'Receipt Number', example: 'RCP001234', required: false },
  ];

  const semesters = ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Annual'];

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
                  <motion.div
                    className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                    whileHover={{ rotate: 15, scale: 1.1 }}
                  >
                    <DollarSign className="h-6 w-6" />
                  </motion.div>
                  <div>
                    <h2 className="text-2xl font-bold gradient-text">Upload Fees Data</h2>
                    <p className="text-muted-foreground">Import student fee records and payment status from Excel/CSV files</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={onClose} className="hover:bg-red-100 dark:hover:bg-red-950">
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Fee Period Selection */}
              <Card className="glass-morphism">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-green-500" />
                    <span>Fee Period Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Fee Period</Label>
                      <select 
                        className="w-full p-2 border rounded-lg bg-background"
                        value={selectedSemester}
                        onChange={(e) => setSelectedSemester(e.target.value)}
                      >
                        <option value="">Select period...</option>
                        {semesters.map((semester, index) => (
                          <option key={index} value={semester}>{semester}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>Academic Year</Label>
                      <Input placeholder="2023-2024" />
                    </div>
                    <div className="space-y-2">
                      <Label>Due Date</Label>
                      <Input type="date" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Upload Area */}
              <Card className="glass-morphism border-2 border-dashed border-green-300/50 hover:border-green-400/70 transition-colors">
                <CardContent className="p-8">
                  <motion.div
                    className={`text-center transition-all ${dragOver ? 'scale-105' : ''}`}
                    onDrop={handleDrop}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOver(true);
                    }}
                    onDragLeave={() => setDragOver(false)}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".xlsx,.xls,.csv"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file);
                      }}
                    />

                    <motion.div
                      animate={{ rotate: dragOver ? 10 : 0, scale: dragOver ? 1.1 : 1 }}
                      className="mb-6"
                    >
                      <FileSpreadsheet className="h-16 w-16 mx-auto text-green-500 mb-4" />
                    </motion.div>

                    <h3 className="text-xl font-semibold mb-2">Upload Fees File</h3>
                    <p className="text-muted-foreground mb-6">
                      Upload student fee structure, payments, and due amounts
                    </p>

                    <div className="space-y-4">
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 px-8 py-3"
                        disabled={isUploading}
                      >
                        <Upload className="h-5 w-5 mr-2" />
                        Choose Fees File
                      </Button>

                      <div className="flex justify-center space-x-6 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Excel (.xlsx, .xls)</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>CSV (.csv)</span>
                        </div>
                      </div>
                    </div>

                    {/* Upload Progress */}
                    {isUploading && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6"
                      >
                        <Progress value={uploadProgress} className="mb-3" />
                        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <Clock className="h-4 w-4" />
                          </motion.div>
                          <span>Processing fees data... {uploadProgress}%</span>
                        </div>
                      </motion.div>
                    )}

                    {/* Success State */}
                    {uploadedFile && !isUploading && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-6 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800"
                      >
                        <div className="flex items-center justify-center space-x-2 text-green-700 dark:text-green-300">
                          <CheckCircle className="h-5 w-5" />
                          <span className="font-medium">File uploaded successfully!</span>
                        </div>
                        <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                          {uploadedFile.name} • {(uploadedFile.size / 1024).toFixed(1)} KB
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                </CardContent>
              </Card>

              {/* Format Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="glass-morphism">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Info className="h-5 w-5 text-green-500" />
                      <span>Required Format</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {feesFields.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{item.field}</span>
                              {item.required && (
                                <Badge variant="destructive" className="text-xs px-1 py-0">Required</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{item.example}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-morphism">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Download className="h-5 w-5 text-green-500" />
                      <span>Sample Template</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Download fee management templates with built-in calculations.
                      </p>
                      
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full justify-start">
                          <FileSpreadsheet className="h-4 w-4 mr-2 text-green-600" />
                          <div className="text-left">
                            <div className="font-medium">fees_template.xlsx</div>
                            <div className="text-xs text-muted-foreground">Excel with payment tracking</div>
                          </div>
                        </Button>
                        
                        <Button variant="outline" className="w-full justify-start">
                          <FileSpreadsheet className="h-4 w-4 mr-2 text-blue-600" />
                          <div className="text-left">
                            <div className="font-medium">installment_plan.csv</div>
                            <div className="text-xs text-muted-foreground">EMI and installment tracking</div>
                          </div>
                        </Button>
                      </div>

                      <div className="pt-3 border-t">
                        <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-lg">
                          <div className="flex items-start space-x-2">
                            <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />
                            <div className="text-sm">
                              <p className="font-medium text-amber-800 dark:text-amber-200">Important:</p>
                              <p className="text-amber-600 dark:text-amber-300">
                                Ensure payment amounts are in the correct currency format (numbers only).
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button 
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                  disabled={!uploadedFile || !selectedSemester}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Process Fees Data
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Main Export
export { AttendanceUploadModal, MarksUploadModal, FeesUploadModal };