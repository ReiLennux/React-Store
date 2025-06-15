import { JSX } from "react";
import { format } from "date-fns";
import { CouponsResponseDto } from "../types/coupons.types";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface CouponsDetailsProps {
    coupon: CouponsResponseDto
    children: JSX.Element;
}

export default function CouponsDetails({ coupon, children }: CouponsDetailsProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent className="p-0 overflow-hidden">
                <div className="p-6 space-y-2 text-sm text-gray-700">

                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-lg font-semibold">
                            This is a coupon for {coupon.Category} category
                        </AlertDialogTitle>
                    </AlertDialogHeader>

                    <div>
                        <span className="font-medium">Date Init:</span>{" "}
                        {format(new Date(coupon.DateInit), "dd MMM yyyy")}
                    </div>
                    <div>
                        <span className="font-medium">Last Updated:</span> {format(new Date(coupon.LastUpdated), "dd MMM yyyy")}
                    </div>
                    <div>
                        <span className="font-medium">Limit uses:</span> {coupon.LimitUse}
                    </div>
                    <div>
                        <span className="font-medium">Minimum Amount:</span> {coupon.minAmount}
                    </div>
                </div>
                <div className="flex items-center justify-center gap-2">
                    <span className="font-medium">Code:</span>
                    <span className="bg-gray-100 px-2 py-1 rounded text-base font-mono">{coupon.couponCode}</span>
                    <button
                        className="ml-2 px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        onClick={() => {
                            navigator.clipboard.writeText(coupon.couponCode);
                        }}
                        type="button"
                    >
                        Copy
                    </button>
                </div>
                <AlertDialogFooter className="px-6 pb-4">
                    <AlertDialogCancel>Close</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )

}