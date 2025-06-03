import { deleteProducts, getPagerProducts, getProductById, getProducts, postProduct, updateProduct } from "../api/products.api";
import { pagerRequest, pagerResponse, ProductRequestDto, ProductResponseDto } from "../types/products.types";
import { Response } from "@/types/api";


export async function post(request: ProductRequestDto): Promise<Response<ProductResponseDto>> {
    const response = await postProduct(request);

    if (!response?.isSuccess) throw new Error(response?.message || 'Post Product Error');

    return response;
}


export async function get(): Promise<Response<ProductResponseDto[]>> {
    const response = await getProducts();

    if (!response?.isSuccess) throw new Error(response?.message || 'Get Products Error');

    return response;
    
}

export async function put(request:ProductRequestDto): Promise<Response<ProductResponseDto>> {
    const response = await updateProduct(request);

    if (!response?.isSuccess) throw new Error(response?.message || 'Update Product Error');

    return response;
    
}

export async function getPaged(request: pagerRequest): Promise<Response<pagerResponse>> {
    const response = await getPagerProducts(request);

    if(!response?.isSuccess) throw new Error(response?.message || 'Get Page Error');

    return response;
}

export async function getById(id: number): Promise<Response<ProductResponseDto>> {
    const response = await getProductById(id);

    if(!response?.isSuccess) throw new Error(response?.message || 'Get Page Error');

    return response;
}

export async function del(id:number): Promise<Response<null>> {
    const response = await deleteProducts(id);

    if(!response?.isSuccess) throw new Error(response?.message || 'Get Page Error');

    return response;
    
}