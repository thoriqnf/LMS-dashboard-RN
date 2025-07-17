# Code Examples Library & Standards

## Reusable Code Patterns

### React Component Templates

#### Basic Functional Component
\`\`\`jsx
import React from 'react';

function ComponentName() {
  return (
    <div className="component-container">
      <h2>Component Title</h2>
      <p>Component content...</p>
    </div>
  );
}

export default ComponentName;
\`\`\`

#### Component with Props
\`\`\`jsx
function ComponentName({ title, description, isActive }) {
  return (
    <div className={`component-container ${isActive ? 'active' : ''}`}>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}
\`\`\`

#### Component with State
\`\`\`jsx
import { useState } from 'react';

function ComponentName() {
  const [count, setCount] = useState(0);
  
  const handleClick = () => {
    setCount(count + 1);
  };
  
  return (
    <div className="component-container">
      <h2>Count: {count}</h2>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
}
\`\`\`

### Common React Patterns

#### Conditional Rendering
\`\`\`jsx
function ConditionalComponent({ user, isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h2>Welcome, {user.name}!</h2>
          <p>You are logged in.</p>
        </div>
      ) : (
        <div>
          <h2>Please log in</h2>
          <p>You need to log in to access this content.</p>
        </div>
      )}
    </div>
  );
}
\`\`\`

#### List Rendering
\`\`\`jsx
function ListComponent({ items }) {
  return (
    <div>
      <h2>Items List</h2>
      {items.length === 0 ? (
        <p>No items available.</p>
      ) : (
        <ul>
          {items.map(item => (
            <li key={item.id}>
              <strong>{item.name}</strong>: {item.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
\`\`\`

#### Form Handling
\`\`\`jsx
import { useState } from 'react';

function FormComponent() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="4"
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
\`\`\`

### Hook Examples

#### useState Hook
\`\`\`jsx
import { useState } from 'react';

function CounterExample() {
  // State for a simple counter
  const [count, setCount] = useState(0);
  
  // State for an object
  const [user, setUser] = useState({
    name: '',
    age: 0
  });
  
  // State for an array
  const [items, setItems] = useState([]);
  
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  
  const updateUser = (newName) => {
    setUser({
      ...user,
      name: newName
    });
  };
  
  const addItem = (newItem) => {
    setItems([...items, newItem]);
  };
  
  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}
\`\`\`

#### useEffect Hook
\`\`\`jsx
import { useState, useEffect } from 'react';

function DataFetchingExample() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/data');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []); // Empty dependency array means this runs once on mount
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      <h2>Data:</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
\`\`\`

#### Custom Hook
\`\`\`jsx
import { useState, useEffect } from 'react';

// Custom hook for local storage
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });
  
  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };
  
  return [storedValue, setValue];
}

// Usage example
function LocalStorageExample() {
  const [name, setName] = useLocalStorage('name', '');
  
  return (
    <div>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <p>Hello, {name}!</p>
    </div>
  );
}
\`\`\`

## Progressive Example Sets

### Beginner Level Examples

#### Simple Button Component
\`\`\`jsx
function SimpleButton() {
  const handleClick = () => {
    alert('Button clicked!');
  };
  
  return (
    <button onClick={handleClick}>
      Click Me
    </button>
  );
}
\`\`\`

#### Display Component
\`\`\`jsx
function WelcomeMessage({ name }) {
  return (
    <div>
      <h1>Welcome, {name}!</h1>
      <p>Thanks for joining us.</p>
    </div>
  );
}
\`\`\`

### Intermediate Level Examples

#### Toggle Component
\`\`\`jsx
function ToggleSwitch() {
  const [isOn, setIsOn] = useState(false);
  
  const toggle = () => {
    setIsOn(!isOn);
  };
  
  return (
    <div>
      <button 
        onClick={toggle}
        style={{
          backgroundColor: isOn ? 'green' : 'red',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px'
        }}
      >
        {isOn ? 'ON' : 'OFF'}
      </button>
    </div>
  );
}
\`\`\`

#### Input with Validation
\`\`\`jsx
function ValidatedInput() {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);
  
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setIsValid(validateEmail(value));
  };
  
  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={handleChange}
        placeholder="Enter your email"
        style={{
          border: isValid ? '1px solid green' : '1px solid red',
          padding: '8px'
        }}
      />
      {!isValid && <p style={{ color: 'red' }}>Please enter a valid email</p>}
    </div>
  );
}
\`\`\`

### Advanced Level Examples

#### Todo List Component
\`\`\`jsx
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  
  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: inputValue,
          completed: false
        }
      ]);
      setInputValue('');
    }
  };
  
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id 
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  };
  
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  return (
    <div>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new todo..."
        />
        <button onClick={addTodo}>Add</button>
      </div>
      
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span 
              style={{ 
                textDecoration: todo.completed ? 'line-through' : 'none',
                cursor: 'pointer'
              }}
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
\`\`\`

## Context Examples

### Simple Context
\`\`\`jsx
import { createContext, useContext, useState } from 'react';

// Create context
const ThemeContext = createContext();

// Provider component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use context
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Component using context
function ThemedButton() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button 
      onClick={toggleTheme}
      style={{
        backgroundColor: theme === 'light' ? 'white' : 'black',
        color: theme === 'light' ? 'black' : 'white'
      }}
    >
      Toggle Theme (Current: {theme})
    </button>
  );
}
\`\`\`

## Error Handling Examples

### Error Boundary
\`\`\`jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          <p>Please try refreshing the page.</p>
        </div>
      );
    }
    
    return this.props.children;
  }
}
\`\`\`

### Try-Catch in Components
\`\`\`jsx
function DataComponent() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  
  const fetchData = async () => {
    try {
      const response = await fetch('/api/data');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err.message);
      setData(null);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);
  
  if (error) {
    return <div>Error: {error}</div>;
  }
  
  return (
    <div>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading...'}
    </div>
  );
}
\`\`\`

## Code Quality Standards

### Best Practices Checklist
- [ ] Use descriptive variable and function names
- [ ] Include meaningful comments
- [ ] Handle edge cases (empty arrays, null values, etc.)
- [ ] Use proper error handling
- [ ] Follow consistent code formatting
- [ ] Use TypeScript when appropriate
- [ ] Include PropTypes or TypeScript types
- [ ] Avoid nested ternary operators
- [ ] Keep components small and focused
- [ ] Use custom hooks for reusable logic

### Common Patterns to Avoid
\`\`\`jsx
// ❌ Avoid - directly mutating state
const [items, setItems] = useState([]);
items.push(newItem); // Wrong!

// ✅ Correct - using spread operator
setItems([...items, newItem]);

// ❌ Avoid - missing key prop
{items.map(item => <div>{item.name}</div>)}

// ✅ Correct - include key prop
{items.map(item => <div key={item.id}>{item.name}</div>)}

// ❌ Avoid - inline object creation in render
<Component style={{ color: 'red' }} />

// ✅ Better - define styles outside render
const styles = { color: 'red' };
<Component style={styles} />
\`\`\`

This library provides tested, reusable code examples that can be referenced and adapted for different learning contexts while maintaining high quality and educational value.
