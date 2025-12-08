import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { SlidersHorizontal } from "lucide-react";

export default function FilterPrice({
  min,
  max,
  updateParams,
  clearPrice,
}: {
  min: string;
  max: string;
  updateParams: (key: string, value: string) => void;
  clearPrice: () => void;
}) {
  const active = [min, max].filter(Boolean).length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Price Range
          {active > 0 && (
            <span className="bg-secondary rounded px-1 text-xs">{active}</span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80">
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="number"
            placeholder="Min"
            value={min}
            onChange={(e) => updateParams("minPrice", e.target.value)}
          />

          <Input
            type="number"
            placeholder="Max"
            value={max}
            onChange={(e) => updateParams("maxPrice", e.target.value)}
          />
        </div>

        <Button
          size="sm"
          className="w-full mt-2"
          onClick={() => {
            clearPrice();
          }}
        >
          Clear
        </Button>
      </PopoverContent>
    </Popover>
  );
}
