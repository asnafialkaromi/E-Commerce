import { Carousel, CarouselContent, CarouselItem } from "../../ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function BannerCarousel() {
  return (
    <Carousel
      className="w-full h-64 rounded-2xl overflow-hidden shadow-lg"
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      <CarouselContent>
        {[1, 2, 3].map((banner) => (
          <CarouselItem key={banner}>
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-3xl font-bold">
              Banner {banner}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
