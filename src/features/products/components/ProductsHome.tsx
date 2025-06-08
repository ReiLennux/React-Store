import { useEffect, useState } from "react"
import {
  getCoreRowModel,
  useReactTable,
  ColumnDef,
} from "@tanstack/react-table"
import { useGetPager } from "../hooks/useProduct"
import { pagerRequest, pagerResponse, ProductResponseDto } from "../types/products.types"
import { ProductDelete } from "./ProductDelete"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ProductTable } from "./ProductTable"
import { ProductDetails } from "./ProductDetails"
import { BadgeCheckIcon, Edit, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ProtectedComponent } from "@/shared/components/ProtectedComponent"

export default function ProductHome() {
  const navigate = useNavigate()
  const { getPager, loading, error } = useGetPager()
  const [data, setData] = useState<pagerResponse<ProductResponseDto>>()
  const [message, setMessage] = useState<string | null>(null);

  const [form, setForm] = useState<pagerRequest>({ page: 1, record: 10 });

  const fetchData = async () => {
    const response = await getPager(form)
    if (response && response.isSuccess && response.result) {
      setData(response.result)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await getPager(form);
      if (response && response.isSuccess && response.result) {
        setData(response.result);
      }
    };
    fetchData();
  }, [form]); // <-- dependencias para actualizar

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
    {
      accessorKey: "Details",
      header: "Details",
      cell: ({ row }) => {
        const product = row.original;
        return (
          <ProductDetails
            product={product}
          />
        );
      },
    },
    {
      accessorKey: "Update",
      header: "Update",
      cell: ({ row }) => {
        const productId = row.original.productId
        return (
          <ProtectedComponent allowedRoles={["ADMINISTRADOR"]}>
            <Button
              className="bg-amber-400 hover:bg-amber-500"
              onClick={() => navigate(`/product/form/${productId}`)}
            >
              <Edit />
              Edit
            </Button>
          </ProtectedComponent>
        )
      }
    },
    {
      accessorKey: "Delete",
      header: "Delete",
      cell: ({ row }) => {
        const product = row.original;
        return (
          <ProtectedComponent allowedRoles={["ADMINISTRADOR"]}>
            <ProductDelete
              id={product.productId}
              onResult={(msg, success) => {
                setMessage(msg);
                if (success) fetchData();
              }}
            />
          </ProtectedComponent>

        );
      },
    },
  ]

  const table = useReactTable({
    data: data?.items || [], // aquí pones solo la página actual
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


      {message && (
        <p className="text-center text-sm text-gray-700 mt-2">{message}</p>
      )}
    </div>
  )
}
