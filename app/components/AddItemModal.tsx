"use client"

// ============================================
// ADD ITEM MODAL COMPONENT
// ============================================
// This modal appears as an overlay when the user wants to add a new item
// It includes a blur effect on the background and has Discard/Save buttons

import { Picker } from "@react-native-picker/picker"
import { BlurView } from "expo-blur"
import { useState } from "react"
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"

// ============================================
// COMPONENT PROPS
// ============================================
interface AddItemModalProps {
  visible: boolean // Controls whether the modal is shown
  onClose: () => void // Callback when modal is closed (Discard button)
  onSave: (itemName: string, quantity: string, priority: number) => void // Callback when Save is pressed
}

// (Removed textual priority symbols in favor of circular icons)

// ============================================
// HELPER FUNCTION: Get Priority Color
// ============================================
// Returns color based on priority level
const getPriorityColor = (priority: number): string => {
  switch (priority) {
    case 1:
      return "#34C759" // Green - low priority
    case 2:
      return "#FFCC00" // Yellow - moderate priority
    case 3:
      return "#FF3B30" // Red - high priority
    default:
      return "#34C759"
  }
}

// ============================================
// MAIN COMPONENT
// ============================================
export default function AddItemModal({ visible, onClose, onSave }: AddItemModalProps) {
  // ============================================
  // LOCAL STATE
  // ============================================
  const [itemName, setItemName] = useState("") // Item name input
  const [quantity, setQuantity] = useState("") // Quantity input
  const [unit, setUnit] = useState<string>("lbs") // Unit for quantity
  const [priority, setPriority] = useState<number>(1) // Selected priority level

  // ============================================
  // FUNCTION: Handle Save
  // ============================================
  // Validates inputs and calls the onSave callback
  const handleSave = () => {
    // Only save if both fields are filled
    if (itemName.trim() && quantity.trim()) {
      // combine numeric quantity and unit into a single string (e.g., "2 lbs")
      const combinedQuantity = `${quantity.trim()} ${unit}`.trim()
      onSave(itemName.trim(), combinedQuantity, priority)
      // Reset form fields
      setItemName("")
      setQuantity("")
      setUnit("lbs")
      setPriority(1)
    }
  }

  // ============================================
  // FUNCTION: Handle Discard
  // ============================================
  // Closes modal and resets form fields
  const handleDiscard = () => {
    setItemName("")
    setQuantity("")
    setPriority(1)
    onClose()
  }

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      {/* ============================================
          BLUR OVERLAY
          Blurs the background content when modal is open
          ============================================ */}
      <BlurView intensity={25} style={styles.blurContainer}>
        {/* ============================================
            MODAL CONTENT CARD
            White card containing the form
            ============================================ */}
        <View style={styles.modalCard}>
          {/* Modal title */}
          <Text style={styles.modalTitle}>Add New Item</Text>

          {/* Item name input field */}
          <TextInput
            style={styles.textInput}
            placeholder="Item name (e.g., Milk)"
            placeholderTextColor="#999"
            value={itemName}
            onChangeText={setItemName}
          />

          {/* Quantity input field with inline unit picker */}
          <View style={styles.quantityRow}>
            <TextInput
              style={[styles.textInput, styles.quantityInput]}
              placeholder="Quantity (e.g., 2)"
              placeholderTextColor="#999"
              value={quantity}
              onChangeText={setQuantity}
              keyboardType="numeric"
            />
            <View style={styles.unitPickerContainer}>
              <Picker selectedValue={unit} onValueChange={(value) => setUnit(String(value))} style={styles.unitPicker}>
                <Picker.Item label="lbs" value="lbs" />
                <Picker.Item label="kg" value="kg" />
                <Picker.Item label="gal" value="gal" />
                <Picker.Item label="oz" value="oz" />
                <Picker.Item label="g" value="g" />
              </Picker>
            </View>
          </View>

          {/* ============================================
              PRIORITY SELECTOR
              Three buttons for low/moderate/high priority
              ============================================ */}
          <View style={styles.priorityContainer}>
            <Text style={styles.priorityLabel}>Priority:</Text>
            {[1, 2, 3].map((level) => (
              <TouchableOpacity
                key={level}
                style={[styles.priorityButtonWrapper]}
                onPress={() => setPriority(level)}
                activeOpacity={0.8}
                accessibilityLabel={`Set priority ${level}`}>
                <View
                  style={[
                    styles.priorityCircle,
                    { backgroundColor: getPriorityColor(level) },
                    priority === level ? styles.priorityCircleSelected : { opacity: 0.45 },
                  ]}
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* ============================================
              ACTION BUTTONS
              Discard on left, Save on right
              ============================================ */}
          <View style={styles.actionButtons}>
            {/* Discard button - closes modal without saving */}
            <TouchableOpacity style={styles.discardButton} onPress={handleDiscard} activeOpacity={0.7}>
              <Text style={styles.discardButtonText}>Discard</Text>
            </TouchableOpacity>

            {/* Save button - adds the item to the list */}
            <TouchableOpacity style={styles.saveButton} onPress={handleSave} activeOpacity={0.7}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BlurView>
    </Modal>
  )
}

// ============================================
// STYLES
// ============================================
const styles = StyleSheet.create({
  // Blur container - covers entire screen
  blurContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Semi-transparent dark overlay
  },

  // Modal card - white container with form
  modalCard: {
    width: "85%",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    overflow: "visible",
  },

  // Modal title text
  modalTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 20,
    textAlign: "center",
  },

  // Text input fields for item name and quantity
  textInput: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: "#000000",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(85, 83, 83, 0.2)",
  },

  // Quantity row: input + unit picker inline
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  quantityInput: {
    flex: 1,
    marginRight: 8,
  },
  unitPickerContainer: {
    width: 140,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    overflow: "visible",
    borderWidth: 1,
    borderColor: "rgba(85, 83, 83, 0.12)",
    paddingHorizontal: 6,
  },
  unitPicker: {
    height: 48,
    width: "100%",
    color: "#000000",
  },

  // Priority selector container
  priorityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },

  // "Priority:" label
  priorityLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    marginRight: 12,
  },

  // Individual priority button (!, !!, !!!)
  priorityButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "rgba(85, 83, 83, 0.3)",
    backgroundColor: "#FFFFFF",
  },

  priorityButtonWrapper: {
    marginRight: 12,
  },

  priorityCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "rgba(0,0,0,0.08)",
  },

  priorityCircleSelected: {
    transform: [{ scale: 1.05 }],
    opacity: 1,
  },

  // Selected priority button style
  selectedPriority: {
    backgroundColor: "#E3F2FD", // Light blue background when selected
    borderColor: "#1D31FF", // User's gradient blue color
  },

  // Priority symbol text (!, !!, !!!)
  priorityButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },

  // Action buttons container (Discard and Save)
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },

  // Discard button (left side)
  discardButton: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(85, 83, 83, 0.3)",
  },

  // Discard button text
  discardButtonText: {
    color: "#666666",
    fontSize: 16,
    fontWeight: "600",
  },

  // Save button (right side)
  saveButton: {
    flex: 1,
    backgroundColor: "#581046", // User's specified dark purple color
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
  },

  // Save button text
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
})
