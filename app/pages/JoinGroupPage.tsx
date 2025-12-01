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
import { horizontalScale, moderateScale, verticalScale } from '../utils/scaling';

export default function JoinGroupPage(): React.ReactElement | null {
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
				headerTitle: '',
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
	const onJoin = async () => {
		if (!code.trim()) {
			Alert.alert('Missing code', 'Please enter a group code to join.');
			return;
		}

		setIsLoading(true);
		try {
			// TODO: Replace with real API call
			await new Promise((resolve) => setTimeout(resolve, 2000));
			Alert.alert('Success', `Joined group: ${code}`);
			// TODO: Navigate to group screen
		} catch {
			Alert.alert('Error', 'Failed to join group');
		} finally {
			setIsLoading(false);
		}
		// TODO: wire up real join logic / navigation
		Alert.alert('Joining group', `Code: ${code}`);
		(navigation as any).navigate('(tabs)');
	};

	const onCreate = async () => {
		setIsLoading(true);
		try {
			// TODO: Replace with real navigation or API call
			await new Promise((resolve) => setTimeout(resolve, 2000));
			// TODO: Navigate to create group screen
			Alert.alert('Create group', 'Navigate to create group flow');
		} catch {
			Alert.alert('Error', 'Failed to create group');
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




			{/* Code Input */}
			<TextInput
				style={styles.input}
				placeholder="Enter Group Code"
				placeholderTextColor="#888"
				value={code}
				onChangeText={setCode}
				autoCapitalize="none"
				keyboardType="default"
				editable={!isLoading}
			/>

			{/* Join Button */}
			<TouchableOpacity
				style={styles.joinButton}
				onPress={onJoin}
				activeOpacity={0.8}
				disabled={isLoading}
			>
				<Text style={styles.joinButtonText}>Join</Text>
			</TouchableOpacity>

			{/* Divider */}
			<View style={styles.dividerRow}>
				<View style={styles.divider} />
				<Text style={styles.orText}>OR</Text>
				<View style={styles.divider} />
			</View>

			{/* Create Button */}
			<TouchableOpacity
				style={styles.createButton}
				onPress={onCreate}
				activeOpacity={0.8}
				disabled={isLoading}
			>
				<Text style={styles.createButtonText}>Create Group</Text>
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
		padding: horizontalScale(24),
		justifyContent: 'flex-start',
		backgroundColor: '#ffffff',
	},

	// ===== Image =====
	image: {
		width: '50%',
		height: '35%',
		resizeMode: 'contain',
		marginBottom: verticalScale(10),
		marginTop: verticalScale(40),
		alignSelf: 'center',
	},

	// ===== Typography =====
	title: {
		fontSize: moderateScale(28),
		fontWeight: '700',
		textAlign: 'center',
		marginBottom: verticalScale(24),
		color: '#111',
		fontFamily: 'Montserrat',
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

	// ===== Join Button =====
	joinButton: {
		backgroundColor: '#360479ff',
		padding: verticalScale(12),
		borderRadius: moderateScale(15),
		alignItems: 'center',
	},

	joinButtonText: {
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