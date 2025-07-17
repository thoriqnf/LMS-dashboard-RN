"use client"

import { LessonContent } from "./lesson-content"
import { cn } from "@/lib/utils"

interface MainContentProps {
  activeSession: { day: number; session: number }
  onSessionComplete?: (day: number, session: number) => void
  sidebarCollapsed: boolean
  isMobile: boolean
}

export function MainContent({ activeSession, onSessionComplete, sidebarCollapsed, isMobile }: MainContentProps) {
  return (
    <main
      className={cn(
        "flex-1 min-h-screen transition-all duration-300 ease-in-out",
        // Only apply margin-left on desktop, not mobile
        !isMobile && (sidebarCollapsed ? "ml-20" : "ml-80"),
      )}
    >
      <div className="w-full h-full">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <LessonContent activeSession={activeSession} onSessionComplete={onSessionComplete} />
        </div>
      </div>
    </main>
  )
}
