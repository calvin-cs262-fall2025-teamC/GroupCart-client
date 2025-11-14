import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
	Alert,
	Image,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native';

export default function UserLoginPage(): React.ReactElement {
	const [code, setCode] = useState('');
	const navigation = useNavigation();
	

	const onLogin = () => {
		if (!code.trim()) {
			Alert.alert('Missing code', 'Please enter a UserName.');
			return;
		}
		// TODO: wire up real join logic / navigation
		Alert.alert('Logging in User', `User entered: ${code}`);
		(navigation as any).navigate('pages/JoinGroupPage');
	};

	const onCreate = () => {
		// TODO: navigate to create user Page
		Alert.alert('Create User', 'Navigate to User Creation Page');
	};

	return (
		<View style={styles.container}>

			<Image
				source={require('../../assets/images/logo.png')}
				style={styles.logo}
				resizeMode="contain"
				accessibilityLabel="App logo"
			/>

			<Text style={styles.title}>Login</Text>

			<TextInput
				style={styles.input}
				placeholder="Enter Your Username"
				placeholderTextColor="#888"
				value={code}
				onChangeText={setCode}
				autoCapitalize="none"
				keyboardType="default"
			/>

			<TouchableOpacity style={styles.loginButton} onPress={onLogin} activeOpacity={0.8}>
				<Text style={styles.loginButtonText}>Login</Text>
			</TouchableOpacity>

			<View style={styles.dividerRow}>
				<View style={styles.divider} />
				<Text style={styles.orText}>OR</Text>
				<View style={styles.divider} />
			</View>

			<TouchableOpacity style={styles.createButton} onPress={onCreate} activeOpacity={0.8}>
				<Text style={styles.createButtonText}>Create New Account</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		padding: 24,
		justifyContent: 'center',
		alignItems: 'stretch',
		backgroundColor: '#ffffff',
	},
	logo: {
		alignSelf: 'center',
		width: 360,
		height: 360,
		marginBottom: 16,
		backgroundColor: 'transparent'
	},
	title: {
		fontSize: 28,
		fontWeight: '700',
		textAlign: 'center',
		marginBottom: 24,
		color: '#111',
	},
	input: {
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 8,
		padding: 12,
		marginBottom: 12,
		fontSize: 16,
		color: '#111',
	},
	loginButton: {
		backgroundColor: '#2f95dc',
		padding: 12,
		borderRadius: 8,
		alignItems: 'center',
	},
	loginButtonText: {
		color: '#fff',
		fontWeight: '600',
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
	},
	createButton: {
		borderWidth: 1,
		borderColor: '#2f95dc',
		padding: 12,
		borderRadius: 8,
		alignItems: 'center',
	},
	createButtonText: {
		color: '#2f95dc',
		fontWeight: '600',
		fontSize: 16,
	},
});