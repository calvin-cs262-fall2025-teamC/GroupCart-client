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
import { useAppContext } from '../contexts/AppContext';

const PRESET_COLORS = [
  '#0079ff', '#FF5722', '#4CAF50', '#FF9800', '#9C27B0',
  '#00BCD4', '#F44336', '#8BC34A', '#FFC107', '#E91E63',
  '#2196F3', '#795548', '#009688', '#FF6F00', '#673AB7',
  '#FF69B4',
];
export default function Settings() {
  const navigation = useNavigation();
  const { user, updateMyUser } = useAppContext();
  // Ensure the native header uses the friendly title instead of the file route
  React.useLayoutEffect(() => {
    try {
      (navigation as any).setOptions({
        headerTitle: 'Profile Settings',
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

  let [fontsLoaded] = useFonts({
        'Shanti': require('../../assets/images/Shanti-Regular.ttf'),
        'Montserrat': require('../../assets/images/Montserrat-Regular.ttf')
      });

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedColor, setSelectedColor] = useState('0079ff');

  React.useEffect(() => {
    if (user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      handleColorChange(user.color || '#0079ff');
    }
  }, [user]);

  if (!fontsLoaded) {
  SplashScreen.preventAutoHideAsync();
  return null;
}

  const handleColorChange = (color: string) => {
    setSelectedColor(color.replace('#', ''));
  };

  const handleSaveName = async () => {
    if (firstName.trim() && lastName.trim()) {
      try {
        await updateMyUser({ firstName: firstName.trim(), lastName: lastName.trim()});
        Alert.alert('Success', 'Name updated!');
      } catch (err) {
        Alert.alert('Error', 'Failed to update name');
        console.log(err);
      }
    } else {
      Alert.alert('Error', 'First name and last name cannot be empty');
    }
  };

  const handleColorSelect = async (color: string) => {
    handleColorChange(color);
    try {
      await updateMyUser({ color: color.replace('#', '') });
    } catch (err) {
      Alert.alert('Error', 'Failed to update color');
      console.log(err);
    }
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
        <Text style={styles.label}>First Name</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
            placeholder="Enter your first name"
            placeholderTextColor="#999"
          />
        </View>

        <Text style={[styles.label, { marginTop: 8 }]}>Last Name</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
            placeholder="Enter your last name"
            placeholderTextColor="#999"
          />
          <TouchableOpacity
            style={[styles.saveButton, { backgroundColor: '#' + selectedColor }]}
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
                  borderWidth: selectedColor === color.replace('#', '') ? 4 : 2,
                  borderColor: selectedColor === color.replace('#', '') ? '#000' : '#ddd',
                  transform: selectedColor === color.replace('#', '') ? [{ scale: 1.1 }] : [{ scale: 1 }],
                },
              ]}
              onPress={() => handleColorSelect(color)}
            >
              {selectedColor === color.replace('#', '') && (
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
            <View style={[styles.previewAvatar, { backgroundColor: '#' + selectedColor }]}>
              <Text style={styles.previewAvatarText}>
                {firstName.charAt(0).toUpperCase() || 'Y'}
              </Text>
            </View>
            <Text style={[styles.previewName, { color: '#' + selectedColor }]}>
              {`${firstName} ${lastName}` || 'You'}
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
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'left',
    fontFamily: 'Montserrat',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    fontFamily: 'Montserrat',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    lineHeight: 20,
    fontFamily: 'Montserrat',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 30,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    color: '#333',
    fontFamily: 'Montserrat',
  },
  saveButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Montserrat',
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  colorOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Montserrat',
  },
  previewSection: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  previewLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    fontFamily: 'Montserrat',
  },
  previewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  previewAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewAvatarText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
  previewName: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
});
