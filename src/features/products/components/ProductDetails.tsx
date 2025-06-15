import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"
import { ProductResponseDto } from "../types/products.types"
import { JSX } from "react"
//import lain from '@/assets/lain.png';


interface ProductDetailsProps {
  product: ProductResponseDto
  children: JSX.Element;
}

export function ProductDetails({ product, children }: ProductDetailsProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent className="p-0 overflow-hidden">
        {product.imageUrl && (
          <div className="relative h-48 w-full">
            <img
              //src={lain}
              src={`http://localhost:7575/public/${product.imageUrl}`}
              alt={product.name}
              className="w-full h-full object-cover object-top"
            />
            {/* Desvanecido inferior */}
            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white via-white/80 to-transparent" />
          </div>
        )}

        <div className="p-6 space-y-2 text-sm text-gray-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-semibold">
              {product.name}
            </AlertDialogTitle>
          </AlertDialogHeader>

          <div>
            <span className="font-medium">Description:</span>{" "}
            {product.description || "No description"}
          </div>
          <div>
            <span className="font-medium">Price:</span> ${product.price}
          </div>
          <div>
            <span className="font-medium">Category:</span> {product.categoryName}
          </div>
          <div>
            <span className="font-medium">Stock:</span> {product.stock}
          </div>
        </div>

        <AlertDialogFooter className="px-6 pb-4">
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
