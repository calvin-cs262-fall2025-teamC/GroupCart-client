import { Stack } from 'expo-router';
import React from 'react';
import { UserProvider } from './contexts/UserContext';
// ...existing code...
export default function RootLayout(): React.ReactElement {
  return (
    <UserProvider>
      <Stack>
        {/* Render the (tabs) group as the default/main area */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </UserProvider>
  );
}
