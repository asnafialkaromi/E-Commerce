import apiClient from "../lib/api/apiClient";
import type { ProductCategory, ProductsResponse } from "@/types/productType";

export const productService = {
    async getProducts(limit = 13, skip = 0, category?: string): Promise<ProductsResponse> {

        if (category) {
            const response = await apiClient.get<ProductsResponse>(`/products/category/${category}`, {
                params: { limit, skip, select: "title,description,price,rating,tags,thumbnail" },
            })
            if (response.data) {
                return response.data
            } else {
                throw new Error("Products not found")
            }
        } else {
            const response = await apiClient.get<ProductsResponse>("/products", {
                params: { limit, skip, select: "title,description,price,rating,tags,thumbnail" },
            })
            if (response.data) {
                return response.data
            } else {
                throw new Error("Products not found")
            }
        }
    },

    async getProductById(id: number): Promise<ProductsResponse> {
        const response = await apiClient.get<ProductsResponse>(`/products/${id}`)
        if (response.data) {
            return response.data
        } else {
            throw new Error("Products not found")
        }

        return response.data
    },

    async searchProducts(query: string): Promise<ProductsResponse> {
        const response = await apiClient.get<ProductsResponse>(`/products/`, {
            params: { query: query, select: "title,description,price,rating,tags,thumbnail" },
        })
        if (response.data) {
            return response.data
        } else {
            throw new Error("Products not found")
        }
    },

    async getCategory(): Promise<ProductCategory[]> {
        const response = await apiClient.get<ProductCategory[]>(`/products/categories`)
        if (response.data) {
            return response.data
        } else {
            throw new Error("Products not found")
        }
    },
};