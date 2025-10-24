import React, { useState } from 'react';
import {
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

interface ShoppingItem {
  id: string;
  text: string;
  completed: boolean;
  priority: number; // 1 = low (!), 2 = moderate (!!), 3 = high (!!!)
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
        priority: priority
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
    Alert.alert(
      'Delete Item',
      'Are you sure you want to delete this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () =>
          setItems(items.filter(item => item.id !== id))
        }
      ]
    );
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
      case 1: return '#4CAF50'; // Green for low
      case 2: return '#FF9800'; // Orange for moderate
      case 3: return '#F44336'; // Red for high
      default: return '#4CAF50';
    }
  };

  const renderItem = ({ item }: { item: ShoppingItem }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.itemContent}
        onPress={() => toggleItem(item.id)}
      >
        <View style={styles.itemLeft}>
          <Text style={[
            styles.itemText,
            item.completed && styles.completedText
          ]}>
            {item.text}
          </Text>
        </View>
        <View style={styles.itemRight}>
          <Text style={[
            styles.priorityText,
            { color: getPriorityColor(item.priority) }
          ]}>
            {getPriorityText(item.priority)}
          </Text>
          <Text style={styles.itemNumber}>
            {items.indexOf(item) + 1}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteItem(item.id)}
      >
        <Text style={styles.deleteButtonText}>×</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
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
                priority === level && styles.selectedPriority
              ]}
              onPress={() => setPriority(level)}
            >
              <Text style={[
                styles.priorityButtonText,
                { color: getPriorityColor(level) }
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
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  itemContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  itemLeft: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priorityText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
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
  deleteButton: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: 20,
    color: '#f44336',
    fontWeight: 'bold',
  },
});
