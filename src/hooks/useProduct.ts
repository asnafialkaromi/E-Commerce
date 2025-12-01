import { productService } from "@/services/productService";
import { useQuery } from "@tanstack/react-query";

export const useProducts = (limit: number, skip: number, category?: string) => {
    return useQuery({
        queryKey: ['products', limit, skip, category],
        queryFn: () => productService.getProducts(limit, skip, category),
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

export const useSearchProducts = (q: string, limit: number, skip: number) => {
    return useQuery({
        queryKey: ['search', q, limit, skip],
        queryFn: () => productService.searchProducts(q, limit, skip),
        staleTime: 5 * 60 * 1000,
    });
};

export const useCategories = () => {
    return useQuery({
        queryKey: ['category'],
        queryFn: () => productService.getCategory(),
        staleTime: 60 * 60 * 1000,
    });
};