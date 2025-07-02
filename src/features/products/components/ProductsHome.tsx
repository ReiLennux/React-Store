import { useEffect, useState } from "react"
import {
  getCoreRowModel,
  useReactTable,
  ColumnDef,
} from "@tanstack/react-table"
import { useGetPager } from "../hooks/useProduct"
import { pagerRequest, pagerResponse, ProductResponseDto } from "../types/products.types"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ProductTable } from "./ProductTable"
import { BadgeCheckIcon, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ProtectedComponent } from "@/shared/components/ProtectedComponent"

export default function ProductHome() {
  const navigate = useNavigate()
  const { getPager, loading, error } = useGetPager()
  const [data, setData] = useState<pagerResponse<ProductResponseDto>>()

  const [form, setForm] = useState<pagerRequest>({ page: 1, record: 10 });

  const fetchData = async () => {
    const response = await getPager(form)
    if (response && response.isSuccess && response.result) {
      setData(response.result)
    }
  }

  useEffect(() => {
    fetchData();
  }, [form]);

  const columns: ColumnDef<ProductResponseDto>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: (info) => `$${info.getValue()}`,
    },
    {
      accessorKey: "categoryName",
      header: "Category",
    },
    {
      accessorKey: "stock",
      header: "Stock",
    },
  ]

  const table = useReactTable({
    data: data?.items || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex items-center justify-center min-h-11/12 bg-gray-50 px-4">
      <Card className="w-full max-w-3/4 p-6 border rounded-2xl shadow-lg bg-white space-y-4">
        <CardHeader>
          <CardTitle>
            <h1 className="text-4xl font-bold mb-4">Products</h1>
          </CardTitle>
          <CardDescription>
            <p className="text-lg">Manage your products here!</p>
            <p className="text-sm text-gray-500 mt-2">If you are
              <Badge
                variant="secondary"
                className="mx-1 bg-blue-500 text-white dark:bg-blue-600"
              >
                <BadgeCheckIcon />
                ADMINISTRADOR
              </Badge>
              you can do it anything here !</p>
          </CardDescription>
          <ProtectedComponent allowedRoles={["ADMINISTRADOR"]}>
            <div className="flex justify-end">
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={() => navigate('/product/form')}
              >
                <Plus />
                Add Product
              </Button>
            </div>
          </ProtectedComponent>

        </CardHeader>
        <CardContent>
          <ProductTable
            table={table}
            error={error}
            loading={loading}
          />
        </CardContent>
        <CardFooter>
          <div className="flex justify-between items-center w-full">
            <span>{form.page} / {data?.totalPages} page</span>
            <div className="space-x-2">
              <Button
                disabled={form.page === 1}
                onClick={() => setForm({ ...form, page: form.page - 1 })}
              >
                Previous
              </Button>
              <Button
                disabled={form.page === data?.totalPages}
                onClick={() => setForm({ ...form, page: form.page + 1 })}
              >
                Next
              </Button>
            </div>
            <span>Total Items: {data?.totalCount || 0}</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
