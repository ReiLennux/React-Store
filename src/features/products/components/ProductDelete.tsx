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
import { useAlert } from "@/contexts/AlertContext";

interface ProductDeleteProps {
  id: number;
}

export function ProductDelete({ id }: ProductDeleteProps) {
  const { showAlert } = useAlert();


  const { delProduct, loading } = useDelete();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await delProduct(id);

    if (response?.isSuccess) {
      showAlert(response.message!, 'success', 3000);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      showAlert(response?.message || "Unknown error", 'error', 3000)
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-red-500 hover:bg-red-700">
          {loading ? (
            <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
          ) : (
            <Trash />
          )}
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
