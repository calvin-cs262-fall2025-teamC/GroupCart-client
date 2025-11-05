import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function DemoPage() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Demo Navigation Page</Text>
			<Text style={styles.subtitle}>If you found this page, the dev navigator is working! Yay!</Text>
			<Text style={styles.notice}>You can go back with the top left arrow</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#2196f3',
	},
	title: {
		fontSize: 20,
		fontWeight: '600',
		marginBottom: 8,
		color: '#fff',
	},
	subtitle: {
		fontSize: 14,
		color: '#fff',
		textAlign: 'center',
	},
	notice: {
		color: 'yellow',
		fontWeight: 'bold'
	}
});
