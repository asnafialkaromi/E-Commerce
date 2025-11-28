import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useProducts } from "@/hooks/useProduct";
import { Badge } from "../../ui/badge";

export default function ProductList() {
  const { data, isLoading, isError, error } = useProducts(10, 10);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;
  if (!data?.products || data.products.length === 0)
    return <div>No products found</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {data.products.map((product) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
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
                <CardTitle>{product.title}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  {product.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="rounded-sm">
                      {tag}
                    </Badge>
                  ))}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3">{product.description}</p>
              </CardContent>
              <CardFooter className="justify-between gap-3 max-sm:flex-col max-sm:items-stretch">
                <div className="flex flex-col">
                  <span className="text-sm font-medium uppercase">Price</span>
                  <span className="text-xl font-semibold">
                    $ {product.price}
                  </span>
                </div>
                <Button size="lg">Add to cart</Button>
              </CardFooter>
            </Card>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
