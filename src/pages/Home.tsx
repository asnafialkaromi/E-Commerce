import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import ProductList from "@/components/features/home/ProductsList";
import Banner1 from "@/assets/images/Banner1.jpg";
import Banner2 from "@/assets/images/Banner2.png";
import Banner3 from "@/assets/images/Banner3.jpg";
import { cn } from "@/lib/utils";
import ProductInfinityList from "@/components/features/home/ProductInfinityList";

const banners = [Banner1, Banner2, Banner3];

export default function Home() {
  return (
    <div className="w-full max-w-7xl flex flex-col gap-8 p-6">
      {/* Banner Carousel */}
      <Carousel
        className="w-full max-w-7xl max-h-60 mx-auto relative"
        plugins={[
          Autoplay({
            delay: 3000,
            stopOnInteraction: true,
          }),
        ]}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent className="-ml-4">
          {banners.map((item, index) => (
            <CarouselItem key={index} className="pl-4">
              <div
                className={cn(
                  "relative w-full max-h-60 aspect-video rounded-xl shadow-2xl overflow-hidden transition-all duration-500 ease-in-out",
                  "hover:scale-[1.01] hover:shadow-primary/30"
                )}
              >
                <img
                  src={item}
                  alt={`Banner ${index + 1}`}
                  className="w-full h-full object-contain brightness-[0.98]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none"></div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Product List */}
      <ProductList />

      {/* Product Infinity List */}
      <ProductInfinityList />
    </div>
  );
}
