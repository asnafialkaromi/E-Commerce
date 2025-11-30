import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { getAdvancedPagination } from "@/lib/pagination";

type Props = {
  page: number;
  totalPages: number;
  onChange: (v: number) => void;
};

export default function PagePagination({ page, totalPages, onChange }: Props) {
  const pagesRange = getAdvancedPagination(page, totalPages);

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous */}
        <PaginationItem>
          <PaginationPrevious
            className={page === 0 ? "opacity-50 pointer-events-none" : ""}
            onClick={() => page > 0 && onChange(page - 1)}
          />
        </PaginationItem>

        {/* Page Numbers */}
        {pagesRange.map((p, idx) =>
          p === "..." ? (
            <PaginationItem key={`ellipsis-${idx}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={`page-${p}`}>
              <PaginationLink
                isActive={p === page}
                onClick={() => typeof p === "number" && onChange(p)}
              >
                {typeof p === "number" ? p + 1 : p}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        {/* Next */}
        <PaginationItem>
          <PaginationNext
            className={
              page >= totalPages - 1 ? "opacity-50 pointer-events-none" : ""
            }
            onClick={() => page < totalPages - 1 && onChange(page + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
