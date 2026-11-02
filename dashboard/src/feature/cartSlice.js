import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  isCartOpen: false,
};

const parsePrice = (price) => {
  if (typeof price === 'number') return price;
  if (typeof price === 'string') {
    return parseFloat(price.replace(/[^0-9.]/g, '')) || 0;
  }
  return 0;
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const price = parsePrice(product.price);
      const quantity = Math.max(1, Number(product.quantity) || 1);

      const existingItem = state.cartItems.find(
        (item) => item.id === product.id && (!product.color || item.color === product.color)
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cartItems.push({
          id: product.id || Date.now(),
          name: product.name || product.title || 'Product',
          category: product.category || 'Standard',
          price,
          priceFormatted: product.priceFormatted || `₹${price.toFixed(2)}`,
          quantity,
          image: product.image,
          color: product.color || null,
        });
      }
      state.isCartOpen = true;
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const target = state.cartItems.find((item) => item.id === id);
      if (target) {
        target.quantity = Math.max(1, Number(quantity) || 1);
      }
    },

    setIsCartOpen: (state, action) => {
      state.isCartOpen = Boolean(action.payload);
    },

    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },

    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const {
  addToCart: addToCartAction,
  removeFromCart: removeFromCartAction,
  updateQuantity: updateQuantityAction,
  setIsCartOpen: setIsCartOpenAction,
  toggleCart: toggleCartAction,
  clearCart: clearCartAction,
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart?.cartItems || [];
export const selectIsCartOpen = (state) => Boolean(state.cart?.isCartOpen);
export const selectCartQty = (state) =>
  (state.cart?.cartItems || []).reduce((total, item) => total + item.quantity, 0);
export const selectCartSubtotal = (state) =>
  (state.cart?.cartItems || []).reduce((total, item) => total + item.price * item.quantity, 0);

// Unified useCart Hook
export const useCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartQty = useSelector(selectCartQty);
  const subtotal = useSelector(selectCartSubtotal);
  const isCartOpen = useSelector(selectIsCartOpen);

  const addToCart = React.useCallback((product) => dispatch(addToCartAction(product)), [dispatch]);
  const removeFromCart = React.useCallback((id) => dispatch(removeFromCartAction(id)), [dispatch]);
  const updateQuantity = React.useCallback((id, quantity) => dispatch(updateQuantityAction({ id, quantity })), [dispatch]);
  const setIsCartOpen = React.useCallback((isOpen) => dispatch(setIsCartOpenAction(isOpen)), [dispatch]);
  const toggleCart = React.useCallback(() => dispatch(toggleCartAction()), [dispatch]);
  const clearCart = React.useCallback(() => dispatch(clearCartAction()), [dispatch]);

  return {
    cartItems,
    cartQty,
    subtotal,
    isCartOpen,
    setIsCartOpen,
    toggleCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    setExactQuantity: updateQuantity,
    clearCart,
  };
};

export default cartSlice.reducer;
