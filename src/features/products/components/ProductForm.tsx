import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ProductRequestDto } from "../types/products.types"
import { Textarea } from "@/components/ui/textarea"
import { usePost, usePut } from "../hooks/useProduct"
import { useAlert } from "@/contexts/AlertContext"

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
  const navigate = useNavigate()
  const { postProduct, loading: isPosting, error: postError } = usePost();
  const { putProduct, loading: isPatching, error: patchError } = usePut();
  const { showAlert } = useAlert();


  useEffect(() => {
    if (product) {
      const { productId, name, description, price, categoryName, stock } = product
      setFormData({
        productId: productId || undefined,
        name: name || "",
        description: description || "",
        price: price.toString(),
        categoryName: categoryName,
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
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const payload = {
      productId: formData.productId,
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      categoryName: formData.categoryName,
      stock: parseInt(formData.stock),
      image: formData.image,
    }

    const jsonToCompare = JSON.stringify({ ...payload, image: undefined })

    if (product && jsonToCompare === originalData) {
      setError("No changes detected")
      return
    }

    try {
      let response;
      if (product) {
        response = await putProduct(payload)
      } else {
        response = await postProduct(payload)
      }
      showAlert(response?.message || 'Success', 'success', 3000);
      setTimeout(() => {
        navigate('/product');
      }, 2000); // Redirect after 2 seconds
    } catch (err) {
      setError(`Error submitting the form ${err}`)
      showAlert(error || postError || patchError || "Unknown error", 'error', 3000)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
      {error && <p className="text-red-500">{error}</p>}

      <Input name="id" value={formData.productId} hidden={true} />

      <Input name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" required />

      <Textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" />

      <Input name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} placeholder="Price" required />

      <Input name="stock" type="number" value={formData.stock} onChange={handleChange} placeholder="Stock" required />

      <Input name="categoryName" type="text" value={formData.categoryName} onChange={handleChange} placeholder="Category Name" required />

      <Input type="file" accept="image/*" onChange={handleImageChange} />

      <Button
        type="submit"
        disabled={isPosting || isPatching}
        className={`${product ? 'bg-amber-400 hover:bg-amber-500' : 'bg-green-600 hover:bg-green-700'}`}
      >
        {isPatching || isPosting ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : product ? "Update Coupon" : "Create Coupon"}
      </Button>
    </form>
  )
}
