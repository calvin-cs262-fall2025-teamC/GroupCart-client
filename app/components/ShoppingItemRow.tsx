import React, { useRef } from 'react';
import { Alert, Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  item: {
    id: string;
    text: string;
    completed: boolean;
    priority: number;
  };
  index: number;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  getPriorityText: (priority: number) => string;
  getPriorityColor: (priority: number) => string;
}

export default function ShoppingItemRow({
  item,
  index,
  onToggle,
  onDelete,
  getPriorityText,
  getPriorityColor,
}: Props) {
  const opacity = useRef(new Animated.Value(1)).current;

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
      <TouchableOpacity style={styles.itemContent} onPress={() => onToggle(item.id)}>
        <View style={styles.itemLeft}>
          <Text style={[styles.itemText, item.completed && styles.completedText]}>
            {item.text}
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
  itemText: { fontSize: 16, color: '#333' },
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