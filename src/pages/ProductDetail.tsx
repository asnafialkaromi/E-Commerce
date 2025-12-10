import { useProductById } from "@/hooks/useProduct";
import { useParams } from "react-router";
import ProductRelated from "@/components/features/detail/ProductRelated";
import DetailGallery from "@/components/features/detail/DetailGallery";
import DetailCard from "@/components/features/detail/DetailCard";
import { Separator } from "@/components/ui/separator";
import DetailReviews from "@/components/features/detail/DetailReviews";

export default function ProductDetail() {
  const params = useParams();

  const id = parseInt(params.id || "0");
  const { data, isLoading, isError, error } = useProductById(id);

  if (isError) return <div>{error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-10 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14">
        {/* IMAGE GALLERY */}
        {data && data.images && data.images.length > 0 && data.thumbnail && (
          <DetailGallery
            images={data.images}
            thumbnail={data.thumbnail}
            title={data.title}
          />
        )}

        {/* PRODUCT INFO */}
        <div className="lg:col-span-5 flex flex-col gap-8 sticky top-24 h-fit">
          {data && <DetailCard product={data} />}
        </div>
      </div>

      <Separator className="my-16" />

      {/* REVIEWS */}
      <DetailReviews reviews={data?.reviews || []} />

      <Separator className="my-16" />

      <ProductRelated category={data?.category || ""} />
    </div>
  );
}
