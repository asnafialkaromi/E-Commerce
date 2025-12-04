import axios from "axios";
import { store } from "@/store/store";
import { loginSuccess, logout } from "@/store/authSlice";

const API_BASE_URL = 'https://dummyjson.com';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (token) {
            prom.resolve(token);
        } else {
            prom.reject(error);
        }
    });

    failedQueue = [];
};

apiClient.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.user?.accessToken;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
apiClient.interceptors.response.use(
    (res) => res,
    async (error) => {
        const originalRequest = error.config;

        // If not expired OR retry already attempted → reject
        if (error.response?.status !== 401 || originalRequest._retry) {
            return Promise.reject(error);
        }

        if (isRefreshing) {
            // Queue requests if refresh already happening
            return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject });
            })
                .then((token) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return apiClient(originalRequest);
                })
                .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
            const refreshToken = store.getState().auth.user?.refreshToken;

            const refreshResponse = await axios.post(
                "https://dummyjson.com/auth/refresh",
                { refreshToken },
                { withCredentials: true }
            );

            const newData = refreshResponse.data;

            // Update Redux with new tokens
            store.dispatch(loginSuccess(newData));

            processQueue(null, newData.accessToken);
            isRefreshing = false;

            // Retry original request with new token
            originalRequest.headers.Authorization = `Bearer ${newData.accessToken}`;
            return apiClient(originalRequest);
        } catch (err) {
            processQueue(err, null);
            isRefreshing = false;

            store.dispatch(logout());

            return Promise.reject(err);
        }
    }
);

export default apiClient;
