import { CodeBlock } from "@/components/ui/code-block-new";

export function Day4Session3Content() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Real-World Any Type Applications - Session 3
          </h1>

          <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-8">
            <h3 className="text-blue-800 dark:text-blue-200 font-semibold mb-4 mt-0">
              🌍 Session Overview
            </h3>
            <ul className="text-blue-700 dark:text-blue-300 space-y-2 mb-0">
              <li>
                <strong>Third-Party API Integration</strong> - Handle unknown API responses with any types
              </li>
              <li>
                <strong>Content Management Systems</strong> - Build flexible CMS with dynamic content types
              </li>
              <li>
                <strong>Legacy Code Migration</strong> - Gradually migrate JavaScript to TypeScript
              </li>
              <li>
                <strong>Runtime Configuration</strong> - Handle dynamic configuration with any types
              </li>
              <li>
                <strong>Plugin Architecture</strong> - Build extensible systems with any type interfaces
              </li>
              <li>
                <strong>Real-World Scenarios</strong> - Practical applications in production environments
              </li>
            </ul>
          </div>
        </div>

      {/* Introduction */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Real-World Any Type Usage</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          In production applications, any types serve as bridges between unknown external data, legacy systems, 
          and dynamic content. They provide flexibility when dealing with uncertain data structures while maintaining 
          development velocity.
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">🌍 Production Scenarios</h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1">
            <li>• <strong>API Integrations</strong>: Handle varying response structures from external services</li>
            <li>• <strong>CMS Systems</strong>: Manage dynamic content with unknown field structures</li>
            <li>• <strong>Legacy Migration</strong>: Gradually type JavaScript codebases</li>
            <li>• <strong>Configuration Systems</strong>: Handle runtime configuration with flexible schemas</li>
          </ul>
        </div>
      </div>

      {/* Example 1: Third-Party API Integration */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Example 1: Third-Party API Integration Hub</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Let's build a comprehensive API integration system that handles multiple third-party services with unknown response structures.
        </p>

        <CodeBlock
          code={`// services/ApiIntegrationHub.ts
// Comprehensive third-party API integration system

export class ApiIntegrationHub {
  private integrations: any = new Map();
  private cache: any = new Map();
  private rateLimiter: any = new Map();
  private transformers: any = new Map();

  constructor() {
    this.setupDefaultIntegrations();
    this.setupRateLimiting();
  }

  // Register a new API integration
  registerIntegration(name: string, config: any): void {
    this.integrations.set(name, {
      baseUrl: config.baseUrl,
      apiKey: config.apiKey,
      headers: config.headers || {},
      timeout: config.timeout || 5000,
      retryCount: config.retryCount || 3,
      transformer: config.transformer || ((data: any) => data),
      validator: config.validator || (() => true),
      rateLimitConfig: config.rateLimitConfig || { max: 100, window: 60000 }
    });

    // Setup rate limiting for this integration
    this.rateLimiter.set(name, {
      requests: [],
      config: config.rateLimitConfig || { max: 100, window: 60000 }
    });

    console.log(\`✅ Registered integration: \${name}\`);
  }

  // Universal API caller with any type support
  async call(integrationName: string, endpoint: string, options: any = {}): Promise<any> {
    const integration = this.integrations.get(integrationName);
    if (!integration) {
      throw new Error(\`Integration '\${integrationName}' not found\`);
    }

    // Check rate limiting
    if (!this.checkRateLimit(integrationName)) {
      throw new Error(\`Rate limit exceeded for \${integrationName}\`);
    }

    // Generate cache key
    const cacheKey = \`\${integrationName}:\${endpoint}:\${JSON.stringify(options)}\`;
    
    // Check cache first
    if (options.useCache !== false && this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < (options.cacheTTL || 300000)) {
        console.log(\`📦 Cache hit for \${integrationName}\`);
        return cached.data;
      }
    }

    try {
      // Prepare request
      const url = \`\${integration.baseUrl}\${endpoint}\`;
      const requestOptions: any = {
        method: options.method || 'GET',
        headers: {
          ...integration.headers,
          ...options.headers
        },
        timeout: options.timeout || integration.timeout
      };

      // Add body for POST/PUT requests
      if (options.data) {
        requestOptions.body = JSON.stringify(options.data);
        requestOptions.headers['Content-Type'] = 'application/json';
      }

      // Make the request with retry logic
      let response: any;
      let lastError: any;

      for (let attempt = 0; attempt <= integration.retryCount; attempt++) {
        try {
          response = await this.makeRequest(url, requestOptions);
          break;
        } catch (error) {
          lastError = error;
          if (attempt < integration.retryCount) {
            const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
            console.log(\`⏳ Retrying \${integrationName} in \${delay}ms (attempt \${attempt + 1})\`);
            await this.sleep(delay);
          }
        }
      }

      if (!response) {
        throw lastError;
      }

      // Parse response
      let data: any;
      const contentType = response.headers?.get?.('content-type') || '';
      
      if (contentType.includes('application/json')) {
        data = await response.json();
      } else if (contentType.includes('text/')) {
        data = await response.text();
      } else {
        data = await response.arrayBuffer();
      }

      // Validate response
      if (!integration.validator(data)) {
        throw new Error(\`Invalid response from \${integrationName}\`);
      }

      // Transform response
      const transformedData = integration.transformer(data);

      // Cache the response
      if (options.useCache !== false) {
        this.cache.set(cacheKey, {
          data: transformedData,
          timestamp: Date.now()
        });
      }

      // Update rate limiter
      this.updateRateLimit(integrationName);

      console.log(\`✅ Successfully called \${integrationName}\${endpoint}\`);
      return transformedData;

    } catch (error: any) {
      console.error(\`❌ Error calling \${integrationName}: \${error.message}\`);
      throw error;
    }
  }

  // Setup default integrations
  private setupDefaultIntegrations(): void {
    // GitHub API integration
    this.registerIntegration('github', {
      baseUrl: 'https://api.github.com',
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'API-Integration-Hub'
      },
      transformer: (data: any) => ({
        ...data,
        _source: 'github',
        _timestamp: Date.now()
      }),
      validator: (data: any) => data && typeof data === 'object'
    });

    // Weather API integration
    this.registerIntegration('weather', {
      baseUrl: 'https://api.openweathermap.org/data/2.5',
      transformer: (data: any) => ({
        temperature: data?.main?.temp,
        description: data?.weather?.[0]?.description,
        humidity: data?.main?.humidity,
        _source: 'weather',
        _timestamp: Date.now()
      }),
      validator: (data: any) => data?.main?.temp !== undefined
    });

    // Generic REST API integration
    this.registerIntegration('generic', {
      baseUrl: '',
      transformer: (data: any) => ({
        originalData: data,
        _source: 'generic',
        _timestamp: Date.now(),
        _type: Array.isArray(data) ? 'array' : typeof data
      }),
      validator: () => true // Accept any response
    });
  }

  // Rate limiting implementation
  private checkRateLimit(integrationName: string): boolean {
    const limiter = this.rateLimiter.get(integrationName);
    if (!limiter) return true;

    const now = Date.now();
    const windowStart = now - limiter.config.window;
    
    // Remove old requests
    limiter.requests = limiter.requests.filter((time: number) => time > windowStart);
    
    return limiter.requests.length < limiter.config.max;
  }

  private updateRateLimit(integrationName: string): void {
    const limiter = this.rateLimiter.get(integrationName);
    if (limiter) {
      limiter.requests.push(Date.now());
    }
  }

  // Utility methods
  private async makeRequest(url: string, options: any): Promise<any> {
    // Simulated fetch with timeout
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error('Request timeout'));
      }, options.timeout);

      // Simulate API call
      setTimeout(() => {
        clearTimeout(timeoutId);
        resolve({
          json: () => Promise.resolve({
            status: 'success',
            data: { message: 'API response data', timestamp: Date.now() },
            meta: { source: url, method: options.method }
          }),
          text: () => Promise.resolve('Text response'),
          headers: new Map([['content-type', 'application/json']])
        });
      }, Math.random() * 1000);
    });
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Advanced features
  async batchCall(requests: any[]): Promise<any[]> {
    const results = await Promise.allSettled(
      requests.map(req => this.call(req.integration, req.endpoint, req.options))
    );

    return results.map((result, index) => ({
      request: requests[index],
      success: result.status === 'fulfilled',
      data: result.status === 'fulfilled' ? result.value : null,
      error: result.status === 'rejected' ? result.reason : null
    }));
  }

  // Get integration statistics
  getStats(): any {
    const stats: any = {
      integrations: this.integrations.size,
      cachedEntries: this.cache.size,
      rateLimitStatus: {}
    };

    for (const [name, limiter] of this.rateLimiter.entries()) {
      const now = Date.now();
      const windowStart = now - limiter.config.window;
      const recentRequests = limiter.requests.filter((time: number) => time > windowStart);
      
      stats.rateLimitStatus[name] = {
        currentRequests: recentRequests.length,
        maxRequests: limiter.config.max,
        remaining: limiter.config.max - recentRequests.length,
        resetTime: windowStart + limiter.config.window
      };
    }

    return stats;
  }
}

// Usage example in React component
export function ApiIntegrationDemo() {
  const [hub] = useState(() => new ApiIntegrationHub());
  const [responses, setResponses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleApiTest = async () => {
    setLoading(true);
    try {
      // Test multiple API calls
      const results = await hub.batchCall([
        {
          integration: 'github',
          endpoint: '/user',
          options: { useCache: true }
        },
        {
          integration: 'weather',
          endpoint: '/weather',
          options: { 
            data: { q: 'London', appid: 'demo-key' },
            method: 'GET' 
          }
        },
        {
          integration: 'generic',
          endpoint: '/api/data',
          options: { useCache: false }
        }
      ]);

      setResponses(results);
    } catch (error) {
      console.error('Batch API call failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h3>API Integration Hub Demo</h3>
      
      <button
        onClick={handleApiTest}
        disabled={loading}
        style={{
          padding: '10px 20px',
          backgroundColor: loading ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: 4,
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Testing APIs...' : 'Test API Integrations'}
      </button>

      <div style={{ marginTop: 20 }}>
        <h4>Integration Statistics:</h4>
        <pre style={{ 
          backgroundColor: '#f5f5f5', 
          padding: 10, 
          borderRadius: 4,
          fontSize: 12 
        }}>
          {JSON.stringify(hub.getStats(), null, 2)}
        </pre>
      </div>

      {responses.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <h4>API Responses:</h4>
          {responses.map((response, index) => (
            <div
              key={index}
              style={{
                backgroundColor: response.success ? '#d4edda' : '#f8d7da',
                padding: 10,
                margin: '10px 0',
                borderRadius: 4,
                borderLeft: \`4px solid \${response.success ? '#28a745' : '#dc3545'}\`
              }}
            >
              <strong>{response.request.integration}</strong>
              {response.success ? (
                <pre style={{ fontSize: 11, marginTop: 5 }}>
                  {JSON.stringify(response.data, null, 2)}
                </pre>
              ) : (
                <p style={{ color: '#721c24', margin: '5px 0' }}>
                  Error: {response.error?.message}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}`}
          language="typescript"
          filename="services/ApiIntegrationHub.ts"
          title="Third-Party API Integration Hub"
        />

        <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800 mt-4">
          <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">✅ What's New in This Example</h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
            <li>• <strong>Universal API Client</strong> - Handles any third-party API with flexible configuration</li>
            <li>• <strong>Rate Limiting</strong> - Built-in rate limiting for different API providers</li>
            <li>• <strong>Caching System</strong> - Intelligent caching with TTL support</li>
            <li>• <strong>Retry Logic</strong> - Exponential backoff for failed requests</li>
            <li>• <strong>Response Transformation</strong> - Flexible data transformation for any structure</li>
          </ul>
        </div>
      </div>

      {/* Example 2: Content Management System */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Example 2: Dynamic Content Management System</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Let's create a flexible CMS that can handle any content type with dynamic fields and validation.
        </p>

        <CodeBlock
          code={`// cms/DynamicCMSEngine.ts
// Comprehensive content management system with any type support

export class DynamicCMSEngine {
  private contentTypes: any = new Map();
  private content: any = new Map();
  private validators: any = new Map();
  private renderers: any = new Map();
  private workflows: any = new Map();

  constructor() {
    this.setupDefaultContentTypes();
    this.setupDefaultValidators();
    this.setupDefaultRenderers();
  }

  // Register a new content type
  registerContentType(name: string, schema: any): void {
    this.contentTypes.set(name, {
      name,
      schema,
      fields: schema.fields || {},
      settings: schema.settings || {},
      permissions: schema.permissions || { read: true, write: true },
      hooks: schema.hooks || {},
      validation: schema.validation || {},
      created: Date.now()
    });

    console.log(\`✅ Registered content type: \${name}\`);
  }

  // Create content with dynamic validation
  async createContent(type: string, data: any, options: any = {}): Promise<any> {
    const contentType = this.contentTypes.get(type);
    if (!contentType) {
      throw new Error(\`Content type '\${type}' not found\`);
    }

    // Generate unique ID
    const id = options.id || \`\${type}_\${Date.now()}_\${Math.random().toString(36).substr(2, 9)}\`;

    // Validate content against schema
    const validationResult = await this.validateContent(type, data);
    if (!validationResult.valid) {
      throw new Error(\`Validation failed: \${validationResult.errors.join(', ')}\`);
    }

    // Execute pre-create hooks
    let processedData = data;
    if (contentType.hooks.beforeCreate) {
      processedData = await contentType.hooks.beforeCreate(data, { id, type, options });
    }

    // Create content object
    const contentItem: any = {
      id,
      type,
      data: processedData,
      metadata: {
        created: Date.now(),
        updated: Date.now(),
        version: 1,
        status: options.status || 'draft',
        author: options.author || 'system',
        tags: options.tags || [],
        slug: options.slug || this.generateSlug(processedData.title || id)
      },
      history: [{
        action: 'created',
        timestamp: Date.now(),
        author: options.author || 'system',
        changes: { initial: true }
      }]
    };

    // Store content
    if (!this.content.has(type)) {
      this.content.set(type, new Map());
    }
    this.content.get(type).set(id, contentItem);

    // Execute post-create hooks
    if (contentType.hooks.afterCreate) {
      await contentType.hooks.afterCreate(contentItem, { options });
    }

    console.log(\`✅ Created \${type} content: \${id}\`);
    return contentItem;
  }

  // Update content with versioning
  async updateContent(type: string, id: string, updates: any, options: any = {}): Promise<any> {
    const contentType = this.contentTypes.get(type);
    if (!contentType) {
      throw new Error(\`Content type '\${type}' not found\`);
    }

    const typeContent = this.content.get(type);
    if (!typeContent || !typeContent.has(id)) {
      throw new Error(\`Content '\${id}' not found\`);
    }

    const existingContent = typeContent.get(id);
    
    // Merge updates with existing data
    const updatedData = { ...existingContent.data, ...updates };

    // Validate updated content
    const validationResult = await this.validateContent(type, updatedData);
    if (!validationResult.valid) {
      throw new Error(\`Validation failed: \${validationResult.errors.join(', ')}\`);
    }

    // Execute pre-update hooks
    let processedData = updatedData;
    if (contentType.hooks.beforeUpdate) {
      processedData = await contentType.hooks.beforeUpdate(updatedData, existingContent, options);
    }

    // Update content
    const updatedContent = {
      ...existingContent,
      data: processedData,
      metadata: {
        ...existingContent.metadata,
        updated: Date.now(),
        version: existingContent.metadata.version + 1,
        status: options.status || existingContent.metadata.status
      },
      history: [
        ...existingContent.history,
        {
          action: 'updated',
          timestamp: Date.now(),
          author: options.author || 'system',
          changes: this.getChanges(existingContent.data, processedData)
        }
      ]
    };

    typeContent.set(id, updatedContent);

    // Execute post-update hooks
    if (contentType.hooks.afterUpdate) {
      await contentType.hooks.afterUpdate(updatedContent, existingContent, options);
    }

    console.log(\`✅ Updated \${type} content: \${id}\`);
    return updatedContent;
  }

  // Validate content against dynamic schema
  private async validateContent(type: string, data: any): Promise<any> {
    const contentType = this.contentTypes.get(type);
    const schema = contentType.schema;
    const errors: string[] = [];

    // Validate required fields
    if (schema.required) {
      for (const field of schema.required) {
        if (data[field] === undefined || data[field] === null || data[field] === '') {
          errors.push(\`Field '\${field}' is required\`);
        }
      }
    }

    // Validate field types and constraints
    for (const [fieldName, fieldConfig] of Object.entries(schema.fields || {})) {
      const fieldValue = data[fieldName];
      const config: any = fieldConfig;

      if (fieldValue !== undefined) {
        // Type validation
        if (config.type && !this.validateFieldType(fieldValue, config.type)) {
          errors.push(\`Field '\${fieldName}' must be of type \${config.type}\`);
        }

        // Custom validation
        if (config.validate && typeof config.validate === 'function') {
          const customResult = config.validate(fieldValue, data);
          if (customResult !== true) {
            errors.push(\`Field '\${fieldName}': \${customResult}\`);
          }
        }

        // Min/max length for strings
        if (typeof fieldValue === 'string') {
          if (config.minLength && fieldValue.length < config.minLength) {
            errors.push(\`Field '\${fieldName}' must be at least \${config.minLength} characters\`);
          }
          if (config.maxLength && fieldValue.length > config.maxLength) {
            errors.push(\`Field '\${fieldName}' must be at most \${config.maxLength} characters\`);
          }
        }

        // Min/max value for numbers
        if (typeof fieldValue === 'number') {
          if (config.min && fieldValue < config.min) {
            errors.push(\`Field '\${fieldName}' must be at least \${config.min}\`);
          }
          if (config.max && fieldValue > config.max) {
            errors.push(\`Field '\${fieldName}' must be at most \${config.max}\`);
          }
        }
      }
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  // Flexible content query system
  query(type: string, conditions: any = {}): any[] {
    const typeContent = this.content.get(type);
    if (!typeContent) return [];

    let results = Array.from(typeContent.values());

    // Apply filters
    if (conditions.where) {
      results = results.filter(item => this.matchesConditions(item, conditions.where));
    }

    // Apply sorting
    if (conditions.sort) {
      results = this.sortResults(results, conditions.sort);
    }

    // Apply pagination
    if (conditions.limit) {
      const offset = conditions.offset || 0;
      results = results.slice(offset, offset + conditions.limit);
    }

    return results;
  }

  // Dynamic content rendering
  render(content: any, template: string = 'default'): any {
    const renderer = this.renderers.get(content.type) || this.renderers.get('default');
    if (!renderer) {
      return { error: 'No renderer available' };
    }

    try {
      return renderer(content, template);
    } catch (error: any) {
      return { error: \`Rendering failed: \${error.message}\` };
    }
  }

  // Setup default content types
  private setupDefaultContentTypes(): void {
    // Blog post content type
    this.registerContentType('blog', {
      fields: {
        title: { type: 'string', required: true, maxLength: 200 },
        content: { type: 'string', required: true, minLength: 100 },
        excerpt: { type: 'string', maxLength: 500 },
        featuredImage: { type: 'string' },
        tags: { type: 'array' },
        category: { type: 'string' },
        publishDate: { type: 'date' },
        author: { type: 'object' }
      },
      required: ['title', 'content'],
      hooks: {
        beforeCreate: async (data: any) => ({
          ...data,
          slug: data.slug || this.generateSlug(data.title),
          excerpt: data.excerpt || data.content.substring(0, 200) + '...'
        })
      }
    });

    // Product content type
    this.registerContentType('product', {
      fields: {
        name: { type: 'string', required: true },
        description: { type: 'string', required: true },
        price: { type: 'number', min: 0 },
        images: { type: 'array' },
        category: { type: 'string' },
        sku: { type: 'string', validate: (value: string) => /^[A-Z0-9-]+$/.test(value) || 'SKU must contain only uppercase letters, numbers, and hyphens' },
        inventory: { type: 'number', min: 0 },
        specifications: { type: 'object' }
      },
      required: ['name', 'description', 'price']
    });

    // Page content type
    this.registerContentType('page', {
      fields: {
        title: { type: 'string', required: true },
        content: { type: 'string', required: true },
        template: { type: 'string' },
        seoTitle: { type: 'string' },
        seoDescription: { type: 'string' },
        customFields: { type: 'object' }
      },
      required: ['title', 'content']
    });
  }

  // Utility methods
  private validateFieldType(value: any, expectedType: string): boolean {
    switch (expectedType) {
      case 'string': return typeof value === 'string';
      case 'number': return typeof value === 'number' && !isNaN(value);
      case 'boolean': return typeof value === 'boolean';
      case 'array': return Array.isArray(value);
      case 'object': return typeof value === 'object' && value !== null && !Array.isArray(value);
      case 'date': return value instanceof Date || !isNaN(Date.parse(value));
      default: return true;
    }
  }

  private generateSlug(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  private matchesConditions(item: any, conditions: any): boolean {
    for (const [field, condition] of Object.entries(conditions)) {
      const value = this.getNestedValue(item, field);
      
      if (typeof condition === 'object' && condition !== null) {
        // Handle operators like { $gt: 5 }, { $in: ['tag1', 'tag2'] }
        for (const [operator, operandValue] of Object.entries(condition)) {
          switch (operator) {
            case '$eq': if (value !== operandValue) return false; break;
            case '$ne': if (value === operandValue) return false; break;
            case '$gt': if (value <= operandValue) return false; break;
            case '$gte': if (value < operandValue) return false; break;
            case '$lt': if (value >= operandValue) return false; break;
            case '$lte': if (value > operandValue) return false; break;
            case '$in': if (!Array.isArray(operandValue) || !operandValue.includes(value)) return false; break;
            case '$nin': if (Array.isArray(operandValue) && operandValue.includes(value)) return false; break;
            case '$regex': if (!new RegExp(operandValue as string).test(String(value))) return false; break;
          }
        }
      } else {
        // Simple equality check
        if (value !== condition) return false;
      }
    }
    return true;
  }

  private getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  private sortResults(results: any[], sortConfig: any): any[] {
    return results.sort((a, b) => {
      for (const [field, direction] of Object.entries(sortConfig)) {
        const aValue = this.getNestedValue(a, field);
        const bValue = this.getNestedValue(b, field);
        
        if (aValue < bValue) return direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  private getChanges(oldData: any, newData: any): any {
    const changes: any = {};
    
    for (const key in newData) {
      if (oldData[key] !== newData[key]) {
        changes[key] = { from: oldData[key], to: newData[key] };
      }
    }
    
    return changes;
  }

  private setupDefaultValidators(): void {
    // Email validator
    this.validators.set('email', (value: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value) || 'Invalid email format';
    });

    // URL validator
    this.validators.set('url', (value: string) => {
      try {
        new URL(value);
        return true;
      } catch {
        return 'Invalid URL format';
      }
    });
  }

  private setupDefaultRenderers(): void {
    // Default renderer
    this.renderers.set('default', (content: any) => ({
      html: \`<div class="content">\${JSON.stringify(content.data, null, 2)}</div>\`,
      text: JSON.stringify(content.data),
      data: content.data
    }));

    // Blog renderer
    this.renderers.set('blog', (content: any) => ({
      html: \`
        <article>
          <h1>\${content.data.title}</h1>
          <div class="meta">
            <span>By \${content.data.author?.name || 'Anonymous'}</span>
            <span>Published: \${new Date(content.metadata.created).toLocaleDateString()}</span>
          </div>
          <div class="content">\${content.data.content}</div>
          <div class="tags">
            \${(content.data.tags || []).map((tag: string) => \`<span class="tag">\${tag}</span>\`).join('')}
          </div>
        </article>
      \`,
      text: \`\${content.data.title}\n\n\${content.data.content}\`,
      data: content.data
    }));
  }

  // Export/Import functionality
  export(type?: string): any {
    if (type) {
      const typeContent = this.content.get(type);
      return typeContent ? Array.from(typeContent.values()) : [];
    }
    
    const allContent: any = {};
    for (const [contentType, typeContent] of this.content.entries()) {
      allContent[contentType] = Array.from(typeContent.values());
    }
    return allContent;
  }

  async import(data: any, options: any = {}): Promise<any> {
    const results: any = {
      imported: 0,
      errors: [],
      summary: {}
    };

    for (const [type, items] of Object.entries(data)) {
      if (!Array.isArray(items)) continue;
      
      results.summary[type] = { success: 0, errors: 0 };
      
      for (const item of items) {
        try {
          await this.createContent(type, item.data, {
            ...options,
            id: options.preserveIds ? item.id : undefined
          });
          results.imported++;
          results.summary[type].success++;
        } catch (error: any) {
          results.errors.push({ type, item: item.id, error: error.message });
          results.summary[type].errors++;
        }
      }
    }

    return results;
  }
}

// Usage example in React component
export function CMSDemo() {
  const [cms] = useState(() => new DynamicCMSEngine());
  const [content, setContent] = useState<any[]>([]);
  const [newContent, setNewContent] = useState<any>({
    type: 'blog',
    title: '',
    content: '',
    tags: []
  });

  const handleCreateContent = async () => {
    try {
      const created = await cms.createContent(newContent.type, {
        title: newContent.title,
        content: newContent.content,
        tags: newContent.tags.split(',').map((tag: string) => tag.trim())
      });
      
      setContent(prev => [...prev, created]);
      setNewContent({ type: 'blog', title: '', content: '', tags: [] });
    } catch (error: any) {
      alert(\`Error: \${error.message}\`);
    }
  };

  const handleQuery = () => {
    const results = cms.query('blog', {
      where: { 'metadata.status': 'draft' },
      sort: { 'metadata.created': 'desc' },
      limit: 10
    });
    setContent(results);
  };

  return (
    <div style={{ padding: 20 }}>
      <h3>Dynamic CMS Demo</h3>
      
      <div style={{ marginBottom: 20, border: '1px solid #ddd', padding: 15, borderRadius: 4 }}>
        <h4>Create New Content</h4>
        <div style={{ marginBottom: 10 }}>
          <select
            value={newContent.type}
            onChange={(e) => setNewContent(prev => ({ ...prev, type: e.target.value }))}
            style={{ padding: 5, marginRight: 10 }}
          >
            <option value="blog">Blog Post</option>
            <option value="product">Product</option>
            <option value="page">Page</option>
          </select>
        </div>
        <input
          type="text"
          placeholder="Title"
          value={newContent.title}
          onChange={(e) => setNewContent(prev => ({ ...prev, title: e.target.value }))}
          style={{ display: 'block', margin: '5px 0', padding: 5, width: '100%' }}
        />
        <textarea
          placeholder="Content"
          value={newContent.content}
          onChange={(e) => setNewContent(prev => ({ ...prev, content: e.target.value }))}
          style={{ display: 'block', margin: '5px 0', padding: 5, width: '100%', height: 100 }}
        />
        <input
          type="text"
          placeholder="Tags (comma-separated)"
          value={newContent.tags}
          onChange={(e) => setNewContent(prev => ({ ...prev, tags: e.target.value }))}
          style={{ display: 'block', margin: '5px 0', padding: 5, width: '100%' }}
        />
        <button
          onClick={handleCreateContent}
          style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: 4 }}
        >
          Create Content
        </button>
      </div>

      <div style={{ marginBottom: 20 }}>
        <button
          onClick={handleQuery}
          style={{ padding: '8px 16px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: 4 }}
        >
          Query Draft Content
        </button>
      </div>

      <div>
        <h4>Content Items ({content.length})</h4>
        {content.map((item, index) => (
          <div
            key={index}
            style={{
              border: '1px solid #ddd',
              padding: 10,
              margin: '10px 0',
              borderRadius: 4,
              backgroundColor: '#f9f9f9'
            }}
          >
            <h5>{item.data.title}</h5>
            <p><strong>Type:</strong> {item.type}</p>
            <p><strong>Status:</strong> {item.metadata.status}</p>
            <p><strong>Created:</strong> {new Date(item.metadata.created).toLocaleString()}</p>
            <div dangerouslySetInnerHTML={{ __html: cms.render(item).html }} />
          </div>
        ))}
      </div>
    </div>
  );
}`}
          language="typescript"
          filename="cms/DynamicCMSEngine.ts"
          title="Dynamic Content Management System"
        />

        <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800 mt-4">
          <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">✅ What's New in This Example</h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
            <li>• <strong>Dynamic Schema</strong> - Flexible content types with any field structure</li>
            <li>• <strong>Content Validation</strong> - Runtime validation for any data structure</li>
            <li>• <strong>Version Control</strong> - Built-in versioning and change tracking</li>
            <li>• <strong>Flexible Queries</strong> - MongoDB-style querying for any content</li>
            <li>• <strong>Hook System</strong> - Extensible hooks for content lifecycle events</li>
          </ul>
        </div>
      </div>

      {/* Example 3: Legacy Code Migration */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Example 3: Legacy JavaScript Migration System</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Let's create a system for gradually migrating legacy JavaScript code to TypeScript using any types as bridge types.
        </p>

        <CodeBlock
          code={`// migration/LegacyMigrationTool.ts
// Tool for migrating legacy JavaScript to TypeScript with any types

export class LegacyMigrationTool {
  private migrationRules: any = new Map();
  private typeInferences: any = new Map();
  private migrationProgress: any = new Map();
  private codeAnalysis: any = new Map();

  constructor() {
    this.setupDefaultRules();
    this.setupTypeInferences();
  }

  // Analyze legacy JavaScript code
  analyzeCode(filePath: string, code: string): any {
    const analysis: any = {
      filePath,
      originalCode: code,
      functions: [],
      variables: [],
      imports: [],
      exports: [],
      complexPatterns: [],
      migrationSuggestions: [],
      riskLevel: 'low'
    };

    // Extract functions with any return types
    const functionMatches = code.match(/function\s+(\w+)\s*\([^)]*\)\s*\{/g) || [];
    analysis.functions = functionMatches.map(match => {
      const nameMatch = match.match(/function\s+(\w+)/);
      return {
        name: nameMatch ? nameMatch[1] : 'anonymous',
        originalSignature: match,
        suggestedSignature: this.inferFunctionSignature(match, code),
        migrationType: 'any_return'
      };
    });

    // Extract variable declarations
    const varMatches = code.match(/(var|let|const)\s+(\w+)\s*=/g) || [];
    analysis.variables = varMatches.map(match => {
      const parts = match.split(/\s+/);
      const name = parts[1];
      const value = this.extractVariableValue(name, code);
      
      return {
        name,
        declarationType: parts[0],
        inferredType: this.inferType(value),
        originalDeclaration: match,
        suggestedType: this.inferType(value) || 'any'
      };
    });

    // Detect complex patterns that need any types
    analysis.complexPatterns = this.detectComplexPatterns(code);
    
    // Calculate risk level
    analysis.riskLevel = this.calculateRiskLevel(analysis);
    
    // Generate migration suggestions
    analysis.migrationSuggestions = this.generateMigrationSuggestions(analysis);

    this.codeAnalysis.set(filePath, analysis);
    return analysis;
  }

  // Generate TypeScript version with any types
  migrateToTypeScript(filePath: string, migrationStrategy: string = 'gradual'): any {
    const analysis = this.codeAnalysis.get(filePath);
    if (!analysis) {
      throw new Error(\`No analysis found for \${filePath}. Run analyzeCode first.\`);
    }

    let migratedCode = analysis.originalCode;
    const changes: any[] = [];

    switch (migrationStrategy) {
      case 'gradual':
        migratedCode = this.applyGradualMigration(analysis, migratedCode, changes);
        break;
      case 'aggressive':
        migratedCode = this.applyAggressiveMigration(analysis, migratedCode, changes);
        break;
      case 'safe':
        migratedCode = this.applySafeMigration(analysis, migratedCode, changes);
        break;
    }

    const result = {
      originalFile: filePath,
      migratedFile: filePath.replace(/\.js$/, '.ts'),
      originalCode: analysis.originalCode,
      migratedCode,
      strategy: migrationStrategy,
      changes,
      completionPercentage: this.calculateCompletionPercentage(changes),
      remainingWork: this.identifyRemainingWork(migratedCode),
      nextSteps: this.suggestNextSteps(migratedCode, changes)
    };

    this.migrationProgress.set(filePath, result);
    return result;
  }

  // Gradual migration - replace with any types first
  private applyGradualMigration(analysis: any, code: string, changes: any[]): string {
    let migratedCode = code;

    // Add type annotations with any types
    analysis.functions.forEach((func: any) => {
      const anySignature = func.originalSignature.replace(
        /function\s+(\w+)\s*\(([^)]*)\)/,
        (match: string, name: string, params: string) => {
          const typedParams = params
            .split(',')
            .map((param: string) => param.trim() ? \`\${param.trim()}: any\` : '')
            .filter(Boolean)
            .join(', ');
          return \`function \${name}(\${typedParams}): any\`;
        }
      );

      migratedCode = migratedCode.replace(func.originalSignature, anySignature);
      changes.push({
        type: 'function_signature',
        original: func.originalSignature,
        migrated: anySignature,
        reason: 'Added any types for gradual migration'
      });
    });

    // Add type annotations to variables
    analysis.variables.forEach((variable: any) => {
      if (variable.suggestedType && variable.suggestedType !== 'any') {
        const typedDeclaration = variable.originalDeclaration.replace(
          /(var|let|const)\s+(\w+)\s*=/,
          \`$1 $2: any =\`
        );
        
        migratedCode = migratedCode.replace(variable.originalDeclaration, typedDeclaration);
        changes.push({
          type: 'variable_type',
          original: variable.originalDeclaration,
          migrated: typedDeclaration,
          reason: 'Added any type annotation'
        });
      }
    });

    // Handle complex patterns with any types
    analysis.complexPatterns.forEach((pattern: any) => {
      const anyTypeVersion = this.convertPatternToAnyType(pattern);
      if (anyTypeVersion) {
        migratedCode = migratedCode.replace(pattern.original, anyTypeVersion);
        changes.push({
          type: 'complex_pattern',
          original: pattern.original,
          migrated: anyTypeVersion,
          reason: pattern.reason
        });
      }
    });

    return migratedCode;
  }

  // Safe migration - minimal changes, maximum any types
  private applySafeMigration(analysis: any, code: string, changes: any[]): string {
    let migratedCode = code;

    // Only add any types where absolutely necessary
    const criticalFunctions = analysis.functions.filter((f: any) => 
      f.originalSignature.includes('return') || 
      f.originalSignature.includes('callback')
    );

    criticalFunctions.forEach((func: any) => {
      const safeSig = func.originalSignature.replace(
        /function\s+(\w+)\s*\(([^)]*)\)/,
        'function $1($2): any'
      );
      
      migratedCode = migratedCode.replace(func.originalSignature, safeSig);
      changes.push({
        type: 'safe_function',
        original: func.originalSignature,
        migrated: safeSig,
        reason: 'Safe migration with any return type'
      });
    });

    return migratedCode;
  }

  // Aggressive migration - try to infer better types where possible
  private applyAggressiveMigration(analysis: any, code: string, changes: any[]): string {
    let migratedCode = code;

    // Use inferred types where possible, any types as fallback
    analysis.functions.forEach((func: any) => {
      const improvedSignature = func.suggestedSignature || func.originalSignature.replace(
        /function\s+(\w+)\s*\(([^)]*)\)/,
        (match: string, name: string, params: string) => {
          const betterParams = this.improveFunctionParams(params, code);
          const returnType = this.inferReturnType(name, code) || 'any';
          return \`function \${name}(\${betterParams}): \${returnType}\`;
        }
      );

      migratedCode = migratedCode.replace(func.originalSignature, improvedSignature);
      changes.push({
        type: 'improved_function',
        original: func.originalSignature,
        migrated: improvedSignature,
        reason: 'Aggressive migration with type inference'
      });
    });

    return migratedCode;
  }

  // Detect patterns that require any types
  private detectComplexPatterns(code: string): any[] {
    const patterns: any[] = [];

    // Dynamic property access
    const dynamicAccess = code.match(/\w+\[['"]\w+['"]\]/g) || [];
    dynamicAccess.forEach(match => {
      patterns.push({
        type: 'dynamic_property',
        original: match,
        reason: 'Dynamic property access requires any type',
        anyTypeNeeded: true
      });
    });

    // Callback functions without types
    const callbacks = code.match(/\.then\s*\(\s*\w+\s*=>/g) || [];
    callbacks.forEach(match => {
      patterns.push({
        type: 'callback',
        original: match,
        reason: 'Callback parameter needs any type',
        anyTypeNeeded: true
      });
    });

    // JSON parsing
    const jsonPatterns = code.match(/JSON\.parse\([^)]+\)/g) || [];
    jsonPatterns.forEach(match => {
      patterns.push({
        type: 'json_parse',
        original: match,
        reason: 'JSON.parse returns any type',
        anyTypeNeeded: true
      });
    });

    // External library usage
    const externalCalls = code.match(/\w+\.\w+\([^)]*\)/g) || [];
    externalCalls.forEach(match => {
      if (this.isExternalLibraryCall(match)) {
        patterns.push({
          type: 'external_library',
          original: match,
          reason: 'External library calls may need any types',
          anyTypeNeeded: true
        });
      }
    });

    return patterns;
  }

  // Convert patterns to use any types
  private convertPatternToAnyType(pattern: any): string | null {
    switch (pattern.type) {
      case 'dynamic_property':
        return pattern.original; // Already compatible with any type
      
      case 'callback':
        return pattern.original.replace(
          /(\w+)\s*=>/,
          '($1: any) =>'
        );
      
      case 'json_parse':
        return \`(\${pattern.original} as any)\`;
      
      case 'external_library':
        return pattern.original; // Usually compatible with any
      
      default:
        return null;
    }
  }

  // Type inference helpers
  private inferType(value: string): string {
    if (!value) return 'any';
    
    value = value.trim();
    
    if (value === 'true' || value === 'false') return 'boolean';
    if (/^\d+$/.test(value)) return 'number';
    if (/^\d*\.\d+$/.test(value)) return 'number';
    if (/^['"][^'"]*['"]$/.test(value)) return 'string';
    if (value.startsWith('[') && value.endsWith(']')) return 'any[]';
    if (value.startsWith('{') && value.endsWith('}')) return 'any';
    if (value.includes('function')) return 'Function';
    
    return 'any';
  }

  private inferReturnType(functionName: string, code: string): string | null {
    const returnStatements = code.match(new RegExp(\`function\\s+\${functionName}[^}]+return\\s+([^;]+)\`, 'g'));
    if (!returnStatements) return null;

    // Simple return type inference
    if (returnStatements.some(stmt => stmt.includes('return true') || stmt.includes('return false'))) {
      return 'boolean';
    }
    if (returnStatements.some(stmt => /return\s+\d/.test(stmt))) {
      return 'number';
    }
    if (returnStatements.some(stmt => /return\s+['"]/.test(stmt))) {
      return 'string';
    }
    
    return 'any';
  }

  private improveFunctionParams(params: string, code: string): string {
    if (!params.trim()) return '';
    
    return params.split(',').map(param => {
      const paramName = param.trim();
      if (!paramName) return '';
      
      // Try to infer parameter type from usage
      const usage = this.analyzeParameterUsage(paramName, code);
      const inferredType = usage.type || 'any';
      
      return \`\${paramName}: \${inferredType}\`;
    }).join(', ');
  }

  private analyzeParameterUsage(paramName: string, code: string): any {
    const usage = { type: 'any', confidence: 0 };
    
    // Look for arithmetic operations
    if (code.includes(\`\${paramName} +\`) || code.includes(\`\${paramName} -\`)) {
      usage.type = 'number';
      usage.confidence = 0.7;
    }
    
    // Look for string operations
    if (code.includes(\`\${paramName}.length\`) || code.includes(\`\${paramName}.substring\`)) {
      usage.type = 'string';
      usage.confidence = 0.8;
    }
    
    // Look for array operations
    if (code.includes(\`\${paramName}.push\`) || code.includes(\`\${paramName}[0]\`)) {
      usage.type = 'any[]';
      usage.confidence = 0.8;
    }
    
    return usage;
  }

  // Migration progress tracking
  private calculateCompletionPercentage(changes: any[]): number {
    if (changes.length === 0) return 0;
    
    const typeChanges = changes.filter(c => 
      c.type === 'function_signature' || 
      c.type === 'variable_type' ||
      c.type === 'improved_function'
    );
    
    return Math.round((typeChanges.length / changes.length) * 100);
  }

  private identifyRemainingWork(code: string): string[] {
    const remaining: string[] = [];
    
    if (code.includes('any')) {
      remaining.push('Replace any types with specific types where possible');
    }
    
    if (code.includes('JSON.parse')) {
      remaining.push('Add proper types for JSON parsing results');
    }
    
    if (code.match(/\w+\[['"]\w+['"]\]/)) {
      remaining.push('Consider using interfaces for dynamic property access');
    }
    
    return remaining;
  }

  private suggestNextSteps(code: string, changes: any[]): string[] {
    const steps: string[] = [];
    
    steps.push('1. Test the migrated code to ensure functionality is preserved');
    steps.push('2. Add strict type checking gradually');
    
    if (changes.some(c => c.type === 'function_signature')) {
      steps.push('3. Refine function parameter and return types');
    }
    
    if (code.includes('any[]')) {
      steps.push('4. Define proper array element types');
    }
    
    steps.push('5. Enable strict TypeScript compiler options');
    
    return steps;
  }

  // Utility methods
  private extractVariableValue(name: string, code: string): string {
    const regex = new RegExp(\`\${name}\\s*=\\s*([^;\\n]+)\`);
    const match = code.match(regex);
    return match ? match[1].trim() : '';
  }

  private isExternalLibraryCall(callExpression: string): boolean {
    const externalLibraryPatterns = [
      /jquery/i, /lodash/i, /moment/i, /axios/i,
      /fetch\s*\(/, /console\./, /window\./
    ];
    
    return externalLibraryPatterns.some(pattern => pattern.test(callExpression));
  }

  private calculateRiskLevel(analysis: any): string {
    let score = 0;
    
    // Complex patterns increase risk
    score += analysis.complexPatterns.length * 2;
    
    // Many functions increase risk
    score += analysis.functions.length;
    
    // External dependencies increase risk
    score += analysis.imports.length;
    
    if (score < 5) return 'low';
    if (score < 15) return 'medium';
    return 'high';
  }

  private generateMigrationSuggestions(analysis: any): string[] {
    const suggestions: string[] = [];
    
    if (analysis.riskLevel === 'high') {
      suggestions.push('Consider a gradual migration approach due to high complexity');
      suggestions.push('Start with safe migration strategy');
    }
    
    if (analysis.complexPatterns.length > 0) {
      suggestions.push('Use any types for complex patterns initially');
      suggestions.push('Plan to refine types after initial migration');
    }
    
    if (analysis.functions.length > 10) {
      suggestions.push('Migrate functions one by one to avoid breaking changes');
    }
    
    return suggestions;
  }

  private setupDefaultRules(): void {
    // Add default migration rules
  }

  private setupTypeInferences(): void {
    // Add default type inference rules
  }

  private inferFunctionSignature(signature: string, code: string): string {
    // Enhanced function signature inference
    return signature.replace(
      /function\s+(\w+)\s*\(([^)]*)\)/,
      'function $1($2): any'
    );
  }

  // Generate migration report
  generateReport(filePath: string): any {
    const analysis = this.codeAnalysis.get(filePath);
    const progress = this.migrationProgress.get(filePath);
    
    if (!analysis) {
      throw new Error(\`No analysis found for \${filePath}\`);
    }

    return {
      file: filePath,
      analysis: {
        riskLevel: analysis.riskLevel,
        functionsCount: analysis.functions.length,
        variablesCount: analysis.variables.length,
        complexPatternsCount: analysis.complexPatterns.length
      },
      migration: progress ? {
        strategy: progress.strategy,
        completionPercentage: progress.completionPercentage,
        changesCount: progress.changes.length,
        remainingWorkItems: progress.remainingWork.length
      } : null,
      recommendations: analysis.migrationSuggestions,
      generatedAt: new Date().toISOString()
    };
  }
}

// Usage example in React component
export function LegacyMigrationDemo() {
  const [migrationTool] = useState(() => new LegacyMigrationTool());
  const [legacyCode, setLegacyCode] = useState(\`
function calculateTotal(items, tax) {
  var total = 0;
  for (var i = 0; i < items.length; i++) {
    total += items[i].price * items[i].quantity;
  }
  return total + (total * tax);
}

var userSettings = JSON.parse(localStorage.getItem('settings'));
userSettings['theme'] = 'dark';

jQuery('.button').click(function(event) {
  var data = event.target.dataset;
  processData(data);
});
  \`);
  const [migrationResult, setMigrationResult] = useState<any>(null);
  const [analysis, setAnalysis] = useState<any>(null);

  const handleAnalyze = () => {
    const result = migrationTool.analyzeCode('legacy.js', legacyCode);
    setAnalysis(result);
  };

  const handleMigrate = (strategy: string) => {
    if (!analysis) {
      alert('Please analyze the code first');
      return;
    }
    
    const result = migrationTool.migrateToTypeScript('legacy.js', strategy);
    setMigrationResult(result);
  };

  return (
    <div style={{ padding: 20 }}>
      <h3>Legacy Code Migration Demo</h3>
      
      <div style={{ marginBottom: 20 }}>
        <h4>Legacy JavaScript Code:</h4>
        <textarea
          value={legacyCode}
          onChange={(e) => setLegacyCode(e.target.value)}
          style={{
            width: '100%',
            height: 200,
            fontFamily: 'monospace',
            fontSize: 12,
            padding: 10,
            border: '1px solid #ddd',
            borderRadius: 4
          }}
        />
        
        <div style={{ marginTop: 10 }}>
          <button
            onClick={handleAnalyze}
            style={{ 
              padding: '8px 16px', 
              backgroundColor: '#007bff', 
              color: 'white', 
              border: 'none', 
              borderRadius: 4,
              marginRight: 10
            }}
          >
            Analyze Code
          </button>
          
          {analysis && (
            <>
              <button
                onClick={() => handleMigrate('safe')}
                style={{ 
                  padding: '8px 16px', 
                  backgroundColor: '#28a745', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: 4,
                  marginRight: 10
                }}
              >
                Safe Migration
              </button>
              <button
                onClick={() => handleMigrate('gradual')}
                style={{ 
                  padding: '8px 16px', 
                  backgroundColor: '#ffc107', 
                  color: 'black', 
                  border: 'none', 
                  borderRadius: 4,
                  marginRight: 10
                }}
              >
                Gradual Migration
              </button>
              <button
                onClick={() => handleMigrate('aggressive')}
                style={{ 
                  padding: '8px 16px', 
                  backgroundColor: '#dc3545', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: 4
                }}
              >
                Aggressive Migration
              </button>
            </>
          )}
        </div>
      </div>

      {analysis && (
        <div style={{ marginBottom: 20, border: '1px solid #ddd', padding: 15, borderRadius: 4 }}>
          <h4>Code Analysis</h4>
          <p><strong>Risk Level:</strong> {analysis.riskLevel}</p>
          <p><strong>Functions:</strong> {analysis.functions.length}</p>
          <p><strong>Variables:</strong> {analysis.variables.length}</p>
          <p><strong>Complex Patterns:</strong> {analysis.complexPatterns.length}</p>
          
          <h5>Migration Suggestions:</h5>
          <ul>
            {analysis.migrationSuggestions.map((suggestion: string, index: number) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>
      )}

      {migrationResult && (
        <div style={{ border: '1px solid #ddd', padding: 15, borderRadius: 4 }}>
          <h4>Migration Result ({migrationResult.strategy})</h4>
          <p><strong>Completion:</strong> {migrationResult.completionPercentage}%</p>
          <p><strong>Changes Made:</strong> {migrationResult.changes.length}</p>
          
          <h5>Migrated TypeScript Code:</h5>
          <pre style={{
            backgroundColor: '#f8f9fa',
            padding: 15,
            borderRadius: 4,
            overflow: 'auto',
            fontSize: 12,
            fontFamily: 'monospace'
          }}>
            {migrationResult.migratedCode}
          </pre>
          
          <h5>Next Steps:</h5>
          <ol>
            {migrationResult.nextSteps.map((step: string, index: number) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}`}
          language="typescript"
          filename="migration/LegacyMigrationTool.ts"
          title="Legacy JavaScript Migration System"
        />

        <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800 mt-4">
          <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">✅ What's New in This Example</h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
            <li>• <strong>Code Analysis</strong> - Comprehensive analysis of legacy JavaScript code</li>
            <li>• <strong>Migration Strategies</strong> - Safe, gradual, and aggressive migration approaches</li>
            <li>• <strong>Type Inference</strong> - Intelligent type inference with any type fallbacks</li>
            <li>• <strong>Risk Assessment</strong> - Automated risk level calculation for migrations</li>
            <li>• <strong>Progress Tracking</strong> - Detailed tracking of migration progress and completion</li>
          </ul>
        </div>
      </div>

      {/* Real-World Patterns */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Real-World Any Type Patterns</h2>
        
        <div className="bg-gray-50 dark:bg-gray-950/20 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
          <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">🌍 Production Use Cases</h4>
          <div className="text-sm space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-orange-500 font-mono">1.</span>
              <span className="text-gray-700 dark:text-gray-300">
                <strong>API Integration</strong> - Handle varying response structures from external services
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-orange-500 font-mono">2.</span>
              <span className="text-gray-700 dark:text-gray-300">
                <strong>Dynamic Content</strong> - CMS systems with flexible field structures
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-orange-500 font-mono">3.</span>
              <span className="text-gray-700 dark:text-gray-300">
                <strong>Legacy Migration</strong> - Gradual TypeScript adoption in existing projects
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-orange-500 font-mono">4.</span>
              <span className="text-gray-700 dark:text-gray-300">
                <strong>Plugin Systems</strong> - Extensible architectures with unknown plugin types
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-orange-500 font-mono">5.</span>
              <span className="text-gray-700 dark:text-gray-300">
                <strong>Configuration</strong> - Runtime configuration with flexible schemas
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Production Any Type Best Practices</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">✅ Do's</h4>
            <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1">
              <li>• Use any types as temporary bridges during migration</li>
              <li>• Add runtime validation for any type data</li>
              <li>• Document why any types are necessary</li>
              <li>• Plan migration paths to specific types</li>
              <li>• Use type guards to narrow any types</li>
            </ul>
          </div>
          
          <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
            <h4 className="font-semibold text-red-800 dark:text-red-200 mb-3">❌ Don'ts</h4>
            <ul className="text-red-700 dark:text-red-300 text-sm space-y-1">
              <li>• Use any types as a permanent solution</li>
              <li>• Skip validation for external data</li>
              <li>• Use any types for known data structures</li>
              <li>• Ignore TypeScript errors with any types</li>
              <li>• Spread any types throughout the codebase</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Integration Guide */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Building on Previous Sessions</h2>
        
        <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
          <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-3">🔗 Session Integration</h4>
          <div className="text-purple-700 dark:text-purple-300 text-sm space-y-2">
            <div>
              <strong>Session 1 (Any Basics):</strong> Fundamental any type concepts and simple usage
            </div>
            <div>
              <strong>Session 2 (Advanced Patterns):</strong> Complex systems with any type orchestration
            </div>
            <div>
              <strong>Session 3 (Real-World):</strong> Production applications and integration scenarios
            </div>
            <div>
              <strong>Complete System:</strong> Comprehensive any type mastery for practical development
            </div>
          </div>
        </div>
      </div>

      {/* Hands-On Exercise */}
      <div className="bg-orange-50 dark:bg-orange-950/20 p-6 rounded-xl border border-orange-200 dark:border-orange-800">
        <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-4">
          🎯 Hands-On Exercise: Real-World Integration Project
        </h3>
        
        <div className="text-orange-800 dark:text-orange-200 space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Challenge: Multi-System Integration Platform</h4>
            <p className="text-sm">
              Build a comprehensive platform that integrates multiple real-world scenarios using any types.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Requirements:</h4>
            <ul className="text-sm space-y-1">
              <li>• API integration hub with multiple third-party services</li>
              <li>• Dynamic CMS with flexible content types</li>
              <li>• Legacy code migration tool</li>
              <li>• Runtime configuration system</li>
              <li>• Plugin architecture for extensions</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Advanced Features:</h4>
            <ul className="text-sm space-y-1">
              <li>• Type inference and gradual typing system</li>
              <li>• Runtime validation and error handling</li>
              <li>• Performance monitoring and caching</li>
              <li>• Migration progress tracking</li>
              <li>• Comprehensive testing with any types</li>
            </ul>
          </div>
        </div>
      </div>

        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            🎉 Session 3 Complete!
          </h4>
          <p className="text-green-700 dark:text-green-300 mb-3">
            You've mastered real-world any type applications including third-party API integration, 
            dynamic content management systems, and legacy code migration strategies.
          </p>
          <p className="text-green-700 dark:text-green-300 mb-0">
            <strong>Next:</strong> Session 4 will cover practice exercises, common patterns, 
            and comprehensive any type mastery challenges.
          </p>
        </div>
    </div>
  );
}