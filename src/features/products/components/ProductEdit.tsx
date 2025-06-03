import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { ProductForm } from "./ProductForm"
import { ProductResponseDto } from "../types/products.types"
import { useGetById } from "../hooks/useProduct"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProductEdit() {
  const { id } = useParams()
  const [product, setProduct] = useState<ProductResponseDto | null>(null)
  const { getId, loading, error } = useGetById()


  const fetchData = async () => {
    const response = await getId(parseInt(id!))
    if (response && response.isSuccess && response.result) {
      setProduct(response.result)
    }
  }

  useEffect(() => {


    fetchData()
  }, [])

  if (!product) return <p>Product not found</p>

  return (
      <div className="flex items-center justify-center min-h-11/12 bg-gray-50 px-4">
      {loading ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-center h-24">
              Loading...
            </CardTitle>
          </CardHeader>
        </Card>
      ) : error ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-center h-24 text-red-500">
              {error}
            </CardTitle>
          </CardHeader>
        </Card>
      ) : (
          <Card className="w-full max-w-1/4 p-6 border rounded-2xl shadow-lg bg-white space-y-4">
            <CardHeader>
              <CardTitle>Register a new Product</CardTitle>
              <CardDescription>
                Please fill in the details below to register a new product.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProductForm product={product} />
            </CardContent>
          </Card>
      )}

    </div>
  )
}
