import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { BookOpen, Users, Heart, Moon, Sun, GraduationCap, UserCheck, Shield, Sparkles, Star, Zap, ArrowRight, BookOpenCheck, Lock, Key, ChevronDown } from 'lucide-react';
import { Badge } from './ui/badge';

interface LoginPageProps {
  onLogin: (role: 'mentor' | 'student' | 'parent' | 'gfm') => void;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
}

// Enhanced Animated Logo with 3D Effects
const AnimatedLogo = () => {
  const controls = useAnimation();
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    controls.start({
      rotateY: [0, 360],
      scale: [1, 1.1, 1],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    });
  }, [controls]);

  return (
    <motion.div
      ref={logoRef}
      className="relative w-24 h-24 mx-auto mb-8"
      animate={controls}
      style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
    >
      {/* Main Logo Container with Glass Morphism */}
      <motion.div 
        className="absolute inset-0 glass-morphism rounded-3xl shadow-2xl overflow-hidden"
        animate={{
          background: [
            'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%)',
            'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 50%, #3b82f6 100%)',
            'linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%)',
          ],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Animated Border Glow */}
        <motion.div
          className="absolute inset-0 rounded-3xl"
          animate={{
            boxShadow: [
              "0 0 30px rgba(59, 130, 246, 0.6), 0 0 60px rgba(139, 92, 246, 0.4)",
              "0 0 40px rgba(139, 92, 246, 0.8), 0 0 80px rgba(6, 182, 212, 0.6)",
              "0 0 30px rgba(6, 182, 212, 0.6), 0 0 60px rgba(59, 130, 246, 0.4)",
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Inner Content */}
      <div className="absolute inset-2 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center relative overflow-hidden">
        {/* Floating Orbs Inside Logo */}
        <motion.div
          className="absolute w-3 h-3 bg-white/60 rounded-full"
          animate={{
            x: [0, 20, -20, 0],
            y: [0, -15, 15, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          animate={{ 
            rotateX: [0, 360],
            rotateZ: [0, -180],
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <BookOpen className="h-10 w-10 text-white drop-shadow-lg" />
        </motion.div>
      </div>

      {/* Floating Sparkles Around Logo */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${50 + Math.cos((i * Math.PI * 2) / 8) * 60}%`,
            top: `${50 + Math.sin((i * Math.PI * 2) / 8) * 60}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            rotate: [0, 360],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: (i * 0.2),
            ease: "easeInOut"
          }}
        >
          {i % 2 === 0 ? (
            <Star className="h-3 w-3 text-yellow-300" />
          ) : (
            <Sparkles className="h-3 w-3 text-cyan-300" />
          )}
        </motion.div>
      ))}

      {/* Magical Shimmer Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-3xl"
        animate={{ 
          x: ['-150%', '150%'],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          repeatDelay: 2,
          ease: "easeInOut"
        }}
        style={{ transform: 'skewX(-20deg)' }}
      />
    </motion.div>
  );
};

// Enhanced Floating Particles with Different Shapes
const LoginParticles = () => {
  const particleShapes = ['circle', 'triangle', 'square', 'diamond'];
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(25)].map((_, i) => {
        const shape = particleShapes[i % 4];
        return (
          <motion.div
            key={i}
            className={`absolute ${
              shape === 'circle' ? 'w-2 h-2 rounded-full' :
              shape === 'triangle' ? 'w-0 h-0 border-l-2 border-r-2 border-b-4 border-transparent' :
              shape === 'square' ? 'w-2 h-2' :
              'w-2 h-2 transform rotate-45'
            } bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              borderBottomColor: shape === 'triangle' ? '#60a5fa' : undefined,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.2, 1, 0.2],
              scale: [0.3, 1.2, 0.3],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3,
            }}
          />
        );
      })}
      
      {/* Floating Text Elements */}
      {['AI', '🎓', '💙', '✨', '📊'].map((text, i) => (
        <motion.div
          key={`text-${i}`}
          className="absolute text-xs font-bold text-blue-400/30 select-none"
          style={{
            left: `${Math.random() * 80 + 10}%`,
            top: `${Math.random() * 80 + 10}%`,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0, 0.6, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: i * 1.2,
            ease: "easeInOut"
          }}
        >
          {text}
        </motion.div>
      ))}
    </div>
  );
};

// Enhanced Role Card with 3D Effects and Advanced Animations
const RoleCard = ({ role, isSelected, onSelect }: any) => {
  const { id, title, description, icon: Icon, gradient } = role;
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useTransform(mouseY, [-100, 100], [10, -10]);
  const rotateY = useTransform(mouseX, [-100, 100], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };
  
  return (
    <motion.div
      ref={cardRef}
      className="relative"
      style={{ 
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
      }}
      whileHover={{ 
        scale: 1.05, 
        y: -10,
        z: 50,
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 100, rotateX: -30 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ 
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: role.delay 
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Card 
        className={`cursor-pointer transition-all duration-700 overflow-hidden group relative border-2 ${
          isSelected 
            ? 'ring-4 ring-blue-400/60 ring-offset-4 shadow-2xl scale-105 border-blue-400/50' 
            : 'hover:shadow-2xl border-white/20 hover:border-blue-300/40'
        }`}
        onClick={() => onSelect(id)}
      >
        {/* Animated Background Layers */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5 group-hover:opacity-15 transition-opacity duration-500`} />
        
        {/* Dynamic Mesh Background */}
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            background: [
              `radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)`,
              `radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)`,
              `radial-gradient(circle at 50% 20%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)`,
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Selection Indicator with Enhanced Animation */}
        <AnimatePresence>
          {isSelected && (
            <motion.div
              className="absolute top-4 right-4 z-20"
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0, rotate: 180, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <motion.div 
                className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl relative overflow-hidden"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(59, 130, 246, 0.6)",
                    "0 0 30px rgba(139, 92, 246, 0.8)",
                    "0 0 20px rgba(59, 130, 246, 0.6)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="text-white font-bold text-sm"
                >
                  ✓
                </motion.div>
                
                {/* Sparkle Burst Effect */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{
                      left: '50%',
                      top: '50%',
                    }}
                    animate={{
                      x: Math.cos((i * Math.PI * 2) / 6) * 20,
                      y: Math.sin((i * Math.PI * 2) / 6) * 20,
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: 1,
                      delay: 0.3,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <CardHeader className="relative z-10">
          <div className="flex items-center space-x-4">
            <motion.div
              className={`p-4 rounded-2xl bg-gradient-to-br ${gradient} shadow-xl relative overflow-hidden`}
              whileHover={{ 
                rotate: [0, -10, 10, 0], 
                scale: 1.1,
                rotateY: 15,
              }}
              transition={{ 
                type: "spring", 
                stiffness: 300,
                duration: 0.6
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <Icon className="h-7 w-7 text-white drop-shadow-lg relative z-10" />
              
              {/* Icon Background Glow */}
              <motion.div
                className="absolute inset-0 bg-white/20 rounded-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
            
            <div className="flex-1">
              <CardTitle className="text-lg gradient-text font-bold mb-1">
                {title}
              </CardTitle>
              <motion.div
                className="h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: isSelected ? '100%' : '60%' }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="relative z-10">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </CardContent>

        {/* Advanced Hover Effects */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/10 to-cyan-500/5"
          initial={{ x: '-100%', opacity: 0 }}
          whileHover={{ x: '0%', opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />

        {/* Corner Accent Lines */}
        <motion.div
          className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-400/40"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: isSelected ? 1 : 0, opacity: isSelected ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-purple-400/40"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: isSelected ? 1 : 0, opacity: isSelected ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        />
      </Card>
    </motion.div>
  );
};

// Enhanced Typing Animation Component
const TypingAnimation = ({ text, className = "" }: { text: string; className?: string }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return (
    <span className={className}>
      {displayText}
      <motion.span
        className="inline-block ml-1"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        |
      </motion.span>
    </span>
  );
};

export function LoginPage({ onLogin, isDarkMode, setIsDarkMode }: LoginPageProps) {
  const [selectedRole, setSelectedRole] = useState<'mentor' | 'student' | 'parent' | 'gfm' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Auto-show form after role selection
  useEffect(() => {
    if (selectedRole) {
      const timer = setTimeout(() => setShowForm(true), 800);
      return () => clearTimeout(timer);
    } else {
      setShowForm(false);
    }
  }, [selectedRole]);

  const handleLogin = async () => {
    if (!selectedRole) return;
    
    setIsLoading(true);
    
    try {
      const email = (document.getElementById('email') as HTMLInputElement)?.value || 'demo@educare.ai';
      const password = (document.getElementById('password') as HTMLInputElement)?.value || 'demo123';
      
      if (email === 'demo@educare.ai' && password === 'demo123') {
        await new Promise(resolve => setTimeout(resolve, 2500));
        
        localStorage.setItem('educare_demo_mode', 'true');
        localStorage.setItem('educare_demo_role', selectedRole);
        localStorage.setItem('educare_demo_user', JSON.stringify({
          id: 'demo-user-' + selectedRole,
          email: email,
          role: selectedRole,
          name: selectedRole === 'mentor' ? 'Dr. Sarah Wilson' : 
                selectedRole === 'student' ? 'Neha Gupta' : 
                selectedRole === 'gfm' ? 'Prof. Anita Sharma' : 'Rajesh Gupta',
          demo: true
        }));
        
        onLogin(selectedRole);
        return;
      }

      const { signIn } = await import('../utils/supabase/client');
      const { data, error } = await signIn(email, password);
      
      if (error) {
        throw error;
      }
      
      onLogin(selectedRole);
    } catch (error: any) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const roles = [
    {
      id: 'mentor' as const,
      title: 'Mentor/Admin',
      description: 'Access comprehensive analytics and student management tools with advanced AI insights',
      icon: Shield,
      gradient: 'from-blue-500 via-blue-600 to-purple-600',
      delay: 0.2
    },
    {
      id: 'student' as const,
      title: 'Student',
      description: 'Track your progress, access personalized support, and connect with wellness resources',
      icon: GraduationCap,
      gradient: 'from-purple-500 via-purple-600 to-pink-600',
      delay: 0.4
    },
    {
      id: 'parent' as const,
      title: 'Parent/Guardian',
      description: 'Monitor and support your child\'s educational journey with real-time updates',
      icon: UserCheck,
      gradient: 'from-cyan-500 via-cyan-600 to-teal-600',
      delay: 0.6
    },
    {
      id: 'gfm' as const,
      title: 'Class Teacher/GFM',
      description: 'Upload student data, track academic progress, and manage classroom analytics',
      icon: BookOpenCheck,
      gradient: 'from-green-500 via-green-600 to-emerald-600',
      delay: 0.8
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced Animated Background with Layers */}
      <motion.div 
        className="absolute inset-0"
        animate={{
          background: [
            'linear-gradient(135deg, #f0f9ff 0%, #fafbff 50%, #faf5ff 100%)',
            'linear-gradient(135deg, #eff6ff 0%, #f8fafc 50%, #f3e8ff 100%)',
            'linear-gradient(135deg, #f0f9ff 0%, #fafbff 50%, #faf5ff 100%)',
          ]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Dark mode overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"
        initial={{ opacity: isDarkMode ? 1 : 0 }}
        animate={{ opacity: isDarkMode ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Floating Particles */}
      <LoginParticles />
      
      {/* Geometric Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              width: `${300 + i * 200}px`,
              height: `${300 + i * 200}px`,
              background: `linear-gradient(135deg, ${
                i === 0 ? '#3b82f6' : i === 1 ? '#8b5cf6' : '#06b6d4'
              } 0%, transparent 70%)`,
              left: `${20 + i * 30}%`,
              top: `${10 + i * 20}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 15 + i * 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2,
            }}
          />
        ))}
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <motion.div
          className="w-full max-w-5xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Header Section with Enhanced Animations */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <AnimatedLogo />
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8, type: "spring" }}
            >
              <h1 className="text-6xl font-bold gradient-text mb-6">
                <TypingAnimation text="EduCare AI" className="inline-block" />
              </h1>
            </motion.div>
            
            <motion.p 
              className="text-2xl text-muted-foreground mb-4 font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
            >
              Student Retention Management System
            </motion.p>
            
            <motion.div
              className="flex flex-wrap justify-center gap-3 mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2, duration: 0.6 }}
            >
              {[
                { icon: Sparkles, text: "AI-Powered Analytics", gradient: "from-blue-500 to-purple-600" },
                { icon: Heart, text: "Mental Health Support", gradient: "from-purple-500 to-pink-600" },
                { icon: Users, text: "Collaborative Learning", gradient: "from-cyan-500 to-teal-600" },
              ].map((badge, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2.2 + i * 0.2 }}
                >
                  <Badge className={`bg-gradient-to-r ${badge.gradient} text-white border-none px-4 py-2 text-sm font-medium`}>
                    <badge.icon className="h-4 w-4 mr-2" />
                    {badge.text}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Enhanced Dark Mode Toggle */}
          <motion.div 
            className="absolute top-6 right-6"
            initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{ delay: 1, type: "spring", stiffness: 200 }}
          >
            <motion.div 
              className="flex items-center space-x-3 glass-morphism p-4 rounded-2xl border border-white/20 shadow-xl"
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                animate={{ rotate: isDarkMode ? 0 : 360 }}
                transition={{ duration: 0.5 }}
              >
                <Sun className="h-5 w-5 text-yellow-500" />
              </motion.div>
              
              <motion.div
                whileTap={{ scale: 0.9 }}
              >
                <Switch
                  checked={isDarkMode}
                  onCheckedChange={setIsDarkMode}
                  className="data-[state=checked]:bg-purple-600"
                />
              </motion.div>
              
              <motion.div
                animate={{ rotate: isDarkMode ? 360 : 0 }}
                transition={{ duration: 0.5 }}
              >
                <Moon className="h-5 w-5 text-blue-500" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Role Selection with Enhanced Layout */}
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <motion.h2 
              className="text-3xl font-bold text-center mb-12 gradient-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              Choose Your Role
              <motion.div
                className="mx-auto mt-4 h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '100px' }}
                transition={{ delay: 1.5, duration: 1, ease: "easeOut" }}
              />
            </motion.h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {roles.map((role) => (
                <RoleCard
                  key={role.id}
                  role={role}
                  isSelected={selectedRole === role.id}
                  onSelect={setSelectedRole}
                />
              ))}
            </div>
          </motion.div>

          {/* Enhanced Login Form */}
          <AnimatePresence>
            {selectedRole && showForm && (
              <motion.div
                initial={{ opacity: 0, y: 80, scale: 0.9, rotateX: -20 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                exit={{ opacity: 0, y: 80, scale: 0.9, rotateX: 20 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 200, 
                  damping: 25,
                  duration: 0.8
                }}
                style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
              >
                <Card className="max-w-lg mx-auto glass-morphism border-white/30 shadow-2xl relative overflow-hidden">
                  {/* Card Background Animation */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5"
                    animate={{
                      background: [
                        'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(139, 92, 246, 0.05) 50%, rgba(6, 182, 212, 0.05) 100%)',
                        'linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(6, 182, 212, 0.05) 50%, rgba(59, 130, 246, 0.05) 100%)',
                        'linear-gradient(135deg, rgba(6, 182, 212, 0.05) 0%, rgba(59, 130, 246, 0.05) 50%, rgba(139, 92, 246, 0.05) 100%)',
                      ]
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />

                  <CardHeader className="relative z-10">
                    <motion.div
                      className="text-center"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <CardTitle className="text-2xl gradient-text font-bold flex items-center justify-center gap-3 mb-4">
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 2, ease: "linear" }}
                        >
                          <Lock className="h-6 w-6" />
                        </motion.div>
                        Welcome Back!
                      </CardTitle>
                      
                      <motion.p 
                        className="text-muted-foreground mb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        Logging in as <span className="font-semibold text-primary">{selectedRole}</span>
                      </motion.p>
                      
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Button
                          variant="ghost"
                          onClick={() => setShowCredentials(!showCredentials)}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors group"
                        >
                          <motion.div
                            animate={{ rotate: showCredentials ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="mr-2"
                          >
                            <ChevronDown className="h-4 w-4" />
                          </motion.div>
                          {showCredentials ? 'Hide' : 'Show'} Demo Credentials
                        </Button>
                      </motion.div>
                    </motion.div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6 relative z-10">
                    {/* Demo Credentials with Enhanced Animation */}
                    <AnimatePresence>
                      {showCredentials && (
                        <motion.div
                          initial={{ height: 0, opacity: 0, y: -20 }}
                          animate={{ height: 'auto', opacity: 1, y: 0 }}
                          exit={{ height: 0, opacity: 0, y: -20 }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <motion.div
                            className="bg-gradient-to-r from-blue-50 via-purple-50 to-cyan-50 dark:from-blue-950/50 dark:via-purple-950/50 dark:to-cyan-950/50 p-6 rounded-xl border border-blue-200/50 dark:border-blue-800/50 relative overflow-hidden"
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            {/* Animated Background Pattern */}
                            <motion.div
                              className="absolute inset-0 opacity-20"
                              style={{
                                backgroundImage: `radial-gradient(circle at 25% 25%, #3b82f6 1px, transparent 1px), radial-gradient(circle at 75% 75%, #8b5cf6 1px, transparent 1px)`,
                                backgroundSize: '20px 20px',
                              }}
                              animate={{
                                backgroundPosition: ['0px 0px', '20px 20px'],
                              }}
                              transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "linear"
                              }}
                            />
                            
                            <div className="relative z-10">
                              <div className="flex items-center mb-3">
                                <motion.div
                                  animate={{ rotate: [0, 360] }}
                                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                >
                                  <Key className="h-5 w-5 mr-3 text-blue-600" />
                                </motion.div>
                                <span className="font-semibold text-blue-800 dark:text-blue-200">Demo Credentials:</span>
                              </div>
                              <div className="space-y-2 text-sm">
                                <div className="flex items-center justify-between p-2 bg-white/50 dark:bg-black/20 rounded-lg">
                                  <span className="text-muted-foreground">Email:</span>
                                  <span className="font-mono font-medium">demo@educare.ai</span>
                                </div>
                                <div className="flex items-center justify-between p-2 bg-white/50 dark:bg-black/20 rounded-lg">
                                  <span className="text-muted-foreground">Password:</span>
                                  <span className="font-mono font-medium">demo123</span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Enhanced Form Fields */}
                    <motion.div 
                      className="space-y-5"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                        <motion.div
                          whileFocus={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          className="relative"
                        >
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            defaultValue="demo@educare.ai"
                            className="bg-white/70 dark:bg-black/20 backdrop-blur-sm border-white/30 dark:border-gray-700/50 h-12 pl-4 pr-4 rounded-lg focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                          />
                          <motion.div
                            className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 pointer-events-none opacity-0"
                            whileFocus={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                          />
                        </motion.div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                        <motion.div
                          whileFocus={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          className="relative"
                        >
                          <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            defaultValue="demo123"
                            className="bg-white/70 dark:bg-black/20 backdrop-blur-sm border-white/30 dark:border-gray-700/50 h-12 pl-4 pr-4 rounded-lg focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                          />
                          <motion.div
                            className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 pointer-events-none opacity-0"
                            whileFocus={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                          />
                        </motion.div>
                      </div>
                    </motion.div>
                    
                    {/* Enhanced Login Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={handleLogin}
                        disabled={isLoading}
                        className="w-full h-14 bg-gradient-to-r from-blue-500 via-purple-600 to-cyan-500 hover:from-blue-600 hover:via-purple-700 hover:to-cyan-600 text-white border-none shadow-xl relative overflow-hidden group text-lg font-semibold"
                      >
                        <AnimatePresence mode="wait">
                          {isLoading ? (
                            <motion.div
                              key="loading"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              className="flex items-center space-x-3"
                            >
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              >
                                <Zap className="h-5 w-5" />
                              </motion.div>
                              <span>Authenticating...</span>
                              <div className="flex space-x-1">
                                {[...Array(3)].map((_, i) => (
                                  <motion.div
                                    key={i}
                                    className="w-2 h-2 bg-white rounded-full"
                                    animate={{
                                      scale: [0.8, 1.2, 0.8],
                                      opacity: [0.5, 1, 0.5],
                                    }}
                                    transition={{
                                      duration: 1,
                                      repeat: Infinity,
                                      delay: i * 0.2,
                                    }}
                                  />
                                ))}
                              </div>
                            </motion.div>
                          ) : (
                            <motion.div
                              key="login"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 20 }}
                              className="flex items-center justify-center space-x-3"
                            >
                              <span>Login as {selectedRole}</span>
                              <motion.div
                                animate={{ x: [0, 8, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              >
                                <ArrowRight className="h-5 w-5" />
                              </motion.div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Multiple Shimmer Effects */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          animate={{ x: ['-100%', '100%'] }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity, 
                            repeatDelay: 3,
                            ease: "easeInOut"
                          }}
                          style={{ transform: 'skewX(-45deg)' }}
                        />
                        
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent"
                          animate={{ x: ['-100%', '100%'] }}
                          transition={{ 
                            duration: 2.5, 
                            repeat: Infinity, 
                            repeatDelay: 4,
                            ease: "easeInOut",
                            delay: 1.5
                          }}
                          style={{ transform: 'skewX(45deg)' }}
                        />
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Enhanced Footer */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <motion.div 
              className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 1.7 }}
            >
              {[
                { icon: Heart, text: "Mental Health Support", color: "text-red-500" },
                { icon: Users, text: "Collaborative Learning", color: "text-blue-500" },
                { icon: Sparkles, text: "AI Analytics", color: "text-purple-500" },
                { icon: Shield, text: "Secure & Private", color: "text-green-500" },
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  className="flex items-center space-x-2 group cursor-pointer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8 + i * 0.1 }}
                >
                  <motion.div
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.5,
                      ease: "easeInOut"
                    }}
                  >
                    <item.icon className={`h-4 w-4 ${item.color} group-hover:scale-110 transition-transform`} />
                  </motion.div>
                  <span className="group-hover:text-foreground transition-colors">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}