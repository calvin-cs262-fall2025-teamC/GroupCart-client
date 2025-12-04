import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, router } from 'expo-router';

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
import { horizontalScale, moderateScale, verticalScale } from '../utils/scaling';

export default function UserLoginPage(): React.ReactElement | null {
	// ===== Hooks =====
	const navigation = useNavigation();
	const [code, setCode] = useState('');
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
					fontSize: moderateScale(24),
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
		if (!code.trim()) {
			Alert.alert('Missing code', 'Please enter a UserName.');
			return;
		}

		setIsLoading(true);
		try {
			// TODO: Replace with real API call
			await new Promise((resolve) => setTimeout(resolve, 2000));
			Alert.alert('Success', `Logged in: ${code}`);
			// TODO: Navigate to home screen
		} catch {
			Alert.alert('Error', 'Failed to login');
		} finally {
			setIsLoading(false);
		}
		// TODO: wire up real join logic / navigation
		Alert.alert('Logging in User', `User entered: ${code}`);
		router.push('/pages/JoinGroupPage');
	};

	const onCreate = async () => {
		setIsLoading(true);
		try {
			// TODO: Replace with real API call
			await new Promise((resolve) => setTimeout(resolve, 2000));
			router.push('/pages/CreateUserPage');
		} catch {
			Alert.alert('Error', 'Failed to navigate to create account');
		} finally {
			setIsLoading(false);
		}
	};

	// ===== Render =====
	return (
		<View style={styles.container}>
			{/* Logo */}
			<Image
				style={styles.image}
				source={require('@/assets/images/logo.png')}
			/>

			{/* Username Input */}
			<TextInput
				style={styles.input}
				placeholder="Enter Your Username"
				placeholderTextColor="#888"
				value={code}
				onChangeText={setCode}
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
		padding: horizontalScale(24),
		justifyContent: 'center',
		backgroundColor: '#ffffff',
	},

	// ===== Image =====
	image: {
		width: '50%',
		height: '35%',
		resizeMode: 'contain',
		marginTop: verticalScale(-150),
		marginBottom: verticalScale(10),
		alignSelf: 'center',
	},

	// ===== Input =====
	input: {
		borderWidth: moderateScale(1),
		borderColor: '#ddd',
		borderRadius: moderateScale(30),
		padding: verticalScale(12),
		marginBottom: verticalScale(12),
		fontSize: moderateScale(16),
		color: '#111',
		fontFamily: 'Montserrat',
	},

	// ===== Login Button =====
	loginButton: {
		backgroundColor: '#360479ff',
		padding: verticalScale(12),
		borderRadius: moderateScale(15),
		alignItems: 'center',
	},

	loginButtonText: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: moderateScale(16),
		fontFamily: 'Montserrat',
	},

	// ===== Divider =====
	dividerRow: {
		flexDirection: 'row',
		alignItems: 'center',
		marginVertical: verticalScale(20),
	},

	divider: {
		flex: 1,
		height: verticalScale(1),
		backgroundColor: '#eee',
	},

	orText: {
		marginHorizontal: horizontalScale(12),
		color: '#666',
		fontWeight: '600',
		fontFamily: 'Montserrat',
	},

	// ===== Create Button =====
	createButton: {
		borderWidth: moderateScale(1),
		borderColor: '#360479ff',
		padding: verticalScale(12),
		borderRadius: moderateScale(15),
		alignItems: 'center',
	},

	createButtonText: {
		color: '#360479ff',
		fontWeight: 'bold',
		fontSize: moderateScale(16),
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