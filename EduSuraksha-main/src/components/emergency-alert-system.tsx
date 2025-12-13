import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  AlertTriangle, 
  Phone, 
  Shield, 
  MapPin, 
  Clock, 
  Heart, 
  User, 
  Send, 
  X,
  Siren,
  Hospital,
  Users,
  MessageSquare,
  Navigation,
  Camera,
  Mic,
  PhoneCall,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';

interface EmergencyContact {
  id: string;
  name: string;
  role: string;
  phone: string;
  type: 'school' | 'medical' | 'police' | 'family';
}

interface EmergencyAlert {
  id: string;
  type: 'medical' | 'safety' | 'security' | 'fire' | 'other';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  location: string;
  timestamp: string;
  status: 'active' | 'resolved' | 'acknowledged';
  studentName: string;
  studentId: string;
  respondedBy?: string;
}

const emergencyContacts: EmergencyContact[] = [
  { id: '1', name: 'School Principal', role: 'Administrator', phone: '+91-9876543200', type: 'school' },
  { id: '2', name: 'School Nurse', role: 'Medical Staff', phone: '+91-9876543201', type: 'medical' },
  { id: '3', name: 'Security Office', role: 'Security', phone: '+91-9876543202', type: 'school' },
  { id: '4', name: 'Local Hospital', role: 'Emergency Medical', phone: '+91-9876543203', type: 'medical' },
  { id: '5', name: 'Police Station', role: 'Law Enforcement', phone: '+91-9876543204', type: 'police' },
  { id: '6', name: 'Parent/Guardian', role: 'Emergency Contact', phone: '+91-9876543210', type: 'family' },
];

const mockAlerts: EmergencyAlert[] = [
  {
    id: '1',
    type: 'medical',
    severity: 'high',
    description: 'Student fell in playground and may have injured ankle',
    location: 'Main Playground, Near Basketball Court',
    timestamp: '2024-02-29T14:30:00Z',
    status: 'active',
    studentName: 'Aditya Yelmar',
    studentId: 'CS2023001'
  },
  {
    id: '2',
    type: 'safety',
    severity: 'medium',
    description: 'Feeling unwell in class, possible fever',
    location: 'Classroom 3A, Computer Science Block',
    timestamp: '2024-02-29T11:15:00Z',
    status: 'resolved',
    studentName: 'Neha Gupta',
    studentId: 'CS2023006',
    respondedBy: 'School Nurse'
  }
];

