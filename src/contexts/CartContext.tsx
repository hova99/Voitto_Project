import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  image2?: string; // Optional second image for product detail page
  category: string;
  description: string;
  unit: string;
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
}

type CartAction = 
  | { type: 'ADD_ITEM'; payload: Product & { quantity?: number } }
  | { type: 'REMOVE_ITEM'; productId: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; quantity: number }
  | { type: 'CLEAR_CART' };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

// Helper function to calculate total safely
const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => {
    // If price is 0, don't add to total calculation
    if (item.price === 0) {
      return sum;
    }
    return sum + (item.price * item.quantity);
  }, 0);
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      const quantity = action.payload.quantity || 1;
      
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        return {
          items: updatedItems,
          total: calculateTotal(updatedItems)
        };
      }
      
      const newItems = [...state.items, { ...action.payload, quantity }];
      return {
        items: newItems,
        total: calculateTotal(newItems)
      };
    }
    
    case 'REMOVE_ITEM': {
      const filteredItems = state.items.filter(item => item.id !== action.productId);
      return {
        items: filteredItems,
        total: calculateTotal(filteredItems)
      };
    }
    
    case 'UPDATE_QUANTITY': {
      if (action.quantity <= 0) {
        const filteredItems = state.items.filter(item => item.id !== action.productId);
        return {
          items: filteredItems,
          total: calculateTotal(filteredItems)
        };
      }
      
      const updatedItems = state.items.map(item =>
        item.id === action.productId
          ? { ...item, quantity: action.quantity }
          : item
      );
      return {
        items: updatedItems,
        total: calculateTotal(updatedItems)
      };
    }
    
    case 'CLEAR_CART':
      return { items: [], total: 0 };
    
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });
  
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};