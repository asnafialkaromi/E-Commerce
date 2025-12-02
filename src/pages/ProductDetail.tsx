import { useProductById } from "@/hooks/useProduct";
import { useParams } from "react-router";
import DetailProduct from "@/components/features/detail/DetailProduct";

export default function ProductDetail() {
  const params = useParams();

  const id = parseInt(params.id || "0");
  const { data, isLoading, isError, error } = useProductById(id);

  if (isError) return <div>{error.message}</div>;

  return <DetailProduct product={data} isLoading={isLoading} />;
}
