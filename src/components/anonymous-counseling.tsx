import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Shield,
  Lock,
  MessageCircle,
  Phone,
  Video,
  Users,
  Heart,
  AlertTriangle,
  User,
  Send,
  Mic,
  MicOff,
  VideoOff,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Star,
  CheckCircle,
  Clock,
  UserCheck,
  Headphones,
  MessageSquare,
  Calendar,
  Settings,
  Info,
  ArrowLeft,
  Sparkles,
  Brain,
  Zap,
  Plus,
  X,
  Check,
  RefreshCw,
  Bell,
  BellOff,
  Moon,
  Sun,
  GraduationCap,
} from "lucide-react";

// Mock data for available counselors
const availableCounselors = [
  {
    id: 1,
    name: "Dr. Sarah Wilson",
    gender: "female",
    specialization: "Harassment & Personal Issues",
    experience: "8 years",
    rating: 4.9,
    languages: ["English", "Hindi"],
    status: "available",
    nextAvailable: "Now",
    expertise: [
      "Harassment Support",
      "Trauma Counseling",
      "Personal Issues",
      "Confidence Building",
    ],
    approach:
      "Compassionate and empowering approach focusing on safety and healing",
  },
  {
    id: 2,
    name: "Dr. Priya Sharma",
    gender: "female",
    specialization: "Academic & Career Stress",
    experience: "6 years",
    rating: 4.8,
    languages: ["English", "Hindi", "Marathi"],
    status: "available",
    nextAvailable: "In 15 min",
    expertise: [
      "Academic Pressure",
      "Career Guidance",
      "Anxiety Management",
      "Study-Life Balance",
    ],
    approach:
      "Solution-focused therapy with practical coping strategies",
  },
  {
    id: 3,
    name: "Dr. Anita Reddy",
    gender: "female",
    specialization: "Mental Health & Wellness",
    experience: "10 years",
    rating: 5.0,
    languages: ["English", "Telugu", "Tamil"],
    status: "busy",
    nextAvailable: "In 45 min",
    expertise: [
      "Depression Support",
      "Anxiety Disorders",
      "Mindfulness",
      "Emotional Regulation",
    ],
    approach:
      "Holistic approach combining CBT with mindfulness techniques",
  },
  {
    id: 4,
    name: "Dr. Meera Gupta",
    gender: "female",
    specialization: "Relationship & Family Issues",
    experience: "7 years",
    rating: 4.7,
    languages: ["English", "Hindi", "Punjabi"],
    status: "available",
    nextAvailable: "Now",
    expertise: [
      "Family Conflicts",
      "Peer Relationships",
      "Social Anxiety",
      "Communication Skills",
    ],
    approach:
      "Empathetic listening with practical communication strategies",
  },
];

// Mock chat messages for demo
const mockChatMessages = [
  {
    id: 1,
    sender: "counselor",
    message:
      "Hello! I'm here to provide you with a safe and confidential space to talk. Please know that everything we discuss is completely anonymous and private.",
    timestamp: new Date(Date.now() - 300000),
    senderName: "Dr. Sarah Wilson",
  },
  {
    id: 2,
    sender: "counselor",
    message:
      "You can share whatever is on your mind. I'm here to listen without judgment and support you in any way I can.",
    timestamp: new Date(Date.now() - 240000),
    senderName: "Dr. Sarah Wilson",
  },
];

const AnonymousIndicator = () => (
  <div className="flex items-center space-x-2 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200 dark:border-green-800 rounded-full px-4 py-2">
    <div className="animate-spin">
      <Shield className="h-4 w-4 text-green-600" />
    </div>
    <span className="text-sm font-medium text-green-800 dark:text-green-200">
      100% Anonymous & Secure
    </span>
    <div className="animate-pulse">
      <Lock className="h-3 w-3 text-green-600" />
    </div>
  </div>
);

