import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, BookOpen, AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-orange-600" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">
              Session Not Found
            </h1>
            <p className="text-muted-foreground">
              The lesson you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="grid gap-3">
            <Button asChild className="w-full">
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            
            <Button variant="outline" asChild className="w-full">
              <Link href="/day1/session-1">
                <BookOpen className="w-4 h-4 mr-2" />
                Start Learning
              </Link>
            </Button>
          </div>
          
          <div className="text-xs text-muted-foreground space-y-2">
            <p>Available courses:</p>
            <div className="grid grid-cols-2 gap-2 text-left">
              <div>
                <div className="font-medium">Day 1-5</div>
                <div>Foundation to Advanced</div>
              </div>
              <div>
                <div className="font-medium">Sessions 1-4</div>
                <div>Plus Challenges</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
