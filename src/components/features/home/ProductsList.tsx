import React from "react";
import { useCategories, useProducts } from "@/hooks/useProduct";
import ProductFilters from "./ProductFilters";
import ProductGrid from "./ProductGrid";
import PagePagination from "@/components/shared/PagePagination";

export default function ProductList() {
  const [page, setPage] = React.useState(0);
  const [category, setCategory] = React.useState("");

  const limit = 15;
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
        <div className="flex justify-between items-center flex-col sm:flex-row gap-4">
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

        {/* Products List*/}
        <ProductGrid
          products={data?.products || []}
          isLoading={isLoading}
          isFetching={isFetching}
          isError={isError}
          error={error}
        />

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
