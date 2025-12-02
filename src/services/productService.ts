import apiClient from "../lib/api/apiClient";
import type { Product, ProductCategory, ProductsResponse } from "@/types/productType";

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

    async getProductById(id: number): Promise<Product> {
        const response = await apiClient.get<Product>(`/products/${id}`)
        if (response.data) {
            return response.data
        } else {
            throw new Error("Products not found")
        }
    },

    async searchProducts(q: string, limit = 12, skip = 0): Promise<ProductsResponse> {
        const response = await apiClient.get<ProductsResponse>(`/products/search`, {
            params: { q: q, limit, skip, select: "title,description,price,rating,tags,thumbnail" },
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