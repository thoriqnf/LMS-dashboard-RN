"use client";

export function Day4ChallengeContent() {
  return (
    <>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
              <span className="text-white text-3xl">🌟</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2 mt-0">
                Day 4 Challenge: Build Your Personal App
              </h1>
              <p className="text-muted-foreground m-0 text-lg">
                Create something meaningful to YOU using authentication mastery
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-6 rounded-xl border border-purple-200 dark:border-purple-800 mb-8">
            <h3 className="text-purple-800 dark:text-purple-200 font-semibold mb-4 mt-0 text-xl">
              ✨ Your Journey This Week
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-purple-700 dark:text-purple-300 font-semibold mb-3">🔐 Authentication Mastery:</h4>
                <ul className="text-purple-600 dark:text-purple-300 space-y-2 text-sm">
                  <li>• **Session 1**: Professional login/signup forms with json-server-auth</li>
                  <li>• **Session 2**: React Context for global auth state management</li>
                  <li>• **Session 3**: Protected routes and authenticated navigation</li>
                  <li>• **Session 4**: Advanced features like profile management</li>
                </ul>
              </div>
              <div>
                <h4 className="text-pink-700 dark:text-pink-300 font-semibold mb-3">💡 Your Superpowers:</h4>
                <ul className="text-pink-600 dark:text-pink-300 space-y-2 text-sm">
                  <li>• **Secure Systems**: Build real authentication that works</li>
                  <li>• **User Experience**: Design smooth login flows</li>
                  <li>• **Data Security**: Handle JWT tokens and sessions</li>
                  <li>• **Personal Touch**: Make apps that matter to users</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <h2>🎨 Choose Your Personal App Adventure</h2>
        <p className="text-lg">
          Instead of building another generic notes app, create something that solves a real problem in YOUR life. 
          Pick one concept that excites you, or create your own!
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
            <h4 className="text-blue-800 dark:text-blue-200 font-bold mb-3 flex items-center gap-2">
              📚 **Personal Learning Hub**
            </h4>
            <p className="text-blue-700 dark:text-blue-300 text-sm mb-3">
              Track your learning journey across different skills and subjects
            </p>
            <div className="text-blue-600 dark:text-blue-400 text-xs space-y-1">
              <div>• Personal learning goals and progress</div>
              <div>• Study session tracking with notes</div>
              <div>• Achievement badges and milestones</div>
              <div>• Private reflection journal</div>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-950 p-6 rounded-xl border border-green-200 dark:border-green-800">
            <h4 className="text-green-800 dark:text-green-200 font-bold mb-3 flex items-center gap-2">
              🎯 **Goal Crusher**
            </h4>
            <p className="text-green-700 dark:text-green-300 text-sm mb-3">
              Turn your dreams into actionable plans with personal accountability
            </p>
            <div className="text-green-600 dark:text-green-400 text-xs space-y-1">
              <div>• Personal goal setting with deadlines</div>
              <div>• Daily/weekly check-ins and reflection</div>
              <div>• Progress visualization and celebrations</div>
              <div>• Private motivational notes</div>
            </div>
          </div>

          <div className="bg-orange-50 dark:bg-orange-950 p-6 rounded-xl border border-orange-200 dark:border-orange-800">
            <h4 className="text-orange-800 dark:text-orange-200 font-bold mb-3 flex items-center gap-2">
              💝 **Memory Keeper**
            </h4>
            <p className="text-orange-700 dark:text-orange-300 text-sm mb-3">
              Preserve your precious moments and thoughts in a private digital diary
            </p>
            <div className="text-orange-600 dark:text-orange-400 text-xs space-y-1">
              <div>• Daily moments and gratitude entries</div>
              <div>• Photo memories with personal stories</div>
              <div>• Mood tracking and pattern insights</div>
              <div>• Anniversary and milestone reminders</div>
            </div>
          </div>

          <div className="bg-purple-50 dark:bg-purple-950 p-6 rounded-xl border border-purple-200 dark:border-purple-800">
            <h4 className="text-purple-800 dark:text-purple-200 font-bold mb-3 flex items-center gap-2">
              🎭 **Creative Studio**
            </h4>
            <p className="text-purple-700 dark:text-purple-300 text-sm mb-3">
              Organize your creative projects and inspirations in one personal space
            </p>
            <div className="text-purple-600 dark:text-purple-400 text-xs space-y-1">
              <div>• Project ideas and inspiration boards</div>
              <div>• Creative process documentation</div>
              <div>• Personal portfolio and progress</div>
              <div>• Artistic experiments and sketches</div>
            </div>
          </div>

          <div className="bg-teal-50 dark:bg-teal-950 p-6 rounded-xl border border-teal-200 dark:border-teal-800">
            <h4 className="text-teal-800 dark:text-teal-200 font-bold mb-3 flex items-center gap-2">
              🌱 **Wellness Companion**
            </h4>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-3">
              Support your mental and physical health with personalized tracking
            </p>
            <div className="text-teal-600 dark:text-teal-400 text-xs space-y-1">
              <div>• Personal wellness goals and habits</div>
              <div>• Mood and energy level tracking</div>
              <div>• Mindfulness and self-care reminders</div>
              <div>• Private health insights</div>
            </div>
          </div>

          <div className="bg-rose-50 dark:bg-rose-950 p-6 rounded-xl border border-rose-200 dark:border-rose-800">
            <h4 className="text-rose-800 dark:text-rose-200 font-bold mb-3 flex items-center gap-2">
              💡 **Your Own Idea!**
            </h4>
            <p className="text-rose-700 dark:text-rose-300 text-sm mb-3">
              Have something else in mind? Build the app you've always wanted!
            </p>
            <div className="text-rose-600 dark:text-rose-400 text-xs space-y-1">
              <div>• Solve a problem you actually face</div>
              <div>• Make something your friends would use</div>
              <div>• Build on your hobbies or interests</div>
              <div>• Create something uniquely yours</div>
            </div>
          </div>
        </div>

        <h2>🚀 Your Creative Mission (Not a Checklist!)</h2>
        <p>
          This isn't about following steps - it's about creating something meaningful. Here's your creative freedom framework:
        </p>

        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/30 p-6 rounded-xl border border-yellow-200 dark:border-yellow-800 mb-6">
          <h4 className="text-yellow-800 dark:text-yellow-200 font-bold mb-4 text-lg">
            🎯 The Freedom Framework
          </h4>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h5 className="text-yellow-700 dark:text-yellow-300 font-semibold mb-2">🔐 Auth Foundation</h5>
              <p className="text-yellow-600 dark:text-yellow-400 text-sm">
                Users need accounts to access their personal data. Make login/signup feel welcoming, not intimidating.
              </p>
            </div>
            <div>
              <h5 className="text-orange-700 dark:text-orange-300 font-semibold mb-2">💫 Personal Touch</h5>
              <p className="text-orange-600 dark:text-orange-400 text-sm">
                What makes this app uniquely yours? Custom features, personal styling, or special workflows?
              </p>
            </div>
            <div>
              <h5 className="text-red-700 dark:text-red-300 font-semibold mb-2">✨ User Magic</h5>
              <p className="text-red-600 dark:text-red-400 text-sm">
                How will users feel when using your app? Accomplished? Inspired? Organized? Design for that feeling.
              </p>
            </div>
          </div>
        </div>

        <h2>💡 Inspiration Sparks (Not Requirements!)</h2>
        <p>
          Use these as creative fuel, not rigid requirements. Mix, match, or ignore completely - it's YOUR app!
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <h5 className="text-green-800 dark:text-green-200 font-semibold mb-2">🌟 Make It Personal</h5>
              <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
                <li>• Custom user profiles with personality</li>
                <li>• Personal themes or color preferences</li>
                <li>• Unique features that reflect user interests</li>
                <li>• Personalized dashboard or home screen</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <h5 className="text-blue-800 dark:text-blue-200 font-semibold mb-2">🎨 Visual Delight</h5>
              <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1">
                <li>• Beautiful, cohesive design language</li>
                <li>• Smooth animations and transitions</li>
                <li>• Thoughtful use of colors and typography</li>
                <li>• Visual feedback for user actions</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
              <h5 className="text-purple-800 dark:text-purple-200 font-semibold mb-2">🚀 Smart Features</h5>
              <ul className="text-purple-700 dark:text-purple-300 text-sm space-y-1">
                <li>• Intelligent data organization</li>
                <li>• Search and filtering capabilities</li>
                <li>• Data export or sharing options</li>
                <li>• Smart defaults and suggestions</li>
              </ul>
            </div>
            
            <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg border border-pink-200 dark:border-pink-800">
              <h5 className="text-pink-800 dark:text-pink-200 font-semibold mb-2">💖 Emotional Connection</h5>
              <ul className="text-pink-700 dark:text-pink-300 text-sm space-y-1">
                <li>• Encouraging messages and positive feedback</li>
                <li>• Progress celebration and achievements</li>
                <li>• Warm, friendly interaction design</li>
                <li>• Features that make users smile</li>
              </ul>
            </div>
          </div>
        </div>

        <h2>🎪 Show & Tell: Share Your Creation</h2>
        <p>
          The best part of creating something personal is sharing the story behind it!
        </p>

        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 p-6 rounded-xl border border-indigo-200 dark:border-indigo-800 mb-6">
          <h4 className="text-indigo-800 dark:text-indigo-200 font-bold mb-4">
            🎬 Demo Day Format (Have Fun With It!)
          </h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h5 className="text-indigo-700 dark:text-indigo-300 font-semibold mb-2">📱 App Demo</h5>
              <ul className="text-indigo-600 dark:text-indigo-400 text-sm space-y-1">
                <li>• Screen recording or live demo (2-3 minutes)</li>
                <li>• Show the login flow and main features</li>
                <li>• Highlight your favorite parts</li>
                <li>• Share any happy accidents or surprises</li>
              </ul>
            </div>
            <div>
              <h5 className="text-purple-700 dark:text-purple-300 font-semibold mb-2">💭 Your Story</h5>
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
          There's no single "right" way to complete this challenge. Success is building something that makes YOU proud!
        </p>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg text-center">
            <div className="text-2xl mb-2">🎨</div>
            <h5 className="font-semibold text-green-800 dark:text-green-200 mb-1">Creative Excellence</h5>
            <p className="text-green-700 dark:text-green-300 text-xs">
              Unique concept, beautiful design, personal touches that make it special
            </p>
          </div>
          <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg text-center">
            <div className="text-2xl mb-2">🔧</div>
            <h5 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">Technical Mastery</h5>
            <p className="text-blue-700 dark:text-blue-300 text-xs">
              Solid authentication, smooth user experience, well-implemented features
            </p>
          </div>
          <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-lg text-center">
            <div className="text-2xl mb-2">💝</div>
            <h5 className="font-semibold text-purple-800 dark:text-purple-200 mb-1">Personal Impact</h5>
            <p className="text-purple-700 dark:text-purple-300 text-xs">
              Solves a real problem, meaningful to you, something you'd proudly show others
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-gold-50 to-yellow-50 dark:from-yellow-950/30 dark:to-orange-950/30 p-6 rounded-xl border-2 border-yellow-300 dark:border-yellow-600">
          <h4 className="text-yellow-800 dark:text-yellow-200 font-bold mb-3 flex items-center gap-2 text-lg">
            🌟 Remember: You're Not Just Learning to Code
          </h4>
          <p className="text-yellow-700 dark:text-yellow-300 mb-4">
            You're learning to create digital experiences that matter to people. Your app doesn't have to be perfect - 
            it just has to be authentic to you and demonstrate the authentication skills you've mastered this week.
          </p>
          <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg">
            <p className="text-yellow-800 dark:text-yellow-200 text-sm font-medium mb-0">
              💫 **Most Important**: Have fun with this! The best apps come from developers who enjoyed building them. 
              Your enthusiasm will show in every detail, every interaction, and every thoughtful touch you add.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-2">Ready to Build Something Amazing? 🚀</h3>
            <p className="text-purple-100">
              Your authentication journey has given you the power to create secure, personal experiences. 
              Now go make something that matters to YOU!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}