"use client";

import { CodeBlock } from "@/components/ui/code-block-new";
import { PasswordProtectedContent } from "@/components/ui/password-protected-content";

export function Day2ChallengeContent() {
  return (
    <>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Day 2 Challenge: Professional Mobile Portfolio App
          </h1>

          <div className="bg-orange-50 dark:bg-orange-950 p-6 rounded-lg border border-orange-200 dark:border-orange-800 mb-8">
            <h3 className="text-orange-800 dark:text-orange-200 font-semibold mb-4 mt-0">
              🎯 Challenge Overview
            </h3>
            <p className="text-orange-700 dark:text-orange-300 mb-4">
              Build a professional portfolio app that showcases your React
              Native mastery! This challenge combines{" "}
              <strong>all Day 2 concepts</strong>: advanced navigation patterns,
              optimized lists, professional fonts & images, and a complete UI
              component system.
            </p>
            <div className="text-orange-700 dark:text-orange-300">
              <h4 className="font-semibold mb-2">What You'll Master:</h4>
              <ul className="space-y-1 mb-4">
                <li>
                  <strong>Challenge 1:</strong> Tab navigation + modal screens +
                  deep linking
                </li>
                <li>
                  <strong>Challenge 2:</strong> Custom fonts, image galleries,
                  loading states
                </li>
                <li>
                  <strong>Challenge 3:</strong> Complete UI component library
                  with theming
                </li>
              </ul>
            </div>
          </div>
        </div>

        <h2>📱 What You'll Build</h2>

        <div className="my-6 p-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg">
          <div className="max-w-sm mx-auto bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 overflow-hidden">
            {/* Phone Header */}
            <div className="bg-blue-600 px-4 py-3">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-semibold">Portfolio</h3>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
                  <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
                  <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 flex space-x-4 text-xs">
              <span className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-1">
                Projects
              </span>
              <span className="text-gray-500">About</span>
              <span className="text-gray-500">Skills</span>
            </div>

            {/* Content Area */}
            <div className="p-4 space-y-3">
              {/* Project Item 1 */}
              <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <span className="text-lg">📱</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    React Native App
                  </h4>
                  <p className="text-xs text-gray-500">Mobile Development</p>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>

              {/* Project Item 2 */}
              <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                  <span className="text-lg">🎨</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    Design System
                  </h4>
                  <p className="text-xs text-gray-500">UI/UX Design</p>
                </div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              </div>

              {/* Project Item 3 */}
              <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <span className="text-lg">⚡</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    Performance Opt.
                  </h4>
                  <p className="text-xs text-gray-500">Optimization</p>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
            </div>

            {/* Bottom Action */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-600">
              <div className="bg-blue-600 text-center py-2 rounded-lg">
                <span className="text-white text-sm font-medium">
                  View Project Details
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400 italic">
              ✨ Professional portfolio with tabs, optimized lists & custom UI!
            </p>
          </div>
        </div>

        {/* App Architecture Overview */}
        <div className="my-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-3 mt-0">
            🏗️ App Architecture:
          </h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-2 mb-0">
            <li>
              • <strong>Tab Navigation:</strong> Projects, About, Skills tabs
              with custom styling
            </li>
            <li>
              • <strong>Modal Screens:</strong> Project detail modals with
              smooth animations
            </li>
            <li>
              • <strong>Optimized Lists:</strong> FlatList Data
            </li>
            <li>
              • <strong>Custom Fonts:</strong> Professional typography system
            </li>
            <li>
              • <strong>Image System:</strong> Galleries with loading states &
              error handling
            </li>
            <li>
              • <strong>Global UI:</strong> Reusable components with theme
              management
            </li>
            <li>
              • <strong>Deep Linking:</strong> Direct navigation to specific
              projects
            </li>
          </ul>
        </div>

        <h2>🚀 Getting Started</h2>

        <div className="my-6 p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <h4 className="text-yellow-800 dark:text-yellow-200 font-semibold mb-3 mt-0">
            📋 Before You Start:
          </h4>
          <ol className="text-yellow-700 dark:text-yellow-300 text-sm space-y-2 mb-0">
            <li>
              <strong>1. Review Day 2 Sessions:</strong> Make sure you've
              completed Sessions 1-4
            </li>
            <li>
              <strong>2. Set Up Project:</strong> Create a new Expo project or
              use existing one
            </li>
            <li>
              <strong>3. Choose Your Mode:</strong> Decide between Beginner or
              Extra Miles
            </li>
            <li>
              <strong>4. Plan Your Portfolio:</strong> Think about 4-6 projects
              to showcase
            </li>
            <li>
              <strong>5. Gather Assets:</strong> Prepare project images and
              descriptions
            </li>
          </ol>
        </div>

        <h2>✅ Testing & Success Criteria</h2>

        <div className="my-6 p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            📱 Testing Checklist:
          </h4>
          <div className="text-green-700 dark:text-green-300 text-sm">
            <h5 className="font-semibold mb-2">Core Functionality:</h5>
            <ul className="space-y-1 mb-4">
              <li>□ Tab navigation works smoothly between screens</li>
              <li>□ Project list loads with proper optimization</li>
              <li>□ Project cards navigate to detail modals</li>
              <li>□ Modal screens display all project information</li>
              <li>□ Back navigation works from all screens</li>
            </ul>

            <h5 className="font-semibold mb-2">Performance:</h5>
            <ul className="space-y-1 mb-4">
              <li>□ Lists scroll smoothly</li>
              <li>□ Images load with proper loading states</li>
              <li>□ App memory usage stays reasonable</li>
              <li>□ Navigation animations are smooth</li>
            </ul>

            <h5 className="font-semibold mb-2">Extra Miles (Advanced):</h5>
            <ul className="space-y-1 mb-0">
              <li>□ Theme switching works and persists</li>
              <li>□ Search filters projects correctly</li>
              <li>□ Favorites save and load properly</li>
              <li>□ All animations are polished</li>
              <li>□ Error states are handled gracefully</li>
            </ul>
          </div>
        </div>

        <div className="my-6 p-4 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
          <h4 className="text-red-800 dark:text-red-200 font-semibold mb-3 mt-0">
            🐛 Common Issues & Solutions:
          </h4>
          <ul className="text-red-700 dark:text-red-300 text-sm space-y-2 mb-0">
            <li>
              • <strong>Tab navigation not showing:</strong> Check (tabs) folder
              structure and _layout.tsx
            </li>
            <li>
              • <strong>Modal not opening:</strong> Verify project/[id].tsx file
              exists and router.push is correct
            </li>
            <li>
              • <strong>List performance issues:</strong> Add getItemLayout,
              keyExtractor, and optimization props
            </li>
            <li>
              • <strong>Images not loading:</strong> Check image paths and add
              proper loading states
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
