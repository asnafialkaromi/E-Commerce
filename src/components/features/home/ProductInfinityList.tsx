import React from "react";
import { useInfiniteProducts } from "@/hooks/useProduct";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

export default function ProductInfinityList() {
  const limit = 15;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteProducts(limit);

  const loadMoreRef = React.useRef<HTMLDivElement | null>(null);

  // observer
  React.useEffect(() => {
    const target = loadMoreRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  return (
    <>
      <h2 className="text-left text-3xl font-bold">Recomendation for you</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {data?.pages.map((page) =>
          page.products.map((product: any) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isLoading ? (
                <ProductCardSkeleton />
              ) : (
                <ProductCard product={product} />
              )}
            </motion.div>
          ))
        )}

        {isFetchingNextPage &&
          Array.from({ length: 5 }, () => <ProductCardSkeleton />)}

        {/* No products found */}
        {data?.pages.length === 0 && !isFetchingNextPage && (
          <div className="text-center text-muted-foreground">
            No products found
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="text-center text-muted-foreground">
            {error?.message}
          </div>
        )}

        {/* Sentinel */}
        <div ref={loadMoreRef} className="h-10"></div>
      </div>
    </>
  );
}
