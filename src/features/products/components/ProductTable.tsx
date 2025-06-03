import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { flexRender, Table as tb } from "@tanstack/react-table";
import { ProductResponseDto } from "../types/products.types";

interface ProductTableProps {
  table: tb<ProductResponseDto>;
  onResult?: (message: string, success: boolean) => void;
  loading?: boolean;
  error: string | null;
}

export function ProductTable({
  table,
  loading = false,
  error,
}: ProductTableProps) {
  const columnsLength = table.getAllColumns().length

  return (
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
            <TableCell colSpan={columnsLength} className="text-center h-24">
              Loading...
            </TableCell>
          </TableRow>
        ) : error ? (
          <TableRow>
            <TableCell colSpan={columnsLength} className="text-center h-24 text-red-500">
              {error}
            </TableCell>
          </TableRow>
        ) : table.getRowModel().rows.length > 0 ? (
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
            <TableCell colSpan={columnsLength} className="text-center h-24">
              No products found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
