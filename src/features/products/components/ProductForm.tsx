import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ProductRequestDto } from "../types/products.types"
import { postProduct, updateProduct } from "../api/products.api"
import { Textarea } from "@/components/ui/textarea"

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

      // Guardamos el original en string para comparar luego
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
      if (product) {
        await updateProduct(payload)
      } else {
        await postProduct(payload)
      }
      navigate("/product")
    } catch (err) {
      console.error(err)
      setError("Error submitting the form")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
      {error && <p className="text-red-500">{error}</p>}

      <Input name="id" value={formData.productId} hidden={true}/>

      <Input name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" required />

      <Textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" />

      <Input name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} placeholder="Price" required />

      <Input name="stock" type="number" value={formData.stock} onChange={handleChange} placeholder="Stock" required />

      <Input name="categoryName" type="text" value={formData.categoryName} onChange={handleChange} placeholder="Category Name" required />

      <Input type="file" accept="image/*" onChange={handleImageChange} />

      <Button type="submit" className="w-full">{product ? "Update" : "Create"} Product</Button>
    </form>
  )
}
