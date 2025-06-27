
export interface CartDto {
    cartHeader: CartHeaderDto;
    cartDetails: CartDetailsDto[];
}

export interface CartHeaderDto {
    CartHeaderId: number;
    UserId: number;
    CouponCode: string;
    Discount: number;
    Total: number;

}

export interface CartDetailsDto {
    CartDetailsId: number;
    CartHeaderId: number;
    ProductId: number;
    ProductDto: ProductFromCartDto;
    Count: number;
    Price: number;
}

export interface ProductFromCartDto {
    productId: number;
    name: string;
    price: number;
    description: string | null;
    category: string;
    imageUrl: string;
}