"use client";

import { CodeBlock } from "@/components/ui/code-block-new";

export function Day7Session4Content() {
  return (
    <>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Testing - Session 4
          </h1>

          <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-8">
            <h3 className="text-blue-800 dark:text-blue-200 font-semibold mb-4 mt-0">
              🧪 Session Overview
            </h3>
            <ul className="text-blue-700 dark:text-blue-300 space-y-2 mb-0">
              <li>
                <strong>@testing-library/react-native Setup</strong> - Configure the testing environment and essential utilities
              </li>
              <li>
                <strong>Unit Testing Components</strong> - Write comprehensive tests for React Native components
              </li>
              <li>
                <strong>Testing User Interactions</strong> - Test touch events, navigation, and user workflows
              </li>
              <li>
                <strong>Mocking APIs and Services</strong> - Mock external dependencies and API calls effectively
              </li>
              <li>
                <strong>Context and State Testing</strong> - Test React Context, state management, and data flow
              </li>
              <li>
                <strong>Testing Best Practices</strong> - Build maintainable and reliable test suites
              </li>
            </ul>
          </div>
        </div>

        <h2>1. @testing-library/react-native Setup</h2>

        <h3>Installation and Configuration</h3>
        <p>
          Set up a comprehensive testing environment with @testing-library/react-native for 
          component testing and Jest for the testing framework.
        </p>

        <CodeBlock
          code={`# Install testing dependencies
npm install --save-dev @testing-library/react-native @testing-library/jest-native

# For Expo projects
npx expo install --dev @testing-library/react-native @testing-library/jest-native

# Additional testing utilities
npm install --save-dev react-test-renderer
npm install --save-dev @testing-library/user-event

# Mock dependencies for React Native
npm install --save-dev react-native-testing-mocks`}
          language="bash"
          filename="terminal"
          title="Testing Dependencies Installation"
        />

        <CodeBlock
          code={`// jest.config.js - Jest configuration
module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    '<rootDir>/src/test-utils/setup.ts'
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@expo|expo|@react-navigation|react-native-vector-icons|react-native-gesture-handler|react-native-reanimated)/)'
  ],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.expo/',
    '<rootDir>/dist/'
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.test.{ts,tsx}',
    '!src/**/*.stories.{ts,tsx}'
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  },
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
};`}
          language="javascript"
          filename="jest.config.js"
          title="Jest Configuration"
        />

        <CodeBlock
          code={`// src/test-utils/setup.ts - Test setup file
import 'react-native-gesture-handler/jestSetup';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

// Mock React Native modules
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Mock Expo modules
jest.mock('expo-linear-gradient', () => ({
  LinearGradient: 'LinearGradient'
}));

jest.mock('expo-font', () => ({
  loadAsync: jest.fn(),
  isLoaded: jest.fn(() => true)
}));

// Mock navigation
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      dispatch: jest.fn(),
      goBack: jest.fn(),
      addListener: jest.fn()
    }),
    useRoute: () => ({
      params: {},
      name: 'TestRoute'
    })
  };
});

// Mock React Native components that don't render in tests
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  
  RN.Alert = {
    alert: jest.fn()
  };
  
  return RN;
});

// Global test utilities
global.fetch = jest.fn();

// Console suppression for cleaner test output
const originalConsoleError = console.error;
console.error = (...args) => {
  if (
    typeof args[0] === 'string' &&
    args[0].includes('Warning: ReactDOM.render is no longer supported')
  ) {
    return;
  }
  originalConsoleError.call(console, ...args);
};`}
          language="typescript"
          filename="src/test-utils/setup.ts"
          title="Test Environment Setup"
        />

        <h3>Custom Test Utilities</h3>
        <CodeBlock
          code={`// src/test-utils/render.tsx - Custom render utilities
import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '../contexts/ThemeContext';
import { AuthProvider } from '../contexts/AuthContext';

// Custom providers for testing
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <NavigationContainer>
      <ThemeProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
};

// Custom render function with providers
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

// Test data factories
export const createMockUser = (overrides = {}) => ({
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
  avatar: 'https://example.com/avatar.jpg',
  isVerified: true,
  ...overrides
});

export const createMockProduct = (overrides = {}) => ({
  id: '1',
  name: 'Test Product',
  price: 29.99,
  description: 'A test product',
  imageUrl: 'https://example.com/product.jpg',
  inStock: true,
  category: 'electronics',
  ...overrides
});

// Mock navigation functions
export const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  dispatch: jest.fn(),
  setParams: jest.fn(),
  addListener: jest.fn(),
  removeListener: jest.fn(),
  canGoBack: jest.fn(() => true),
  isFocused: jest.fn(() => true)
};

// Async test helpers
export const waitForAsyncUpdates = () => 
  new Promise(resolve => setTimeout(resolve, 0));

export const mockAsyncFunction = <T>(
  returnValue: T,
  delay = 100
): jest.MockedFunction<() => Promise<T>> => {
  return jest.fn().mockImplementation(() => 
    new Promise(resolve => setTimeout(() => resolve(returnValue), delay))
  );
};

// Re-export everything from testing library
export * from '@testing-library/react-native';

// Override render with our custom version
export { customRender as render };`}
          language="typescript"
          filename="src/test-utils/render.tsx"
          title="Custom Testing Utilities"
        />

        <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 my-6">
          <h4 className="text-yellow-800 dark:text-yellow-200 font-semibold mb-2 mt-0">
            🔧 Testing Library Benefits
          </h4>
          <div className="text-yellow-700 dark:text-yellow-300 text-sm space-y-2">
            <div><strong>User-Focused:</strong> Test components as users would interact with them</div>
            <div><strong>Maintainable:</strong> Tests are less brittle and more focused on behavior</div>
            <div><strong>Debugging:</strong> Clear error messages and debugging utilities</div>
            <div><strong>Best Practices:</strong> Encourages accessible and semantic component design</div>
          </div>
        </div>

        <h2>2. Unit Testing Components</h2>
        <p>
          Write comprehensive unit tests for React Native components, focusing on rendering, 
          props handling, state changes, and user interactions.
        </p>

        <h3>Basic Component Testing</h3>
        <CodeBlock
          code={`// components/Button.tsx - Component to test
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  loading?: boolean;
  testID?: string;
}

export function Button({ 
  title, 
  onPress, 
  disabled = false, 
  variant = 'primary',
  loading = false,
  testID 
}: ButtonProps) {
  const buttonStyle = [
    styles.button,
    styles[\`button\${variant.charAt(0).toUpperCase() + variant.slice(1)}\`],
    disabled && styles.buttonDisabled
  ];
  
  const textStyle = [
    styles.text,
    styles[\`text\${variant.charAt(0).toUpperCase() + variant.slice(1)}\`],
    disabled && styles.textDisabled
  ];
  
  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      testID={testID}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
    >
      <Text style={textStyle}>
        {loading ? 'Loading...' : title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonPrimary: {
    backgroundColor: '#007AFF'
  },
  buttonSecondary: {
    backgroundColor: '#E5E5EA',
    borderWidth: 1,
    borderColor: '#C7C7CC'
  },
  buttonDanger: {
    backgroundColor: '#FF3B30'
  },
  buttonDisabled: {
    opacity: 0.6
  },
  text: {
    fontSize: 16,
    fontWeight: '600'
  },
  textPrimary: {
    color: 'white'
  },
  textSecondary: {
    color: '#007AFF'
  },
  textDanger: {
    color: 'white'
  },
  textDisabled: {
    opacity: 0.8
  }
});`}
          language="typescript"
          filename="components/Button.tsx"
          title="Component to Test"
        />

        <CodeBlock
          code={`// components/__tests__/Button.test.tsx - Comprehensive component tests
import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { render } from '../../test-utils/render';
import { Button } from '../Button';

describe('Button Component', () => {
  const defaultProps = {
    title: 'Test Button',
    onPress: jest.fn()
  };
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  describe('Rendering', () => {
    it('renders correctly with default props', () => {
      const { getByText, getByRole } = render(<Button {...defaultProps} />);
      
      expect(getByText('Test Button')).toBeTruthy();
      expect(getByRole('button')).toBeTruthy();
    });
    
    it('renders with custom title', () => {
      const { getByText } = render(
        <Button {...defaultProps} title="Custom Title" />
      );
      
      expect(getByText('Custom Title')).toBeTruthy();
    });
    
    it('applies correct testID', () => {
      const { getByTestId } = render(
        <Button {...defaultProps} testID="custom-button" />
      );
      
      expect(getByTestId('custom-button')).toBeTruthy();
    });
  });
  
  describe('Interactions', () => {
    it('calls onPress when pressed', () => {
      const mockOnPress = jest.fn();
      const { getByRole } = render(
        <Button {...defaultProps} onPress={mockOnPress} />
      );
      
      fireEvent.press(getByRole('button'));
      
      expect(mockOnPress).toHaveBeenCalledTimes(1);
    });
    
    it('does not call onPress when disabled', () => {
      const mockOnPress = jest.fn();
      const { getByRole } = render(
        <Button {...defaultProps} onPress={mockOnPress} disabled />
      );
      
      fireEvent.press(getByRole('button'));
      
      expect(mockOnPress).not.toHaveBeenCalled();
    });
    
    it('does not call onPress when loading', () => {
      const mockOnPress = jest.fn();
      const { getByRole } = render(
        <Button {...defaultProps} onPress={mockOnPress} loading />
      );
      
      fireEvent.press(getByRole('button'));
      
      expect(mockOnPress).not.toHaveBeenCalled();
    });
  });
  
  describe('States', () => {
    it('shows loading text when loading', () => {
      const { getByText, queryByText } = render(
        <Button {...defaultProps} loading />
      );
      
      expect(getByText('Loading...')).toBeTruthy();
      expect(queryByText('Test Button')).toBeNull();
    });
    
    it('has correct accessibility state when disabled', () => {
      const { getByRole } = render(
        <Button {...defaultProps} disabled />
      );
      
      const button = getByRole('button');
      expect(button.props.accessibilityState.disabled).toBe(true);
    });
  });
  
  describe('Variants', () => {
    it('renders primary variant by default', () => {
      const { getByRole } = render(<Button {...defaultProps} />);
      const button = getByRole('button');
      
      // Test styles are applied (you might need to check computed styles)
      expect(button).toBeTruthy();
    });
    
    it('renders secondary variant', () => {
      const { getByRole } = render(
        <Button {...defaultProps} variant="secondary" />
      );
      
      expect(getByRole('button')).toBeTruthy();
    });
    
    it('renders danger variant', () => {
      const { getByRole } = render(
        <Button {...defaultProps} variant="danger" />
      );
      
      expect(getByRole('button')).toBeTruthy();
    });
  });
  
  describe('Edge Cases', () => {
    it('handles multiple rapid presses', () => {
      const mockOnPress = jest.fn();
      const { getByRole } = render(
        <Button {...defaultProps} onPress={mockOnPress} />
      );
      
      const button = getByRole('button');
      fireEvent.press(button);
      fireEvent.press(button);
      fireEvent.press(button);
      
      expect(mockOnPress).toHaveBeenCalledTimes(3);
    });
    
    it('handles empty title gracefully', () => {
      const { getByRole } = render(
        <Button {...defaultProps} title="" />
      );
      
      expect(getByRole('button')).toBeTruthy();
    });
  });
});`}
          language="typescript"
          filename="components/__tests__/Button.test.tsx"
          title="Comprehensive Button Component Tests"
        />

        <h3>Testing Complex Components</h3>
        <CodeBlock
          code={`// components/UserProfile.tsx - Complex component to test
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './Button';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isVerified: boolean;
}

interface UserProfileProps {
  userId: string;
  onEdit?: () => void;
}

export function UserProfile({ userId, onEdit }: UserProfileProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation();
  const { currentUser, logout } = useAuth();
  
  const isOwnProfile = currentUser?.id === userId;
  
  useEffect(() => {
    fetchUser();
  }, [userId]);
  
  const fetchUser = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(\`/api/users/\${userId}\`);
      if (!response.ok) {
        throw new Error('User not found');
      }
      
      const userData = await response.json();
      setUser(userData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: logout }
      ]
    );
  };
  
  const handleMessage = () => {
    navigation.navigate('Chat', { userId: user.id });
  };
  
  if (loading) {
    return (
      <View testID="loading-indicator">
        <Text>Loading...</Text>
      </View>
    );
  }
  
  if (error) {
    return (
      <View testID="error-container">
        <Text>Error: {error}</Text>
        <Button title="Retry" onPress={fetchUser} />
      </View>
    );
  }
  
  if (!user) {
    return (
      <View testID="no-user">
        <Text>User not found</Text>
      </View>
    );
  }
  
  return (
    <View testID="user-profile">
      <TouchableOpacity onPress={onEdit} disabled={!isOwnProfile}>
        <Image 
          source={{ uri: user.avatar }} 
          style={{ width: 100, height: 100, borderRadius: 50 }}
          testID="user-avatar"
        />
      </TouchableOpacity>
      
      <Text testID="user-name">{user.name}</Text>
      <Text testID="user-email">{user.email}</Text>
      
      {user.isVerified && (
        <Text testID="verified-badge">✓ Verified</Text>
      )}
      
      {isOwnProfile ? (
        <View>
          <Button 
            title="Edit Profile" 
            onPress={onEdit}
            testID="edit-button"
          />
          <Button 
            title="Logout" 
            onPress={handleLogout}
            variant="danger"
            testID="logout-button"
          />
        </View>
      ) : (
        <Button 
          title="Send Message" 
          onPress={handleMessage}
          testID="message-button"
        />
      )}
    </View>
  );
}`}
          language="typescript"
          filename="components/UserProfile.tsx"
          title="Complex Component Example"
        />

        <CodeBlock
          code={`// components/__tests__/UserProfile.test.tsx - Complex component tests
import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import { render, createMockUser, mockNavigation } from '../../test-utils/render';
import { UserProfile } from '../UserProfile';

// Mock the auth context
const mockAuthContext = {
  currentUser: createMockUser({ id: '1' }),
  logout: jest.fn()
};

jest.mock('../../contexts/AuthContext', () => ({
  useAuth: () => mockAuthContext
}));

// Mock navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => mockNavigation
}));

// Mock fetch
global.fetch = jest.fn();

describe('UserProfile Component', () => {
  const mockUser = createMockUser();
  
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockUser)
    });
  });
  
  describe('Loading State', () => {
    it('shows loading indicator initially', () => {
      const { getByTestId } = render(<UserProfile userId="1" />);
      
      expect(getByTestId('loading-indicator')).toBeTruthy();
    });
  });
  
  describe('Successful Data Load', () => {
    it('displays user information after loading', async () => {
      const { getByTestId, queryByTestId } = render(<UserProfile userId="1" />);
      
      await waitFor(() => {
        expect(queryByTestId('loading-indicator')).toBeNull();
        expect(getByTestId('user-profile')).toBeTruthy();
      });
      
      expect(getByTestId('user-name')).toHaveTextContent(mockUser.name);
      expect(getByTestId('user-email')).toHaveTextContent(mockUser.email);
    });
    
    it('shows verified badge for verified users', async () => {
      const verifiedUser = createMockUser({ isVerified: true });
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(verifiedUser)
      });
      
      const { getByTestId } = render(<UserProfile userId="1" />);
      
      await waitFor(() => {
        expect(getByTestId('verified-badge')).toBeTruthy();
      });
    });
    
    it('hides verified badge for unverified users', async () => {
      const unverifiedUser = createMockUser({ isVerified: false });
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(unverifiedUser)
      });
      
      const { queryByTestId } = render(<UserProfile userId="1" />);
      
      await waitFor(() => {
        expect(queryByTestId('verified-badge')).toBeNull();
      });
    });
  });
  
  describe('Own Profile', () => {
    it('shows edit and logout buttons for own profile', async () => {
      const { getByTestId } = render(<UserProfile userId="1" />);
      
      await waitFor(() => {
        expect(getByTestId('edit-button')).toBeTruthy();
        expect(getByTestId('logout-button')).toBeTruthy();
      });
    });
    
    it('calls onEdit when edit button is pressed', async () => {
      const mockOnEdit = jest.fn();
      const { getByTestId } = render(
        <UserProfile userId="1" onEdit={mockOnEdit} />
      );
      
      await waitFor(() => {
        fireEvent.press(getByTestId('edit-button'));
      });
      
      expect(mockOnEdit).toHaveBeenCalledTimes(1);
    });
    
    it('shows logout confirmation when logout is pressed', async () => {
      const alertSpy = jest.spyOn(Alert, 'alert');
      const { getByTestId } = render(<UserProfile userId="1" />);
      
      await waitFor(() => {
        fireEvent.press(getByTestId('logout-button'));
      });
      
      expect(alertSpy).toHaveBeenCalledWith(
        'Logout',
        'Are you sure you want to logout?',
        expect.arrayContaining([
          expect.objectContaining({ text: 'Cancel' }),
          expect.objectContaining({ text: 'Logout' })
        ])
      );
    });
  });
  
  describe('Other User Profile', () => {
    beforeEach(() => {
      // Mock viewing another user's profile
      mockAuthContext.currentUser = createMockUser({ id: '999' });
    });
    
    it('shows message button for other users', async () => {
      const { getByTestId, queryByTestId } = render(<UserProfile userId="1" />);
      
      await waitFor(() => {
        expect(getByTestId('message-button')).toBeTruthy();
        expect(queryByTestId('edit-button')).toBeNull();
        expect(queryByTestId('logout-button')).toBeNull();
      });
    });
    
    it('navigates to chat when message button is pressed', async () => {
      const { getByTestId } = render(<UserProfile userId="1" />);
      
      await waitFor(() => {
        fireEvent.press(getByTestId('message-button'));
      });
      
      expect(mockNavigation.navigate).toHaveBeenCalledWith('Chat', { 
        userId: mockUser.id 
      });
    });
  });
  
  describe('Error Handling', () => {
    it('shows error message when fetch fails', async () => {
      (global.fetch as jest.Mock).mockRejectedValue(
        new Error('Network error')
      );
      
      const { getByTestId } = render(<UserProfile userId="1" />);
      
      await waitFor(() => {
        expect(getByTestId('error-container')).toBeTruthy();
      });
    });
    
    it('shows error message when user not found', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 404
      });
      
      const { getByTestId } = render(<UserProfile userId="1" />);
      
      await waitFor(() => {
        expect(getByTestId('error-container')).toBeTruthy();
      });
    });
    
    it('allows retry after error', async () => {
      (global.fetch as jest.Mock)
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(mockUser)
        });
      
      const { getByTestId, getByText } = render(<UserProfile userId="1" />);
      
      // Wait for error state
      await waitFor(() => {
        expect(getByTestId('error-container')).toBeTruthy();
      });
      
      // Retry
      fireEvent.press(getByText('Retry'));
      
      // Wait for successful load
      await waitFor(() => {
        expect(getByTestId('user-profile')).toBeTruthy();
      });
    });
  });
});`}
          language="typescript"
          filename="components/__tests__/UserProfile.test.tsx"
          title="Complex Component Testing"
        />

        <h2>3. Mocking APIs and External Services</h2>
        <p>
          Learn to effectively mock API calls, external services, and third-party libraries 
          to create reliable and fast-running tests.
        </p>

        <CodeBlock
          code={`// test-utils/api-mocks.ts - API mocking utilities
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { createMockUser, createMockProduct } from './render';

// Mock data
const mockUsers = [
  createMockUser({ id: '1', name: 'John Doe' }),
  createMockUser({ id: '2', name: 'Jane Smith' }),
  createMockUser({ id: '3', name: 'Bob Johnson' })
];

const mockProducts = [
  createMockProduct({ id: '1', name: 'Product 1', price: 29.99 }),
  createMockProduct({ id: '2', name: 'Product 2', price: 49.99 }),
  createMockProduct({ id: '3', name: 'Product 3', price: 19.99 })
];

// API handlers
export const handlers = [
  // Users API
  rest.get('/api/users', (req, res, ctx) => {
    return res(ctx.json(mockUsers));
  }),
  
  rest.get('/api/users/:id', (req, res, ctx) => {
    const { id } = req.params;
    const user = mockUsers.find(u => u.id === id);
    
    if (!user) {
      return res(ctx.status(404), ctx.json({ error: 'User not found' }));
    }
    
    return res(ctx.json(user));
  }),
  
  rest.post('/api/users', async (req, res, ctx) => {
    const userData = await req.json();
    const newUser = createMockUser({
      id: String(mockUsers.length + 1),
      ...userData
    });
    
    mockUsers.push(newUser);
    return res(ctx.status(201), ctx.json(newUser));
  }),
  
  rest.put('/api/users/:id', async (req, res, ctx) => {
    const { id } = req.params;
    const updates = await req.json();
    const userIndex = mockUsers.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
      return res(ctx.status(404), ctx.json({ error: 'User not found' }));
    }
    
    mockUsers[userIndex] = { ...mockUsers[userIndex], ...updates };
    return res(ctx.json(mockUsers[userIndex]));
  }),
  
  // Products API
  rest.get('/api/products', (req, res, ctx) => {
    const page = req.url.searchParams.get('page') || '1';
    const limit = req.url.searchParams.get('limit') || '10';
    
    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const endIndex = startIndex + parseInt(limit);
    const paginatedProducts = mockProducts.slice(startIndex, endIndex);
    
    return res(ctx.json({
      products: paginatedProducts,
      total: mockProducts.length,
      page: parseInt(page),
      limit: parseInt(limit)
    }));
  }),
  
  rest.get('/api/products/:id', (req, res, ctx) => {
    const { id } = req.params;
    const product = mockProducts.find(p => p.id === id);
    
    if (!product) {
      return res(ctx.status(404), ctx.json({ error: 'Product not found' }));
    }
    
    return res(ctx.json(product));
  }),
  
  // Auth API
  rest.post('/api/auth/login', async (req, res, ctx) => {
    const { email, password } = await req.json();
    
    // Simulate authentication
    if (email === 'test@example.com' && password === 'password') {
      return res(ctx.json({
        user: createMockUser({ email }),
        token: 'mock-jwt-token'
      }));
    }
    
    return res(
      ctx.status(401), 
      ctx.json({ error: 'Invalid credentials' })
    );
  }),
  
  rest.post('/api/auth/logout', (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  
  // Error simulation handlers
  rest.get('/api/error/500', (req, res, ctx) => {
    return res(ctx.status(500), ctx.json({ error: 'Internal server error' }));
  }),
  
  rest.get('/api/error/timeout', (req, res, ctx) => {
    // Simulate timeout
    return res(ctx.delay(30000));
  })
];

// Setup server
export const server = setupServer(...handlers);

// Test utilities for API mocking
export class ApiMockUtils {
  static mockSuccessfulResponse<T>(data: T) {
    return {
      ok: true,
      status: 200,
      json: () => Promise.resolve(data),
      text: () => Promise.resolve(JSON.stringify(data))
    };
  }
  
  static mockErrorResponse(status: number, message: string) {
    return {
      ok: false,
      status,
      json: () => Promise.resolve({ error: message }),
      text: () => Promise.resolve(JSON.stringify({ error: message }))
    };
  }
  
  static mockNetworkError() {
    return Promise.reject(new Error('Network error'));
  }
  
  static mockTimeoutError() {
    return new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout')), 100);
    });
  }
}

// Jest setup for MSW
export const setupApiMocks = () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
};`}
          language="typescript"
          filename="test-utils/api-mocks.ts"
          title="API Mocking with MSW"
        />

        <h3>Service Layer Testing</h3>
        <CodeBlock
          code={`// services/__tests__/userService.test.ts - Service layer testing
import { userService } from '../userService';
import { ApiMockUtils } from '../../test-utils/api-mocks';
import { createMockUser } from '../../test-utils/render';

// Mock fetch globally
global.fetch = jest.fn();

describe('UserService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  describe('fetchUser', () => {
    it('returns user data on successful request', async () => {
      const mockUser = createMockUser();
      (global.fetch as jest.Mock).mockResolvedValue(
        ApiMockUtils.mockSuccessfulResponse(mockUser)
      );
      
      const result = await userService.fetchUser('1');
      
      expect(global.fetch).toHaveBeenCalledWith('/api/users/1');
      expect(result).toEqual(mockUser);
    });
    
    it('throws error on 404 response', async () => {
      (global.fetch as jest.Mock).mockResolvedValue(
        ApiMockUtils.mockErrorResponse(404, 'User not found')
      );
      
      await expect(userService.fetchUser('999')).rejects.toThrow('User not found');
    });
    
    it('throws error on network failure', async () => {
      (global.fetch as jest.Mock).mockImplementation(() => 
        ApiMockUtils.mockNetworkError()
      );
      
      await expect(userService.fetchUser('1')).rejects.toThrow('Network error');
    });
    
    it('handles timeout errors', async () => {
      (global.fetch as jest.Mock).mockImplementation(() =>
        ApiMockUtils.mockTimeoutError()
      );
      
      await expect(userService.fetchUser('1')).rejects.toThrow('Request timeout');
    });
  });
  
  describe('updateUser', () => {
    it('updates user successfully', async () => {
      const mockUser = createMockUser();
      const updates = { name: 'Updated Name' };
      const updatedUser = { ...mockUser, ...updates };
      
      (global.fetch as jest.Mock).mockResolvedValue(
        ApiMockUtils.mockSuccessfulResponse(updatedUser)
      );
      
      const result = await userService.updateUser('1', updates);
      
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/users/1',
        expect.objectContaining({
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updates)
        })
      );
      expect(result).toEqual(updatedUser);
    });
    
    it('handles validation errors', async () => {
      (global.fetch as jest.Mock).mockResolvedValue(
        ApiMockUtils.mockErrorResponse(400, 'Validation error')
      );
      
      await expect(
        userService.updateUser('1', { name: '' })
      ).rejects.toThrow('Validation error');
    });
  });
  
  describe('searchUsers', () => {
    it('searches users with query', async () => {
      const mockUsers = [createMockUser({ name: 'John Doe' })];
      (global.fetch as jest.Mock).mockResolvedValue(
        ApiMockUtils.mockSuccessfulResponse(mockUsers)
      );
      
      const result = await userService.searchUsers('John');
      
      expect(global.fetch).toHaveBeenCalledWith('/api/users/search?q=John');
      expect(result).toEqual(mockUsers);
    });
    
    it('handles empty search results', async () => {
      (global.fetch as jest.Mock).mockResolvedValue(
        ApiMockUtils.mockSuccessfulResponse([])
      );
      
      const result = await userService.searchUsers('nonexistent');
      
      expect(result).toEqual([]);
    });
  });
});`}
          language="typescript"
          filename="services/__tests__/userService.test.ts"
          title="Service Layer Testing"
        />

        <h2>4. Context and State Testing</h2>
        <p>
          Test React Context providers, state management, and data flow throughout your application 
          to ensure proper state handling and updates.
        </p>

        <CodeBlock
          code={`// contexts/__tests__/AuthContext.test.tsx - Context testing
import React from 'react';
import { renderHook, act } from '@testing-library/react-native';
import { render, fireEvent, waitFor } from '../../test-utils/render';
import { AuthProvider, useAuth } from '../AuthContext';
import { ApiMockUtils } from '../../test-utils/api-mocks';

// Mock AsyncStorage
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

// Mock fetch
global.fetch = jest.fn();

// Test component to use auth context
function TestComponent() {
  const { user, isAuthenticated, login, logout, loading } = useAuth();
  
  return (
    <View>
      {loading && <Text testID="loading">Loading...</Text>}
      {isAuthenticated ? (
        <View>
          <Text testID="user-name">{user?.name}</Text>
          <Text testID="authenticated">Authenticated</Text>
          <Button title="Logout" onPress={logout} testID="logout-btn" />
        </View>
      ) : (
        <View>
          <Text testID="not-authenticated">Not Authenticated</Text>
          <Button 
            title="Login" 
            onPress={() => login('test@example.com', 'password')}
            testID="login-btn"
          />
        </View>
      )}
    </View>
  );
}

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAsyncStorage.clear();
  });
  
  describe('Initial State', () => {
    it('starts with unauthenticated state', () => {
      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider
      });
      
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.user).toBeNull();
      expect(result.current.loading).toBe(false);
    });
    
    it('loads saved authentication on mount', async () => {
      const mockUser = { id: '1', name: 'Test User', email: 'test@example.com' };
      mockAsyncStorage.setItem('auth-token', 'saved-token');
      mockAsyncStorage.setItem('auth-user', JSON.stringify(mockUser));
      
      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider
      });
      
      // Initial state should be loading
      expect(result.current.loading).toBe(true);
      
      await waitFor(() => {
        expect(result.current.loading).toBe(false);
        expect(result.current.isAuthenticated).toBe(true);
        expect(result.current.user).toEqual(mockUser);
      });
    });
  });
  
  describe('Login', () => {
    it('logs in successfully with valid credentials', async () => {
      const mockUser = { id: '1', name: 'Test User', email: 'test@example.com' };
      (global.fetch as jest.Mock).mockResolvedValue(
        ApiMockUtils.mockSuccessfulResponse({
          user: mockUser,
          token: 'jwt-token'
        })
      );
      
      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider
      });
      
      await act(async () => {
        await result.current.login('test@example.com', 'password');
      });
      
      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.user).toEqual(mockUser);
      expect(mockAsyncStorage.setItem).toHaveBeenCalledWith('auth-token', 'jwt-token');
      expect(mockAsyncStorage.setItem).toHaveBeenCalledWith(
        'auth-user', 
        JSON.stringify(mockUser)
      );
    });
    
    it('throws error with invalid credentials', async () => {
      (global.fetch as jest.Mock).mockResolvedValue(
        ApiMockUtils.mockErrorResponse(401, 'Invalid credentials')
      );
      
      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider
      });
      
      await expect(
        act(async () => {
          await result.current.login('wrong@example.com', 'wrongpassword');
        })
      ).rejects.toThrow('Invalid credentials');
      
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.user).toBeNull();
    });
    
    it('handles network errors during login', async () => {
      (global.fetch as jest.Mock).mockImplementation(() =>
        ApiMockUtils.mockNetworkError()
      );
      
      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider
      });
      
      await expect(
        act(async () => {
          await result.current.login('test@example.com', 'password');
        })
      ).rejects.toThrow('Network error');
    });
  });
  
  describe('Logout', () => {
    it('logs out successfully', async () => {
      // Set up authenticated state
      const mockUser = { id: '1', name: 'Test User', email: 'test@example.com' };
      mockAsyncStorage.setItem('auth-token', 'token');
      mockAsyncStorage.setItem('auth-user', JSON.stringify(mockUser));
      
      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider
      });
      
      // Wait for initial load
      await waitFor(() => {
        expect(result.current.isAuthenticated).toBe(true);
      });
      
      // Mock logout API call
      (global.fetch as jest.Mock).mockResolvedValue(
        ApiMockUtils.mockSuccessfulResponse({})
      );
      
      await act(async () => {
        await result.current.logout();
      });
      
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.user).toBeNull();
      expect(mockAsyncStorage.removeItem).toHaveBeenCalledWith('auth-token');
      expect(mockAsyncStorage.removeItem).toHaveBeenCalledWith('auth-user');
    });
  });
  
  describe('Component Integration', () => {
    it('renders authenticated state correctly', async () => {
      const mockUser = { id: '1', name: 'Test User', email: 'test@example.com' };
      mockAsyncStorage.setItem('auth-token', 'token');
      mockAsyncStorage.setItem('auth-user', JSON.stringify(mockUser));
      
      const { getByTestId } = render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
      
      await waitFor(() => {
        expect(getByTestId('authenticated')).toBeTruthy();
        expect(getByTestId('user-name')).toHaveTextContent('Test User');
      });
    });
    
    it('handles login flow through component', async () => {
      const mockUser = { id: '1', name: 'Test User', email: 'test@example.com' };
      (global.fetch as jest.Mock).mockResolvedValue(
        ApiMockUtils.mockSuccessfulResponse({
          user: mockUser,
          token: 'jwt-token'
        })
      );
      
      const { getByTestId } = render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
      
      // Initial state
      expect(getByTestId('not-authenticated')).toBeTruthy();
      
      // Login
      fireEvent.press(getByTestId('login-btn'));
      
      await waitFor(() => {
        expect(getByTestId('authenticated')).toBeTruthy();
        expect(getByTestId('user-name')).toHaveTextContent('Test User');
      });
    });
    
    it('handles logout flow through component', async () => {
      const mockUser = { id: '1', name: 'Test User', email: 'test@example.com' };
      mockAsyncStorage.setItem('auth-token', 'token');
      mockAsyncStorage.setItem('auth-user', JSON.stringify(mockUser));
      
      const { getByTestId } = render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
      
      // Wait for authenticated state
      await waitFor(() => {
        expect(getByTestId('authenticated')).toBeTruthy();
      });
      
      // Mock logout API
      (global.fetch as jest.Mock).mockResolvedValue(
        ApiMockUtils.mockSuccessfulResponse({})
      );
      
      // Logout
      fireEvent.press(getByTestId('logout-btn'));
      
      await waitFor(() => {
        expect(getByTestId('not-authenticated')).toBeTruthy();
      });
    });
  });
});`}
          language="typescript"
          filename="contexts/__tests__/AuthContext.test.tsx"
          title="Context Testing"
        />

        <h2>5. Hands-On Exercise: Complete Testing Suite</h2>
        <p>
          Build a comprehensive testing suite for a shopping cart feature that includes 
          component tests, API mocking, context testing, and integration tests.
        </p>

        <div className="bg-orange-50 dark:bg-orange-950 p-6 rounded-lg border border-orange-200 dark:border-orange-800 my-6">
          <h4 className="text-orange-800 dark:text-orange-200 font-semibold mb-3 mt-0">
            🎯 Exercise: Shopping Cart Test Suite
          </h4>
          <div className="text-orange-700 dark:text-orange-300 space-y-3">
            <div>
              <strong>Components to Test:</strong>
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li>CartItem component (individual cart items)</li>
                <li>CartSummary component (totals and checkout)</li>
                <li>ShoppingCart screen (full cart functionality)</li>
                <li>CartContext provider (state management)</li>
              </ul>
            </div>
            
            <div>
              <strong>Testing Requirements:</strong>
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li>Unit tests for all components with edge cases</li>
                <li>Mock API calls for cart operations</li>
                <li>Integration tests for cart state management</li>
                <li>User interaction flow testing</li>
                <li>Error handling and loading states</li>
              </ul>
            </div>
          </div>
        </div>

        <CodeBlock
          code={`// components/__tests__/ShoppingCart.integration.test.tsx
import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react-native';
import { render, createMockProduct } from '../../test-utils/render';
import { CartProvider } from '../../contexts/CartContext';
import { ShoppingCartScreen } from '../ShoppingCartScreen';
import { ApiMockUtils } from '../../test-utils/api-mocks';

// Mock products
const mockProducts = [
  createMockProduct({ id: '1', name: 'Product 1', price: 29.99 }),
  createMockProduct({ id: '2', name: 'Product 2', price: 49.99 }),
  createMockProduct({ id: '3', name: 'Product 3', price: 19.99 })
];

global.fetch = jest.fn();

describe('Shopping Cart Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  const renderCart = (initialItems = []) => {
    return render(
      <CartProvider initialItems={initialItems}>
        <ShoppingCartScreen />
      </CartProvider>
    );
  };
  
  describe('Empty Cart', () => {
    it('displays empty cart message', () => {
      const { getByTestId } = renderCart();
      
      expect(getByTestId('empty-cart')).toBeTruthy();
      expect(getByTestId('cart-total')).toHaveTextContent('$0.00');
    });
    
    it('disables checkout button when cart is empty', () => {
      const { getByTestId } = renderCart();
      
      const checkoutButton = getByTestId('checkout-button');
      expect(checkoutButton.props.accessibilityState.disabled).toBe(true);
    });
  });
  
  describe('Cart with Items', () => {
    const cartItems = [
      { ...mockProducts[0], quantity: 2 },
      { ...mockProducts[1], quantity: 1 }
    ];
    
    it('displays cart items correctly', () => {
      const { getByTestId, getAllByTestId } = renderCart(cartItems);
      
      expect(getAllByTestId('cart-item')).toHaveLength(2);
      expect(getByTestId('cart-total')).toHaveTextContent('$109.97'); // (29.99 * 2) + 49.99
    });
    
    it('updates quantity when increment/decrement buttons are pressed', async () => {
      const { getByTestId, getAllByTestId } = renderCart(cartItems);
      
      const incrementButtons = getAllByTestId('increment-button');
      const quantityDisplays = getAllByTestId('quantity-display');
      
      // Initial quantity
      expect(quantityDisplays[0]).toHaveTextContent('2');
      
      // Increment quantity
      fireEvent.press(incrementButtons[0]);
      
      await waitFor(() => {
        expect(quantityDisplays[0]).toHaveTextContent('3');
        expect(getByTestId('cart-total')).toHaveTextContent('$139.96'); // (29.99 * 3) + 49.99
      });
    });
    
    it('removes item when quantity reaches zero', async () => {
      const singleItemCart = [{ ...mockProducts[0], quantity: 1 }];
      const { getByTestId, queryByTestId, getAllByTestId } = renderCart(singleItemCart);
      
      const decrementButton = getAllByTestId('decrement-button')[0];
      
      // Decrement to zero
      fireEvent.press(decrementButton);
      
      await waitFor(() => {
        expect(queryByTestId('cart-item')).toBeNull();
        expect(getByTestId('empty-cart')).toBeTruthy();
      });
    });
    
    it('removes item when delete button is pressed', async () => {
      const { getAllByTestId, queryAllByTestId } = renderCart(cartItems);
      
      const deleteButtons = getAllByTestId('delete-button');
      
      // Delete first item
      fireEvent.press(deleteButtons[0]);
      
      await waitFor(() => {
        expect(queryAllByTestId('cart-item')).toHaveLength(1);
      });
    });
  });
  
  describe('Checkout Process', () => {
    const cartItems = [
      { ...mockProducts[0], quantity: 2 },
      { ...mockProducts[1], quantity: 1 }
    ];
    
    it('successfully processes checkout', async () => {
      (global.fetch as jest.Mock).mockResolvedValue(
        ApiMockUtils.mockSuccessfulResponse({ 
          orderId: 'order-123',
          status: 'confirmed'
        })
      );
      
      const { getByTestId } = renderCart(cartItems);
      
      const checkoutButton = getByTestId('checkout-button');
      fireEvent.press(checkoutButton);
      
      // Should show loading state
      await waitFor(() => {
        expect(getByTestId('checkout-loading')).toBeTruthy();
      });
      
      // Should show success state
      await waitFor(() => {
        expect(getByTestId('checkout-success')).toBeTruthy();
      });
    });
    
    it('handles checkout errors gracefully', async () => {
      (global.fetch as jest.Mock).mockResolvedValue(
        ApiMockUtils.mockErrorResponse(400, 'Payment failed')
      );
      
      const { getByTestId } = renderCart(cartItems);
      
      const checkoutButton = getByTestId('checkout-button');
      fireEvent.press(checkoutButton);
      
      await waitFor(() => {
        expect(getByTestId('checkout-error')).toBeTruthy();
        expect(getByTestId('checkout-error')).toHaveTextContent('Payment failed');
      });
    });
    
    it('retries checkout after error', async () => {
      (global.fetch as jest.Mock)
        .mockResolvedValueOnce(
          ApiMockUtils.mockErrorResponse(500, 'Server error')
        )
        .mockResolvedValueOnce(
          ApiMockUtils.mockSuccessfulResponse({ 
            orderId: 'order-123',
            status: 'confirmed'
          })
        );
      
      const { getByTestId } = renderCart(cartItems);
      
      const checkoutButton = getByTestId('checkout-button');
      fireEvent.press(checkoutButton);
      
      // Wait for error
      await waitFor(() => {
        expect(getByTestId('checkout-error')).toBeTruthy();
      });
      
      // Retry
      const retryButton = getByTestId('retry-checkout-button');
      fireEvent.press(retryButton);
      
      // Should succeed on retry
      await waitFor(() => {
        expect(getByTestId('checkout-success')).toBeTruthy();
      });
    });
  });
  
  describe('Performance and Edge Cases', () => {
    it('handles large cart efficiently', () => {
      const largeCart = Array.from({ length: 50 }, (_, i) => ({
        ...createMockProduct({ id: String(i + 1), name: \`Product \${i + 1}\` }),
        quantity: Math.floor(Math.random() * 5) + 1
      }));
      
      const startTime = Date.now();
      renderCart(largeCart);
      const renderTime = Date.now() - startTime;
      
      // Should render in reasonable time (less than 1 second)
      expect(renderTime).toBeLessThan(1000);
    });
    
    it('handles rapid button presses without errors', async () => {
      const cartItems = [{ ...mockProducts[0], quantity: 1 }];
      const { getAllByTestId } = renderCart(cartItems);
      
      const incrementButton = getAllByTestId('increment-button')[0];
      
      // Rapid button presses
      for (let i = 0; i < 10; i++) {
        fireEvent.press(incrementButton);
      }
      
      await waitFor(() => {
        const quantityDisplay = getAllByTestId('quantity-display')[0];
        expect(parseInt(quantityDisplay.props.children)).toBeGreaterThan(1);
      });
    });
  });
  
  describe('Accessibility', () => {
    it('has proper accessibility labels', () => {
      const cartItems = [{ ...mockProducts[0], quantity: 2 }];
      const { getAllByTestId } = renderCart(cartItems);
      
      const cartItem = getAllByTestId('cart-item')[0];
      const incrementButton = getAllByTestId('increment-button')[0];
      const decrementButton = getAllByTestId('decrement-button')[0];
      
      expect(cartItem.props.accessibilityRole).toBe('listitem');
      expect(incrementButton.props.accessibilityLabel).toContain('Increase quantity');
      expect(decrementButton.props.accessibilityLabel).toContain('Decrease quantity');
    });
  });
});

// Package.json test scripts
/*
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:debug": "jest --detectOpenHandles --forceExit",
    "test:ci": "jest --ci --coverage --watchAll=false"
  }
}
*/`}
          language="typescript"
          filename="components/__tests__/ShoppingCart.integration.test.tsx"
          title="Complete Integration Test Suite"
        />

        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            🎉 Session 4 Complete!
          </h4>
          <p className="text-green-700 dark:text-green-300 mb-3">
            You've mastered React Native testing with @testing-library/react-native, built comprehensive test suites, 
            effectively mocked APIs and services, and tested complex component interactions and state management.
          </p>
          <p className="text-green-700 dark:text-green-300 mb-0">
            <strong>Congratulations!</strong> You've completed Day 7 and have gained expertise in animations, 
            gesture handling, debugging, and testing - the essential skills for building robust React Native applications.
          </p>
        </div>
      </div>
    </>
  );
}