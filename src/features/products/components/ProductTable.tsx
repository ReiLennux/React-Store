import { Table as tb } from "@tanstack/react-table";
import { ProductResponseDto } from "../types/products.types";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { ProductDetails } from "./ProductDetails";
import { Edit, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProtectedComponent } from "@/shared/components/ProtectedComponent";
import { ProductDelete } from "./ProductDelete";
import { useNavigate } from "react-router-dom";

interface ProductTableProps {
  table: tb<ProductResponseDto>;
  loading?: boolean;
  error: string | null;
}

export function ProductTable({
  table,
  loading = false,
  error,
}: ProductTableProps) {
  const navigate = useNavigate();

  const rows = table.getRowModel().rows;

  if (loading) {
    return (
      <Card className="text-center shadow-md rounded-2xl py-10">
        <CardTitle className="text-lg font-semibold">Loading products...</CardTitle>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="text-center shadow-md rounded-2xl border border-red-500 py-10">
        <CardTitle className="text-red-500 font-semibold">Error: {error}</CardTitle>
      </Card>
    );
  }

  if (rows.length === 0) {
    return (
      <Card className="text-center shadow-md rounded-2xl py-10">
        <CardTitle className="text-gray-500">There are no products.</CardTitle>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {rows.map((row) => {
        const { name, stock, price, productId } = row.original;

        return (
          <Card className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <ProductDetails key={row.id} product={row.original}>
              <div>

                <CardHeader className="flex justify-center rounded-t-2xl">
                  <img
                    src={`http://localhost:7575/public/${row.original.imageUrl}`}
                    alt={`Imagen de ${row.original.imageUrl}`}
                    className="max-w-[150px] rounded-md"
                  />
                </CardHeader>
                <CardContent className="space-y-3 px-4 py-4">
                  <p className="text-xl font-semibold line-clamp-2 min-h-[3.5rem]">{name}</p>
                  <p className="text-sm text-gray-500">In Stock: {stock}</p>

                  <div className="flex items-center justify-between mt-4">
                    <h1 className="text-3xl font-bold">${price}</h1>
                    <Button className="hover:bg-green-600 flex items-center gap-2">
                      <ShoppingCart className="w-4 h-4" />
                      Add
                    </Button>
                  </div>
                </CardContent>
              </div>
            </ProductDetails>
            <ProtectedComponent allowedRoles={["ADMINISTRADOR"]}>
              <CardFooter className="grid grid-cols-2 gap-3 border-t pt-4">
                <Button
                  className="bg-amber-400 hover:bg-amber-500"
                  onClick={() => navigate(`/product/form/${productId}`)}
                >
                  <Edit className="w-4 h-4" />
                </Button>

                <ProductDelete id={productId} />
              </CardFooter>
            </ProtectedComponent>
          </Card>
        );
      })}
    </div>
  );
}

