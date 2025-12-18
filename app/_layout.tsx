import { Stack } from 'expo-router';
import React from 'react';
import { AppProvider } from './contexts/AppContext';
// ...existing code...
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
