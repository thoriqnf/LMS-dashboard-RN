"use client";

export function Day4ChallengeContent() {
  return (
    <>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Day 4 Challenge: Build Your Personal App
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Create something meaningful to YOU using authentication mastery
          </p>

          <div className="bg-muted/50 p-6 rounded-lg border mb-8">
            <h3 className="font-semibold mb-4 mt-0">
              What You've Learned This Week
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Authentication Skills:</h4>
                <ul className="space-y-1 text-sm">
                  <li>
                    • Professional login/signup forms with json-server-auth
                  </li>
                  <li>• React Context for global auth state management</li>
                  <li>• Protected routes and authenticated navigation</li>
                  <li>• Advanced features like profile management</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Technical Abilities:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Build secure systems that actually work</li>
                  <li>• Design smooth, user-friendly login flows</li>
                  <li>• Handle JWT tokens and user sessions</li>
                  <li>• Create personalized user experiences</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <h2>Choose Your App Concept</h2>
        <p>
          Build something that solves a real problem in YOUR life. Here are some
          ideas, or create your own:
        </p>

        <div className="border rounded-lg p-4 mb-8 max-w-md">
          <h4 className="font-semibold mb-2">💡 Your Own Idea</h4>
          <p className="text-sm text-muted-foreground mb-2">
            Build the app you've always wanted
          </p>
          <ul className="text-xs space-y-1">
            <li>• Solve a problem you actually face</li>
            <li>• Build on your hobbies or interests</li>
            <li>• Create something uniquely yours</li>
          </ul>
        </div>

        <h2>Your Challenge Mission</h2>
        <p>
          Create something meaningful using your authentication skills. Focus on
          these core areas:
        </p>

        <div className="bg-muted/50 p-6 rounded-lg border mb-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-2">🔐 Authentication</h4>
              <p className="text-sm text-muted-foreground">
                Users need accounts to access their personal data. Make
                login/signup welcoming and smooth.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">💫 Personal Features</h4>
              <p className="text-sm text-muted-foreground">
                What makes this app uniquely yours? Add custom features that
                reflect your vision.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">✨ User Experience</h4>
              <p className="text-sm text-muted-foreground">
                How should users feel? Accomplished? Organized? Design
                interactions that create that feeling.
              </p>
            </div>
          </div>
        </div>

        <h2>Implementation Ideas</h2>
        <p>
          Use these as inspiration, not requirements. Pick what fits your
          vision:
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div>
            <h4 className="font-semibold mb-3">Essential Features</h4>
            <ul className="space-y-2 text-sm">
              <li>• User registration and login system</li>
              <li>• Protected routes for authenticated users</li>
              <li>• Personal data that belongs to each user</li>
              <li>• Clean, intuitive user interface</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Enhancement Options</h4>
            <ul className="space-y-2 text-sm">
              <li>• User profile management</li>
              <li>• Data search and filtering</li>
              <li>• Visual progress indicators</li>
              <li>• Export or sharing capabilities</li>
            </ul>
          </div>
        </div>

        <h2>🎪 Show & Tell: Share Your Creation</h2>
        <p>
          The best part of creating something personal is sharing the story
          behind it!
        </p>

        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 p-6 rounded-xl border border-indigo-200 dark:border-indigo-800 mb-6">
          <h4 className="text-indigo-800 dark:text-indigo-200 font-bold mb-4">
            🎬 Demo Day Format (Have Fun With It!)
          </h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h5 className="text-indigo-700 dark:text-indigo-300 font-semibold mb-2">
                📱 App Demo
              </h5>
              <ul className="text-indigo-600 dark:text-indigo-400 text-sm space-y-1">
                <li>• Live Demo (2-3 minutes)</li>
                <li>• Show the login flow and main features</li>
                <li>• Highlight your favorite parts</li>
                <li>• Share any happy accidents or surprises</li>
              </ul>
            </div>
            <div>
              <h5 className="text-purple-700 dark:text-purple-300 font-semibold mb-2">
                💭 Your Story
              </h5>
              <ul className="text-purple-600 dark:text-purple-400 text-sm space-y-1">
                <li>• Why did you choose this app concept?</li>
                <li>• What was your biggest "aha!" moment?</li>
                <li>• What would you add with more time?</li>
                <li>• Would you actually use this app?</li>
              </ul>
            </div>
          </div>
        </div>

        <h2>🏆 Success Looks Different for Everyone</h2>
        <p>
          There's no single "right" way to complete this challenge. Success is
          building something that makes YOU proud!
        </p>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg text-center">
            <div className="text-2xl mb-2">🎨</div>
            <h5 className="font-semibold text-green-800 dark:text-green-200 mb-1">
              Creative Excellence
            </h5>
            <p className="text-green-700 dark:text-green-300 text-xs">
              Unique concept, beautiful design, personal touches that make it
              special
            </p>
          </div>
          <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg text-center">
            <div className="text-2xl mb-2">🔧</div>
            <h5 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">
              Technical Mastery
            </h5>
            <p className="text-blue-700 dark:text-blue-300 text-xs">
              Solid authentication, smooth user experience, well-implemented
              features
            </p>
          </div>
          <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-lg text-center">
            <div className="text-2xl mb-2">💝</div>
            <h5 className="font-semibold text-purple-800 dark:text-purple-200 mb-1">
              Personal Impact
            </h5>
            <p className="text-purple-700 dark:text-purple-300 text-xs">
              Solves a real problem, meaningful to you, something you'd proudly
              show others
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-gold-50 to-yellow-50 dark:from-yellow-950/30 dark:to-orange-950/30 p-6 rounded-xl border-2 border-yellow-300 dark:border-yellow-600">
          <h4 className="text-yellow-800 dark:text-yellow-200 font-bold mb-3 flex items-center gap-2 text-lg">
            🌟 Remember: You're Not Just Learning to Code
          </h4>
          <p className="text-yellow-700 dark:text-yellow-300 mb-4">
            You're learning to create digital experiences that matter to people.
            Your app doesn't have to be perfect - it just has to be authentic to
            you and demonstrate the authentication skills you've mastered this
            week.
          </p>
          <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg">
            <p className="text-yellow-800 dark:text-yellow-200 text-sm font-medium mb-0">
              💫 Most Important: Have fun with this! The best apps come from
              developers who enjoyed building them. Your enthusiasm will show in
              every detail, every interaction, and every thoughtful touch you
              add.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
