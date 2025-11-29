import { productService } from "@/services/productService";
import { useQuery } from "@tanstack/react-query";

export const useProduct = () => {
    return useQuery({
        queryKey: ['product'],
        queryFn: () => productService.getProducts,
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
        retry: 2,
    });
};

export const useProducts = (limit: number = 10, skip: number = 10) => {
    return useQuery({
        queryKey: ['products', limit, skip],
        queryFn: () => productService.getProducts(limit, skip),
        staleTime: 5 * 60 * 1000,
    });
};

export const useProductById = (id: number) => {
    return useQuery({
        queryKey: ['product', id],
        queryFn: () => productService.getProductById(id),
        staleTime: 5 * 60 * 1000,
    });
};