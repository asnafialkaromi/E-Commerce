import http from "@/api/http";
import type { LoginPayload, LoginResponse } from "@/types/auth-type";

export const AuthService = {
    async login(payload: LoginPayload) : Promise<LoginResponse> {
        const {data} = await http.post<LoginResponse>("/auth/login", payload);
        return data;
    }
}