import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { LoginPage } from './components/login-page';
import { MentorDashboard } from './components/mentor-dashboard';
import { StudentDashboard } from './components/student-dashboard';
import { ParentDashboard } from './components/parent-dashboard';
import { GFMDashboard } from './components/gfm-dashboard';
import { MentalHealthChatbot } from './components/mental-health-chatbot';
import { AnonymousCounseling } from './components/anonymous-counseling';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { 
  LogOut, 
  Settings, 
  Bell, 
  MessageCircle, 
  Heart, 
  User,
  Shield,
  GraduationCap,
  UserCheck,
  Users,
  Menu,
  X,
  Sparkles,
  Zap,
  Star,
  Lock
} from 'lucide-react';
import { Toaster } from './components/ui/sonner';

type UserRole = 'mentor' | 'student' | 'parent' | 'gfm';
type AppView = 'dashboard' | 'chat' | 'anonymous-counseling' | 'settings';

// Floating Particles Component
const FloatingParticles: React.FC = () => {
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const createParticle = () => {
      if (!particlesRef.current) return;

      const particle = document.createElement('div');
      particle.className = 'particle animate-particle-float';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 2 + 's';
      particle.style.animationDuration = (Math.random() * 8 + 12) + 's';
      
      particlesRef.current.appendChild(particle);

      setTimeout(() => {
        if (particle && particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 20000);
    };

    const interval = setInterval(createParticle, 1000);
    return () => clearInterval(interval);
  }, []);

  return <div ref={particlesRef} className="floating-particles" />;
};

// Animated Background Blob
const BackgroundBlob: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        className="absolute -top-1/2 -right-1/2 w-full h-full opacity-30"
        animate={{
          background: [
            'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
            'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
            'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          clipPath: 'circle(50% at 70% 30%)',
          filter: 'blur(60px)',
        }}
      />
      <motion.div
        className="absolute -bottom-1/2 -left-1/2 w-full h-full opacity-20"
        animate={{
          background: [
            'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
            'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)',
            'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        style={{
          clipPath: 'circle(40% at 20% 80%)',
          filter: 'blur(80px)',
        }}
      />
    </div>
  );
};

// Morphing Logo Component
const MorphingLogo: React.FC<{ role: UserRole }> = ({ role }) => {
  const variants = {
    initial: { scale: 0, rotate: -180 },
    animate: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    },
    hover: { 
      scale: 1.1, 
      rotate: 360,
      boxShadow: "0 0 30px rgba(59, 130, 246, 0.6)",
      transition: { duration: 0.6 }
    }
  };

  const getRoleGradient = (role: UserRole) => {
    switch (role) {
      case 'mentor': return 'from-blue-500 via-purple-500 to-blue-600';
      case 'student': return 'from-purple-500 via-pink-500 to-purple-600';
      case 'parent': return 'from-blue-500 via-cyan-500 to-teal-600';
      case 'gfm': return 'from-green-500 via-emerald-500 to-green-600';
    }
  };

  return (
    <motion.div
      className={`relative w-12 h-12 bg-gradient-to-br ${getRoleGradient(role)} rounded-2xl shadow-lg overflow-hidden`}
      variants={variants}
      initial="initial"
      animate="animate"
      whileHover="hover"
    >
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm" />
      <div className="relative z-10 flex items-center justify-center h-full text-white">
        {role === 'mentor' && <Shield className="h-6 w-6" />}
        {role === 'student' && <GraduationCap className="h-6 w-6" />}
        {role === 'parent' && <UserCheck className="h-6 w-6" />}
        {role === 'gfm' && <Users className="h-6 w-6" />}
      </div>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        style={{ transform: 'skewX(-45deg)' }}
      />
    </motion.div>
  );
};

