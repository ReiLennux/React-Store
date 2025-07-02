import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useUpsertCart as useUC } from "@/features/cart/hooks/useCart";
import { useAlert } from "@/contexts/AlertContext";
import { CartDto, CartHeaderDto, CartDetailsDto, ProductFromCartDto } from "../types/cart.type";
import { getAuthCookie } from "@/shared/utils/cookies";

interface AddToCartProps {
  productDto: ProductFromCartDto;
}

export default function AddToCart({ productDto }: AddToCartProps) {
  const userId = Number(getAuthCookie("userId"));
  const { showAlert } = useAlert();
  const { UseUpsertCart, loading: upsertLoading } = useUC();

  const handleAddToCart = async () => {
    if (!userId || isNaN(userId)) {
      showAlert("User not logged in", "error", 3000);
      return;
    }

    const cartHeader: CartHeaderDto = {
      CartHeaderId: 0, 
      UserId: userId,
      CouponCode: "",
      Discount: 0,
      Total: productDto.price,
    };

    const cartDetails: CartDetailsDto[] = [
      {
        CartDetailsId: 0,
        CartHeaderId: 0,
        ProductId: productDto.productId,
        ProductDto: productDto,
        Count: 1,
        Price: productDto.price,
      },
    ];

    const response = await UseUpsertCart({
      cartHeader,
      cartDetails,
    } as CartDto);

    if (response?.isSuccess) {
      showAlert(response.message!, "success", 3000);
    } else {
      showAlert(response?.message || "Failed to add to cart", "error", 3000);
    }
  };

  return (
    <Button
      onClick={handleAddToCart}
      disabled={upsertLoading}
      className="hover:bg-green-600 flex items-center gap-2"
    >
      <ShoppingCart className="w-4 h-4" />
      {upsertLoading ? "Adding..." : "Add"}
    </Button>
  );
}
