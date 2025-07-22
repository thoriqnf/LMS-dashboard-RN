import { CodeBlock } from "@/components/ui/code-block-new";

export function Day4Session2Content() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Advanced Any Type Patterns - Session 2
          </h1>

          <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-8">
            <h3 className="text-blue-800 dark:text-blue-200 font-semibold mb-4 mt-0">
              🚀 Session Overview
            </h3>
            <ul className="text-blue-700 dark:text-blue-300 space-y-2 mb-0">
              <li>
                <strong>Complex Data Transformations</strong> - Transform any data to any format
              </li>
              <li>
                <strong>Dynamic Component Generation</strong> - Generate components from any configuration
              </li>
              <li>
                <strong>Plugin Architecture</strong> - Build extensible systems with any plugins
              </li>
              <li>
                <strong>Advanced Error Handling</strong> - Handle any error type gracefully
              </li>
              <li>
                <strong>State Management</strong> - Manage any state structure dynamically
              </li>
              <li>
                <strong>Performance Optimization</strong> - Optimize any type operations
              </li>
            </ul>
          </div>
        </div>

      {/* Introduction */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Advanced Any Type Techniques</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          In this session, we'll explore advanced patterns for working with `any` types in complex scenarios. 
          These techniques are particularly useful for building highly dynamic, plugin-based systems and 
          handling complex data transformations where exact types are unknown at compile time.
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">🔧 Advanced Patterns</h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1">
            <li>• <strong>Type Guards</strong>: Runtime type validation for any values</li>
            <li>• <strong>Factory Patterns</strong>: Create any object type from configuration</li>
            <li>• <strong>Proxy Objects</strong>: Intercept any property access dynamically</li>
            <li>• <strong>Memoization</strong>: Cache any computation result efficiently</li>
          </ul>
        </div>
      </div>

      {/* Complex Data Transformations */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Complex Data Transformation Engine</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Build a powerful data transformation engine that can process any input data structure 
          and transform it to any desired output format using configurable transformation rules.
        </p>

        <CodeBlock
          code={`import React, { useState, useMemo } from 'react';

// Transformation engine that handles any data type
interface TransformationRule {
  name: any;
  condition: (data: any) => any;
  transform: (data: any, context: any) => any;
  priority: any;
  metadata: any;
}

export class DataTransformationEngine {
  private rules: any[] = [];
  private cache: any = new Map();
  private stats: any = {
    transformations: 0,
    cacheHits: 0,
    errors: 0
  };

  // Add transformation rule
  addRule(rule: TransformationRule): any {
    this.rules.push({
      ...rule,
      id: Date.now() + Math.random(),
      created: new Date().toISOString()
    });
    
    // Sort by priority (higher first)
    this.rules.sort((a: any, b: any) => (b.priority || 0) - (a.priority || 0));
    return this;
  }

  // Remove rule by ID or condition
  removeRule(identifier: any): any {
    if (typeof identifier === 'function') {
      this.rules = this.rules.filter((rule: any) => !identifier(rule));
    } else {
      this.rules = this.rules.filter((rule: any) => rule.id !== identifier);
    }
    return this;
  }

  // Transform any data using applicable rules
  transform(data: any, context: any = {}): any {
    const cacheKey: any = JSON.stringify({ data, context, rules: this.rules.length });
    
    // Check cache first
    if (this.cache.has(cacheKey)) {
      this.stats.cacheHits++;
      return this.cache.get(cacheKey);
    }

    try {
      let result: any = data;
      const appliedRules: any[] = [];

      // Apply transformation rules in priority order
      for (const rule of this.rules) {
        try {
          if (rule.condition(result)) {
            const transformed: any = rule.transform(result, {
              ...context,
              appliedRules,
              originalData: data,
              currentData: result
            });
            
            appliedRules.push({
              name: rule.name,
              applied: new Date().toISOString(),
              input: result,
              output: transformed
            });
            
            result = transformed;
          }
        } catch (error: any) {
          console.error(\`Transformation rule '\${rule.name}' failed:\`, error);
          this.stats.errors++;
        }
      }

      const finalResult: any = {
        data: result,
        metadata: {
          originalData: data,
          appliedRules,
          transformationId: Date.now(),
          timestamp: new Date().toISOString()
        }
      };

      // Cache result
      this.cache.set(cacheKey, finalResult);
      this.stats.transformations++;

      return finalResult;
    } catch (error: any) {
      console.error('Transformation engine error:', error);
      this.stats.errors++;
      return {
        data,
        error: error.message,
        metadata: { failed: true, timestamp: new Date().toISOString() }
      };
    }
  }

  // Batch transform multiple data items
  transformBatch(dataArray: any[], context: any = {}): any[] {
    return dataArray.map((data: any, index: any) => 
      this.transform(data, { ...context, batchIndex: index })
    );
  }

  // Get transformation statistics
  getStats(): any {
    return {
      ...this.stats,
      cacheSize: this.cache.size,
      rulesCount: this.rules.length,
      hitRate: this.stats.cacheHits / Math.max(this.stats.transformations, 1)
    };
  }

  // Clear cache and reset stats
  clearCache(): any {
    this.cache.clear();
    this.stats = { transformations: 0, cacheHits: 0, errors: 0 };
    return this;
  }

  // Get all rules
  getRules(): any[] {
    return [...this.rules];
  }
}

// Predefined transformation rules
export const commonTransformationRules: any = {
  // String transformations
  uppercaseStrings: {
    name: 'Uppercase Strings',
    condition: (data: any) => typeof data === 'string',
    transform: (data: any) => data.toUpperCase(),
    priority: 1,
    metadata: { category: 'string', safe: true }
  },

  // Number transformations
  roundNumbers: {
    name: 'Round Numbers',
    condition: (data: any) => typeof data === 'number' && !Number.isInteger(data),
    transform: (data: any, context: any) => {
      const precision: any = context.precision || 2;
      return Math.round(data * Math.pow(10, precision)) / Math.pow(10, precision);
    },
    priority: 2,
    metadata: { category: 'number', configurable: true }
  },

  // Array transformations
  sortArrays: {
    name: 'Sort Arrays',
    condition: (data: any) => Array.isArray(data) && data.length > 1,
    transform: (data: any, context: any) => {
      if (context.sortOrder === 'desc') {
        return [...data].sort((a: any, b: any) => b > a ? 1 : -1);
      }
      return [...data].sort((a: any, b: any) => a > b ? 1 : -1);
    },
    priority: 3,
    metadata: { category: 'array', modifies: 'order' }
  },

  // Object transformations
  flattenObjects: {
    name: 'Flatten Objects',
    condition: (data: any) => typeof data === 'object' && data !== null && !Array.isArray(data),
    transform: (data: any, context: any) => {
      const flatten = (obj: any, prefix: any = ''): any => {
        const result: any = {};
        for (const [key, value] of Object.entries(obj)) {
          const newKey: any = prefix ? \`\${prefix}.\${key}\` : key;
          if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            Object.assign(result, flatten(value, newKey));
          } else {
            result[newKey] = value;
          }
        }
        return result;
      };
      return context.flatten ? flatten(data) : data;
    },
    priority: 4,
    metadata: { category: 'object', restructures: true }
  },

  // Date transformations
  formatDates: {
    name: 'Format Dates',
    condition: (data: any) => data instanceof Date || 
      (typeof data === 'string' && !isNaN(Date.parse(data))),
    transform: (data: any, context: any) => {
      const date: any = data instanceof Date ? data : new Date(data);
      const format: any = context.dateFormat || 'ISO';
      
      switch (format) {
        case 'ISO':
          return date.toISOString();
        case 'local':
          return date.toLocaleDateString();
        case 'timestamp':
          return date.getTime();
        default:
          return date.toString();
      }
    },
    priority: 5,
    metadata: { category: 'date', formats: ['ISO', 'local', 'timestamp'] }
  }
};

// React component for transformation engine demo
export function DataTransformationDemo() {
  const [engine] = useState(() => new DataTransformationEngine());
  const [inputData, setInputData] = useState<any>('');
  const [transformationContext, setTransformationContext] = useState<any>('{}');
  const [results, setResults] = useState<any[]>([]);
  const [activeRules, setActiveRules] = useState<any>({});

  // Initialize engine with common rules
  React.useEffect(() => {
    Object.values(commonTransformationRules).forEach((rule: any) => {
      engine.addRule(rule);
    });
  }, [engine]);

  const performTransformation = () => {
    try {
      const data: any = JSON.parse(inputData);
      const context: any = JSON.parse(transformationContext);
      
      const result: any = engine.transform(data, context);
      setResults(prev => [result, ...prev.slice(0, 9)]); // Keep last 10 results
    } catch (error: any) {
      alert('Invalid JSON input: ' + error.message);
    }
  };

  const toggleRule = (ruleName: any) => {
    setActiveRules((prev: any) => ({
      ...prev,
      [ruleName]: !prev[ruleName]
    }));

    const rule: any = Object.values(commonTransformationRules)
      .find((r: any) => r.name === ruleName);
    
    if (activeRules[ruleName]) {
      engine.removeRule((r: any) => r.name === ruleName);
    } else if (rule) {
      engine.addRule(rule);
    }
  };

  const stats: any = engine.getStats();

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="bg-white p-6 border rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Data Transformation Input</h3>
        
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Input Data (JSON):</label>
            <textarea
              value={inputData}
              onChange={(e: any) => setInputData(e.target.value)}
              placeholder='{"name": "test", "value": 3.14159, "items": [3, 1, 2], "date": "2024-01-01"}'
              className="w-full p-2 border rounded h-32"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Transformation Context (JSON):</label>
            <textarea
              value={transformationContext}
              onChange={(e: any) => setTransformationContext(e.target.value)}
              placeholder='{"precision": 2, "sortOrder": "asc", "flatten": true, "dateFormat": "ISO"}'
              className="w-full p-2 border rounded h-32"
            />
          </div>
        </div>

        <button
          onClick={performTransformation}
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Transform Data
        </button>
      </div>

      {/* Rules Control */}
      <div className="bg-white p-6 border rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Transformation Rules</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {Object.entries(commonTransformationRules).map(([key, rule]: [any, any]) => (
            <div key={key} className="flex items-center justify-between p-3 border rounded">
              <div>
                <div className="font-medium">{rule.name}</div>
                <div className="text-sm text-gray-600">
                  Priority: {rule.priority} | Category: {rule.metadata.category}
                </div>
              </div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={!activeRules[rule.name]}
                  onChange={() => toggleRule(rule.name)}
                  className="mr-2"
                />
                <span className="text-sm">Active</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics */}
      <div className="bg-white p-6 border rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Engine Statistics</h3>
        <div className="grid md:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-blue-50 rounded">
            <div className="text-2xl font-bold text-blue-600">{stats.transformations}</div>
            <div className="text-sm text-blue-800">Transformations</div>
          </div>
          <div className="p-4 bg-green-50 rounded">
            <div className="text-2xl font-bold text-green-600">{stats.cacheHits}</div>
            <div className="text-sm text-green-800">Cache Hits</div>
          </div>
          <div className="p-4 bg-purple-50 rounded">
            <div className="text-2xl font-bold text-purple-600">{stats.rulesCount}</div>
            <div className="text-sm text-purple-800">Active Rules</div>
          </div>
          <div className="p-4 bg-orange-50 rounded">
            <div className="text-2xl font-bold text-orange-600">
              {Math.round(stats.hitRate * 100)}%
            </div>
            <div className="text-sm text-orange-800">Cache Hit Rate</div>
          </div>
        </div>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="bg-white p-6 border rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Transformation Results</h3>
            <button
              onClick={() => setResults([])}
              className="text-sm px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Clear Results
            </button>
          </div>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {results.map((result: any, index: any) => (
              <div key={index} className="border rounded p-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Transformed Data:</h4>
                    <pre className="text-sm bg-gray-100 p-3 rounded overflow-auto">
                      {JSON.stringify(result.data, null, 2)}
                    </pre>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Applied Rules:</h4>
                    <div className="text-sm space-y-1">
                      {result.metadata.appliedRules.map((rule: any, rIndex: any) => (
                        <div key={rIndex} className="p-2 bg-blue-50 rounded">
                          <strong>{rule.name}</strong>
                          <div className="text-xs text-gray-600">{rule.applied}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}`}
          language="tsx"
          filename="components/DataTransformationEngine.tsx"
          title="Advanced Data Transformation Engine"
        />

        <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800 mt-4">
          <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">✅ What's New in This Example</h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
            <li>• <strong>Rule-Based Engine</strong> - Configurable transformation rules for any data</li>
            <li>• <strong>Priority System</strong> - Rules execute in priority order</li>
            <li>• <strong>Caching Layer</strong> - Performance optimization for repeated transformations</li>
            <li>• <strong>Batch Processing</strong> - Transform multiple data items efficiently</li>
            <li>• <strong>Context Support</strong> - Pass any configuration to transformation rules</li>
          </ul>
        </div>
      </div>

      {/* Dynamic Component Generation */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Dynamic Component Generation System</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Create a system that can generate any React component dynamically from configuration objects, 
          perfect for building flexible dashboard systems, form builders, or content management interfaces.
        </p>

        <CodeBlock
          code={`import React, { useState, useMemo, createElement } from 'react';

// Component registry for dynamic generation
interface ComponentDefinition {
  type: any;
  props: any;
  children: any;
  style: any;
  events: any;
  conditions: any;
  metadata: any;
}

export class ComponentGenerator {
  private componentRegistry: any = new Map();
  private themeRegistry: any = new Map();
  private validationRules: any = new Map();

  // Register a component type
  registerComponent(
    name: any, 
    component: any, 
    defaultProps: any = {}, 
    validation: any = null
  ): any {
    this.componentRegistry.set(name, {
      component,
      defaultProps,
      validation,
      registered: new Date().toISOString()
    });
    return this;
  }

  // Register a theme
  registerTheme(name: any, theme: any): any {
    this.themeRegistry.set(name, theme);
    return this;
  }

  // Validate component definition
  validateDefinition(definition: ComponentDefinition): any {
    const errors: any[] = [];
    
    if (!definition.type) {
      errors.push('Component type is required');
    }
    
    if (!this.componentRegistry.has(definition.type)) {
      errors.push(\`Unknown component type: \${definition.type}\`);
    }

    const componentInfo: any = this.componentRegistry.get(definition.type);
    if (componentInfo?.validation) {
      try {
        const validationResult: any = componentInfo.validation(definition);
        if (validationResult !== true) {
          errors.push(...(Array.isArray(validationResult) ? validationResult : [validationResult]));
        }
      } catch (error: any) {
        errors.push(\`Validation error: \${error.message}\`);
      }
    }

    return errors.length === 0 ? true : errors;
  }

  // Generate component from definition
  generateComponent(definition: ComponentDefinition, context: any = {}): any {
    try {
      // Validate definition
      const validation: any = this.validateDefinition(definition);
      if (validation !== true) {
        console.warn('Component validation failed:', validation);
        return createElement('div', 
          { className: 'text-red-500 p-2 border border-red-300 rounded' },
          \`Validation Error: \${validation.join(', ')}\`
        );
      }

      const componentInfo: any = this.componentRegistry.get(definition.type);
      if (!componentInfo) {
        return createElement('div', 
          { className: 'text-red-500' },
          \`Unknown component: \${definition.type}\`
        );
      }

      // Check conditions
      if (definition.conditions) {
        const shouldRender: any = this.evaluateConditions(definition.conditions, context);
        if (!shouldRender) {
          return null;
        }
      }

      // Merge props
      const props: any = {
        ...componentInfo.defaultProps,
        ...definition.props,
        key: definition.metadata?.id || Math.random(),
        style: {
          ...componentInfo.defaultProps?.style,
          ...definition.style
        }
      };

      // Add event handlers
      if (definition.events) {
        Object.entries(definition.events).forEach(([eventName, handler]: [any, any]) => {
          props[eventName] = (...args: any[]) => {
            try {
              if (typeof handler === 'function') {
                handler(...args, { context, definition });
              } else if (typeof handler === 'string') {
                // Execute handler string as function
                const fn: any = new Function('event', 'context', 'definition', handler);
                fn(...args, context, definition);
              }
            } catch (error: any) {
              console.error('Event handler error:', error);
            }
          };
        });
      }

      // Generate children
      let children: any = null;
      if (definition.children) {
        if (Array.isArray(definition.children)) {
          children = definition.children.map((child: any, index: any) => {
            if (typeof child === 'object' && child.type) {
              return this.generateComponent(child, { ...context, parentIndex: index });
            }
            return child;
          });
        } else if (typeof definition.children === 'object' && definition.children.type) {
          children = this.generateComponent(definition.children, context);
        } else {
          children = definition.children;
        }
      }

      return createElement(componentInfo.component, props, children);
    } catch (error: any) {
      console.error('Component generation error:', error);
      return createElement('div', 
        { className: 'text-red-500 p-2 border border-red-300 rounded' },
        \`Generation Error: \${error.message}\`
      );
    }
  }

  // Generate multiple components
  generateComponents(definitions: any[], context: any = {}): any[] {
    return definitions.map((def: any, index: any) => 
      this.generateComponent(def, { ...context, index })
    );
  }

  // Evaluate conditions
  private evaluateConditions(conditions: any, context: any): any {
    try {
      if (typeof conditions === 'function') {
        return conditions(context);
      }
      
      if (typeof conditions === 'object') {
        // Support for complex condition objects
        for (const [key, value] of Object.entries(conditions)) {
          switch (key) {
            case 'and':
              return Array.isArray(value) && value.every((cond: any) => 
                this.evaluateConditions(cond, context)
              );
            case 'or':
              return Array.isArray(value) && value.some((cond: any) => 
                this.evaluateConditions(cond, context)
              );
            case 'not':
              return !this.evaluateConditions(value, context);
            case 'equals':
              return context[value.key] === value.value;
            case 'contains':
              return String(context[value.key] || '').includes(value.value);
            default:
              return context[key] === value;
          }
        }
      }
      
      return Boolean(conditions);
    } catch (error: any) {
      console.error('Condition evaluation error:', error);
      return false;
    }
  }

  // Get registered components
  getRegisteredComponents(): any[] {
    return Array.from(this.componentRegistry.keys());
  }

  // Clear registry
  clear(): any {
    this.componentRegistry.clear();
    this.themeRegistry.clear();
    this.validationRules.clear();
    return this;
  }
}

// Basic components for the registry
const BasicButton = ({ children, onClick, variant = 'primary', ...props }: any) => (
  <button
    onClick={onClick}
    className={\`px-4 py-2 rounded \${
      variant === 'primary' ? 'bg-blue-500 text-white hover:bg-blue-600' :
      variant === 'secondary' ? 'bg-gray-500 text-white hover:bg-gray-600' :
      'bg-red-500 text-white hover:bg-red-600'
    }\`}
    {...props}
  >
    {children}
  </button>
);

const BasicInput = ({ label, value, onChange, type = 'text', ...props }: any) => (
  <div className="mb-4">
    {label && <label className="block text-sm font-medium mb-1">{label}</label>}
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...props}
    />
  </div>
);

const BasicCard = ({ title, children, ...props }: any) => (
  <div className="bg-white border rounded-lg shadow-sm p-6" {...props}>
    {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
    {children}
  </div>
);

const BasicText = ({ children, variant = 'body', ...props }: any) => {
  const className: any = {
    heading: 'text-2xl font-bold mb-4',
    subheading: 'text-xl font-semibold mb-3',
    body: 'text-gray-700',
    caption: 'text-sm text-gray-500'
  }[variant] || 'text-gray-700';

  return <div className={className} {...props}>{children}</div>;
};

// Demo component
export function DynamicComponentDemo() {
  const [generator] = useState(() => {
    const gen = new ComponentGenerator();
    
    // Register components
    gen.registerComponent('button', BasicButton, { variant: 'primary' });
    gen.registerComponent('input', BasicInput, { type: 'text' });
    gen.registerComponent('card', BasicCard);
    gen.registerComponent('text', BasicText, { variant: 'body' });
    gen.registerComponent('div', 'div');
    
    return gen;
  });

  const [configInput, setConfigInput] = useState<any>(JSON.stringify([
    {
      type: 'card',
      props: { title: 'Dynamic Form' },
      metadata: { id: 'form-card' },
      children: [
        {
          type: 'text',
          props: { variant: 'subheading' },
          children: 'User Information'
        },
        {
          type: 'input',
          props: { 
            label: 'Name',
            placeholder: 'Enter your name'
          },
          events: {
            onChange: '(e) => console.log("Name changed:", e.target.value)'
          }
        },
        {
          type: 'input',
          props: { 
            label: 'Email',
            type: 'email',
            placeholder: 'Enter your email'
          }
        },
        {
          type: 'div',
          style: { display: 'flex', gap: '10px', marginTop: '16px' },
          children: [
            {
              type: 'button',
              props: { variant: 'primary' },
              children: 'Submit',
              events: {
                onClick: '() => alert("Form submitted!")'
              }
            },
            {
              type: 'button',
              props: { variant: 'secondary' },
              children: 'Cancel'
            }
          ]
        }
      ]
    }
  ], null, 2));

  const [context, setContext] = useState<any>(JSON.stringify({
    user: { role: 'admin', name: 'John' },
    theme: 'light',
    permissions: ['read', 'write']
  }, null, 2));

  const [generatedComponents, setGeneratedComponents] = useState<any[]>([]);

  const generateFromConfig = () => {
    try {
      const config: any = JSON.parse(configInput);
      const ctx: any = JSON.parse(context);
      
      const components: any = Array.isArray(config) 
        ? generator.generateComponents(config, ctx)
        : [generator.generateComponent(config, ctx)];
      
      setGeneratedComponents(components);
    } catch (error: any) {
      alert('Invalid JSON configuration: ' + error.message);
    }
  };

  const presetConfigs: any = {
    'Simple Form': {
      type: 'card',
      props: { title: 'Contact Form' },
      children: [
        { type: 'input', props: { label: 'Name', placeholder: 'Your name' } },
        { type: 'input', props: { label: 'Message', placeholder: 'Your message' } },
        { type: 'button', children: 'Send', props: { variant: 'primary' } }
      ]
    },
    'Dashboard Card': {
      type: 'card',
      props: { title: 'Statistics' },
      children: [
        { type: 'text', props: { variant: 'heading' }, children: '1,234' },
        { type: 'text', props: { variant: 'caption' }, children: 'Total Users' }
      ]
    },
    'Conditional Content': {
      type: 'div',
      conditions: { equals: { key: 'user.role', value: 'admin' } },
      children: [
        { type: 'text', props: { variant: 'heading' }, children: 'Admin Panel' },
        { type: 'button', children: 'Admin Action', props: { variant: 'primary' } }
      ]
    }
  };

  const loadPreset = (presetName: any) => {
    setConfigInput(JSON.stringify(presetConfigs[presetName], null, 2));
  };

  return (
    <div className="space-y-6">
      {/* Configuration Input */}
      <div className="bg-white p-6 border rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Component Configuration</h3>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Load Preset:</label>
          <div className="flex gap-2">
            {Object.keys(presetConfigs).map((preset: any) => (
              <button
                key={preset}
                onClick={() => loadPreset(preset)}
                className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Component Config (JSON):</label>
            <textarea
              value={configInput}
              onChange={(e: any) => setConfigInput(e.target.value)}
              className="w-full p-2 border rounded h-64 font-mono text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Context (JSON):</label>
            <textarea
              value={context}
              onChange={(e: any) => setContext(e.target.value)}
              className="w-full p-2 border rounded h-64 font-mono text-sm"
            />
          </div>
        </div>

        <button
          onClick={generateFromConfig}
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Generate Components
        </button>
      </div>

      {/* Registry Info */}
      <div className="bg-white p-6 border rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Available Components</h3>
        <div className="grid md:grid-cols-4 gap-2">
          {generator.getRegisteredComponents().map((componentName: any) => (
            <div key={componentName} className="p-2 bg-gray-100 rounded text-center">
              <code className="text-sm">{componentName}</code>
            </div>
          ))}
        </div>
      </div>

      {/* Generated Components Display */}
      {generatedComponents.length > 0 && (
        <div className="bg-white p-6 border rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Generated Components</h3>
          <div className="space-y-4">
            {generatedComponents.map((component: any, index: any) => (
              <div key={index} className="border rounded p-4">
                <div className="text-sm text-gray-600 mb-2">Component {index + 1}:</div>
                {component}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}`}
          language="tsx"
          filename="components/DynamicComponentGenerator.tsx"
          title="Dynamic Component Generation System"
        />

        <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800 mt-4">
          <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">✅ What's New in This Example</h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
            <li>• <strong>Component Registry</strong> - Register any React component dynamically</li>
            <li>• <strong>JSON-Driven UI</strong> - Generate components from configuration objects</li>
            <li>• <strong>Conditional Rendering</strong> - Show/hide components based on any condition</li>
            <li>• <strong>Event Binding</strong> - Attach any event handlers dynamically</li>
            <li>• <strong>Nested Components</strong> - Support for any component hierarchy</li>
          </ul>
        </div>
      </div>

      {/* Plugin Architecture */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Plugin Architecture System</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Build an extensible plugin system that can load and execute any type of plugin, 
          allowing for modular application architecture with dynamic feature loading.
        </p>

        <CodeBlock
          code={`import React, { useState, useEffect } from 'react';

// Plugin interface
interface Plugin {
  name: any;
  version: any;
  dependencies: any[];
  hooks: any;
  init: (context: any) => any;
  destroy?: () => any;
  metadata: any;
}

// Plugin manager class
export class PluginManager {
  private plugins: any = new Map();
  private hooks: any = new Map();
  private context: any = {};
  private eventBus: any = new EventTarget();

  // Register a plugin
  register(plugin: Plugin): any {
    try {
      // Check dependencies
      const missingDeps: any = plugin.dependencies.filter((dep: any) => 
        !this.plugins.has(dep)
      );
      
      if (missingDeps.length > 0) {
        throw new Error(\`Missing dependencies: \${missingDeps.join(', ')}\`);
      }

      // Initialize plugin
      const pluginInstance: any = {
        ...plugin,
        id: Date.now() + Math.random(),
        status: 'loading',
        loadedAt: new Date().toISOString()
      };

      this.plugins.set(plugin.name, pluginInstance);

      // Register hooks
      if (plugin.hooks) {
        Object.entries(plugin.hooks).forEach(([hookName, handler]: [any, any]) => {
          this.addHook(hookName, handler, plugin.name);
        });
      }

      // Initialize plugin
      if (plugin.init) {
        const initResult: any = plugin.init({
          ...this.context,
          pluginManager: this,
          emit: (event: any, data: any) => this.emit(event, data),
          hooks: this.hooks
        });
        
        pluginInstance.initResult = initResult;
      }

      pluginInstance.status = 'loaded';
      this.emit('plugin:loaded', { plugin: pluginInstance });
      
      return pluginInstance;
    } catch (error: any) {
      console.error(\`Failed to register plugin \${plugin.name}:\`, error);
      this.emit('plugin:error', { plugin, error });
      throw error;
    }
  }

  // Unregister a plugin
  unregister(pluginName: any): any {
    const plugin: any = this.plugins.get(pluginName);
    if (!plugin) return false;

    try {
      // Call destroy method if available
      if (plugin.destroy) {
        plugin.destroy();
      }

      // Remove hooks
      this.hooks.forEach((handlers: any, hookName: any) => {
        this.hooks.set(hookName, handlers.filter((h: any) => h.pluginName !== pluginName));
      });

      this.plugins.delete(pluginName);
      this.emit('plugin:unloaded', { plugin });
      
      return true;
    } catch (error: any) {
      console.error(\`Failed to unregister plugin \${pluginName}:\`, error);
      return false;
    }
  }

  // Add hook
  addHook(hookName: any, handler: any, pluginName: any = 'system'): any {
    if (!this.hooks.has(hookName)) {
      this.hooks.set(hookName, []);
    }
    
    this.hooks.get(hookName).push({
      handler,
      pluginName,
      registered: new Date().toISOString()
    });
  }

  // Execute hook
  executeHook(hookName: any, ...args: any[]): any {
    const handlers: any = this.hooks.get(hookName) || [];
    const results: any = [];

    for (const { handler, pluginName } of handlers) {
      try {
        const result: any = handler(...args);
        results.push({ pluginName, result });
      } catch (error: any) {
        console.error(\`Hook \${hookName} failed for plugin \${pluginName}:\`, error);
        results.push({ pluginName, error });
      }
    }

    return results;
  }

  // Set global context
  setContext(key: any, value: any): any {
    this.context[key] = value;
    this.emit('context:updated', { key, value });
  }

  // Get global context
  getContext(key?: any): any {
    return key ? this.context[key] : this.context;
  }

  // Event system
  emit(event: any, data: any): any {
    this.eventBus.dispatchEvent(new CustomEvent(event, { detail: data }));
  }

  on(event: any, handler: any): any {
    this.eventBus.addEventListener(event, handler);
    return () => this.eventBus.removeEventListener(event, handler);
  }

  // Get all plugins
  getPlugins(): any[] {
    return Array.from(this.plugins.values());
  }

  // Get plugin by name
  getPlugin(name: any): any {
    return this.plugins.get(name);
  }

  // Check if plugin is loaded
  isLoaded(name: any): any {
    const plugin: any = this.plugins.get(name);
    return plugin && plugin.status === 'loaded';
  }

  // Clear all plugins
  clear(): any {
    this.plugins.forEach((plugin: any) => {
      if (plugin.destroy) {
        try { plugin.destroy(); } catch (e: any) {}
      }
    });
    
    this.plugins.clear();
    this.hooks.clear();
    this.context = {};
  }
}

// Example plugins
const themePlugin: Plugin = {
  name: 'theme',
  version: '1.0.0',
  dependencies: [],
  metadata: { category: 'ui', author: 'System' },
  hooks: {
    'app:render': (appData: any) => {
      return {
        ...appData,
        theme: appData.theme || 'light'
      };
    }
  },
  init: (context: any) => {
    context.setContext('currentTheme', 'light');
    
    return {
      setTheme: (theme: any) => {
        context.setContext('currentTheme', theme);
        context.emit('theme:changed', { theme });
      },
      getTheme: () => context.getContext('currentTheme')
    };
  }
};

const analyticsPlugin: Plugin = {
  name: 'analytics',
  version: '1.0.0',
  dependencies: [],
  metadata: { category: 'tracking', author: 'System' },
  hooks: {
    'user:action': (action: any) => {
      console.log('Analytics: User action tracked:', action);
      return { tracked: true, timestamp: new Date().toISOString() };
    }
  },
  init: (context: any) => {
    const events: any[] = [];
    
    return {
      track: (event: any, data: any) => {
        const eventData: any = {
          event,
          data,
          timestamp: new Date().toISOString(),
          id: Date.now() + Math.random()
        };
        events.push(eventData);
        context.emit('analytics:event', eventData);
        return eventData;
      },
      getEvents: () => [...events],
      clearEvents: () => events.length = 0
    };
  }
};

const validationPlugin: Plugin = {
  name: 'validation',
  version: '1.0.0',
  dependencies: [],
  metadata: { category: 'utility', author: 'System' },
  hooks: {
    'form:validate': (formData: any) => {
      const errors: any = {};
      
      Object.entries(formData).forEach(([key, value]: [any, any]) => {
        if (!value || String(value).trim() === '') {
          errors[key] = 'This field is required';
        }
      });
      
      return { valid: Object.keys(errors).length === 0, errors };
    }
  },
  init: (context: any) => ({
    validateEmail: (email: any) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email),
    validatePhone: (phone: any) => /^[\\d\\-\\+\\(\\)\\s]+$/.test(phone),
    validateRequired: (value: any) => value && String(value).trim() !== ''
  })
};

// Demo component
export function PluginSystemDemo() {
  const [pluginManager] = useState(() => new PluginManager());
  const [plugins, setPlugins] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [context, setContext] = useState<any>({});

  // Available plugins
  const availablePlugins: any = {
    theme: themePlugin,
    analytics: analyticsPlugin,
    validation: validationPlugin
  };

  useEffect(() => {
    // Listen to plugin events
    const unsubscribes: any[] = [
      pluginManager.on('plugin:loaded', (e: any) => {
        addLog('Plugin loaded: ' + e.detail.plugin.name);
        updateState();
      }),
      pluginManager.on('plugin:unloaded', (e: any) => {
        addLog('Plugin unloaded: ' + e.detail.plugin.name);
        updateState();
      }),
      pluginManager.on('plugin:error', (e: any) => {
        addLog('Plugin error: ' + e.detail.error.message);
      }),
      pluginManager.on('context:updated', (e: any) => {
        addLog(\`Context updated: \${e.detail.key} = \${e.detail.value}\`);
        updateState();
      }),
      pluginManager.on('theme:changed', (e: any) => {
        addLog('Theme changed to: ' + e.detail.theme);
      }),
      pluginManager.on('analytics:event', (e: any) => {
        addLog(\`Analytics event: \${e.detail.event}\`);
      })
    ];

    return () => unsubscribes.forEach(unsub => unsub());
  }, [pluginManager]);

  const addLog = (message: any) => {
    setLogs(prev => [
      { message, timestamp: new Date().toISOString() },
      ...prev.slice(0, 19)
    ]);
  };

  const updateState = () => {
    setPlugins(pluginManager.getPlugins());
    setContext(pluginManager.getContext());
  };

  const loadPlugin = (pluginName: any) => {
    try {
      pluginManager.register(availablePlugins[pluginName]);
      updateState();
    } catch (error: any) {
      addLog('Failed to load plugin: ' + error.message);
    }
  };

  const unloadPlugin = (pluginName: any) => {
    pluginManager.unregister(pluginName);
    updateState();
  };

  const testHook = (hookName: any) => {
    const testData: any = {
      'app:render': { title: 'Test App', version: '1.0.0' },
      'user:action': { action: 'click', element: 'button' },
      'form:validate': { name: '', email: 'test@example.com' }
    };

    const results: any = pluginManager.executeHook(hookName, testData[hookName]);
    addLog(\`Hook \${hookName} executed with \${results.length} handlers\`);
    console.log('Hook results:', results);
  };

  const testPluginFunction = (pluginName: any, functionName: any) => {
    const plugin: any = pluginManager.getPlugin(pluginName);
    if (plugin?.initResult?.[functionName]) {
      try {
        const result: any = plugin.initResult[functionName]('test-data');
        addLog(\`Called \${pluginName}.\${functionName}(): \${JSON.stringify(result)}\`);
      } catch (error: any) {
        addLog(\`Error calling \${pluginName}.\${functionName}(): \${error.message}\`);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Plugin Management */}
      <div className="bg-white p-6 border rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Plugin Management</h3>
        
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          {Object.keys(availablePlugins).map((pluginName: any) => (
            <div key={pluginName} className="border rounded p-4">
              <div className="font-medium mb-2">{pluginName}</div>
              <div className="text-sm text-gray-600 mb-3">
                v{availablePlugins[pluginName].version}
              </div>
              <div className="space-y-2">
                {pluginManager.isLoaded(pluginName) ? (
                  <button
                    onClick={() => unloadPlugin(pluginName)}
                    className="w-full px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Unload
                  </button>
                ) : (
                  <button
                    onClick={() => loadPlugin(pluginName)}
                    className="w-full px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Load
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hook Testing */}
      <div className="bg-white p-6 border rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Hook System Testing</h3>
        <div className="grid md:grid-cols-3 gap-2">
          {['app:render', 'user:action', 'form:validate'].map((hookName: any) => (
            <button
              key={hookName}
              onClick={() => testHook(hookName)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
            >
              Test {hookName}
            </button>
          ))}
        </div>
      </div>

      {/* Plugin Functions */}
      {plugins.length > 0 && (
        <div className="bg-white p-6 border rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Plugin Functions</h3>
          <div className="space-y-4">
            {plugins.map((plugin: any) => (
              <div key={plugin.name} className="border rounded p-3">
                <div className="font-medium mb-2">{plugin.name}</div>
                <div className="flex gap-2 flex-wrap">
                  {plugin.initResult && Object.keys(plugin.initResult).map((funcName: any) => (
                    <button
                      key={funcName}
                      onClick={() => testPluginFunction(plugin.name, funcName)}
                      className="px-2 py-1 text-xs bg-purple-500 text-white rounded hover:bg-purple-600"
                    >
                      {funcName}()
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Global Context */}
      <div className="bg-white p-6 border rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Global Context</h3>
        <pre className="text-sm bg-gray-100 p-3 rounded">
          {JSON.stringify(context, null, 2) || 'Empty context'}
        </pre>
      </div>

      {/* Event Log */}
      <div className="bg-white p-6 border rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Event Log</h3>
          <button
            onClick={() => setLogs([])}
            className="text-sm px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Clear Log
          </button>
        </div>
        <div className="space-y-1 max-h-64 overflow-y-auto">
          {logs.map((log: any, index: any) => (
            <div key={index} className="text-sm p-2 bg-gray-50 rounded">
              <span className="text-gray-500 text-xs">{log.timestamp}</span>
              <span className="ml-2">{log.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`}
          language="tsx"
          filename="components/PluginSystem.tsx"
          title="Extensible Plugin Architecture"
        />

        <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800 mt-4">
          <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">✅ What's New in This Example</h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
            <li>• <strong>Plugin Registry</strong> - Load and unload any plugin dynamically</li>
            <li>• <strong>Hook System</strong> - Execute any callback at defined points</li>
            <li>• <strong>Dependency Management</strong> - Handle plugin dependencies automatically</li>
            <li>• <strong>Event Bus</strong> - Communication between any plugins</li>
            <li>• <strong>Global Context</strong> - Share any data across all plugins</li>
          </ul>
        </div>
      </div>

      {/* Best Practices for Advanced Patterns */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Advanced Any Type Best Practices</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">🏗️ Architecture Patterns</h4>
            <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1">
              <li>• Use factory patterns for any object creation</li>
              <li>• Implement type guards for runtime safety</li>
              <li>• Cache transformed data for performance</li>
              <li>• Use proxy objects for dynamic property access</li>
              <li>• Implement plugin systems for extensibility</li>
            </ul>
          </div>
          
          <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3">⚡ Performance Tips</h4>
            <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
              <li>• Memoize expensive any type operations</li>
              <li>• Use WeakMap for object-specific caching</li>
              <li>• Batch transformations when possible</li>
              <li>• Implement lazy evaluation for heavy computations</li>
              <li>• Profile and optimize hot paths</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Hands-On Exercise */}
      <div className="bg-orange-50 dark:bg-orange-950/20 p-6 rounded-xl border border-orange-200 dark:border-orange-800">
        <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-4">
          🎯 Hands-On Exercise: Build a Data Pipeline
        </h3>
        
        <div className="text-orange-800 dark:text-orange-200 space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Challenge: Create a Data Processing Pipeline</h4>
            <p className="text-sm">
              Build a flexible data processing pipeline that can transform any data through any sequence of operations.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Requirements:</h4>
            <ul className="text-sm space-y-1">
              <li>• Accept any input data format (JSON, CSV, XML, etc.)</li>
              <li>• Support any transformation operations (filter, map, reduce, sort)</li>
              <li>• Handle any error scenarios gracefully</li>
              <li>• Output to any format desired</li>
              <li>• Allow plugin-based operation extensions</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Bonus Features:</h4>
            <ul className="text-sm space-y-1">
              <li>• Visual pipeline builder with drag-and-drop</li>
              <li>• Real-time data processing and streaming</li>
              <li>• Performance monitoring and optimization</li>
              <li>• Pipeline versioning and rollback</li>
              <li>• Integration with any external data sources</li>
            </ul>
          </div>
        </div>
      </div>

        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            🎉 Session 2 Complete!
          </h4>
          <p className="text-green-700 dark:text-green-300 mb-3">
            You've mastered advanced any type patterns including data transformation engines, dynamic component generation, 
            and plugin architectures. These patterns enable building highly flexible and extensible applications.
          </p>
          <p className="text-green-700 dark:text-green-300 mb-0">
            <strong>Next:</strong> Session 3 will explore real-world applications of any types, including integration with 
            third-party APIs, building CMS systems, and handling complex legacy code migrations.
          </p>
        </div>
    </div>
  );
}