"use client";

import { CodeBlock } from "@/components/ui/code-block-new";

export function Day1Session2Content() {
  return (
    <>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Building with Components - Session 2
          </h1>

          <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-8">
            <h3 className="text-blue-800 dark:text-blue-200 font-semibold mb-4 mt-0">
              📅 Session Overview
            </h3>
            <ul className="text-blue-700 dark:text-blue-300 space-y-2 mb-0">
              <li>
                <strong>What are Components?</strong> - Building blocks of React apps
              </li>
              <li>
                <strong>Parent and Child Components</strong> - How components work together
              </li>
              <li>
                <strong>Props Basics</strong> - Passing simple data between components
              </li>
              <li>
                <strong>Breaking Down Simple UIs</strong> - Practice with basic layouts
              </li>
              <li>
                <strong>Hands-On Practice</strong> - Build your first component family
              </li>
            </ul>
          </div>
        </div>

        <h2>1. What are Components?</h2>

        <h3>Think of Components Like LEGO Blocks</h3>
        <p>
          Components are like LEGO blocks for building websites! Just like you can combine 
          different LEGO pieces to build amazing structures, you combine React components 
          to build amazing web pages. Each component has one job and does it well.
        </p>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
            <h4 className="text-red-800 dark:text-red-200 font-semibold mb-2 mt-0">
              ❌ Without Components:
            </h4>
            <div className="text-red-700 dark:text-red-300 text-sm">
              <p className="mb-2">Everything is one giant, messy file:</p>
              <div className="font-mono text-xs">
                <div>📄 index.html (1000+ lines!)</div>
                <div>├── Header HTML</div>
                <div>├── Navigation HTML</div>
                <div>├── Main content HTML</div>
                <div>├── Sidebar HTML</div>
                <div>└── Footer HTML</div>
              </div>
              <p className="font-semibold mt-2 mb-0">So hard to work with! 😵</p>
            </div>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
            <h4 className="text-green-800 dark:text-green-200 font-semibold mb-2 mt-0">
              ✅ With Components:
            </h4>
            <div className="text-green-700 dark:text-green-300 text-sm">
              <p className="mb-2">Each piece has its own purpose:</p>
              <div className="font-mono text-xs">
                <div>🏠 App</div>
                <div>├── 📋 Header</div>
                <div>├── 🧭 Navigation</div>
                <div>├── 📖 MainContent</div>
                <div>├── 📌 Sidebar</div>
                <div>└── 📧 Footer</div>
              </div>
              <p className="font-semibold mt-2 mb-0">Clean and organized! ✨</p>
            </div>
          </div>
        </div>

        <h3>Why Components are Amazing</h3>
        <p>
          Using components makes building websites feel like playing with LEGO blocks.
          Here's why they're so helpful:
        </p>

        <div className="my-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-2 mb-0">
            <li>
              <strong>Reuse Anywhere</strong> - Build a button once, use it everywhere!
            </li>
            <li>
              <strong>Easy to Find</strong> - Need to fix the header? It's in the Header component
            </li>
            <li>
              <strong>Small and Simple</strong> - Each component does one thing well
            </li>
            <li>
              <strong>Share with Friends</strong> - Pass information between components easily
            </li>
          </ul>
        </div>

        <h3>The Golden Rule of Component Hierarchy</h3>
        <div className="my-6 p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <h4 className="text-yellow-800 dark:text-yellow-200 font-semibold mb-2 mt-0">
            🥇 Golden Rule:
          </h4>
          <p className="text-yellow-700 dark:text-yellow-300 text-sm mb-0">
            Each component should have one clear responsibility. If you find
            yourself saying &quot;this component handles user authentication AND
            displays product listings AND manages the shopping cart,&quot; you
            probably need to break it into smaller components.
          </p>
        </div>

        <CodeBlock
          code={`// ❌ Bad: One component doing too much
function SuperComponent() {
 // Handles user login
 // Displays product catalog  
 // Manages shopping cart
 // Shows checkout form
 // Processes payments
 // Way too many responsibilities!
}

// ✅ Good: Each component has one clear job
function App() {
 return (
   <>
     <UserAuthManager />     {/* Handles authentication only */}
     <ProductCatalog />      {/* Shows products only */}
     <ShoppingCart />        {/* Manages cart only */}
     <CheckoutProcess />     {/* Handles checkout only */}
   </>
 );
}`}
          language="jsx"
          filename="component-responsibility.jsx"
          title="Single Responsibility Principle"
        />

        <h2>2. Parent and Child Components</h2>

        <h3>Like a Family Tree!</h3>
        <p>
          Components work like a family. Parent components can have children, and 
          children can have their own children. It's that simple!
        </p>

        <div className="my-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border font-mono text-sm">
          <div className="mb-4 font-sans font-semibold">
            Simple Family Tree:
          </div>
          <div>🏠 App (Grandparent)</div>
          <div>│</div>
          <div>├── 📋 Header (Parent)</div>
          <div>│ ├── 🏷️ Logo (Child)</div>
          <div>│ └── 🧭 Navigation (Child)</div>
          <div>│</div>
          <div>└── 📖 MainContent (Parent)</div>
          <div>  ├── 📝 Article (Child)</div>
          <div>  └── 📌 Sidebar (Child)</div>
        </div>

        <h3>Let's Build a Simple Card!</h3>
        <p>
          Let's practice by building something you see everywhere - a simple profile card. 
          We'll break it down step by step:
        </p>

        <div className="my-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border font-mono text-sm">
          <div className="mb-4 font-sans font-semibold">
            Simple Profile Card:
          </div>
          <div>┌───────────────────────────────────────┐</div>
          <div>│ 👤 Sarah Johnson           │</div>
          <div>│ 💼 React Developer           │</div>
          <div>│ 📍 San Francisco, CA        │</div>
          <div>├───────────────────────────────────────┤</div>
          <div>│ I love building cool React apps! │</div>
          <div>│ 🚀 Always learning new things  │</div>
          <div>├───────────────────────────────────────┤</div>
          <div>│ [Follow] [Message] [Share]   │</div>
          <div>└───────────────────────────────────────┘</div>
        </div>

        <h3>Breaking It Down Step by Step</h3>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="space-y-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded border border-blue-200 dark:border-blue-800">
              <h4 className="text-blue-800 dark:text-blue-200 font-semibold text-sm mb-2 mt-0">
                Step 1: What do I see?
              </h4>
              <p className="text-blue-700 dark:text-blue-300 text-xs mb-0">
                I see a card with someone's info. Let's call this <code>ProfileCard</code>
              </p>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-950 rounded border border-green-200 dark:border-green-800">
              <h4 className="text-green-800 dark:text-green-200 font-semibold text-sm mb-2 mt-0">
                Step 2: What are the main parts?
              </h4>
              <ul className="text-green-700 dark:text-green-300 text-xs space-y-1 mb-0">
                <li>• Top part: Name, job, location</li>
                <li>• Middle part: About me text</li>
                <li>• Bottom part: Action buttons</li>
              </ul>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-3 bg-purple-50 dark:bg-purple-950 rounded border border-purple-200 dark:border-purple-800">
              <h4 className="text-purple-800 dark:text-purple-200 font-semibold text-sm mb-2 mt-0">
                Step 3: Name the pieces
              </h4>
              <ul className="text-purple-700 dark:text-purple-300 text-xs space-y-1 mb-0">
                <li>• <code>UserInfo</code> - name, job, location</li>
                <li>• <code>AboutSection</code> - the description</li>
                <li>• <code>ActionButtons</code> - follow, message, share</li>
              </ul>
            </div>
            <div className="p-3 bg-orange-50 dark:bg-orange-950 rounded border border-orange-200 dark:border-orange-800">
              <h4 className="text-orange-800 dark:text-orange-200 font-semibold text-sm mb-2 mt-0">
                Step 4: Can I reuse anything?
              </h4>
              <ul className="text-orange-700 dark:text-orange-300 text-xs space-y-1 mb-0">
                <li>• Those buttons could be used anywhere!</li>
                <li>• UserInfo could work in comments too</li>
                <li>• Perfect for building a component library!</li>
              </ul>
            </div>
          </div>
        </div>

        <h3>Our Component Family Tree</h3>

        <CodeBlock
          code={`// ✅ Our simple profile card family
function ProfileCard() {
  return (
    <div className="profile-card">
      <UserInfo 
        name="Sarah Johnson" 
        job="React Developer" 
        location="San Francisco, CA" 
      />
      <AboutSection text="I love building cool React apps! 🚀 Always learning new things" />
      <ActionButtons />
    </div>
  );
}

// Each part is its own simple component
function UserInfo({ name, job, location }) {
  return (
    <div className="user-info">
      <h3>👤 {name}</h3>
      <p>💼 {job}</p>
      <p>📍 {location}</p>
    </div>
  );
}

function AboutSection({ text }) {
  return (
    <div className="about">
      <p>{text}</p>
    </div>
  );
}

function ActionButtons() {
  return (
    <div className="actions">
      <button>Follow</button>
      <button>Message</button>
      <button>Share</button>
    </div>
  );
}`}
          language="jsx"
          filename="profile-card.jsx"
          title="Simple Component Family"
        />

        <CodeBlock
          code={`// Look how clean and simple each component is!
function Button({ text }) {
  return <button>{text}</button>;
}

// Now we can use Button anywhere!
function ActionButtons() {
  return (
    <div>
      <Button text="Follow" />
      <Button text="Message" />
      <Button text="Share" />
    </div>
  );
}

// We can even use it in other components!
function Header() {
  return (
    <header>
      <h1>My Website</h1>
      <Button text="Login" />      {/* Same button, different place! */}
    </header>
  );
}`}
          language="jsx"
          filename="reusable-button.jsx"
          title="Reusable Components Are Magic!"
        />

        <h3>Our Family Tree Visual</h3>
        <div className="my-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border font-mono text-sm">
          <div>📫 ProfileCard (Parent)</div>
          <div>│</div>
          <div>├── 👤 UserInfo (Child)</div>
          <div>│</div>
          <div>├── 📝 AboutSection (Child)</div>
          <div>│</div>
          <div>└── 🎯 ActionButtons (Child)</div>
          <div>    ├── 🔘 Button (Follow)</div>
          <div>    ├── 🔘 Button (Message)</div>
          <div>    └── 🔘 Button (Share)</div>
        </div>

        <div className="my-6 p-4 bg-orange-50 dark:bg-orange-950 rounded-lg border border-orange-200 dark:border-orange-800">
          <h4 className="text-orange-800 dark:text-orange-200 font-semibold mb-3 mt-0">
            🎯 Practice Exercise: Component Breakdown
          </h4>
          <p className="text-orange-700 dark:text-orange-300 text-sm mb-2">
            Let&apos;s practice! Look at this simple navigation bar and identify the components:
          </p>
          <div className="my-4 p-3 bg-gray-100 dark:bg-gray-800 rounded border font-mono text-xs">
            <div>┌─────────────────────────────────────────────────────┐</div>
            <div>│ 🏠 MyApp | Home | Products | About | Contact | 👤 Login │</div>
            <div>└─────────────────────────────────────────────────────┘</div>
          </div>
          <p className="text-orange-700 dark:text-orange-300 text-sm mb-2">
            <strong>Your turn:</strong> How would you break this into components?
          </p>
          <details className="mt-3">
            <summary className="cursor-pointer font-semibold text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-200">
              💡 Click to see one possible solution
            </summary>
            <div className="mt-2 p-3 bg-orange-100 dark:bg-orange-900 rounded text-sm">
              <CodeBlock
                code={`// Possible component breakdown:
function Navigation() {
  return (
    <nav className="navbar">
      <Logo text="MyApp" />
      <NavigationMenu items={['Home', 'Products', 'About', 'Contact']} />
      <UserSection />
    </nav>
  );
}

function Logo({ text }) {
  return <div className="logo">🏠 {text}</div>;
}

function NavigationMenu({ items }) {
  return (
    <ul className="nav-menu">
      {items.map(item => (
        <NavItem key={item} text={item} />
      ))}
    </ul>
  );
}

function NavItem({ text }) {
  return <li className="nav-item">{text}</li>;
}

function UserSection() {
  return <div className="user-section">👤 Login</div>;
}`}
                language="jsx"
                filename="NavigationBreakdown.jsx"
                title="Navigation Component Breakdown"
              />
            </div>
          </details>
        </div>

        <h2>3. Props and Data Flow</h2>

        <h3>Understanding Parent-Child Communication</h3>
        <p>
          In React&apos;s component hierarchy, data flows in one direction: from
          parent components down to their children through props. Think of props
          like passing instructions or materials down an assembly line.
        </p>

        <div className="my-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border font-mono text-xs">
          <div className="mb-4 font-sans font-semibold">
            Data Flow Visualization:
          </div>
          <div> App (has all the data)</div>
          <div> │</div>
          <div> ┌────▼────┐</div>
          <div> │ props │ ─────┐</div>
          <div> └─────────┘ │</div>
          <div> │ ▼</div>
          <div> Dashboard ProductList</div>
          <div> │ │</div>
          <div> ┌────▼────┐ ┌────▼────┐</div>
          <div> │ props │ │ props │</div>
          <div> └─────────┘ └─────────┘</div>
          <div> │ │</div>
          <div> UserCard ProductCard</div>
        </div>

        <h3>Props in Action: Building a Product Dashboard</h3>
        <p>
          Let&apos;s build a real example that demonstrates how data flows through a
          component hierarchy:
        </p>

        <CodeBlock
          code={`// ✅ Top-level component: Has all the data and passes it down
function ProductDashboard() {
 // This would typically come from an API or database
 const dashboardData = {
   user: {
     name: "Sarah Chen",
     role: "Product Manager", 
     avatar: "/avatars/sarah.jpg"
   },
   products: [
     { id: 1, name: "Wireless Headphones", price: 299, stock: 15, category: "Electronics" },
     { id: 2, name: "Coffee Maker", price: 149, stock: 8, category: "Appliances" },
     { id: 3, name: "Running Shoes", price: 129, stock: 23, category: "Sports" }
   ],
   stats: {
     totalProducts: 3,
     totalValue: 577,
     lowStockCount: 1
   }
 };

 return (
   <div className="dashboard">
     {/* Pass user data to header */}
     <DashboardHeader user={dashboardData.user} />
     
     {/* Pass stats to overview */}
     <StatsOverview stats={dashboardData.stats} />
     
     {/* Pass products array to list */}
     <ProductList products={dashboardData.products} />
   </div>
 );
}`}
          language="jsx"
          filename="ProductDashboard.jsx"
          title="Top-Level Component"
        />

        <CodeBlock
          code={`// ✅ Header component: Receives user data via props
function DashboardHeader({ user }) {
 return (
   <header className="dashboard-header">
     <div className="user-section">
       {/* Pass specific user data further down */}
       <UserAvatar src={user.avatar} alt={user.name} />
       <UserDetails name={user.name} role={user.role} />
     </div>
     <nav className="dashboard-nav">
       <NavItem text="Products" active={true} />
       <NavItem text="Analytics" active={false} />
       <NavItem text="Settings" active={false} />
     </nav>
   </header>
 );
}

// ✅ Stats component: Receives and displays statistics
function StatsOverview({ stats }) {
 return (
   <section className="stats-overview">
     <StatCard 
       title="Total Products" 
       value={stats.totalProducts} 
       icon="📦"
     />
     <StatCard 
       title="Total Value" 
       value={\`$\${stats.totalValue}\`} 
       icon="💰"
     />
     <StatCard 
       title="Low Stock Items" 
       value={stats.lowStockCount} 
       icon="⚠️"
       highlight={stats.lowStockCount > 0}
     />
   </section>
 );
}`}
          language="jsx"
          filename="dashboard-components.jsx"
          title="Child Components"
        />

        <CodeBlock
          code={`// ✅ Product list: Receives products array and renders each product
function ProductList({ products }) {
 return (
   <section className="product-list">
     <h2>Product Inventory</h2>
     <div className="products-grid">
       {products.map(product => (
         <ProductCard 
           key={product.id}           // Always provide key for lists
           product={product}          // Pass entire product object
         />
       ))}
     </div>
   </section>
 );
}

// ✅ Reusable components that receive specific props
function UserAvatar({ src, alt }) {
 return (
   <img 
     src={src} 
     alt={alt} 
     className="user-avatar"
     style={{
       width: '40px',
       height: '40px',
       borderRadius: '50%'
     }}
   />
 );
}

function UserDetails({ name, role }) {
 return (
   <div className="user-details">
     <h3>{name}</h3>
     <p>{role}</p>
   </div>
 );
}`}
          language="jsx"
          filename="product-list.jsx"
          title="Product List & Utilities"
        />

        <CodeBlock
          code={`function StatCard({ title, value, icon, highlight = false }) {
 return (
   <div className={\`stat-card \${highlight ? 'highlight' : ''}\`}>
     <div className="stat-icon">{icon}</div>
     <div className="stat-content">
       <h4>{title}</h4>
       <p>{value}</p>
     </div>
   </div>
 );
}

function ProductCard({ product }) {
 const isLowStock = product.stock < 10;
 
 return (
   <div className={\`product-card \${isLowStock ? 'low-stock' : ''}\`}>
     <h3>{product.name}</h3>
     <p className="price">$\{product.price}</p>
     <p className="category">{product.category}</p>
     <p className={\`stock \${isLowStock ? 'warning' : 'normal'}\`}>
       Stock: {product.stock}
     </p>
     {isLowStock && (
       <div className="alert">⚠️ Low Stock!</div>
     )}
   </div>
 );
}

function NavItem({ text, active }) {
 return (
   <button className={\`nav-item \${active ? 'active' : ''}\`}>
     {text}
   </button>
 );
}`}
          language="jsx"
          filename="card-components.jsx"
          title="Card Components"
        />

        <h3>Props Best Practices</h3>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
            <h4 className="text-green-800 dark:text-green-200 font-semibold mb-2 mt-0">
              ✅ Good Props Practices:
            </h4>
            <ul className="text-green-700 dark:text-green-300 text-sm space-y-1 mb-0">
              <li>• Use descriptive prop names</li>
              <li>• Keep props focused and specific</li>
              <li>• Use default values when appropriate</li>
              <li>• Pass objects for related data</li>
              <li>• Destructure props in function parameters</li>
            </ul>
          </div>
          <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
            <h4 className="text-red-800 dark:text-red-200 font-semibold mb-2 mt-0">
              ❌ Props Anti-Patterns:
            </h4>
            <ul className="text-red-700 dark:text-red-300 text-sm space-y-1 mb-0">
              <li>• Passing too many individual props</li>
              <li>• Using unclear prop names like `data` or `info`</li>
              <li>• Modifying props inside components</li>
              <li>• Passing entire objects when only part is needed</li>
              <li>• Skipping prop validation in development</li>
            </ul>
          </div>
        </div>

        <CodeBlock
          code={`// ✅ Good: Clear, specific props
function UserProfile({ name, avatar, isOnline, lastSeen }) {
 return (
   <div className="user-profile">
     <img src={avatar} alt={name} />
     <h3>{name}</h3>
     <StatusIndicator online={isOnline} lastSeen={lastSeen} />
   </div>
 );
}

// ❌ Bad: Vague props and too many individual values
function UserProfile({ data, flag1, flag2, timestamp, url, text1, text2 }) {
 // Hard to understand what these props represent
 return (
   <div>
     <img src={url} alt={text1} />
     <h3>{text2}</h3>
     {/* What do flag1 and flag2 represent? */}
   </div>
 );
}

// ✅ Better: Group related data
function UserProfile({ user, status }) {
 return (
   <div className="user-profile">
     <img src={user.avatar} alt={user.name} />
     <h3>{user.name}</h3>
     <StatusIndicator 
       online={status.isOnline} 
       lastSeen={status.lastSeen} 
     />
   </div>
 );
}`}
          language="jsx"
          filename="props-best-practices.jsx"
          title="Props Best Practices"
        />

      </div>
    </>
  );
}
