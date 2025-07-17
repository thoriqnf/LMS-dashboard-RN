import { notFound } from "next/navigation";
import { parseRouteParams, getSessionTitle } from "@/lib/route-utils";
import { DashboardContent } from "@/components/dashboard-content";

interface SessionPageProps {
  params: Promise<{
    day: string;
    session: string;
  }>;
}

export async function generateMetadata({ params }: SessionPageProps) {
  const resolvedParams = await params;
  const sessionRoute = parseRouteParams(resolvedParams);
  
  if (!sessionRoute) {
    return {
      title: "Session Not Found - React Learning Dashboard",
    };
  }
  
  const title = getSessionTitle(sessionRoute.day, sessionRoute.session);
  
  return {
    title: `${title} - React Learning Dashboard`,
    description: `Learn React with our structured course - ${title}`,
  };
}

export default async function SessionPage({ params }: SessionPageProps) {
  const resolvedParams = await params;
  const sessionRoute = parseRouteParams(resolvedParams);
  
  if (!sessionRoute) {
    notFound();
  }
  
  return (
    <DashboardContent 
      initialSession={sessionRoute}
    />
  );
}
