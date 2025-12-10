import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart, Share2 } from "lucide-react";

export default function DetailGallery({
  images,
  thumbnail,
  title,
}: {
  images: string[];
  thumbnail: string;
  title: string;
}) {
  const imgs = images;
  const [active, setActive] = React.useState(0);
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="lg:col-span-7 flex flex-col gap-6"
    >
      {/* Main Image */}
      <div className="w-full overflow-hidden rounded-3xl bg-gray-50 border border-gray-100 shadow-sm aspect-square group">
        <img
          src={imgs[active]}
          alt={title}
          className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Hover Buttons */}
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

      {/* Thumbnails */}
      <div className="grid grid-cols-5 gap-3">
        {imgs.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`rounded-xl overflow-hidden aspect-square transition-all ${
              active === i
                ? "border-black ring-2 ring-black/10 ring-offset-2"
                : "border-transparent hover:border-gray-200"
            }`}
          >
            <img
              src={img}
              alt={`thumb-${i}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </motion.div>
  );
}
