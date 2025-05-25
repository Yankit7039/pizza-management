"use client"

import type React from "react"
import { createContext, useContext, useReducer, type ReactNode } from "react"

// Types
export interface Customer {
  id: number
  name: string
  email: string
  phone: string
  address: string
  totalOrders: number
  totalSpent: number
  lastOrder: string
  status: "VIP" | "Regular" | "New"
  rating: number
  joinDate: string
}

export interface Order {
  id: string
  customerName: string
  customerPhone: string
  customerAddress: string
  pizzaType: string
  quantity: number
  size: string
  orderDate: string
  status: "Pending" | "Preparing" | "Out for Delivery" | "Delivered" | "Cancelled"
  total: number
  estimatedDelivery?: string
  actualDelivery?: string
  notes: string
  paymentMethod: string
  driver?: string | null
}

export interface MenuItem {
  id: number
  name: string
  description: string
  category: string
  price: { small: number; medium: number; large: number }
  ingredients: string[]
  allergens: string[]
  calories: { small: number; medium: number; large: number }
  prepTime: number
  isAvailable: boolean
  isPopular: boolean
  image: string
}

export interface InventoryItem {
  id: number
  name: string
  category: string
  currentStock: number
  minStock: number
  maxStock: number
  unit: string
  costPerUnit: number
  supplier: string
  lastRestocked: string
  status: "In Stock" | "Low Stock" | "Critical"
}

interface AppState {
  customers: Customer[]
  orders: Order[]
  menuItems: MenuItem[]
  inventory: InventoryItem[]
}

type AppAction =
  | { type: "ADD_CUSTOMER"; payload: Customer }
  | { type: "UPDATE_CUSTOMER"; payload: Customer }
  | { type: "DELETE_CUSTOMER"; payload: number }
  | { type: "ADD_ORDER"; payload: Order }
  | { type: "UPDATE_ORDER"; payload: Order }
  | { type: "UPDATE_ORDER_STATUS"; payload: { id: string; status: Order["status"] } }
  | { type: "DELETE_ORDER"; payload: string }
  | { type: "ADD_MENU_ITEM"; payload: MenuItem }
  | { type: "UPDATE_MENU_ITEM"; payload: MenuItem }
  | { type: "DELETE_MENU_ITEM"; payload: number }
  | { type: "TOGGLE_MENU_ITEM_AVAILABILITY"; payload: number }
  | { type: "ADD_INVENTORY_ITEM"; payload: InventoryItem }
  | { type: "UPDATE_INVENTORY_ITEM"; payload: InventoryItem }
  | { type: "DELETE_INVENTORY_ITEM"; payload: number }

