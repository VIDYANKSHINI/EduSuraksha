import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Progress } from './ui/progress';
import { 
  MessageCircle, 
  Send, 
  Heart, 
  Brain, 
  Smile, 
  Frown, 
  Meh,
  Phone,
  Video,
  User,
  Bot,
  Mic,
  Volume2,
  Settings,
  Shield,
  Lock
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  mood?: 'happy' | 'neutral' | 'sad';
  suggestions?: string[];
}

interface MentalHealthChatbotProps {
  userRole?: 'mentor' | 'student' | 'parent' | 'gfm';
  onNavigateToAnonymousCounseling?: () => void;
}

export function MentalHealthChatbot({ userRole, onNavigateToAnonymousCounseling }: MentalHealthChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hi there! I\'m your AI wellness companion. I\'m here to listen and provide support. How are you feeling today?',
      timestamp: new Date(),
      suggestions: ['I feel stressed', 'I\'m doing okay', 'I need help', 'Tell me about breathing exercises']
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentMood, setCurrentMood] = useState<'happy' | 'neutral' | 'sad'>('neutral');
  const [stressLevel, setStressLevel] = useState(45);
  const [isAnonymousMode, setIsAnonymousMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // AI mood detection based on message content
  const detectMood = (message: string): 'happy' | 'neutral' | 'sad' => {
    const sadKeywords = ['sad', 'depressed', 'anxious', 'stressed', 'worried', 'upset', 'tired'];
    const happyKeywords = ['happy', 'good', 'great', 'excellent', 'amazing', 'wonderful', 'excited'];
    
    const lowerMessage = message.toLowerCase();
    
    if (sadKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return 'sad';
    } else if (happyKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return 'happy';
    }
    return 'neutral';
  };

  // Generate AI response based on user input and mood
  const generateAIResponse = (userMessage: string, mood: 'happy' | 'neutral' | 'sad'): { content: string; suggestions: string[] } => {
    const responses = {
      sad: {
        content: "I hear you, and I want you to know that what you're feeling is valid. It's okay to not feel okay sometimes. Let's work through this together. Would you like to try a breathing exercise or talk about what's on your mind?",
        suggestions: ['Breathing exercise', 'Talk to a counselor', 'Relaxation tips', 'How to manage stress']
      },
      happy: {
        content: "That's wonderful to hear! I'm glad you're feeling positive. It's great when we can recognize and appreciate good moments. What's been going well for you lately?",
        suggestions: ['Share more good news', 'Tips for maintaining positivity', 'Help a friend', 'Set new goals']
      },
      neutral: {
        content: "Thanks for sharing. I'm here to support you in whatever way you need. Whether you want to talk about your day, learn some wellness techniques, or just have a friendly conversation, I'm here for you.",
        suggestions: ['Tell me about your day', 'Stress management tips', 'Focus techniques', 'How to improve mood']
      }
    };

    // Special responses for specific keywords
    if (userMessage.toLowerCase().includes('breathing')) {
      return {
        content: "Great choice! Let's do a simple breathing exercise together. Breathe in slowly for 4 counts, hold for 4, then breathe out for 6. This activates your body's relaxation response. Shall we try it together?",
        suggestions: ['Start breathing exercise', 'Learn more techniques', 'Guided meditation', 'Talk to someone']
      };
    }

    if (userMessage.toLowerCase().includes('exam') || userMessage.toLowerCase().includes('test')) {
      return {
        content: "Exam stress is very common and completely understandable. Remember, your worth isn't defined by test scores. Let's focus on healthy study techniques and stress management. What specific aspect of exams is worrying you most?",
        suggestions: ['Study techniques', 'Manage exam anxiety', 'Time management', 'Talk to a mentor']
      };
    }

    return responses[mood];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const messageContent = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    // Detect mood and update stress level
    const detectedMood = detectMood(messageContent);
    setCurrentMood(detectedMood);
    
    if (detectedMood === 'sad') {
      setStressLevel(prev => Math.min(100, prev + 10));
    } else if (detectedMood === 'happy') {
      setStressLevel(prev => Math.max(0, prev - 5));
    }

    try {
      // Send message to backend
      const { sendWellnessMessage } = await import('../utils/supabase/client');
      const { response, error } = await sendWellnessMessage(messageContent, detectedMood);
      
      let aiResponseContent = '';
      let suggestions: string[] = [];
      
      if (error) {
        console.error('Wellness chat error:', error);
        // Fallback to local AI response
        const aiResponse = generateAIResponse(messageContent, detectedMood);
        aiResponseContent = aiResponse.content;
        suggestions = aiResponse.suggestions;
      } else {
        aiResponseContent = response.response;
        // Generate suggestions based on mood
        suggestions = getSuggestionsForMood(detectedMood);
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: aiResponseContent,
        timestamp: new Date(),
        suggestions
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      // Fallback to local response
      const aiResponse = generateAIResponse(messageContent, detectedMood);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: aiResponse.content,
        timestamp: new Date(),
        suggestions: aiResponse.suggestions
      };
      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const getSuggestionsForMood = (mood: 'happy' | 'neutral' | 'sad'): string[] => {
    const suggestions = {
      sad: ['Breathing exercise', 'Talk to a counselor', 'Relaxation tips', 'How to manage stress'],
      happy: ['Share more good news', 'Tips for maintaining positivity', 'Help a friend', 'Set new goals'],
      neutral: ['Tell me about your day', 'Stress management tips', 'Focus techniques', 'How to improve mood']
    };
    return suggestions[mood] || suggestions.neutral;
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  const getMoodIcon = (mood: 'happy' | 'neutral' | 'sad') => {
    switch (mood) {
      case 'happy': return <Smile className="h-4 w-4 text-green-500" />;
      case 'sad': return <Frown className="h-4 w-4 text-red-500" />;
      default: return <Meh className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStressColor = () => {
    if (stressLevel > 70) return 'bg-red-500';
    if (stressLevel > 40) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 flex">
      {/* Sidebar */}
      <div className="w-80 border-r bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
            Wellness Assistant
          </h2>
          <Button variant="outline" size="sm" onClick={() => setIsAnonymousMode(!isAnonymousMode)}>
            <Shield className="h-4 w-4 mr-1" />
            {isAnonymousMode ? 'Anonymous' : 'Identified'}
          </Button>
        </div>

        {/* Anonymous Support Option for Students Only */}
        {userRole === 'student' && onNavigateToAnonymousCounseling && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <motion.div
                      animate={{ 
                        boxShadow: [
                          "0 0 10px rgba(139, 92, 246, 0.3)",
                          "0 0 20px rgba(139, 92, 246, 0.5)",
                          "0 0 10px rgba(139, 92, 246, 0.3)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center"
                    >
                      <Shield className="h-5 w-5 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-sm font-medium text-purple-700 dark:text-purple-300">
                        Anonymous Support
                      </h3>
                      <p className="text-xs text-purple-600/80 dark:text-purple-400/80">
                        100% confidential counseling
                      </p>
                    </div>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={onNavigateToAnonymousCounseling}
                      size="sm"
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl"
                    >
                      <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                      >
                        <Lock className="h-4 w-4 mr-1" />
                      </motion.div>
                      Access
                    </Button>
                  </motion.div>
                </div>
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, delay: 0.5 }}
                  className="mt-3 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                />
                <div className="mt-2 text-xs text-purple-600/70 dark:text-purple-400/70">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-1" />
                      24/7 Available
                    </span>
                    <span className="flex items-center">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-1" />
                      Female Counselors
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Mood Tracker */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center">
              <Heart className="h-4 w-4 mr-2 text-pink-500" />
              Current Mood
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Mood</span>
              <div className="flex items-center space-x-1">
                {getMoodIcon(currentMood)}
                <span className="text-sm capitalize">{currentMood}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Stress Level</span>
                <span className="text-sm">{stressLevel}%</span>
              </div>
              <Progress value={stressLevel} className="h-2" />
              <div className={`h-2 rounded-full ${getStressColor()} opacity-50`} />
            </div>

            <div className="text-xs text-muted-foreground">
              AI detects emotions in real-time to provide better support
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Quick Support</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Phone className="h-4 w-4 mr-2" />
              Anonymous Call
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Video className="h-4 w-4 mr-2" />
              Video Session
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Brain className="h-4 w-4 mr-2" />
              Mindfulness
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Heart className="h-4 w-4 mr-2" />
              Crisis Support
            </Button>
          </CardContent>
        </Card>

        {/* Breathing Exercise */}
        <Card>
          <CardContent className="p-4">
            <div className="text-center space-y-3">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-16 h-16 bg-gradient-to-r from-teal-400 to-blue-400 rounded-full mx-auto flex items-center justify-center"
              >
                <Heart className="h-6 w-6 text-white" />
              </motion.div>
              <div className="text-sm">
                <p>Breathe in... hold... breathe out</p>
                <p className="text-xs text-muted-foreground">Follow the circle</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="border-b bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarFallback className="bg-gradient-to-r from-teal-500 to-blue-500 text-white">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h3>AI Wellness Companion</h3>
                <p className="text-sm text-muted-foreground">
                  Always here to listen • Confidential & Secure
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1" />
                Online
              </Badge>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${
                  message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className={
                      message.type === 'user' 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                        : 'bg-gradient-to-r from-teal-500 to-blue-500 text-white'
                    }>
                      {message.type === 'user' ? (
                        isAnonymousMode ? <Shield className="h-4 w-4" /> : <User className="h-4 w-4" />
                      ) : (
                        <Bot className="h-4 w-4" />
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : 'bg-white dark:bg-gray-800 border'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.type === 'user' ? 'text-white/70' : 'text-muted-foreground'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="flex items-center space-x-2">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-gradient-to-r from-teal-500 to-blue-500 text-white">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-white dark:bg-gray-800 border rounded-lg p-3">
                  <div className="flex space-x-1">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      className="w-2 h-2 bg-gray-400 rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      className="w-2 h-2 bg-gray-400 rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      className="w-2 h-2 bg-gray-400 rounded-full"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Suggestions */}
          {messages.length > 0 && messages[messages.length - 1].suggestions && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap gap-2 ml-10"
            >
              {messages[messages.length - 1].suggestions!.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="text-xs"
                >
                  {suggestion}
                </Button>
              ))}
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-4">
          <div className="flex items-center space-x-2">
            <div className="flex-1 relative">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Share what's on your mind... I'm here to listen"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="pr-20"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                <Button variant="ghost" size="sm">
                  <Mic className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Volume2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button 
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            This is a safe space. All conversations are confidential and encrypted.
          </p>
        </div>
      </div>
    </div>
  );
}