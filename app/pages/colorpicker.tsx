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

const PRESET_COLORS = [
  '#0079ff', '#FF5722', '#4CAF50', '#FF9800', '#9C27B0',
  '#00BCD4', '#F44336', '#8BC34A', '#FFC107', '#E91E63',
  '#2196F3', '#795548', '#009688', '#FF6F00', '#673AB7',
];

export default function Settings() {
  const { user, updateUserColor, updateUserDisplayName } = useUser();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [selectedColor, setSelectedColor] = useState(user?.color || '#0079ff');

  React.useEffect(() => {
    if (user) {
      setDisplayName(user.displayName);
      setSelectedColor(user.color);
    }
  }, [user]);

  const handleSaveName = async () => {
    if (displayName.trim()) {
      await updateUserDisplayName(displayName.trim());
      Alert.alert('Success', 'Display name updated!');
    } else {
      Alert.alert('Error', 'Display name cannot be empty');
    }
  };

  const handleColorSelect = async (color: string) => {
    setSelectedColor(color);
    await updateUserColor(color);
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Profile Settings</Text>

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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
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
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    lineHeight: 20,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    color: '#333',
  },
  saveButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
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
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
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
  },
  previewName: {
    fontSize: 18,
    fontWeight: '600',
  },
});
