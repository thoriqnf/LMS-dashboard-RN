"use client";

import { CodeBlock } from "@/components/ui/code-block-new";

export function Day1Session1Content() {
  return (
    <>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            React Introduction - Session 1
          </h1>

          <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-8">
            <h3 className="text-blue-800 dark:text-blue-200 font-semibold mb-4 mt-0">
              📅 Session Overview
            </h3>
            <ul className="text-blue-700 dark:text-blue-300 space-y-2 mb-0">
              <li>
                <strong>What is React?</strong> - Understanding the library and
                its purpose
              </li>
              <li>
                <strong>Virtual DOM</strong> - How React makes applications fast
              </li>
              <li>
                <strong>Development Setup</strong> - Getting your environment
                ready with Vite
              </li>
              <li>
                <strong>JSX Fundamentals</strong> - Writing HTML-like syntax in
                JavaScript
              </li>
              <li>
                <strong>Your First Component</strong> - Creating reusable UI
                pieces
              </li>
              <li>
                <strong>Wrap-up & Next Steps</strong> - Preparing for your React
                journey
              </li>
            </ul>
          </div>
        </div>

        <h2>1. What is React?</h2>

        <h3>The Problem React Solves</h3>
        <p>
          Before React, building interactive web applications meant writing lots
          of complex code to manually update the webpage when data changed.
          Imagine updating a shopping cart: you&apos;d need to find specific elements
          in the HTML, change their content, handle edge cases, and ensure
          everything stayed in sync. This quickly became a maintenance
          nightmare.
        </p>

        <div className="my-6 p-4 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
          <h4 className="text-red-800 dark:text-red-200 font-semibold mb-3 mt-0">
            ❌ Traditional JavaScript (Before React):
          </h4>
          <div className="text-red-700 dark:text-red-300 text-sm space-y-1">
            <p>When user adds item to cart:</p>
            <ol className="list-decimal list-inside space-y-1 mb-0">
              <li>Find cart element in DOM</li>
              <li>Update cart count manually</li>
              <li>Update total price manually</li>
              <li>Show/hide empty cart message</li>
              <li>Update cart icon badge</li>
              <li>Remember to update all related UI</li>
            </ol>
            <p className="font-semibold mt-2">
              Lots of manual work and easy to break!
            </p>
          </div>
        </div>

        <div className="my-6 p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            ✅ React Approach:
          </h4>
          <div className="text-green-700 dark:text-green-300 text-sm space-y-1">
            <p>When user adds item to cart:</p>
            <ol className="list-decimal list-inside space-y-1 mb-0">
              <li>Update the data</li>
              <li>React automatically updates all UI</li>
            </ol>
            <p className="font-semibold mt-2">Simple and reliable! ✨</p>
          </div>
        </div>

        <h3>What is React?</h3>
        <p>
          React is a JavaScript library for building user interfaces. Created by
          Facebook in 2013, React introduces a component-based approach where
          you build your interface from small, reusable pieces called
          components.
        </p>

        <div className="my-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border-l-4 border-blue-400">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-2 text-sm sm:text-base">
            🔑 Key Facts:
          </h4>
          <ul className="text-blue-700 dark:text-blue-300 text-xs sm:text-sm space-y-1">
            <li>
              <strong>Declarative</strong> - You describe what the UI should
              look like, React handles how to make it happen
            </li>
            <li>
              <strong>Component-Based</strong> - Build encapsulated components
              that manage their own state
            </li>
            <li>
              <strong>Learn Once, Write Anywhere</strong> - Use React for web,
              mobile (React Native), and even desktop apps
            </li>
          </ul>
        </div>

        <h3>Why React Became Popular</h3>

        <CodeBlock
          code={`// ✅ React component - simple and declarative
function ShoppingCart({ items }) {
  const total = items.reduce((sum, item) => sum + item.price, 0);
  
  return (
    <div className="cart">
      <h2>Your Cart ({items.length} items)</h2>
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {items.map(item => (
            <div key={item.id}>{item.name} - \${item.price}</div>
          ))}
          <div className="total">Total: \${total}</div>
        </>
      )}
    </div>
  );
}`}
          language="jsx"
          filename="ShoppingCart.jsx"
          title="React Component"
        />

        <div className="my-6 p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            🏆 Why this approach wins:
          </h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1 mb-0">
            <li>
              <strong>Predictable</strong> - Same data always produces same UI
            </li>
            <li>
              <strong>Reusable</strong> - ShoppingCart component works anywhere
              in your app
            </li>
            <li>
              <strong>Maintainable</strong> - Easy to understand and modify
            </li>
            <li>
              <strong>Testable</strong> - Simple to verify component behavior
            </li>
          </ul>
        </div>

        <h3>React in the Real World</h3>
        <p>Major companies using React:</p>
        <ul>
          <li>
            <strong>Facebook/Meta</strong> - Created React and uses it
            extensively
          </li>
          <li>
            <strong>Netflix</strong> - Entire user interface built with React
          </li>
          <li>
            <strong>Airbnb</strong> - Web platform and internal tools
          </li>
          <li>
            <strong>Uber</strong> - Dashboard and rider applications
          </li>
          <li>
            <strong>Instagram</strong> - Web interface (also owned by Meta)
          </li>
        </ul>

        <div className="my-6 p-4 bg-purple-50 dark:bg-purple-950 rounded-lg border border-purple-200 dark:border-purple-800">
          <h4 className="text-purple-800 dark:text-purple-200 font-semibold mb-3 mt-0">
            📚 Essential Resources
          </h4>
          <ul className="text-purple-700 dark:text-purple-300 text-sm space-y-1 mb-0">
            <li>
              <strong>Official Documentation:</strong> https://react.dev
            </li>
            <li>
              <strong>Interactive Tutorial:</strong> https://react.dev/learn
            </li>
            <li>
              <strong>React Dev Tools:</strong> Browser extension for debugging
              React applications
            </li>
          </ul>
          <p className="text-purple-700 dark:text-purple-300 text-sm mt-2 mb-0">
            The official docs are exceptionally well-written with interactive
            examples. Bookmark them - you&apos;ll reference them frequently as you
            learn.
          </p>
        </div>

        <h2>2. Virtual DOM </h2>

        <h3>Understanding the Problem</h3>
        <p>
          The DOM (Document Object Model) represents your webpage&apos;s structure.
          When you change something on a webpage, the browser has to:
        </p>
        <ol>
          <li>
            <strong>Recalculate styles</strong> - Figure out how the change
            affects appearance
          </li>
          <li>
            <strong>Reflow layout</strong> - Determine if elements need to move
          </li>
          <li>
            <strong>Repaint</strong> - Redraw the affected areas
          </li>
        </ol>
        <p>This process is expensive, especially with frequent updates.</p>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
            <h4 className="text-red-800 dark:text-red-200 font-semibold mb-2 mt-0">
              ❌ Traditional DOM Updates (Slow):
            </h4>
            <p className="text-red-700 dark:text-red-300 text-sm mb-0">
              User clicks button → Update DOM → Browser recalculates everything
              → Repaint screen
            </p>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
            <h4 className="text-green-800 dark:text-green-200 font-semibold mb-2 mt-0">
              ✅ React Virtual DOM (Fast):
            </h4>
            <p className="text-green-700 dark:text-green-300 text-sm mb-0">
              User clicks button → Update Virtual DOM → Calculate minimal
              changes → Update real DOM efficiently
            </p>
          </div>
        </div>

        <h3>What is the Virtual DOM?</h3>
        <p>
          The Virtual DOM is a JavaScript representation of the real DOM that
          React keeps in memory. Think of it as a lightweight &quot;draft&quot; of your
          webpage that React uses to plan changes efficiently.
        </p>

        <CodeBlock
          code={`// ✅ Virtual DOM is just JavaScript objects
const virtualElement = {
  type: 'div',
  props: {
    className: 'container',
    children: [
      {
        type: 'h1',
        props: { children: 'Hello World' }
      },
      {
        type: 'p', 
        props: { children: 'Welcome to React!' }
      }
    ]
  }
};`}
          language="javascript"
          filename="virtual-dom-example.js"
          title="Virtual DOM Structure"
        />

        <h3>How Virtual DOM Works</h3>
        <div className="my-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border">
          <h4 className="font-semibold mb-3 mt-0">Virtual DOM Process:</h4>
          <div className="text-sm font-mono">
            <div className="mb-2">
              ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
            </div>
            <div className="mb-2">│ State │───▶│ Virtual │───▶│ Real │</div>
            <div className="mb-2">│ Changes │ │ DOM │ │ DOM │</div>
            <div className="mb-2">│ │ │ (in memory) │ │ (browser) │</div>
            <div className="mb-2">
              └─────────────┘ └─────────────┘ └─────────────┘
            </div>
            <div className="mb-2"> │</div>
            <div className="mb-2"> ┌──────▼──────┐</div>
            <div className="mb-2"> │ Diffing │ ← React compares old vs new</div>
            <div className="mb-2"> │ Algorithm │ and finds minimal changes</div>
            <div> └─────────────┘</div>
          </div>
        </div>

        <h3>Real Example: Counter Application</h3>

        <CodeBlock
          code={`import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="counter">
      <h1>Count: {count}</h1>                    {/* This number changes */}
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <p>Click the button to increase the count!</p>  {/* This stays the same */}
    </div>
  );
}`}
          language="jsx"
          filename="Counter.jsx"
          title="Virtual DOM Example"
        />

        <div className="my-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-3 mt-0">
            🔄 What happens when you click the button:
          </h4>
          <ol className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
            <li>
              <strong>State updates</strong> - count changes from 0 to 1
            </li>
            <li>
              <strong>New Virtual DOM created</strong> - React creates a new
              virtual representation
            </li>
            <li>
              <strong>Diffing</strong> - React compares old Virtual DOM vs new
              Virtual DOM
            </li>
            <li>
              <strong>Minimal update</strong> - Only the {`{count}`} text in the
              &lt;h1&gt; gets updated in the real DOM
            </li>
            <li>
              <strong>Browser repaints</strong> - Only the small text area, not
              the entire component
            </li>
          </ol>
        </div>

        <h3>Why This Matters</h3>
        <p>The Virtual DOM provides several key benefits:</p>
        <ul>
          <li>
            <strong>Performance</strong> - Batching multiple changes and
            applying them efficiently
          </li>
          <li>
            <strong>Predictability</strong> - Same state always produces the
            same UI
          </li>
          <li>
            <strong>Developer Experience</strong> - You write simple,
            declarative code while React handles optimization
          </li>
        </ul>
        <p>
          You don&apos;t need to think about the Virtual DOM day-to-day, but
          understanding it helps you appreciate why React feels so smooth and
          fast compared to manually manipulating the DOM.
        </p>

        <h2>3. Development Setup with Vite </h2>

        <h3>Why Vite for React Development?</h3>
        <p>
          Vite (pronounced &quot;veet&quot;, French for &quot;fast&quot;) is a modern build tool
          that has become the preferred choice for React development because:
        </p>
        <ul>
          <li>
            <strong>Lightning fast startup</strong> - Development server starts
            in milliseconds
          </li>
          <li>
            <strong>Instant updates</strong> - See changes immediately as you
            type
          </li>
          <li>
            <strong>Zero configuration</strong> - Works perfectly out of the box
          </li>
          <li>
            <strong>Modern standards</strong> - Built with the latest web
            technologies
          </li>
        </ul>

        <h3>Step-by-Step Setup</h3>
        <p>
          Open your terminal and follow along. Don&apos;t worry if you see lots of
          text scrolling - that&apos;s normal!
        </p>

        <h4>Step 1: Create Your Code Project</h4>
        <CodeBlock
          code={`# Create a new React project with Vite
npm create vite@latest my-first-react-app --template react`}
          language="bash"
          filename="Terminal"
          title="Project Creation"
        />
        <p>
          <strong>What this command does:</strong>
        </p>
        <ul>
          <li>Downloads the latest Vite</li>
          <li>Creates a folder called &quot;my-first-react-app&quot;</li>
          <li>Sets up a complete React development environment</li>
          <li>Installs all necessary dependencies</li>
        </ul>

        <h4>Step 2: Navigate to Your Project</h4>
        <CodeBlock
          code={`# Move into your new project folder
cd my-first-react-app`}
          language="bash"
          filename="Terminal"
          title="Navigation"
        />

        <h4>Step 3: Install Dependencies</h4>
        <CodeBlock
          code={`# Download all required packages (this takes 30-60 seconds)
npm install`}
          language="bash"
          filename="Terminal"
          title="Installation"
        />
        <p>You&apos;ll see output like:</p>
        <CodeBlock
          code={`added 200 packages, and audited 201 packages in 45s

found 0 vulnerabilities`}
          language="bash"
          filename="Terminal Output"
          title="Success Message"
        />

        <h4>Step 4: Start Development Server</h4>
        <CodeBlock
          code={`# Start the development server
npm run dev`}
          language="bash"
          filename="Terminal"
          title="Start Server"
        />
        <p>
          <strong>Success!</strong> You should see:
        </p>
        <CodeBlock
          code={`✅ Local:   http://localhost:5173/
✅ Network: use --host to expose`}
          language="bash"
          filename="Terminal Output"
          title="Server Running"
        />
        <p>
          Open <code>http://localhost:5173/</code> in your browser - you&apos;ll see
          your first React app running!
        </p>

        <h3>Understanding Your Project Structure</h3>
        <p>Your new project contains several important files:</p>

        <CodeBlock
          code={`my-first-react-app/
├── public/                  📁 Static files served directly
│   └── vite.svg            🖼️ Vite logo
├── src/                    📁 Your React source code
│   ├── App.css            🎨 Styles for App component
│   ├── App.jsx            ⚛️ Main App component (start here!)
│   ├── index.css          🎨 Global styles
│   └── main.jsx           🚀 Entry point (connects React to browser)
├── index.html             📄 HTML page that loads your React app
├── package.json           📋 Project configuration
└── vite.config.js         ⚙️ Vite settings`}
          language="bash"
          filename="Project Structure"
          title="File Organization"
        />

        <div className="my-6 p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <h4 className="text-yellow-800 dark:text-yellow-200 font-semibold mb-2 mt-0">
            📁 Files you&apos;ll work with most:
          </h4>
          <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1 mb-0">
            <li>
              <strong>src/App.jsx</strong> - Your main React component
            </li>
            <li>
              <strong>src/App.css</strong> - Styles for your app
            </li>
            <li>
              <strong>src/index.css</strong> - Global styles
            </li>
          </ul>
        </div>

        <h3>Exploring the Default App</h3>
        <p>Let&apos;s examine the App.jsx file that Vite created:</p>

        <CodeBlock
          code={`// ✅ Default App.jsx - let's understand each part
import { useState } from 'react'          // Import React's state feature
import reactLogo from './assets/react.svg' // Import React logo
import viteLogo from '/vite.svg'          // Import Vite logo
import './App.css'                        // Import component styles

function App() {
  // Create a counter that starts at 0
  const [count, setCount] = useState(0)
  
  return (
    <>
      {/* Logo section */}
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo || "/placeholder.svg"} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo || "/placeholder.svg"} className="logo react" alt="React logo" />
        </a>
      </div>
      
      {/* Main heading */}
      <h1>Vite + React</h1>
      
      {/* Interactive counter */}
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      
      {/* Instructions */}
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App  // Make this component available to other files`}
          language="jsx"
          filename="App.jsx"
          title="Default Vite App"
        />

        <h3>Your First Modification</h3>
        <p>Let&apos;s make a simple change to see how React development works:</p>
        <ol>
          <li>
            Find this line in App.jsx:{" "}
            <code>&lt;h1&gt;Vite + React&lt;/h1&gt;</code>
          </li>
          <li>
            Change it to:{" "}
            <code>&lt;h1&gt;My First React App! 🎉&lt;/h1&gt;</code>
          </li>
          <li>Save the file and watch your browser automatically update!</li>
        </ol>
        <p>
          This instant feedback is called &quot;Hot Module Replacement&quot; (HMR) and
          makes React development incredibly enjoyable.
        </p>

        <div className="my-6 p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            🔄 Development Workflow
          </h4>
          <p className="text-green-700 dark:text-green-300 text-sm mb-2">
            Your typical React development workflow:
          </p>
          <ol className="text-green-700 dark:text-green-300 text-sm space-y-1 mb-0">
            <li>
              <strong>Keep the dev server running</strong> -{" "}
              <code>npm run dev</code> in your terminal
            </li>
            <li>
              <strong>Edit files in src/ folder</strong> - Make changes to your
              React components
            </li>
            <li>
              <strong>Save files</strong> - Browser updates automatically
            </li>
            <li>
              <strong>Check browser console</strong> - Look for any error
              messages
            </li>
            <li>
              <strong>Repeat</strong> - Continue building your application
            </li>
          </ol>
          <p className="text-green-700 dark:text-green-300 text-sm mt-2 mb-0">
            <strong>Pro Tip:</strong> Keep your browser&apos;s Developer Tools open
            (F12) to see helpful error messages and debug information.
          </p>
        </div>

        <h2>4. JSX Fundamentals </h2>

        <h3>What Makes JSX Special?</h3>
        <p>
          JSX (JavaScript XML) allows you to write HTML-like syntax directly in
          your JavaScript files. It&apos;s one of React&apos;s most distinctive features
          and makes building user interfaces much more intuitive.
        </p>

        <CodeBlock
          code={`// ✅ JSX - looks like HTML, but it's actually JavaScript
const element = <h1>Hello, World!</h1>;

// ❌ Without JSX - much more verbose
const element = React.createElement('h1', null, 'Hello, World!');`}
          language="jsx"
          filename="jsx-comparison.jsx"
          title="JSX vs Plain JavaScript"
        />

        <p>
          <strong>Key insight:</strong> JSX is not HTML. It&apos;s a syntax extension
          that gets transformed into regular JavaScript function calls.
        </p>

        <h3>JSX Transformation</h3>
        <p>Behind the scenes, your JSX gets converted to JavaScript:</p>

        <CodeBlock
          code={`// ✅ What you write (JSX):
const greeting = (
  <div className="welcome">
    <h1>Welcome!</h1>
    <p>Let's learn React together.</p>
  </div>
);

// ✅ What JavaScript sees (after transformation):
const greeting = React.createElement(
  'div',
  { className: 'welcome' },
  React.createElement('h1', null, 'Welcome!'),
  React.createElement('p', null, "Let's learn React together.")
);`}
          language="jsx"
          filename="jsx-transformation.jsx"
          title="JSX Transformation"
        />

        <h3>The Three Essential JSX Rules</h3>
        <p>
          Learning JSX successfully means mastering these three rules. Your code
          editor will help you follow them, but understanding why they exist
          will make you a better React developer.
        </p>

        <h4>Rule 1: Return a Single Root Element</h4>
        <p>
          <strong>The Rule:</strong> Your JSX must have exactly one parent
          element wrapping everything else.
        </p>

        <CodeBlock
          code={`// ❌ This won't work:
function BrokenComponent() {
  return (
    <h1>Title</h1>
    <p>Paragraph</p>  // Error! Multiple root elements
  );
}

// ✅ This works - using a div wrapper:
function WorkingComponent() {
  return (
    <div>  {/* Single root element */}
      <h1>Title</h1>
      <p>Paragraph</p>
    </div>
  );
}

// ✅ This also works - using React Fragment:
function BetterComponent() {
  return (
    <>  {/* Fragment - no extra HTML element */}
      <h1>Title</h1>
      <p>Paragraph</p>
    </>
  );
}`}
          language="jsx"
          filename="jsx-rule-1.jsx"
          title="Single Root Element"
        />

        <div className="my-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-2 mt-0">
            💡 When to use each approach:
          </h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
            <li>
              Use <code>&lt;div&gt;</code> when you need a container for styling
              or structure
            </li>
            <li>
              Use <code>&lt;&gt;</code> (Fragment) when you don&apos;t want extra
              HTML in your output
            </li>
          </ul>
        </div>

        <h4>Rule 2: Close All Tags</h4>
        <p>
          <strong>The Rule:</strong> Every tag must be explicitly closed, even
          ones that are self-closing in HTML.
        </p>

        <CodeBlock
          code={`// ❌ HTML style (doesn't work in JSX):
function BrokenTags() {
  return (
    <div>
      <img src="photo.jpg" alt="Photo">     {/* Missing closing slash */}
      <input type="text">                   {/* Missing closing slash */}
      <br>                                  {/* Missing closing slash */}
    </div>
  );
}

// ✅ JSX style (properly closed):
function ProperTags() {
  return (
    <div>
      <img src="photo.jpg" alt="Photo" />  {/* Self-closing with slash */}
      <input type="text" />                {/* Self-closing with slash */}
      <br />                               {/* Self-closing with slash */}
    </div>
  );
}`}
          language="jsx"
          filename="jsx-rule-2.jsx"
          title="Close All Tags"
        />

        <p>
          <strong>Memory trick:</strong> If a tag doesn&apos;t have content inside
          it, end it with <code>/&gt;</code>. If it has content, use opening and
          closing tags like <code>&lt;div&gt;content&lt;/div&gt;</code>.
        </p>

        <h4>Rule 3: Use camelCase for Attributes</h4>
        <p>
          <strong>The Rule:</strong> HTML attributes in JSX must use camelCase
          naming, and some have different names entirely.
        </p>

        <CodeBlock
          code={`// ❌ HTML style (doesn't work in JSX):
function HTMLStyle() {
  return (
    <div>
      <label for="email">Email:</label>                    {/* Should be htmlFor */}
      <input 
        type="email"
        class="input-field"                               {/* Should be className */}
        onclick="handleClick()"                           {/* Should be onClick */}
      />
    </div>
  );
}

// ✅ JSX style (camelCase attributes):
function JSXStyle() {
  const handleClick = () => alert('Clicked!');
  
  return (
    <div>
      <label htmlFor="email">Email:</label>              {/* htmlFor instead of for */}
      <input 
        type="email"
        className="input-field"                          {/* className instead of class */}
        onClick={handleClick}                            {/* onClick instead of onclick */}
      />
    </div>
  );
}`}
          language="jsx"
          filename="jsx-rule-3.jsx"
          title="camelCase Attributes"
        />

        <div className="my-6 p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <h4 className="text-yellow-800 dark:text-yellow-200 font-semibold mb-2 mt-0">
            🔄 Common attribute transformations:
          </h4>
          <div className="text-yellow-700 dark:text-yellow-300 text-sm font-mono space-y-1 mb-0">
            <div>class=&quot;my-class&quot; → className=&quot;my-class&quot;</div>
            <div>for=&quot;input-id&quot; → htmlFor=&quot;input-id&quot;</div>
            <div>onclick=&quot;fn()&quot; → onClick=&#123;fn&#125;</div>
            <div>onchange=&quot;fn()&quot; → onChange=&#123;fn&#125;</div>
            <div>tabindex=&quot;1&quot; → tabIndex=&#123;1&#125;</div>
            <div>readonly → readOnly</div>
            <div>maxlength=&quot;100&quot; → maxLength=&#123;100&#125;</div>
          </div>
        </div>

        <h3>Embedding JavaScript in JSX</h3>
        <p>
          One of JSX&apos;s most powerful features is the ability to embed JavaScript
          expressions using curly braces <code>{`{}`}</code>:
        </p>

        <CodeBlock
          code={`function DynamicContent() {
  const userName = "Sarah";
  const currentTime = new Date().toLocaleTimeString();
  const isLoggedIn = true;
  
  return (
    <div className="dashboard">
      {/* ✅ Display variables */}
      <h1>Welcome, {userName}!</h1>
      <p>Current time: {currentTime}</p>
      
      {/* ✅ Conditional rendering */}
      {isLoggedIn ? (
        <p>You are logged in ✅</p>
      ) : (
        <p>Please log in ❌</p>
      )}
      
      {/* ✅ Dynamic styling */}
      <div style={{
        backgroundColor: isLoggedIn ? 'lightgreen' : 'lightcoral',
        padding: '10px',
        borderRadius: '5px'
      }}>
        Status: {isLoggedIn ? 'Active' : 'Inactive'}
      </div>
      
      {/* ✅ Function calls */}
      <p>Uppercase name: {userName.toUpperCase()}</p>
    </div>
  );
}`}
          language="jsx"
          filename="dynamic-content.jsx"
          title="JavaScript in JSX"
        />

        <h3>Practice Exercise: Converting HTML to JSX</h3>
        <p>
          Let&apos;s practice with a real example. Here&apos;s some HTML for a user
          profile card:
        </p>

        <CodeBlock
          code={`<div class="profile-card">
  <img src="avatar.jpg" alt="User Avatar" class="avatar">
  <h2>John Doe</h2>
  <p class="title">Frontend Developer</p>
  <div class="contact">
    <a href="mailto:john@example.com">Email</a>
    <a href="tel:+1234567890">Phone</a>
  </div>
  <button onclick="followUser()" class="follow-btn">Follow</button>
</div>`}
          language="html"
          filename="profile-card.html"
          title="HTML to Convert"
        />

        <p>
          <strong>✅ JSX conversion:</strong>
        </p>

        <CodeBlock
          code={`function ProfileCard() {
  const followUser = () => {
    alert('Following user!');
  };
  
  return (
    <div className="profile-card">           {/* class → className */}
      <img 
        src="avatar.jpg"
        alt="User Avatar"
        className="avatar"                   {/* class → className, self-closing */}
      />
      <h2>John Doe</h2>
      <p className="title">Frontend Developer</p>  {/* class → className */}
      <div className="contact">              {/* class → className */}
        <a href="mailto:john@example.com">Email</a>
        <a href="tel:+1234567890">Phone</a>
      </div>
      <button 
        onClick={followUser}                 {/* onclick → onClick, function reference */}
        className="follow-btn"               {/* class → className */}
      >
        Follow
      </button>
    </div>
  );
}`}
          language="jsx"
          filename="ProfileCard.jsx"
          title="JSX Conversion"
        />

        <div className="my-6 p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-2 mt-0">
            🔍 Key changes made:
          </h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1 mb-0">
            <li>
              <code>class</code> became <code>className</code> (4 places)
            </li>
            <li>
              <code>&lt;img&gt;</code> became self-closing{" "}
              <code>&lt;img /&gt;</code>
            </li>
            <li>
              <code>onclick=&quot;followUser()&quot;</code> became{" "}
              <code>onClick=&#123;followUser&#125;</code>
            </li>
            <li>Function is defined inside the component</li>
            <li>
              Everything wrapped in a single root <code>&lt;div&gt;</code>
            </li>
          </ul>
        </div>

        <h2>5. Your First Component </h2>

        <h3>What is a React Component?</h3>
        <p>
          A React component is a JavaScript function that returns JSX describing
          what should appear on the screen. Think of components as custom HTML
          elements that you create to organize and reuse parts of your user
          interface.
        </p>

        <CodeBlock
          code={`// ✅ This is a React component
function Welcome() {
  return <h1>Hello, React!</h1>;  // Returns JSX
}

// ✅ You can use it like an HTML tag
function App() {
  return (
    <div>
      <Welcome />  {/* Custom component, just like <h1> or <div> */}
      <Welcome />  {/* Can be used multiple times */}
    </div>
  );
}`}
          language="jsx"
          filename="basic-component.jsx"
          title="React Component"
        />

        <h3>Component Naming Rules</h3>
        <div className="my-6 p-4 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
          <h4 className="text-red-800 dark:text-red-200 font-semibold mb-2 mt-0">
            ⚠️ Critical Rule:
          </h4>
          <p className="text-red-700 dark:text-red-300 text-sm mb-0">
            Component names must start with a capital letter. This is how React
            distinguishes between regular HTML elements and your custom
            components.
          </p>
        </div>

        <CodeBlock
          code={`// ✅ Good - starts with capital letter
function UserCard() { }
function ProductList() { }
function NavigationMenu() { }

// ❌ Bad - starts with lowercase
function userCard() { }     // React thinks this is a regular HTML element
function productList() { }  // Will cause errors`}
          language="jsx"
          filename="component-naming.jsx"
          title="Naming Rules"
        />

        <h3>Building Your First Component</h3>
        <p>
          Let&apos;s create a practical component step by step. We&apos;ll build a
          greeting card component:
        </p>

        <CodeBlock
          code={`// ✅ Step 1: Basic component structure
function GreetingCard() {
  return (
    <div className="greeting-card">
      <h2>Hello there!</h2>
      <p>Welcome to React development.</p>
    </div>
  );
}`}
          language="jsx"
          filename="GreetingCard.jsx"
          title="Step 1: Basic Structure"
        />

        <CodeBlock
          code={`// ✅ Step 2: Add some styling and personality
function GreetingCard() {
  return (
    <div className="greeting-card" style={{
      border: '2px solid #007bff',
      borderRadius: '10px',
      padding: '20px',
      margin: '10px',
      textAlign: 'center',
      backgroundColor: '#f8f9fa'
    }}>
      <h2 style={{ color: '#007bff' }}>Hello there! 👋</h2>
      <p>Welcome to React development.</p>
      <p>You&apos;re doing great!</p>
    </div>
  );
}`}
          language="jsx"
          filename="GreetingCard.jsx"
          title="Step 2: Add Styling"
        />

        <CodeBlock
          code={`// ✅ Step 3: Use it in your main App component
function App() {
  return (
    <div className="app">
      <h1>My React Application</h1>
      <GreetingCard />          {/* Your custom component */}
      <GreetingCard />          {/* Reused easily */}
    </div>
  );
}`}
          language="jsx"
          filename="App.jsx"
          title="Step 3: Use Component"
        />

        <h3>Making Components Reusable with Props</h3>
        <p>
          Props (short for &quot;properties&quot;) allow you to pass data into components,
          making them flexible and reusable:
        </p>

        <CodeBlock
          code={`// ✅ Component that accepts props
function PersonalGreeting({ name, message, emoji }) {
  return (
    <div className="greeting-card" style={{
      border: '2px solid #28a745',
      borderRadius: '10px',
      padding: '20px',
      margin: '10px',
      textAlign: 'center',
      backgroundColor: '#f8f9fa'
    }}>
      <h2 style={{ color: '#28a745' }}>
        Hello, {name}! {emoji}
      </h2>
      <p>{message}</p>
    </div>
  );
}

// ✅ Using the component with different data
function App() {
  return (
    <div className="app">
      <h1>Welcome to Our Team!</h1>
      
      <PersonalGreeting 
        name="Sarah"
        message="Great job on your first React component!"
        emoji="🎉"
      />
      
      <PersonalGreeting 
        name="Mike"
        message="Keep up the excellent work!"
        emoji="💪"
      />
      
      <PersonalGreeting 
        name="Emma"
        message="You&apos;re mastering React quickly!"
        emoji="🚀"
      />
    </div>
  );
}`}
          language="jsx"
          filename="PersonalGreeting.jsx"
          title="Props Example"
        />

        <h3>Hands-On Exercise: Create Your Own Component</h3>
        <div className="my-6 p-4 bg-orange-50 dark:bg-orange-950 rounded-lg border border-orange-200 dark:border-orange-800">
          <h4 className="text-orange-800 dark:text-orange-200 font-semibold mb-3 mt-0">
            🎯 Your task:
          </h4>
          <p className="text-orange-700 dark:text-orange-300 text-sm mb-2">
            Create a component called <code>InfoCard</code> that displays
            information about a hobby or skill.
          </p>
          <h5 className="text-orange-800 dark:text-orange-200 font-semibold mb-2">
            Requirements:
          </h5>
          <ul className="text-orange-700 dark:text-orange-300 text-sm space-y-1 mb-0">
            <li>
              Takes props for <code>title</code>, <code>description</code>, and{" "}
              <code>skillLevel</code>
            </li>
            <li>Displays all the information in a nicely formatted card</li>
            <li>Uses different colors based on skill level</li>
            <li>(Beginner = blue, Intermediate = orange, Advanced = green)</li>
          </ul>
        </div>

        <CodeBlock
          code={`function InfoCard({ title, description, skillLevel }) {
  // TODO: Create a card that displays:
  // - Title as a heading
  // - Description as a paragraph  
  // - Skill level with appropriate color
  //   (Beginner = blue, Intermediate = orange, Advanced = green)
  
  return (
    <div className="info-card">
      {/* Your JSX here */}
    </div>
  );
}

// Use it like this:
<InfoCard 
  title="React Development"
  description="Building user interfaces with components"
  skillLevel="Beginner"
/>`}
          language="jsx"
          filename="InfoCard.jsx"
          title="Exercise Template"
        />

        <details className="my-6">
          <summary className="cursor-pointer font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200">
            ✅ Click to see sample solution
          </summary>
          <div className="mt-4">
            <CodeBlock
              code={`function InfoCard({ title, description, skillLevel }) {
  // Determine color based on skill level
  const getSkillColor = (level) => {
    switch(level.toLowerCase()) {
      case 'beginner': return '#007bff';
      case 'intermediate': return '#fd7e14';
      case 'advanced': return '#28a745';
      default: return '#6c757d';
    }
  };
  
  return (
    <div className="info-card" style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '16px',
      margin: '10px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ 
        color: '#333',
        marginTop: '0'
      }}>
        {title}
      </h3>
      <p style={{ 
        color: '#666',
        lineHeight: '1.5'
      }}>
        {description}
      </p>
      <span style={{
        backgroundColor: getSkillColor(skillLevel),
        color: 'white',
        padding: '4px 12px',
        borderRadius: '20px',
        fontSize: '14px',
        fontWeight: 'bold'
      }}>
        {skillLevel}
      </span>
    </div>
  );
}`}
              language="jsx"
              filename="InfoCard-solution.jsx"
              title="Sample Solution"
            />
          </div>
        </details>
      </div>
    </>
  );
}
