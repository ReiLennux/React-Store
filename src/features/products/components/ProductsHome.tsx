import { useEffect, useState } from "react"
//import { useNavigate } from "react-router-dom"
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
} from "@tanstack/react-table"
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import { useGet } from "../hooks/useProduct"
import { ProductResponseDto } from "../types/products.types"
import { ProductDelete } from "./ProductDelete"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"



export default function ProductHome() {
  const navigate = useNavigate()
  const { getProducts, loading, error } = useGet()
  const [data, setData] = useState<ProductResponseDto[]>([])
  const [message, setMessage] = useState<string | null>(null);

  const fetchData = async () => {
    const response = await getProducts()
    if (response && response.isSuccess && response.result) {
      setData(response.result)
    }
  }

  useEffect(() => {


    fetchData()
  }, [])

  const columns: ColumnDef<ProductResponseDto>[] = [
    {
      accessorKey: "productId",
      header: "ID",
    },
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
      accessorKey: "Update",
      header: "Update",
      cell: () => {
        return (
          <Button onClick={() => navigate('/product/form')}>Edit</Button>
        )
      }
    },
    {
      accessorKey: "Delete",
      header: "Delete",
      cell: ({ row }) => {
        const product = row.original;
        return (
          <ProductDelete
            id={product.productId}
            onResult={(msg, success) => {
              setMessage(msg);
              if (success) fetchData();
            }}
          />
        );
      },
    },
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableCaption>A list of your products.</TableCaption>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center h-24">
                Loading...
              </TableCell>
            </TableRow>
          ) : error ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center h-24 text-red-500">
                {error}
              </TableCell>
            </TableRow>
          ) : data.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}


              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center h-24">
                No products found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {message && (
        <p className="text-center text-sm text-gray-700 mt-2">{message}</p>
      )}
    </div>
  )
}
