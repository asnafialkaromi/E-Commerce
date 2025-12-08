import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toCapitalize } from "@/lib/utils";
import { Filter } from "lucide-react";

type Props = {
  categoryList: string[];
  value: string;
  onChange: (value: string) => void;
  isFetching: boolean;
};

export default function FilterCategory({
  categoryList,
  value,
  onChange,
}: Props) {
  return (
    <div className="flex items-center gap-2">
      <Filter className="w-4 h-4 text-muted-foreground" />
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categoryList?.map((category) => (
            <SelectItem key={category} value={category}>
              {toCapitalize(category)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
