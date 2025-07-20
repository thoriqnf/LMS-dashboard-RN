"use client";

import { CodeBlock } from "@/components/ui/code-block-new";

export function Day6Session2Content() {
  return (
    <>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Building React Native - Session 2
          </h1>

          <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-8">
            <h3 className="text-blue-800 dark:text-blue-200 font-semibold mb-4 mt-0">
              🔨 Session Overview
            </h3>
            <ul className="text-blue-700 dark:text-blue-300 space-y-2 mb-0">
              <li>
                <strong>Development Builds</strong> - Create custom development clients for testing
              </li>
              <li>
                <strong>Test on Real Devices</strong> - Deploy and test builds on physical iOS and Android devices
              </li>
              <li>
                <strong>Build Process Workflow</strong> - Understand the complete EAS build pipeline
              </li>
              <li>
                <strong>Troubleshooting Build Issues</strong> - Debug common build failures and errors
              </li>
              <li>
                <strong>Build Optimization</strong> - Improve build times and reduce bundle sizes
              </li>
              <li>
                <strong>Testing Strategies</strong> - Best practices for device testing and validation
              </li>
            </ul>
          </div>
        </div>

        <h2>1. Understanding React Native Build Types</h2>

        <h3>Development vs Production Builds</h3>
        <p>
          React Native apps require different build types for different stages of development. 
          Understanding these differences is crucial for effective testing and deployment.
        </p>

        <div className="my-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-2 mt-0">
            🏗️ Build Types Comparison:
          </h4>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <strong className="text-blue-600">Development Build</strong>
              <ul className="mt-2 space-y-1 text-blue-700 dark:text-blue-300">
                <li>• Fast refresh enabled</li>
                <li>• Debug symbols included</li>
                <li>• Larger bundle size</li>
                <li>• Development tools active</li>
              </ul>
            </div>
            <div>
              <strong className="text-green-600">Preview Build</strong>
              <ul className="mt-2 space-y-1 text-blue-700 dark:text-blue-300">
                <li>• Production-like performance</li>
                <li>• Internal distribution</li>
                <li>• QA and testing ready</li>
                <li>• Optimized but debuggable</li>
              </ul>
            </div>
            <div>
              <strong className="text-purple-600">Production Build</strong>
              <ul className="mt-2 space-y-1 text-blue-700 dark:text-blue-300">
                <li>• Fully optimized</li>
                <li>• Minimal bundle size</li>
                <li>• App store ready</li>
                <li>• No debug tools</li>
              </ul>
            </div>
          </div>
        </div>

        <h2>2. Creating Development Builds</h2>
        <p>
          Development builds allow you to test your app with custom native code while maintaining 
          the development workflow. They're essential when using custom native modules.
        </p>

        <CodeBlock
          code={`# Create a development build for iOS
eas build --platform ios --profile development

# Create a development build for Android
eas build --platform android --profile development

# Build for both platforms simultaneously
eas build --platform all --profile development

# Check build status
eas build:list

# Get build details
eas build:view [build-id]`}
          language="bash"
          filename="terminal"
          title="Creating Development Builds"
        />

        <h3>Development Build Configuration</h3>
        <p>
          Your eas.json development profile should be optimized for fast iteration and debugging.
        </p>

        <CodeBlock
          code={`{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": {
        "resourceClass": "m1-medium",
        "simulator": true,
        "buildConfiguration": "Debug"
      },
      "android": {
        "buildType": "apk",
        "gradleCommand": ":app:assembleDebug"
      },
      "env": {
        "NODE_ENV": "development"
      },
      "cache": {
        "disabled": false
      }
    }
  }
}`}
          language="json"
          filename="eas.json"
          title="Development Build Configuration"
        />

        <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 my-6">
          <h4 className="text-yellow-800 dark:text-yellow-200 font-semibold mb-2 mt-0">
            ⚡ Development Build Benefits
          </h4>
          <div className="text-yellow-700 dark:text-yellow-300 text-sm space-y-2">
            <div><strong>Custom Native Code:</strong> Test native modules and custom native components</div>
            <div><strong>Real Device Testing:</strong> Test device-specific features and performance</div>
            <div><strong>Fast Refresh:</strong> Maintain fast development iteration on device</div>
            <div><strong>Debug Features:</strong> Access to React DevTools and native debugging</div>
          </div>
        </div>

        <h2>3. Testing on Real Devices</h2>
        <p>
          Real device testing is crucial for catching issues that simulators miss. 
          Here's how to effectively test your builds on physical devices.
        </p>

        <h3>iOS Device Testing</h3>
        <CodeBlock
          code={`# Build for iOS simulator (faster for initial testing)
eas build --platform ios --profile development

# Build for physical iOS device
eas build --platform ios --profile development --no-simulator

# Install on device methods:
# 1. Download IPA and install via Xcode
# 2. Use TestFlight for internal testing
# 3. Direct download via QR code (development builds)

# Check iOS device compatibility
eas device:list

# Register new iOS device for development
eas device:create`}
          language="bash"
          filename="terminal"
          title="iOS Device Testing"
        />

        <h3>Android Device Testing</h3>
        <CodeBlock
          code={`# Build APK for Android device
eas build --platform android --profile development

# The APK can be installed directly on device:
# 1. Download APK from EAS dashboard
# 2. Transfer to device and install
# 3. Use QR code for direct download
# 4. Install via ADB

# Install via ADB (Android Debug Bridge)
adb install path/to/your/app.apk

# Check connected devices
adb devices

# Install and launch immediately
adb install -r your-app.apk && adb shell am start -n com.yourpackage.name/.MainActivity`}
          language="bash"
          filename="terminal"
          title="Android Device Testing"
        />

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg border">
            <h4 className="font-semibold mb-2 mt-0">📱 iOS Testing Setup:</h4>
            <div className="text-sm space-y-1">
              <div>• Register device UDID in Apple Developer account</div>
              <div>• Use development provisioning profile</div>
              <div>• Install via Xcode or TestFlight</div>
              <div>• Enable developer mode on iOS 16+</div>
              <div>• Trust developer certificate in Settings</div>
            </div>
          </div>
          
          <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg border">
            <h4 className="font-semibold mb-2 mt-0">🤖 Android Testing Setup:</h4>
            <div className="text-sm space-y-1">
              <div>• Enable Developer Options</div>
              <div>• Allow installation from unknown sources</div>
              <div>• Enable USB debugging for ADB</div>
              <div>• Install APK directly or via ADB</div>
              <div>• Grant necessary permissions</div>
            </div>
          </div>
        </div>

        <h2>4. Build Process Deep Dive</h2>
        <p>
          Understanding the EAS build process helps you optimize builds and troubleshoot issues effectively.
        </p>

        <CodeBlock
          code={`# Start a build with verbose logging
eas build --platform ios --profile development --verbose

# Build with specific Expo SDK version
eas build --platform all --profile development --sdk-version 49.0.0

# Build with custom environment variables
eas build --platform all --profile development --env CUSTOM_VAR=value

# Build with clear cache (slower but ensures clean build)
eas build --platform all --profile development --clear-cache

# Dry run to validate configuration without building
eas build --platform all --profile development --dry-run`}
          language="bash"
          filename="terminal"
          title="Advanced Build Commands"
        />

        <h3>Build Status and Monitoring</h3>
        <CodeBlock
          code={`# Monitor build progress
eas build:list --status=in-progress

# Get detailed build information
eas build:view [build-id]

# Download build artifacts
eas build:download [build-id]

# Cancel running build
eas build:cancel [build-id]

# View build logs
eas build:view [build-id] --logs`}
          language="bash"
          filename="terminal"
          title="Build Monitoring Commands"
        />

        <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800 my-6">
          <h4 className="text-purple-800 dark:text-purple-200 font-semibold mb-2 mt-0">
            🔄 Build Process Stages
          </h4>
          <div className="text-purple-700 dark:text-purple-300 text-sm space-y-2">
            <div><strong>1. Queue:</strong> Build request queued in EAS infrastructure</div>
            <div><strong>2. Setup:</strong> Build environment and dependencies installation</div>
            <div><strong>3. Install:</strong> npm/yarn install and native dependencies</div>
            <div><strong>4. Build:</strong> Native compilation and bundle generation</div>
            <div><strong>5. Upload:</strong> Build artifacts uploaded to EAS servers</div>
            <div><strong>6. Complete:</strong> Build ready for download and distribution</div>
          </div>
        </div>

        <h2>5. Troubleshooting Build Issues</h2>
        <p>
          Build failures are common, especially when setting up new projects or adding native dependencies. 
          Here's how to diagnose and fix common issues.
        </p>

        <h3>Common Build Errors</h3>
        <div className="space-y-6">
          <div className="border border-red-200 dark:border-red-800 rounded-lg p-4">
            <h4 className="text-red-800 dark:text-red-200 font-semibold mb-2">❌ Dependency Issues</h4>
            <CodeBlock
              code={`# Error: Unable to resolve dependency
# Solution: Clean install dependencies
rm -rf node_modules package-lock.json
npm install

# For native dependencies
npx expo install --fix

# Check for version conflicts
npm ls --depth=0`}
              language="bash"
              filename="fix-dependencies.sh"
              title="Fixing Dependency Issues"
            />
          </div>

          <div className="border border-red-200 dark:border-red-800 rounded-lg p-4">
            <h4 className="text-red-800 dark:text-red-200 font-semibold mb-2">❌ Native Module Issues</h4>
            <CodeBlock
              code={`# Error: Native module not found
# Solution: Ensure proper installation
npx expo install expo-camera expo-media-library

# For development builds, rebuild with new modules
eas build --platform all --profile development --clear-cache

# Check native module compatibility
npx expo doctor`}
              language="bash"
              filename="fix-native-modules.sh"
              title="Fixing Native Module Issues"
            />
          </div>

          <div className="border border-red-200 dark:border-red-800 rounded-lg p-4">
            <h4 className="text-red-800 dark:text-red-200 font-semibold mb-2">❌ Configuration Errors</h4>
            <CodeBlock
              code={`# Error: Invalid bundle identifier
# Solution: Update app.json with unique identifiers
{
  "expo": {
    "ios": {
      "bundleIdentifier": "com.yourcompany.uniqueapp"
    },
    "android": {
      "package": "com.yourcompany.uniqueapp"
    }
  }
}

# Validate configuration
eas build --dry-run`}
              language="json"
              filename="fix-configuration.json"
              title="Fixing Configuration Errors"
            />
          </div>
        </div>

        <h3>Debugging Build Failures</h3>
        <CodeBlock
          code={`# Get detailed build logs
eas build:view [build-id] --logs

# Common debugging steps:
# 1. Check build logs for specific error messages
# 2. Verify all dependencies are compatible
# 3. Ensure app.json configuration is valid
# 4. Clear cache and retry build
# 5. Update EAS CLI to latest version

# Emergency troubleshooting
eas build --platform ios --profile development --clear-cache --verbose

# Check EAS CLI version and update
eas --version
npm update -g @expo/eas-cli`}
          language="bash"
          filename="debug-builds.sh"
          title="Debugging Build Process"
        />

        <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg border border-red-200 dark:border-red-800 my-6">
          <h4 className="text-red-800 dark:text-red-200 font-semibold mb-2 mt-0">
            🚨 Build Troubleshooting Checklist
          </h4>
          <div className="text-red-700 dark:text-red-300 text-sm space-y-1">
            <div>✓ Check build logs for specific error messages</div>
            <div>✓ Verify all native dependencies are properly installed</div>
            <div>✓ Ensure unique bundle identifiers and package names</div>
            <div>✓ Update Expo SDK and dependencies to latest versions</div>
            <div>✓ Clear EAS cache if builds were previously working</div>
            <div>✓ Validate eas.json and app.json syntax</div>
            <div>✓ Check Expo account and project linking</div>
          </div>
        </div>

        <h2>6. Build Optimization Strategies</h2>
        <p>
          Optimizing your builds reduces build times, improves app performance, and saves on EAS build minutes.
        </p>

        <h3>Reducing Build Times</h3>
        <CodeBlock
          code={`{
  "build": {
    "development": {
      "cache": {
        "disabled": false,
        "cacheDefaultPaths": true,
        "customPaths": [
          "node_modules",
          ".expo"
        ]
      },
      "env": {
        "NODE_ENV": "development"
      },
      "ios": {
        "resourceClass": "m1-medium",
        "cache": {
          "disabled": false
        }
      },
      "android": {
        "cache": {
          "disabled": false
        }
      }
    }
  }
}`}
          language="json"
          filename="eas.json"
          title="Build Caching Configuration"
        />

        <h3>Bundle Size Optimization</h3>
        <CodeBlock
          code={`// metro.config.js - Optimize bundle
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Enable tree shaking
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// Optimize assets
config.transformer.assetRegistryPath = 'react-native/Libraries/Image/AssetRegistry';

// Enable minification for production
if (process.env.NODE_ENV === 'production') {
  config.transformer.minifierConfig = {
    keep_fnames: true,
    mangle: {
      keep_fnames: true,
    },
  };
}

module.exports = config;`}
          language="javascript"
          filename="metro.config.js"
          title="Metro Configuration for Optimization"
        />

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg border">
            <h4 className="font-semibold mb-2 mt-0">⚡ Speed Optimizations:</h4>
            <div className="text-sm space-y-1">
              <div>• Enable build caching</div>
              <div>• Use m1-medium or larger resource class</div>
              <div>• Minimize native dependencies</div>
              <div>• Use monorepo-friendly configurations</div>
              <div>• Optimize asset sizes and formats</div>
            </div>
          </div>
          
          <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg border">
            <h4 className="font-semibold mb-2 mt-0">📦 Size Optimizations:</h4>
            <div className="text-sm space-y-1">
              <div>• Enable ProGuard/R8 for Android</div>
              <div>• Use App Bundle (AAB) for Android</div>
              <div>• Optimize images and assets</div>
              <div>• Remove unused dependencies</div>
              <div>• Enable dead code elimination</div>
            </div>
          </div>
        </div>

        <h2>7. Testing Strategies and Best Practices</h2>
        <p>
          Effective testing on real devices requires a systematic approach to catch issues early 
          and ensure consistent app behavior across different devices.
        </p>

        <h3>Device Testing Matrix</h3>
        <CodeBlock
          code={`# Testing Strategy Checklist

## iOS Testing Matrix
- iPhone SE (smallest screen, older hardware)
- iPhone 14 Pro (latest features, notch handling)
- iPad (tablet layout, different orientations)
- iOS versions: Latest, Latest-1, Minimum supported

## Android Testing Matrix
- Low-end device (Android 7-8, 2GB RAM)
- Mid-range device (Android 10-11, 4GB RAM)
- High-end device (Android 12+, 6GB+ RAM)
- Different screen sizes and densities

## Feature Testing Areas
- Authentication flows
- Navigation and deep linking
- Camera and media access
- Push notifications
- Offline functionality
- Performance under load`}
          language="text"
          filename="testing-matrix.md"
          title="Comprehensive Testing Matrix"
        />

        <h3>Automated Testing Integration</h3>
        <CodeBlock
          code={`# package.json scripts for testing
{
  "scripts": {
    "test": "jest",
    "test:e2e": "detox test",
    "build:test": "eas build --platform all --profile preview",
    "test:device": "maestro test flows/",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "type-check": "tsc --noEmit"
  }
}

# Pre-build testing script
#!/bin/bash
npm run lint
npm run type-check
npm run test
if [ $? -eq 0 ]; then
  echo "All tests passed, starting build..."
  eas build --platform all --profile development
else
  echo "Tests failed, aborting build"
  exit 1
fi`}
          language="bash"
          filename="test-automation.sh"
          title="Testing Automation Scripts"
        />

        <h2>8. Hands-On Exercise: Complete Build and Test Workflow</h2>
        <p>
          Let's create a complete workflow from building your app to testing it on real devices, 
          including troubleshooting common issues.
        </p>

        <div className="bg-orange-50 dark:bg-orange-950 p-6 rounded-lg border border-orange-200 dark:border-orange-800 my-6">
          <h4 className="text-orange-800 dark:text-orange-200 font-semibold mb-3 mt-0">
            🎯 Exercise: Build-Test-Debug Workflow
          </h4>
          <div className="text-orange-700 dark:text-orange-300 space-y-3">
            <div>
              <strong>Phase 1:</strong> Build and Deploy
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li>Create development builds for iOS and Android</li>
                <li>Monitor build progress and handle any failures</li>
                <li>Download and install builds on physical devices</li>
                <li>Verify basic app functionality</li>
              </ul>
            </div>
            
            <div>
              <strong>Phase 2:</strong> Comprehensive Testing
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li>Test core app features on multiple devices</li>
                <li>Verify device-specific functionality (camera, location)</li>
                <li>Test different network conditions</li>
                <li>Document any issues or inconsistencies</li>
              </ul>
            </div>

            <div>
              <strong>Phase 3:</strong> Debug and Optimize
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li>Reproduce and debug any issues found</li>
                <li>Optimize build configuration for faster iterations</li>
                <li>Create preview builds for stakeholder testing</li>
                <li>Set up automated testing workflow</li>
              </ul>
            </div>
          </div>
        </div>

        <CodeBlock
          code={`#!/bin/bash
# Complete Build and Test Workflow Script

echo "🚀 Starting Build and Test Workflow..."

# Step 1: Pre-build validation
echo "📝 Running pre-build checks..."
npm run lint && npm run type-check && npm run test

if [ $? -ne 0 ]; then
  echo "❌ Pre-build checks failed"
  exit 1
fi

# Step 2: Build for both platforms
echo "🔨 Building development builds..."
eas build --platform all --profile development --non-interactive

# Step 3: Wait for builds and get URLs
echo "⏳ Waiting for builds to complete..."
sleep 60  # Give builds time to start

# Get build status
BUILD_STATUS=$(eas build:list --status=in-progress --limit=2 --json)
echo "📊 Build status: $BUILD_STATUS"

# Step 4: Generate QR codes for device installation
echo "📱 Builds will be available for device installation via QR codes"
echo "📋 Test checklist:"
echo "  ✓ Install on iOS device"
echo "  ✓ Install on Android device"
echo "  ✓ Test authentication flow"
echo "  ✓ Test navigation and routing"
echo "  ✓ Test native features (camera, location)"
echo "  ✓ Test offline functionality"

echo "✅ Build workflow complete! Check EAS dashboard for build status."
echo "🔗 Dashboard: https://expo.dev/accounts/[your-account]/projects/[your-project]/builds"`}
          language="bash"
          filename="build-test-workflow.sh"
          title="Complete Build and Test Script"
        />

        <h2>9. Performance Monitoring and Analytics</h2>
        <p>
          Monitor your app's performance on real devices to catch issues and optimize user experience.
        </p>

        <CodeBlock
          code={`// Performance monitoring setup
import { 
  Performance, 
  PerformanceObserver 
} from 'react-native-performance';

// Monitor app startup time
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    console.log(\`Performance: \${entry.name} - \${entry.duration}ms\`);
  });
});

observer.observe({ entryTypes: ['measure', 'navigation'] });

// Mark performance milestones
Performance.mark('app-start');
Performance.mark('auth-complete');

// Measure time between marks
Performance.measure('auth-duration', 'app-start', 'auth-complete');

// Track memory usage
const getMemoryUsage = () => {
  if (global.performance && global.performance.memory) {
    return {
      used: global.performance.memory.usedJSHeapSize,
      total: global.performance.memory.totalJSHeapSize,
      limit: global.performance.memory.jsHeapSizeLimit
    };
  }
  return null;
};`}
          language="javascript"
          filename="performance-monitoring.js"
          title="Performance Monitoring Setup"
        />

        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            🎉 Session 2 Complete!
          </h4>
          <p className="text-green-700 dark:text-green-300 mb-3">
            You've mastered building React Native apps with EAS, testing on real devices, 
            and troubleshooting build issues. You can now confidently deploy and test your apps.
          </p>
          <p className="text-green-700 dark:text-green-300 mb-0">
            <strong>Next:</strong> Session 3 will cover deep linking implementation, 
            app scheme configuration, and testing link navigation.
          </p>
        </div>
      </div>
    </>
  );
}