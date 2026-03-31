import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
        const { name, image, cost } = action.payload; // Assuming action payload holds object of item to add
        // Check if item already exists in the cart
        const existingItem = state.items.find(item => item.name === name);
        if (existingItem) {
            // If item already exists in cart, increment its cart quantity by 1
            existingItem.quantity++;
        } else {
            // If item does not exist, add it to the cart
            state.items.push({name, image, cost, quantity: 1});
        }
    },
    removeItem: (state, action) => {
        // Remove an item from the cart
        state.items = state.items.filter(item => item.name !== action.payload);
    },
    updateQuantity: (state, action) => {
        const { name, quantity } = action.payload;  // Assuming action payload has name and quantity of item to update
        // Check if item already exists in cart
        const itemExists = state.items.find(item => item.name === name);
        if (itemExists) {
            // If item already exists in cart, update its quantity to that retrieved in the payload
            itemExists.quantity = quantity;
        }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
