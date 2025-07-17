# Educational Session Templates

## Master Session Template

### File Structure
\`\`\`
components/lessons/day-{X}/session-{Y}.tsx
\`\`\`

### Component Template
\`\`\`jsx
"use client";

import { CodeBlock } from "@/components/ui/code-block-new";

export function Day{X}Session{Y}Content() {
  return (
    <>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        {/* Session Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            {TOPIC_TITLE} - Session {Y}
          </h1>

          {/* Session Overview Box */}
          <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-8">
            <h3 className="text-blue-800 dark:text-blue-200 font-semibold mb-4 mt-0">
              📅 Session Overview
            </h3>
            <ul className="text-blue-700 dark:text-blue-300 space-y-2 mb-0">
              <li><strong>Learning Objective 1</strong> - Brief description</li>
              <li><strong>Learning Objective 2</strong> - Brief description</li>
              <li><strong>Learning Objective 3</strong> - Brief description</li>
              <li><strong>Practical Application</strong> - What students will build</li>
              <li><strong>Key Takeaways</strong> - What they'll remember</li>
            </ul>
          </div>
        </div>

        {/* Content Sections */}
        <h2>1. Section Title</h2>
        
        {/* Problem-Solution Pattern */}
        <h3>The Problem We're Solving</h3>
        <p>Context and motivation for learning this topic...</p>

        {/* Error/Problem Example */}
        <div className="my-6 p-4 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
          <h4 className="text-red-800 dark:text-red-200 font-semibold mb-3 mt-0">
            ❌ Common Issue:
          </h4>
          <div className="text-red-700 dark:text-red-300 text-sm">
            <p>Description of the problem...</p>
          </div>
        </div>

        {/* Solution Example */}
        <div className="my-6 p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            ✅ React Solution:
          </h4>
          <div className="text-green-700 dark:text-green-300 text-sm">
            <p>How React solves this problem...</p>
          </div>
        </div>

        {/* Code Example */}
        <CodeBlock
          code={`// Example code with comprehensive comments
// Explain the purpose and approach
const ExampleComponent = () => {
  // Implementation details
  return (
    <div>
      {/* JSX with explanations */}
    </div>
  );
};`}
          language="jsx"
          filename="ExampleComponent.jsx"
          title="Descriptive Title"
        />

        {/* Key Concepts Box */}
        <div className="my-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border-l-4 border-blue-400">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-2 text-sm sm:text-base">
            🔑 Key Concepts:
          </h4>
          <ul className="text-blue-700 dark:text-blue-300 text-xs sm:text-sm space-y-1">
            <li><strong>Concept 1</strong> - Brief explanation</li>
            <li><strong>Concept 2</strong> - Brief explanation</li>
            <li><strong>Concept 3</strong> - Brief explanation</li>
          </ul>
        </div>

        {/* Hands-On Exercise */}
        <div className="my-6 p-4 bg-orange-50 dark:bg-orange-950 rounded-lg border border-orange-200 dark:border-orange-800">
          <h4 className="text-orange-800 dark:text-orange-200 font-semibold mb-3 mt-0">
            🎯 Your Turn:
          </h4>
          <p className="text-orange-700 dark:text-orange-300 text-sm mb-2">
            Exercise description and requirements...
          </p>
          <ul className="text-orange-700 dark:text-orange-300 text-sm space-y-1 mb-0">
            <li>Step 1 - Specific instruction</li>
            <li>Step 2 - Specific instruction</li>
            <li>Step 3 - Specific instruction</li>
          </ul>
        </div>

        {/* Exercise Template */}
        <CodeBlock
          code={`// Exercise template with TODO comments
