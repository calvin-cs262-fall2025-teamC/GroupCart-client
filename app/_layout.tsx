import { Stack } from 'expo-router';
import React from 'react';
import { AppProvider } from './contexts/AppContext';

/**
 * Root layout with navigation and global app context.
 * Depends on context: AppProvider
 * Has side effects: Initializes navigation structure
 * 
 * @component
 * @returns {React.ReactElement} Navigation stack wrapped in AppProvider
 */
export default function RootLayout(): React.ReactElement {
  // const navigation = useNavigation();
  return (
      <AppProvider>
        <Stack>
          {/* Render the (tabs) group as the default/main area */}
          <Stack.Screen name="pages/UserLoginPage" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </AppProvider>
  );
}
