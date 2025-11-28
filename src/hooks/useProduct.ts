import { productApi } from "@/services/productApi";
import { useQuery } from "@tanstack/react-query";


const useProduct = () => {
    return useQuery({
        queryKey: ['product'],
        queryFn: () => productApi.getProducts,
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
        retry: 2,
    });
};

const useProducts = (limit: number = 10, skip: number = 10) => {
    return useQuery({
        queryKey: ['products', limit],
        queryFn: () => productApi.getProducts(limit, skip),
        staleTime: 5 * 60 * 1000,
    });
};

export { useProduct, useProducts };
