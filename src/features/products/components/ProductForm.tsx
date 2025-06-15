import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ProductRequestDto } from "../types/products.types"
import { Textarea } from "@/components/ui/textarea"
import { usePost, usePut } from "../hooks/useProduct"
import { useAlert } from "@/contexts/AlertContext"
import { Label } from "@/components/ui/label"

interface Props {
  product?: ProductRequestDto
}

export function ProductForm({ product }: Props) {
  const [formData, setFormData] = useState<{
    productId: number | undefined
    name: string
    description: string
    price: string
    categoryName: string
    stock: string
    image: File | null
  }>({
    productId: undefined,
    name: "",
    description: "",
    price: "",
    categoryName: "",
    stock: "",
    image: null,
  })

  const [originalData, setOriginalData] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const navigate = useNavigate()
  const { postProduct, loading: isPosting, error: postError } = usePost()
  const { putProduct, loading: isPatching, error: patchError } = usePut()
  const { showAlert } = useAlert()

  useEffect(() => {
    if (product) {
      const { productId, name, description, price, categoryName, stock } = product
      setFormData({
        productId: productId || undefined,
        name: name || "",
        description: description || "",
        price: price.toString(),
        categoryName: categoryName || "",
        stock: stock.toString(),
        image: null,
      })

      const { image, ...rest } = product
      setOriginalData(JSON.stringify(rest))
    }
  }, [product])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData(prev => ({ ...prev, image: file }))

    if (file) {
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    } else {
      setPreviewUrl(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const price = parseFloat(formData.price)
    const stock = parseInt(formData.stock)

    if (isNaN(price) || isNaN(stock)) {
      setError("Price and Stock must be valid numbers.")
      return
    }

    const payload = {
      productId: formData.productId,
      name: formData.name,
      description: formData.description,
      price,
      categoryName: formData.categoryName,
      stock,
      image: formData.image,
    }

    const jsonToCompare = JSON.stringify({ ...payload, image: undefined })

    if (product && jsonToCompare === originalData) {
      setError("No changes detected.")
      return
    }

    try {
      const response = product ? await putProduct(payload) : await postProduct(payload)
      showAlert(response?.message || 'Success', 'success', 3000)
      setTimeout(() => {
        navigate('/product')
      }, 2000)
    } catch {
      const msg = error || postError || patchError || "Unknown error"
      setError(`Error submitting the form: ${msg}`)
      showAlert(msg, 'error', 3000)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Input name="id" value={formData.productId} hidden readOnly />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product Name"
            required
          />
        </div>

        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            required
          />
        </div>

        <div>
          <Label htmlFor="categoryName">Category Name</Label>
          <Input
            id="categoryName"
            name="categoryName"
            value={formData.categoryName}
            onChange={handleChange}
            placeholder="Category"
            required
          />
        </div>

        <div>
          <Label htmlFor="stock">Stock</Label>
          <Input
            id="stock"
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Stock"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
        />
      </div>

      <div>
        <Label htmlFor="image">Product Image</Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        {!product && previewUrl && (
          <div className="pt-10 relative h-48 w-full">
            <div className="absolute top-0 right-0 w-full h-16 bg-gradient-to-b from-white via-white/80 to-transparent" />

            <img
              src={previewUrl}
              alt="new image"
              className="w-full h-full object-cover object-top"
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 space-x-4 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate(-1)}
          disabled={isPosting || isPatching}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isPosting || isPatching}
          className={`${product ? 'bg-amber-500 hover:bg-amber-600' : 'bg-green-600 hover:bg-green-700'} w-full`}
        >
          {isPosting || isPatching ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0..." />
              </svg>
              Processing...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              {product ? "Update Product" : "Create Product"}
            </span>
          )}
        </Button>
      </div>

    </form>
  )
}
