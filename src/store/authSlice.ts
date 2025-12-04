import type { User } from "@/types/userType";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess(state, action: PayloadAction<User>) {

            const user = action.payload;

            if (!user) return;
            state.user = user;
            state.isAuthenticated = true;

            localStorage.setItem("authUser", JSON.stringify(action.payload));
        },
        loadUserFromStorage(state) {
            // const stored = localStorage.getItem("authUser");
            // if (stored) {
            //     state.user = JSON.parse(stored);
            //     state.isAuthenticated = true;
            // }
        },
        logout(state) {
            state.user = null;
            state.isAuthenticated = false;

            localStorage.removeItem("authUser");
        },
    },
});

export const { loginSuccess, loadUserFromStorage, logout } = authSlice.actions;
export default authSlice.reducer;
