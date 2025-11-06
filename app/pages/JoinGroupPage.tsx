import React, { useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function JoinGroupPage(): React.ReactElement {
	const [code, setCode] = useState('');

	const onJoin = () => {
		if (!code.trim()) {
			Alert.alert('Missing code', 'Please enter a group code to join.');
			return;
		}
		// TODO: wire up real join logic / navigation
		Alert.alert('Joining group', `Code: ${code}`);
	};

	const onCreate = () => {
		// TODO: navigate to create group screen
		Alert.alert('Create group', 'Navigate to create group flow');
	};

	return (
		<View style={styles.container}>
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
		justifyContent: 'center',
		backgroundColor: '#ffffff',
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
	joinButton: {
		backgroundColor: '#2f95dc',
		padding: 12,
		borderRadius: 8,
		alignItems: 'center',
	},
	joinButtonText: {
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