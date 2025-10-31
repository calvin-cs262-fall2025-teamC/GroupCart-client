import { Stack } from 'expo-router';
import React from 'react';
// ...existing code...
export default function RootLayout(): React.ReactElement {
  return (
    <Stack>
      {/* Render the (tabs) group as the default/main area */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
