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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import ProductSkeleton from "./ProductSkeleton";

export default function ProductList() {
  const [page, setPage] = React.useState(0);
  const limit = 10;
  const skip = page * limit;

  const { data, isLoading, isError, error } = useProducts(limit, skip);
  const totalPages = Math.ceil((data?.total || 0) / limit);

  const handlePrevious = () => {
    if (page > 0) {
      setPage(page - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePageClick = (pageIndex: number) => {
    setPage(pageIndex);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPaginationRange = () => {
    const delta = 2;
    const range: (number | string)[] = [];

    // Always show first page
    range.push(0);

    // Pages around current page
    for (
      let i = Math.max(1, page - delta);
      i <= Math.min(totalPages - 2, page + delta);
      i++
    ) {
      range.push(i);
    }

    // Always show last page
    if (totalPages > 1) {
      range.push(totalPages - 1);
    }

    // Insert ellipsis correctly
    const rangeWithDots: (number | string)[] = [];
    let prevPage: number | null = null;

    for (const p of range) {
      if (typeof p !== "number") continue;

      if (prevPage !== null && p - prevPage > 1) {
        rangeWithDots.push("ellipsis");
      }

      rangeWithDots.push(p);
      prevPage = p;
    }

    return rangeWithDots;
  };

  const paginationRange = getPaginationRange();

  if (isLoading) return <ProductSkeleton />;
  if (isError) return <div>Error: {error?.message}</div>;
  if (!data?.products || data.products.length === 0)
    return <div>No products found</div>;

  return (
    <div className="space-y-14">
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
                  <CardTitle className="line-clamp-1">
                    {product.title}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    {product.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="rounded-sm">
                        {tag}
                      </Badge>
                    ))}
                  </CardDescription>
                </CardHeader>
                <CardContent className="line-clamp-3">
                  {product.description}
                </CardContent>
                <CardFooter className="justify-between gap-3 max-sm:flex-col max-sm:items-stretch">
                  <div className="flex flex-col">
                    <span className="text-xl font-bold">$ {product.price}</span>
                  </div>
                  <Button size="sm">Add to cart</Button>
                </CardFooter>
              </Card>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className="space-y-4">
        <Pagination>
          <PaginationContent>
            {/* Previous Button */}
            <PaginationItem>
              <PaginationPrevious
                href="#"
                className={
                  page === 0
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
                onClick={(e) => {
                  e.preventDefault();
                  handlePrevious();
                }}
              />
            </PaginationItem>

            {/* Page Numbers with Ellipsis */}
            {paginationRange.map((pageNum, idx) => {
              if (typeof pageNum === "string") {
                // Render ellipsis
                return (
                  <PaginationItem key={pageNum}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }

              // Render page number
              return (
                <PaginationItem key={idx}>
                  <PaginationLink
                    href="#"
                    isActive={pageNum === page}
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageClick(pageNum);
                    }}
                    className="cursor-pointer"
                  >
                    {pageNum + 1}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            {/* Next Button */}
            <PaginationItem>
              <PaginationNext
                href="#"
                className={
                  page >= totalPages - 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
                onClick={(e) => {
                  e.preventDefault();
                  handleNext();
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>

        <div className="text-center text-sm text-muted-foreground">
          Page {page + 1} of {totalPages} • Showing {data.products.length} of{" "}
          {data.total} products
        </div>
      </div>
    </div>
  );
}
