import ProductGrid from "@/components/features/home/ProductGrid";
import ProductSkeleton from "@/components/features/home/ProductSkeleton";
import PagePagination from "@/components/shared/PagePagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchProducts } from "@/hooks/useProduct";
import { Grid3x3, List, SlidersHorizontal, X } from "lucide-react";
import React from "react";
import { useSearchParams } from "react-router";

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = React.useState<ViewMode>("grid");
  type ViewMode = "grid" | "list";

  // Get query params
  const query = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  const sortBy = searchParams.get("sort") || "relevance";
  const page = parseInt(searchParams.get("page") || "0");
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";

  const limit = 12;
  const skip = page * limit;

  // Fetch products
  const { data, isLoading, error, isError } = useSearchProducts(
    query,
    limit,
    skip
  );

  // Filter products by price locally (since API doesn't support price filtering)
  const filteredProducts = React.useMemo(() => {
    if (!data?.products) return [];

    let filtered = [...data.products];

    // Apply price filter
    if (minPrice || maxPrice) {
      filtered = filtered.filter((p) => {
        const price = p.price;
        if (minPrice && price < parseFloat(minPrice)) return false;
        if (maxPrice && price > parseFloat(maxPrice)) return false;
        return true;
      });
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return filtered;
  }, [data?.products, minPrice, maxPrice, sortBy]);

  const totalPages = Math.ceil((data?.total || 0) / limit);

  // Update URL params
  const updateParams = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    if (key !== "page") {
      newParams.set("page", "0");
    }
    setSearchParams(newParams);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchParams({ q: query });
  };

  // Check if filters are active
  const hasActiveFilters =
    category || sortBy !== "relevance" || minPrice || maxPrice;
  const activeFilterCount = [category, minPrice, maxPrice].filter(
    Boolean
  ).length;
  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">
          {query ? `Search results for "${query}"` : "All Products"}
        </h1>
        <p className="text-muted-foreground">
          {isLoading ? (
            "Loading..."
          ) : (
            <>
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "product" : "products"} found
            </>
          )}
        </p>
      </div>

      {/* Filters & Sorting Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 p-4 bg-card border rounded-lg">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Category Filter */}
          <Select
            value={category}
            onValueChange={(v) => updateParams("category", v)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="smartphones">Smartphones</SelectItem>
              <SelectItem value="laptops">Laptops</SelectItem>
              <SelectItem value="fragrances">Fragrances</SelectItem>
              <SelectItem value="skincare">Skincare</SelectItem>
              <SelectItem value="groceries">Groceries</SelectItem>
            </SelectContent>
          </Select>

          {/* Price Range Filter */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Price Range
                {(minPrice || maxPrice) && (
                  <Badge variant="secondary" className="ml-1 px-1 min-w-5 h-5">
                    {[minPrice, maxPrice].filter(Boolean).length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <h4 className="font-medium">Price Range</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="minPrice">Min Price</Label>
                    <Input
                      id="minPrice"
                      type="number"
                      placeholder="0"
                      value={minPrice}
                      onChange={(e) => updateParams("minPrice", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxPrice">Max Price</Label>
                    <Input
                      id="maxPrice"
                      type="number"
                      placeholder="1000"
                      value={maxPrice}
                      onChange={(e) => updateParams("maxPrice", e.target.value)}
                    />
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    updateParams("minPrice", "");
                    updateParams("maxPrice", "");
                  }}
                >
                  Clear Price Filter
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          {/* Sort By */}
          <Select value={sortBy} onValueChange={(v) => updateParams("sort", v)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="gap-1"
            >
              <X className="h-4 w-4" />
              Clear All ({activeFilterCount})
            </Button>
          )}
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "grid" ? "secondary" : "ghost"}
            size="icon-sm"
            onClick={() => setViewMode("grid")}
          >
            <Grid3x3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "secondary" : "ghost"}
            size="icon-sm"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 flex-wrap mb-4">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {category && (
            <Badge variant="secondary" className="gap-1">
              Category: {category}
              <button
                onClick={() => updateParams("category", "")}
                className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {minPrice && (
            <Badge variant="secondary" className="gap-1">
              Min: ${minPrice}
              <button
                onClick={() => updateParams("minPrice", "")}
                className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {maxPrice && (
            <Badge variant="secondary" className="gap-1">
              Max: ${maxPrice}
              <button
                onClick={() => updateParams("maxPrice", "")}
                className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}

      {/* Products Grid/List */}
      <div className="mb-8">
        {isLoading ? (
          <ProductSkeleton />
        ) : isError ? (
          <div className="text-center py-12">
            <p className="text-lg text-destructive">{error?.message}</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <SlidersHorizontal className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-semibold mb-2">No products found</h2>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters or search terms
            </p>
            {hasActiveFilters && (
              <Button onClick={clearFilters}>Clear all filters</Button>
            )}
          </div>
        ) : (
          <ProductGrid products={filteredProducts} />
        )}
      </div>

      {/* Pagination */}

      <PagePagination
        page={page}
        totalPages={totalPages}
        onChange={(newPage) => {
          updateParams("page", newPage.toString());
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    </div>
  );
}
