import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';

// Create Redux store for application
const store = configureStore({
    // Define the root reducer object
    reducer: {
        // 'cart' is the name of the slice in the store, managed by cartReducer
        cart: cartReducer,
    },
});
export default store;  // Export store for use in the application
