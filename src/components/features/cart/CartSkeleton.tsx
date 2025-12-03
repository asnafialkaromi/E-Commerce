import { Skeleton } from "@/components/ui/skeleton";

export default function CartSkeleton() {
  return (
    <div className="space-y-8 py-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex gap-6">
          <Skeleton className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl shrink-0" />
          <div className="flex-1 space-y-4 py-2">
            <div className="space-y-2">
              <Skeleton className="h-6 w-3/4 max-w-[200px]" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="flex justify-between items-center">
              <Skeleton className="h-9 w-28 rounded-full" />{" "}
              {/* Qty control skeleton */}
              <Skeleton className="h-6 w-20" /> {/* Price skeleton */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
