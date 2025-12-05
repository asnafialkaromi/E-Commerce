import type { User } from "@/types/userType";
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: true, // Start with loading true for initial auth check
    error: null,
};

// Async thunk for loading user from storage
export const loadUserFromStorage = createAsyncThunk(
    'auth/loadUserFromStorage',
    async (_, { rejectWithValue }) => {
        try {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                return JSON.parse(storedUser) as User;
            }
            return null;
        } catch (error) {
            return rejectWithValue('Failed to load user from storage');
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.isLoading = false;
            state.error = null;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        clearUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.isLoading = false;
            state.error = null;
            localStorage.removeItem('user');
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadUserFromStorage.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loadUserFromStorage.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload) {
                    state.user = action.payload;
                    state.isAuthenticated = true;
                }
            })
            .addCase(loadUserFromStorage.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setUser, clearUser, setLoading, setError } = authSlice.actions;
export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectAuthLoading = (state: { auth: AuthState }) => state.auth.isLoading;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;
export default authSlice.reducer;
