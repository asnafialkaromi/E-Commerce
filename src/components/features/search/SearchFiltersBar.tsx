import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import React from "react";
import FilterCategory from "./FilterCategory";
import FilterPrice from "./FilterPrice";
import FilterSort from "./FilterSort";
import ViewModelTogle from "./ViewModelTogle";

export default function SearchFiltersBar({
  category,
  categoriesList,
  minPrice,
  maxPrice,
  sortBy,
  hasActiveFilters,
  isFetchingCategories,
  updateParams,
  clearPrice,
  clearFilters,
  viewMode,
  setViewMode,
}: {
  category: string;
  categoriesList: string[];
  minPrice: string;
  maxPrice: string;
  sortBy: string;
  hasActiveFilters: boolean;
  isFetchingCategories: boolean;
  updateParams: (key: string, value: string) => void;
  clearPrice: () => void;
  clearFilters: () => void;
  viewMode: string;
  setViewMode: React.Dispatch<React.SetStateAction<"grid" | "list">>;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6 p-4 bg-card border rounded-lg">
      <div className="flex items-center gap-3 flex-wrap">
        <FilterCategory
          categoryList={categoriesList}
          value={category}
          onChange={(v) => updateParams("category", v)}
          isFetching={isFetchingCategories}
        />

        <FilterPrice
          min={minPrice}
          max={maxPrice}
          updateParams={updateParams}
          clearPrice={clearPrice}
        />
        <FilterSort value={sortBy} onChange={(v) => updateParams("sort", v)} />

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="gap-1"
          >
            <X className="h-4 w-4" /> Clear All
          </Button>
        )}
      </div>

      <ViewModelTogle value={viewMode} onChange={setViewMode} />
    </div>
  );
}
