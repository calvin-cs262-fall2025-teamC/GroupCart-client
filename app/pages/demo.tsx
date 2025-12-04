import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { horizontalScale, moderateScale, verticalScale } from '../utils/scaling';

export default function DemoPage() {
	const navigation = useNavigation();

		// Ensure the native header uses the friendly title instead of the file route
		React.useLayoutEffect(() => {
			try {
				(navigation as any).setOptions({ headerTitle: 'Demo Page',
					headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: moderateScale(24),
          fontFamily: 'Montserrat',
        },
				});
			} catch {
				// ignore if navigator doesn't support setOptions in this environment
			}
		}, [navigation]);
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
		padding: horizontalScale(20),
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#2196f3',
	},
	title: {
		fontSize: moderateScale(20),
		fontWeight: '600',
		marginBottom: verticalScale(8),
		color: '#fff',
	},
	subtitle: {
		fontSize: moderateScale(14),
		color: '#fff',
		textAlign: 'center',
	},
	notice: {
		color: 'yellow',
		fontWeight: 'bold'
	}
});
