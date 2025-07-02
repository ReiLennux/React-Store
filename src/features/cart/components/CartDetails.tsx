import {
  Card,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { CartDetailsDto } from "../types/cart.type";
import DeleteProductCart from "./DeleteProductCart";

interface CartDetailsProps {
  cartDetails: CartDetailsDto[]| null;
  loading?: boolean;
  error?: string | null;
}

export default function CartDetails({
  cartDetails,
  loading = false,
  error,
}: CartDetailsProps) {
  if (loading) {
    return (
      <Card className="p-6">
        <CardTitle className="mb-4">Loading products...</CardTitle>
        <div className="space-y-4">
          {[1, 2, 3].map((_, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <Skeleton className="h-16 w-16 rounded" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6 border border-red-500">
        <CardTitle className="text-red-500">Error: {error}</CardTitle>
      </Card>
    );
  }

  if (!cartDetails || cartDetails.length === 0) {
    return (
      <Card className="p-6 text-center">
        <CardTitle className="text-muted-foreground">There are no products.</CardTitle>
      </Card>
    );
  }

  return (
    <Card className="p-6 space-y-6">
      <CardTitle className="text-xl">Your Cart</CardTitle>
      <CardContent className="space-y-6">
        {cartDetails.map((item, idx) => (
          <div key={item.CartDetailsId}>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={`http://localhost:7575/public/${item.ProductDto.imageUrl}`}
                  alt={item.ProductDto.name}
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div>
                  <h3 className="text-base font-medium">{item.ProductDto.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.ProductDto.description || "No description"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Quantity */}
                <div className="flex items-center border rounded-md px-2">
                  <Button variant="ghost" size="icon">
                    –
                  </Button>
                  <span className="px-2 text-sm">{item.Count}</span>
                  <Button variant="ghost" size="icon">
                    +
                  </Button>
                </div>

                {/* Price */}
                <span className="font-medium text-right text-sm">
                  ${(item.Price * item.Count).toFixed(2)}
                </span>

                {/* Remove */}
                <DeleteProductCart cartDetailId={item.CartDetailsId} />
              </div>
            </div>

            {/* Optional Separator */}
            {idx < cartDetails.length - 1 && <Separator className="my-4" />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
