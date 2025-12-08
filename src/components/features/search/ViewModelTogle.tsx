import { Grid3x3, List } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ViewModelTogle({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: "grid" | "list") => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant={value === "grid" ? "secondary" : "ghost"}
        size="icon-sm"
        onClick={() => onChange("grid")}
      >
        <Grid3x3 className="h-4 w-4" />
      </Button>

      <Button
        variant={value === "list" ? "secondary" : "ghost"}
        size="icon-sm"
        onClick={() => onChange("list")}
      >
        <List className="h-4 w-4" />
      </Button>
    </div>
  );
}
