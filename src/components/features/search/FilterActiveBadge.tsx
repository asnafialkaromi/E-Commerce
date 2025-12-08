import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

export default function FilterActiveBadge({
  category,
  minPrice,
  maxPrice,
  updateParams,
  hasActiveFilters,
}: {
  category: string;
  minPrice: string;
  maxPrice: string;
  updateParams: (key: any, value: any) => void;
  hasActiveFilters: boolean;
}) {
  if (!hasActiveFilters) return null;

  return (
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
  );
}
