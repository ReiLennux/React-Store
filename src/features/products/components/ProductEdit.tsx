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
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-gray-50 px-4 py-8">
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
        <Card className="w-full max-w-3xl p-6 border rounded-2xl shadow-lg bg-white space-y-4">
          <CardHeader className="">
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
            <CardTitle className="text-2xl font-bold">Edit a this Product</CardTitle>
            <CardDescription className="text-gray-600">
              Please fill in the details below to edit this product.
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
