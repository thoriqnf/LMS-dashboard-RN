/**
 * Route utilities for the React LMS Dashboard
 * Handles URL routing, validation, and navigation helpers
 */

export interface SessionRoute {
  day: number;
  session: number;
}

export interface RouteParams {
  day: string;
  session?: string;
}

/**
 * Validates if a day/session combination is valid
 */
export function isValidSession(day: number, session: number): boolean {
  // Day 1: 3 sessions + 1 challenge (session 5)
  if (day === 1) {
    return (session >= 1 && session <= 3) || session === 5;
  }
  
  // Days 2-6: 4 sessions + 1 challenge (session 5)
  if (day >= 2 && day <= 6) {
    return (session >= 1 && session <= 4) || session === 5;
  }
  
  // Day 7: 3 sessions + 1 challenge (session 5)
  if (day === 7) {
    return (session >= 1 && session <= 3) || session === 5;
  }
  
  return false;
}

/**
 * Validates if a day number is valid
 */
export function isValidDay(day: number): boolean {
  return day >= 1 && day <= 7;
}

/**
 * Converts route params to SessionRoute object
 */
export function parseRouteParams(params: RouteParams): SessionRoute | null {
  // Extract day number from "day1", "day2", etc.
  const dayMatch = params.day.match(/^day(\d+)$/);
  if (!dayMatch) {
    return null;
  }
  
  const day = parseInt(dayMatch[1]);
  
  if (!isValidDay(day)) {
    return null;
  }
  
  // Handle challenge route
  if (params.session === 'challenge') {
    return { day, session: 5 };
  }
  
  // Handle session route
  if (params.session) {
    const session = parseInt(params.session.replace('session-', ''));
    
    if (isValidSession(day, session)) {
      return { day, session };
    }
  }
  
  return null;
}

/**
 * Generates URL path for a day/session combination
 */
export function getSessionPath(day: number, session: number): string {
  if (!isValidSession(day, session)) {
    return '/';
  }
  
  if (session === 5) {
    return `/day${day}/challenge`;
  }
  
  return `/day${day}/session-${session}`;
}

/**
 * Gets the next session in the course sequence
 */
export function getNextSession(day: number, session: number): SessionRoute | null {
  // If current session is a challenge, move to next day's first session
  if (session === 5) {
    const nextDay = day + 1;
    if (isValidDay(nextDay)) {
      return { day: nextDay, session: 1 };
    }
    return null; // Course complete
  }
  
  // Check if there's a next session in current day
  const nextSession = session + 1;
  if (isValidSession(day, nextSession)) {
    return { day, session: nextSession };
  }
  
  // Move to challenge of current day
  if (isValidSession(day, 5)) {
    return { day, session: 5 };
  }
  
  return null;
}

/**
 * Gets the previous session in the course sequence
 */
export function getPreviousSession(day: number, session: number): SessionRoute | null {
  // If current session is first session of a day, go to previous day's challenge
  if (session === 1) {
    const prevDay = day - 1;
    if (isValidDay(prevDay)) {
      return { day: prevDay, session: 5 };
    }
    return null; // At the beginning
  }
  
  // If current session is a challenge, go to last session of the day
  if (session === 5) {
    const lastSession = (day === 1 || day === 7) ? 3 : 4; // Days 1 and 7 have 3 sessions, others have 4
    return { day, session: lastSession };
  }
  
  // Go to previous session
  return { day, session: session - 1 };
}

/**
 * Gets session title from course content
 */
export function getSessionTitle(day: number, session: number): string {
  // These match the titles in course-content.ts
  const dayTitles: Record<number, string> = {
    1: "React Foundation",
    2: "React Hooks & State", 
    3: "Data Management & APIs",
    4: "Advanced Routing & State",
    5: "Performance & Production",
    6: "Next.js Fundamentals",
    7: "Next.js API Routes & Serverless Functions"
  };
  
  const sessionTitles: Record<number, Record<number, string>> = {
    1: {
      1: "React Introduction",
      2: "React Component Hierarchy", 
      3: "State & Events",
      5: "React Fundamentals Challenge"
    },
    2: {
      1: "React Effect",
      2: "React Effect Lifecycle",
      3: "React Callback", 
      4: "React Form Handling",
      5: "Advanced Components Challenge"
    },
    3: {
      1: "React Fetching",
      2: "React Custom Hooks",
      3: "React Context API",
      4: "React Context Patterns", 
      5: "State Management Challenge"
    },
    4: {
      1: "React Router Basics",
      2: "React Router Advanced",
      3: "React State Management",
      4: "React State Patterns",
      5: "Routing Challenge"
    },
    5: {
      1: "Loading States & Skeletons",
      2: "Web Storage",
      3: "Performance Optimization", 
      4: "Unit Testing",
      5: "Final Project Challenge"
    },
    6: {
      1: "Next.js Introduction & Setup",
      2: "File-Based Routing Foundation",
      3: "Server Components & Data Fetching",
      4: "Deployment & Performance",
      5: "Next.js Portfolio Project"
    },
    7: {
      1: "API Route Handlers Fundamentals",
      2: "CRUD Operations & Database Integration",
      3: "Advanced API Features & Best Practices",
      5: "Full-Stack Task Manager API Challenge"
    }
  };
  
  const dayTitle = dayTitles[day] || `Day ${day}`;
  const sessionTitle = sessionTitles[day]?.[session] || `Session ${session}`;
  
  return `${dayTitle} - ${sessionTitle}`;
}

/**
 * Gets all valid routes for sitemap generation
 */
export function getAllValidRoutes(): string[] {
  const routes: string[] = ['/'];
  
  for (let day = 1; day <= 7; day++) {
    // Add challenge route
    routes.push(`/day${day}/challenge`);
    
    // Add session routes
    const maxSession = (day === 1 || day === 7) ? 3 : 4;
    for (let session = 1; session <= maxSession; session++) {
      routes.push(`/day${day}/session-${session}`);
    }
  }
  
  return routes;
}