// Animated Navigation Item
const NavItem: React.FC<{
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  badge?: number;
}> = ({ active, onClick, icon, label, badge }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        variant={active ? 'default' : 'ghost'}
        onClick={onClick}
        className={`relative overflow-hidden group ${
          active 
            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl' 
            : 'hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-950 dark:hover:to-purple-950'
        }`}
      >
        <div className="flex items-center space-x-2 relative z-10">
          <motion.div
            animate={active ? { rotate: [0, 360] } : {}}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {icon}
          </motion.div>
          <span>{label}</span>
          {badge && badge > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.2 }}
            >
              <Badge variant="destructive" className="ml-1 px-1 text-xs animate-pulse">
                {badge}
              </Badge>
            </motion.div>
          )}
        </div>
        {!active && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"
            initial={{ x: '-100%' }}
            whileHover={{ x: '0%' }}
            transition={{ duration: 0.3 }}
          />
        )}
      </Button>
    </motion.div>
  );
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('student');
  const [currentView, setCurrentView] = useState<AppView>('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications] = useState(12);
  const [isDemoMode, setIsDemoMode] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const headerY = useTransform(scrollY, [0, 100], [0, -10]);
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.95]);

  // Check for demo mode on component mount
  useEffect(() => {
    const demoMode = localStorage.getItem('educare_demo_mode') === 'true';
    setIsDemoMode(demoMode);
  }, [isLoggedIn]);

  // Apply dark mode to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    try {
      const isDemoMode = localStorage.getItem('educare_demo_mode') === 'true';
      
      if (isDemoMode) {
        localStorage.removeItem('educare_demo_mode');
        localStorage.removeItem('educare_demo_role');
        localStorage.removeItem('educare_demo_user');
      } else {
        const { signOut } = await import('./utils/supabase/client');
        const { error } = await signOut();
        
        if (error) {
          console.error('Logout error:', error);
        }
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggedIn(false);
      setCurrentView('dashboard');
      setIsMobileMenuOpen(false);
    }
  };

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case 'mentor': return 'Mentor/Admin';
      case 'student': return 'Student';
      case 'parent': return 'Parent/Guardian';
      case 'gfm': return 'Class Teacher/GFM';
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="relative min-h-screen">
        <BackgroundBlob />
        <FloatingParticles />
        <LoginPage 
          onLogin={handleLogin} 
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
        />
        <Toaster />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative min-h-screen bg-background overflow-hidden">
      <BackgroundBlob />
      <FloatingParticles />
      
      {/* Navigation Header */}
      <motion.header
        style={{ y: headerY, opacity: headerOpacity }}
        className="sticky top-0 z-50 w-full glass-morphism border-b border-white/20"
      >
        <div className="container mx-auto flex h-20 items-center justify-between px-6">
          {/* Logo and Role */}
          <motion.div 
            className="flex items-center space-x-4"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <MorphingLogo role={userRole} />
            <div>
              <div className="flex items-center space-x-3">
                <motion.h1 
                  className="text-2xl gradient-text font-bold"
                  animate={{ 
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] 
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                >
                  EduCare AI
                </motion.h1>
                {isDemoMode && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.5, type: "spring" }}
                  >
                    <Badge variant="secondary" className="text-xs bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 animate-pulse">
                      <Sparkles className="h-3 w-3 mr-1" />
                      DEMO
                    </Badge>
                  </motion.div>
                )}
              </div>
              <motion.p 
                className="text-sm text-muted-foreground font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {getRoleLabel(userRole)}
              </motion.p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav 
            className="hidden md:flex items-center space-x-2"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, staggerChildren: 0.1 }}
          >
            <NavItem
              active={currentView === 'dashboard'}
              onClick={() => setCurrentView('dashboard')}
              icon={<User className="h-4 w-4" />}
              label="Dashboard"
            />
            
            <NavItem
              active={currentView === 'chat'}
              onClick={() => setCurrentView('chat')}
              icon={<Heart className="h-4 w-4" />}
              label="Wellness Chat"
            />

            <NavItem
              active={false}
              onClick={() => {}}
              icon={<Bell className="h-4 w-4" />}
              label="Notifications"
              badge={notifications}
            />
          </motion.nav>

          {/* Right Side Actions */}
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.3 }}>
              <Button variant="ghost" size="sm" className="hover-glow">
                <Settings className="h-4 w-4" />
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200 hover:from-red-100 hover:to-orange-100 dark:from-red-950 dark:to-orange-950 dark:border-red-800"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </motion.div>

            {/* Mobile Menu Toggle */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <motion.div
                  animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </motion.div>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="md:hidden glass-morphism border-t border-white/20"
            >
              <div className="container mx-auto p-4 space-y-2">
                <NavItem
                  active={currentView === 'dashboard'}
                  onClick={() => {
                    setCurrentView('dashboard');
                    setIsMobileMenuOpen(false);
                  }}
                  icon={<User className="h-4 w-4" />}
                  label="Dashboard"
                />
                
                <NavItem
                  active={currentView === 'chat'}
                  onClick={() => {
                    setCurrentView('chat');
                    setIsMobileMenuOpen(false);
                  }}
                  icon={<Heart className="h-4 w-4" />}
                  label="Wellness Chat"
                />

                <NavItem
                  active={false}
                  onClick={() => {}}
                  icon={<Bell className="h-4 w-4" />}
                  label="Notifications"
                  badge={notifications}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 min-h-screen pt-4">
        <AnimatePresence mode="wait">
          {currentView === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, scale: 0.95, rotateX: 10 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, scale: 1.05, rotateX: -10 }}
              transition={{ 
                duration: 0.6, 
                ease: [0.4, 0, 0.2, 1],
                staggerChildren: 0.1 
              }}
              style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
            >
              {userRole === 'mentor' && <MentorDashboard />}
              {userRole === 'student' && <StudentDashboard />}
              {userRole === 'parent' && <ParentDashboard />}
              {userRole === 'gfm' && <GFMDashboard />}
            </motion.div>
          )}

          {currentView === 'chat' && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, scale: 0.95, rotateX: -10 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, scale: 1.05, rotateX: 10 }}
              transition={{ 
                duration: 0.6, 
                ease: [0.4, 0, 0.2, 1] 
              }}
              style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
            >
              <MentalHealthChatbot 
                userRole={userRole}
                onNavigateToAnonymousCounseling={() => setCurrentView('anonymous-counseling')}
              />
            </motion.div>
          )}

          {currentView === 'anonymous-counseling' && (
            <motion.div
              key="anonymous-counseling"
              initial={{ opacity: 0, scale: 0.95, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 1.05, x: -50 }}
              transition={{ 
                duration: 0.6, 
                ease: [0.4, 0, 0.2, 1] 
              }}
            >
              <AnonymousCounseling />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Action Button with Magic Animation */}
      <motion.div
        className="fixed bottom-8 right-8 z-50"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          delay: 1, 
          type: "spring", 
          stiffness: 200,
          damping: 15
        }}
      >
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          animate={{ 
            boxShadow: [
              "0 0 20px rgba(59, 130, 246, 0.4)",
              "0 0 40px rgba(139, 92, 246, 0.6)",
              "0 0 20px rgba(59, 130, 246, 0.4)"
            ]
          }}
          transition={{ 
            boxShadow: { duration: 2, repeat: Infinity },
            hover: { duration: 0.2 }
          }}
        >
          <Button
            onClick={() => {
              if (currentView === 'anonymous-counseling') {
                setCurrentView('chat');
              } else if (currentView === 'chat') {
                setCurrentView('dashboard');
              } else {
                setCurrentView('chat');
              }
            }}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-2xl border-2 border-white/20 relative overflow-hidden group"
          >
            <motion.div
              className="relative z-10 text-white"
              animate={{ rotate: currentView !== 'dashboard' ? 360 : 0 }}
              transition={{ duration: 0.5 }}
            >
              {currentView === 'anonymous-counseling' ? (
                <Heart className="h-7 w-7" />
              ) : currentView === 'chat' ? (
                <User className="h-7 w-7" />
              ) : (
                <MessageCircle className="h-7 w-7" />
              )}
            </motion.div>
            
            {/* Sparkle Effects */}
            <motion.div
              className="absolute top-2 right-2"
              animate={{ 
                scale: [0, 1, 0],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                delay: 0.5
              }}
            >
              <Star className="h-3 w-3 text-yellow-300" />
            </motion.div>
            
            <motion.div
              className="absolute bottom-2 left-2"
              animate={{ 
                scale: [0, 1, 0],
                rotate: [360, 180, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                delay: 1
              }}
            >
              <Zap className="h-3 w-3 text-cyan-300" />
            </motion.div>

            {/* Magical Shimmer Effect */}
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
          </Button>
        </motion.div>
      </motion.div>

      <Toaster />
    </div>
  );
}