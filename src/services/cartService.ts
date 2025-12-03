import axios from "axios";
import type { Cart } from "@/types/cartsTypes";

export const cartService = {
    async getCartByUser(userId: number): Promise<Cart> {
        const res = await axios.get(`https://dummyjson.com/carts/user/${userId}`);
        return res.data.carts[0]; // dummyjson structure
    },
};
