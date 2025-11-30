import React from "react";
import { useCategories, useProducts } from "@/hooks/useProduct";
import ProductSkeleton from "./ProductSkeleton";
import ProductFilters from "./ProductFilters";
import ProductGrid from "./ProductGrid";
import PagePagination from "@/components/shared/PagePagination";

export default function ProductList() {
  const [page, setPage] = React.useState(0);
  const [category, setCategory] = React.useState("");

  const limit = 12;
  const skip = page * limit;

  const { data: categories } = useCategories();
  const { data, isLoading, isFetching, error, isError } = useProducts(
    limit,
    skip,
    category
  );

  const totalPages = Math.ceil((data?.total || 0) / limit);

  return (
    <div className="space-y-8">
      <div className="space-y-10">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold">Products</h2>
          <ProductFilters
            categories={categories || []}
            value={category}
            onChange={(v) => {
              setCategory(v);
              setPage(0);
            }}
            isFetching={isFetching}
          />
        </div>

        {/* Products */}

        {isLoading ? (
          <ProductSkeleton />
        ) : (
          <ProductGrid products={data?.products || []} />
        )}

        {/* No products found */}
        {data?.products.length === 0 && !isLoading && (
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

        {/* Pagination */}
        <PagePagination
          page={page}
          totalPages={totalPages}
          onChange={(newPage) => {
            setPage(newPage);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      </div>
    </div>
  );
}
