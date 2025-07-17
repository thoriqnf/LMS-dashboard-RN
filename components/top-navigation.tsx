"use client"

import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"
import { Menu, GraduationCap } from "lucide-react"

interface TopNavigationProps {
  onToggleSidebar: () => void
}

export function TopNavigation({ onToggleSidebar }: TopNavigationProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onToggleSidebar} className="h-9 w-9">
            <Menu className="h-4 w-4" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>

          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-slate-700 to-slate-800">
              <GraduationCap className="h-4 w-4 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold">React Learning Dashboard</h1>
              <p className="text-xs text-muted-foreground">Master React step by step</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
