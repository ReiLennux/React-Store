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
      <AlertDialogTrigger>
        <Trash />
        {loading ? "Loading..." : "Delete"}
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
          <AlertDialogAction onClick={handleSubmit}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
