import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// User type
type User = {
  name: string;
  email: string;
};

// Cart item type
type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  images: string[];
};

// App context type
type AppContextType = {
  user: User | null;
  login: (user: User) => void;
  register: (user: User) => void;
  logout: () => void;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void; // NEW
};

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Hook to use context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
};

// Provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load user and cart from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedCart = localStorage.getItem("cart");

    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Login
  const login = (user: User) => setUser(user);

  // Register (simulated)
  const register = (user: User) => setUser(user);

  // Logout
  const logout = () => setUser(null);

  // Add item to cart
  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      } else {
        return [...prev, item];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  // Update item quantity
  const updateQuantity = (id: string, quantity: number) => {
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  };

  // Clear entire cart
  const clearCart = () => setCart([]);

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart, // NEW
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
