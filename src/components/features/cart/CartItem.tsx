import type { CartProduct } from "@/types/cartsTypes";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  item: CartProduct;
  onUpdateQty: (id: number, qty: number) => void;
  onRemove: (id: number) => void;
}

export default function CartItem({ item, onUpdateQty, onRemove }: Props) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      className="flex flex-col sm:flex-row gap-6 py-6 group"
    >
      {/* Image */}
      <div className="shrink-0">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl object-cover bg-gray-50 border border-gray-100"
        />
      </div>

      {/* Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 leading-tight">
              {item.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Unit Price: ${item.price.toFixed(2)}
            </p>
          </div>
          {/* Item Total Price */}
          <p className="font-bold text-lg text-gray-900">
            ${item.total.toFixed(2)}
          </p>
        </div>

        <div className="flex justify-between items-end mt-4 sm:mt-0">
          {/* Quantity Controls */}
          <div className="flex items-center gap-3 bg-gray-50 rounded-full px-3 py-1 border border-gray-200">
            <button
              onClick={() =>
                onUpdateQty(item.id, Math.max(1, item.quantity - 1))
              }
              disabled={item.quantity <= 1}
              className="p-1 text-gray-500 hover:text-black disabled:opacity-30 transition-colors"
            >
              <Minus size={16} />
            </button>
            <span className="text-sm font-semibold w-6 text-center tabular-nums">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQty(item.id, item.quantity + 1)}
              className="p-1 text-gray-500 hover:text-black transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>

          {/* Remove Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(item.id)}
            className="text-red-500 hover:text-red-600 hover:bg-red-50 h-9 px-3 rounded-lg flex items-center gap-2"
          >
            <Trash2 size={16} />
            <span className="text-xs font-medium sm:hidden">Remove</span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