// Emergency Alert Modal
const EmergencyAlertModal = ({ isOpen, onClose, onSubmit }: any) => {
  const [emergencyType, setEmergencyType] = useState('');
  const [severity, setSeverity] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emergencyTypes = [
    { value: 'medical', label: 'Medical Emergency', icon: Heart, color: 'from-red-500 to-red-600' },
    { value: 'safety', label: 'Safety Concern', icon: Shield, color: 'from-orange-500 to-orange-600' },
    { value: 'security', label: 'Security Issue', icon: AlertTriangle, color: 'from-yellow-500 to-yellow-600' },
    { value: 'fire', label: 'Fire Emergency', icon: Siren, color: 'from-red-600 to-red-700' },
    { value: 'other', label: 'Other Emergency', icon: AlertCircle, color: 'from-gray-500 to-gray-600' },
  ];

  const severityLevels = [
    { value: 'low', label: 'Low', color: 'text-green-600', description: 'Minor issue, no immediate danger' },
    { value: 'medium', label: 'Medium', color: 'text-yellow-600', description: 'Needs attention soon' },
    { value: 'high', label: 'High', color: 'text-orange-600', description: 'Urgent attention required' },
    { value: 'critical', label: 'Critical', color: 'text-red-600', description: 'Immediate response needed' },
  ];

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onSubmit({
      type: emergencyType,
      severity,
      description,
      location,
      timestamp: new Date().toISOString(),
    });
    
    setIsSubmitting(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            className="bg-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto glass-morphism border-2 border-red-500/30"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Emergency Header */}
            <div className="sticky top-0 bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    <Siren className="h-6 w-6" />
                  </motion.div>
                  <div>
                    <h2 className="text-xl font-bold">Emergency Alert</h2>
                    <p className="text-red-100 text-sm">Report an emergency situation immediately</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Emergency Type Selection */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Emergency Type</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {emergencyTypes.map((type) => (
                    <motion.div
                      key={type.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant={emergencyType === type.value ? 'default' : 'outline'}
                        onClick={() => setEmergencyType(type.value)}
                        className={`w-full justify-start h-auto p-4 ${
                          emergencyType === type.value
                            ? `bg-gradient-to-r ${type.color} text-white`
                            : 'hover:bg-muted/50'
                        }`}
                      >
                        <type.icon className="h-5 w-5 mr-3" />
                        <div className="text-left">
                          <div className="font-semibold">{type.label}</div>
                        </div>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Severity Level */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Severity Level</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {severityLevels.map((level) => (
                    <motion.div
                      key={level.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant={severity === level.value ? 'default' : 'outline'}
                        onClick={() => setSeverity(level.value)}
                        className={`w-full h-auto p-3 ${
                          severity === level.value
                            ? `${level.color === 'text-red-600' ? 'bg-red-500 text-white' : 
                                level.color === 'text-orange-600' ? 'bg-orange-500 text-white' :
                                level.color === 'text-yellow-600' ? 'bg-yellow-500 text-white' :
                                'bg-green-500 text-white'}`
                            : 'hover:bg-muted/50'
                        }`}
                      >
                        <div className="text-center">
                          <div className="font-semibold">{level.label}</div>
                          <div className="text-xs opacity-80">{level.description}</div>
                        </div>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label className="text-base font-semibold">Current Location</Label>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter your current location (e.g., Classroom 3A, Library, Playground)"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="outline" size="sm">
                    <MapPin className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label className="text-base font-semibold">Description</Label>
                <Textarea
                  placeholder="Describe the emergency situation in detail. Be specific about what happened and any immediate needs."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[120px] resize-none"
                />
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                <Button variant="outline" size="sm" className="h-auto p-3">
                  <Camera className="h-4 w-4 mr-2" />
                  <div className="text-left">
                    <div className="font-medium">Add Photo</div>
                    <div className="text-xs opacity-70">Visual evidence</div>
                  </div>
                </Button>
                <Button variant="outline" size="sm" className="h-auto p-3">
                  <Mic className="h-4 w-4 mr-2" />
                  <div className="text-left">
                    <div className="font-medium">Voice Note</div>
                    <div className="text-xs opacity-70">Record audio</div>
                  </div>
                </Button>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleSubmit}
                  disabled={!emergencyType || !severity || !description || !location || isSubmitting}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8"
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
                    <Send className="h-4 w-4 mr-2" />
                  )}
                  {isSubmitting ? 'Sending Alert...' : 'Send Emergency Alert'}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Quick Emergency Contacts
const QuickContactCard = ({ contact }: { contact: EmergencyContact }) => {
  const getContactIcon = (type: string) => {
    switch (type) {
      case 'medical': return Hospital;
      case 'police': return Shield;
      case 'family': return User;
      default: return Phone;
    }
  };

  const getContactColor = (type: string) => {
    switch (type) {
      case 'medical': return 'from-red-500 to-red-600';
      case 'police': return 'from-blue-500 to-blue-600';
      case 'family': return 'from-green-500 to-green-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const IconComponent = getContactIcon(contact.type);

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className="glass-morphism border hover:border-blue-300/50 cursor-pointer">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-lg bg-gradient-to-r ${getContactColor(contact.type)} text-white`}>
              <IconComponent className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">{contact.name}</h3>
              <p className="text-sm text-muted-foreground">{contact.role}</p>
              <p className="text-sm font-mono text-blue-600 dark:text-blue-400">{contact.phone}</p>
            </div>
            <Button size="sm" className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <PhoneCall className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Alert History Component
const AlertHistory = ({ alerts }: { alerts: EmergencyAlert[] }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200';
      case 'resolved': return 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200';
      case 'acknowledged': return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-950 dark:text-gray-200';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-950 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-4">
      {alerts.map((alert, index) => (
        <motion.div
          key={alert.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="p-4 border rounded-lg bg-card"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white">
                <AlertTriangle className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-semibold">{alert.studentName}</h3>
                <p className="text-sm text-muted-foreground">{alert.type} emergency</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Badge className={getSeverityColor(alert.severity)}>
                {alert.severity}
              </Badge>
              <Badge className={getStatusColor(alert.status)}>
                {alert.status}
              </Badge>
            </div>
          </div>

          <p className="text-sm mb-3">{alert.description}</p>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex space-x-4">
              <span className="flex items-center space-x-1">
                <MapPin className="h-3 w-3" />
                <span>{alert.location}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{new Date(alert.timestamp).toLocaleString()}</span>
              </span>
            </div>
            {alert.respondedBy && (
              <span className="flex items-center space-x-1 text-green-600">
                <CheckCircle className="h-3 w-3" />
                <span>Responded by {alert.respondedBy}</span>
              </span>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Main Emergency Alert System Component
export const EmergencyAlertSystem = () => {
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [alerts, setAlerts] = useState<EmergencyAlert[]>(mockAlerts);

  const handleEmergencySubmit = (emergencyData: any) => {
    const newAlert: EmergencyAlert = {
      id: Date.now().toString(),
      ...emergencyData,
      status: 'active',
      studentName: 'Current Student',
      studentId: 'CS2023001'
    };
    setAlerts([newAlert, ...alerts]);
  };

  return (
    <div className="space-y-6">
      {/* Emergency Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
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
            boxShadow: { duration: 2, repeat: Infinity },
            hover: { duration: 0.2 }
          }}
        >
          <Button
            onClick={() => setShowEmergencyModal(true)}
            className="w-64 h-16 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-lg font-bold shadow-2xl"
          >
            <Siren className="h-6 w-6 mr-3" />
            EMERGENCY ALERT
          </Button>
        </motion.div>
        <p className="text-sm text-muted-foreground mt-2">
          Click here in case of any emergency situation
        </p>
      </motion.div>

      {/* Quick Emergency Contacts */}
      <Card className="glass-morphism">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Phone className="h-5 w-5 text-green-500" />
            <span>Emergency Contacts</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {emergencyContacts.map((contact) => (
              <QuickContactCard key={contact.id} contact={contact} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Alerts */}
      <Card className="glass-morphism">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            <span>Recent Emergency Alerts</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AlertHistory alerts={alerts} />
        </CardContent>
      </Card>

      {/* Emergency Guidelines */}
      <Card className="glass-morphism border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Info className="h-5 w-5 text-blue-500" />
            <span>Emergency Guidelines</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">When to Use Emergency Alert:</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Medical emergencies or injuries</li>
                <li>• Safety concerns or threats</li>
                <li>• Fire or evacuation situations</li>
                <li>• Feeling unsafe or threatened</li>
                <li>• Witnessing dangerous situations</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What Happens Next:</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Immediate notification to school staff</li>
                <li>• Parents/guardians are contacted</li>
                <li>• Emergency services called if needed</li>
                <li>• Trained staff respond quickly</li>
                <li>• Follow-up and support provided</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Alert Modal */}
      <EmergencyAlertModal
        isOpen={showEmergencyModal}
        onClose={() => setShowEmergencyModal(false)}
        onSubmit={handleEmergencySubmit}
      />
    </div>
  );
};