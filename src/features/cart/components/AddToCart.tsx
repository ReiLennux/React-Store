import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useUpsertCart as useUC } from "@/features/cart/hooks/useCart";
import { useGetCart as useGC } from "../hooks/useCart";
import { useAlert } from "@/contexts/AlertContext";
import { CartDto, CartHeaderDto, CartDetailsDto, ProductFromCartDto } from "../types/cart.type";
import { getAuthCookie } from "@/shared/utils/cookies";

interface AddToCartProps {
  productDto: ProductFromCartDto;
}

export default function AddToCart({ productDto }: AddToCartProps) {

  const userId = Number(getAuthCookie("userId"));
  const { showAlert } = useAlert();
  const { useUpsertCart, loading: upsertLoading } = useUC();
  const { UseGetCart } = useGC();

  const handleAddToCart = async () => {
    if (!userId) {
      showAlert("User not logged in", "error", 3000);
      return;
    }

    const existingCart = await UseGetCart(userId);


    let cartHeader: CartHeaderDto;
    let cartDetails: CartDetailsDto[] = [];

    if (existingCart?.isSuccess && existingCart.result) {
      // Si existe un cart, lo usamos
      cartHeader = existingCart.result.cartHeader;
      cartDetails = existingCart.result.cartDetails;


      const existingItem = cartDetails.find(
        (item) => item.ProductId === productDto.productId
      );

      if (existingItem) {
        existingItem.Count += 1;
      } else {
        cartDetails.push({
          CartDetailsId: 0,
          CartHeaderId: cartHeader.CartHeaderId,
          ProductId: productDto.productId,
          ProductDto: productDto,
          Count: 1,
          Price: productDto.price,
        });
      }

      cartHeader.Total += productDto.price;
    } else {
      // Si no hay cart, lo creamos desde cero
      cartHeader = {
        CartHeaderId: 0,
        UserId: userId,
        CouponCode: "",
        Discount: 0,
        Total: productDto.price,
      };

      cartDetails = [
        {
          CartDetailsId: 0,
          CartHeaderId: 0,
          ProductId: productDto.productId,
          ProductDto: productDto,
          Count: 1,
          Price: productDto.price,
        },
      ];
    }

    const response = await useUpsertCart({
      cartHeader: cartHeader,
      cartDetails: cartDetails,
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
