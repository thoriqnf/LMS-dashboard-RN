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
  // Day 1: 4 sessions + 1 challenge (session 5)
  if (day === 1) {
    return (session >= 1 && session <= 4) || session === 5;
  }

  // Days 2-4: 4 sessions + 1 challenge (session 5)
  if (day >= 2 && day <= 4) {
    return (session >= 1 && session <= 4) || session === 5;
  }

  // Day 5: 4 sessions + 1 challenge (session 5)
  if (day === 5) {
    return (session >= 1 && session <= 4) || session === 5;
  }

  // Days 6-7: 4 sessions + 1 challenge (session 5)
  if (day >= 6 && day <= 7) {
    return (session >= 1 && session <= 4) || session === 5;
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
  if (params.session === "challenge") {
    return { day, session: 5 };
  }

  // Handle session route
  if (params.session) {
    const session = parseInt(params.session.replace("session-", ""));

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
    return "/";
  }

  if (session === 5) {
    return `/day${day}/challenge`;
  }

  return `/day${day}/session-${session}`;
}

/**
 * Gets the next session in the course sequence
 */
export function getNextSession(
  day: number,
  session: number
): SessionRoute | null {
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
export function getPreviousSession(
  day: number,
  session: number
): SessionRoute | null {
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
    const lastSession = 4; // All days now have 4 sessions
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
    1: "React Native Foundation",
    2: "React Hooks & State",
    3: "Data Management & APIs",
    4: "Authentication & Advanced UI",
    5: "Device Features & Integration",
    6: "Next.js Fundamentals",
    7: "Next.js API Routes & Serverless Functions",
  };

  const sessionTitles: Record<number, Record<number, string>> = {
    1: {
      1: "React Native Introduction",
      2: "React Native Core Components",
      3: "React Native State, Events & Input",
      4: "Intro to Expo Router",
      5: "React Native Mobile App Challenge",
    },
    2: {
      1: "Expo Router Deep Dive",
      2: "List & Scroll",
      3: "Fonts & Images",
      4: "Global UI Components",
      5: "Advanced Components Challenge",
    },
    3: {
      1: "Form Handling",
      2: "Fetching API Data",
      3: "AsyncStorage & Secure Store",
      4: "App State & Theming",
      5: "State Management Challenge",
    },
    4: {
      1: "React Native Auth UI",
      2: "React Native Auth Logic",
      3: "Navigation Guards",
      4: "Keyboard & Input UX",
      5: "Routing Challenge",
    },
    5: {
      1: "Camera & Image Basics",
      2: "Location Essentials",
      3: "Simple Notifications",
      4: "Device Storage & Preferences",
      5: "Complete Device Features App",
    },
    6: {
      1: "Next.js Introduction & Setup",
      2: "File-Based Routing Foundation",
      3: "Server Components & Data Fetching",
      4: "Deployment & Performance",
      5: "Next.js Portfolio Project",
    },
    7: {
      1: "API Route Handlers Fundamentals",
      2: "CRUD Operations & Database Integration",
      3: "Advanced API Features & Best Practices",
      5: "Full-Stack Task Manager API Challenge",
    },
  };

  const dayTitle = dayTitles[day] || `Day ${day}`;
  const sessionTitle = sessionTitles[day]?.[session] || `Session ${session}`;

  return `${dayTitle} - ${sessionTitle}`;
}

/**
 * Gets all valid routes for sitemap generation
 */
export function getAllValidRoutes(): string[] {
  const routes: string[] = ["/"];

  for (let day = 1; day <= 7; day++) {
    // All days have 4 sessions + 1 challenge
    routes.push(`/day${day}/challenge`);
    
    const maxSession = 4;
    for (let session = 1; session <= maxSession; session++) {
      routes.push(`/day${day}/session-${session}`);
    }
  }

  return routes;
}
