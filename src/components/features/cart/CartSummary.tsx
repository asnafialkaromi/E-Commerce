import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, ShieldCheck } from "lucide-react";

export default function CartSummary({
  total,
  discountedTotal,
  qty,
}: {
  total: number;
  discountedTotal: number;
  qty: number;
}) {
  const savings = total - discountedTotal;

  return (
    <Card className="sticky top-24 border-gray-100 shadow-lg shadow-gray-200/50 rounded-2xl overflow-hidden">
      <CardHeader className="bg-gray-50/50 pb-4">
        <CardTitle className="text-lg">Order Summary</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 pt-6">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal ({qty} items)</span>
          <span className="font-medium">${total.toFixed(2)}</span>
        </div>

        {savings > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Discount</span>
            <span className="font-medium">-${savings.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between text-sm text-gray-600">
          <span>Shipping Estimate</span>
          <span className="text-gray-400">Calculated at checkout</span>
        </div>

        <Separator className="my-2" />

        <div className="flex justify-between items-baseline">
          <span className="text-base font-semibold">Total</span>
          <div className="text-right">
            <span className="block text-2xl font-bold tracking-tight">
              ${discountedTotal.toFixed(2)}
            </span>
            {savings > 0 && (
              <span className="text-xs text-green-600 font-medium">
                You saved ${savings.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-4 pb-6">
        <Button className="w-full h-12 text-base rounded-xl bg-black hover:bg-gray-800 shadow-md">
          Checkout <ArrowRight className="ml-2 w-4 h-4" />
        </Button>

        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck size={14} />
          <span>Secure Checkout</span>
        </div>
      </CardFooter>
    </Card>
  );
}
