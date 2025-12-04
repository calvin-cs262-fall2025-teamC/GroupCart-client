import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useFonts } from "expo-font";
import { Image } from 'expo-image';
import { SplashScreen, router } from 'expo-router';
import React, { useCallback } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '../contexts/UserContext';
import { horizontalScale, moderateScale, verticalScale } from '../utils/scaling';

const editIcon = require('../../assets/images/edit.png');
const settingsIcon = require('../../assets/images/setting.png');
const transferIcon = require('../../assets/images/transfer.png');
const about = require('../../assets/images/info.png');
const historyicon = require('../../assets/images/history.png');
const logouticon = require('../../assets/images/power-off.png');

const ProfileScreen = () => {
	const navigation = useNavigation();
	const { user } = useUser();

	// Force re-render when screen comes into focus (e.g., when navigating back from color picker)
	useFocusEffect(
		useCallback(() => {
			// Component will re-render when screen is focused, ensuring latest user data is displayed
		}, [])
	);

	const handleEditProfile = () => {
		(navigation as any).navigate('pages/colorpicker');
	};

	const handleMenuItemPress = (itemId: number) => {
		if (itemId === 1) {
			// Navigate to dev pages
			(navigation as any).navigate('pages/dev');
		}
		// Add more navigation handlers for other items as needed
	};

	// Get user's color and display name, with defaults - these will update when user changes
	const userColor = user?.color || '#0079ff';
	const displayName = user?.displayName || 'You';
	const firstLetter = displayName.charAt(0).toUpperCase() || 'Y';

	const menuItems = [
		{ id: 1, icon: settingsIcon, label: 'Settings', nextIcon: transferIcon },
		{ id: 2, icon: historyicon, label: 'History', nextIcon: transferIcon },
		{ id: 3, icon: about, label: 'About', nextIcon: transferIcon },
		{ id: 4, icon: logouticon, label: 'Log Out', nextIcon: transferIcon },
	];
	const [fontsLoaded] = useFonts({
			Shanti: require("../../assets/images/Shanti-Regular.ttf"),
			Montserrat: require("../../assets/images/Montserrat-Regular.ttf"),
		});

		if (!fontsLoaded) {
			SplashScreen.preventAutoHideAsync();
			return null;
		}

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView
				style={styles.scrollView}
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}
			>
				{/* Profile Section */}
				<View style={styles.profileContainer}>

						<View style={styles.profileFrameInner}>
							<View
								key={`profile-${userColor}-${displayName}`}
								style={[styles.profileImageContainer, { backgroundColor: userColor }]}
							>
								<Text style={styles.profileImageText}>{firstLetter}</Text>
								<TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
									<Image source={editIcon} style={styles.editIcon} />
								</TouchableOpacity>
							</View>

					</View>

					{/* User Info */}
					<View style={styles.userInfo} key={`user-info-${displayName}`}>
						<Text style={[styles.userText, styles.firstUserText]}>{displayName}</Text>
						<Text style={styles.userText}>ssdfiua@gmail.com</Text>
					</View>

					{/* Menu Items */}
					<View style={styles.menuContainer}>
						{menuItems.map((item, index) => (
							<React.Fragment key={item.id}>
								{index > 0 && <View style={styles.separator} />}
								<TouchableOpacity
									style={styles.menuItem}
									onPress={() => handleMenuItemPress(item.id)}
									activeOpacity={0.7}
								>
									<View style={styles.iconContainer}>
										<Image source={item.icon} style={styles.menuIcon} />
									</View>
									<View style={styles.labelContainer}>
										<Text style={styles.menuLabel}>{item.label}</Text>
									</View>
									<View style={styles.nextIconContainer}>
										<Image source={item.nextIcon} style={styles.nextIcon} />
									</View>
								</TouchableOpacity>
							</React.Fragment>
						))}
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default ProfileScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff',
		fontFamily: 'Montserrat',
	},
	scrollView: {
		flex: 1,
	},
	scrollContent: {
		paddingHorizontal: horizontalScale(20),
		alignItems: 'center',
		paddingBottom: verticalScale(40),
		fontFamily: 'Montserrat',
	},
	profileContainer: {
		alignItems: 'center',
		marginTop: verticalScale(40),
		width: '100%',
		fontFamily: 'Montserrat',
	},
	profileFrameInner: {
		width: moderateScale(130),
		height: moderateScale(130),
		borderRadius: moderateScale(65),
		borderWidth: moderateScale(1),
		borderColor: '#e0e0e0',
		alignItems: 'center',
		justifyContent: 'center',
		fontFamily: 'Montserrat',
	},
	profileImageContainer: {
		width: moderateScale(100),
		height: moderateScale(100),
		borderRadius: moderateScale(50),
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative',
		fontFamily: 'Montserrat',
	},
	profileImageText: {
		color: 'white',
		fontSize: moderateScale(40),
		fontWeight: 'bold',
		fontFamily: 'Montserrat',
	},
	editButton: {
		position: 'absolute',
		bottom: moderateScale(6),
		right: moderateScale(6),
		width: moderateScale(22),
		height: moderateScale(22),
		fontWeight: "600",
		fontFamily: 'Montserrat',
	},
	editIcon: {
		width: moderateScale(22),
		height: moderateScale(22),
		fontWeight: "600",
		fontFamily: 'Montserrat',
	},
	userInfo: {
		alignItems: 'center',
		marginTop: verticalScale(16),

		fontFamily: 'Montserrat',
	},
	userText: {
		fontSize: moderateScale(14),
		fontWeight: '400',
		color: '#000000',
		textAlign: 'center',
		marginTop: verticalScale(4),
		fontFamily: 'Montserrat',

	},
	firstUserText: {
		marginTop: 0,
		fontFamily: 'Montserrat',
	},
	menuContainer: {
		width: '100%',
		marginTop: verticalScale(35),
	},
	separator: {
		height: verticalScale(20),
	},
	menuItem: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
		fontFamily: 'Montserrat',
	},
	iconContainer: {
		width: moderateScale(32),
		height: moderateScale(32),
		backgroundColor: '#f5f5f5',
		borderRadius: moderateScale(16),
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: moderateScale(1),
		borderColor: '#e0e0e0',
		fontFamily: 'Montserrat',
	},
	menuIcon: {
		width: moderateScale(24),
		fontFamily: 'Montserrat',
		height: moderateScale(24),
	},
	labelContainer: {
		width: '56%',
		fontFamily: 'Montserrat',
		marginHorizontal: horizontalScale(20),
	},
	menuLabel: {
		fontSize: moderateScale(16),
		fontWeight: '400',
		color: '#000000',
		fontFamily: 'Montserrat',
	},
	nextIconContainer: {
		width: '20%',
		alignItems: 'flex-end',
	},
	nextIcon: {
		width: moderateScale(13),
		height: moderateScale(13),
	},
});
