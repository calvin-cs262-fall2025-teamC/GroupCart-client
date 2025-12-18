import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import LoadingCircle from '../components/LoadingCircle';
import { useAppContext } from '../contexts/AppContext';


export default function CreateUserPage(): React.ReactElement | null {
	// ===== Contexts =====
	const { user, loadUser, createNewUser } = useAppContext();

	// ===== Hooks =====
	const navigation = useNavigation();
	const [username, setUsername] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	let [fontsLoaded] = useFonts({
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
			Alert.alert('Missing Username', 'Please fill in a username');
			return;
		}

		setIsLoading(true);
		try {
			await createNewUser({username : username, firstName : firstName, lastName : lastName});
			await loadUser(username);

			// Success!
			Alert.alert("Success", "User created");
		} catch (err: any) {
			// Check the error message
			switch (err.message) {
				case "USER_ALREADY_EXISTS":
					Alert.alert("Sorry", "This username is already taken. Please choose another.");
					break;
				case "NETWORK_ERROR":
					Alert.alert("Error", "There was a problem connecting to the server. Try again later.");
					break;
				default:
					Alert.alert("Error", "An unexpected error occurred.");
			}
		} finally {
			setIsLoading(false);
		}
	};

	// ===== Render =====
	return (
		<View style={styles.container}>
			{/* Logo Placeholder */}
			<View style={styles.logoContainer}>
				<View style={styles.logoPlaceholder} />
			</View>

			{/* Title Section */}
			<Text style={styles.title}>Create Account</Text>
			<Text style={styles.subtitle}>Hello! Welcome to Group Cart</Text>

			{/* Username Input */}
			<Text style={styles.label}>Username*</Text>
			<TextInput
				style={styles.input}
				placeholder="Enter your username"
				value={username}
				onChangeText={setUsername}
				autoCapitalize="none"
				editable={!isLoading}
			/>

			{/* Firstname Input */}
			<Text style={styles.label}>First Name*</Text>
			<TextInput
				style={styles.input}
				placeholder="Enter your First Name"
				value={firstName}
				onChangeText={setFirstName}
				autoCapitalize="none"
				editable={!isLoading}
			/>

			{/* Lastname Input */}
			<Text style={styles.label}>Last Name*</Text>
			<TextInput
				style={styles.input}
				placeholder="Enter your First Name"
				value={lastName}
				onChangeText={setLastName}
				autoCapitalize="none"
				editable={!isLoading}
			/>

			{/* Create Button */}
			<TouchableOpacity
				style={styles.button}
				onPress={onCreate}
				disabled={isLoading}
			>
				<Text style={styles.buttonText}>Create account</Text>
			</TouchableOpacity>

			{/* Divider */}
			<View style={styles.dividerContainer}>
				<View style={styles.divider} />
				<Text style={styles.dividerText}>OR</Text>
				<View style={styles.divider} />
			</View>

			{/* Social Login Buttons */}
			<View style={styles.socialContainer}>
				<TouchableOpacity style={styles.socialButton}>
					<FontAwesome name="google" size={24} color="#111" />
				</TouchableOpacity>
				<TouchableOpacity style={styles.socialButton}>
					<FontAwesome name="facebook" size={24} color="#111" />
				</TouchableOpacity>
				<TouchableOpacity style={styles.socialButton}>
					<FontAwesome5 name="apple" size={24} color="#111" />
				</TouchableOpacity>
			</View>

			{/* Log In Link */}
			<View style={styles.loginContainer}>
				<Text style={styles.loginText}>Have an account? </Text>
				<TouchableOpacity>
					<Text style={styles.loginLink}>Log in</Text>
				</TouchableOpacity>
			</View>

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
		backgroundColor: '#fff',
		marginTop: -100,
	},

	// ===== Logo =====
	logoContainer: {
		paddingTop: 20,
		paddingBottom: 40,
	},

	logoPlaceholder: {
		width: 60,
		height: 60,
		borderWidth: 2,
		borderColor: '#ddd',
		borderRadius: 8,
		backgroundColor: '#f5f5f5',
	},

	// ===== Typography =====
	title: {
		fontSize: 28,
		fontWeight: 'bold',
		marginBottom: 8,
		color: '#111',
		fontFamily: 'Montserrat',
	},

	subtitle: {
		fontSize: 14,
		color: '#666',
		marginBottom: 32,
		fontFamily: 'Montserrat',
	},

	label: {
		fontSize: 14,
		color: '#111',
		marginBottom: 8,
		fontFamily: 'Montserrat',
	},

	// ===== Input =====
	input: {
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 20,
		padding: 14,
		marginBottom: 16,
		fontSize: 14,
		color: '#111',
		fontFamily: 'Montserrat',
		backgroundColor: '#f9f9f9',
	},

	// ===== Create Button =====
	button: {
		backgroundColor: '#360479',
		padding: 14,
		borderRadius: 25,
		alignItems: 'center',
		marginTop: 8,
		marginBottom: 24,
	},

	buttonText: {
		color: '#fff',
		fontWeight: '700',
		fontSize: 16,
		fontFamily: 'Montserrat',
	},

	// ===== Divider =====
	dividerContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginVertical: 24,
	},

	divider: {
		flex: 1,
		height: 1,
		backgroundColor: '#ddd',
	},

	dividerText: {
		marginHorizontal: 12,
		color: '#999',
		fontSize: 12,
		fontFamily: 'Montserrat',
	},

	// ===== Social Buttons =====
	socialContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		gap: 24,
		marginBottom: 24,
	},

	socialButton: {
		width: 50,
		height: 50,
		borderRadius: 12,
		backgroundColor: '#f5f5f5',
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: '#ddd',
	},

	// ===== Login Link =====
	loginContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 16,
	},

	loginText: {
		fontSize: 14,
		color: '#666',
		fontFamily: 'Montserrat',
	},

	loginLink: {
		fontSize: 14,
		color: '#360479',
		fontWeight: '600',
		fontFamily: 'Montserrat',
	},

	// ===== Loading Overlay =====
	loadingOverlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#ffffffbe',
	},
});
