// store/slices/uiSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface Notification {
    id: string;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    duration?: number;
}

interface UIState {
    notifications: Notification[];
    isMobileMenuOpen: boolean;
    isCartOpen: boolean;
    isSearchOpen: boolean;
}

const initialState: UIState = {
    notifications: [],
    isMobileMenuOpen: false,
    isCartOpen: false,
    isSearchOpen: false,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        addNotification: (state, action: PayloadAction<Omit<Notification, 'id'>>) => {
            const id = Date.now().toString();
            state.notifications.push({ ...action.payload, id });
        },
        removeNotification: (state, action: PayloadAction<string>) => {
            state.notifications = state.notifications.filter(n => n.id !== action.payload);
        },
        toggleMobileMenu: (state) => {
            state.isMobileMenuOpen = !state.isMobileMenuOpen;
        },
        toggleCart: (state) => {
            state.isCartOpen = !state.isCartOpen;
        },
        toggleSearch: (state) => {
            state.isSearchOpen = !state.isSearchOpen;
        },
        closeAll: (state) => {
            state.isMobileMenuOpen = false;
            state.isCartOpen = false;
            state.isSearchOpen = false;
        },
    },
});

export const {
    addNotification,
    removeNotification,
    toggleMobileMenu,
    toggleCart,
    toggleSearch,
    closeAll,
} = uiSlice.actions;

// Selectors
export const selectNotifications = (state: { ui: UIState }) => state.ui.notifications;
export const selectIsMobileMenuOpen = (state: { ui: UIState }) => state.ui.isMobileMenuOpen;
export const selectIsCartOpen = (state: { ui: UIState }) => state.ui.isCartOpen;
export const selectIsSearchOpen = (state: { ui: UIState }) => state.ui.isSearchOpen;

export default uiSlice.reducer;