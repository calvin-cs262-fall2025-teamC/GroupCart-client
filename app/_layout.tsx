import { Stack } from 'expo-router';
import React from 'react';
import { UserProvider } from './contexts/UserContext';

export default function RootLayout(): React.ReactElement {
	return (
		<UserProvider>
			<Stack>
				{/* Hide header for tabs group - tabs will show their own header */}
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />

				{/* Pages - show header with back button */}
				<Stack.Screen
					name="pages/UserLoginPage"
					options={{
						headerShown: true,
						title: 'Login',
						headerBackTitleVisible: false,
					}}
				/>
				<Stack.Screen
					name="pages/CreateUserPage"
					options={{
						headerShown: true,
						title: 'Create Account',
						headerBackTitleVisible: false,
					}}
				/>
				<Stack.Screen
					name="pages/JoinGroupPage"
					options={{
						headerShown: true,
						title: 'Join Group',
						headerBackTitleVisible: false,
					}}
				/>
				<Stack.Screen
					name="pages/colorpicker"
					options={{
						headerShown: true,
						title: 'Profile Settings',
						headerBackTitleVisible: false,
					}}
				/>
				<Stack.Screen
					name="pages/dev"
					options={{
						headerShown: true,
						title: 'Dev Pages',
						headerBackTitleVisible: false,
					}}
				/>
				<Stack.Screen
					name="pages/demo"
					options={{
						headerShown: true,
						title: 'Demo Page',
						headerBackTitleVisible: false,
					}}
				/>
				<Stack.Screen
					name="pages/ApiTestPage"
					options={{
						headerShown: true,
						title: 'API Test',
						headerBackTitleVisible: false,
					}}
				/>
				<Stack.Screen
					name="pages/LoadingPage"
					options={{
						headerShown: false,
					}}
				/>
			</Stack>
		</UserProvider>
	);
}
