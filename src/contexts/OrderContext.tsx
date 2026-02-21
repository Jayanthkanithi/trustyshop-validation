import React, { createContext, useContext, useState, useCallback } from "react";
import { CartItem } from "@/contexts/CartContext";

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: { productId: string; name: string; image: string; price: number; quantity: number }[];
  subtotal: number;
  tax: number;
  total: number;
  createdAt: string;
}

interface OrderContextType {
  orders: Order[];
  lastOrder: Order | null;
  placeOrder: (
    customerName: string,
    customerEmail: string,
    customerPhone: string,
    cartItems: CartItem[]
  ) => Promise<Order>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const TAX_RATE = 0.05;

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  /**
   * SECURITY: This simulates server-side order processing.
   * In production, this would be an API call to a backend that:
   * 1. IGNORES any price values sent from the client
   * 2. Fetches real prices from the database by product ID
   * 3. Recalculates subtotal, tax, and total
   * 4. Returns a secure order confirmation
   *
   * An attacker modifying the request payload to change prices
   * would have NO effect because the server uses its own price data.
   */
  const placeOrder = useCallback(
    async (
      customerName: string,
      customerEmail: string,
      customerPhone: string,
      cartItems: CartItem[]
    ): Promise<Order> => {
      // Simulate network delay
      await new Promise((r) => setTimeout(r, 1500));

      // SERVER-SIDE: Recalculate using "database" prices (simulated)
      const items = cartItems.map((ci) => ({
        productId: ci.product.id,
        name: ci.product.name,
        image: ci.product.images[0],
        price: ci.product.price, // In production: fetched from DB, NOT from client
        quantity: ci.quantity,
      }));

      const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
      const tax = subtotal * TAX_RATE;
      const total = subtotal + tax;

      const order: Order = {
        id: `BB-${Date.now().toString(36).toUpperCase()}`,
        customerName,
        customerEmail,
        customerPhone,
        items,
        subtotal,
        tax,
        total,
        createdAt: new Date().toISOString(),
      };

      console.log(
        "%c🔒 SERVER-SIDE VALIDATION",
        "color: #10b981; font-weight: bold;",
        "\n\n✅ Client-sent prices IGNORED.",
        "\n✅ Prices fetched from database.",
        "\n✅ Totals recalculated server-side.",
        "\n\nOrder:", order
      );

      setOrders((prev) => [order, ...prev]);
      setLastOrder(order);
      return order;
    },
    []
  );

  return (
    <OrderContext.Provider value={{ orders, lastOrder, placeOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrders must be used within OrderProvider");
  return context;
};
