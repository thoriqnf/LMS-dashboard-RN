"use client";

import { CodeBlock } from "@/components/ui/code-block-new";

export function Day2Session2Content() {
  return (
    <>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            List & Scroll - Session 2
          </h1>

          <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-8">
            <h3 className="text-blue-800 dark:text-blue-200 font-semibold mb-4 mt-0">
              📋 Session Overview
            </h3>
            <ul className="text-blue-700 dark:text-blue-300 space-y-2 mb-0">
              <li>
                <strong>FlatList Performance</strong> - Optimized lists with advanced renderItem patterns
              </li>
              <li>
                <strong>ScrollView Mastery</strong> - Nested scrolling and refresh control
              </li>
              <li>
                <strong>SectionList Advanced</strong> - Grouped data with headers and optimization
              </li>
              <li>
                <strong>List Optimization</strong> - Pull-to-refresh, lazy loading, performance tuning
              </li>
            </ul>
          </div>
        </div>

        <h2>1. Building on Your Navigation: From Screens to Data</h2>
        <p>
          In previous sessions, we built navigation between screens. Now let's focus on displaying data efficiently within those screens. 
          Remember your messages list from Day 1? Let's transform it into a professional, optimized list component.
        </p>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border">
            <h4 className="font-semibold mb-2 mt-0">📱 Previous Lists:</h4>
            <div className="text-sm space-y-1">
              <div>• Basic ScrollView with map()</div>
              <div>• Simple TouchableOpacity items</div>
              <div>• Fixed height, no optimization</div>
              <div>• Limited to small datasets</div>
            </div>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-2 mt-0">🚀 Professional Lists:</h4>
            <div className="text-blue-700 dark:text-blue-300 text-sm space-y-1">
              <div>• FlatList with virtual scrolling</div>
              <div>• Memoized renderItem components</div>
              <div>• Pull-to-refresh and infinite scroll</div>
              <div>• Handle thousands of items smoothly</div>
            </div>
          </div>
        </div>

        <h2>2. Example 1: FlatList Fundamentals</h2>

        <h3>Building on Your Messages: Professional List Implementation</h3>
        <p>
          Let's take your messages screen and transform it into a high-performance FlatList with proper optimization, 
          interactive elements, and professional patterns.
        </p>

        <CodeBlock
          code={`// app/(tabs)/messages.jsx - Enhanced with FlatList
import React, { useState, useCallback, useMemo } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  RefreshControl,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Memoized message item component for performance
const MessageItem = React.memo(({ item, onPress, onDelete, onToggleRead }) => {
  const handlePress = useCallback(() => {
    onPress(item.id);
  }, [item.id, onPress]);
  
  const handleDelete = useCallback(() => {
    Alert.alert(
      'Delete Message',
      'Are you sure you want to delete this message?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => onDelete(item.id) },
      ]
    );
  }, [item.id, onDelete]);
  
  const handleToggleRead = useCallback(() => {
    onToggleRead(item.id);
  }, [item.id, onToggleRead]);
  
  return (
    <TouchableOpacity style={styles.messageItem} onPress={handlePress}>
      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <Text style={[
            styles.messageSubject, 
            !item.read && styles.unreadText
          ]}>
            {item.subject}
          </Text>
          <Text style={styles.messageDate}>{item.date}</Text>
        </View>
        
        <Text style={styles.messagePreview} numberOfLines={2}>
          {item.preview}
        </Text>
        
        <View style={styles.messageMeta}>
          <Text style={styles.messageFrom}>From: {item.from}</Text>
          <Text style={styles.messageType}>{item.type}</Text>
        </View>
      </View>
      
      {/* Action buttons */}
      <View style={styles.messageActions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={handleToggleRead}
        >
          <Ionicons 
            name={item.read ? 'mail-outline' : 'mail-open-outline'} 
            size={20} 
            color="#007AFF" 
          />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={handleDelete}
        >
          <Ionicons name="trash-outline" size={20} color="#FF3B30" />
        </TouchableOpacity>
      </View>
      
      {/* Unread indicator */}
      {!item.read && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );
});

export default function MessagesTab() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      subject: 'Welcome to our app!',
      preview: 'Thank you for downloading our app. Here are some tips to get started with all the features...',
      from: 'Support Team',
      date: '2024-01-15',
      type: 'info',
      read: false,
    },
    {
      id: 2,
      subject: 'Your form submission was received',
      preview: 'We have received your contact form submission and will respond within 24 hours...',
      from: 'Customer Service',
      date: '2024-01-14',
      type: 'confirmation',
      read: true,
    },
    {
      id: 3,
      subject: 'New features available',
      preview: 'We have released new features including dark mode, push notifications, and improved performance...',
      from: 'Development Team',
      date: '2024-01-13',
      type: 'update',
      read: false,
    },
    // Add more messages for testing...
  ]);
  
  // Memoized callbacks for performance
  const handleMessagePress = useCallback((messageId) => {
    router.push({
      pathname: \`/message/\${messageId}\`,
      params: { from: 'messages' }
    });
  }, [router]);
  
  const handleDeleteMessage = useCallback((messageId) => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
  }, []);
  
  const handleToggleRead = useCallback((messageId) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, read: !msg.read }
          : msg
      )
    );
  }, []);
  
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    // Add a new message to simulate refresh
    const newMessage = {
      id: Date.now(),
      subject: 'Refreshed message',
      preview: 'This message was added during refresh...',
      from: 'System',
      date: new Date().toISOString().split('T')[0],
      type: 'system',
      read: false,
    };
    setMessages(prev => [newMessage, ...prev]);
    setRefreshing(false);
  }, []);
  
  // Memoized render item function
  const renderItem = useCallback(({ item }) => (
    <MessageItem
      item={item}
      onPress={handleMessagePress}
      onDelete={handleDeleteMessage}
      onToggleRead={handleToggleRead}
    />
  ), [handleMessagePress, handleDeleteMessage, handleToggleRead]);
  
  // Key extractor for performance
  const keyExtractor = useCallback((item) => item.id.toString(), []);
  
  // Item separator component
  const ItemSeparatorComponent = useCallback(() => (
    <View style={styles.separator} />
  ), []);
  
  // Empty list component
  const ListEmptyComponent = useCallback(() => (
    <View style={styles.emptyContainer}>
      <Ionicons name="mail-outline" size={64} color="#CCC" />
      <Text style={styles.emptyText}>No messages yet</Text>
      <Text style={styles.emptySubtext}>
        Messages will appear here when you receive them
      </Text>
    </View>
  ), []);
  
  // Memoized unread count
  const unreadCount = useMemo(() => 
    messages.filter(msg => !msg.read).length, 
    [messages]
  );
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        {unreadCount > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadCount}>{unreadCount}</Text>
          </View>
        )}
      </View>
      
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListEmptyComponent={ListEmptyComponent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#007AFF']}
            tintColor="#007AFF"
          />
        }
        // Performance optimizations
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={10}
        initialNumToRender={10}
        getItemLayout={(data, index) => ({
          length: 100, // Estimated item height
          offset: 100 * index,
          index,
        })}
        // Additional props
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e5e9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
  },
  unreadBadge: {
    backgroundColor: '#FF3B30',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 24,
    alignItems: 'center',
  },
  unreadCount: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  listContainer: {
    paddingBottom: 16,
  },
  messageItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 16,
    minHeight: 100,
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  messageSubject: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  unreadText: {
    fontWeight: 'bold',
    color: '#007AFF',
  },
  messageDate: {
    fontSize: 12,
    color: '#666',
    marginLeft: 8,
  },
  messagePreview: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  messageMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  messageFrom: {
    fontSize: 12,
    color: '#999',
  },
  messageType: {
    fontSize: 12,
    color: '#007AFF',
    textTransform: 'capitalize',
  },
  messageActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  actionButton: {
    padding: 8,
    marginLeft: 4,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#007AFF',
    position: 'absolute',
    top: 16,
    right: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#e1e5e9',
    marginLeft: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 64,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 32,
  },
});`}
          language="jsx"
          filename="Enhanced messages.jsx"
          title="Professional FlatList Implementation"
        />

        <div className="my-6 p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-2 mt-0">
            🎯 FlatList Performance Features:
          </h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1 mb-0">
            <li><strong>React.memo</strong> - Prevents unnecessary re-renders of list items</li>
            <li><strong>useCallback</strong> - Memoizes functions to prevent recreating on each render</li>
            <li><strong>keyExtractor</strong> - Proper key extraction for efficient updates</li>
            <li><strong>getItemLayout</strong> - Pre-calculated item heights for better scrolling</li>
            <li><strong>RefreshControl</strong> - Pull-to-refresh functionality</li>
            <li><strong>Virtual Scrolling</strong> - Only renders visible items for performance</li>
          </ul>
        </div>

        <h2>3. Example 2: ScrollView Patterns</h2>

        <h3>Building on Your Profile: Nested Scrolling and Forms</h3>
        <p>
          Let's enhance your profile screen with ScrollView patterns, perfect for forms, mixed content, 
          and situations where you need custom scroll behavior.
        </p>

        <CodeBlock
          code={`// app/(tabs)/profile.jsx - Enhanced with ScrollView patterns
import React, { useState, useCallback } from 'react';
import { 
  ScrollView, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  RefreshControl,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileTab() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    bio: 'Mobile app developer passionate about React Native and user experience design.',
    location: 'San Francisco, CA',
    website: 'https://johndoe.dev',
  });
  
  const [editedProfile, setEditedProfile] = useState(profile);
  
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    // Simulate API call to refresh profile data
    await new Promise(resolve => setTimeout(resolve, 1500));
    // In real app, you'd fetch fresh data here
    setRefreshing(false);
  }, []);
  
  const handleEdit = useCallback(() => {
    setEditing(true);
    setEditedProfile(profile);
  }, [profile]);
  
  const handleSave = useCallback(() => {
    setProfile(editedProfile);
    setEditing(false);
    Alert.alert('Success', 'Profile updated successfully!');
  }, [editedProfile]);
  
  const handleCancel = useCallback(() => {
    setEditing(false);
    setEditedProfile(profile);
  }, [profile]);
  
  const updateField = useCallback((field, value) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);
  
  const ProfileField = ({ label, value, field, multiline = false, keyboardType = 'default' }) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      {editing ? (
        <TextInput
          style={[styles.fieldInput, multiline && styles.multilineInput]}
          value={editedProfile[field]}
          onChangeText={(text) => updateField(field, text)}
          multiline={multiline}
          keyboardType={keyboardType}
          placeholder={label}
        />
      ) : (
        <Text style={styles.fieldValue}>{value}</Text>
      )}
    </View>
  );
  
  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#007AFF']}
            tintColor="#007AFF"
          />
        }
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={40} color="white" />
            </View>
            <TouchableOpacity style={styles.cameraButton}>
              <Ionicons name="camera" size={16} color="white" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.displayName}>{profile.name}</Text>
          <Text style={styles.email}>{profile.email}</Text>
        </View>
        
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>Messages</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Forms Sent</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>156</Text>
            <Text style={styles.statLabel}>Days Active</Text>
          </View>
        </View>
        
        {/* Profile Information */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Profile Information</Text>
            {!editing ? (
              <TouchableOpacity onPress={handleEdit}>
                <Ionicons name="create-outline" size={24} color="#007AFF" />
              </TouchableOpacity>
            ) : (
              <View style={styles.editActions}>
                <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                  <Text style={styles.saveText}>Save</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          
          <View style={styles.fieldsContainer}>
            <ProfileField 
              label="Full Name" 
              value={profile.name} 
              field="name"
            />
            <ProfileField 
              label="Email" 
              value={profile.email} 
              field="email"
              keyboardType="email-address"
            />
            <ProfileField 
              label="Phone" 
              value={profile.phone} 
              field="phone"
              keyboardType="phone-pad"
            />
            <ProfileField 
              label="Location" 
              value={profile.location} 
              field="location"
            />
            <ProfileField 
              label="Website" 
              value={profile.website} 
              field="website"
              keyboardType="url"
            />
            <ProfileField 
              label="Bio" 
              value={profile.bio} 
              field="bio"
              multiline={true}
            />
          </View>
        </View>
        
        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsContainer}>
            <TouchableOpacity 
              style={styles.actionItem}
              onPress={() => router.push('/modal/edit-profile')}
            >
              <Ionicons name="settings-outline" size={24} color="#007AFF" />
              <Text style={styles.actionText}>Settings</Text>
              <Ionicons name="chevron-forward" size={20} color="#CCC" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionItem}>
              <Ionicons name="help-circle-outline" size={24} color="#007AFF" />
              <Text style={styles.actionText}>Help & Support</Text>
              <Ionicons name="chevron-forward" size={20} color="#CCC" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionItem}>
              <Ionicons name="share-outline" size={24} color="#007AFF" />
              <Text style={styles.actionText}>Share Profile</Text>
              <Ionicons name="chevron-forward" size={20} color="#CCC" />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Extra space for keyboard */}
        <View style={styles.bottomSpace} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: 'white',
    marginBottom: 16,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#34C759',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  displayName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    marginHorizontal: 4,
    borderRadius: 12,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  section: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  editActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cancelButton: {
    marginRight: 16,
  },
  cancelText: {
    color: '#666',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  saveText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  fieldsContainer: {
    gap: 16,
  },
  fieldContainer: {
    gap: 8,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  fieldValue: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  fieldInput: {
    borderWidth: 1,
    borderColor: '#e1e5e9',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  actionsContainer: {
    gap: 1,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  actionText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  bottomSpace: {
    height: 50,
  },
});`}
          language="jsx"
          filename="Enhanced profile.jsx"
          title="Advanced ScrollView with Forms"
        />

        <div className="my-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-2 mt-0">
            🆕 ScrollView Advanced Features:
          </h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
            <li><strong>KeyboardAvoidingView</strong> - Proper keyboard handling for forms</li>
            <li><strong>RefreshControl</strong> - Pull-to-refresh in ScrollView</li>
            <li><strong>keyboardShouldPersistTaps</strong> - Tap handling with keyboard open</li>
            <li><strong>Mixed Content</strong> - Headers, forms, actions, and cards</li>
            <li><strong>Inline Editing</strong> - Toggle between view and edit modes</li>
          </ul>
        </div>

        <h2>4. Example 3: SectionList Advanced</h2>

        <h3>Building on Your Data: Grouped Lists with Headers</h3>
        <p>
          Let's create a comprehensive contacts or settings screen using SectionList, perfect for 
          organizing related items with headers, footers, and section-specific actions.
        </p>

        <CodeBlock
          code={`// app/contacts.jsx - Advanced SectionList implementation
import React, { useState, useCallback, useMemo } from 'react';
import { 
  SectionList, 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet,
  RefreshControl,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Memoized contact item component
const ContactItem = React.memo(({ item, onPress, onCall, onMessage }) => {
  const handlePress = useCallback(() => {
    onPress(item);
  }, [item, onPress]);
  
  const handleCall = useCallback(() => {
    onCall(item);
  }, [item, onCall]);
  
  const handleMessage = useCallback(() => {
    onMessage(item);
  }, [item, onMessage]);
  
  return (
    <TouchableOpacity style={styles.contactItem} onPress={handlePress}>
      <View style={styles.contactInfo}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {item.name.charAt(0).toUpperCase()}
          </Text>
        </View>
        
        <View style={styles.contactDetails}>
          <Text style={styles.contactName}>{item.name}</Text>
          <Text style={styles.contactRole}>{item.role}</Text>
          <Text style={styles.contactEmail}>{item.email}</Text>
        </View>
      </View>
      
      <View style={styles.contactActions}>
        <TouchableOpacity style={styles.actionButton} onPress={handleCall}>
          <Ionicons name="call" size={20} color="#34C759" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={handleMessage}>
          <Ionicons name="chatbubble" size={20} color="#007AFF" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
});

// Memoized section header component
const SectionHeader = React.memo(({ section, onAddContact }) => {
  const handleAdd = useCallback(() => {
    onAddContact(section.title);
  }, [section.title, onAddContact]);
  
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      <Text style={styles.sectionCount}>
        {section.data.length} contact{section.data.length !== 1 ? 's' : ''}
      </Text>
      <TouchableOpacity onPress={handleAdd}>
        <Ionicons name="add-circle-outline" size={24} color="#007AFF" />
      </TouchableOpacity>
    </View>
  );
});

export default function ContactsScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [contacts, setContacts] = useState([
    {
      title: 'Team',
      data: [
        {
          id: 1,
          name: 'Alice Johnson',
          role: 'Product Manager',
          email: 'alice@company.com',
          phone: '+1 (555) 123-4567',
        },
        {
          id: 2,
          name: 'Bob Smith',
          role: 'Developer',
          email: 'bob@company.com',
          phone: '+1 (555) 234-5678',
        },
        {
          id: 3,
          name: 'Carol Davis',
          role: 'Designer',
          email: 'carol@company.com',
          phone: '+1 (555) 345-6789',
        },
      ],
    },
    {
      title: 'Clients',
      data: [
        {
          id: 4,
          name: 'David Wilson',
          role: 'CEO',
          email: 'david@clientco.com',
          phone: '+1 (555) 456-7890',
        },
        {
          id: 5,
          name: 'Emma Brown',
          role: 'Marketing Director',
          email: 'emma@clientco.com',
          phone: '+1 (555) 567-8901',
        },
      ],
    },
    {
      title: 'Favorites',
      data: [
        {
          id: 6,
          name: 'Frank Miller',
          role: 'Mentor',
          email: 'frank@mentor.com',
          phone: '+1 (555) 678-9012',
        },
      ],
    },
  ]);
  
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  }, []);
  
  const handleContactPress = useCallback((contact) => {
    router.push({
      pathname: '/contact-detail',
      params: { contactId: contact.id }
    });
  }, [router]);
  
  const handleCall = useCallback((contact) => {
    Alert.alert(
      'Call Contact',
      \`Call \${contact.name} at \${contact.phone}?\`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call', onPress: () => console.log('Calling:', contact.phone) },
      ]
    );
  }, []);
  
  const handleMessage = useCallback((contact) => {
    router.push({
      pathname: '/modal/message-compose',
      params: { 
        recipient: contact.email,
        recipientName: contact.name,
      }
    });
  }, [router]);
  
  const handleAddContact = useCallback((sectionTitle) => {
    Alert.alert(
      'Add Contact',
      \`Add a new contact to \${sectionTitle}?\`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Add', onPress: () => console.log('Adding to:', sectionTitle) },
      ]
    );
  }, []);
  
  const renderItem = useCallback(({ item }) => (
    <ContactItem
      item={item}
      onPress={handleContactPress}
      onCall={handleCall}
      onMessage={handleMessage}
    />
  ), [handleContactPress, handleCall, handleMessage]);
  
  const renderSectionHeader = useCallback(({ section }) => (
    <SectionHeader section={section} onAddContact={handleAddContact} />
  ), [handleAddContact]);
  
  const keyExtractor = useCallback((item) => item.id.toString(), []);
  
  const ItemSeparatorComponent = useCallback(() => (
    <View style={styles.itemSeparator} />
  ), []);
  
  const SectionSeparatorComponent = useCallback(() => (
    <View style={styles.sectionSeparator} />
  ), []);
  
  // Memoized total contacts count
  const totalContacts = useMemo(() => 
    contacts.reduce((sum, section) => sum + section.data.length, 0),
    [contacts]
  );
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Contacts</Text>
        <Text style={styles.subtitle}>{totalContacts} total contacts</Text>
      </View>
      
      <SectionList
        sections={contacts}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={ItemSeparatorComponent}
        SectionSeparatorComponent={SectionSeparatorComponent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#007AFF']}
            tintColor="#007AFF"
          />
        }
        // Performance optimizations
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={10}
        initialNumToRender={10}
        // Sticky headers
        stickySectionHeadersEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e5e9',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  listContainer: {
    paddingBottom: 20,
  },
  sectionHeader: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e5e9',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  sectionCount: {
    fontSize: 14,
    color: '#666',
    marginRight: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
  },
  contactInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  contactDetails: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  contactRole: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  contactEmail: {
    fontSize: 12,
    color: '#999',
  },
  contactActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 8,
    marginLeft: 4,
  },
  itemSeparator: {
    height: 1,
    backgroundColor: '#e1e5e9',
    marginLeft: 78,
  },
  sectionSeparator: {
    height: 8,
    backgroundColor: '#f8f9fa',
  },
});`}
          language="jsx"
          filename="contacts.jsx"
          title="Advanced SectionList with Headers"
        />

        <div className="my-6 p-4 bg-purple-50 dark:bg-purple-950 rounded-lg border border-purple-200 dark:border-purple-800">
          <h4 className="text-purple-800 dark:text-purple-200 font-semibold mb-2 mt-0">
            🔄 SectionList Advanced Features:
          </h4>
          <ul className="text-purple-700 dark:text-purple-300 text-sm space-y-1 mb-0">
            <li><strong>Section Headers</strong> - Custom headers with actions and counts</li>
            <li><strong>Sticky Headers</strong> - Headers remain visible during scroll</li>
            <li><strong>Section Separators</strong> - Visual separation between sections</li>
            <li><strong>Performance Optimized</strong> - Memoized components and callbacks</li>
            <li><strong>Interactive Elements</strong> - Actions within headers and items</li>
          </ul>
        </div>

        <h2>5. List Optimization Deep Dive</h2>

        <h3>Performance Patterns and Best Practices</h3>
        <CodeBlock
          code={`// Advanced optimization techniques for all list types
import { useMemo, useCallback, memo } from 'react';

// 1. Memoized List Item Component
const OptimizedListItem = memo(({ item, onPress, onAction }) => {
  // Memoize expensive calculations
  const computedValue = useMemo(() => {
    return expensiveCalculation(item.data);
  }, [item.data]);
  
  // Memoize callbacks to prevent re-renders
  const handlePress = useCallback(() => {
    onPress(item.id);
  }, [item.id, onPress]);
  
  return (
    <TouchableOpacity onPress={handlePress}>
      <Text>{item.title}</Text>
      <Text>{computedValue}</Text>
    </TouchableOpacity>
  );
});

// 2. Optimized FlatList Configuration
const OptimizedFlatList = () => {
  const data = useMemo(() => processData(rawData), [rawData]);
  
  const renderItem = useCallback(({ item }) => (
    <OptimizedListItem item={item} onPress={handlePress} />
  ), [handlePress]);
  
  const keyExtractor = useCallback((item) => item.id.toString(), []);
  
  const getItemLayout = useCallback((data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  }), []);
  
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      getItemLayout={getItemLayout}
      // Performance optimizations
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      windowSize={5}
      initialNumToRender={10}
      updateCellsBatchingPeriod={50}
      // Memory optimization
      onEndReachedThreshold={0.5}
      onEndReached={loadMoreData}
      // Improve scroll performance
      showsVerticalScrollIndicator={false}
      overScrollMode="never"
    />
  );
};

// 3. Infinite Loading Pattern
const InfiniteScrollList = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  
  const loadMoreData = useCallback(async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    try {
      const newData = await fetchMoreData(data.length);
      setData(prev => [...prev, ...newData]);
      setHasMore(newData.length > 0);
    } catch (error) {
      console.error('Failed to load more data:', error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, data.length]);
  
  const ListFooterComponent = useCallback(() => {
    if (!loading) return null;
    return (
      <View style={styles.loadingFooter}>
        <ActivityIndicator size="small" color="#007AFF" />
        <Text style={styles.loadingText}>Loading more...</Text>
      </View>
    );
  }, [loading]);
  
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onEndReached={loadMoreData}
      onEndReachedThreshold={0.5}
      ListFooterComponent={ListFooterComponent}
    />
  );
};

// 4. Search and Filter Optimization
const SearchableList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  
  // Debounced search
  const debouncedSearch = useMemo(
    () => debounce((query) => {
      const filtered = data.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.email.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    }, 300),
    [data]
  );
  
  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery, debouncedSearch]);
  
  return (
    <View>
      <TextInput
        placeholder="Search contacts..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchInput}
      />
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        // Show "No results" when filtered list is empty
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>No results found</Text>
        )}
      />
    </View>
  );
};`}
          language="jsx"
          filename="optimization-patterns.jsx"
          title="Advanced List Optimization Patterns"
        />

        <h2>6. Hands-On Exercise</h2>

        <div className="my-6 p-4 bg-orange-50 dark:bg-orange-950 rounded-lg border border-orange-200 dark:border-orange-800">
          <h4 className="text-orange-800 dark:text-orange-200 font-semibold mb-3 mt-0">
            🎯 Your List Mastery Challenge:
          </h4>
          <p className="text-orange-700 dark:text-orange-300 text-sm mb-3">
            Transform your existing app screens with professional list components:
          </p>
          <ul className="text-orange-700 dark:text-orange-300 text-sm space-y-1 mb-0">
            <li><strong>Step 1</strong> - Convert your messages screen to use optimized FlatList</li>
            <li><strong>Step 2</strong> - Enhance your profile with ScrollView and forms</li>
            <li><strong>Step 3</strong> - Create a contacts screen using SectionList</li>
            <li><strong>Step 4</strong> - Add pull-to-refresh and infinite loading</li>
            <li><strong>Step 5</strong> - Optimize performance with memoization</li>
          </ul>
        </div>

        <h3>🎉 What You've Mastered</h3>
        <div className="my-6 p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-2 mb-0">
            <li><strong>FlatList Performance</strong> - Virtual scrolling, memoization, and optimization</li>
            <li><strong>ScrollView Mastery</strong> - Forms, keyboard handling, and mixed content</li>
            <li><strong>SectionList Advanced</strong> - Grouped data with headers and sticky sections</li>
            <li><strong>Pull-to-Refresh</strong> - RefreshControl implementation across all list types</li>
            <li><strong>Memory Optimization</strong> - Proper key extraction and component memoization</li>
            <li><strong>Professional Patterns</strong> - Industry-standard list implementations</li>
          </ul>
        </div>

        <div className="my-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-3 mt-0">
            🚀 Coming Next - Session 3:
          </h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
            <li>React hooks deep dive (useCallback, useMemo, useEffect)</li>
            <li>Custom hooks for reusable logic</li>
            <li>Performance optimization strategies</li>
            <li>Advanced state management patterns</li>
          </ul>
        </div>

        <p className="text-lg font-semibold text-center mt-8 mb-4">
          You now master React Native lists and scrolling! 📋🚀
        </p>
      </div>
    </>
  );
}