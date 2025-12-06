import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Product } from "@/types/productType";
import { useNavigate } from "react-router";
import { Star, ShoppingCart, CreditCard } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toCapitalize, toUsd } from "@/lib/utils";

export default function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate();

  return (
    <Card
      className="max-w-sm h-full hover:shadow-lg cursor-pointer"
      onClick={() => {
        navigate(`/product/detail/${product.id}`);
      }}
    >
      <CardHeader>
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-48 w-full object-contain bg-gray-100 rounded-md"
        />
      </CardHeader>

      <CardContent className="text-left space-y-2">
        <Badge variant="outline">{toCapitalize(product.category)}</Badge>
        <CardTitle className="line-clamp-2 leading-5">
          {product.title}
        </CardTitle>
        <CardDescription className="flex gap-2 h-5 flex-wrap flex-row items-center">
          {toUsd(product.price)}
          <Separator orientation="vertical" />
          <Star size={16} fill="gold" strokeWidth={0} />
          {product.rating}
        </CardDescription>
      </CardContent>

      <CardFooter className="flex gap-2 w-full mt-auto">
        {/* Tombol Cart: Secondary, ukuran icon */}
        <Button
          variant="secondary"
          size="icon"
          className="shrink-0 hover:text-primary transition-colors"
          onClick={(e) => {
            e.stopPropagation(); // Mencegah navigasi card
            // Logic add to cart disini
          }}
        >
          <ShoppingCart size={18} />
        </Button>

        {/* Tombol Buy Now: Dominan, lebar penuh sisa ruang */}
        <Button
          className="flex-1 gap-2 font-semibold shadow-sm"
          onClick={(e) => {
            e.stopPropagation(); // Mencegah navigasi card
            // Logic buy now disini
          }}
        >
          <CreditCard size={16} />
          Buy Now
        </Button>
      </CardFooter>
    </Card>
  );
}
