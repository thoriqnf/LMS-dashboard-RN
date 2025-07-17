# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React Learning Management System (LMS) dashboard built with Next.js 15, TypeScript, and Tailwind CSS. It provides structured React courses organized into 5 days with multiple sessions per day plus challenges.

## Development Commands

\`\`\`bash
# Development
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Run ESLint

# Project uses pnpm as package manager
\`\`\`

## Architecture Overview

### Core Structure
- **Next.js App Router**: Uses the app directory with client-side components
- **Main Dashboard**: Single-page application with sidebar navigation and content area
- **Course Content**: Structured lesson system with completion tracking
- **Password Protection**: Sessions require password `bni-332` to mark as complete

### Key Components

**Layout Components:**
- `app/page.tsx` - Main dashboard container with state management
- `components/sidebar.tsx` - Collapsible navigation with course structure
- `components/main-content.tsx` - Content wrapper component
- `components/lesson-content.tsx` - Renders individual lesson content with completion system

**Lesson Architecture:**
- `components/lessons/day-{X}/session-{Y}.tsx` - Individual lesson components
- `lib/course-content.ts` - Central course structure and metadata
- `components/ui/code-block-new.tsx` - Custom syntax-highlighted code blocks

### Data Flow

1. **Course Structure**: Defined in `lib/course-content.ts` with session metadata
2. **Content Loading**: Session components imported dynamically in `lesson-content.tsx`
3. **State Management**: Uses React useState for session tracking, localStorage for persistence
4. **Completion Flow**: Password submission → API call → localStorage update → UI refresh

### Session Content Pattern

Each lesson component follows this structure:
\`\`\`jsx
import { CodeBlock } from "@/components/ui/code-block-new";

export function Day{X}Session{Y}Content() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      {/* Lesson content with headings, explanations */}
      <CodeBlock
        code={`// Code examples`}
        language="jsx"
        filename="example.jsx"
        title="Description"
      />
    </div>
  );
}
\`\`\`

## Important Implementation Details

### Session Management
- Course has 5 days, each with 3-4 sessions plus a challenge (session 5)
- Completion tracked in localStorage as `lms-completed` array
- Session completion requires password validation via `/api/complete-session`
- Day 1 currently has only 3 sessions (session-4 was removed)

### Code Block System
- Use `CodeBlock` component from `@/components/ui/code-block-new` for all code examples
- Supports syntax highlighting for jsx, javascript, typescript, css, html
- Includes copy-to-clipboard and filename/title features
- **DO NOT** use inline `font-mono` divs for code - always use `CodeBlock`

### Responsive Design
- Sidebar collapses on mobile with overlay behavior
- Desktop: collapsible sidebar that adjusts main content width
- Uses `useIsMobile` hook for responsive behavior
- Keyboard shortcut: `Cmd/Ctrl + B` toggles sidebar

### Content Guidelines
- All lesson content uses Tailwind typography (`prose` classes)
- Consistent color-coded sections (blue for info, green for success, red for warnings)
- Interactive elements use Radix UI primitives
- Session overviews include emoji icons and structured learning objectives

## File Organization

\`\`\`
components/
├── lessons/day-{1-5}/session-{1-4}.tsx  # Individual lesson content
├── lesson-content.tsx                    # Content router and completion system
├── sidebar.tsx                           # Navigation component  
├── main-content.tsx                      # Content wrapper
└── ui/code-block-new.tsx                # Primary code component

lib/
└── course-content.ts                     # Central course structure

app/
├── page.tsx                              # Main dashboard
└── api/complete-session/route.ts         # Completion API
\`\`\`

## Configuration Notes

- TypeScript strict mode enabled but build errors ignored in next.config.mjs
- ESLint configured but ignored during builds
- Uses `@/*` path mapping for imports
- Images are unoptimized for static export compatibility
- Supports dark mode via next-themes

## Session Completion System

When adding new sessions:
1. Create session component in appropriate `day-X/` folder
2. Add import and route in `lesson-content.tsx` `getLessonContent()` function
3. Update `lib/course-content.ts` with session metadata
4. Ensure consistent use of `CodeBlock` for all code examples

## Password System
- Session completion protected by password: `bni-332`
- Stored in `/api/complete-session/route.ts`
- Validates on server-side before marking completion
- Updates localStorage and triggers UI refresh

## Content Creation System

### Memory & Guidelines Location
- **Content Standards**: `.claude/memory/content-standards.md` - Comprehensive educational quality standards
- **Session Templates**: `.claude/memory/session-templates.md` - Standardized templates for consistent content creation
- **Code Examples Library**: `.claude/memory/code-examples-library.md` - Reusable, tested code snippets and patterns
- **Quality Assurance**: `.claude/memory/quality-assurance-checklist.md` - Comprehensive content review checklist
- **Session History**: `.claude/memory/session-history.md` - Track content creation decisions and patterns

### Content Creation Workflow
1. **Review Standards**: Check `.claude/memory/content-standards.md` for quality requirements
2. **Use Templates**: Apply appropriate template from `.claude/memory/session-templates.md`
3. **Reference Code Library**: Use examples from `.claude/memory/code-examples-library.md`
4. **Quality Check**: Validate against `.claude/memory/quality-assurance-checklist.md`
5. **Update History**: Document decisions in `.claude/memory/session-history.md`

### Educational Content Standards
- **Student-Centered Learning**: Clear objectives, progressive difficulty, practical application
- **Engagement & Interactivity**: Real-world context, problem-solving focus, encouraging tone
- **Technical Excellence**: Tested code, proper formatting, accessibility considerations
- **Consistent Structure**: Session overview, problem-solution pattern, hands-on exercises
- **Quality Indicators**: Learning objectives met, logical flow, sufficient examples, practice opportunities

### Content Quality Requirements
- **Every session must have**: Session overview box, clear learning objectives, progressive examples, hands-on exercises
- **Code examples must**: Be tested and working, include meaningful comments, use proper CodeBlock component
- **Interactive elements must**: Include exercises, clear instructions, solutions/hints, real-world relevance
- **Writing must**: Use encouraging tone, clear explanations, proper grammar, consistent formatting

### Session Creation Process
1. **Define Learning Objectives**: What will students accomplish?
2. **Create Session Overview**: Engaging summary with practical outcomes
3. **Design Content Flow**: Hook → Context → Concept → Examples → Practice → Summary
4. **Develop Code Examples**: Progressive complexity with thorough explanations
5. **Add Interactive Elements**: Exercises, challenges, and practical applications
6. **Quality Review**: Complete checklist verification
7. **Update Documentation**: Record decisions and patterns

### Color-Coded Section Usage
- **Blue**: Important concepts, session overviews, key information
- **Green**: Success patterns, solutions, best practices
- **Yellow**: Tips, warnings, important notes
- **Red**: Common errors, problems to avoid
- **Purple**: Resources, additional learning materials
- **Orange**: Exercises, hands-on activities, challenges

### Maintenance and Updates
- **Regular Reviews**: Monthly content audit using quality checklist
- **Student Feedback**: Integrate learning outcome data
- **Technical Updates**: Keep code examples current with React ecosystem
- **Continuous Improvement**: Update standards based on educational effectiveness

## Important Content Creation Reminders
- **ALWAYS reference** `.claude/memory/` files before creating educational content
- **ALWAYS use** session templates from `.claude/memory/session-templates.md`
- **ALWAYS validate** against quality checklist in `.claude/memory/quality-assurance-checklist.md`
- **ALWAYS update** session history in `.claude/memory/session-history.md` after creating content
- **MAINTAIN** high educational quality standards matching Claude web capabilities
- **ENSURE** all code examples are tested and include comprehensive explanations
- **USE** consistent formatting, tone, and structure across all educational content