function ExerciseComponent() {
  // TODO: Implement the required functionality
  
  return (
    <div>
      {/* Your code here */}
    </div>
  );
}`}
          language="jsx"
          filename="Exercise.jsx"
          title="Exercise Template"
        />

        {/* Additional Sections as needed */}
        <h2>2. Advanced Concepts</h2>
        
        {/* More content sections following the same pattern */}
        
        {/* Resources Box */}
        <div className="my-6 p-4 bg-purple-50 dark:bg-purple-950 rounded-lg border border-purple-200 dark:border-purple-800">
          <h4 className="text-purple-800 dark:text-purple-200 font-semibold mb-3 mt-0">
            📚 Additional Resources
          </h4>
          <ul className="text-purple-700 dark:text-purple-300 text-sm space-y-1 mb-0">
            <li><strong>Documentation:</strong> Link to official docs</li>
            <li><strong>Examples:</strong> Additional code examples</li>
            <li><strong>Practice:</strong> Suggested exercises</li>
          </ul>
        </div>

      </div>
    </>
  );
}
\`\`\`

## Challenge Template

### Challenge Component Structure
\`\`\`jsx
"use client";

import { CodeBlock } from "@/components/ui/code-block-new";

export function Day{X}ChallengeContent() {
  return (
    <>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            {CHALLENGE_TITLE} - Day {X} Challenge
          </h1>

          {/* Challenge Overview */}
          <div className="bg-orange-50 dark:bg-orange-950 p-6 rounded-lg border border-orange-200 dark:border-orange-800 mb-8">
            <h3 className="text-orange-800 dark:text-orange-200 font-semibold mb-4 mt-0">
              🎯 Challenge Overview
            </h3>
            <p className="text-orange-700 dark:text-orange-300 mb-4">
              Challenge description and what students will build...
            </p>
            <div className="text-orange-700 dark:text-orange-300">
              <h4 className="font-semibold mb-2">Progressive Steps:</h4>
              <ul className="space-y-1 mb-0">
                <li><strong>Step 1 (Basic):</strong> Description</li>
                <li><strong>Step 2 (Medium):</strong> Description</li>
                <li><strong>Step 3 (Hard):</strong> Description</li>
                <li><strong>Bonus:</strong> Advanced feature</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Challenge Requirements */}
        <h2>Challenge Requirements</h2>
        
        {/* Progressive Steps */}
        <h3>Step 1: Basic Implementation</h3>
        <p>Detailed instructions for the basic level...</p>
        
        <CodeBlock
          code={`// Step 1 template with guidance
