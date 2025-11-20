import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
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

export default function JoinGroupPage(): React.ReactElement | null {
	const navigation = useNavigation();

		// Ensure the native header uses the friendly title instead of the file route
		React.useLayoutEffect(() => {
			try {
				(navigation as any).setOptions({ headerTitle: 'Login',
					headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 24,
          fontFamily: 'Montserrat',
        },
				 });
			} catch {
				// ignore if navigator doesn't support setOptions in this environment
			}
		}, [navigation]);
	const [fontsLoaded] = useFonts({
					'Shanti': require('../../assets/images/Shanti-Regular.ttf'),
					'Montserrat': require('../../assets/images/Montserrat-Regular.ttf')
				});
			const [code, setCode] = useState('');

				if (!fontsLoaded) {
					// Wait until fonts are loaded before rendering to ensure fontFamily takes effect
					return null;
				}


	const onJoin = () => {
		if (!code.trim()) {
			Alert.alert('Missing code', 'Please enter a group code to join.');
			return;
		}
		// TODO: wire up real join logic / navigation
		Alert.alert('Joining group', `Code: ${code}`);
		(navigation as any).navigate('(tabs)');
	};

	const onCreate = () => {
		// TODO: navigate to create group screen
		Alert.alert('Create group', 'Navigate to create group flow');
	};

	return (


		<View style={styles.container}>
			<Image
        style={styles.image}
        source={require('@/assets/images/logo.png')}
      />
			<Text style={styles.title}>Join A Group</Text>

			<TextInput
				style={styles.input}
				placeholder="Enter Group Code"
				placeholderTextColor="#888"
				value={code}
				onChangeText={setCode}
				autoCapitalize="none"
				keyboardType="default"
			/>

			<TouchableOpacity style={styles.joinButton} onPress={onJoin} activeOpacity={0.8}>
				<Text style={styles.joinButtonText}>Join</Text>
			</TouchableOpacity>

			<View style={styles.dividerRow}>
				<View style={styles.divider} />
				<Text style={styles.orText}>OR</Text>
				<View style={styles.divider} />
			</View>

			<TouchableOpacity style={styles.createButton} onPress={onCreate} activeOpacity={0.8}>
				<Text style={styles.createButtonText}>Create Group</Text>
			</TouchableOpacity>
		</View>

	);
}

const styles = StyleSheet.create({
		container: {
		flex: 1,
		padding: 24,
		justifyContent: 'flex-start',
		backgroundColor: '#ffffff',

	},

	image:{
		width: '100%',
		height: '30%',
		resizeMode: 'contain',
		marginBottom: -20,
	},

	title: {
		fontSize: 28,
		fontWeight: '700',
		textAlign: 'center',
		marginBottom: 24,
		color: '#111',
		fontFamily: 'Montserrat',
	},
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
	joinButton: {
		backgroundColor: '#360479ff',
		padding: 12,
		borderRadius: 15,
		borderWidth:1,
		alignItems: 'center',

	},
	joinButtonText: {
		color: '#fff',
		fontWeight: 'bold',
		fontFamily: 'Montserrat',
		fontSize: 16,
	},
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
	createButton: {
		borderWidth: 1,
		borderColor: '#360479ff',
		padding: 12,
		borderRadius: 15,
		alignItems: 'center',
		fontFamily: 'Montserrat',
	},
	createButtonText: {
		color: '#360479ff',
		fontWeight: 'bold',
		fontSize: 16,
		fontFamily: 'Montserrat',
	},
});