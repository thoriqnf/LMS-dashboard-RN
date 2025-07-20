"use client";

import { CodeBlock } from "@/components/ui/code-block-new";

export function Day6Session1Content() {
  return (
    <>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            EAS Setup - Session 1
          </h1>

          <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-8">
            <h3 className="text-blue-800 dark:text-blue-200 font-semibold mb-4 mt-0">
              🛠️ Session Overview
            </h3>
            <ul className="text-blue-700 dark:text-blue-300 space-y-2 mb-0">
              <li>
                <strong>Install EAS CLI</strong> - Set up Expo Application Services command line tools
              </li>
              <li>
                <strong>Expo Account Setup</strong> - Create and configure your Expo developer account
              </li>
              <li>
                <strong>EAS Build Configuration</strong> - Initialize build settings with eas build:configure
              </li>
              <li>
                <strong>Project Structure</strong> - Understand EAS build configuration files
              </li>
              <li>
                <strong>Build Profiles</strong> - Configure development, preview, and production builds
              </li>
              <li>
                <strong>Platform Settings</strong> - Set up iOS and Android build configurations
              </li>
            </ul>
          </div>
        </div>

        <h2>1. Understanding EAS (Expo Application Services)</h2>

        <h3>From Development to Production</h3>
        <p>
          EAS is Expo's professional build and deployment service that takes your React Native app from development 
          to production. Think of it as the bridge between your code and the App Store/Google Play.
        </p>

        <div className="my-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-2 mt-0">
            🏭 EAS Services Overview:
          </h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
            <li>
              <strong>EAS Build</strong> - Cloud-based building for iOS and Android
            </li>
            <li>
              <strong>EAS Submit</strong> - Automated app store submission
            </li>
            <li>
              <strong>EAS Update</strong> - Over-the-air updates for JavaScript changes
            </li>
            <li>
              <strong>EAS Metadata</strong> - Manage app store listings and metadata
            </li>
          </ul>
        </div>

        <h2>2. Installing EAS CLI</h2>
        <p>
          The EAS CLI is your primary tool for interacting with Expo Application Services. 
          It handles everything from build configuration to deployment.
        </p>

        <CodeBlock
          code={`# Install EAS CLI globally
npm install -g @expo/eas-cli

# Verify installation
eas --version

# Check available commands
eas --help

# Alternative installation with Yarn
yarn global add @expo/eas-cli

# Alternative installation with pnpm
pnpm add -g @expo/eas-cli`}
          language="bash"
          filename="terminal"
          title="Installing EAS CLI"
        />

        <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 my-6">
          <h4 className="text-yellow-800 dark:text-yellow-200 font-semibold mb-2 mt-0">
            💡 Installation Tips
          </h4>
          <div className="text-yellow-700 dark:text-yellow-300 text-sm space-y-2">
            <div><strong>Node.js Version:</strong> Ensure you're running Node.js 16 or later</div>
            <div><strong>Permission Issues:</strong> On macOS/Linux, you may need sudo for global installs</div>
            <div><strong>Version Check:</strong> Run eas --version to confirm successful installation</div>
            <div><strong>Updates:</strong> Keep EAS CLI updated with npm update -g @expo/eas-cli</div>
          </div>
        </div>

        <h2>3. Expo Account Setup</h2>
        <p>
          Before using EAS services, you need an Expo account. This account manages your projects, 
          build credentials, and deployment settings.
        </p>

        <h3>Creating Your Expo Account</h3>

        <CodeBlock
          code={`# Login to existing account or create new one
eas login

# If you don't have an account, visit:
# https://expo.dev/signup

# Check current login status
eas whoami

# Logout (if needed)
eas logout`}
          language="bash"
          filename="terminal"
          title="Expo Account Authentication"
        />

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border">
            <h4 className="font-semibold mb-2 mt-0">🆓 Free Tier Includes:</h4>
            <div className="text-sm space-y-1">
              <div>• Unlimited open source projects</div>
              <div>• 30 builds per month</div>
              <div>• Basic EAS Update service</div>
              <div>• Community support</div>
              <div>• Standard build concurrency</div>
            </div>
          </div>
          
          <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg border">
            <h4 className="font-semibold mb-2 mt-0">⭐ Paid Plans Offer:</h4>
            <div className="text-sm space-y-1">
              <div>• Increased build limits</div>
              <div>• Priority build queue</div>
              <div>• Advanced analytics</div>
              <div>• Premium support</div>
              <div>• Team collaboration features</div>
            </div>
          </div>
        </div>

        <h2>4. EAS Build Configuration</h2>
        <p>
          The <code>eas build:configure</code> command sets up your project for EAS builds by creating 
          the necessary configuration files and project settings.
        </p>

        <CodeBlock
          code={`# Navigate to your React Native project
cd MyReactNativeApp

# Initialize EAS build configuration
eas build:configure

# This command will:
# 1. Create eas.json configuration file
# 2. Set up build profiles
# 3. Configure platform-specific settings
# 4. Link project to your Expo account`}
          language="bash"
          filename="terminal"
          title="Initializing EAS Build"
        />

        <h3>Understanding eas.json</h3>
        <p>
          The <code>eas.json</code> file is the heart of your EAS configuration. It defines build profiles, 
          platform settings, and deployment options.
        </p>

        <CodeBlock
          code={`{
  "cli": {
    "version": ">= 5.9.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": {
        "resourceClass": "m1-medium"
      },
      "android": {
        "buildType": "apk",
        "gradleCommand": ":app:assembleDebug"
      }
    },
    "preview": {
      "distribution": "internal",
      "ios": {
        "resourceClass": "m1-medium",
        "simulator": true
      },
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "ios": {
        "resourceClass": "m1-medium"
      },
      "android": {
        "buildType": "aab"
      }
    }
  },
  "submit": {
    "production": {}
  }
}`}
          language="json"
          filename="eas.json"
          title="Default EAS Configuration"
        />

        <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border border-green-200 dark:border-green-800 my-6">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-2 mt-0">
            📋 Build Profile Breakdown
          </h4>
          <div className="text-green-700 dark:text-green-300 text-sm space-y-2">
            <div><strong>development:</strong> For testing with Expo development builds</div>
            <div><strong>preview:</strong> Internal testing and QA builds</div>
            <div><strong>production:</strong> App store ready builds</div>
            <div><strong>resourceClass:</strong> Build machine specifications (m1-medium recommended)</div>
            <div><strong>distribution:</strong> How the build will be distributed (internal/store)</div>
          </div>
        </div>

        <h2>5. Project Structure and Files</h2>
        <p>
          EAS build process relies on several configuration files. Understanding these files helps you 
          customize your build process and troubleshoot issues.
        </p>

        <CodeBlock
          code={`MyReactNativeApp/
├── app.json                 # Expo app configuration
├── eas.json                 # EAS build configuration
├── package.json             # Dependencies and scripts
├── babel.config.js          # Babel configuration
├── metro.config.js          # Metro bundler configuration
├── app/                     # Your app source code
├── assets/                  # App icons, splash screens
└── ios/                     # iOS native code (if ejected)
    └── android/             # Android native code (if ejected)`}
          language="text"
          filename="project-structure"
          title="EAS Project Structure"
        />

        <h3>App Configuration (app.json)</h3>
        <p>
          Your app.json file needs specific settings for EAS builds to work properly.
        </p>

        <CodeBlock
          code={`{
  "expo": {
    "name": "My React Native App",
    "slug": "my-react-native-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.yourcompany.myapp"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      },
      "package": "com.yourcompany.myapp"
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "extra": {
      "eas": {
        "projectId": "your-project-id-here"
      }
    }
  }
}`}
          language="json"
          filename="app.json"
          title="EAS-Ready App Configuration"
        />

        <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800 my-6">
          <h4 className="text-purple-800 dark:text-purple-200 font-semibold mb-2 mt-0">
            🔧 Configuration Best Practices
          </h4>
          <div className="text-purple-700 dark:text-purple-300 text-sm space-y-2">
            <div><strong>Bundle Identifiers:</strong> Use reverse domain notation (com.company.app)</div>
            <div><strong>Version Management:</strong> Follow semantic versioning (major.minor.patch)</div>
            <div><strong>Asset Optimization:</strong> Provide all required icon and splash screen sizes</div>
            <div><strong>Project ID:</strong> Generated automatically when you run eas build:configure</div>
          </div>
        </div>

        <h2>6. Build Profiles Deep Dive</h2>
        <p>
          Different build profiles serve different purposes in your development workflow. 
          Understanding when to use each profile is crucial for efficient development.
        </p>

        <h3>Development Profile</h3>
        <CodeBlock
          code={`"development": {
  "developmentClient": true,
  "distribution": "internal",
  "ios": {
    "resourceClass": "m1-medium",
    "simulator": true
  },
  "android": {
    "buildType": "apk",
    "gradleCommand": ":app:assembleDebug"
  },
  "env": {
    "NODE_ENV": "development"
  }
}`}
          language="json"
          filename="eas.json"
          title="Development Build Profile"
        />

        <h3>Preview Profile</h3>
        <CodeBlock
          code={`"preview": {
  "distribution": "internal",
  "ios": {
    "resourceClass": "m1-medium",
    "simulator": true,
    "buildConfiguration": "Release"
  },
  "android": {
    "buildType": "apk",
    "gradleCommand": ":app:assembleRelease"
  },
  "env": {
    "NODE_ENV": "production"
  }
}`}
          language="json"
          filename="eas.json"
          title="Preview Build Profile"
        />

        <h3>Production Profile</h3>
        <CodeBlock
          code={`"production": {
  "ios": {
    "resourceClass": "m1-medium",
    "buildConfiguration": "Release"
  },
  "android": {
    "buildType": "aab",
    "gradleCommand": ":app:bundleRelease"
  },
  "env": {
    "NODE_ENV": "production"
  },
  "cache": {
    "disabled": false
  }
}`}
          language="json"
          filename="eas.json"
          title="Production Build Profile"
        />

        <h2>7. Hands-On Exercise: Complete EAS Setup</h2>
        <p>
          Let's walk through setting up EAS for a real project. This exercise covers the complete setup process 
          from CLI installation to successful configuration.
        </p>

        <div className="bg-orange-50 dark:bg-orange-950 p-6 rounded-lg border border-orange-200 dark:border-orange-800 my-6">
          <h4 className="text-orange-800 dark:text-orange-200 font-semibold mb-3 mt-0">
            🎯 Exercise: EAS Setup Walkthrough
          </h4>
          <div className="text-orange-700 dark:text-orange-300 space-y-3">
            <div>
              <strong>Step 1:</strong> Create a new Expo project and set up EAS
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li>Install EAS CLI globally</li>
                <li>Create or login to Expo account</li>
                <li>Initialize new React Native project</li>
                <li>Run eas build:configure</li>
              </ul>
            </div>
            
            <div>
              <strong>Step 2:</strong> Customize build configuration
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li>Modify eas.json for your needs</li>
                <li>Update app.json with proper identifiers</li>
                <li>Set up environment variables</li>
                <li>Configure platform-specific settings</li>
              </ul>
            </div>

            <div>
              <strong>Step 3:</strong> Validate configuration
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li>Check eas.json syntax</li>
                <li>Verify project linking</li>
                <li>Test different build profiles</li>
                <li>Review generated files</li>
              </ul>
            </div>
          </div>
        </div>

        <CodeBlock
          code={`# Complete setup walkthrough
# 1. Install EAS CLI
npm install -g @expo/eas-cli

# 2. Create new project
npx create-expo-app MyEASApp
cd MyEASApp

# 3. Login to Expo
eas login

# 4. Configure EAS builds
eas build:configure

# 5. Update app identifiers (edit app.json)
# Set bundleIdentifier for iOS
# Set package for Android

# 6. Validate configuration
eas build --platform all --profile development --dry-run

# 7. Check project status
eas project:info`}
          language="bash"
          filename="setup-walkthrough.sh"
          title="Complete EAS Setup Script"
        />

        <h2>8. Troubleshooting Common Issues</h2>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="p-4 bg-red-50 dark:bg-red-900 rounded-lg border">
            <h4 className="font-semibold mb-2 mt-0">❌ Common Problems:</h4>
            <div className="text-sm space-y-1">
              <div>• EAS CLI not found after installation</div>
              <div>• Permission denied errors</div>
              <div>• Invalid project configuration</div>
              <div>• Bundle identifier conflicts</div>
              <div>• Missing Expo account linking</div>
            </div>
          </div>
          
          <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg border">
            <h4 className="font-semibold mb-2 mt-0">✅ Solutions:</h4>
            <div className="text-sm space-y-1">
              <div>• Restart terminal after CLI installation</div>
              <div>• Use sudo for global npm installs</div>
              <div>• Validate JSON syntax in config files</div>
              <div>• Use unique bundle identifiers</div>
              <div>• Run eas login to link account</div>
            </div>
          </div>
        </div>

        <CodeBlock
          code={`# Troubleshooting commands
# Check EAS CLI installation
which eas
eas --version

# Verify Expo account
eas whoami

# Validate project configuration
eas build --platform all --profile development --dry-run

# Clear EAS cache (if needed)
eas build --clear-cache

# Check project linking
eas project:info

# Re-link project to account
eas init`}
          language="bash"
          filename="troubleshooting.sh"
          title="EAS Troubleshooting Commands"
        />

        <h2>9. Best Practices and Tips</h2>

        <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 my-6">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-3 mt-0">
            💡 EAS Setup Best Practices
          </h4>
          <div className="text-blue-700 dark:text-blue-300 space-y-3">
            <div>
              <strong>1. Version Control:</strong>
              <div className="text-sm mt-1">
                Commit eas.json and app.json to version control. These files are essential for team collaboration.
              </div>
            </div>
            
            <div>
              <strong>2. Environment Variables:</strong>
              <div className="text-sm mt-1">
                Use environment variables for sensitive data. Never commit API keys or secrets to version control.
              </div>
            </div>
            
            <div>
              <strong>3. Build Profiles:</strong>
              <div className="text-sm mt-1">
                Start with development builds for testing, use preview for QA, and production for app stores.
              </div>
            </div>
            
            <div>
              <strong>4. Resource Classes:</strong>
              <div className="text-sm mt-1">
                Use m1-medium for faster builds. Upgrade to larger instances for complex projects.
              </div>
            </div>
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            🎉 Session 1 Complete!
          </h4>
          <p className="text-green-700 dark:text-green-300 mb-3">
            You've successfully set up EAS CLI, configured your Expo account, and initialized build configuration. 
            Your project is now ready for cloud-based building and deployment.
          </p>
          <p className="text-green-700 dark:text-green-300 mb-0">
            <strong>Next:</strong> Session 2 will cover building your React Native app, 
            testing on real devices, and troubleshooting build issues.
          </p>
        </div>
      </div>
    </>
  );
}