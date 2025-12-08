import React from "react";
import { useSearchParams } from "react-router";
import { useSearchProducts } from "@/hooks/useProduct";
import SearchHeader from "../components/features/search/SearchHeader";
import SearchFiltersBar from "../components/features/search/SearchFiltersBar";
import FilterActiveBadges from "../components/features/search/FilterActiveBadge";
import ProductGrid from "@/components/features/home/ProductGrid";
import PagePagination from "@/components/shared/PagePagination";
import { Button } from "@/components/ui/button";
import { getCategories } from "@/lib/utils";

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");

  const query = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  const sortBy = searchParams.get("sort") || "relevance";
  const page = parseInt(searchParams.get("page") || "0");
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";

  const limit = 15;
  const skip = page * limit;

  const { data, isLoading, isFetching, error, isError } = useSearchProducts(
    query,
    limit,
    skip
  );

  const filteredProducts = React.useMemo(() => {
    if (!data?.products) return [];

    let items = [...data.products];

    if (category) {
      items = items.filter((p) => p.category === category);
    }

    if (minPrice || maxPrice) {
      items = items.filter((p) => {
        if (minPrice && p.price < +minPrice) return false;
        if (maxPrice && p.price > +maxPrice) return false;
        return true;
      });
    }

    switch (sortBy) {
      case "price-low":
        return items.sort((a, b) => a.price - b.price);
      case "price-high":
        return items.sort((a, b) => b.price - a.price);
      case "rating":
        return items.sort((a, b) => b.rating - a.rating);
      default:
        return items;
    }
  }, [data?.products, category, minPrice, maxPrice, sortBy]);

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    value ? params.set(key, value) : params.delete(key);
    if (key !== "page") params.set("page", "0");
    setSearchParams(params);
  };

  const clearPrice = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("minPrice");
    params.delete("maxPrice");
    params.set("page", "0");
    setSearchParams(params);
  };

  const clearFilters = () => setSearchParams({ q: query });

  const hasActiveFilters =
    Boolean(category) ||
    Boolean(minPrice) ||
    Boolean(maxPrice) ||
    sortBy !== "relevance";

  const categories = getCategories(data?.products || []);

  const totalPages = React.useMemo(() => {
    return Math.ceil(
      (hasActiveFilters ? filteredProducts.length : data?.total || 0) / limit
    );
  }, [hasActiveFilters, filteredProducts.length, data?.total, limit]);

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <SearchHeader
        query={query}
        count={filteredProducts.length}
        isLoading={isLoading}
      />

      <SearchFiltersBar
        category={category}
        categoriesList={categories}
        isFetchingCategories={isFetching}
        sortBy={sortBy}
        minPrice={minPrice}
        maxPrice={maxPrice}
        hasActiveFilters={hasActiveFilters}
        updateParams={updateParams}
        clearFilters={clearFilters}
        clearPrice={clearPrice}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      <FilterActiveBadges
        category={category}
        minPrice={minPrice}
        maxPrice={maxPrice}
        updateParams={updateParams}
        hasActiveFilters={hasActiveFilters}
      />

      <div className="mb-8">
        <ProductGrid
          products={filteredProducts}
          isLoading={isLoading}
          isFetching={isFetching}
          isError={isError}
          error={error}
        />
        {data?.products.length === 0 && filteredProducts.length === 0 && (
          <div className="text-center mb-10">
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters or search terms
            </p>
            {hasActiveFilters && (
              <Button onClick={clearFilters}>Clear all</Button>
            )}
          </div>
        )}
      </div>

      <PagePagination
        page={page}
        totalPages={totalPages}
        onChange={(p) => {
          updateParams("page", p.toString());
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    </div>
  );
}
