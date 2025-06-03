export interface ProductRequestDto {
    id: number;
    name: string;
    price: number;
    description: string;
    category: string;
    stock: string;
    image?: File
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