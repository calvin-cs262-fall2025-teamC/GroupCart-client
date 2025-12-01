import { useNavigation } from '@react-navigation/native';
import { useFonts } from "expo-font";
import { LinearGradient } from 'expo-linear-gradient';
import { SplashScreen } from "expo-router";
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useUser } from '../contexts/UserContext';
import { horizontalScale, moderateScale, verticalScale } from '../utils/scaling';

const PRESET_COLORS = [
  '#0079ff', '#FF5722', '#4CAF50', '#FF9800', '#9C27B0',
  '#00BCD4', '#F44336', '#8BC34A', '#FFC107', '#E91E63',
  '#2196F3', '#795548', '#009688', '#FF6F00', '#673AB7',
  '#FF69B4',
];

export default function Settings() {
  const navigation = useNavigation();

  // Ensure the native header uses the friendly title instead of the file route
  React.useLayoutEffect(() => {
    try {
      (navigation as any).setOptions({
        headerTitle: 'Profile Settings',
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
let [fontsLoaded] = useFonts({
        'Shanti': require('../../assets/images/Shanti-Regular.ttf'),
        'Montserrat': require('../../assets/images/Montserrat-Regular.ttf')
      });

  const { user, updateUserColor, updateUserDisplayName } = useUser();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [selectedColor, setSelectedColor] = useState(user?.color || '#0079ff');

  React.useEffect(() => {
    if (user) {
      setDisplayName(user.displayName);
      setSelectedColor(user.color);
    }
  }, [user]);
if (!fontsLoaded) {
  SplashScreen.preventAutoHideAsync();
  return null;
}
  const handleSaveName = async () => {
    if (displayName.trim()) {
      await updateUserDisplayName(displayName.trim());
      Alert.alert('Success', 'Display name updated!', [
        {
          text: 'OK',
          onPress: () => {
            // Navigate back to profile page
            (navigation as any).goBack();
          },
        },
      ]);
    } else {
      Alert.alert('Error', 'Display name cannot be empty');
    }
  };

  const handleColorSelect = async (color: string) => {
    setSelectedColor(color);
    await updateUserColor(color);
    Alert.alert('Success', 'Profile color updated!', [
      {
        text: 'OK',
        onPress: () => {
          // Navigate back to profile page
          (navigation as any).goBack();
        },
      },
    ]);
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
      <LinearGradient

                    colors={["#f2b2ffff", "#eed3ffff", "#bdc5f1ff", "#ffffffff"]}
                    // Gradient direction: starts from top-right, flows to bottom-left
                    // [x1, y1] = start point, [x2, y2] = end point
                    start={{ x: 1, y: 0}} // Top right
                    end={{ x: 0, y: 1 }} // Bottom left

                    locations={[0.1, 0.3, 0.6, 1]}
                    style={[styles.container]}
                  >
      <View style={styles.overlay}>
    <ScrollView style= {styles.content}>
      <View style={styles.title}></View>

      <View style={styles.section}>
        <Text style={styles.label}>Display Name</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={displayName}
            onChangeText={setDisplayName}
            placeholder="Enter your name"
            placeholderTextColor="#999"
          />
          <TouchableOpacity
            style={[styles.saveButton, { backgroundColor: selectedColor }]}
            onPress={handleSaveName}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Profile Color</Text>
        <Text style={styles.description}>
          Choose a color for your profile. This color will be used to identify you in group requests.
        </Text>

        <View style={styles.colorGrid}>
          {PRESET_COLORS.map((color) => (
            <TouchableOpacity
              key={color}
              style={[
                styles.colorOption,
                {
                  backgroundColor: color,
                  borderWidth: selectedColor === color ? 4 : 2,
                  borderColor: selectedColor === color ? '#000' : '#ddd',
                  transform: selectedColor === color ? [{ scale: 1.1 }] : [{ scale: 1 }],
                },
              ]}
              onPress={() => handleColorSelect(color)}
            >
              {selectedColor === color && (
                <View style={styles.checkmark}>
                  <Text style={styles.checkmarkText}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.previewSection}>
          <Text style={styles.previewLabel}>Preview:</Text>
          <View style={styles.previewContainer}>
            <View style={[styles.previewAvatar, { backgroundColor: selectedColor }]}>
              <Text style={styles.previewAvatarText}>
                {displayName.charAt(0).toUpperCase() || 'Y'}
              </Text>
            </View>
            <Text style={[styles.previewName, { color: selectedColor }]}>
              {displayName || 'You'}
            </Text>
          </View>
        </View>
      </View>

    </ScrollView>
    </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },
 overlay: {

    backgroundColor: 'rgba(255, 255, 255, 0.7)', // optional for readability
  },
  content: {
    padding: horizontalScale(20),
  },
  title: {
    fontSize: moderateScale(32),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: verticalScale(30),
    textAlign: 'left',
    fontFamily: 'Montserrat',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: moderateScale(15),
    padding: horizontalScale(20),
    marginBottom: verticalScale(20),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(4),
    elevation: 3,
  },
  label: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: '#333',
    marginBottom: verticalScale(12),
    fontFamily: 'Montserrat',
  },
  description: {
    fontSize: moderateScale(14),
    color: '#666',
    marginBottom: verticalScale(20),
    lineHeight: moderateScale(20),
    fontFamily: 'Montserrat',
  },
  inputRow: {
    flexDirection: 'row',
    gap: horizontalScale(10),
  },
  input: {
    flex: 1,
    borderWidth: moderateScale(1),
    borderColor: '#ddd',
    borderRadius: moderateScale(30),
    padding: verticalScale(12),
    fontSize: moderateScale(16),
    backgroundColor: '#f9f9f9',
    color: '#333',
    fontFamily: 'Montserrat',
  },
  saveButton: {
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: moderateScale(16),
    fontFamily: 'Montserrat',
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: horizontalScale(12),
    marginBottom: verticalScale(20),
  },
  colorOption: {
    width: horizontalScale(50),
    height: verticalScale(50),
    borderRadius: moderateScale(25),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.2,
    shadowRadius: moderateScale(3),
    elevation: 3,
  },
  checkmark: {
    width: horizontalScale(24),
    height: verticalScale(24),
    borderRadius: moderateScale(15),
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: moderateScale(16),
    fontFamily: 'Montserrat',
  },
  previewSection: {
    marginTop: verticalScale(20),
    paddingTop: verticalScale(20),
    borderTopWidth: moderateScale(1),
    borderTopColor: '#eee',
  },
  previewLabel: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#333',
    marginBottom: verticalScale(12),
    fontFamily: 'Montserrat',
  },
  previewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: horizontalScale(12),
  },
  previewAvatar: {
    width: horizontalScale(48),
    height: verticalScale(48),
    borderRadius: moderateScale(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewAvatarText: {
    color: 'white',
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
  previewName: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
});
