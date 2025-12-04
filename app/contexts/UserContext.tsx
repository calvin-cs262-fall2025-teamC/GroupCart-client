import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Group } from '../models/Group';
import { Requester } from '../models/Requester';
interface UserContextType {
  user: Requester | null;
  setUser: (user: Requester) => Promise<void>;
  updateUserColor: (color: string) => Promise<void>;
  updateUserDisplayName: (displayName: string) => Promise<void>;
   group: Group | null;                // ✅ now recognized
  setGroup: (group: Group | null) => void;

}

const UserContext = createContext<UserContextType | undefined>(undefined);

const GROUP_STORAGE_KEY = "user_group";
const STORAGE_KEY = 'user_profile';

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<Requester | null>(null);
  const [group, setGroupState] = useState<Group | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingGroup, setLoadingGroup] = useState(true);

  useEffect(() => {
    loadUser().finally(() => setLoadingUser(false));
    loadGroup().finally(() => setLoadingGroup(false));
  }, []);

  const loadGroup = async () => {
    try {
      const stored = await AsyncStorage.getItem(GROUP_STORAGE_KEY);
      if (stored) {
        setGroupState(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading group:", error);
    }
  };

  const setGroup = async (newGroup: Group | null) => {
    try {
      if (newGroup) {
        await AsyncStorage.setItem(GROUP_STORAGE_KEY, JSON.stringify(newGroup));
      } else {
        await AsyncStorage.removeItem(GROUP_STORAGE_KEY);
      }
      setGroupState(newGroup);
    } catch (error) {
      console.error("Error saving group:", error);
    }
  };

  const loadUser = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const userData = JSON.parse(stored);
        setUserState(new Requester(userData));
      } else {
        const defaultUser = new Requester({
          id: `user-${Date.now()}`,
          displayName: "You",
          color: "#0079ff",
        });
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(defaultUser));
        setUserState(defaultUser);
      }
    } catch (error) {
      console.error("Error loading user:", error);
      const defaultUser = new Requester({
        id: `user-${Date.now()}`,
        displayName: "You",
        color: "#0079ff",
      });
      setUserState(defaultUser);
    }
  };

  const setUser = async (newUser: Requester) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
      setUserState(newUser);
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const updateUserColor = async (color: string) => {
    if (user) {
      const updatedUser = new Requester({ ...user, color });
      await setUser(updatedUser);
    }
  };

  const updateUserDisplayName = async (displayName: string) => {
    if (user) {
      const updatedUser = new Requester({ ...user, displayName });
      await setUser(updatedUser);
    }
  };

  // ✅ handle loading here, not before hooks
  if (loadingUser || loadingGroup) {
    return null; // or spinner
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        updateUserColor,
        updateUserDisplayName,
        group,
        setGroup,
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
