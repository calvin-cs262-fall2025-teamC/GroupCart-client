import { useFonts } from "expo-font";
import { LinearGradient } from 'expo-linear-gradient';
import { SplashScreen } from "expo-router";

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
import { horizontalScale, moderateScale, verticalScale } from '../utils/scaling';


interface ShoppingItem {
  id: string;
  text: string;
  completed: boolean;
  priority: number;
}


export default function MyList() {



  let [fontsLoaded] = useFonts({
    'Shanti': require('../../assets/images/Shanti-Regular.ttf'),
    'Montserrat': require('../../assets/images/Montserrat-Regular.ttf')
  });


  // ✅ Move these above the return
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [newItem, setNewItem] = useState('');
  const [priority, setPriority] = useState<number>(1);

if (!fontsLoaded) {
  SplashScreen.preventAutoHideAsync();
  return null;
}



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

      colors={["#f2b2ffff", "#eed3ffff", "#bdc5f1ff", "#ffffffff"]}
      // Gradient direction: starts from top-right, flows to bottom-left
      // [x1, y1] = start point, [x2, y2] = end point
      start={{ x: 1, y: 0}} // Top right
      end={{ x: 0, y: 1 }} // Bottom left

      locations={[0.1, 0.3, 0.6, 1]}
      style={[styles.background]}
    >

      <View style={styles.overlay}>


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
    padding: horizontalScale(20),
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // optional for readability
  },

  inputContainer: {
    backgroundColor: 'white',
    padding: horizontalScale(15),
    borderRadius: moderateScale(15),
    marginBottom: verticalScale(20),
    elevation: 3,
   fontFamily: 'Montserrat',
    marginTop: verticalScale(10),
  },
  textInput: {
    borderWidth: moderateScale(1),
    borderColor: '#ddd',
    borderRadius: moderateScale(30),
    padding: verticalScale(12),
    fontSize: moderateScale(16),
    marginBottom: verticalScale(15),
    fontFamily: 'Montserrat',
  },
  priorityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(15),
    fontFamily: 'Montserrat',
  },
  priorityLabel: {
    fontSize: moderateScale(16),
    marginRight: horizontalScale(10),
    color: '#333',
    fontFamily: 'Montserrat',
  },
  priorityButton: {
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(8),
    marginRight: horizontalScale(8),
    borderRadius: moderateScale(6),
    borderWidth: moderateScale(1),
    borderColor: '#ddd',
    fontFamily: 'Montserrat',
  },
  selectedPriority: {
    backgroundColor: '#e3f2fd',
  },
  priorityButtonText: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
  addButton: {
    backgroundColor: '#360479ff',
    padding: verticalScale(12),
    borderRadius: moderateScale(15),
    alignItems: 'center',
    fontFamily: 'Montserrat',
  },
  addButtonText: {
    color: '#fff',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
  list: {
    flex: 1,

  },
});