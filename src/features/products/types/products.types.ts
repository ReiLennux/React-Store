export interface ProductRequestDto {
    productId?: number
    name: string;
    price: number;
    description: string | null;
    categoryName: string;
    stock: number;
    image: File | null;
}

export interface ProductResponseDto {
    productId: number;
    name: string;
    price: number;
    description: string | null;
    categoryName: string;
    stock: number;
    imageUrl: string;
    imageLocalPath: string;
    image: File | null
}

export interface pagerResponse {
    items: Array<object>;
    totalCount: number;
    totalPages: number;
    currentPage: number;
}

export interface pagerRequest {
    page: number;
    record: number;
}