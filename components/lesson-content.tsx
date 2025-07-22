"use client";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Lock,
  Trophy,
  Target,
  CheckSquare,
  Code2,
  CheckCircle,
} from "lucide-react";
import { PasswordDialog } from "./password-dialog";
import { CodeBlock } from "@/components/ui/code-block-new";
import { courseContent } from "@/lib/course-content";

// Import lesson components
import { Day1Session1Content } from "./lessons/day-1/session-1";
import { Day1Session2Content } from "./lessons/day-1/session-2";
import { Day1Session3Content } from "./lessons/day-1/session-3";
import { Day1Session4Content } from "./lessons/day-1/session-4";
import { Day1ChallengeContent } from "./lessons/day-1/challenge";
import { Day2Session1Content } from "./lessons/day-2/session-1";
import { Day2Session2Content } from "./lessons/day-2/session-2";
import { Day2Session3Content } from "./lessons/day-2/session-3";
import { Day2Session4Content } from "./lessons/day-2/session-4";
import { Day2ChallengeContent } from "./lessons/day-2/challenge";
import { Day3Session1Content } from "./lessons/day-3/session-1";
import { Day3Session2Content } from "./lessons/day-3/session-2";
import { Day3Session3Content } from "./lessons/day-3/session-3";
import { Day3Session4Content } from "./lessons/day-3/session-4";
import { Day3ChallengeContent } from "./lessons/day-3/challenge";
import { Day4Session1Content } from "./lessons/day-4/session-1";
import { Day4Session2Content } from "./lessons/day-4/session-2";
import { Day4Session3Content } from "./lessons/day-4/session-3";
import { Day4Session4Content } from "./lessons/day-4/session-4";
import { Day5Session1Content } from "./lessons/day-5/session-1";
import { Day5Session2Content } from "./lessons/day-5/session-2";
import { Day5Session3Content } from "./lessons/day-5/session-3";

interface LessonContentProps {
  activeSession: { day: number; session: number };
  onSessionComplete?: (day: number, session: number) => void;
}

