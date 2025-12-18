import { useFonts } from "expo-font";
import { SplashScreen } from 'expo-router';
import React, { useRef } from 'react';
import { Alert, Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
interface Props {
  item: {
    id: number;
    item: string;
    priority: number;
  };
  index: number;
  onDelete: (id: number) => void;
  getPriorityText: (priority: number) => string;
  getPriorityColor: (priority: number) => string;
}

export default function ShoppingItemRow({
  item,
  index,
  onDelete,
  getPriorityText,
  getPriorityColor,
}: Props) {
  const opacity = useRef(new Animated.Value(1)).current;
 let [fontsLoaded] = useFonts({
    'Shanti': require('../../assets/images/Shanti-Regular.ttf'),
    'Montserrat': require('../../assets/images/Montserrat-Regular.ttf')
  });

  if (!fontsLoaded) {
    SplashScreen.preventAutoHideAsync();
    return null;
  }

  const handleDelete = () => {
    Alert.alert('Delete Item', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          Animated.timing(opacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            onDelete(item.id);
          });
        },
      },
    ]);
  };

  return (
    <Animated.View style={[styles.itemContainer, { opacity }]}>
      <TouchableOpacity style={styles.itemContent}>
        <View style={styles.itemLeft}>
          <Text style={[styles.itemText]}>
            {item.item}
          </Text>
        </View>
        <View style={styles.itemRight}>
          <Text style={[styles.priorityText, { color: getPriorityColor(item.priority) }]}>
            {getPriorityText(item.priority)}
          </Text>
          <Text style={styles.itemNumber}>{index + 1}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>×</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
  },
  itemContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  itemLeft: { flex: 1 },
  itemText: { fontSize: 16, color: '#333', fontFamily:'Shanti' },
  completedText: { textDecorationLine: 'line-through', color: '#999' },
  itemRight: { flexDirection: 'row', alignItems: 'center' },
  priorityText: { fontSize: 18, fontWeight: 'bold', marginRight: 10 },
  itemNumber: {
    fontSize: 14,
    color: '#666',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 24,
    textAlign: 'center',
  },
  deleteButton: { padding: 15, justifyContent: 'center', alignItems: 'center' },
  deleteButtonText: { fontSize: 20, color: '#f44336', fontWeight: 'bold' },
});