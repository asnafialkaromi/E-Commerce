import apiClient from "@/lib/api/apiClient";
import type { ApiResponse } from "@/types";
import type { User } from "@/types/userType";

export const authService = {
    async login(credentials: { username: string; password: string }): Promise<User> {
        const response = await apiClient.post<ApiResponse<User>>("/auth/login", credentials);
        return response.data.data;
    },
    async register(payload: Partial<User>): Promise<User> {
        const response = await apiClient.post<ApiResponse<User>>("/auth/register", payload);
        return response.data.data;
    },

    async logout() { }
}