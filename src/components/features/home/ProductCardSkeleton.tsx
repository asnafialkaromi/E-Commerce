import { Skeleton } from "../../ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "../../ui/card";

export default function ProductCardSkeleton() {
  return (
    <Card className="max-w-sm h-full overflow-hidden">
      {/* Header with Image Skeleton */}
      <CardHeader>
        <Skeleton className="h-48 w-full rounded-md" />
      </CardHeader>

      {/* Content Skeleton */}
      <CardContent className="space-y-2">
        {/* Badge Placeholder */}
        <Skeleton className="h-5 w-20 rounded-full" />

        {/* Title Placeholder (2 lines to match line-clamp-2) */}
        <div className="space-y-1">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-2/3" />
        </div>

        {/* Price & Rating Placeholder */}
        <div className="flex gap-2 items-center pt-1">
          <Skeleton className="h-4 w-12" /> {/* Price */}
          <Skeleton className="h-4 w-[1px]" /> {/* Separator */}
          <Skeleton className="h-4 w-4 rounded-full" /> {/* Star Icon */}
          <Skeleton className="h-4 w-8" /> {/* Rating Number */}
        </div>
      </CardContent>

      {/* Footer Buttons Skeleton */}
      <CardFooter className="flex gap-2 w-full mt-auto">
        {/* Cart Button Placeholder (Square) */}
        <Skeleton className="h-10 w-10 shrink-0 rounded-md" />

        {/* Buy Now Button Placeholder (Fill remaining width) */}
        <Skeleton className="h-10 flex-1 rounded-md" />
      </CardFooter>
    </Card>
  );
}
