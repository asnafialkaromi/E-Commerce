import { Card, CardContent } from "@/components/ui/card";
import type { ProductReview } from "@/types/productType";
import { Star } from "lucide-react";

export default function DetailReviews({
  reviews,
}: {
  reviews: ProductReview[];
}) {
  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Customer Reviews</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review: any, i: number) => (
          <Card
            key={i}
            className="shadow-sm bg-gray-50/50 hover:bg-gray-50 transition-colors"
          >
            <CardContent className="p-6 space-y-3">
              <div className="flex justify-between">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, idx) => (
                    <Star
                      key={idx}
                      size={14}
                      className={
                        idx < review.rating
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  2 days ago
                </span>
              </div>

              <p className="text-sm text-gray-700 line-clamp-3">
                "{review.comment}"
              </p>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                  {review.reviewerName.charAt(0)}
                </div>
                <p className="text-sm font-medium">{review.reviewerName}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
