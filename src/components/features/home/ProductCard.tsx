import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Product } from "@/types/productType";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="relative max-w-md text-left rounded-xl bg-gradient-to-r from-neutral-600 to-violet-300 pt-0 shadow-lg">
      <div className="flex h-60 items-center justify-center">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full object-contain"
        />
      </div>
      <Card className="border-none">
        <CardHeader>
          <CardTitle className="line-clamp-1">{product.title}</CardTitle>
          <CardDescription className="flex gap-2 flex-wrap">
            {product.tags?.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </CardDescription>
        </CardHeader>

        <CardContent className="line-clamp-3">
          {product.description}
        </CardContent>

        <CardFooter className="flex justify-between">
          <span className="text-xl font-bold">${product.price}</span>
          <button className="btn-primary">Add to cart</button>
        </CardFooter>
      </Card>
    </div>
  );
}
