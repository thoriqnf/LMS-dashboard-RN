"use client";

import {
  ChevronDown,
  ChevronRight,
  Code,
  Users,
  Award,
  FileText,
  BarChart3,
  Trophy,
  CheckCircle,
  Circle,
  Lock,
  GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";

interface SidebarProps {
  activeSession: { day: number; session: number };
  openDays: number[];
  onToggleDay: (day: number) => void;
  onSelectSession: (day: number, session: number) => void;
  refreshKey?: number;
  isOpen: boolean;
  isCollapsed: boolean;
  isMobile: boolean;
  onClose: () => void;
}

const courseStructure = [
  {
    day: 1,
    title: "React Foundation",
    icon: Code,
    sessions: [
      "React Introduction",
      "React Component Hierarchy",
      "State & Events",
    ],
  },
  {
    day: 2,
    title: "React Hooks & State",
    icon: BarChart3,
    sessions: [
      "React Effect",
      "React Effect Lifecycle",
      "React Callback",
      "React Form Handling",
    ],
  },
  {
    day: 3,
    title: "Data Management & APIs",
    icon: FileText,
    sessions: [
      "React Routing",
      "React Custom Hooks",
      "React Context API",
      "React Context Authentication",
    ],
  },
  {
    day: 4,
    title: "State management",
    icon: Users,
    sessions: ["React Redux", "React Zustand", "Tailwind"],
  },
  {
    day: 5,
    title: "Performance & Production",
    icon: Award,
    sessions: [
      "Loading States & Skeletons",
      "Web Storage",
      "Performance Optimization",
      "Unit Testing",
    ],
  },
  {
    day: 6,
    title: "Next.js Fundamentals",
    icon: GraduationCap,
    sessions: [
      "Next.js Introduction & Setup",
      "App Router & Routing",
      "Server Components & Data Fetching",
    ],
  },
  {
    day: 7,
    title: "Next.js API Routes & Serverless Functions",
    icon: Code,
    sessions: [
      "API Route Handlers Fundamentals",
      "CRUD Operations & Database Integration",
      "Advanced API Features & Best Practices",
    ],
  },
];

export function Sidebar({
  activeSession,
  openDays,
  onToggleDay,
  onSelectSession,
  refreshKey,
  isOpen,
  isCollapsed,
  isMobile,
  onClose,
}: SidebarProps) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [completedSessions, setCompletedSessions] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    // Load admin status and completed sessions from localStorage
    const adminStatus = localStorage.getItem("lms-admin") === "true";
    const completed = JSON.parse(localStorage.getItem("lms-completed") || "[]");
    setIsAdmin(adminStatus);
    setCompletedSessions(new Set(completed));

    // Admin toggle shortcut: Ctrl+Shift+A
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "A") {
        e.preventDefault();
        const newAdminStatus = !adminStatus;
        setIsAdmin(newAdminStatus);
        localStorage.setItem("lms-admin", newAdminStatus.toString());
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [refreshKey]);

  const toggleCompletion = (day: number, session: number) => {
    if (!isAdmin) return;

    const sessionKey = `${day}-${session}`;
    const newCompleted = new Set(completedSessions);

    if (newCompleted.has(sessionKey)) {
      newCompleted.delete(sessionKey);
    } else {
      newCompleted.add(sessionKey);
    }

    setCompletedSessions(newCompleted);
    localStorage.setItem(
      "lms-completed",
      JSON.stringify(Array.from(newCompleted))
    );
  };

  const isSessionCompleted = (day: number, session: number) => {
    return completedSessions.has(`${day}-${session}`);
  };

  const isSessionUnlocked = (day: number, session: number) => {
    // All sessions are now unlocked
    return true;
  };

  const getDayProgress = (day: number) => {
    const dayData = courseStructure.find((d) => d.day === day);
    if (!dayData) return 0;

    const totalSessions = dayData.sessions.length + 1; // +1 for challenge
    let completedCount = 0;

    // Count completed regular sessions
    for (let i = 1; i <= dayData.sessions.length; i++) {
      if (isSessionCompleted(day, i)) completedCount++;
    }

    // Count completed challenge
    if (isSessionCompleted(day, 5)) completedCount++;

    return Math.round((completedCount / totalSessions) * 100);
  };

  const selectChallenge = (day: number) => {
    onSelectSession(day, 5); // Challenge is session 5
  };

  // Sidebar content component
  const SidebarContent = () => (
    <div
      className={cn(
        "border-r bg-gradient-to-b from-background to-muted/20 transition-all duration-300 ease-in-out",
        isCollapsed && !isMobile ? "w-20" : "w-80"
      )}
    >
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className={cn("p-4", isCollapsed && !isMobile && "px-3")}>
          {/* Logo and title when collapsed */}
          {isCollapsed && !isMobile && (
            <div className="flex flex-col items-center mb-6 space-y-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 shadow-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div className="text-xs font-medium text-muted-foreground text-center">
                React Course
              </div>
            </div>
          )}

          {/* Admin notification - only show when not collapsed */}
          {isAdmin && !isCollapsed && (
            <div className="mb-4 p-3 bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl border border-orange-200 dark:border-orange-800 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <div className="h-2 w-2 bg-orange-500 rounded-full animate-pulse"></div>
                <p className="text-xs text-orange-800 dark:text-orange-200 font-semibold">
                  Admin Mode Active
                </p>
              </div>
              <p className="text-xs text-orange-600 dark:text-orange-300">
                Click sessions to mark complete
              </p>
            </div>
          )}

          {/* Course Structure */}
          <div>
            {!isCollapsed && (
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-foreground mb-1">
                  Course Progress
                </h3>
                <p className="text-xs text-muted-foreground">
                  Track your React learning journey
                </p>
              </div>
            )}

            <div className="space-y-3">
              {courseStructure.map((day) => {
                const progress = getDayProgress(day.day);
                const isCurrentDay = activeSession.day === day.day;

                return (
                  <div
                    key={day.day}
                    className="rounded-xl border bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    {isCollapsed && !isMobile ? (
                      // Collapsed view - show numbered circles (monochrome)
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              className={cn(
                                "w-full h-14 p-2 flex flex-col items-center justify-center space-y-1 rounded-xl transition-all duration-200",
                                isCurrentDay &&
                                  "bg-primary/10 ring-2 ring-primary/20"
                              )}
                              onClick={() => onToggleDay(day.day)}
                            >
                              <div
                                className={cn(
                                  "h-8 w-8 rounded-lg flex items-center justify-center text-sm font-bold text-white shadow-sm bg-gradient-to-br from-slate-600 to-slate-700",
                                  isCurrentDay &&
                                    "scale-110 shadow-lg from-slate-700 to-slate-800"
                                )}
                              >
                                {day.day}
                              </div>
                              {progress > 0 && (
                                <div className="h-1 w-8 bg-muted rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-gradient-to-r from-slate-400 to-slate-500 transition-all duration-500"
                                    style={{ width: `${progress}%` }}
                                  />
                                </div>
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="right" className="max-w-xs">
                            <div className="text-center">
                              <p className="font-semibold">Day {day.day}</p>
                              <p className="text-sm text-muted-foreground">
                                {day.title}
                              </p>
                              <p className="text-xs mt-1">
                                {progress}% Complete
                              </p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      // Expanded view
                      <>
                        <Button
                          variant="ghost"
                          className={cn(
                            "w-full p-4 h-auto transition-all duration-200 rounded-xl",
                            isCurrentDay
                              ? "bg-primary/5 hover:bg-primary/10"
                              : "hover:bg-muted/50"
                          )}
                          onClick={() => onToggleDay(day.day)}
                        >
                          <div className="flex items-center w-full">
                            <div className="h-10 w-10 rounded-lg flex items-center justify-center text-sm font-bold text-white shadow-sm bg-gradient-to-br from-slate-600 to-slate-700 mr-3">
                              {day.day}
                            </div>
                            <div className="text-left flex-1">
                              <div className="font-semibold text-sm flex items-center gap-2">
                                Day {day.day}
                                {progress > 0 && (
                                  <Badge
                                    variant="secondary"
                                    className="text-xs px-2 py-0.5"
                                  >
                                    {progress}%
                                  </Badge>
                                )}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {day.title}
                              </div>
                              {progress > 0 && (
                                <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-gradient-to-r from-slate-400 to-slate-500 transition-all duration-500"
                                    style={{ width: `${progress}%` }}
                                  />
                                </div>
                              )}
                            </div>
                            <div className="ml-2">
                              {openDays.includes(day.day) ? (
                                <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                              ) : (
                                <ChevronRight className="h-4 w-4 transition-transform duration-200" />
                              )}
                            </div>
                          </div>
                        </Button>

                        {openDays.includes(day.day) && (
                          <div className="border-t bg-muted/10 animate-in slide-in-from-top-2 duration-200">
                            {/* Regular Sessions */}
                            {day.sessions.map((session, index) => {
                              const sessionNumber = index + 1;
                              const isUnlocked = isSessionUnlocked(
                                day.day,
                                sessionNumber
                              );
                              const isCompleted = isSessionCompleted(
                                day.day,
                                sessionNumber
                              );
                              const isActive =
                                activeSession.day === day.day &&
                                activeSession.session === sessionNumber;

                              return (
                                <Button
                                  key={index}
                                  variant="ghost"
                                  className={cn(
                                    "w-full justify-start p-3 h-auto text-left rounded-none relative transition-all duration-200",
                                    isActive
                                      ? "bg-primary/10 text-primary border-r-4 border-primary shadow-sm"
                                      : "hover:bg-muted/30",
                                    !isUnlocked &&
                                      "opacity-50 cursor-not-allowed",
                                    isCompleted &&
                                      !isActive &&
                                      "bg-green-50 dark:bg-green-950/20"
                                  )}
                                  onClick={() =>
                                    isUnlocked &&
                                    onSelectSession(day.day, sessionNumber)
                                  }
                                  disabled={!isUnlocked}
                                >
                                  <div className="flex items-center w-full">
                                    <div
                                      className={cn(
                                        "mr-3 flex h-7 w-7 items-center justify-center rounded-lg text-xs font-semibold transition-all duration-200",
                                        isActive
                                          ? "bg-primary text-primary-foreground shadow-sm"
                                          : isCompleted
                                          ? "bg-green-500 text-white"
                                          : isUnlocked
                                          ? "bg-slate-600 text-white"
                                          : "bg-muted/50 text-muted-foreground/50"
                                      )}
                                    >
                                      {isUnlocked ? (
                                        isCompleted ? (
                                          <CheckCircle className="h-4 w-4" />
                                        ) : (
                                          sessionNumber
                                        )
                                      ) : (
                                        <Lock className="h-3 w-3" />
                                      )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="font-medium text-sm flex items-center gap-2">
                                        Session {sessionNumber}
                                        {isCompleted && (
                                          <CheckCircle className="h-3 w-3 text-green-600" />
                                        )}
                                      </div>
                                      <div className="text-xs text-muted-foreground truncate">
                                        {session}
                                      </div>
                                    </div>
                                    {/* Admin Completion Toggle */}
                                    {isAdmin && (
                                      <div className="ml-2 flex-shrink-0">
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="h-6 w-6 p-0 hover:bg-transparent"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            toggleCompletion(
                                              day.day,
                                              sessionNumber
                                            );
                                          }}
                                        >
                                          {isCompleted ? (
                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                          ) : (
                                            <Circle className="h-4 w-4 text-muted-foreground" />
                                          )}
                                        </Button>
                                      </div>
                                    )}
                                  </div>
                                </Button>
                              );
                            })}

                            {/* Challenge Section */}
                            <Button
                              variant="ghost"
                              className={cn(
                                "w-full justify-start p-3 h-auto text-left rounded-none border-t bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 transition-all duration-200",
                                activeSession.day === day.day &&
                                  activeSession.session === 5
                                  ? "bg-primary/10 text-primary border-r-4 border-primary shadow-sm"
                                  : "hover:from-orange-100 hover:to-red-100 dark:hover:from-orange-900/30 dark:hover:to-red-900/30"
                              )}
                              onClick={() => selectChallenge(day.day)}
                            >
                              <div className="flex items-center w-full">
                                <div className="mr-3 flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-sm">
                                  <Trophy className="h-4 w-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium text-sm flex items-center gap-2">
                                    Challenge
                                    <Badge
                                      variant="secondary"
                                      className="text-xs px-1.5 py-0.5 bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 dark:from-orange-900/50 dark:to-red-900/50 dark:text-orange-200"
                                    >
                                      Bonus
                                    </Badge>
                                    {isSessionCompleted(day.day, 5) && (
                                      <CheckCircle className="h-3 w-3 text-green-600" />
                                    )}
                                  </div>
                                  <div className="text-xs text-muted-foreground truncate">
                                    Day {day.day} Practical Challenge
                                  </div>
                                </div>
                                {/* Challenge Completion Status */}
                                {isAdmin && (
                                  <div className="ml-2 flex-shrink-0">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-6 w-6 p-0 hover:bg-transparent"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleCompletion(day.day, 5);
                                      }}
                                    >
                                      {isSessionCompleted(day.day, 5) ? (
                                        <CheckCircle className="h-4 w-4 text-green-600" />
                                      ) : (
                                        <Circle className="h-4 w-4 text-muted-foreground" />
                                      )}
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </Button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );

  // Mobile: Use Sheet (drawer) overlay
  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="p-0 w-80">
          <SheetHeader className="p-4 pb-0">
            <SheetTitle className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 shadow-lg">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="font-bold">Course Navigation</div>
                <div className="text-xs text-muted-foreground font-normal">
                  React Learning Path
                </div>
              </div>
            </SheetTitle>
          </SheetHeader>
          <div className="h-full overflow-hidden">
            <SidebarContent />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop: Fixed sidebar with collapse functionality
  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-40 transition-all duration-300 ease-in-out", // Added fixed positioning
        isCollapsed ? "w-20" : "w-80"
      )}
    >
      <SidebarContent />
    </div>
  );
}
