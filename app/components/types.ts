// ============================================
// TYPE DEFINITIONS
// ============================================
// This file contains all TypeScript interfaces and types
// used throughout the Personal List shopping app

// ============================================
// INTERFACE: Shopping Item Data Structure
// ============================================
// Defines the shape of each shopping list item
export interface ShoppingItem {
  id: string // Unique identifier for the item (generated using timestamp)
  text: string // Item name (e.g., "Milk", "Bread")
  quantity: string // Quantity/amount (e.g., "2L", "1pack")
  completed: boolean // Whether the item has been checked off the list
  priority: number // Priority level: 1 = low (!), 2 = moderate (!!), 3 = high (!!!)
}