export function LessonContent({
  activeSession,
  onSessionComplete,
}: LessonContentProps) {
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Initialize completion state from localStorage
  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      const completedSessions = JSON.parse(
        localStorage.getItem("lms-completed") || "[]"
      );
      const sessionKey = `${activeSession.day}-${activeSession.session}`;
      setIsCompleted(completedSessions.includes(sessionKey));
    }
  }, [activeSession.day, activeSession.session]);

  const handleFinishContent = () => {
    setError(null);
    setShowPasswordDialog(true);
  };

  const handlePasswordSubmit = async (password: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/complete-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          day: activeSession.day,
          session: activeSession.session,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to complete session");
      }

      // Mark session as completed
      setIsCompleted(true);
      setShowPasswordDialog(false);

      // Update localStorage
      if (typeof window !== "undefined") {
        const completedSessions = JSON.parse(
          localStorage.getItem("lms-completed") || "[]"
        );
        const sessionKey = `${activeSession.day}-${activeSession.session}`;
        if (!completedSessions.includes(sessionKey)) {
          completedSessions.push(sessionKey);
          localStorage.setItem(
            "lms-completed",
            JSON.stringify(completedSessions)
          );
        }
      }

      // Notify parent component
      if (onSessionComplete) {
        onSessionComplete(activeSession.day, activeSession.session);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Get lesson content component
  const getLessonContent = () => {
    const { day, session } = activeSession;

    // Day 1 sessions
    if (day === 1 && session === 1) return <Day1Session1Content />;
    if (day === 1 && session === 2) return <Day1Session2Content />;
    if (day === 1 && session === 3) return <Day1Session3Content />;
    if (day === 1 && session === 4) return <Day1Session4Content />;

    // Day 2 sessions
    if (day === 2 && session === 1) return <Day2Session1Content />;
    if (day === 2 && session === 2) return <Day2Session2Content />;
    if (day === 2 && session === 3) return <Day2Session3Content />;
    if (day === 2 && session === 4) return <Day2Session4Content />;

    // Day 3 sessions
    if (day === 3 && session === 1) return <Day3Session1Content />;
    if (day === 3 && session === 2) return <Day3Session2Content />;
    if (day === 3 && session === 3) return <Day3Session3Content />;
    if (day === 3 && session === 4) return <Day3Session4Content />;
    if (day === 3 && session === 5) return <Day3Session5Content />;

    // Day 4 sessions
    if (day === 4 && session === 1) return <Day4Session1Content />;
    if (day === 4 && session === 2) return <Day4Session2Content />;
    if (day === 4 && session === 3) return <Day4Session3Content />;
    if (day === 4 && session === 4) return <Day4Session4Content />;

    // Day 5 sessions
    if (day === 5 && session === 1) return <Day5Session1Content />;
    if (day === 5 && session === 2) return <Day5Session2Content />;
    if (day === 5 && session === 3) return <Day5Session3Content />;

    // For sessions not yet implemented, show placeholder
    return (
      <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-center px-4">
        <div className="mb-4 rounded-full bg-muted p-3">
          <Lock className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" />
        </div>
        <h3 className="mb-2 text-base sm:text-lg font-semibold">
          Content Coming Soon
        </h3>
        <p className="mb-4 text-muted-foreground max-w-md text-sm sm:text-base">
          This session content is currently being prepared. Complete the
          previous sessions to unlock this content.
        </p>
        <Badge variant="outline" className="text-xs sm:text-sm">
          Day {activeSession.day}, Session {activeSession.session}
        </Badge>
      </div>
    );
  };

  // Challenge content
  if (activeSession.session === 5) {
    // Day 1 has a custom comprehensive challenge component
    if (activeSession.day === 1) {
      return (
        <div>
          <Day1ChallengeContent />

          {/* Finish Content Button */}
          {isClient && (
            <div className="mt-8 flex justify-center">
              {isCompleted ? (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="font-medium text-sm sm:text-base">
                    Challenge Completed!
                  </span>
                </div>
              ) : (
                <Button
                  onClick={handleFinishContent}
                  size="lg"
                  className="px-6 sm:px-8 text-sm sm:text-base"
                >
                  Complete Challenge
                </Button>
              )}
            </div>
          )}

          {/* Password Dialog */}
          <PasswordDialog
            isOpen={showPasswordDialog}
            onClose={() => setShowPasswordDialog(false)}
            onSubmit={handlePasswordSubmit}
            loading={loading}
            error={error}
            sessionInfo={activeSession}
          />
        </div>
      );
    }

    // Day 2 has a custom comprehensive challenge component
    if (activeSession.day === 2) {
      return (
        <div>
          <Day2ChallengeContent />

          {/* Finish Content Button */}
          {isClient && (
            <div className="mt-8 flex justify-center">
              {isCompleted ? (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="font-medium text-sm sm:text-base">
                    Challenge Completed!
                  </span>
                </div>
              ) : (
                <Button
                  onClick={handleFinishContent}
                  size="lg"
                  className="px-6 sm:px-8 text-sm sm:text-base"
                >
                  Complete Challenge
                </Button>
              )}
            </div>
          )}

          {/* Password Dialog */}
          <PasswordDialog
            isOpen={showPasswordDialog}
            onClose={() => setShowPasswordDialog(false)}
            onSubmit={handlePasswordSubmit}
            loading={loading}
            error={error}
            sessionInfo={activeSession}
          />
        </div>
      );
    }

    // Day 2 has a custom comprehensive challenge component
    if (activeSession.day === 3) {
      return (
        <div>
          <Day3ChallengeContent />

          {/* Finish Content Button */}
          {isClient && (
            <div className="mt-8 flex justify-center">
              {isCompleted ? (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="font-medium text-sm sm:text-base">
                    Challenge Completed!
                  </span>
                </div>
              ) : (
                <Button
                  onClick={handleFinishContent}
                  size="lg"
                  className="px-6 sm:px-8 text-sm sm:text-base"
                >
                  Complete Challenge
                </Button>
              )}
            </div>
          )}

          {/* Password Dialog */}
          <PasswordDialog
            isOpen={showPasswordDialog}
            onClose={() => setShowPasswordDialog(false)}
            onSubmit={handlePasswordSubmit}
            loading={loading}
            error={error}
            sessionInfo={activeSession}
          />
        </div>
      );
    }

    // Default challenge content for other days
    const dayContent = courseContent[activeSession.day];
    if (!dayContent) return null;

    const challenge = dayContent.challenge;

    return (
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg self-start">
            <Trophy className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </div>
          <div>
            <h1 className="m-0 text-xl sm:text-2xl">{challenge.title}</h1>
            <p className="text-muted-foreground m-0 text-sm sm:text-base">
              {challenge.description}
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 p-4 sm:p-6 rounded-lg border border-orange-200 dark:border-orange-800 mb-6">
          <h3 className="flex items-center gap-2 mt-0 mb-4 text-base sm:text-lg">
            <Target className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
            Challenge Objectives
          </h3>
          <ul className="space-y-2 mb-0">
            {challenge.tasks.map((task, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckSquare className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm sm:text-base">{task}</span>
              </li>
            ))}
          </ul>
        </div>

        <h3 className="flex items-center gap-2 text-base sm:text-lg">
          <Code2 className="h-4 w-4 sm:h-5 sm:w-5" />
          Starter Code
        </h3>

        <CodeBlock
          code={challenge.codeTemplate}
          language="jsx"
          filename="challenge.jsx"
          title="Starter Template"
        />

        <div className="bg-blue-50 dark:bg-blue-950 p-4 sm:p-6 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-3 mt-0 text-sm sm:text-base">
            💡 Tips for Success
          </h4>
          <ul className="text-blue-700 dark:text-blue-300 text-xs sm:text-sm space-y-2 mb-0">
            <li>• Break down the challenge into smaller, manageable tasks</li>
            <li>• Test your component frequently as you build</li>
            <li>• Don&apos;t hesitate to refer back to previous lessons</li>
            <li>• Focus on functionality first, then improve styling</li>
            <li>• Consider edge cases and error handling</li>
          </ul>
        </div>

        <div className="bg-green-50 dark:bg-green-950 p-4 sm:p-6 rounded-lg border border-green-200 dark:border-green-800 mt-6">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0 text-sm sm:text-base">
            🎯 Submission Guidelines
          </h4>
          <div className="text-green-700 dark:text-green-300 text-xs sm:text-sm space-y-2">
            <p>When you complete the challenge:</p>
            <ol className="list-decimal list-inside space-y-1 mb-0">
              <li>Test all functionality thoroughly</li>
              <li>Ensure your code is clean and well-commented</li>
              <li>Take screenshots of your working application</li>
              <li>Consider what you learned and what was challenging</li>
            </ol>
          </div>
        </div>

        {/* Finish Content Button */}
        {isClient && (
          <div className="mt-8 flex justify-center">
            {isCompleted ? (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="font-medium text-sm sm:text-base">
                  Challenge Completed!
                </span>
              </div>
            ) : (
              <Button
                onClick={handleFinishContent}
                size="lg"
                className="px-6 sm:px-8 text-sm sm:text-base"
              >
                Complete Challenge
              </Button>
            )}
          </div>
        )}

        {/* Password Dialog */}
        <PasswordDialog
          isOpen={showPasswordDialog}
          onClose={() => setShowPasswordDialog(false)}
          onSubmit={handlePasswordSubmit}
          loading={loading}
          error={error}
          sessionInfo={activeSession}
        />
      </div>
    );
  }

  // Regular lesson content
  return (
    <div>
      {getLessonContent()}

      {/* Finish Content Button */}
      {isClient && (
        <div className="mt-8 flex justify-center">
          {isCompleted ? (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="font-medium text-sm sm:text-base">
                Session Completed!
              </span>
            </div>
          ) : (
            <Button
              onClick={handleFinishContent}
              size="lg"
              className="px-6 sm:px-8 text-sm sm:text-base"
            >
              Finish Content
            </Button>
          )}
        </div>
      )}

      {/* Password Dialog */}
      <PasswordDialog
        isOpen={showPasswordDialog}
        onClose={() => setShowPasswordDialog(false)}
        onSubmit={handlePasswordSubmit}
        loading={loading}
        error={error}
        sessionInfo={activeSession}
      />
    </div>
  );
}
