import { Skeleton } from "../../ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "../../ui/card";

export default function ProductSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="relative max-w-md text-left rounded-xl bg-gradient-to-r from-neutral-600 to-violet-300 pt-0 shadow-lg"
        >
          {/* Image Skeleton */}
          <div className="flex h-60 items-center justify-center">
            <Skeleton className="h-full w-full rounded-md" />
          </div>

          <Card className="border-none">
            <CardHeader>
              {/* Title */}
              <Skeleton className="h-5 w-40 mb-2" />

              {/* Tag Skeletons */}
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-12 rounded-sm" />
                <Skeleton className="h-5 w-16 rounded-sm" />
                <Skeleton className="h-5 w-10 rounded-sm" />
              </div>
            </CardHeader>

            <CardContent>
              {/* Description */}
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6 mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>

            <CardFooter className="justify-between gap-3 max-sm:flex-col max-sm:items-stretch">
              <div className="flex flex-col">
                <Skeleton className="h-3 w-12 mb-1" />
                <Skeleton className="h-6 w-20" />
              </div>
              <Skeleton className="h-10 w-32 rounded-md" />
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
}