// TODO: Implement basic functionality`}
          language="jsx"
          filename="Step1.jsx"
          title="Basic Level Template"
        />

        <h3>Step 2: Intermediate Features</h3>
        <p>Building on Step 1, add intermediate features...</p>
        
        <h3>Step 3: Advanced Implementation</h3>
        <p>Advanced features and complex logic...</p>
        
        {/* Bonus Section */}
        <div className="my-6 p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <h4 className="text-yellow-800 dark:text-yellow-200 font-semibold mb-2 mt-0">
            💡 Bonus Challenge:
          </h4>
          <p className="text-yellow-700 dark:text-yellow-300 text-sm mb-0">
            Advanced feature description...
          </p>
        </div>

        {/* Success Criteria */}
        <h2>Success Criteria</h2>
        <ul>
          <li>✅ Basic functionality works correctly</li>
          <li>✅ Code follows React best practices</li>
          <li>✅ UI is responsive and user-friendly</li>
          <li>✅ Edge cases are handled properly</li>
        </ul>

        {/* Hints Section */}
        <details className="my-6">
          <summary className="cursor-pointer font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200">
            💡 Need hints? Click here
          </summary>
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
            <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1">
              <li>Hint 1 - Specific guidance</li>
              <li>Hint 2 - Technical suggestion</li>
              <li>Hint 3 - Problem-solving approach</li>
            </ul>
          </div>
        </details>

        {/* Solution Section */}
        <details className="my-6">
          <summary className="cursor-pointer font-semibold text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200">
            ✅ View sample solution
          </summary>
          <div className="mt-4">
            <CodeBlock
              code={`// Complete solution with explanations
// This demonstrates one possible approach`}
              language="jsx"
              filename="Solution.jsx"
              title="Sample Solution"
            />
          </div>
        </details>

      </div>
    </>
  );
}
\`\`\`

## Content Section Templates

### Problem-Solution Pattern
\`\`\`jsx
{/* Problem Section */}
<div className="my-6 p-4 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
  <h4 className="text-red-800 dark:text-red-200 font-semibold mb-3 mt-0">
    ❌ The Problem:
  </h4>
  <div className="text-red-700 dark:text-red-300 text-sm">
    <p>Description of the issue or limitation...</p>
  </div>
</div>

{/* Solution Section */}
<div className="my-6 p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
  <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
    ✅ The Solution:
  </h4>
  <div className="text-green-700 dark:text-green-300 text-sm">
    <p>How React/the technique solves this problem...</p>
  </div>
</div>
\`\`\`

### Key Concepts Box
\`\`\`jsx
<div className="my-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border-l-4 border-blue-400">
  <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-2 text-sm sm:text-base">
    🔑 Key Points:
  </h4>
  <ul className="text-blue-700 dark:text-blue-300 text-xs sm:text-sm space-y-1">
    <li><strong>Point 1</strong> - Explanation</li>
    <li><strong>Point 2</strong> - Explanation</li>
    <li><strong>Point 3</strong> - Explanation</li>
  </ul>
</div>
\`\`\`

### Warning/Tips Box
\`\`\`jsx
<div className="my-6 p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
  <h4 className="text-yellow-800 dark:text-yellow-200 font-semibold mb-2 mt-0">
    ⚠️ Important Note:
  </h4>
  <p className="text-yellow-700 dark:text-yellow-300 text-sm mb-0">
    Critical information or warning...
  </p>
</div>
\`\`\`

### Exercise Box
\`\`\`jsx
<div className="my-6 p-4 bg-orange-50 dark:bg-orange-950 rounded-lg border border-orange-200 dark:border-orange-800">
  <h4 className="text-orange-800 dark:text-orange-200 font-semibold mb-3 mt-0">
    🎯 Practice Exercise:
  </h4>
  <p className="text-orange-700 dark:text-orange-300 text-sm mb-2">
    Exercise description...
  </p>
  <ul className="text-orange-700 dark:text-orange-300 text-sm space-y-1 mb-0">
    <li>Requirement 1</li>
    <li>Requirement 2</li>
    <li>Requirement 3</li>
  </ul>
</div>
\`\`\`

### Resources Box
\`\`\`jsx
<div className="my-6 p-4 bg-purple-50 dark:bg-purple-950 rounded-lg border border-purple-200 dark:border-purple-800">
  <h4 className="text-purple-800 dark:text-purple-200 font-semibold mb-3 mt-0">
    📚 Additional Resources
  </h4>
  <ul className="text-purple-700 dark:text-purple-300 text-sm space-y-1 mb-0">
    <li><strong>Documentation:</strong> Link description</li>
    <li><strong>Tutorial:</strong> Additional learning resource</li>
    <li><strong>Examples:</strong> Code samples and demos</li>
  </ul>
</div>
\`\`\`

## CodeBlock Usage Standards

### Basic Usage
\`\`\`jsx
<CodeBlock
  code={`// Always include meaningful comments
// Explain the purpose and approach
const example = "Clear, working code";`}
  language="jsx"
  filename="descriptive-name.jsx"
  title="What This Example Demonstrates"
/>
\`\`\`

### Supported Languages
- `jsx` - React components
- `javascript` - Plain JavaScript
- `typescript` - TypeScript code
- `css` - Styling
- `html` - HTML markup
- `bash` - Terminal commands
- `json` - Configuration files

### Best Practices
1. **Always include comments** explaining the code
2. **Use descriptive filenames** that match the concept
3. **Write clear titles** that explain what the example shows
4. **Keep code focused** on the specific concept being taught
5. **Make code complete** and runnable when possible
6. **Show progression** from simple to complex examples

This template system ensures consistency and quality across all educational content while maintaining the engaging, practical approach that makes learning effective.
