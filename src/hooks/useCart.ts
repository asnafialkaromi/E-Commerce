import { useQuery } from "@tanstack/react-query";
import { cartService } from "@/services/cartService";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

export const useCart = () => {

    const userId = useSelector((state: RootState) => state.auth.user?.id);

    console.log("User ID:", userId);

    return useQuery({
        queryKey: ["cart", userId],
        queryFn: () => cartService.getCartByUser(userId as number),
        enabled: !!userId,
        staleTime: 1000 * 60 * 5,
    });
};
