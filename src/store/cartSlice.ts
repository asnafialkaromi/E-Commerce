// store/slices/cartSlice.ts
import type { CartProduct } from '@/types/cartsTypes';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface CartState {
    products: CartProduct[];
    total: number;
    discountedTotal: number;
    totalProducts: number;
    totalQuantity: number;
}

const initialState: CartState = {
    products: [],
    total: 0,
    discountedTotal: 0,
    totalProducts: 0,
    totalQuantity: 0
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<CartProduct>) => {
            const existingItem = state.products.find(product => product.id === action.payload.id);

            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                state.products.push(action.payload);
            }

            // Recalculate totals
            state.totalQuantity = state.products.reduce((sum, item) => sum + item.quantity, 0);
            state.total = state.products.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        },
        removeItem: (state, action: PayloadAction<number>) => {
            state.products = state.products.filter(product => product.id !== action.payload);
            state.totalQuantity = state.products.reduce((sum, item) => sum + item.quantity, 0);
            state.total = state.products.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        },
        updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
            const item = state.products.find(product => product.id === action.payload.id);
            if (item) {
                item.quantity = action.payload.quantity;
                state.totalQuantity = state.products.reduce((sum, item) => sum + item.quantity, 0);
                state.total = state.products.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            }
        },
        clearCart: (state) => {
            state.products = [];
            state.totalQuantity = 0;
            state.total = 0;
        },
        syncCart: (state, action: PayloadAction<CartProduct[]>) => {
            state.products = action.payload;
            state.totalQuantity = state.products.reduce((sum, item) => sum + item.quantity, 0);
            state.total = state.products.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        },
    },
});

export const { addItem, removeItem, updateQuantity, clearCart, syncCart } = cartSlice.actions;

// Selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.products;
export const selectCartTotal = (state: { cart: CartState }) => state.cart.totalQuantity;
export const selectCartPrice = (state: { cart: CartState }) => state.cart.total;

export default cartSlice.reducer;