import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("henei-cart");
    return saved ? JSON.parse(saved) : [];
  });

  const addToCart = (dish) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item._id === dish._id);
      if (exists) {
        return prev.map((item) =>
          item._id === dish._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...dish, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  };

  const clearCart = () => setCartItems([]);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  // ✅ Ghi lại vào localStorage mỗi khi thay đổi
  useEffect(() => {
    localStorage.setItem("henei-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateQuantity, removeFromCart, clearCart, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};
