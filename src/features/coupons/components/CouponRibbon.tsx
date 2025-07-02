import { useEffect, useState } from "react";
import { useGet } from "../hooks/useCoupons";
import { CouponsResponseDto } from "../types/coupons.types";
import { CopyIcon, CheckIcon, InfoIcon, XIcon } from "lucide-react";

// Colores de fondo posibles (puedes agregar más)
const COLORS = [
  "bg-blue-600",
  "bg-green-600",
  "bg-indigo-600",
  "bg-purple-600",
  "bg-pink-600",
  "bg-yellow-500",
  "bg-rose-600",
];

export default function CouponRibbon() {
  const { getCoupons } = useGet();
  const [coupon, setCoupon] = useState<CouponsResponseDto | null>(null);
  const [copied, setCopied] = useState(false);
  const [visible, setVisible] = useState(true);
  const [bgColor, setBgColor] = useState("bg-blue-600");

  useEffect(() => {
    const fetchCoupons = async () => {
      const res = await getCoupons();
      if (res?.isSuccess && res.result?.length) {
        const randomCoupon =
          res.result[Math.floor(Math.random() * res.result.length)];
        setCoupon(randomCoupon);
      }
    };

    // Elegir color aleatorio
    const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    setBgColor(randomColor);

    fetchCoupons();
  }, []);

  const handleCopy = () => {
    if (!coupon) return;
    navigator.clipboard.writeText(coupon.couponCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  if (!visible || !coupon) return null;

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 ${bgColor} text-white px-4 py-2 flex items-center justify-between shadow-md text-sm`}
    >
      <div className="flex items-center gap-2">
        <span className="font-semibold">Cupón del día:</span>
        <button
          onClick={handleCopy}
          className="bg-white text-gray-800 font-mono font-bold px-3 py-1 rounded hover:bg-gray-100 transition"
        >
          {coupon.couponCode}
        </button>
        {copied ? (
          <CheckIcon className="w-4 h-4 text-green-300" />
        ) : (
          <CopyIcon className="w-4 h-4 text-white opacity-70" />
        )}
      </div>

      <div className="flex items-center gap-3 text-white/90">
        <div className="flex items-center gap-1">
          <InfoIcon className="w-4 h-4" />
          <span>
            {coupon.discount}
            {coupon.AmountType === "PERCENT" ? "%" : "$"} de descuento en compras
            mayores a ${coupon.minAmount}
          </span>
        </div>

        {/* Botón de cerrar */}
        <button
          onClick={() => setVisible(false)}
          aria-label="Cerrar banner"
          className="text-white hover:text-red-200 transition p-1"
        >
          <XIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
