import { AlertDialogHeader, AlertDialogFooter, AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useDelete } from "../hooks/useCoupons";
import { useAlert } from "@/contexts/AlertContext";

interface CouponsDeleteProps {
  id: number;

}

export default function CouponsDelete({ id }: CouponsDeleteProps) {
  const { remove, loading } = useDelete();
  const { showAlert } = useAlert();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await remove(id);

    if (response?.isSuccess) {
      showAlert(response.message!, 'success', 3000);
      setTimeout(() => {
        window.location.reload();
      }, 2000); // Redirect after 2 seconds
    } else {
      showAlert(response?.message || "Unknown error", 'error', 3000)
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="rounded-none h-full flex-1 hover:bg-red-50">
          <Trash />
          {loading ? "loading" : "Delete"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this coupon and remove it from our servers.
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
  )

}