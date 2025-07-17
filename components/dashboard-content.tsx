"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ThemeProvider } from "@/components/theme-provider";
import { Sidebar } from "@/components/sidebar";
import { MainContent } from "@/components/main-content";
import { TopNavigation } from "@/components/top-navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { getSessionPath } from "@/lib/route-utils";

interface SessionRoute {
  day: number;
  session: number;
}

interface DashboardContentProps {
  initialSession: SessionRoute;
}

export function DashboardContent({ initialSession }: DashboardContentProps) {
  const router = useRouter();
  const [activeSession, setActiveSession] = useState<SessionRoute>(initialSession);
  const [openDays, setOpenDays] = useState<number[]>([initialSession.day]);
  const [refreshSidebar, setRefreshSidebar] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const isMobile = useIsMobile();

  // Update active session when route changes
  useEffect(() => {
    setActiveSession(initialSession);
    if (!openDays.includes(initialSession.day)) {
      setOpenDays(prev => [...prev, initialSession.day]);
    }
  }, [initialSession, openDays]);

  const toggleDay = (dayNumber: number) => {
    setOpenDays((prev) => 
      prev.includes(dayNumber) 
        ? prev.filter((d) => d !== dayNumber) 
        : [...prev, dayNumber]
    );
  };

  const selectSession = (day: number, session: number) => {
    const path = getSessionPath(day, session);
    router.push(path);
  };

  const handleSessionComplete = (day: number, session: number) => {
    // Force sidebar refresh to update completion status
    setRefreshSidebar(prev => prev + 1);
  };

  // Handle sidebar toggle
  const toggleSidebar = useCallback(() => {
    if (isMobile) {
      setSidebarOpen(!sidebarOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  }, [isMobile, sidebarOpen, sidebarCollapsed]);

  // Auto-close sidebar on mobile when selecting a session
  const handleSelectSession = (day: number, session: number) => {
    selectSession(day, session);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  // Initialize sidebar state based on screen size
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
      setSidebarCollapsed(false);
    } else {
      setSidebarOpen(true);
      setSidebarCollapsed(false);
    }
  }, [isMobile]);

  // Keyboard shortcut for sidebar toggle
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobile, sidebarOpen, sidebarCollapsed, toggleSidebar]);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-background">
        <TopNavigation onToggleSidebar={toggleSidebar} />
        <div className="flex">
          <Sidebar
            activeSession={activeSession}
            openDays={openDays}
            onToggleDay={toggleDay}
            onSelectSession={handleSelectSession}
            refreshKey={refreshSidebar}
            isOpen={sidebarOpen}
            isCollapsed={sidebarCollapsed}
            isMobile={isMobile}
            onClose={() => setSidebarOpen(false)}
          />
          <MainContent 
            activeSession={activeSession} 
            onSessionComplete={handleSessionComplete}
            sidebarCollapsed={sidebarCollapsed}
            isMobile={isMobile}
          />
        </div>
      </div>
    </ThemeProvider>
  );
}
