export default function SearchHeader({
  query,
  count,
  isLoading,
}: {
  query: string;
  count: number;
  isLoading: boolean;
}) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold mb-2">
        {query ? `Search results for "${query}"` : "All Products"}
      </h1>
      <p className="text-muted-foreground">
        {isLoading
          ? "Loading..."
          : `${count} ${count === 1 ? "product" : "products"} found`}
      </p>
    </div>
  );
}
