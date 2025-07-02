import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useDelete } from "../hooks/useCoupons";
import { useAlert } from "@/contexts/AlertContext";
import { useNavigate } from "react-router-dom";

interface CouponsDeleteProps {
  id: number;
  redirectAfterDelete?: boolean;
  onDeleted: () => void;
}

export default function CouponsDelete({ id, redirectAfterDelete = false, onDeleted }: CouponsDeleteProps) {
  const { remove, loading } = useDelete();
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await remove(id);

    if (response?.isSuccess) {
      showAlert(response.message!, 'success', 3000);
      if (redirectAfterDelete) {
        setTimeout(() => {
          navigate("/coupon");
        }, 2000);
      } else {
        onDeleted?.();
      }
    } else {
      showAlert(response?.message || "Unknown error", 'error', 3000);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className="rounded-none h-full flex-1 hover:bg-red-50">
          <Trash className="mr-1" />
          {loading ? "Deleting..." : "Delete"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this coupon.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-700"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Processing..." : "Yes! Delete it."}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
