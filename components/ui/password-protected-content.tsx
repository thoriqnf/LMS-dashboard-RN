"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface PasswordProtectedContentProps {
  children: React.ReactNode;
  password: string;
  title: string;
  description: string;
  buttonText?: string;
  buttonVariant?: "default" | "secondary" | "outline";
}

export function PasswordProtectedContent({
  children,
  password,
  title,
  description,
  buttonText = "🔓 View Solution",
  buttonVariant = "outline"
}: PasswordProtectedContentProps) {
  const [inputPassword, setInputPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (inputPassword === password) {
      setIsUnlocked(true);
      setIsDialogOpen(false);
      setError("");
      setInputPassword("");
    } else {
      setError("❌ Incorrect password. Try again!");
      setInputPassword("");
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setInputPassword("");
    setError("");
  };

  if (isUnlocked) {
    return <>{children}</>;
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button 
          variant={buttonVariant} 
          className="w-full mt-4"
          onClick={() => setIsDialogOpen(true)}
        >
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            🔐 {title}
          </DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Enter Password:
            </label>
            <Input
              id="password"
              type="password"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
              placeholder="Enter the password to unlock"
              className={error ? "border-red-500" : ""}
              autoFocus
            />
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
          </div>
          <div className="flex gap-2 justify-end">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleDialogClose}
            >
              Cancel
            </Button>
            <Button type="submit">
              🔓 Unlock
            </Button>
          </div>
        </form>
        
        <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <p className="text-xs text-yellow-700 dark:text-yellow-300">
            💡 <strong>Hint:</strong> Try completing the exercise first! The password might be related to the day's content.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
