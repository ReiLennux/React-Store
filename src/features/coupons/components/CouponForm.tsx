import { useEffect, useRef, useState } from "react";
import { CouponsRequestDto } from "../types/coupons.types";
import { useNavigate } from "react-router-dom";
import { usePatch, usePost } from "../hooks/useCoupons";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { SelectGroup } from "@radix-ui/react-select";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { useAlert } from "@/contexts/AlertContext";

interface Props {
    coupon?: CouponsRequestDto;
    id?: number;
}

export default function CouponForm({ coupon, id }: Props) {
    const { showAlert } = useAlert();
    const navigate = useNavigate();
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const [formData, setFormData] = useState({
        couponCode: "",
        discount: 0,
        minAmount: 0,
        AmountType: "PERCENTAGE",
        LimitUse: 1,
        DateInit: new Date(),
        DateEnd: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        Category: "",
        StateCoupon: true,
    });

    const [originalData, setOriginalData] = useState("");
    const [error, setError] = useState<string | null>(null);
    const { post, loading: isPosting, error: postError } = usePost();
    const { patch, loading: isPatching, error: patchError } = usePatch();

    useEffect(() => {
        if (coupon) {
            const {
                couponCode,
                discount,
                minAmount,
                AmountType,
                LimitUse,
                DateEnd,
                DateInit,
                Category,
                StateCoupon,
            } = coupon;

            setFormData({
                couponCode,
                discount: Number(discount),
                minAmount,
                AmountType: AmountType || "PERCENTAGE",
                LimitUse: Number(LimitUse) || 1,
                DateInit: new Date(DateInit),
                DateEnd: new Date(DateEnd),
                Category,
                StateCoupon: Boolean(StateCoupon),
            });

            setOriginalData(JSON.stringify(coupon));
        }
    }, [coupon]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        const val = type === "number" ? parseFloat(value) || 0 : value;
        setFormData(prev => ({
            ...prev,
            [name]: val,
        }));
    };

    const validateForm = () => {
        if (formData.discount <= 0) {
            setError("Discount must be greater than 0");
            return false;
        }

        if (formData.AmountType === "PERCENTAGE" && formData.discount > 100) {
            setError("Percentage discount cannot exceed 100%");
            return false;
        }

        if (formData.DateEnd <= formData.DateInit) {
            setError("End date must be after start date");
            return false;
        }

        if (formData.LimitUse <= 0) {
            setError("Limit use must be at least 1");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!validateForm()) return;

        const jsonToCompare = JSON.stringify({ ...formData });
        if (coupon && jsonToCompare === originalData) {
            setError("No changes detected");
            return;
        }

        const payload = { ...formData };

        try {
            let response;
            if (coupon && id) {
                response = await patch(id, payload);
            } else {
                response = await post(payload);
            }

            showAlert(response?.message || 'Success', 'success', 3000);

            // ✅ Redirección con timeout cancelable
            timeoutRef.current = setTimeout(() => {
                navigate('/coupon');
            }, 2000);
        } catch (err) {
            console.error(err);
            setError("Error submitting the form");
            showAlert(error || postError || patchError || "Unknown error", 'error', 3000);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Coupon Code */}
            <div className="space-y-2">
                <Label htmlFor="couponCode">Coupon Code *</Label>
                <Input
                    id="couponCode"
                    name="couponCode"
                    type="text"
                    placeholder="SUMMER25"
                    required
                    value={formData.couponCode}
                    onChange={handleChange}
                    pattern="[A-Za-z0-9-]+"
                    title="Only letters, numbers and hyphens are allowed"
                />
                <p className="text-sm text-muted-foreground">Unique coupon identifier</p>
            </div>

            {/* Discount and Min Amount */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="discount">Discount *</Label>
                    <Input
                        id="discount"
                        name="discount"
                        type="number"
                        placeholder="10"
                        required
                        min="0"
                        step={formData.AmountType === "PERCENTAGE" ? "1" : "0.01"}
                        value={formData.discount}
                        onChange={handleChange}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="minAmount">Minimum Amount *</Label>
                    <Input
                        id="minAmount"
                        name="minAmount"
                        type="number"
                        placeholder="50"
                        required
                        min="0"
                        step="0.01"
                        value={formData.minAmount}
                        onChange={handleChange}
                    />
                </div>
            </div>

            {/* Amount Type */}
            <div className="space-y-2">
                <Label>Amount Type *</Label>
                <Select
                    value={formData.AmountType}
                    onValueChange={(value) => {
                        setFormData(prev => ({ ...prev, AmountType: value }));
                        if (value === "PERCENTAGE" && formData.discount > 100) {
                            setFormData(prev => ({ ...prev, discount: 100 }));
                        }
                    }}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select amount type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="PERCENTAGE">Percentage (%)</SelectItem>
                            <SelectItem value="FIXED">Fixed Amount ($)</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            {/* Limit Use */}
            <div className="space-y-2">
                <Label htmlFor="LimitUse">Usage Limit *</Label>
                <Input
                    id="LimitUse"
                    name="LimitUse"
                    type="number"
                    placeholder="100"
                    required
                    min="1"
                    value={formData.LimitUse}
                    onChange={handleChange}
                />
                <p className="text-sm text-muted-foreground">Maximum number of times this coupon can be used</p>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label>Start Date *</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !formData.DateInit && "text-muted-foreground")}>
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {formData.DateInit ? format(formData.DateInit, "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={formData.DateInit}
                                onSelect={(date) => date && setFormData(prev => ({ ...prev, DateInit: date }))}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="space-y-2">
                    <Label>End Date *</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !formData.DateEnd && "text-muted-foreground")}>
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {formData.DateEnd ? format(formData.DateEnd, "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={formData.DateEnd}
                                onSelect={(date) => date && setFormData(prev => ({ ...prev, DateEnd: date }))}
                                initialFocus
                                fromDate={formData.DateInit}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
                <Label htmlFor="Category">Category</Label>
                <Input
                    id="Category"
                    name="Category"
                    type="text"
                    placeholder="e.g. Electronics, Clothing"
                    value={formData.Category}
                    onChange={handleChange}
                />
                <p className="text-sm text-muted-foreground">Optional category restriction</p>
            </div>

            {/* State */}
            <div className="flex items-center space-x-2">
                <Switch
                    id="StateCoupon"
                    checked={formData.StateCoupon}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, StateCoupon: checked }))}
                />
                <Label htmlFor="StateCoupon">Active Coupon</Label>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-2 space-x-4 pt-4">
                <Button type="button" variant="outline" onClick={() => navigate(-1)} disabled={isPosting || isPatching}>
                    Cancel
                </Button>
                <Button
                    type="submit"
                    disabled={isPosting || isPatching}
                    className={`${id ? 'bg-amber-400 hover:bg-amber-500' : 'bg-green-600 hover:bg-green-700'}`}
                >
                    {isPosting || isPatching ? (
                        <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Processing...
                        </span>
                    ) : coupon ? "Update Coupon" : "Create Coupon"}
                </Button>
            </div>

            {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
        </form>
    );
}
