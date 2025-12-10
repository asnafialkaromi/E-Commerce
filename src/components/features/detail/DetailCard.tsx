import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/types/productType";
import { RefreshCcw, ShieldCheck, ShoppingCart, Star } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function DetailCard({ product }: { product: Product }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="text-left lg:col-span-5 flex flex-col gap-8 sticky top-24 h-fit"
    >
      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Badge
            variant="secondary"
            className="px-3 py-1 text-xs capitalize tracking-wider font-semibold"
          >
            {product.category}
          </Badge>
          {product.stock > 0 ? (
            <span className="text-xs text-green-600 font-medium flex items-center gap-1">
              In Stock
            </span>
          ) : (
            <span className="text-xs text-red-600 font-medium">
              Out of Stock
            </span>
          )}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 leading-tight">
          {product.title}
        </h1>

        <div className="flex h-6 items-center gap-4">
          <div className="flex items-center gap-1 text-yellow-500">
            <Star size={18} fill="currentColor" />
            <span className="font-semibold text-gray-900">
              {product.rating}
            </span>
          </div>
          <Separator orientation="vertical" />
          <span className="text-sm text-muted-foreground underline cursor-pointer hover:text-primary">
            {product.reviews?.length || 0} Reviews
          </span>
        </div>
      </div>

      <Separator />

      {/* Price Section */}
      <div className="space-y-1">
        <div className="flex items-baseline gap-3">
          <span className="text-4xl font-bold text-gray-900">
            ${product.price}
          </span>
          {product.discountPercentage && (
            <>
              <span className="text-lg text-muted-foreground line-through">
                $
                {(
                  product.price *
                  (1 + product.discountPercentage / 100)
                ).toFixed(2)}
              </span>
              <Badge variant="destructive" className="ml-2">
                -{product.discountPercentage}% OFF
              </Badge>
            </>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          Tax included. Shipping calculated at checkout.
        </p>
      </div>

      {/* Features / Details */}
      <div className="grid grid-cols-2 gap-4 py-4">
        <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
          <ShieldCheck className="text-gray-500 mt-0.5" size={20} />
          <div>
            <span className="block text-sm font-semibold text-gray-900">
              Warranty
            </span>
            <span className="text-xs text-muted-foreground">
              {product.warrantyInformation}
            </span>
          </div>
        </div>
        <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
          <RefreshCcw className="text-gray-500 mt-0.5" size={20} />
          <div>
            <span className="block text-sm font-semibold text-gray-900">
              Return Policy
            </span>
            <span className="text-xs text-muted-foreground">
              {product.returnPolicy}
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Description</h2>
        <p className="text-sm text-muted-foreground">{product.description}</p>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <Button
          size="lg"
          className="w-full text-base h-12 rounded-xl shadow-lg shadow-primary/20"
        >
          <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="w-full text-base h-12 rounded-xl border-gray-300 hover:bg-gray-50"
        >
          Buy Now
        </Button>
      </div>
    </motion.div>
  );
}
