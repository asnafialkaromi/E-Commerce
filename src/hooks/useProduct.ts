import { productService } from "@/services/productService";
import { useQuery, keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";

export const useProducts = (limit: number, skip: number, category?: string) => {
    return useQuery({
        queryKey: ['products', limit, skip, category],
        queryFn: () => productService.getProducts(limit, skip, category),
        placeholderData: keepPreviousData,
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

export const useInfiniteProducts = (limit: number, category?: string) => {
    return useInfiniteQuery({
        queryKey: ["products-infinite", limit, category],

        initialPageParam: 0,

        queryFn: ({ pageParam }) =>
            productService.getProducts(limit, pageParam, category),

        getNextPageParam: (lastPage, pages) => {
            const total = lastPage.total;
            const loaded = pages.length * limit;

            return loaded < total ? loaded : undefined;
        },

        staleTime: 5 * 60 * 1000,
    });
};