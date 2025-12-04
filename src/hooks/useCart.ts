import { useQuery } from "@tanstack/react-query";
import { cartService } from "@/services/cartService";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

export const useCart = () => {

    const user = useSelector((state: RootState) => state.auth.user);

    console.log(user);
    console.log("User ID:", user?.id);

    return useQuery({
        queryKey: ["cart", user?.id],
        queryFn: () => cartService.getCartByUser(user!.id),
        enabled: !!user?.id,
        staleTime: 1000 * 60 * 5,
    });
};
