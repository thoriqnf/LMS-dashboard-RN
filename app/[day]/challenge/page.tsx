import { notFound } from "next/navigation";
import { isValidDay, getSessionTitle } from "@/lib/route-utils";
import { DashboardContent } from "@/components/dashboard-content";

interface ChallengePageProps {
  params: Promise<{
    day: string;
  }>;
}

export async function generateMetadata({ params }: ChallengePageProps) {
  const resolvedParams = await params;
  
  // Extract day number from "day1", "day2", etc.
  const dayMatch = resolvedParams.day.match(/^day(\d+)$/);
  if (!dayMatch) {
    return {
      title: "Challenge Not Found - React Learning Dashboard",
    };
  }
  
  const day = parseInt(dayMatch[1]);
  
  if (!isValidDay(day)) {
    return {
      title: "Challenge Not Found - React Learning Dashboard",
    };
  }
  
  const title = getSessionTitle(day, 5); // Session 5 is always the challenge
  
  return {
    title: `${title} - React Learning Dashboard`,
    description: `Complete the practical challenge for Day ${day} - ${title}`,
  };
}

export default async function ChallengePage({ params }: ChallengePageProps) {
  const resolvedParams = await params;
  
  // Extract day number from "day1", "day2", etc.
  const dayMatch = resolvedParams.day.match(/^day(\d+)$/);
  if (!dayMatch) {
    notFound();
  }
  
  const day = parseInt(dayMatch[1]);
  
  if (!isValidDay(day)) {
    notFound();
  }
  
  const sessionRoute = { day, session: 5 }; // Session 5 is always the challenge
  
  return (
    <DashboardContent 
      initialSession={sessionRoute}
    />
  );
}
