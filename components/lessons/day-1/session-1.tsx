"use client";

import { CodeBlock } from "@/components/ui/code-block-new";

export function Day1Session1Content() {
  return (
    <>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            React Native Introduction - Session 1
          </h1>

          <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-8">
            <h3 className="text-blue-800 dark:text-blue-200 font-semibold mb-4 mt-0">
              📱 Session Overview
            </h3>
            <ul className="text-blue-700 dark:text-blue-300 space-y-2 mb-0">
              <li>
                <strong>What is React Native?</strong> - Build real mobile apps using React
              </li>
              <li>
                <strong>Expo vs React Native CLI</strong> - Choose the right development approach
              </li>
              <li>
                <strong>Development Setup</strong> - Install Node.js, VS Code, and Expo CLI
              </li>
              <li>
                <strong>Create Your First Project</strong> - Using npx create-expo-app
              </li>
              <li>
                <strong>Run on Real Device</strong> - Testing with Expo Go app
              </li>
              <li>
                <strong>Your First Mobile App</strong> - See React Native in action
              </li>
            </ul>
          </div>
        </div>

        <h2>1. What is React Native?</h2>

        <h3>From Web to Mobile</h3>
        <p>
          React Native is like taking everything you love about React and bringing it to mobile app development. 
          Instead of building websites, you're building real mobile apps that can be published to the App Store and Google Play.
        </p>

        <div className="my-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-2 mt-0">
            🏠 Think of it like building houses:
          </h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
            <li>
              <strong>React (Web)</strong> - Building websites is like constructing web storefronts
            </li>
            <li>
              <strong>React Native</strong> - Building mobile apps is like constructing actual houses people live in
            </li>
            <li>
              <strong>Same Skills</strong> - You use the same construction knowledge (React), just different materials
            </li>
          </ul>
        </div>

        <h3>Real Native Apps, Not Web Apps</h3>
        <p>
          React Native doesn't create "websites wrapped in an app." It creates actual native mobile apps 
          that use the same building blocks as apps written in Swift (iOS) or Kotlin (Android).
        </p>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
            <h4 className="text-green-800 dark:text-green-200 font-semibold mb-2 mt-0">
              ✅ React Native Apps:
            </h4>
            <ul className="text-green-700 dark:text-green-300 text-sm space-y-1 mb-0">
              <li>Use real native components</li>
              <li>Access device camera, GPS, contacts</li>
              <li>Feel like "real" mobile apps</li>
              <li>Published to App Store/Google Play</li>
              <li>Work offline like native apps</li>
            </ul>
          </div>
          <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
            <h4 className="text-red-800 dark:text-red-200 font-semibold mb-2 mt-0">
              ❌ Mobile Websites:
            </h4>
            <ul className="text-red-700 dark:text-red-300 text-sm space-y-1 mb-0">
              <li>Run in browser only</li>
              <li>Limited device access</li>
              <li>Require internet connection</li>
              <li>Can't be published to app stores</li>
              <li>Often feel like websites</li>
            </ul>
          </div>
        </div>

        <h3>Apps Built with React Native</h3>
        <p>You probably use React Native apps every day without knowing it:</p>
        <ul>
          <li>
            <strong>Facebook & Instagram</strong> - The company that created React Native uses it extensively
          </li>
          <li>
            <strong>WhatsApp</strong> - Messaging features built with React Native
          </li>
          <li>
            <strong>Uber Eats</strong> - Food delivery interface you tap every day
          </li>
          <li>
            <strong>Discord</strong> - Gaming communication platform
          </li>
          <li>
            <strong>Shopify</strong> - E-commerce management app
          </li>
        </ul>

        <div className="my-6 p-4 bg-purple-50 dark:bg-purple-950 rounded-lg border border-purple-200 dark:border-purple-800">
          <h4 className="text-purple-800 dark:text-purple-200 font-semibold mb-3 mt-0">
            🚀 Why Companies Choose React Native
          </h4>
          <ul className="text-purple-700 dark:text-purple-300 text-sm space-y-1 mb-0">
            <li>
              <strong>Faster Development</strong> - One codebase for iOS and Android
            </li>
            <li>
              <strong>Cost Effective</strong> - Don't need separate iOS and Android teams
            </li>
            <li>
              <strong>Shared Knowledge</strong> - Web developers can build mobile apps
            </li>
            <li>
              <strong>Live Updates</strong> - Push updates without app store approval
            </li>
          </ul>
        </div>

        <h2>2. Expo vs React Native CLI</h2>

        <h3>Choosing Your Development Path</h3>
        <p>
          When starting with React Native, you have two main options. Think of this like choosing 
          between a fully-equipped kitchen (Expo) vs building your own custom kitchen (React Native CLI).
        </p>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-3 mt-0">
              🏠 Expo (Recommended for Beginners)
            </h4>
            <div className="text-blue-700 dark:text-blue-300 text-sm space-y-2">
              <p><strong>Like a fully-equipped apartment:</strong></p>
              <ul className="space-y-1 mb-2">
                <li>✅ Ready to use immediately</li>
                <li>✅ No complex setup required</li>
                <li>✅ Test on real device instantly</li>
                <li>✅ Easy to publish apps</li>
                <li>✅ Automatic updates</li>
              </ul>
              <p><strong>Perfect for:</strong> Learning, prototypes, most apps</p>
            </div>
          </div>
          <div className="p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <h4 className="text-yellow-800 dark:text-yellow-200 font-semibold mb-3 mt-0">
              🔧 React Native CLI (Advanced)
            </h4>
            <div className="text-yellow-700 dark:text-yellow-300 text-sm space-y-2">
              <p><strong>Like building a custom house:</strong></p>
              <ul className="space-y-1 mb-2">
                <li>⚠️ Complex setup process</li>
                <li>⚠️ Need Android Studio/Xcode</li>
                <li>⚠️ More configuration required</li>
                <li>✅ Full control over everything</li>
                <li>✅ Access to all native features</li>
              </ul>
              <p><strong>Perfect for:</strong> Complex apps, specific native needs</p>
            </div>
          </div>
        </div>

        <div className="my-6 p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            🎯 Our Choice: Expo
          </h4>
          <p className="text-green-700 dark:text-green-300 text-sm mb-2">
            We'll use Expo because it's perfect for learning React Native. You can always "eject" 
            to React Native CLI later if you need advanced features.
          </p>
          <p className="text-green-700 dark:text-green-300 text-sm mb-0">
            <strong>Think of it like learning to drive:</strong> You start with an automatic car (Expo) 
            before learning manual transmission (React Native CLI).
          </p>
        </div>

        <h2>3. Development Setup</h2>

        <h3>What You'll Need</h3>
        <p>
          Setting up React Native with Expo is much simpler than traditional mobile development. 
          You don't need Android Studio or Xcode to get started!
        </p>

        <h4>Step 1: Install Node.js</h4>
        <p>
          Node.js is like the engine that powers React Native development. It's the same tool 
          you'd use for web development.
        </p>

        <div className="my-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-2 mt-0">
            💻 Installation Steps:
          </h4>
          <ol className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
            <li>Visit <strong>nodejs.org</strong></li>
            <li>Download the <strong>LTS version</strong> (Long Term Support)</li>
            <li>Run the installer and follow the prompts</li>
            <li>Restart your computer when finished</li>
          </ol>
        </div>

        <h4>Verify Node.js Installation</h4>
        <p>Open your terminal and check that Node.js installed correctly:</p>

        <CodeBlock
          code={`# Check Node.js version (should be 18.x or higher)
node --version

# Check npm version (comes with Node.js)
npm --version

# Expected output:
# v20.10.0
# 10.2.3`}
          language="bash"
          filename="Terminal"
          title="Verify Installation"
        />

        <h4>Step 2: Install VS Code (Recommended)</h4>
        <p>
          While you can use any code editor, VS Code provides excellent React Native support 
          with helpful extensions and debugging tools.
        </p>

        <div className="my-6 p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-2 mt-0">
            📥 VS Code Setup:
          </h4>
          <ol className="text-green-700 dark:text-green-300 text-sm space-y-1 mb-0">
            <li>Download from <strong>code.visualstudio.com</strong></li>
            <li>Install the application</li>
            <li>Open VS Code and install recommended extensions</li>
          </ol>
        </div>

        <h4>Essential VS Code Extensions</h4>
        <p>These extensions will make your React Native development much more enjoyable:</p>

        <CodeBlock
          code={`// Essential Extensions (install from VS Code marketplace):

1. "React Native Tools" by Microsoft
   - Debugging and IntelliSense for React Native

2. "ES7+ React/Redux/React-Native snippets" by dsznajder  
   - Quick code snippets and shortcuts

3. "Prettier - Code formatter" by Prettier
   - Automatic code formatting

4. "Auto Rename Tag" by Jun Han
   - Automatically rename paired JSX tags

5. "Bracket Pair Colorizer 2" by CoenraadS
   - Color-coded matching brackets`}
          language="javascript"
          filename="VS Code Extensions"
          title="Recommended Extensions"
        />

        <h4>Step 3: Install Expo CLI</h4>
        <p>
          Expo CLI is the command-line tool that helps you create, build, and manage 
          React Native projects. Think of it as your mobile app development assistant.
        </p>

        <CodeBlock
          code={`# Install Expo CLI globally (accessible from anywhere)
npm install -g @expo/cli

# Verify installation
expo --version

# Expected output: 
# 49.0.0 (or similar)`}
          language="bash"
          filename="Terminal"
          title="Install Expo CLI"
        />

        <div className="my-6 p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <h4 className="text-yellow-800 dark:text-yellow-200 font-semibold mb-2 mt-0">
            🔐 If you see permission errors:
          </h4>
          <div className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1 mb-0">
            <p><strong>On Mac/Linux:</strong> Use <code>sudo npm install -g @expo/cli</code></p>
            <p><strong>On Windows:</strong> Run Command Prompt as Administrator</p>
          </div>
        </div>

        <h2>4. Create Your First Project</h2>

        <h3>Creating a React Native App</h3>
        <p>
          Now for the exciting part! Let's create your first React Native app. 
          This is like getting the keys to your first apartment - everything you need is ready to go.
        </p>

        <h4>Step 1: Create Project Directory</h4>
        <p>First, let's create a workspace for your React Native projects:</p>

        <CodeBlock
          code={`# Create a folder for your React Native projects
mkdir ReactNativeProjects
cd ReactNativeProjects

# You're now in your projects folder`}
          language="bash"
          filename="Terminal"
          title="Setup Workspace"
        />

        <h4>Step 2: Create Your First App</h4>
        <p>
          The <code>create-expo-app</code> command creates a complete React Native project 
          with everything configured and ready to run. We'll use the "blank" template 
          which gives us a clean starting point perfect for learning.
        </p>

        <CodeBlock
          code={`# Create a new React Native app with blank template
npx create-expo-app@latest MyFirstApp --template blank

# This will:
# - Download the latest Expo CLI and blank template
# - Install all dependencies 
# - Set up a clean project structure
# - Create minimal example files (perfect for learning)`}
          language="bash"
          filename="Terminal"
          title="Create App"
        />

        <div className="my-6 p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            🎯 Why the "blank" template?
          </h4>
          <div className="text-green-700 dark:text-green-300 text-sm space-y-2">
            <p><strong>Perfect for learning because it:</strong></p>
            <ul className="space-y-1 mb-2">
              <li>✅ Uses JavaScript (not TypeScript) - easier for beginners</li>
              <li>✅ Minimal setup - less overwhelming</li>
              <li>✅ Clean starting point - you understand every line</li>
              <li>✅ No extra dependencies - faster to set up</li>
            </ul>
            <p><strong>Alternative templates:</strong> default (more features), TypeScript (advanced)</p>
          </div>
        </div>

        <div className="my-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-2 mt-0">
            ⏳ What happens during creation:
          </h4>
          <ol className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
            <li>Downloads latest Expo CLI and blank template (30-60 seconds)</li>
            <li>Installs npm packages (1-2 minutes)</li>
            <li>Sets up minimal project configuration</li>
            <li>Creates clean example files</li>
            <li>Prepares development environment</li>
          </ol>
        </div>

        <h4>Step 3: Explore Your Project</h4>
        <p>Let's look at what was created:</p>

        <CodeBlock
          code={`# Navigate into your new app
cd MyFirstApp

# Look at the project structure
ls -la

# Open in VS Code
code .`}
          language="bash"
          filename="Terminal"
          title="Explore Project"
        />

        <h3>Understanding Your Project Structure</h3>
        <p>Your new React Native app contains several important files and folders:</p>

        <CodeBlock
          code={`MyFirstApp/
├── App.js                    📱 Main app component (start here!)
├── app.json                  ⚙️ App configuration (name, version, etc.)
├── package.json              📋 Dependencies and scripts
├── babel.config.js           🔧 JavaScript compiler settings
├── .expo/                    📁 Expo-specific files (auto-generated)
├── assets/                   📁 Images, fonts, and other static files
│   ├── favicon.png          🖼️ App icon for web
│   ├── icon.png             📱 App icon for mobile
│   └── splash.png           🎨 Loading screen image
└── node_modules/            📁 Installed packages (don't touch!)`}
          language="bash"
          filename="Project Structure"
          title="File Organization"
        />

        <div className="my-6 p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-2 mt-0">
            📁 Files you'll work with most:
          </h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1 mb-0">
            <li>
              <strong>App.js</strong> - Your main React Native component
            </li>
            <li>
              <strong>assets/</strong> - Images and icons for your app
            </li>
            <li>
              <strong>app.json</strong> - App settings like name and version
            </li>
          </ul>
        </div>

        <h3>Your First Look at App.js</h3>
        <p>Let's examine the main file that the blank template created for you:</p>

        <CodeBlock
          code={`import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});`}
          language="javascript"
          filename="App.js"
          title="Blank Template App.js"
        />

        <div className="my-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-2 mt-0">
            🔍 Key differences from React web:
          </h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
            <li>
              <code>import from 'react-native'</code> instead of React DOM
            </li>
            <li>
              <code>&lt;View&gt;</code> instead of <code>&lt;div&gt;</code>
            </li>
            <li>
              <code>&lt;Text&gt;</code> instead of <code>&lt;p&gt;</code> or <code>&lt;span&gt;</code>
            </li>
            <li>
              <code>StyleSheet.create()</code> for styling instead of CSS
            </li>
          </ul>
        </div>

        <h2>5. Running with Expo Go</h2>

        <h3>The Magic of Expo Go</h3>
        <p>
          Expo Go is like having a universal remote control for React Native apps. 
          Instead of installing each app you're developing, you scan a QR code and your app 
          appears instantly on your phone.
        </p>

        <h4>Step 1: Install Expo Go on Your Phone</h4>
        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
            <h5 className="text-green-800 dark:text-green-200 font-semibold mb-2 mt-0">
              📱 iPhone Users:
            </h5>
            <ol className="text-green-700 dark:text-green-300 text-sm space-y-1 mb-0">
              <li>Open the App Store</li>
              <li>Search for "Expo Go"</li>
              <li>Install the free app</li>
              <li>Open Expo Go when ready to test</li>
            </ol>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
            <h5 className="text-blue-800 dark:text-blue-200 font-semibold mb-2 mt-0">
              🤖 Android Users:
            </h5>
            <ol className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
              <li>Open Google Play Store</li>
              <li>Search for "Expo Go"</li>
              <li>Install the free app</li>
              <li>Open Expo Go when ready to test</li>
            </ol>
          </div>
        </div>

        <h4>Step 2: Start Your Development Server</h4>
        <p>
          Now let's bring your app to life! Make sure you're in your project directory 
          and run the development server:
        </p>

        <CodeBlock
          code={`# Make sure you're in your project folder
cd MyFirstApp

# Start the Expo development server
npx expo start

# Alternative: use the shortcut
npm start`}
          language="bash"
          filename="Terminal"
          title="Start Development Server"
        />

        <div className="my-6 p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <h4 className="text-yellow-800 dark:text-yellow-200 font-semibold mb-2 mt-0">
            🎯 What you'll see:
          </h4>
          <div className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1 mb-0">
            <p>A QR code will appear in your terminal and a web page will open with:</p>
            <ul className="mt-2 space-y-1">
              <li>✅ QR code for mobile testing</li>
              <li>✅ Development tools and options</li>
              <li>✅ Real-time logs and updates</li>
            </ul>
          </div>
        </div>

        <h4>Step 3: Connect Your Phone</h4>
        <p>
          This is the magic moment! You'll see your React Native app running on your 
          actual phone within seconds.
        </p>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
            <h5 className="text-green-800 dark:text-green-200 font-semibold mb-2 mt-0">
              📱 iPhone Connection:
            </h5>
            <ol className="text-green-700 dark:text-green-300 text-sm space-y-1 mb-0">
              <li>Open Camera app</li>
              <li>Point at QR code on your computer</li>
              <li>Tap the notification to open in Expo Go</li>
              <li>Wait for app to load (10-30 seconds)</li>
            </ol>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
            <h5 className="text-blue-800 dark:text-blue-200 font-semibold mb-2 mt-0">
              🤖 Android Connection:
            </h5>
            <ol className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
              <li>Open Expo Go app</li>
              <li>Tap "Scan QR Code"</li>
              <li>Point camera at QR code</li>
              <li>Wait for app to load (10-30 seconds)</li>
            </ol>
          </div>
        </div>

        <h4>Your First Success! 🎉</h4>
        <p>
          If everything worked correctly, you should see a simple white screen with text 
          saying "Open up App.js to start working on your app!" on your phone.
        </p>

        <div className="my-6 p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            🎊 Congratulations! You've just:
          </h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1 mb-0">
            <li>✅ Set up React Native development environment</li>
            <li>✅ Created your first React Native project</li>
            <li>✅ Connected your phone for live testing</li>
            <li>✅ Seen React Native code running on a real device</li>
          </ul>
        </div>

        <h3>Testing Live Updates</h3>
        <p>
          One of the most amazing features of Expo development is instant updates. 
          Let's try making a change and seeing it appear immediately on your phone.
        </p>

        <h4>Make Your First Change</h4>
        <ol>
          <li>Open <code>App.js</code> in VS Code</li>
          <li>Find the text "Open up App.js to start working on your app!"</li>
          <li>Change it to "Hello from my React Native app! 🚀"</li>
          <li>Save the file (Ctrl+S or Cmd+S)</li>
          <li>Watch your phone - the text should update automatically!</li>
        </ol>

        <CodeBlock
          code={`export default function App() {
  return (
    <View style={styles.container}>
      {/* Change this text and save to see live update */}
      <Text>Hello from my React Native app! 🚀</Text>
      <StatusBar style="auto" />
    </View>
  );
}`}
          language="javascript"
          filename="App.js"
          title="Your First Change"
        />

        <div className="my-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-2 mt-0">
            ⚡ Hot Reloading Magic:
          </h4>
          <p className="text-blue-700 dark:text-blue-300 text-sm mb-0">
            When you save changes, Expo automatically updates your app on the phone 
            without losing your current state. This makes development incredibly fast 
            and enjoyable!
          </p>
        </div>

        <h2>6. Troubleshooting Common Issues</h2>

        <h3>Can't See QR Code?</h3>
        <div className="my-6 p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <h4 className="text-yellow-800 dark:text-yellow-200 font-semibold mb-2 mt-0">
            🔧 Quick fixes:
          </h4>
          <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1 mb-0">
            <li>Make sure your phone and computer are on the same WiFi network</li>
            <li>Try running <code>npx expo start --tunnel</code> for cellular connection</li>
            <li>Check that your firewall isn't blocking Expo</li>
            <li>Restart the Expo development server</li>
          </ul>
        </div>

        <h3>App Won't Load on Phone?</h3>
        <div className="my-6 p-4 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
          <h4 className="text-red-800 dark:text-red-200 font-semibold mb-2 mt-0">
            🚨 Common solutions:
          </h4>
          <ul className="text-red-700 dark:text-red-300 text-sm space-y-1 mb-0">
            <li>Close and reopen Expo Go app</li>
            <li>Make sure Expo Go is updated to latest version</li>
            <li>Check terminal for error messages</li>
            <li>Try <code>npx expo start --clear</code> to clear cache</li>
          </ul>
        </div>

        <h3>Getting Started with Emulators (Optional)</h3>
        <p>
          While Expo Go on your real device is the easiest way to test, you can also use 
          emulators if you prefer:
        </p>

        <div className="my-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border">
          <h4 className="font-semibold mb-2 mt-0">Emulator Setup (Advanced)</h4>
          <p className="text-sm mb-2">
            <strong>iOS Simulator:</strong> Requires Mac with Xcode installed
          </p>
          <p className="text-sm mb-2">
            <strong>Android Emulator:</strong> Requires Android Studio setup
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-0">
            For learning purposes, testing on your real device with Expo Go is much simpler 
            and gives you a better feel for how your app will perform.
          </p>
        </div>

        <h2>7. Next Steps</h2>

        <div className="my-6 p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            🎯 What you've accomplished today:
          </h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1 mb-0">
            <li>✅ Understand what React Native is and why it's powerful</li>
            <li>✅ Set up complete React Native development environment</li>
            <li>✅ Created your first React Native project with Expo</li>
            <li>✅ Successfully tested app on your real mobile device</li>
            <li>✅ Experienced live code updates and hot reloading</li>
          </ul>
        </div>

        <div className="my-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-3 mt-0">
            🚀 Coming up in Session 2:
          </h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
            <li>React Native components vs web HTML elements</li>
            <li>Building your first real mobile interface</li>
            <li>Understanding mobile-specific styling</li>
            <li>Creating interactive buttons and user input</li>
          </ul>
        </div>

        <div className="my-6 p-4 bg-orange-50 dark:bg-orange-950 rounded-lg border border-orange-200 dark:border-orange-800">
          <h4 className="text-orange-800 dark:text-orange-200 font-semibold mb-3 mt-0">
            🎯 Homework Challenge:
          </h4>
          <p className="text-orange-700 dark:text-orange-300 text-sm mb-2">
            Before our next session, try customizing your app:
          </p>
          <ul className="text-orange-700 dark:text-orange-300 text-sm space-y-1 mb-0">
            <li>Change the background color in the StyleSheet</li>
            <li>Add a second Text component with your name</li>
            <li>Try different text sizes and colors</li>
            <li>Add an emoji to make it fun! 🎨</li>
          </ul>
        </div>

        <p className="text-lg font-semibold text-center mt-8 mb-4">
          Welcome to the exciting world of React Native development! 🎉📱
        </p>
      </div>
    </>
  );
}