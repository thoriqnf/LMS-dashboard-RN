import { CodeBlock } from "@/components/ui/code-block-new";

export function Day4Session1Content() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            TypeScript with Any Types - Session 1
          </h1>

          <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-8">
            <h3 className="text-blue-800 dark:text-blue-200 font-semibold mb-4 mt-0">
              📝 Session Overview
            </h3>
            <ul className="text-blue-700 dark:text-blue-300 space-y-2 mb-0">
              <li>
                <strong>Introduction to Any Type</strong> - Understanding when and why to use any
              </li>
              <li>
                <strong>Basic Any Implementation</strong> - Setting up TypeScript with any types
              </li>
              <li>
                <strong>Function Parameters & Returns</strong> - Using any in function signatures
              </li>
              <li>
                <strong>Object and Array Types</strong> - Working with dynamic data structures
              </li>
              <li>
                <strong>Event Handling</strong> - Handling events with any type parameters
              </li>
              <li>
                <strong>Component Props</strong> - Creating flexible React components with any
              </li>
            </ul>
          </div>
        </div>

      {/* Introduction */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Understanding the Any Type</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          The `any` type in TypeScript is a powerful escape hatch that disables type checking for a variable. 
          While it should be used sparingly in production code, it's useful for rapid prototyping, migrating JavaScript code, 
          and working with dynamic content where types are unknown at compile time.
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">📝 Any Type Use Cases</h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1">
            <li>• <strong>Quick Prototyping</strong>: Rapid development without type constraints</li>
            <li>• <strong>Dynamic Content</strong>: Working with APIs that return varying structures</li>
            <li>• <strong>Legacy Integration</strong>: Migrating JavaScript code incrementally</li>
            <li>• <strong>Third-party Libraries</strong>: When type definitions are unavailable</li>
          </ul>
        </div>
      </div>

      {/* Basic Any Type Setup */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Basic Any Type Configuration</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Let's start with the basics of using the `any` type in TypeScript. This gives us maximum flexibility 
          while maintaining the development experience of TypeScript.
        </p>

        <CodeBlock
          code={`// Basic any type declarations
let data: any = "Hello World";
data = 42;
data = true;
data = { name: "John", age: 30 };
data = [1, 2, 3, "mixed", { nested: true }];

// Function with any parameters and return type
function processData(input: any): any {
  // Can do anything with input without type checking
  console.log("Processing:", input);
  
  if (typeof input === "string") {
    return input.toUpperCase();
  }
  
  if (typeof input === "number") {
    return input * 2;
  }
  
  if (Array.isArray(input)) {
    return input.map((item: any) => item);
  }
  
  return input;
}

// Using the function with different types
const result1: any = processData("hello");      // "HELLO"
const result2: any = processData(25);           // 50
const result3: any = processData([1, 2, 3]);    // [1, 2, 3]
const result4: any = processData({ id: 1 });    // { id: 1 }

// Array of any types
const mixedArray: any[] = [
  "string",
  42,
  true,
  { name: "Object" },
  [1, 2, 3],
  function() { return "function"; }
];

// Object with any properties
const dynamicObject: { [key: string]: any } = {
  name: "Dynamic",
  value: 100,
  active: true,
  metadata: {
    tags: ["typescript", "any"],
    settings: { theme: "dark" }
  }
};

export { processData, mixedArray, dynamicObject };`}
          language="tsx"
          filename="types/basicAny.ts"
          title="Basic Any Type Usage"
        />

        <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 mt-4">
          <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">⚠️ Any Type Considerations</h4>
          <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
            <li>• <strong>No Type Safety</strong>: TypeScript won't catch type-related errors</li>
            <li>• <strong>IntelliSense Limited</strong>: IDE autocomplete won't work optimally</li>
            <li>• <strong>Runtime Errors</strong>: Type mismatches only discovered at runtime</li>
            <li>• <strong>Documentation Loss</strong>: Code becomes less self-documenting</li>
          </ul>
        </div>
      </div>

      {/* Example 1: React Component with Any Props */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Example 1: React Component with Any Props</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Let's create a flexible React component that accepts any type of props, making it highly reusable 
          for various scenarios without strict type constraints.
        </p>

        <CodeBlock
          code={`import React, { useState } from 'react';

// Component that accepts any props
interface FlexibleComponentProps {
  data: any;
  config: any;
  onAction?: (event: any) => any;
  children?: any;
}

export function FlexibleComponent(props: FlexibleComponentProps) {
  const [state, setState] = useState<any>({
    currentValue: null,
    history: [],
    metadata: {}
  });

  // Handle any type of data processing
  const processData = (input: any): any => {
    console.log("Processing input:", input);
    
    // Can handle strings, numbers, objects, arrays, etc.
    if (typeof input === "string") {
      return { type: "text", value: input.toLowerCase(), length: input.length };
    }
    
    if (typeof input === "number") {
      return { type: "numeric", value: input, isEven: input % 2 === 0 };
    }
    
    if (Array.isArray(input)) {
      return { type: "array", value: input, count: input.length };
    }
    
    if (typeof input === "object" && input !== null) {
      return { type: "object", value: input, keys: Object.keys(input) };
    }
    
    return { type: "unknown", value: input };
  };

  // Event handler that accepts any event type
  const handleAction = (event: any) => {
    const processed: any = processData(event);
    
    setState((prev: any) => ({
      ...prev,
      currentValue: processed,
      history: [...prev.history, processed],
      metadata: {
        ...prev.metadata,
        lastUpdate: new Date().toISOString(),
        actionCount: (prev.metadata.actionCount || 0) + 1
      }
    }));

    // Call parent callback if provided
    if (props.onAction) {
      props.onAction(processed);
    }
  };

  // Render function that handles any data type
  const renderData = (data: any): any => {
    if (data === null || data === undefined) {
      return <div className="text-gray-500">No data</div>;
    }

    if (typeof data === "string") {
      return <div className="text-blue-600 font-mono">{data}</div>;
    }

    if (typeof data === "number") {
      return <div className="text-green-600 font-bold">{data}</div>;
    }

    if (typeof data === "boolean") {
      return (
        <div className={\`text-\${data ? "green" : "red"}-600\`}>
          {data ? "✓ True" : "✗ False"}
        </div>
      );
    }

    if (Array.isArray(data)) {
      return (
        <div className="border rounded p-2">
          <div className="text-sm text-gray-600 mb-1">Array ({data.length} items):</div>
          {data.map((item: any, index: any) => (
            <div key={index} className="ml-4">
              {index}: {renderData(item)}
            </div>
          ))}
        </div>
      );
    }

    if (typeof data === "object") {
      return (
        <div className="border rounded p-2">
          <div className="text-sm text-gray-600 mb-1">Object:</div>
          {Object.entries(data).map(([key, value]: [any, any]) => (
            <div key={key} className="ml-4">
              <span className="font-semibold">{key}:</span> {renderData(value)}
            </div>
          ))}
        </div>
      );
    }

    return <div className="text-gray-400">Unknown type: {typeof data}</div>;
  };

  return (
    <div className="p-6 border rounded-lg bg-white shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Flexible Component</h3>
      
      {/* Configuration Display */}
      <div className="mb-4">
        <h4 className="font-medium mb-2">Configuration:</h4>
        {renderData(props.config)}
      </div>

      {/* Data Display */}
      <div className="mb-4">
        <h4 className="font-medium mb-2">Data:</h4>
        {renderData(props.data)}
      </div>

      {/* Interactive Buttons */}
      <div className="mb-4 space-x-2">
        <button
          onClick={() => handleAction("string test")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Test String
        </button>
        <button
          onClick={() => handleAction(Math.floor(Math.random() * 100))}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Test Number
        </button>
        <button
          onClick={() => handleAction([1, "two", { three: 3 }])}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Test Array
        </button>
        <button
          onClick={() => handleAction({ name: "Test", active: true, count: 5 })}
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          Test Object
        </button>
      </div>

      {/* Current State Display */}
      {state.currentValue && (
        <div className="mb-4">
          <h4 className="font-medium mb-2">Current Processed Value:</h4>
          {renderData(state.currentValue)}
        </div>
      )}

      {/* History Display */}
      {state.history.length > 0 && (
        <div className="mb-4">
          <h4 className="font-medium mb-2">History ({state.history.length} actions):</h4>
          <div className="max-h-32 overflow-y-auto border rounded p-2 bg-gray-50">
            {state.history.map((item: any, index: any) => (
              <div key={index} className="text-sm mb-1">
                {index + 1}: {JSON.stringify(item)}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Children (if any) */}
      {props.children && (
        <div className="border-t pt-4">
          <h4 className="font-medium mb-2">Children:</h4>
          {props.children}
        </div>
      )}
    </div>
  );
}

// Usage Example
export function FlexibleComponentExample() {
  const [componentData, setComponentData] = useState<any>({
    title: "Dynamic Data",
    items: [1, 2, 3, "test", { nested: true }],
    settings: { theme: "light", auto: false }
  });

  const handleComponentAction = (result: any) => {
    console.log("Component action result:", result);
    // Handle the result in any way needed
  };

  return (
    <div className="space-y-4">
      <FlexibleComponent
        data={componentData}
        config={{ maxItems: 10, displayMode: "detailed", features: ["history", "metadata"] }}
        onAction={handleComponentAction}
      >
        <div className="text-sm text-gray-600">
          This is flexible children content that can be anything!
        </div>
      </FlexibleComponent>
    </div>
  );
}`}
          language="tsx"
          filename="components/FlexibleComponent.tsx"
          title="React Component with Any Types"
        />

        <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800 mt-4">
          <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">✅ What's New in This Example</h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
            <li>• <strong>Any Props Interface</strong> - Component accepts any type of data and configuration</li>
            <li>• <strong>Dynamic State</strong> - State can store any type of values</li>
            <li>• <strong>Flexible Event Handling</strong> - Events can carry any payload</li>
            <li>• <strong>Dynamic Rendering</strong> - Renders different UI based on data type</li>
            <li>• <strong>Type Detection</strong> - Runtime type checking for different behaviors</li>
          </ul>
        </div>
      </div>

      {/* Example 2: Dynamic API Handler */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Example 2: Dynamic API Handler with Any Types</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Create a universal API handler that can process any type of request and response data, 
          perfect for working with various third-party APIs with different data structures.
        </p>

        <CodeBlock
          code={`import React, { useState, useEffect } from 'react';

// Universal API configuration
interface ApiConfig {
  baseUrl: any;
  headers: any;
  defaultParams: any;
  transformRequest?: (data: any) => any;
  transformResponse?: (data: any) => any;
}

// Hook for making API calls with any data types
export function useApiCall() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<any>(false);
  const [error, setError] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);

  // Generic API call function
  const makeRequest = async (
    url: any,
    options: any = {},
    config: any = {}
  ): Promise<any> => {
    setLoading(true);
    setError(null);

    try {
      // Prepare request options
      const requestOptions: any = {
        method: options.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...config.headers,
          ...options.headers
        },
        ...options
      };

      // Add body if it's not a GET request
      if (options.data && requestOptions.method !== 'GET') {
        if (config.transformRequest) {
          requestOptions.body = config.transformRequest(options.data);
        } else {
          requestOptions.body = JSON.stringify(options.data);
        }
      }

      // Add query parameters for GET requests
      let finalUrl: any = url;
      if (options.params) {
        const queryParams: any = new URLSearchParams();
        Object.entries(options.params).forEach(([key, value]: [any, any]) => {
          queryParams.append(key, value);
        });
        finalUrl += \`?\${queryParams.toString()}\`;
      }

      console.log('Making request to:', finalUrl, 'with options:', requestOptions);

      const response: any = await fetch(finalUrl, requestOptions);
      let responseData: any = await response.text();

      // Try to parse as JSON
      try {
        responseData = JSON.parse(responseData);
      } catch {
        // Keep as text if not valid JSON
      }

      if (!response.ok) {
        throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
      }

      // Transform response if transformer provided
      if (config.transformResponse) {
        responseData = config.transformResponse(responseData);
      }

      // Update history
      const requestRecord: any = {
        timestamp: new Date().toISOString(),
        url: finalUrl,
        method: requestOptions.method,
        status: response.status,
        data: responseData
      };

      setHistory((prev: any) => [requestRecord, ...prev.slice(0, 9)]); // Keep last 10
      setData(responseData);
      
      return responseData;
    } catch (err: any) {
      const errorInfo: any = {
        message: err.message,
        timestamp: new Date().toISOString(),
        url,
        options
      };
      
      setError(errorInfo);
      setHistory((prev: any) => [{ ...errorInfo, status: 'error' }, ...prev.slice(0, 9)]);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = () => setHistory([]);
  const clearData = () => setData(null);
  const clearError = () => setError(null);

  return {
    data,
    loading,
    error,
    history,
    makeRequest,
    clearHistory,
    clearData,
    clearError
  };
}

// API testing component
export function ApiTester() {
  const api = useApiCall();
  const [testConfig, setTestConfig] = useState<any>({
    baseUrl: 'https://jsonplaceholder.typicode.com',
    currentEndpoint: '/posts/1',
    method: 'GET',
    customData: null
  });

  // Predefined test endpoints with different data structures
  const testEndpoints: any = {
    'Single Post': { url: '/posts/1', method: 'GET' },
    'All Posts': { url: '/posts', method: 'GET' },
    'User Info': { url: '/users/1', method: 'GET' },
    'All Users': { url: '/users', method: 'GET' },
    'Comments': { url: '/comments?postId=1', method: 'GET' },
    'Create Post': {
      url: '/posts',
      method: 'POST',
      data: {
        title: 'Test Post',
        body: 'This is a test post created with any types',
        userId: 1
      }
    }
  };

  const runTest = async (testName: any) => {
    const test: any = testEndpoints[testName];
    const fullUrl: any = testConfig.baseUrl + test.url;
    
    try {
      await api.makeRequest(fullUrl, {
        method: test.method,
        data: test.data,
        params: test.params
      });
    } catch (error: any) {
      console.error('Test failed:', error);
    }
  };

  const runCustomRequest = async () => {
    try {
      const customUrl: any = testConfig.baseUrl + testConfig.currentEndpoint;
      await api.makeRequest(customUrl, {
        method: testConfig.method,
        data: testConfig.customData
      });
    } catch (error: any) {
      console.error('Custom request failed:', error);
    }
  };

  // Render any type of data in a readable format
  const renderApiData = (data: any): any => {
    if (data === null || data === undefined) {
      return <div className="text-gray-500 italic">No data</div>;
    }

    if (typeof data === 'string') {
      return <pre className="whitespace-pre-wrap text-sm">{data}</pre>;
    }

    if (typeof data === 'number' || typeof data === 'boolean') {
      return <span className="font-mono text-blue-600">{String(data)}</span>;
    }

    return <pre className="text-sm bg-gray-100 p-3 rounded overflow-auto max-h-64">
      {JSON.stringify(data, null, 2)}
    </pre>;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 border rounded-lg">
        <h3 className="text-lg font-semibold mb-4">API Configuration</h3>
        
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Base URL:</label>
            <input
              type="text"
              value={testConfig.baseUrl}
              onChange={(e: any) => setTestConfig((prev: any) => ({ 
                ...prev, 
                baseUrl: e.target.value 
              }))}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Endpoint:</label>
            <input
              type="text"
              value={testConfig.currentEndpoint}
              onChange={(e: any) => setTestConfig((prev: any) => ({ 
                ...prev, 
                currentEndpoint: e.target.value 
              }))}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Method:</label>
            <select
              value={testConfig.method}
              onChange={(e: any) => setTestConfig((prev: any) => ({ 
                ...prev, 
                method: e.target.value 
              }))}
              className="w-full p-2 border rounded"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
          </div>
          
          <div>
            <button
              onClick={runCustomRequest}
              disabled={api.loading}
              className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {api.loading ? 'Loading...' : 'Run Custom Request'}
            </button>
          </div>
        </div>

        {(testConfig.method === 'POST' || testConfig.method === 'PUT') && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Request Data (JSON):</label>
            <textarea
              value={testConfig.customData ? JSON.stringify(testConfig.customData, null, 2) : ''}
              onChange={(e: any) => {
                try {
                  const parsed: any = JSON.parse(e.target.value);
                  setTestConfig((prev: any) => ({ ...prev, customData: parsed }));
                } catch {
                  // Invalid JSON, but don't error out
                }
              }}
              placeholder='{"key": "value"}'
              className="w-full p-2 border rounded h-20"
            />
          </div>
        )}
      </div>

      <div className="bg-white p-6 border rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Quick Tests</h3>
        <div className="grid md:grid-cols-3 gap-2">
          {Object.keys(testEndpoints).map((testName: any) => (
            <button
              key={testName}
              onClick={() => runTest(testName)}
              disabled={api.loading}
              className="p-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 text-sm"
            >
              {testName}
            </button>
          ))}
        </div>
      </div>

      {api.data && (
        <div className="bg-white p-6 border rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Response Data</h3>
            <button
              onClick={api.clearData}
              className="text-sm px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Clear
            </button>
          </div>
          {renderApiData(api.data)}
        </div>
      )}

      {api.error && (
        <div className="bg-red-50 p-6 border border-red-200 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-red-800">Error</h3>
            <button
              onClick={api.clearError}
              className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Clear
            </button>
          </div>
          {renderApiData(api.error)}
        </div>
      )}

      {api.history.length > 0 && (
        <div className="bg-white p-6 border rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Request History ({api.history.length})</h3>
            <button
              onClick={api.clearHistory}
              className="text-sm px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Clear History
            </button>
          </div>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {api.history.map((record: any, index: any) => (
              <div
                key={index}
                className={\`p-3 rounded text-sm \${
                  record.status === 'error' 
                    ? 'bg-red-100 border border-red-200' 
                    : 'bg-gray-100 border border-gray-200'
                }\`}
              >
                <div className="font-medium mb-1">
                  {record.method || 'ERROR'} {record.url}
                  {record.status && record.status !== 'error' && (
                    <span className="ml-2 text-green-600">({record.status})</span>
                  )}
                </div>
                <div className="text-gray-600">{record.timestamp}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}`}
          language="tsx"
          filename="components/ApiTester.tsx"
          title="Dynamic API Handler with Any Types"
        />

        <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800 mt-4">
          <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">✅ What's New in This Example</h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
            <li>• <strong>Universal API Hook</strong> - Handles any type of API response</li>
            <li>• <strong>Dynamic Configuration</strong> - Config object accepts any properties</li>
            <li>• <strong>Flexible Request Options</strong> - Supports any HTTP method and data</li>
            <li>• <strong>Generic Data Rendering</strong> - Displays any response format</li>
            <li>• <strong>History Tracking</strong> - Stores any type of request/response data</li>
          </ul>
        </div>
      </div>

      {/* Example 3: Event Handler System */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Example 3: Universal Event Handler System</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Build a flexible event system that can handle any type of events, data payloads, and callback functions, 
          perfect for complex applications with diverse interaction patterns.
        </p>

        <CodeBlock
          code={`import React, { useState, useCallback, useRef } from 'react';

// Event system that handles any type of events
interface EventData {
  type: any;
  payload: any;
  timestamp: any;
  source: any;
  metadata: any;
}

export function useEventSystem() {
  const [events, setEvents] = useState<any[]>([]);
  const [listeners, setListeners] = useState<any>({});
  const eventId = useRef<any>(0);

  // Register event listener for any event type
  const addEventListener = useCallback((eventType: any, callback: any, options: any = {}) => {
    const listenerId: any = \`listener_\${Date.now()}_\${Math.random()}\`;
    
    setListeners((prev: any) => ({
      ...prev,
      [eventType]: {
        ...prev[eventType],
        [listenerId]: {
          callback,
          options,
          created: new Date().toISOString()
        }
      }
    }));

    // Return unsubscribe function
    return () => {
      setListeners((prev: any) => {
        const updated: any = { ...prev };
        if (updated[eventType]) {
          delete updated[eventType][listenerId];
          if (Object.keys(updated[eventType]).length === 0) {
            delete updated[eventType];
          }
        }
        return updated;
      });
    };
  }, []);

  // Emit event with any payload
  const emitEvent = useCallback((eventType: any, payload: any = {}, metadata: any = {}) => {
    const eventData: EventData = {
      type: eventType,
      payload,
      timestamp: new Date().toISOString(),
      source: metadata.source || 'unknown',
      metadata: {
        id: ++eventId.current,
        ...metadata
      }
    };

    // Add to events history
    setEvents((prev: any) => [eventData, ...prev.slice(0, 99)]); // Keep last 100 events

    // Notify all listeners for this event type
    const eventListeners: any = listeners[eventType];
    if (eventListeners) {
      Object.values(eventListeners).forEach((listener: any) => {
        try {
          // Check if listener should be called based on options
          if (listener.options.filter && !listener.options.filter(eventData)) {
            return;
          }

          // Call the listener
          listener.callback(eventData);

          // Remove if it's a one-time listener
          if (listener.options.once) {
            setListeners((prev: any) => {
              const updated: any = { ...prev };
              Object.keys(updated[eventType]).forEach((id: any) => {
                if (updated[eventType][id] === listener) {
                  delete updated[eventType][id];
                }
              });
              return updated;
            });
          }
        } catch (error: any) {
          console.error('Event listener error:', error);
        }
      });
    }

    return eventData;
  }, [listeners]);

  // Get events by any criteria
  const getEvents = useCallback((filter: any = {}) => {
    return events.filter((event: any) => {
      if (filter.type && event.type !== filter.type) return false;
      if (filter.source && event.source !== filter.source) return false;
      if (filter.since && new Date(event.timestamp) < new Date(filter.since)) return false;
      if (filter.payloadContains) {
        const searchStr: any = JSON.stringify(event.payload).toLowerCase();
        if (!searchStr.includes(filter.payloadContains.toLowerCase())) return false;
      }
      return true;
    });
  }, [events]);

  const clearEvents = useCallback(() => setEvents([]), []);
  const getListenerCount = useCallback((eventType: any) => {
    return Object.keys(listeners[eventType] || {}).length;
  }, [listeners]);

  return {
    events,
    listeners,
    addEventListener,
    emitEvent,
    getEvents,
    clearEvents,
    getListenerCount
  };
}

// Demo component that uses the event system
export function EventSystemDemo() {
  const eventSystem = useEventSystem();
  const [currentEventType, setCurrentEventType] = useState<any>('user-action');
  const [customPayload, setCustomPayload] = useState<any>('');
  const [filterCriteria, setFilterCriteria] = useState<any>({});

  // Example event listeners
  React.useEffect(() => {
    // User action listener
    const unsubscribe1: any = eventSystem.addEventListener(
      'user-action',
      (eventData: any) => {
        console.log('User action detected:', eventData);
      },
      { filter: (event: any) => event.payload.userId !== undefined }
    );

    // System event listener
    const unsubscribe2: any = eventSystem.addEventListener(
      'system-event',
      (eventData: any) => {
        console.log('System event:', eventData);
      }
    );

    // Universal listener (listens to any event type)
    const unsubscribe3: any = eventSystem.addEventListener(
      'debug',
      (eventData: any) => {
        console.log('Debug event captured:', eventData);
      }
    );

    return () => {
      unsubscribe1();
      unsubscribe2();
      unsubscribe3();
    };
  }, [eventSystem]);

  // Generate different types of events
  const generateEvent = (type: any) => {
    const eventData: any = {
      'user-action': {
        userId: Math.floor(Math.random() * 1000),
        action: ['click', 'hover', 'scroll', 'type'][Math.floor(Math.random() * 4)],
        element: \`element_\${Math.floor(Math.random() * 100)}\`,
        coordinates: { x: Math.random() * 1000, y: Math.random() * 600 }
      },
      'system-event': {
        level: ['info', 'warning', 'error'][Math.floor(Math.random() * 3)],
        message: \`System message \${Math.floor(Math.random() * 1000)}\`,
        component: ['auth', 'api', 'ui', 'database'][Math.floor(Math.random() * 4)],
        details: { memory: Math.random() * 100, cpu: Math.random() * 100 }
      },
      'api-call': {
        endpoint: ['/users', '/posts', '/comments', '/auth'][Math.floor(Math.random() * 4)],
        method: ['GET', 'POST', 'PUT', 'DELETE'][Math.floor(Math.random() * 4)],
        status: [200, 201, 400, 404, 500][Math.floor(Math.random() * 5)],
        duration: Math.floor(Math.random() * 2000) + 100
      },
      'custom': {
        randomString: Math.random().toString(36).substring(7),
        randomNumber: Math.random() * 1000,
        randomBoolean: Math.random() > 0.5,
        nestedObject: {
          level1: {
            level2: {
              value: 'deep nested value'
            }
          }
        }
      }
    };

    eventSystem.emitEvent(type, eventData[type], {
      source: 'demo-component',
      generated: true,
      timestamp: new Date().toISOString()
    });
  };

  const emitCustomEvent = () => {
    try {
      const payload: any = customPayload ? JSON.parse(customPayload) : {};
      eventSystem.emitEvent(currentEventType, payload, {
        source: 'user-input',
        custom: true
      });
    } catch (error: any) {
      alert('Invalid JSON in payload');
    }
  };

  const filteredEvents: any = eventSystem.getEvents(filterCriteria);

  return (
    <div className="space-y-6">
      {/* Event Controls */}
      <div className="bg-white p-6 border rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Event Controls</h3>
        
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Event Type:</label>
            <input
              type="text"
              value={currentEventType}
              onChange={(e: any) => setCurrentEventType(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter event type"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium">Quick Event Generators:</label>
            <div className="grid grid-cols-2 gap-2">
              {['user-action', 'system-event', 'api-call', 'custom'].map((type: any) => (
                <button
                  key={type}
                  onClick={() => generateEvent(type)}
                  className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Custom Payload (JSON):</label>
          <textarea
            value={customPayload}
            onChange={(e: any) => setCustomPayload(e.target.value)}
            placeholder='{"key": "value", "number": 123, "array": [1,2,3]}'
            className="w-full p-2 border rounded h-20"
          />
        </div>

        <button
          onClick={emitCustomEvent}
          className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Emit Custom Event
        </button>
      </div>

      {/* Event Statistics */}
      <div className="bg-white p-6 border rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Event Statistics</h3>
        <div className="grid md:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-blue-50 rounded">
            <div className="text-2xl font-bold text-blue-600">{eventSystem.events.length}</div>
            <div className="text-sm text-blue-800">Total Events</div>
          </div>
          <div className="p-4 bg-green-50 rounded">
            <div className="text-2xl font-bold text-green-600">
              {Object.keys(eventSystem.listeners).length}
            </div>
            <div className="text-sm text-green-800">Event Types</div>
          </div>
          <div className="p-4 bg-purple-50 rounded">
            <div className="text-2xl font-bold text-purple-600">
              {Object.values(eventSystem.listeners).reduce((total: any, listeners: any) => 
                total + Object.keys(listeners).length, 0
              )}
            </div>
            <div className="text-sm text-purple-800">Active Listeners</div>
          </div>
          <div className="p-4 bg-orange-50 rounded">
            <div className="text-2xl font-bold text-orange-600">
              {new Set(eventSystem.events.map((e: any) => e.type)).size}
            </div>
            <div className="text-sm text-orange-800">Unique Types</div>
          </div>
        </div>
      </div>

      {/* Event Filter */}
      <div className="bg-white p-6 border rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Event Filter</h3>
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Event Type:</label>
            <input
              type="text"
              value={filterCriteria.type || ''}
              onChange={(e: any) => setFilterCriteria((prev: any) => ({ 
                ...prev, 
                type: e.target.value || undefined 
              }))}
              className="w-full p-2 border rounded"
              placeholder="Filter by type"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Source:</label>
            <input
              type="text"
              value={filterCriteria.source || ''}
              onChange={(e: any) => setFilterCriteria((prev: any) => ({ 
                ...prev, 
                source: e.target.value || undefined 
              }))}
              className="w-full p-2 border rounded"
              placeholder="Filter by source"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Payload Contains:</label>
            <input
              type="text"
              value={filterCriteria.payloadContains || ''}
              onChange={(e: any) => setFilterCriteria((prev: any) => ({ 
                ...prev, 
                payloadContains: e.target.value || undefined 
              }))}
              className="w-full p-2 border rounded"
              placeholder="Search in payload"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setFilterCriteria({})}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Clear Filter
          </button>
          <button
            onClick={eventSystem.clearEvents}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Clear All Events
          </button>
        </div>
        
        <div className="mt-2 text-sm text-gray-600">
          Showing {filteredEvents.length} of {eventSystem.events.length} events
        </div>
      </div>

      {/* Event List */}
      {filteredEvents.length > 0 && (
        <div className="bg-white p-6 border rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Events</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredEvents.map((event: any, index: any) => (
              <div
                key={event.metadata.id}
                className="border rounded p-3 hover:bg-gray-50"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="font-medium text-blue-600">{event.type}</div>
                  <div className="text-xs text-gray-500">
                    #{event.metadata.id} | {event.source}
                  </div>
                </div>
                <div className="text-sm text-gray-600 mb-2">{event.timestamp}</div>
                <details className="text-sm">
                  <summary className="cursor-pointer font-medium text-gray-700 hover:text-gray-900">
                    View Payload
                  </summary>
                  <pre className="mt-2 p-2 bg-gray-100 rounded overflow-auto text-xs">
                    {JSON.stringify(event.payload, null, 2)}
                  </pre>
                </details>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}`}
          language="tsx"
          filename="components/EventSystemDemo.tsx"
          title="Universal Event Handler System"
        />

        <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800 mt-4">
          <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">✅ What's New in This Example</h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
            <li>• <strong>Universal Event System</strong> - Handles any event type and payload</li>
            <li>• <strong>Dynamic Listeners</strong> - Register callbacks for any event pattern</li>
            <li>• <strong>Flexible Filtering</strong> - Filter events by any criteria</li>
            <li>• <strong>Metadata Support</strong> - Events can carry any additional information</li>
            <li>• <strong>Real-time Updates</strong> - Live event tracking and statistics</li>
          </ul>
        </div>
      </div>

      {/* Best Practices */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Any Type Best Practices</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">✅ When to Use Any</h4>
            <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1">
              <li>• Rapid prototyping and experimentation</li>
              <li>• Migrating JavaScript code incrementally</li>
              <li>• Working with dynamic/unknown data structures</li>
              <li>• Integrating with third-party libraries without types</li>
              <li>• Building highly flexible, generic components</li>
            </ul>
          </div>
          
          <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-3">⚠️ Any Type Considerations</h4>
            <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
              <li>• Use runtime type checking when needed</li>
              <li>• Add comprehensive error handling</li>
              <li>• Document expected data structures</li>
              <li>• Consider using unknown instead of any when possible</li>
              <li>• Plan migration to specific types when requirements stabilize</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Runtime Type Checking */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Runtime Type Checking with Any</h2>
        
        <div className="bg-gray-50 dark:bg-gray-950/20 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
          <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">🔍 Type Safety Techniques</h4>
          <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-2">
            <li>
              <strong>typeof checks:</strong> <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">typeof value === 'string'</code>
            </li>
            <li>
              <strong>Array validation:</strong> <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">Array.isArray(value)</code>
            </li>
            <li>
              <strong>Object validation:</strong> <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">value && typeof value === 'object' && value.constructor === Object</code>
            </li>
            <li>
              <strong>Property checking:</strong> <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">'property' in object</code> or <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">object.hasOwnProperty('property')</code>
            </li>
            <li>
              <strong>Instance checking:</strong> <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">value instanceof ClassName</code>
            </li>
          </ul>
        </div>
      </div>

      {/* Hands-On Exercise */}
      <div className="bg-orange-50 dark:bg-orange-950/20 p-6 rounded-xl border border-orange-200 dark:border-orange-800">
        <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-4">
          🎯 Hands-On Exercise: Dynamic Form Builder
        </h3>
        
        <div className="text-orange-800 dark:text-orange-200 space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Challenge: Build a Universal Form Component</h4>
            <p className="text-sm">
              Create a form component that can render any type of form fields based on a dynamic configuration object.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Requirements:</h4>
            <ul className="text-sm space-y-1">
              <li>• Accept any form field configuration (text, number, select, checkbox, etc.)</li>
              <li>• Handle any validation rules dynamically</li>
              <li>• Support any custom styling or layout options</li>
              <li>• Return form data in any desired format</li>
              <li>• Handle any type of form submission logic</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Bonus Features:</h4>
            <ul className="text-sm space-y-1">
              <li>• Dynamic field dependencies (show/hide based on other fields)</li>
              <li>• Custom field types with any rendering logic</li>
              <li>• Form data persistence to any storage mechanism</li>
              <li>• Multi-step forms with any navigation pattern</li>
              <li>• Integration with any validation library</li>
            </ul>
          </div>
        </div>
      </div>

        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            🎉 Session 1 Complete!
          </h4>
          <p className="text-green-700 dark:text-green-300 mb-3">
            You've learned the fundamentals of using the `any` type in TypeScript for maximum flexibility. 
            You've built components that can handle any data type, created universal API handlers, and implemented flexible event systems.
          </p>
          <p className="text-green-700 dark:text-green-300 mb-0">
            <strong>Next:</strong> Session 2 will explore advanced any type patterns, including complex data transformations, 
            dynamic component generation, and integration with external libraries without type definitions.
          </p>
        </div>
    </div>
  );
}