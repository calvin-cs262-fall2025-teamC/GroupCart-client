import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import LoadingCircle from '../components/LoadingCircle';

export default function CreateUserPage(): React.ReactElement | null {
	// ===== Hooks =====
	const navigation = useNavigation();
	const [username, setUsername] = useState('');
	const [isLoading, setIsLoading] = useState(false);
  let [fontsLoaded] = useFonts({
      'Shanti': require('../../assets/images/Shanti-Regular.ttf'),
      'Montserrat': require('../../assets/images/Montserrat-Regular.ttf'),
    });

	// ===== Effects =====
	React.useLayoutEffect(() => {
		try {
			(navigation as any).setOptions({
				headerTitle: ' ',
			});
		} catch (error: unknown) {
			console.error(error);
		}
	}, [navigation]);
  if (!fontsLoaded) {
      SplashScreen.preventAutoHideAsync();
      return null;
    }
	// ===== Handlers =====
	const onCreate = async () => {
		if (!username.trim()) {
			Alert.alert('Missing username', 'Please enter a username');
			return;
		}

		setIsLoading(true);
		try {
			// TODO: Replace with real API call
			await new Promise((resolve) => setTimeout(resolve, 2000));
			Alert.alert('Success', `Account created: ${username}`);
			// TODO: Navigate to home screen
		} catch {
			Alert.alert('Error', 'Failed to create account');
		} finally {
			setIsLoading(false);
		}
	};

	// ===== Render =====
	return (
		<View style={styles.container}>
			{/* Title */}
			<Text style={styles.title}>Create Account</Text>

			{/* Username Input */}
			<TextInput
				style={styles.input}
				placeholder="Username"
				value={username}
				onChangeText={setUsername}
				autoCapitalize="none"
				editable={!isLoading}
			/>

			{/* Create Button */}
			<TouchableOpacity
				style={styles.button}
				onPress={onCreate}
				disabled={isLoading}
			>
				<Text style={styles.buttonText}>Create</Text>
			</TouchableOpacity>

			{/* Loading Modal Overlay */}
			{isLoading && (
				<View style={styles.loadingOverlay}>
					<LoadingCircle size={80} color="#360479" strokeWidth={5} />
				</View>
			)}
		</View>
	);

}

const styles = StyleSheet.create({
	// ===== Container =====
	container: {
		flex: 1,
		padding: 20,
		justifyContent: 'center',
		backgroundColor: '#fff',
    marginTop: -100,
	},

	// ===== Typography =====
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 24,
		textAlign: 'center',
		color: '#111',
		fontFamily: 'Montserrat',
	},

	// ===== Input =====
	input: {
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 30,
		padding: 12,
		marginBottom: 12,
		fontSize: 16,
		color: '#111',
		fontFamily: 'Montserrat',
	},

	// ===== Create Button =====
	button: {
		backgroundColor: '#360479ff',
		padding: 12,
		borderRadius: 15,
		alignItems: 'center',
	},

	buttonText: {
		color: '#fff',
		fontWeight: '700',
		fontSize: 16,
		fontFamily: 'Montserrat',
	},

	// ===== Loading Overlay =====
	// White background overlay that displays the loading circle during async operations
	loadingOverlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: 'center',
		alignItems: 'center',
	 backgroundColor: '#ffffffbe',// Clean white background instead of dark overlay
	},
});
