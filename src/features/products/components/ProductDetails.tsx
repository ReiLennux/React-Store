import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"
import { Logs } from "lucide-react"
import { ProductResponseDto } from "../types/products.types"
import { Button } from "@/components/ui/button"

interface ProductDetailsProps {
  product: ProductResponseDto
}

export function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
          <Logs size={16} />
          Details
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-semibold">
            Product Details
          </AlertDialogTitle>
        </AlertDialogHeader>

        <div className="grid grid-cols-1 gap-2 text-sm text-gray-700">
          <div>
            <span className="font-medium">Name:</span> {product.name}
          </div>
          <div>
            <span className="font-medium">Description:</span> {product.description || "No description"}
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
          {product.imageUrl && (
            <div>
              <span className="font-medium">Image:</span>
              <img
                src={`localhost:3000/product.imageUrl`}
                alt={product.name}
                className="mt-1 h-32 w-32 object-cover border rounded"
              />
            </div>
          )}
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
