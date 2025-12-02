import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Heart,
  RefreshCcw,
  Share2,
  ShieldCheck,
  ShoppingCart,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import type { Product } from "@/types/productType";

export default function DetailProduct({
  product,
  isLoading = false,
}: {
  product?: Product;
  isLoading?: boolean;
}) {
  const [activeImage, setActiveImage] = React.useState(0);

  // Loading / skeleton state
  if (isLoading) {
    return (
      <>
        <div className="container mx-auto p-6 max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <Skeleton className="h-10 w-2/3" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-[200px] w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </>
    );
  }

  if (!product) return null;

  const images =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : [product.thumbnail || ""];

  return (
    <div className="container mx-auto px-4 py-10 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14">
        {/* LEFT: IMAGE GALLERY (5 Columns) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-7 flex flex-col gap-6"
        >
          {/* Main Image */}
          <div className="relative overflow-hidden rounded-3xl bg-gray-50 border border-gray-100 shadow-sm aspect-[4/3] lg:aspect-square flex items-center justify-center group">
            <img
              src={images[activeImage]}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full shadow-md"
              >
                <Heart size={20} />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full shadow-md"
              >
                <Share2 size={20} />
              </Button>
            </div>
          </div>

          {/* Thumbnails - Grid Layout for cleaner look */}
          <div className="grid grid-cols-5 gap-3">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all ${
                  activeImage === index
                    ? "border-black ring-2 ring-black/10 ring-offset-2"
                    : "border-transparent hover:border-gray-200"
                }`}
              >
                <img
                  src={img}
                  className="w-full h-full object-cover"
                  alt={`thumb-${index}`}
                />
              </button>
            ))}
          </div>
        </motion.div>

        {/* RIGHT: STICKY INFO (7 Columns) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-5 flex flex-col gap-8 sticky top-24 h-fit"
        >
          {/* Header Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Badge
                variant="secondary"
                className="px-3 py-1 text-xs uppercase tracking-wider font-semibold"
              >
                {product.category}
              </Badge>
              {product.stock > 0 ? (
                <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                  In Stock
                </span>
              ) : (
                <span className="text-xs text-red-600 font-medium">
                  Out of Stock
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 leading-tight">
              {product.title}
            </h1>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-yellow-500">
                <Star size={18} fill="currentColor" />
                <span className="font-semibold text-gray-900">
                  {product.rating}
                </span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <span className="text-sm text-muted-foreground underline cursor-pointer hover:text-primary">
                {product.reviews?.length || 0} Reviews
              </span>
            </div>
          </div>

          <Separator />

          {/* Price Section */}
          <div className="space-y-1">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-gray-900">
                ${product.price}
              </span>
              {product.discountPercentage && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    $
                    {(
                      product.price *
                      (1 + product.discountPercentage / 100)
                    ).toFixed(2)}
                  </span>
                  <Badge variant="destructive" className="ml-2">
                    -{product.discountPercentage}% OFF
                  </Badge>
                </>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              Tax included. Shipping calculated at checkout.
            </p>
          </div>

          {/* Description */}
          <p className="text-base text-gray-600 leading-relaxed">
            {product.description}
          </p>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              size="lg"
              className="w-full text-base h-12 rounded-xl shadow-lg shadow-primary/20"
            >
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full text-base h-12 rounded-xl border-gray-300 hover:bg-gray-50"
            >
              Buy Now
            </Button>
          </div>

          {/* Features / Details */}
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
              <ShieldCheck className="text-gray-500 mt-0.5" size={20} />
              <div>
                <span className="block text-sm font-semibold text-gray-900">
                  Warranty
                </span>
                <span className="text-xs text-muted-foreground">
                  {product.warrantyInformation}
                </span>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
              <RefreshCcw className="text-gray-500 mt-0.5" size={20} />
              <div>
                <span className="block text-sm font-semibold text-gray-900">
                  Return Policy
                </span>
                <span className="text-xs text-muted-foreground">
                  {product.returnPolicy}
                </span>
              </div>
            </div>
          </div>

          <div className="text-xs text-muted-foreground space-y-1">
            <p>
              <strong>Brand:</strong> {product.brand}
            </p>
            <p>
              <strong>SKU:</strong> {product.sku}
            </p>
          </div>
        </motion.div>
      </div>

      <Separator className="my-16" />

      {/* REVIEWS SECTION */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">
            Customer Reviews
          </h2>
          <Button variant="ghost">View all</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {product.reviews?.map((review, index) => (
            <Card
              key={index}
              className="border-none shadow-sm bg-gray-50/50 hover:bg-gray-50 transition-colors"
            >
              <CardContent className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={
                          i < review.rating
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
                <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
                  "{review.comment}"
                </p>
                <div className="flex items-center gap-2 pt-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                    {review.reviewerName.charAt(0)}
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {review.reviewerName}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="my-16" />

      {/* RELATED PRODUCTS (Placeholder Implemented) */}
      <section>
        <h2 className="text-2xl font-bold mb-8 tracking-tight">
          You might also like
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="group cursor-pointer space-y-3">
              <div className="aspect-[4/5] bg-gray-100 rounded-xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />{" "}
                {/* Placeholder Image */}
              </div>
              <div>
                <h3 className="font-medium text-gray-900 group-hover:text-primary transition-colors">
                  Related Product {item}
                </h3>
                <p className="text-sm text-muted-foreground">$99.00</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
