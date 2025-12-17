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

export default function JoinGroupPage(): React.ReactElement | null {
	// ===== Contexts =====
	const { loadGroup } = useAppContext();

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
	const onJoin = async () => {
		if (!code.trim()) {
			Alert.alert('Missing code', 'Please enter a group code to join.');
			return;
		}

		setIsLoading(true);
		try {
			// Attempt to load group from API
			await loadGroup(code);

			// Navigate only on success
			(navigation as any).navigate('(tabs)');
		} catch (err: any) {
			// Check the error message
			switch (err.message) {
				case "GROUP_NOT_FOUND":
					Alert.alert('Invalid Code', `Unable to find group: ${code}`);
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

	const onCreate = async () => {
		(navigation as any).navigate('pages/CreateGroupPage');
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
		padding: 24,
		justifyContent: 'flex-start',
		backgroundColor: '#ffffff',
	},

	// ===== Image =====
	image: {
		width: '50%',
		height: '35%',
		resizeMode: 'contain',
		marginBottom: 10,
		marginTop: 40,
		alignSelf: 'center',
	},

	// ===== Typography =====
	title: {
		fontSize: 28,
		fontWeight: '700',
		textAlign: 'center',
		marginBottom: 24,
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

	// ===== Join Button =====
	joinButton: {
		backgroundColor: '#360479ff',
		padding: 12,
		borderRadius: 15,
		alignItems: 'center',
	},

	joinButtonText: {
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