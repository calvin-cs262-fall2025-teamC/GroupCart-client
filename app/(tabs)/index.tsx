<<<<<<< HEAD
"use client"

// ============================================
// PERSONAL LIST SCREEN - MAIN COMPONENT
// ============================================
// This is the main screen component that displays the shopping list
// It includes sticky headers, modal for adding items, and manages all state

import { useState } from "react"
import { Alert, FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import AddItemModal from "../components/AddItemModal"
import ShoppingListItem from "../components/ShoppingListItem"
import type { ShoppingItem } from "../components/types"
const BackgroundImage = require("../../assets/images/page1_emt.png")

// ============================================
// MAIN COMPONENT
// ============================================
export default function PersonalListScreen() {
  // ============================================
  // STATE MANAGEMENT
  // ============================================

  // Array of all shopping items in the list
  const [items, setItems] = useState<ShoppingItem[]>([
    { id: "1", text: "Milk", quantity: "2L", completed: false, priority: 3 },
    { id: "2", text: "Bread", quantity: "2lbs", completed: false, priority: 1 },
    { id: "3", text: "Tea", quantity: "2packs", completed: false, priority: 2 },
    { id: "4", text: "Cake", quantity: "1pack", completed: false, priority: 3 },
  ])

  // Controls visibility of the add item modal
  const [showModal, setShowModal] = useState(false)

  // ============================================
  // FUNCTION: Add New Item
  // ============================================
  // Called when user saves a new item from the modal
  const handleAddItem = (itemName: string, quantity: string, priority: number) => {
    // Create new item object with unique ID (timestamp)
    const newItem: ShoppingItem = {
      id: Date.now().toString(),
      text: itemName,
      quantity: quantity,
      completed: false,
      priority: priority,
    }

    // Add new item to the items array
    setItems([...items, newItem])

    // Close the modal
    setShowModal(false)
  }

  // ============================================
  // FUNCTION: Toggle Item Completion
  // ============================================
  // Marks an item as completed or uncompleted (checkbox toggle)
  const handleToggleItem = (id: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)))
  }

  // ============================================
  // FUNCTION: Delete Item
  // ============================================
  // Removes an item from the list after confirmation
  const handleDeleteItem = (id: string) => {
    Alert.alert("Delete Item", "Are you sure you want to delete this item?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => setItems(items.filter((item) => item.id !== id)),
      },
    ])
  }

  // ============================================
  // FUNCTION: Render Individual Item
  // ============================================
  // Renders each shopping list item using the ShoppingListItem component
  const renderItem = ({ item }: { item: ShoppingItem }) => (
    <ShoppingListItem item={item} onToggle={handleToggleItem} onDelete={handleDeleteItem} />
  )

  // ============================================
  // FUNCTION: Render Sticky Header
  // ============================================
  // Renders the sticky header with "Personal List", "Products (4)", and add button
  const renderStickyHeader = () => (
    <View style={styles.stickyHeader}>
      {/* "Personal List" title */}
      <Text style={styles.cardTitle}>Personal List</Text>

      {/* Products header with count and add button */}
      <View style={styles.productsHeader}>
        <Text style={styles.productsCount}>Products ({items.length})</Text>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            console.log("[v0] Add button pressed")
            setShowModal(true)
          }}
          activeOpacity={0.7}
          hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
        >
          <Text style={styles.addButtonText}>×</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  // ============================================
  // RENDER: Main UI
  // ============================================
  return (
    <View style={styles.container}>
      {/* ============================================
          GRADIENT BACKGROUND
          Uses user's specified colors: #EC89F5, #CCB5F0, #E9C5D2, #1D31FF
          ============================================ */}
      <ImageBackground source={BackgroundImage} resizeMode="cover" style={styles.backgroundImage}>
        {/* ============================================
            HEADER SECTION
            Back button and "Group Cart" title
            ============================================ */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Group Cart</Text>
        </View>

        {/* ============================================
            PERSONAL LIST CARD
            White rounded card containing the shopping list
            Now uses FlatList with sticky header
            ============================================ */}
        <View style={styles.card}>
          <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={renderStickyHeader}
            stickyHeaderIndices={[0]} // Makes the header sticky when scrolling
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        </View>
  </ImageBackground>

      {/* ============================================
          ADD ITEM MODAL
          Modal overlay with blur effect
          Shows when user clicks the add button
          ============================================ */}
      <AddItemModal visible={showModal} onClose={() => setShowModal(false)} onSave={handleAddItem} />
    </View>
  )
}

// ============================================
// STYLES
// ============================================
const styles = StyleSheet.create({
  // Main container - fills entire screen
  container: {
    flex: 1,
  },

  // Gradient background - covers entire screen
  gradient: {
    flex: 1,
  },

  // Background image covering entire screen
  backgroundImage: {
    flex: 1,
    width: "auto",
    height: "120%",
  },

  // Header section with back button and title
  header: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },

  // Back button
  backButton: {
    marginBottom: 24,
  },

  // Back arrow text
  backButtonText: {
    fontSize: 28,
    color: "#000000", // User's specified black text color
  },

  // "Group Cart" title
  headerTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "#000000", // User's specified black text color
  },

  // White card containing the shopping list
  card: {
    flex: 1,
    backgroundColor: "#FFFFFF", // User's specified pure white
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  stickyHeader: {
    backgroundColor: "#FFFFFF", // Must match card background
    paddingHorizontal: 24,
    // extend header width so it covers list item borders (wider by ~20px)
    marginHorizontal: -20,
    paddingTop: 12,
    paddingBottom: 8,
    zIndex: 1000, // Ensures header stays above scrolling content
    elevation: 50,
    overflow: "visible",
    shadowColor: "transparent",
    borderBottomWidth: 0,
    borderRadius:25,
  },

  // "Personal List" title
  cardTitle: {
    fontSize: 28,
    fontWeight: "600",
    color: "#000000", // black text color
    marginBottom: 12,
  },

  // Products header with count and add button
  productsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },

  // "Products (4)" text
  productsCount: {
    fontSize: 17,
    fontWeight: "400",
    color: "#000000", // black text color
  },

  addButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    elevation: 10,
  },

  addButtonText: {
    fontSize: 32,
    fontWeight: "300",
    color: "#581046", // dark purple color
    transform: [{ rotate: "45deg" }], // Rotates × to look like +
  },

  // List content container with padding
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
})
=======
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
>>>>>>> e5308b3bb2baac67f19a1f6cbcff4184d389a6ae
