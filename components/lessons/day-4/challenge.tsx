"use client";

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
                Day 4 Challenge: Personal Notes App
              </h1>
              <p className="text-muted-foreground m-0">
                Build a simple notes app with real authentication in just 1 hour
              </p>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-8">
            <h3 className="text-blue-800 dark:text-blue-200 font-semibold mb-4 mt-0">
              🎯 Challenge Overview
            </h3>
            <p className="text-blue-700 dark:text-blue-300 mb-4">
              Create a personal notes app that demonstrates the authentication system from Day 4 Sessions 1-3. 
              This focused challenge lets you practice real authentication with a simple, achievable project.
            </p>
            <div className="text-blue-700 dark:text-blue-300 text-sm">
              <strong>Estimated Time:</strong> 1 hour • <strong>Difficulty:</strong> Beginner-Intermediate
            </div>
          </div>
        </div>

        <h2>📝 What You'll Build</h2>

        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border mb-6">
          <h4 className="font-semibold mb-3 mt-0">Simple Personal Notes App:</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong className="text-green-600">Authentication (30 min):</strong>
              <ul className="mt-1 space-y-1 ml-4">
                <li>• Login/signup with json-server-auth</li>
                <li>• JWT token management</li>
                <li>• Protected routes</li>
                <li>• Session persistence</li>
              </ul>
            </div>
            <div>
              <strong className="text-blue-600">Notes Features (25 min):</strong>
              <ul className="mt-1 space-y-1 ml-4">
                <li>• Add new notes (title + content)</li>
                <li>• View all notes in a list</li>
                <li>• Delete notes</li>
                <li>• Store notes in AsyncStorage</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
            <strong className="text-yellow-800 dark:text-yellow-200">⏱️ Polish (5 min):</strong>
            <span className="text-yellow-700 dark:text-yellow-300 text-sm ml-2">Basic styling, loading states, keyboard handling</span>
          </div>
        </div>

        <h2>🚀 Quick Setup Guide</h2>

        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800 mb-6">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-4 mt-0">
            ⚡ Copy & Paste Ready Components:
          </h4>
          <div className="text-green-700 dark:text-green-300 space-y-3 text-sm">
            <div>
              <strong>Step 1 (10 min): Backend Setup</strong>
              <ul className="mt-1 space-y-1 ml-4">
                <li>• Copy json-server-auth setup from Day 4 Session 1</li>
                <li>• Run: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">npx json-server-auth db.json --port 3001</code></li>
              </ul>
            </div>
            <div>
              <strong>Step 2 (20 min): Authentication</strong>
              <ul className="mt-1 space-y-1 ml-4">
                <li>• Copy AuthContext code from Day 4 Session 2</li>
                <li>• Copy login/signup forms from Day 4 Session 1</li>
                <li>• Copy ProtectedRoute from Day 4 Session 3</li>
              </ul>
            </div>
            <div>
              <strong>Step 3 (25 min): Notes Features</strong>
              <ul className="mt-1 space-y-1 ml-4">
                <li>• Create simple add note form (title + content fields)</li>
                <li>• Display notes in FlatList</li>
                <li>• Add delete button per note</li>
                <li>• Use AsyncStorage to save notes locally</li>
              </ul>
            </div>
            <div>
              <strong>Step 4 (5 min): Final Polish</strong>
              <ul className="mt-1 space-y-1 ml-4">
                <li>• Add KeyboardAvoidingView to forms</li>
                <li>• Basic loading states</li>
                <li>• Simple styling</li>
              </ul>
            </div>
          </div>
        </div>

        <h2>📱 Simple App Flow</h2>

        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border mb-6">
          <h4 className="font-semibold mb-4 mt-0">Just 2 Main Screens:</h4>
          <div className="space-y-4 text-sm">
            <div className="border-l-4 border-blue-500 pl-4">
              <strong>1. Auth Screen (If not logged in)</strong>
              <p className="mt-1 text-gray-600 dark:text-gray-400">
                Simple login/signup forms using Day 4 Session 1 components
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <strong>2. Notes Screen (If logged in)</strong>
              <p className="mt-1 text-gray-600 dark:text-gray-400">
                Add note form at top, list of notes below with delete buttons
              </p>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <strong className="text-blue-800 dark:text-blue-200">💡 Navigation:</strong>
            <span className="text-blue-700 dark:text-blue-300 text-sm ml-2">
              Use conditional rendering - no complex navigation needed!
            </span>
          </div>
        </div>

        <h2>✅ Simple Checklist</h2>

        <div className="bg-yellow-50 dark:bg-yellow-950 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800 mb-6">
          <h4 className="text-yellow-800 dark:text-yellow-200 font-semibold mb-4 mt-0">
            🎯 Must-Have Features (1 Hour Total):
          </h4>
          
          <div className="space-y-4">
            <div>
              <strong className="text-yellow-800 dark:text-yellow-200">Authentication (30 min):</strong>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm mt-2 space-y-1 ml-4">
                <li>☐ json-server-auth backend running</li>
                <li>☐ User can register with email/password</li>
                <li>☐ User can login and receive JWT token</li>
                <li>☐ Login persists after app restart</li>
                <li>☐ User can logout</li>
                <li>☐ Basic form validation</li>
              </ul>
            </div>
            
            <div>
              <strong className="text-yellow-800 dark:text-yellow-200">Notes Features (25 min):</strong>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm mt-2 space-y-1 ml-4">
                <li>☐ Add new note with title and content</li>
                <li>☐ Display all notes in a list</li>
                <li>☐ Delete notes with simple button</li>
                <li>☐ Notes save to AsyncStorage</li>
                <li>☐ Notes load on app start</li>
              </ul>
            </div>
            
            <div>
              <strong className="text-yellow-800 dark:text-yellow-200">Basic Polish (5 min):</strong>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm mt-2 space-y-1 ml-4">
                <li>☐ KeyboardAvoidingView on forms</li>
                <li>☐ Loading states during login</li>
                <li>☐ Simple, clean styling</li>
              </ul>
            </div>
          </div>
        </div>

        <h2>🌟 If You Finish Early</h2>
        
        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800 mb-6">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            ⚡ Quick Enhancements (5-10 min each):
          </h4>
          <div className="text-green-700 dark:text-green-300 text-sm">
            <ul className="space-y-1">
              <li>• Add note creation timestamp</li>
              <li>• Add simple note search</li>
              <li>• Add logout button in notes screen</li>
              <li>• Show user name after login</li>
              <li>• Add confirmation dialog before deleting notes</li>
              <li>• Add empty state message when no notes</li>
            </ul>
          </div>
        </div>

        <h2>💡 Pro Tips</h2>

        <div className="space-y-4 mb-6">
          <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-2 mt-0">
              ⏰ Time Management:
            </h4>
            <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1">
              <li>• Don't get stuck on styling - use simple, clean designs</li>
              <li>• Copy-paste authentication code from Day 4 sessions</li>
              <li>• Focus on functionality first, polish last</li>
              <li>• Test early and often - especially the backend connection</li>
            </ul>
          </div>

          <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
            <h4 className="text-purple-800 dark:text-purple-200 font-semibold mb-2 mt-0">
              🔍 Quick Testing:
            </h4>
            <ul className="text-purple-700 dark:text-purple-300 text-sm space-y-1">
              <li>• Check json-server-auth is running before starting</li>
              <li>• Test registration first, then login</li>
              <li>• Verify notes save by closing and reopening app</li>
              <li>• Make sure logout clears everything properly</li>
            </ul>
          </div>
        </div>

        <h2>🎯 Success = These 3 Things Work</h2>

        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 p-6 rounded-lg border mb-6">
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-green-500 mt-1 text-lg">✓</span>
              <span><strong>Authentication works:</strong> Can register, login, logout, and stay logged in after app restart</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-500 mt-1 text-lg">✓</span>
              <span><strong>Notes work:</strong> Can add notes, see them in a list, delete them, and they persist</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-500 mt-1 text-lg">✓</span>
              <span><strong>App flows well:</strong> Unauthenticated users see login, authenticated users see notes</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 p-6 rounded-lg border border-orange-200 dark:border-orange-800">
          <h4 className="text-orange-800 dark:text-orange-200 font-semibold mb-3 mt-0">
            🏆 You Did It!
          </h4>
          <p className="text-orange-700 dark:text-orange-300 mb-3">
            This simple challenge demonstrates real authentication with a practical app in just 1 hour. 
            You've learned to build secure, persistent, user-focused React Native applications.
          </p>
          <p className="text-orange-700 dark:text-orange-300 mb-0">
            <strong>Next steps:</strong> Try the bonus features, or use this foundation to build your own ideas!
          </p>
        </div>
      </div>
    </>
  );
}