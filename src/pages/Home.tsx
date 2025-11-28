import React from "react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import ProductList from "@/components/features/home/ProductsList";

export default function Home() {
  return (
    <div className="w-full max-w-7xl flex flex-col gap-8 p-6">
      {/* Banner Carousel */}
      <Carousel
        className="w-full h-64 rounded-2xl overflow-hidden"
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent>
          {[1, 2, 3].map((item) => (
            <CarouselItem key={item}>
              <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-3xl font-bold shadow-lg rounded-2xl">
                Banner {item}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Product List */}
      <ProductList />
    </div>
  );
}
