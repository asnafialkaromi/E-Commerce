import CartItem from "@/components/features/cart/CartItem";
import CartSkeleton from "@/components/features/cart/CartSkeleton";
import CartSummary from "@/components/features/cart/CartSummary";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router";

export default function Cart() {
  const { data: cart, isLoading } = useCart();

  // Mock remove function (nanti hubungkan dengan mutation)
  const handleRemoveItem = (id: number) => {
    console.log("Remove item", id);
  };

  const handleUpdateQty = (id: number, qty: number) => {
    console.log("update qty", id, qty);
  };

  if (!isLoading && !cart) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 text-center">
        <div className="bg-gray-100 p-6 rounded-full">
          <ShoppingBag size={48} className="text-gray-400" />
        </div>
        <h2 className="text-2xl font-semibold">Your cart is empty</h2>
        <p className="text-muted-foreground">
          Looks like you haven't added anything yet.
        </p>
        <Button asChild className="mt-4 rounded-full px-8">
          <Link to="/">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 tracking-tight">
        Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14">
        {/* Left: Cart Items List */}
        <div className="lg:col-span-8 space-y-6">
          {isLoading ? (
            <CartSkeleton />
          ) : (
            <div className="divide-y divide-gray-100 border-t border-b border-gray-100">
              {cart?.products?.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQty={handleUpdateQty}
                  onRemove={handleRemoveItem}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right: Summary Sidebar */}
        <div className="lg:col-span-4">
          {!isLoading && cart && (
            <CartSummary
              total={cart.total}
              discountedTotal={cart.discountedTotal}
              qty={cart.totalQuantity}
            />
          )}
        </div>
      </div>
    </div>
  );
}
