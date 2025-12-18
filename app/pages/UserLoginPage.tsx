import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import React, { useState } from 'react';
import {
	Alert,
	Image,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import LoadingCircle from '../components/LoadingCircle';
import { useAppContext } from '../contexts/AppContext';

export default function UserLoginPage(): React.ReactElement | null {
	// ===== Contexts =====
	const { user, loadUser, group, loadGroup } = useAppContext();

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
				headerTitle: 'Login',
				headerTitleStyle: {
					fontWeight: 'bold',
					fontSize: 24,
					fontFamily: 'Montserrat',
				},
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
	const onLogin = async () => {
		if (!username.trim()) {
			Alert.alert('Missing Login', 'Please enter a UserName.');
			return;
		}
		setIsLoading(true);
		try {
			// Attempt to load user from API
			await loadUser(username);

			// Navigate only on success
			(navigation as any).navigate('pages/JoinGroupPage');
		} catch (err: any) {
			// Check the error message
			switch (err.message) {
				case "USER_NOT_FOUND":
					Alert.alert('Invalid Login', `Unable to find user: ${username}`);
					break;
				case "NETWORK_ERROR":
					Alert.alert("Error", "There was a problem connecting to the server. Try again later.");
					break;
				default:
					Alert.alert("Error", "An unexpected error occurred.");
			}
		} finally {
			// Always reset loading state
			setIsLoading(false);
		}
	};


	const onCreate = async () => {
		(navigation as any).navigate('pages/CreateUserPage');
	};

	// ===== Render =====
	return (
		<View style={styles.container}>
			<Image
				style={styles.image}
				source={require('@/assets/images/logo.png')}
			/>

			{/* Username Input */}
			<TextInput
				style={styles.input}
				placeholder="Enter Your Username"
				placeholderTextColor="#888"
				value={username}
				onChangeText={setUsername}
				autoCapitalize="none"
				keyboardType="default"
				editable={!isLoading}
			/>

			{/* Login Button */}
			<TouchableOpacity
				style={styles.loginButton}
				onPress={onLogin}
				activeOpacity={0.8}
				disabled={isLoading}
			>
				<Text style={styles.loginButtonText}>Login</Text>
			</TouchableOpacity>

			{/* Divider */}
			<View style={styles.dividerRow}>
				<View style={styles.divider} />
				<Text style={styles.orText}>OR</Text>
				<View style={styles.divider} />
			</View>

			{/* Create Account Button */}
			<TouchableOpacity
				style={styles.createButton}
				onPress={onCreate}
				activeOpacity={0.8}
				disabled={isLoading}
			>
				<Text style={styles.createButtonText}>Create New Account</Text>
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
		flexDirection: 'column',
		padding: 24,
		justifyContent: 'center',
		backgroundColor: '#ffffff',
	},

	// ===== Image =====
	image: {
		width: '50%',
		height: '35%',
		resizeMode: 'contain',
		marginTop: -150,
		marginBottom: 10,
		alignSelf: 'center',
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

	// ===== Login Button =====
	loginButton: {
		backgroundColor: '#360479ff',
		padding: 12,
		borderRadius: 15,
		alignItems: 'center',
	},

	loginButtonText: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 16,
		fontFamily: 'Montserrat',
	},

	// ===== Divider =====
	dividerRow: {
		flexDirection: 'row',
		alignItems: 'center',
		marginVertical: 20,
	},

	divider: {
		flex: 1,
		height: 1,
		backgroundColor: '#eee',
	},

	orText: {
		marginHorizontal: 12,
		color: '#666',
		fontWeight: '600',
		fontFamily: 'Montserrat',
	},

	// ===== Create Button =====
	createButton: {
		borderWidth: 1,
		borderColor: '#360479ff',
		padding: 12,
		borderRadius: 15,
		alignItems: 'center',
	},

	createButtonText: {
		color: '#360479ff',
		fontWeight: 'bold',
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