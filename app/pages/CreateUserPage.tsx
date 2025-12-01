import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import LoadingCircle from '../components/LoadingCircle';
import { horizontalScale, moderateScale, verticalScale } from '../utils/scaling';

export default function CreateUserPage(): React.ReactElement | null {
	// ===== Hooks =====
	const navigation = useNavigation();
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
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
		if (!username.trim() || !email.trim() || !password.trim()) {
			Alert.alert('Missing fields', 'Please fill in all fields');
			return;
		}

		setIsLoading(true);
		try {
			await new Promise((resolve) => setTimeout(resolve, 2000));
			Alert.alert('Success', `Account created: ${username}`);
		} catch {
			Alert.alert('Error', 'Failed to create account');
		} finally {
			setIsLoading(false);
		}
	};

	// ===== Social Login Handlers =====
	const onGoogleLogin = async () => {
		setIsLoading(true);
		try {
			// TODO: Implement Google Sign-In
			// Example using expo-auth-session or @react-native-google-signin/google-signin
			// const result = await GoogleSignIn.signIn();
			// if (result.type === 'success') {
			//   const { idToken, user } = result;
			//   // Send idToken to your backend for verification
			//   // Then create/login user account
			//   Alert.alert('Success', `Logged in with Google: ${user.email}`);
			//   // Navigate to home screen
			// }

			// Placeholder for now
			await new Promise((resolve) => setTimeout(resolve, 1500));
			Alert.alert('Google Login', 'Google Sign-In will be implemented here');
			// (navigation as any).navigate('(tabs)');
		} catch (error) {
			Alert.alert('Error', 'Failed to sign in with Google');
			console.error('Google login error:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const onFacebookLogin = async () => {
		setIsLoading(true);
		try {
			// TODO: Implement Facebook Login
			// Example using expo-auth-session or react-native-fbsdk-next
			// const result = await Facebook.logInWithReadPermissionsAsync({
			//   permissions: ['public_profile', 'email'],
			// });
			// if (result.type === 'success') {
			//   const { token } = result;
			//   // Send token to your backend for verification
			//   // Then create/login user account
			//   Alert.alert('Success', 'Logged in with Facebook');
			//   // Navigate to home screen
			// }

			// Placeholder for now
			await new Promise((resolve) => setTimeout(resolve, 1500));
			Alert.alert('Facebook Login', 'Facebook Sign-In will be implemented here');
			// (navigation as any).navigate('(tabs)');
		} catch (error) {
			Alert.alert('Error', 'Failed to sign in with Facebook');
			console.error('Facebook login error:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const onAppleLogin = async () => {
		setIsLoading(true);
		try {
			// TODO: Implement Apple Sign-In
			// Example using expo-apple-authentication or @invertase/react-native-apple-authentication
			// const result = await AppleAuthentication.signInAsync({
			//   requestedScopes: [
			//     AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
			//     AppleAuthentication.AppleAuthenticationScope.EMAIL,
			//   ],
			// });
			// if (result) {
			//   // Send identityToken to your backend for verification
			//   // Then create/login user account
			//   Alert.alert('Success', 'Logged in with Apple');
			//   // Navigate to home screen
			// }

			// Placeholder for now
			await new Promise((resolve) => setTimeout(resolve, 1500));
			Alert.alert('Apple Login', 'Apple Sign-In will be implemented here');
			// (navigation as any).navigate('(tabs)');
		} catch (error) {
			Alert.alert('Error', 'Failed to sign in with Apple');
			console.error('Apple login error:', error);
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

			{/* Email Input */}
			<Text style={styles.label}>Email*</Text>
			<TextInput
				style={styles.input}
				placeholder="Enter your email"
				value={email}
				onChangeText={setEmail}
				keyboardType="email-address"
				autoCapitalize="none"
				editable={!isLoading}
			/>

			{/* Password Input */}
			<Text style={styles.label}>Password*</Text>
			<TextInput
				style={styles.input}
				placeholder="Enter your password"
				value={password}
				onChangeText={setPassword}
				secureTextEntry
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
				{/* Google Login Button */}
				<TouchableOpacity
					style={styles.socialButton}
					onPress={onGoogleLogin}
					disabled={isLoading}
					activeOpacity={0.7}
				>

					<Image
						source={require('../../assets/images/google.png')}
						style={styles.socialIcon}
						resizeMode="contain"
					/>
				</TouchableOpacity>

				{/* Facebook Login Button */}
				<TouchableOpacity
					style={styles.socialButton}
					onPress={onFacebookLogin}
					disabled={isLoading}
					activeOpacity={0.7}
				>

					<Image
						source={require('../../assets/images/facebook.png')}
						style={styles.socialIcon}
						resizeMode="contain"
					/>
				</TouchableOpacity>

				{/* Apple Login Button */}
				<TouchableOpacity
					style={styles.socialButton}
					onPress={onAppleLogin}
					disabled={isLoading}
					activeOpacity={0.7}
				>

					<Image
						source={require('../../assets/images/apple-logo.png')}
						style={styles.socialIcon}
						resizeMode="contain"
					/>
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
		padding: horizontalScale(20),
		backgroundColor: '#fff',
		marginTop: verticalScale(-100),
	},

	// ===== Logo =====
	logoContainer: {
		paddingTop: verticalScale(20),
		paddingBottom: verticalScale(40),
	},

	logoPlaceholder: {
		width: horizontalScale(60),
		height: verticalScale(60),
		borderWidth: moderateScale(2),
		borderColor: '#ddd',
		borderRadius: moderateScale(8),
		backgroundColor: '#f5f5f5',
	},

	// ===== Typography =====
	title: {
		fontSize: moderateScale(28),
		fontWeight: 'bold',
		marginBottom: verticalScale(8),
		color: '#111',
		fontFamily: 'Montserrat',
	},

	subtitle: {
		fontSize: moderateScale(14),
		color: '#666',
		marginBottom: verticalScale(32),
		fontFamily: 'Montserrat',
	},

	label: {
		fontSize: moderateScale(14),
		color: '#111',
		marginBottom: verticalScale(8),
		fontFamily: 'Montserrat',
	},

	// ===== Input =====
	input: {
		borderWidth: moderateScale(1),
		borderColor: '#ddd',
		borderRadius: moderateScale(20),
		padding: verticalScale(14),
		marginBottom: verticalScale(16),
		fontSize: moderateScale(14),
		color: '#111',
		fontFamily: 'Montserrat',
		backgroundColor: '#f9f9f9',
	},

	// ===== Create Button =====
	button: {
		backgroundColor: '#360479',
		padding: verticalScale(14),
		borderRadius: moderateScale(25),
		alignItems: 'center',
		marginTop: verticalScale(8),
		marginBottom: verticalScale(24),
	},

	buttonText: {
		color: '#fff',
		fontWeight: '700',
		fontSize: moderateScale(16),
		fontFamily: 'Montserrat',
	},

	// ===== Divider =====
	dividerContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginVertical: verticalScale(24),
	},

	divider: {
		flex: 1,
		height: verticalScale(1),
		backgroundColor: '#ddd',
	},

	dividerText: {
		marginHorizontal: horizontalScale(12),
		color: '#999',
		fontSize: moderateScale(12),
		fontFamily: 'Montserrat',
	},

	// ===== Social Buttons =====
	socialContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		gap: horizontalScale(24),
		marginBottom: verticalScale(24),
	},

	socialButton: {
		width: horizontalScale(50),
		height: verticalScale(50),
		borderRadius: moderateScale(12),
		backgroundColor: '#f5f5f5',
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: moderateScale(1),
		borderColor: '#ddd',
	},

	socialIcon: {
		width: horizontalScale(24),
		height: verticalScale(24),
	},

	// ===== Login Link =====
	loginContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: verticalScale(16),
	},

	loginText: {
		fontSize: moderateScale(14),
		color: '#666',
		fontFamily: 'Montserrat',
	},

	loginLink: {
		fontSize: moderateScale(14),
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
