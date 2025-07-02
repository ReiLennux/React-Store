import { Button } from "@/components/ui/button";
import { useAlert } from "@/contexts/AlertContext";
import { useDeleteCartDetail as use } from "../hooks/useCart";


interface DeleteProductCartProps {
    cartDetailId: number;
}

export default function DeleteProductCart({ cartDetailId }: DeleteProductCartProps) {

    const { showAlert } = useAlert();
    const { useDelete } = use();



    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await useDelete(cartDetailId);

        if (response?.isSuccess) {
            showAlert(response.message || 'Deleted Successfully', 'success', 3000);
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } else {
            showAlert(response?.message || "Unknown error", 'error', 3000);
        }
    }

    return (
        <Button
            onClick={handleDelete}
            variant="ghost"
            size="icon"
            className="text-destructive hover:text-red-600"
        >
            <span className="sr-only">Remove</span>
            <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
            >
                <path d="M6 18L18 6M6 6l12 12" />
            </svg>
        </Button>
    );
}