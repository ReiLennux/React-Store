import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { ProductForm } from "./ProductForm"

export default function ProductCreate() {
  return (
    <div className="flex items-center justify-center min-h-11/12 bg-gray-50 px-4">
      <Card className="w-full max-w-1/4 p-6 border rounded-2xl shadow-lg bg-white space-y-4">
        <CardHeader>
          <CardTitle>Register a new Product</CardTitle>
          <CardDescription>
            Please fill in the details below to register a new product.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProductForm />
        </CardContent>
      </Card>
    </div>

  )
}
