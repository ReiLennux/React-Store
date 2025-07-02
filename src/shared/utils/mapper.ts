import { ProductFromCartDto } from "@/features/cart/types/cart.type";
import { ProductResponseDto } from "@/features/products/types/products.types";


export default function productDtoToProductFromCartDto(productDto: ProductResponseDto): ProductFromCartDto {
  return {
    productId: productDto.productId,
    name: productDto.name,
    price: productDto.price,
    description: productDto.description,
    categoryName: productDto.categoryName,
    imageUrl: productDto.imageUrl,
  };
}