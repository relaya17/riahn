import React, {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';

interface User {
  id: string;
  email: string;
  name: string;
  profileImage?: string;
  nativeLanguage: string;
  learningLanguages: string[];
  currentLevel: string;
  role: string;
  isOnline: boolean;
  lastSeen: Date;
  preferences: {
    theme: string;
    notifications: {
      lessons: boolean;
      messages: boolean;
      forums: boolean;
      achievements: boolean;
    };
    privacy: {
      showOnlineStatus: boolean;
      allowMessages: boolean;
      showProgress: boolean;
    };
  };
  createdAt: Date;
  updatedAt: Date;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: {
    email: string;
    password: string;
    name: string;
    nativeLanguage: string;
  }) => Promise<boolean>;
  logout: () => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const credentials = await Keychain.getInternetCredentials('auth');
      if (credentials) {
        // Here you would validate the token with your backend
        // For now, we'll just set a mock user
        setUser({
          id: '1',
          email: credentials.username,
          name: 'משתמש לדוגמה',
          nativeLanguage: 'he',
          learningLanguages: ['en'],
          currentLevel: 'beginner',
          role: 'user',
          isOnline: true,
          lastSeen: new Date(),
          preferences: {
            theme: 'light',
            notifications: {
              lessons: true,
              messages: true,
              forums: true,
              achievements: true,
            },
            privacy: {
              showOnlineStatus: true,
              allowMessages: true,
              showProgress: true,
            },
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      // Here you would make an API call to your backend
      // For now, we'll simulate a successful login
      if (email && password) {
        await Keychain.setInternetCredentials('auth', email, 'mock-token');
        
        setUser({
          id: '1',
          email,
          name: 'משתמש לדוגמה',
          nativeLanguage: 'he',
          learningLanguages: ['en'],
          currentLevel: 'beginner',
          role: 'user',
          isOnline: true,
          lastSeen: new Date(),
          preferences: {
            theme: 'light',
            notifications: {
              lessons: true,
              messages: true,
              forums: true,
              achievements: true,
            },
            privacy: {
              showOnlineStatus: true,
              allowMessages: true,
              showProgress: true,
            },
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: {
    email: string;
    password: string;
    name: string;
    nativeLanguage: string;
  }): Promise<boolean> => {
    try {
      setLoading(true);
      
      // Here you would make an API call to your backend
      // For now, we'll simulate a successful registration
      await Keychain.setInternetCredentials('auth', userData.email, 'mock-token');
      
      setUser({
        id: '1',
        email: userData.email,
        name: userData.name,
        nativeLanguage: userData.nativeLanguage,
        learningLanguages: ['en'],
        currentLevel: 'beginner',
        role: 'user',
        isOnline: true,
        lastSeen: new Date(),
        preferences: {
          theme: 'light',
          notifications: {
            lessons: true,
            messages: true,
            forums: true,
            achievements: true,
          },
          privacy: {
            showOnlineStatus: true,
            allowMessages: true,
            showProgress: true,
          },
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await Keychain.resetInternetCredentials('auth');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateProfile = async (userData: Partial<User>): Promise<boolean> => {
    try {
      if (user) {
        const updatedUser = {...user, ...userData, updatedAt: new Date()};
        setUser(updatedUser);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Update profile error:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateProfile,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
