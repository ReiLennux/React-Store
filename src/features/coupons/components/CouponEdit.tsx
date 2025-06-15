import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { CouponsRequestDto } from "../types/coupons.types"
import { useGetById } from "../hooks/useCoupons"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import CouponForm from "./CouponForm"

export default function CouponEdit() {
    const { id } = useParams()
    const [coupon, setCoupon] = useState<CouponsRequestDto | null>(null)
    const { getById, loading, error } = useGetById()


    const fetchData = async () => {
        const response = await getById(parseInt(id!))
        if (response && response.isSuccess && response.result) {
            setCoupon(response.result)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    if (!coupon) return <p>Coupon not found</p>

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-gray-50 px-4 py-8">
            {loading ? (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-center h-24">
                            Loading...
                        </CardTitle>
                    </CardHeader>
                </Card>
            ) : error ? (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-center h-24 text-red-500">
                            {error}
                        </CardTitle>
                    </CardHeader>
                </Card>
            ) : (
                <Card className="w-full max-w-3xl p-6 border rounded-2xl shadow-lg bg-white space-y-4">
                    <CardHeader className="space-y-2">
                        <CardTitle className="text-2xl font-bold">Edit a this Coupon</CardTitle>
                        <CardDescription className="text-gray-600">
                            Please fill in the details below to edit this coupon.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <CouponForm coupon={coupon} id={parseInt(id!)} />
                    </CardContent>
                </Card>
            )}

        </div>
    )
}