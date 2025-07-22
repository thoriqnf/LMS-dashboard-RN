"use client";

import { CodeBlock } from "@/components/ui/code-block-new";

export function Day4ChallengeContent() {
  return (
    <>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
              <span className="text-white text-2xl">🏆</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2 mt-0">
                Day 4 Challenge: Personal Task Manager App
              </h1>
              <p className="text-muted-foreground m-0">
                Build a complete task management app using all concepts from Days 1-4
              </p>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-8">
            <h3 className="text-blue-800 dark:text-blue-200 font-semibold mb-4 mt-0">
              🎯 Challenge Overview
            </h3>
            <p className="text-blue-700 dark:text-blue-300 mb-4">
              Create a personal task manager app that combines authentication, data persistence, 
              and professional UI/UX patterns. This challenge integrates everything you've learned 
              from React Native basics to advanced authentication flows.
            </p>
            <div className="text-blue-700 dark:text-blue-300 text-sm">
              <strong>Estimated Time:</strong> 3-4 hours • <strong>Difficulty:</strong> Intermediate
            </div>
          </div>
        </div>

        <h2>📋 App Requirements</h2>
        
        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border mb-6">
          <h4 className="font-semibold mb-3 mt-0">Core Features:</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong className="text-green-600">Authentication System:</strong>
              <ul className="mt-1 space-y-1 ml-4">
                <li>• User registration and login</li>
                <li>• Persistent login sessions</li>
                <li>• Profile management</li>
                <li>• Secure logout</li>
              </ul>
            </div>
            <div>
              <strong className="text-blue-600">Task Management:</strong>
              <ul className="mt-1 space-y-1 ml-4">
                <li>• Create, edit, delete tasks</li>
                <li>• Mark tasks as complete</li>
                <li>• Task categories/priorities</li>
                <li>• Data persistence</li>
              </ul>
            </div>
          </div>
        </div>

        <h2>🏗️ Technical Requirements</h2>

        <div className="space-y-6">
          <div className="bg-orange-50 dark:bg-orange-950 p-6 rounded-lg border border-orange-200 dark:border-orange-800">
            <h4 className="text-orange-800 dark:text-orange-200 font-semibold mb-4 mt-0">
              📱 Day 1 Concepts (React Native Foundation)
            </h4>
            <div className="text-orange-700 dark:text-orange-300 space-y-3">
              <div>
                <strong>Core Components Implementation:</strong>
                <ul className="text-sm mt-2 space-y-1 ml-4">
                  <li>• Use View, Text, ScrollView for app structure</li>
                  <li>• Implement TouchableOpacity for all buttons</li>
                  <li>• Create proper component hierarchy</li>
                  <li>• Apply consistent styling throughout</li>
                </ul>
              </div>
              <div>
                <strong>State Management:</strong>
                <ul className="text-sm mt-2 space-y-1 ml-4">
                  <li>• Use useState for form inputs and UI state</li>
                  <li>• Manage task list state properly</li>
                  <li>• Handle loading and error states</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800">
            <h4 className="text-green-800 dark:text-green-200 font-semibold mb-4 mt-0">
              🧭 Day 2 Concepts (Navigation & UI)
            </h4>
            <div className="text-green-700 dark:text-green-300 space-y-3">
              <div>
                <strong>Navigation Structure:</strong>
                <ul className="text-sm mt-2 space-y-1 ml-4">
                  <li>• Create multiple screens (Auth, Task List, Profile)</li>
                  <li>• Implement screen transitions</li>
                  <li>• Use conditional rendering for navigation</li>
                </ul>
              </div>
              <div>
                <strong>Lists & Components:</strong>
                <ul className="text-sm mt-2 space-y-1 ml-4">
                  <li>• Use FlatList or ScrollView for task display</li>
                  <li>• Create reusable TaskItem components</li>
                  <li>• Implement proper list performance</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 dark:bg-purple-950 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
            <h4 className="text-purple-800 dark:text-purple-200 font-semibold mb-4 mt-0">
              💾 Day 3 Concepts (Data & Forms)
            </h4>
            <div className="text-purple-700 dark:text-purple-300 space-y-3">
              <div>
                <strong>Form Implementation:</strong>
                <ul className="text-sm mt-2 space-y-1 ml-4">
                  <li>• Create task creation/editing forms</li>
                  <li>• Implement proper form validation</li>
                  <li>• Handle controlled inputs correctly</li>
                  <li>• Show validation errors clearly</li>
                </ul>
              </div>
              <div>
                <strong>Data Persistence:</strong>
                <ul className="text-sm mt-2 space-y-1 ml-4">
                  <li>• Use AsyncStorage for task data</li>
                  <li>• Store user preferences</li>
                  <li>• Implement data loading on app start</li>
                  <li>• Handle storage errors gracefully</li>
                </ul>
              </div>
              <div>
                <strong>Context API Usage:</strong>
                <ul className="text-sm mt-2 space-y-1 ml-4">
                  <li>• Create TaskContext for global task management</li>
                  <li>• Share user data across screens</li>
                  <li>• Implement theme/settings context</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-red-50 dark:bg-red-950 p-6 rounded-lg border border-red-200 dark:border-red-800">
            <h4 className="text-red-800 dark:text-red-200 font-semibold mb-4 mt-0">
              🔐 Day 4 Concepts (Authentication & UX)
            </h4>
            <div className="text-red-700 dark:text-red-300 space-y-3">
              <div>
                <strong>Authentication System:</strong>
                <ul className="text-sm mt-2 space-y-1 ml-4">
                  <li>• Implement AuthContext from Day 4 Session 2</li>
                  <li>• Create login/signup forms with validation</li>
                  <li>• Use AsyncStorage for persistent sessions</li>
                  <li>• Handle login/logout state changes</li>
                </ul>
              </div>
              <div>
                <strong>Navigation Guards:</strong>
                <ul className="text-sm mt-2 space-y-1 ml-4">
                  <li>• Protect task screens (require login)</li>
                  <li>• Redirect based on auth status</li>
                  <li>• Show loading during auth checks</li>
                </ul>
              </div>
              <div>
                <strong>Professional UX:</strong>
                <ul className="text-sm mt-2 space-y-1 ml-4">
                  <li>• Use KeyboardAvoidingView in forms</li>
                  <li>• Implement tap-to-dismiss keyboard</li>
                  <li>• Add smooth form navigation</li>
                  <li>• Use appropriate keyboard types</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <h2>🎨 App Structure</h2>
        
        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border mb-6">
          <h4 className="font-semibold mb-4 mt-0">Recommended Screen Flow:</h4>
          <div className="space-y-4 text-sm">
            <div className="border-l-4 border-blue-500 pl-4">
              <strong>1. Welcome/Login Screen</strong>
              <p className="mt-1 text-gray-600 dark:text-gray-400">
                Landing page with login form or navigation to signup
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <strong>2. Task List Screen (Main)</strong>
              <p className="mt-1 text-gray-600 dark:text-gray-400">
                Display all tasks, add new tasks, mark complete/incomplete
              </p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4">
              <strong>3. Add/Edit Task Screen</strong>
              <p className="mt-1 text-gray-600 dark:text-gray-400">
                Form to create new tasks or edit existing ones
              </p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <strong>4. Profile/Settings Screen</strong>
              <p className="mt-1 text-gray-600 dark:text-gray-400">
                User info, logout button, app preferences
              </p>
            </div>
          </div>
        </div>

        <h2>📝 Task Requirements</h2>

        <div className="bg-yellow-50 dark:bg-yellow-950 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800 mb-6">
          <h4 className="text-yellow-800 dark:text-yellow-200 font-semibold mb-4 mt-0">
            ✅ Essential Features Checklist
          </h4>
          
          <div className="space-y-4">
            <div>
              <strong className="text-yellow-800 dark:text-yellow-200">Authentication:</strong>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm mt-2 space-y-1 ml-4">
                <li>☐ User can register with email/password</li>
                <li>☐ User can login with credentials</li>
                <li>☐ Login session persists after app restart</li>
                <li>☐ User can logout safely</li>
                <li>☐ Form validation with error messages</li>
                <li>☐ Loading states during auth operations</li>
              </ul>
            </div>
            
            <div>
              <strong className="text-yellow-800 dark:text-yellow-200">Task Management:</strong>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm mt-2 space-y-1 ml-4">
                <li>☐ Create new tasks with title and description</li>
                <li>☐ Mark tasks as complete/incomplete</li>
                <li>☐ Edit existing task details</li>
                <li>☐ Delete tasks with confirmation</li>
                <li>☐ Tasks persist between app sessions</li>
                <li>☐ Display task count and completion status</li>
              </ul>
            </div>
            
            <div>
              <strong className="text-yellow-800 dark:text-yellow-200">User Experience:</strong>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm mt-2 space-y-1 ml-4">
                <li>☐ Professional keyboard handling in forms</li>
                <li>☐ Smooth navigation between screens</li>
                <li>☐ Clear visual feedback for all actions</li>
                <li>☐ Consistent styling throughout app</li>
                <li>☐ Proper error handling and messages</li>
                <li>☐ Loading indicators where appropriate</li>
              </ul>
            </div>
          </div>
        </div>

        <h2>🚀 Bonus Features</h2>
        
        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800 mb-6">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            🌟 Optional Enhancements (if you have extra time):
          </h4>
          <div className="text-green-700 dark:text-green-300 space-y-3 text-sm">
            <div>
              <strong>Task Organization:</strong>
              <ul className="mt-1 space-y-1 ml-4">
                <li>• Add task priorities (High, Medium, Low)</li>
                <li>• Implement task categories/tags</li>
                <li>• Sort tasks by date created or priority</li>
                <li>• Search/filter functionality</li>
              </ul>
            </div>
            <div>
              <strong>Enhanced UX:</strong>
              <ul className="mt-1 space-y-1 ml-4">
                <li>• Dark/light theme toggle</li>
                <li>• Swipe-to-delete gestures</li>
                <li>• Task completion animations</li>
                <li>• Due date picker for tasks</li>
              </ul>
            </div>
            <div>
              <strong>Data Features:</strong>
              <ul className="mt-1 space-y-1 ml-4">
                <li>• Export tasks to text</li>
                <li>• Task statistics (completed today, this week)</li>
                <li>• Backup/restore functionality</li>
              </ul>
            </div>
          </div>
        </div>

        <h2>📚 Development Tips</h2>

        <div className="space-y-4 mb-6">
          <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-2 mt-0">
              🏁 Getting Started:
            </h4>
            <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1">
              <li>1. Start with basic app structure and navigation</li>
              <li>2. Implement authentication system first</li>
              <li>3. Add basic task CRUD operations</li>
              <li>4. Enhance with data persistence</li>
              <li>5. Polish UX and add keyboard handling</li>
            </ul>
          </div>

          <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
            <h4 className="text-purple-800 dark:text-purple-200 font-semibold mb-2 mt-0">
              🔍 Testing Your App:
            </h4>
            <ul className="text-purple-700 dark:text-purple-300 text-sm space-y-1">
              <li>• Test complete registration and login flow</li>
              <li>• Verify data persists after closing/reopening app</li>
              <li>• Test form validation with invalid inputs</li>
              <li>• Check keyboard behavior on different screens</li>
              <li>• Ensure logout clears all user data properly</li>
            </ul>
          </div>
        </div>

        <h2>🎯 Success Criteria</h2>

        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 p-6 rounded-lg border mb-6">
          <h4 className="font-semibold mb-4 mt-0">Your app is successful when:</h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>A new user can register, login, and immediately start creating tasks</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>All tasks and user session persist after closing and reopening the app</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>Forms provide clear validation feedback and handle keyboard professionally</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>The app feels smooth and responsive with proper loading states</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>Code is clean, well-organized, and follows React Native best practices</span>
            </div>
          </div>
        </div>

        <h2>📖 Concept Review</h2>

        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border mb-6">
          <h4 className="font-semibold mb-4 mt-0">Before you start, review these key concepts:</h4>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <strong className="block mb-2">Day 1-2 Review:</strong>
              <ul className="space-y-1 ml-4">
                <li>• React Native core components</li>
                <li>• useState and state management</li>
                <li>• Component structure and props</li>
                <li>• FlatList/ScrollView usage</li>
                <li>• TouchableOpacity interactions</li>
              </ul>
            </div>
            <div>
              <strong className="block mb-2">Day 3-4 Review:</strong>
              <ul className="space-y-1 ml-4">
                <li>• Form handling and validation</li>
                <li>• AsyncStorage for data persistence</li>
                <li>• Context API for global state</li>
                <li>• Authentication patterns</li>
                <li>• KeyboardAvoidingView usage</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 p-6 rounded-lg border border-orange-200 dark:border-orange-800">
          <h4 className="text-orange-800 dark:text-orange-200 font-semibold mb-3 mt-0">
            🏆 Challenge Complete!
          </h4>
          <p className="text-orange-700 dark:text-orange-300 mb-3">
            This challenge combines all the essential React Native concepts you've learned. 
            Take your time, build incrementally, and don't hesitate to review previous sessions for reference.
          </p>
          <p className="text-orange-700 dark:text-orange-300 mb-0">
            <strong>Remember:</strong> The goal is to apply your knowledge and create a functional app 
            that demonstrates your understanding of React Native fundamentals, authentication, 
            data management, and professional UX patterns.
          </p>
        </div>
      </div>
    </>
  );
}