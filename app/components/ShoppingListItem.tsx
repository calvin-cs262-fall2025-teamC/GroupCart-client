// ============================================
// SHOPPING LIST ITEM COMPONENT
// ============================================
// This component renders a single item in the shopping list
// It displays the item name, quantity, checkbox, priority indicator,
// and delete button

import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import type { ShoppingItem } from "./types"

// ============================================
// COMPONENT PROPS
// ============================================
interface ShoppingListItemProps {
  item: ShoppingItem // The shopping item data to display
  onToggle: (id: string) => void // Callback when checkbox is tapped
  onDelete: (id: string) => void // Callback when delete button is tapped
}

// ============================================
// HELPER FUNCTION: Get Priority Color
// ============================================
// Returns the color for the priority indicator dot
// Green = low priority, Yellow = moderate, Red = high
const getPriorityColor = (priority: number): string => {
  switch (priority) {
    case 1:
      return "#34C759" // Green - low priority
    case 2:
      return "#FFCC00" // Yellow - moderate priority
    case 3:
      return "#FF3B30" // Red - high priority (user's bright red warning color)
    default:
      return "#34C759"
  }
}

// ============================================
// MAIN COMPONENT
// ============================================
export default function ShoppingListItem({ item, onToggle, onDelete }: ShoppingListItemProps) {
  return (
    <View style={styles.itemContainer}>
      {/* ============================================
          MAIN ITEM CONTENT
          Tappable area that toggles the checkbox
          ============================================ */}
      <TouchableOpacity style={styles.itemContent} onPress={() => onToggle(item.id)} activeOpacity={0.7}>
        {/* Left side: Item name and quantity */}
        <View style={styles.itemLeft}>
          <Text
            style={[
              styles.itemText,
              item.completed && styles.completedText, // Strike-through if completed
            ]}
          >
            {item.text} | {item.quantity}
          </Text>
        </View>

        {/* Right side: Checkbox with priority dot underneath */}
        <View style={styles.itemRight}>
          {/* Checkbox - shows blue checkmark when completed */}
          <View
            style={[
              styles.checkbox,
              item.completed && styles.checkboxChecked, // Blue background when checked
            ]}
          >
            {item.completed && <Text style={styles.checkmark}>✓</Text>}
          </View>

          <View style={[styles.priorityDot, { backgroundColor: getPriorityColor(item.priority) }]} />
        </View>
      </TouchableOpacity>

      {/* ============================================
          DELETE BUTTON
          Shows confirmation alert when pressed
          ============================================ */}
      <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(item.id)} activeOpacity={0.7}>
        <Text style={styles.deleteButtonText}>×</Text>
      </TouchableOpacity>
    </View>
  )
}

// ============================================
// STYLES
// ============================================
const styles = StyleSheet.create({
  // Individual item container with shadow and border
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },

  // Main item content (tappable area for checkbox toggle)
  itemContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingLeft: 20,
    paddingRight: 12,
  },

  // Left side of item (name and quantity)
  itemLeft: {
    flex: 1,
  },

  // Item text (name | quantity)
  itemText: {
    fontSize: 17,
    fontWeight: "500",
    color: "#000000", // User's specified black text color
  },

  // Completed item text style (strike-through and faded)
  completedText: {
    textDecorationLine: "line-through",
    color: "#999999",
    opacity: 0.6,
  },

  itemRight: {
    alignItems: "center",
    gap: 4, // Small gap between checkbox and priority dot
  },

  // Checkbox container
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "rgba(85, 83, 83, 0.85)", // User's specified checkbox border with 85% opacity
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },

  // Checked checkbox style (blue background)
  checkboxChecked: {
    backgroundColor: "#1D31FF", // User's gradient blue color
    borderColor: "#1D31FF",
  },

  // Checkmark symbol inside checkbox
  checkmark: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4, // Makes it a perfect circle
  },

  // Delete button on the right side
  deleteButton: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  // Delete button text (× symbol)
  deleteButtonText: {
    fontSize: 24,
    color: "#FF3B30", // User's bright red warning color
    fontWeight: "bold",
  },
})
