import { CouponsResponseDto } from "../types/coupons.types";
import { format } from "date-fns";
import { ProtectedComponent } from "@/shared/components/ProtectedComponent";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CouponsDelete from "./CouponsDelete";
import CouponsDetails from "./CouponsDetails";

type CouponsTableProps = {
  coupons: CouponsResponseDto[];
};

export default function CouponsTable({ coupons }: CouponsTableProps) {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-4">
      {coupons.reverse().map((item) => {
        const isExpired = new Date(item.DateEnd).getTime() < Date.now();
        const isActive = item.StateCoupon && !isExpired;
        const isNew = new Date(item.DateInit).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000;

        return (
          <div
            key={item.id}
            className={`relative transition-all border-2 rounded-2xl bg-white shadow-md hover:shadow-lg overflow-hidden 
              ${!isActive ? "opacity-70 grayscale" : "hover:scale-[1.02]"} 
              ${isNew && isActive ? "border-green-400 border-2" : "border-dashed"}`}
          >

            {isNew && isActive && (
              <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-2 py-1 text-center">
                ¡New!
              </div>
            )}
            <div className="grid grid-cols-3 h-full">
              <CouponsDetails coupon={item}>

                <div className={`pb-1 rounded-l-2xl flex flex-col justify-between 
                ${isActive ? "bg-blue-200" : "bg-slate-200"}`}>
                  <div className="m-4">
                    <p className="text-center text-3xl md:text-4xl font-bold tracking-widest text-blue-600 truncate">
                      {item.couponCode}
                    </p>
                    <p className="text-center text-sm md:text-lg text-gray-600 italic mt-2">
                      {item.Category}
                    </p>
                  </div>

                  <div className="text-center mb-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {item.discount} {item.AmountType == 'porcentaje' ? '%' : '$'}
                    </span>
                  </div>
                </div>
              </CouponsDetails>

              {/* Coupon details */}
              <CouponsDetails coupon={item}>

                <div className="flex flex-col justify-between p-4 text-sm text-gray-700">
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Válido hasta:</p>
                    <p className={`mb-2 ${isExpired ? "text-red-500" : "text-gray-700"}`}>
                      {format(new Date(item.DateEnd), "dd MMM yyyy")}
                    </p>

                    {item.minAmount && (
                      <div className="mt-2">
                        <p className="font-semibold text-gray-900">Compra mínima:</p>
                        <p>${item.minAmount}</p>
                      </div>
                    )}
                  </div>
                  <div className="mt-2">
                    <span className={`px-2 py-1 rounded text-xs font-bold 
                    ${isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                      {isActive ? "Activo" : isExpired ? "Expirado" : "Inactivo"}
                    </span>
                  </div>
                </div>
              </CouponsDetails>

              <ProtectedComponent allowedRoles={['ADMINISTRADOR']}>
                <div className="flex flex-col border-l border-gray-200">
                  <Button
                    variant="ghost"
                    className="rounded-none h-full flex-1 hover:bg-yellow-100"
                    onClick={() => navigate(`/coupon/form/${item.id}`)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <CouponsDelete id={item.id} />
                </div>
              </ProtectedComponent>
            </div>
          </div>

        );
      })}
    </div>
  );
}