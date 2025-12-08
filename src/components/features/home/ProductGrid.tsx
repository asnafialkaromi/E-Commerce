import type { Product } from "@/types/productType";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

export default function ProductGrid({
  products,
  isLoading,
  isFetching,
  isError,
  error,
}: {
  products: Product[];
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  error: Error | null;
}) {
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {isLoading && Array.from({ length: 10 }, () => <ProductCardSkeleton />)}

        {products.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {isFetching ? (
              <ProductCardSkeleton />
            ) : (
              <ProductCard product={product} />
            )}
          </motion.div>
        ))}
      </div>
      {/* No products found */}
      {products.length === 0 && !isFetching && (
        <div className="text-center mt-10">
          <h2 className="text-2xl font-semibold mb-2">No products found</h2>
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="text-center text-muted-foreground">
          {error?.message}
        </div>
      )}
    </>
  );
}
