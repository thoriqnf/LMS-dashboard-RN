"use client";

import { CodeBlock } from "@/components/ui/code-block-new";

export function Day1Session3Content() {
  return (
    <>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Making Components Interactive - Session 3
          </h1>

          <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-8">
            <h3 className="text-blue-800 dark:text-blue-200 font-semibold mb-4 mt-0">
              📅 Session Overview
            </h3>
            <ul className="text-blue-700 dark:text-blue-300 space-y-2 mb-0">
              <li>
                <strong>What is State?</strong> - How components remember things
              </li>
              <li>
                <strong>useState Hook</strong> - The magic that makes things change
              </li>
              <li>
                <strong>Button Clicks</strong> - Responding to user actions
              </li>
              <li>
                <strong>Text Inputs</strong> - Getting information from users
              </li>
              <li>
                <strong>Show and Hide</strong> - Making content appear and disappear
              </li>
              <li>
                <strong>Practice Time</strong> - Build your first interactive components!
              </li>
            </ul>
          </div>
        </div>

        <h2>1. What is State?</h2>

        <h3>Components Need Memory!</h3>
        <p>
          Imagine you're playing a video game. The game needs to remember your score, 
          your level, your health, and whether you've collected certain items. Components 
          in React are similar - they need to remember things too!
        </p>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
            <h4 className="text-red-800 dark:text-red-200 font-semibold mb-2 mt-0">
              ❌ Without Memory:
            </h4>
            <div className="text-red-700 dark:text-red-300 text-sm">
              <p className="mb-2">You click a button → Nothing changes</p>
              <p className="mb-2">You type in a form → Text disappears</p>
              <p className="mb-2">You toggle a menu → It won't open</p>
              <p className="font-semibold mt-2 mb-0">Boring and broken! 😢</p>
            </div>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
            <h4 className="text-green-800 dark:text-green-200 font-semibold mb-2 mt-0">
              ✅ With Memory (State):
            </h4>
            <div className="text-green-700 dark:text-green-300 text-sm">
              <p className="mb-2">You click a button → Something happens!</p>
              <p className="mb-2">You type in a form → Text stays there</p>
              <p className="mb-2">You toggle a menu → It opens and closes</p>
              <p className="font-semibold mt-2 mb-0">Interactive and fun! 🎉</p>
            </div>
          </div>
        </div>

        <h3>Real-Life Examples of State</h3>
        <div className="my-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-2 mb-0">
            <li>
              <strong>Light Switch</strong> - Remembers if it's ON or OFF
            </li>
            <li>
              <strong>Shopping Cart</strong> - Remembers what items you added
            </li>
            <li>
              <strong>Like Button</strong> - Remembers if you liked something
            </li>
            <li>
              <strong>Login Form</strong> - Remembers what you typed
            </li>
            <li>
              <strong>Dark Mode Toggle</strong> - Remembers your theme preference
            </li>
          </ul>
        </div>

        <h2>2. useState Hook - The Magic Function</h2>

        <h3>Meet useState - Your New Best Friend</h3>
        <p>
          useState is a special function that gives your components memory. It's like 
          giving your component a notebook where it can write things down and remember them!
        </p>

        <CodeBlock
          code={`// ✅ Your first useState example!
import React, { useState } from 'react';

function MagicCounter() {
  // Create a piece of memory called "count" that starts at 0
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>
        Add One!
      </button>
    </div>
  );
}

// Now when you click the button, the number goes up!
// 0 → 1 → 2 → 3 → 4... 🎊`}
          language="jsx"
          filename="magic-counter.jsx"
          title="Your First useState!"
        />

        <h3>How useState Works</h3>
        <div className="my-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border font-mono text-sm">
          <div className="mb-4 font-sans font-semibold">
            useState gives you two things:
          </div>
          <div>📦 count       ← The current value</div>
          <div>🎛️ setCount    ← Function to change the value</div>
          <div></div>
          <div>📝 useState(0) ← Starting value</div>
        </div>

        <CodeBlock
          code={`// Let's break it down step by step!
function SimpleExample() {
  // Step 1: Create state with starting value
  const [message, setMessage] = useState("Hello!");
  
  // Step 2: Use the state value
  return (
    <div>
      <h2>{message}</h2>  {/* Shows: "Hello!" */}
      
      {/* Step 3: Change the state when button is clicked */}
      <button onClick={() => setMessage("Goodbye!")}>
        Change Message
      </button>
    </div>
  );
}

// Click the button and "Hello!" becomes "Goodbye!" 🪄`}
          language="jsx"
          filename="simple-example.jsx"
          title="useState Step by Step"
        />

        <h2>3. Button Clicks - Making Things Happen</h2>

        <h3>onClick - When Users Click Buttons</h3>
        <p>
          Buttons are like doorbells - when someone presses them, you want something 
          to happen! In React, we use onClick to listen for button clicks.
        </p>

        <CodeBlock
          code={`function ClickMe() {
  const [message, setMessage] = useState("Click the button!");
  const [clickCount, setClickCount] = useState(0);
  
  // This function runs when the button is clicked
  const handleClick = () => {
    setMessage("Thanks for clicking! 🎉");
    setClickCount(clickCount + 1);
  };
  
  return (
    <div>
      <h2>{message}</h2>
      <p>You've clicked {clickCount} times</p>
      <button onClick={handleClick}>
        Click Me!
      </button>
    </div>
  );
}`}
          language="jsx"
          filename="click-me.jsx"
          title="Handling Button Clicks"
        />

        <h3>Different Types of Buttons</h3>

        <CodeBlock
          code={`function ButtonParty() {
  const [mood, setMood] = useState("😐");
  const [color, setColor] = useState("blue");
  
  return (
    <div style={{ backgroundColor: color, padding: "20px" }}>
      <h2>My mood: {mood}</h2>
      
      {/* Different buttons do different things! */}
      <button onClick={() => setMood("😄")}>Make me happy!</button>
      <button onClick={() => setMood("😢")}>Make me sad</button>
      <button onClick={() => setMood("😴")}>Make me sleepy</button>
      
      <br /><br />
      
      <button onClick={() => setColor("red")}>Red Background</button>
      <button onClick={() => setColor("green")}>Green Background</button>
      <button onClick={() => setColor("yellow")}>Yellow Background</button>
    </div>
  );
}`}
          language="jsx"
          filename="button-party.jsx"
          title="Multiple Interactive Buttons"
        />

        <h2>4. Text Inputs - Getting Information from Users</h2>

        <h3>onChange - When Users Type</h3>
        <p>
          Text inputs are like having a conversation with your users. When they type, 
          you want to listen and remember what they're saying!
        </p>

        <CodeBlock
          code={`function GreetingForm() {
  const [name, setName] = useState("");
  
  return (
    <div>
      <h2>What's your name?</h2>
      
      <input 
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Type your name here..."
      />
      
      {/* Show a greeting if they typed something */}
      {name && <h3>Hello, {name}! Nice to meet you! 👋</h3>}
    </div>
  );
}`}
          language="jsx"
          filename="greeting-form.jsx"
          title="Text Input Example"
        />

        <h3>Different Types of Inputs</h3>

        <CodeBlock
          code={`function PersonalInfo() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [favoriteColor, setFavoriteColor] = useState("");
  const [isStudent, setIsStudent] = useState(false);
  
  return (
    <div style={{ padding: "20px" }}>
      <h2>Tell me about yourself!</h2>
      
      <div>
        <label>Name: </label>
        <input 
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      
      <div>
        <label>Age: </label>
        <input 
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>
      
      <div>
        <label>Favorite Color: </label>
        <input 
          type="color"
          value={favoriteColor}
          onChange={(e) => setFavoriteColor(e.target.value)}
        />
      </div>
      
      <div>
        <label>
          <input 
            type="checkbox"
            checked={isStudent}
            onChange={(e) => setIsStudent(e.target.checked)}
          />
          I am a student
        </label>
      </div>
      
      {/* Show summary */}
      {name && (
        <div style={{ marginTop: "20px", padding: "10px", backgroundColor: favoriteColor || "#f0f0f0" }}>
          <h3>Nice to meet you!</h3>
          <p>Name: {name}</p>
          <p>Age: {age || "Not specified"}</p>
          <p>Status: {isStudent ? "Student" : "Not a student"}</p>
        </div>
      )}
    </div>
  );
}`}
          language="jsx"
          filename="personal-info.jsx"
          title="Different Input Types"
        />

        <h2>5. Show and Hide - Conditional Rendering</h2>

        <h3>Making Things Appear and Disappear</h3>
        <p>
          Sometimes you want to show or hide parts of your component based on user actions. 
          It's like having a magic trick where things appear and disappear!
        </p>

        <CodeBlock
          code={`function MagicBox() {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <div>
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? "Hide" : "Show"} the Magic Box
      </button>
      
      {/* Only show this when isVisible is true */}
      {isVisible && (
        <div style={{ 
          padding: "20px", 
          backgroundColor: "gold", 
          margin: "10px",
          borderRadius: "10px"
        }}>
          <h3>✨ Magic Box Appeared! ✨</h3>
          <p>This is some magical content!</p>
        </div>
      )}
    </div>
  );
}`}
          language="jsx"
          filename="magic-box.jsx"
          title="Show and Hide Content"
        />

        <h3>Different Ways to Show Content</h3>

        <CodeBlock
          code={`function ConditionalContent() {
  const [userType, setUserType] = useState("guest");
  const [showSecret, setShowSecret] = useState(false);
  
  return (
    <div style={{ padding: "20px" }}>
      <h2>Welcome!</h2>
      
      <div>
        <button onClick={() => setUserType("guest")}>I'm a Guest</button>
        <button onClick={() => setUserType("member")}>I'm a Member</button>
        <button onClick={() => setUserType("admin")}>I'm an Admin</button>
      </div>
      
      {/* Different content for different user types */}
      {userType === "guest" && (
        <div style={{ backgroundColor: "lightblue", padding: "10px", margin: "10px" }}>
          <p>Welcome, Guest! Please sign up to access more features.</p>
        </div>
      )}
      
      {userType === "member" && (
        <div style={{ backgroundColor: "lightgreen", padding: "10px", margin: "10px" }}>
          <p>Hello, Member! Enjoy your premium content.</p>
          <button onClick={() => setShowSecret(!showSecret)}>
            {showSecret ? "Hide" : "Show"} Secret Member Content
          </button>
          {showSecret && <p>🎉 Secret: You're awesome!</p>}
        </div>
      )}
      
      {userType === "admin" && (
        <div style={{ backgroundColor: "lightcoral", padding: "10px", margin: "10px" }}>
          <p>Admin Panel: You have full access!</p>
          <p>🔧 Admin tools are available here.</p>
        </div>
      )}
    </div>
  );
}`}
          language="jsx"
          filename="conditional-content.jsx"
          title="Different Content for Different Cases"
        />

        <h2>6. Hands-On Exercise: Build a Like Button</h2>

        <h3>🎯 Your First Interactive Component</h3>
        <p>
          Let's build something fun and simple - a like button! This is perfect for 
          practicing everything we've learned about state and events.
        </p>

        <div className="my-6 p-4 bg-orange-50 dark:bg-orange-950 rounded-lg border border-orange-200 dark:border-orange-800">
          <h4 className="text-orange-800 dark:text-orange-200 font-semibold mb-3 mt-0">
            📝 What We'll Build:
          </h4>
          <ul className="text-orange-700 dark:text-orange-300 text-sm space-y-2 mb-0">
            <li><strong>Like Button</strong> - Click to like/unlike</li>
            <li><strong>Like Counter</strong> - Shows current number of likes</li>
            <li><strong>Heart Icon</strong> - Changes from ♡ to ❤️ when liked</li>
            <li><strong>Thank You Message</strong> - Appears when you like something</li>
          </ul>
        </div>

        <CodeBlock
          code={`// 🚀 Build this step by step!
import React, { useState } from 'react';

function LikeButton() {
  // TODO: Add state for whether it's liked (true/false)
  // TODO: Add state for the like count (number)
  
  // TODO: Create a function to handle clicking the like button
  const handleLike = () => {
    // Your code here!
  };
  
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h3>My First Interactive Component!</h3>
      
      {/* TODO: Create the like button */}
      <button onClick={handleLike}>
        {/* TODO: Show ♡ if not liked, ❤️ if liked */}
        {/* TODO: Show the like count */}
      </button>
      
      {/* TODO: Show thank you message when liked */}
    </div>
  );
}

export default LikeButton;`}
          language="jsx"
          filename="like-button-exercise.jsx"
          title="Like Button Exercise"
        />

        <h3>💡 Step-by-Step Guide</h3>
        <div className="my-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <ol className="text-blue-700 dark:text-blue-300 text-sm space-y-2 mb-0">
            <li><strong>Step 1:</strong> Add useState for isLiked (start with false)</li>
            <li><strong>Step 2:</strong> Add useState for likeCount (start with 42)</li>
            <li><strong>Step 3:</strong> Create handleLike function to toggle the like</li>
            <li><strong>Step 4:</strong> Show ♡ or ❤️ based on isLiked</li>
            <li><strong>Step 5:</strong> Show the like count next to the heart</li>
            <li><strong>Step 6:</strong> Show a thank you message when liked</li>
            <li><strong>Step 7:</strong> Add some nice styling!</li>
          </ol>
        </div>

        <details className="my-6">
          <summary className="cursor-pointer font-semibold text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200">
            ✅ Click to see solution
          </summary>
          <div className="mt-4">
            <CodeBlock
              code={`// ✅ Complete solution!
function LikeButton() {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(42);
  
  const handleLike = () => {
    if (isLiked) {
      // Unlike: decrease count and set to false
      setLikeCount(likeCount - 1);
      setIsLiked(false);
    } else {
      // Like: increase count and set to true
      setLikeCount(likeCount + 1);
      setIsLiked(true);
    }
  };
  
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h3>My First Interactive Component!</h3>
      
      <button 
        onClick={handleLike}
        style={{
          backgroundColor: isLiked ? "#ff6b6b" : "#f1f3f4",
          color: isLiked ? "white" : "#333",
          border: "none",
          padding: "10px 20px",
          borderRadius: "25px",
          fontSize: "16px",
          cursor: "pointer",
          transition: "all 0.2s ease"
        }}
      >
        {isLiked ? "❤️" : "♡"} {likeCount}
      </button>
      
      {isLiked && (
        <p style={{ color: "#ff6b6b", marginTop: "10px" }}>
          Thank you for liking! 🎉
        </p>
      )}
    </div>
  );
}`}
              language="jsx"
              filename="like-button-solution.jsx"
              title="Complete Solution"
            />
          </div>
        </details>

        <h2>7. More Practice: Simple Counter</h2>

        <h3>🚀 Level Up Challenge</h3>
        <p>
          Ready for something a bit more challenging? Let's build a counter with 
          multiple buttons and some fun features!
        </p>

        <div className="my-6 p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <h4 className="text-yellow-800 dark:text-yellow-200 font-semibold mb-3 mt-0">
            🎯 Counter Features:
          </h4>
          <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1 mb-0">
            <li>• Increment button (+1)</li>
            <li>• Decrement button (-1)</li>
            <li>• Reset button (back to 0)</li>
            <li>• Don't go below 0</li>
            <li>• Show different colors for different numbers</li>
          </ul>
        </div>

        <CodeBlock
          code={`function SuperCounter() {
  const [count, setCount] = useState(0);
  
  const increment = () => {
    setCount(count + 1);
  };
  
  const decrement = () => {
    // Don't let it go below 0
    if (count > 0) {
      setCount(count - 1);
    }
  };
  
  const reset = () => {
    setCount(0);
  };
  
  // Different colors for different numbers
  const getColor = () => {
    if (count === 0) return "gray";
    if (count < 5) return "green";
    if (count < 10) return "blue";
    return "red";
  };
  
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Super Counter</h2>
      
      <div style={{ 
        fontSize: "48px", 
        color: getColor(),
        margin: "20px 0"
      }}>
        {count}
      </div>
      
      <div>
        <button onClick={decrement} disabled={count === 0}>
          -1
        </button>
        <button onClick={reset} style={{ margin: "0 10px" }}>
          Reset
        </button>
        <button onClick={increment}>
          +1
        </button>
      </div>
      
      {/* Fun messages based on count */}
      {count === 0 && <p>Start counting!</p>}
      {count === 5 && <p>🎉 You reached 5!</p>}
      {count === 10 && <p>🚀 Double digits!</p>}
      {count >= 20 && <p>🔥 You're on fire!</p>}
    </div>
  );
}`}
          language="jsx"
          filename="super-counter.jsx"
          title="Super Counter Example"
        />

        <h2>8. Summary & What's Next</h2>

        <h3>🎉 What We've Learned Today</h3>
        <div className="my-6 p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-2 mb-0">
            <li>
              <strong>State is Memory:</strong> Components can remember things with useState
            </li>
            <li>
              <strong>useState Hook:</strong> Creates memory that triggers re-renders
            </li>
            <li>
              <strong>onClick Events:</strong> Making buttons do things when clicked
            </li>
            <li>
              <strong>onChange Events:</strong> Listening to user input in forms
            </li>
            <li>
              <strong>Conditional Rendering:</strong> Showing/hiding content based on state
            </li>
            <li>
              <strong>Interactive Components:</strong> Built your first working React apps!
            </li>
          </ul>
        </div>

        <h3>🏆 You Did It!</h3>
        <p>
          Congratulations! You just built your first interactive React components. That like 
          button and counter might seem simple, but they use the same fundamental concepts 
          that power complex applications like Facebook, Instagram, and Netflix!
        </p>

        <h3>What's Coming Next</h3>
        <p>
          Tomorrow in Day 2, we'll learn about more advanced React concepts like effects, 
          working with lists of data, and building more complex applications. But for now, 
          you should be proud - you're officially a React developer! 🎊
        </p>

        <div className="my-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-3 mt-0">
            🚀 Keep Practicing:
          </h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-2 mb-0">
            <li>Complete the like button exercise and try different variations</li>
            <li>Build the super counter and add your own features</li>
            <li>Try creating a simple login form with username and password</li>
            <li>Experiment with different input types and see what happens</li>
            <li>Challenge yourself: Can you build a simple calculator?</li>
          </ul>
        </div>

        <div className="my-6 p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <h4 className="text-yellow-800 dark:text-yellow-200 font-semibold mb-2 mt-0">
            💡 Remember:
          </h4>
          <p className="text-yellow-700 dark:text-yellow-300 text-sm mb-0">
            Every expert was once a beginner. The concepts you learned today - state, 
            events, and conditional rendering - are the building blocks of every React 
            application. You're not just learning to code; you're learning to think 
            like a developer. Keep experimenting, keep building, and most importantly, 
            keep having fun! 🌟
          </p>
        </div>
      </div>
    </>
  );
}