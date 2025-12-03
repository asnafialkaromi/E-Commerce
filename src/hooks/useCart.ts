import { useQuery } from "@tanstack/react-query";
import { cartService } from "@/services/cartService";

export const useCart = (userId: number) => {
    return useQuery({
        queryKey: ["cart", userId],
        queryFn: () => cartService.getCartByUser(userId),
        staleTime: 1000 * 60 * 5,
    });
};
