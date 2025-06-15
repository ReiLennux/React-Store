import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { ProductForm } from "./ProductForm"

export default function ProductCreate() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-gray-50 px-4 py-8">
      <Card className="w-full max-w-3xl p-6 border rounded-2xl shadow-lg bg-white space-y-4">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-bold">Register a new Product</CardTitle>
          <CardDescription className="text-gray-600">
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