const CounselorCard = ({
  counselor,
  onSelect,
  isSelected,
}: any) => (
  <div
    className={`cursor-pointer transition-all hover:scale-[1.02] hover:-translate-y-1 ${
      isSelected
        ? "ring-2 ring-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20"
        : "hover:shadow-lg"
    }`}
  >
    <Card
      className="glass-morphism border h-full"
      onClick={() => onSelect(counselor)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12 border-2 border-pink-200">
              <AvatarFallback className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold">
                {counselor.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-sm">
                {counselor.name}
              </h3>
              <p className="text-xs text-muted-foreground">
                {counselor.specialization}
              </p>
              <div className="flex items-center space-x-2 mt-1">
                <Badge className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs px-2 py-0">
                  <Users className="h-2 w-2 mr-1" />
                  Female
                </Badge>
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium">
                    {counselor.rating}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <Badge
              className={
                counselor.status === "available"
                  ? "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200"
                  : "bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-200"
              }
            >
              {counselor.status === "available"
                ? "Available"
                : "Busy"}
            </Badge>
            <p className="text-xs text-muted-foreground mt-1">
              {counselor.nextAvailable}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          <div>
            <p className="text-xs font-medium mb-1">
              Expertise:
            </p>
            <div className="flex flex-wrap gap-1">
              {counselor.expertise
                .slice(0, 3)
                .map((skill: string) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="text-xs px-2 py-0"
                  >
                    {skill}
                  </Badge>
                ))}
              {counselor.expertise.length > 3 && (
                <span className="text-xs text-muted-foreground">
                  +{counselor.expertise.length - 3} more
                </span>
              )}
            </div>
          </div>

          <div>
            <p className="text-xs font-medium mb-1">
              Languages:
            </p>
            <p className="text-xs text-muted-foreground">
              {counselor.languages.join(", ")}
            </p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground italic">
              "{counselor.approach}"
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

const ChatInterface = ({ counselor, onBack }: any) => {
  const [messages, setMessages] = useState(mockChatMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(false);
  const [connectionType, setConnectionType] = useState<
    "chat" | "audio" | "video"
  >("chat");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      sender: "user",
      message: newMessage,
      timestamp: new Date(),
      senderName: "You (Anonymous)",
    };

    setMessages([...messages, userMessage]);
    setNewMessage("");
    setIsTyping(true);

    // Simulate counselor response
    setTimeout(() => {
      const counselorResponse = {
        id: messages.length + 2,
        sender: "counselor",
        message:
          "Thank you for sharing that with me. I understand this must be difficult to talk about. Can you tell me more about how this is affecting you?",
        timestamp: new Date(),
        senderName: counselor.name,
      };
      setMessages((prev) => [...prev, counselorResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleConnectionTypeChange = (
    type: "chat" | "audio" | "video",
  ) => {
    setConnectionType(type);
    // Add message about switching connection type
    const systemMessage = {
      id: messages.length + 1,
      sender: "system",
      message: `Switched to ${type} mode. Your privacy and anonymity are maintained.`,
      timestamp: new Date(),
      senderName: "System",
    };
    setMessages([...messages, systemMessage]);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b glass-morphism">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Avatar className="h-10 w-10 border-2 border-pink-200">
            <AvatarFallback className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
              {counselor.name
                .split(" ")
                .map((n: string) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{counselor.name}</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs text-muted-foreground">
                Online & Ready to Help
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <AnonymousIndicator />

          {/* Connection Controls */}
          <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
            <Button
              variant={
                connectionType === "chat" ? "default" : "ghost"
              }
              size="sm"
              onClick={() => handleConnectionTypeChange("chat")}
              className="h-8 px-3"
            >
              <MessageCircle className="h-3 w-3" />
            </Button>
            <Button
              variant={
                connectionType === "audio" ? "default" : "ghost"
              }
              size="sm"
              onClick={() =>
                handleConnectionTypeChange("audio")
              }
              className="h-8 px-3"
            >
              <Phone className="h-3 w-3" />
            </Button>
            <Button
              variant={
                connectionType === "video" ? "default" : "ghost"
              }
              size="sm"
              onClick={() =>
                handleConnectionTypeChange("video")
              }
              className="h-8 px-3"
            >
              <Video className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>

      {/* Privacy Notice */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-b border-green-200 dark:border-green-800"
      >
        <div className="flex items-center space-x-2 text-sm">
          <Shield className="h-4 w-4 text-green-600" />
          <span className="text-green-800 dark:text-green-200">
            This is a completely anonymous session. No personal
            information is stored or tracked.
          </span>
        </div>
      </motion.div>

      {/* Video/Audio Interface (when active) */}
      {(connectionType === "video" ||
        connectionType === "audio") && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-b"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {connectionType === "video" && (
                <div className="w-24 h-18 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <Video className="h-6 w-6 text-muted-foreground" />
                </div>
              )}
              <div>
                <h4 className="font-medium">
                  {connectionType === "video"
                    ? "Video Call"
                    : "Audio Call"}{" "}
                  Active
                </h4>
                <p className="text-sm text-muted-foreground">
                  Your identity remains completely anonymous
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant={
                  isAudioEnabled ? "default" : "destructive"
                }
                size="sm"
                onClick={() =>
                  setIsAudioEnabled(!isAudioEnabled)
                }
              >
                {isAudioEnabled ? (
                  <Mic className="h-4 w-4" />
                ) : (
                  <MicOff className="h-4 w-4" />
                )}
              </Button>
              {connectionType === "video" && (
                <Button
                  variant={
                    isVideoEnabled ? "default" : "destructive"
                  }
                  size="sm"
                  onClick={() =>
                    setIsVideoEnabled(!isVideoEnabled)
                  }
                >
                  {isVideoEnabled ? (
                    <Video className="h-4 w-4" />
                  ) : (
                    <VideoOff className="h-4 w-4" />
                  )}
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs lg:max-w-md ${
                  message.sender === "user"
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                    : message.sender === "system"
                      ? "bg-muted border"
                      : "bg-card border"
                } rounded-2xl p-3 shadow-sm`}
              >
                {message.sender !== "user" &&
                  message.sender !== "system" && (
                    <div className="flex items-center space-x-2 mb-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs">
                          {message.senderName
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-medium">
                        {message.senderName}
                      </span>
                    </div>
                  )}
                <p className="text-sm">{message.message}</p>
                <p
                  className={`text-xs mt-2 ${
                    message.sender === "user"
                      ? "text-blue-100"
                      : "text-muted-foreground"
                  }`}
                >
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-card border rounded-2xl p-3 shadow-sm">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: 0,
                      }}
                      className="w-2 h-2 bg-blue-500 rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: 0.2,
                      }}
                      className="w-2 h-2 bg-blue-500 rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: 0.4,
                      }}
                      className="w-2 h-2 bg-blue-500 rounded-full"
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Dr. {counselor.name.split(" ")[1]} is
                    typing...
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="p-4 border-t glass-morphism">
        <div className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <Input
              placeholder="Type your message... (completely anonymous)"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" && sendMessage()
              }
              className="pr-12"
            />
            <motion.div
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Shield className="h-4 w-4 text-green-500" />
            </motion.div>
          </div>
          <Button
            onClick={sendMessage}
            disabled={!newMessage.trim()}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
          <span>🔒 End-to-end encrypted • No data stored</span>
          <span>Press Enter to send</span>
        </div>
      </div>
    </div>
  );
};

export function AnonymousCounseling() {
  const [selectedCounselor, setSelectedCounselor] =
    useState<any>(null);
  const [currentView, setCurrentView] = useState<
    "selection" | "chat"
  >("selection");
  const [sessionStarted, setSessionStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize component
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  const startSession = (counselor: any) => {
    setSelectedCounselor(counselor);
    setCurrentView("chat");
    setSessionStarted(true);
  };

  const backToSelection = () => {
    setCurrentView("selection");
    setSelectedCounselor(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (currentView === "chat" && selectedCounselor) {
    return (
      <div className="h-screen">
        <ChatInterface
          counselor={selectedCounselor}
          onBack={backToSelection}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-2xl">
            <Shield className="h-10 w-10" />
          </div>

          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">
              Anonymous Counseling
            </h1>
            <p className="text-lg text-muted-foreground">
              Safe, private, and completely anonymous support
              with female counselors
            </p>
          </div>

          <AnonymousIndicator />
        </div>

        {/* Privacy Features */}
        <div>
          <Card className="glass-morphism border-green-200 dark:border-green-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lock className="h-5 w-5 text-green-500" />
                <span>Complete Privacy Protection</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    icon: Shield,
                    title: "No Personal Data",
                    description:
                      "We never collect names, contact info, or any identifying details",
                  },
                  {
                    icon: Lock,
                    title: "Encrypted Sessions",
                    description:
                      "All conversations are end-to-end encrypted and not stored",
                  },
                  {
                    icon: Eye,
                    title: "Anonymous Identity",
                    description:
                      "Your counselor only sees an anonymous identifier",
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="text-center space-y-2"
                  >
                    <div className="mx-auto w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Counselor Selection */}
        <div>
          <Card className="glass-morphism border-pink-200 dark:border-pink-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-pink-500" />
                <span>Choose Your Female Counselor</span>
                <Badge className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
                  All Female Staff
                </Badge>
              </CardTitle>
              <p className="text-muted-foreground">
                All our counselors are specially trained to
                handle sensitive issues with care and
                understanding
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {availableCounselors.map((counselor) => (
                  <CounselorCard
                    key={counselor.id}
                    counselor={counselor}
                    onSelect={startSession}
                    isSelected={
                      selectedCounselor?.id === counselor.id
                    }
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Support Information */}
        <div>
          <Card className="glass-morphism border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-blue-500" />
                <span>What We Can Help With</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    icon: AlertTriangle,
                    title: "Harassment Support",
                    description:
                      "Safe space to discuss any form of harassment",
                  },
                  {
                    icon: Brain,
                    title: "Mental Health",
                    description:
                      "Depression, anxiety, stress management",
                  },
                  {
                    icon: Users,
                    title: "Relationship Issues",
                    description: "Family, peers, friendship",
                  },
                  {
                    icon: GraduationCap,
                    title: "Academic Pressure",
                    description:
                      "Study stress, performance anxiety",
                  },
                  {
                    icon: Star,
                    title: "Self-Esteem",
                    description:
                      "Building confidence and self-worth",
                  },
                  {
                    icon: MessageCircle,
                    title: "Communication",
                    description:
                      "Expressing feelings and needs",
                  },
                  {
                    icon: Shield,
                    title: "Personal Safety in case any ",
                    description: "Feeling unsafe or threatened",
                  },
                  {
                    icon: Heart,
                    title: "Emotional Support",
                    description: "General emotional wellbeing",
                  },
                ].map((support, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl glass-morphism border text-center space-y-2 hover:scale-105 transition-transform"
                  >
                    <div className="mx-auto w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white hover:rotate-12 transition-transform">
                      <support.icon className="h-5 w-5" />
                    </div>
                    <h4 className="font-semibold text-sm">
                      {support.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {support.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Contact Info */}
        <div>
          <Card className="glass-morphism border-red-200 dark:border-red-800 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white animate-pulse">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-red-800 dark:text-red-200">
                    In Case of Emergency
                  </h4>
                  <p className="text-sm text-red-600 dark:text-red-300">
                    If you're in immediate danger, please call
                    100 (Police) or 102 (Helpline) immediately
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