// Initial state with Indian data
const initialState: AppState = {
  customers: [
    {
      id: 1,
      name: "Rajesh Kumar",
      email: "rajesh.kumar@email.com",
      phone: "+91 98765 43210",
      address: "123 CP Market, Connaught Place, New Delhi 110001",
      totalOrders: 24,
      totalSpent: 9730,
      lastOrder: "2024-01-15",
      status: "VIP",
      rating: 5,
      joinDate: "2023-03-15",
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya.sharma@email.com",
      phone: "+91 87654 32109",
      address: "456 Lajpat Nagar, South Delhi, New Delhi 110024",
      totalOrders: 18,
      totalSpent: 6495,
      lastOrder: "2024-01-12",
      status: "Regular",
      rating: 4,
      joinDate: "2023-05-22",
    },
    {
      id: 3,
      name: "Amit Patel",
      email: "amit.patel@email.com",
      phone: "+91 76543 21098",
      address: "789 Karol Bagh, Central Delhi, New Delhi 110005",
      totalOrders: 8,
      totalSpent: 3125,
      lastOrder: "2024-01-10",
      status: "New",
      rating: 4,
      joinDate: "2023-12-01",
    },
    {
      id: 4,
      name: "Sneha Gupta",
      email: "sneha.gupta@email.com",
      phone: "+91 65432 10987",
      address: "321 Rohini Sector 7, North Delhi, New Delhi 110085",
      totalOrders: 35,
      totalSpent: 14856,
      lastOrder: "2024-01-14",
      status: "VIP",
      rating: 5,
      joinDate: "2023-01-10",
    },
  ],
  orders: [
    {
      id: "PZA001",
      customerName: "Rajesh Kumar",
      customerPhone: "+91 98765 43210",
      customerAddress: "123 CP Market, Connaught Place, New Delhi 110001",
      pizzaType: "Margherita",
      quantity: 2,
      size: "Large",
      orderDate: "2024-01-15 14:30",
      status: "Delivered",
      total: 599,
      estimatedDelivery: "2024-01-15 15:15",
      actualDelivery: "2024-01-15 15:12",
      notes: "Extra cheese, no onions",
      paymentMethod: "UPI",
      driver: "Vikram Singh",
    },
    {
      id: "PZA002",
      customerName: "Priya Sharma",
      customerPhone: "+91 87654 32109",
      customerAddress: "456 Lajpat Nagar, South Delhi, New Delhi 110024",
      pizzaType: "Pepperoni",
      quantity: 1,
      size: "Medium",
      orderDate: "2024-01-15 15:45",
      status: "Preparing",
      total: 459,
      estimatedDelivery: "2024-01-15 16:30",
      notes: "Ring doorbell twice",
      paymentMethod: "Cash",
      driver: null,
    },
    {
      id: "PZA003",
      customerName: "Amit Patel",
      customerPhone: "+91 76543 21098",
      customerAddress: "789 Karol Bagh, Central Delhi, New Delhi 110005",
      pizzaType: "Veggie Supreme",
      quantity: 3,
      size: "Large",
      orderDate: "2024-01-15 16:20",
      status: "Out for Delivery",
      total: 1139,
      estimatedDelivery: "2024-01-15 17:05",
      notes: "Leave at door if no answer",
      paymentMethod: "Card",
      driver: "Ravi Kumar",
    },
    {
      id: "PZA004",
      customerName: "Sneha Gupta",
      customerPhone: "+91 65432 10987",
      customerAddress: "321 Rohini Sector 7, North Delhi, New Delhi 110085",
      pizzaType: "Paneer Tikka",
      quantity: 1,
      size: "Small",
      orderDate: "2024-01-15 17:10",
      status: "Pending",
      total: 349,
      estimatedDelivery: "2024-01-15 17:55",
      notes: "",
      paymentMethod: "UPI",
      driver: null,
    },
    {
      id: "PZA005",
      customerName: "Arjun Mehta",
      customerPhone: "+91 54321 09876",
      customerAddress: "654 Dwarka Sector 12, South West Delhi, New Delhi 110078",
      pizzaType: "Chicken Tikka",
      quantity: 2,
      size: "Large",
      orderDate: "2024-01-15 18:30",
      status: "Cancelled",
      total: 799,
      notes: "Customer requested cancellation",
      paymentMethod: "UPI",
      driver: null,
    },
  ],
  menuItems: [
    {
      id: 1,
      name: "Margherita Classic",
      description: "Fresh mozzarella, tomato sauce, basil, and olive oil",
      category: "Classic",
      price: { small: 249, medium: 349, large: 449 },
      ingredients: ["Mozzarella", "Tomato Sauce", "Fresh Basil", "Olive Oil"],
      allergens: ["Dairy", "Gluten"],
      calories: { small: 220, medium: 280, large: 340 },
      prepTime: 12,
      isAvailable: true,
      isPopular: true,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 2,
      name: "Paneer Tikka Supreme",
      description: "Marinated paneer, bell peppers, onions with tikka sauce",
      category: "Vegetarian",
      price: { small: 299, medium: 399, large: 499 },
      ingredients: ["Paneer", "Bell Peppers", "Onions", "Tikka Sauce", "Mozzarella"],
      allergens: ["Dairy", "Gluten"],
      calories: { small: 280, medium: 350, large: 420 },
      prepTime: 14,
      isAvailable: true,
      isPopular: true,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 3,
      name: "Chicken Tikka Deluxe",
      description: "Tender chicken tikka with onions and capsicum",
      category: "Non-Vegetarian",
      price: { small: 349, medium: 449, large: 549 },
      ingredients: ["Chicken Tikka", "Onions", "Capsicum", "Tikka Sauce", "Mozzarella"],
      allergens: ["Dairy", "Gluten"],
      calories: { small: 320, medium: 400, large: 480 },
      prepTime: 16,
      isAvailable: true,
      isPopular: true,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 4,
      name: "Veggie Garden",
      description: "Bell peppers, mushrooms, onions, olives, and fresh tomatoes",
      category: "Vegetarian",
      price: { small: 279, medium: 379, large: 479 },
      ingredients: ["Bell Peppers", "Mushrooms", "Red Onions", "Black Olives", "Fresh Tomatoes"],
      allergens: ["Dairy", "Gluten"],
      calories: { small: 200, medium: 260, large: 320 },
      prepTime: 13,
      isAvailable: true,
      isPopular: false,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 5,
      name: "Keema Masala",
      description: "Spiced minced mutton with onions and Indian spices",
      category: "Non-Vegetarian",
      price: { small: 399, medium: 499, large: 599 },
      ingredients: ["Minced Mutton", "Onions", "Indian Spices", "Mozzarella"],
      allergens: ["Dairy", "Gluten"],
      calories: { small: 380, medium: 480, large: 580 },
      prepTime: 18,
      isAvailable: false,
      isPopular: true,
      image: "/placeholder.svg?height=200&width=200",
    },
  ],
  inventory: [
    {
      id: 1,
      name: "Pizza Dough",
      category: "Base",
      currentStock: 45,
      minStock: 20,
      maxStock: 100,
      unit: "kg",
      costPerUnit: 60,
      supplier: "Fresh Ingredients Delhi",
      lastRestocked: "2024-01-10",
      status: "In Stock",
    },
    {
      id: 2,
      name: "Mozzarella Cheese",
      category: "Cheese",
      currentStock: 8,
      minStock: 15,
      maxStock: 50,
      unit: "kg",
      costPerUnit: 450,
      supplier: "Amul Dairy",
      lastRestocked: "2024-01-08",
      status: "Low Stock",
    },
    {
      id: 3,
      name: "Tomato Sauce",
      category: "Sauce",
      currentStock: 25,
      minStock: 10,
      maxStock: 40,
      unit: "L",
      costPerUnit: 120,
      supplier: "Kissan Foods",
      lastRestocked: "2024-01-12",
      status: "In Stock",
    },
    {
      id: 4,
      name: "Paneer",
      category: "Dairy",
      currentStock: 2,
      minStock: 5,
      maxStock: 20,
      unit: "kg",
      costPerUnit: 280,
      supplier: "Mother Dairy",
      lastRestocked: "2024-01-05",
      status: "Critical",
    },
    {
      id: 5,
      name: "Bell Peppers",
      category: "Vegetables",
      currentStock: 12,
      minStock: 8,
      maxStock: 25,
      unit: "kg",
      costPerUnit: 80,
      supplier: "Azadpur Mandi",
      lastRestocked: "2024-01-14",
      status: "In Stock",
    },
  ],
}

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "ADD_CUSTOMER":
      return {
        ...state,
        customers: [...state.customers, action.payload],
      }
    case "UPDATE_CUSTOMER":
      return {
        ...state,
        customers: state.customers.map((customer) => (customer.id === action.payload.id ? action.payload : customer)),
      }
    case "DELETE_CUSTOMER":
      return {
        ...state,
        customers: state.customers.filter((customer) => customer.id !== action.payload),
      }
    case "ADD_ORDER":
      return {
        ...state,
        orders: [...state.orders, action.payload],
      }
    case "UPDATE_ORDER":
      return {
        ...state,
        orders: state.orders.map((order) => (order.id === action.payload.id ? action.payload : order)),
      }
    case "UPDATE_ORDER_STATUS":
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.id === action.payload.id ? { ...order, status: action.payload.status } : order,
        ),
      }
    case "DELETE_ORDER":
      return {
        ...state,
        orders: state.orders.filter((order) => order.id !== action.payload),
      }
    case "ADD_MENU_ITEM":
      return {
        ...state,
        menuItems: [...state.menuItems, action.payload],
      }
    case "UPDATE_MENU_ITEM":
      return {
        ...state,
        menuItems: state.menuItems.map((item) => (item.id === action.payload.id ? action.payload : item)),
      }
    case "DELETE_MENU_ITEM":
      return {
        ...state,
        menuItems: state.menuItems.filter((item) => item.id !== action.payload),
      }
    case "TOGGLE_MENU_ITEM_AVAILABILITY":
      return {
        ...state,
        menuItems: state.menuItems.map((item) =>
          item.id === action.payload ? { ...item, isAvailable: !item.isAvailable } : item,
        ),
      }
    case "ADD_INVENTORY_ITEM":
      return {
        ...state,
        inventory: [...state.inventory, action.payload],
      }
    case "UPDATE_INVENTORY_ITEM":
      return {
        ...state,
        inventory: state.inventory.map((item) => (item.id === action.payload.id ? action.payload : item)),
      }
    case "DELETE_INVENTORY_ITEM":
      return {
        ...state,
        inventory: state.inventory.filter((item) => item.id !== action.payload),
      }
    default:
      return state
  }
}

const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<AppAction>
} | null>(null)

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}
