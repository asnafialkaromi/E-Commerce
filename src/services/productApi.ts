import apiClient from "../lib/api/apiClient";
import type { ProductsResponse } from "@/types/productType";

export const productApi = {
    async getProducts(limit = 10, skip = 10): Promise<ProductsResponse> {
        const response = await apiClient.get<ProductsResponse>("/products", {
            params: { limit, skip }
        })
        return response.data
    }
};