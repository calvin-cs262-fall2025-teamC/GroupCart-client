import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ShoppingItemRow from '../components/ShoppingItemRow';
interface ShoppingItem {
  id: string;
  text: string;
  completed: boolean;
  priority: number;
}

export default function MyList() {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [newItem, setNewItem] = useState('');
  const [priority, setPriority] = useState<number>(1);

  const addItem = () => {
    if (newItem.trim()) {
      const newShoppingItem: ShoppingItem = {
        id: Date.now().toString(),
        text: newItem.trim(),
        completed: false,
        priority,
      };
      setItems([...items, newShoppingItem]);
      setNewItem('');
      setPriority(1);
    }
  };

  const toggleItem = (id: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const deleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const getPriorityText = (priority: number) => {
    switch (priority) {
      case 1: return '!';
      case 2: return '!!';
      case 3: return '!!!';
      default: return '!';
    }
  };

  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 1: return '#4CAF50';
      case 2: return '#FF9800';
      case 3: return '#F44336';
      default: return '#4CAF50';
    }
  };

  return (
    <LinearGradient
      // Gradient colors from your design
      // #FF5EFF - Vibrant hot pink/magenta (was #EC89F5)
      // #A77FFF - Vibrant purple (was #CCB5F0)
      // #FF9FE0 - Vibrant light pink (was #E9C5D2)
      // #1D31FF - Vibrant blue (unchanged, already vibrant)
      colors={["#f2b2ffff", "#eed3ffff", "#bdc5f1ff", "#ffffffff"]}
      // Gradient direction: starts from top-right, flows to bottom-left
      // [x1, y1] = start point, [x2, y2] = end point
      start={{ x: 1, y: 0}} // Top right
      end={{ x: 0, y: 1 }} // Bottom left

      locations={[0.1, 0.3, 0.6, 1]}
      style={[styles.background]}
    >

      <View style={styles.overlay}>
        <Text style={styles.title}>Shopping List Items</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Add new item..."
            value={newItem}
            onChangeText={setNewItem}
            onSubmitEditing={addItem}
          />

          <View style={styles.priorityContainer}>
            <Text style={styles.priorityLabel}>Priority:</Text>
            {[1, 2, 3].map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.priorityButton,
                  priority === level && styles.selectedPriority,
                ]}
                onPress={() => setPriority(level)}
              >
                <Text style={[
                  styles.priorityButtonText,
                  { color: getPriorityColor(level) },
                ]}>
                  {getPriorityText(level)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.addButton} onPress={addItem}>
            <Text style={styles.addButtonText}>Add Item</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={items}
          renderItem={({ item, index }) => (
            <ShoppingItemRow
              item={item}
              index={index}
              onToggle={toggleItem}
              onDelete={deleteItem}
              getPriorityText={getPriorityText}
              getPriorityColor={getPriorityColor}
            />
          )}
          keyExtractor={(item) => item.id}
          style={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // optional for readability
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  priorityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  priorityLabel: {
    fontSize: 16,
    marginRight: 10,
    color: '#333',
  },
  priorityButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedPriority: {
    backgroundColor: '#e3f2fd',
  },
  priorityButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
  },
});