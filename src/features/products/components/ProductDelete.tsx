import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTrigger,
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Trash } from "lucide-react";
import { useDelete } from "../hooks/useProduct";
import { Button } from "@/components/ui/button";

// Añadimos props para manejar desde el padre
interface ProductDeleteProps {
  id: number;
  onResult?: (message: string, success: boolean) => void;
}

export function ProductDelete({ id, onResult }: ProductDeleteProps) {
  const { delProduct, loading } = useDelete();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await delProduct(id);

    if (response?.isSuccess) {
      onResult?.("This product was deleted successfully!", true);
    } else {
      onResult?.(response?.message || "Cannot delete this product. Check and try again", false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-red-500 hover:bg-red-700">
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this product and remove it from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction 
          className="bg-red-500 hover:bg-red-700"
          onClick={handleSubmit}
          >
            Yes! Delete it.
            </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
