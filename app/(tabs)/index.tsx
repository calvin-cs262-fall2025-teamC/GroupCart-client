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
