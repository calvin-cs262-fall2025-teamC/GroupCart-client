import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Requester } from '../models/Requester';

interface UserContextType {
  user: Requester | null;
  setUser: (user: Requester) => Promise<void>;
  updateUserColor: (color: string) => Promise<void>;
  updateUserDisplayName: (displayName: string) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const STORAGE_KEY = 'user_profile';

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<Requester | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const userData = JSON.parse(stored);
        setUserState(new Requester(userData));
      } else {
        // Create default user if none exists
        const defaultUser = new Requester({
          id: `user-${Date.now()}`,
          displayName: 'You',
          color: '#0079ff', // Default theme color
        });
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(defaultUser));
        setUserState(defaultUser);
      }
    } catch (error) {
      console.error('Error loading user:', error);
      // Create default user on error
      const defaultUser = new Requester({
        id: `user-${Date.now()}`,
        displayName: 'You',
        color: '#0079ff',
      });
      setUserState(defaultUser);
    } finally {
      setLoading(false);
    }
  };

  const setUser = async (newUser: Requester) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
      setUserState(newUser);
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const updateUserColor = async (color: string) => {
    if (user) {
      const updatedUser = new Requester({
        ...user,
        color,
      });
      await setUser(updatedUser);
    }
  };

  const updateUserDisplayName = async (displayName: string) => {
    if (user) {
      const updatedUser = new Requester({
        ...user,
        displayName,
      });
      await setUser(updatedUser);
    }
  };

  if (loading) {
    return null; // Or a loading spinner
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        updateUserColor,
        updateUserDisplayName,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
