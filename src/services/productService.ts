import { get } from "http";
import apiClient from "../lib/api/apiClient";
import type { ProductsResponse } from "@/types/productType";

export const productService = {
    async getProducts(limit = 10, skip = 0): Promise<ProductsResponse> {
        const response = await apiClient.get<ProductsResponse>("/products", {
            params: { limit, skip, select: "title,description,price,rating,tags,thumbnail" },
        })
        if (response.data) {
            return response.data
        } else {
            throw new Error("Products not found")
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

    async getProductByCategory(category: string): Promise<ProductsResponse> {
        const response = await apiClient.get<ProductsResponse>(`/products/`, {
            params: { category, select: "title,description,price,rating,tags,thumbnail" },
        })
        if (response.data) {
            return response.data
        } else {
            throw new Error("Products not found")
        }
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
};