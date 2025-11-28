import { queryKeys } from "@/lib/queryKeys"
import { showToast } from "@/lib/toastHelper"
import { authService } from "@/services/authService"
import type { User } from "@/types/userType"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router"

// Get current authenticated user
export function useCurrentUser() {
    return useQuery({
        queryKey: queryKeys.auth.currentUser(),
        queryFn: () => authService.login,
        retry: false,
        staleTime: Infinity, // User data rarely changes
    })
}

// Login mutation
export function useLogin() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    return useMutation({
        mutationFn: (credentials: User) => authService.login(credentials),
        onSuccess: (data) => {
            // Store token
            localStorage.setItem("token", data.accessToken)

            // Set user data in cache
            queryClient.setQueryData(queryKeys.auth.currentUser(), data.accessToken)

            showToast("success", "Login successful!")

            navigate("/dashboard")
        },
        onError: (error: Error) => {
            showToast("error", error.message)
        },
    })
}

// Register mutation
// export function useRegister() {
//     const queryClient = useQueryClient()
//     const navigate = useNavigate()

//     return useMutation({
//         mutationFn: (data: RegisterData) => authService.register(data),
//         onSuccess: (data) => {
//             localStorage.setItem("token", data.token)
//             queryClient.setQueryData(queryKeys.auth.currentUser(), data.user)

//             showToast("success", "Registration successful!")
//             navigate("/dashboard")
//         },
//         onError: (error: Error) => {
//             showToast("error", error.message)
//         },
//     })
// }

// Logout mutation
export function useLogout() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    return useMutation({
        mutationFn: () => authService.logout(),
        onSuccess: () => {
            // Clear all cached data
            queryClient.clear()

            // Remove token
            localStorage.removeItem("token")

            showToast("success", "Logout successful!")

            navigate("/auth/login")
        },
    })
}

// Combined auth hook for easy access
export function useAuth() {
    const { data: user, isLoading, error } = useCurrentUser()
    const loginMutation = useLogin()
    //const registerMutation = useRegister()
    const logoutMutation = useLogout()

    return {
        user,
        isLoading,
        isAuthenticated: !!user,
        error,
        login: loginMutation.mutate,
        //register: registerMutation.mutate,
        logout: logoutMutation.mutate,
        isLoggingIn: loginMutation.isPending,
        //isRegistering: registerMutation.isPending,
        isLoggingOut: logoutMutation.isPending,
    }
}