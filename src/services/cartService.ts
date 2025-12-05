import axios from "axios";
import type { Cart } from "@/types/cartsTypes";

export const cartService = {
    async getCartByUser(userId: number): Promise<Cart> {
        const res = await axios.get<Cart>(`https://dummyjson.com/carts/${userId}`);
        if (res) {
            return res.data
        } else {
            throw new Error("Cart not found")
        }
    },
};
