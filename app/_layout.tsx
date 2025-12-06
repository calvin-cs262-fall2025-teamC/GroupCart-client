import { Stack } from 'expo-router';
import React from 'react';
import { UserProvider } from './contexts/UserContext';
// ...existing code...
export default function RootLayout(): React.ReactElement {
  // const navigation = useNavigation();
  return (
    <UserProvider>
      <Stack screenOptions={{ headerShown: false }}>
      {/* Render the (tabs) group as the default/main area */}
      <Stack.Screen name="pages/UserLoginPage" options={{ headerShown: false }} />
      </Stack>
    </UserProvider >
  );
}
