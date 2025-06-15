import { useNavigate } from "react-router-dom"
import { useGet } from "../hooks/useCoupons"
import { useEffect, useState } from "react"
import { CouponsResponseDto } from "../types/coupons.types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Tags } from "lucide-react"
import { ProtectedComponent } from "@/shared/components/ProtectedComponent"
import { Button } from "@/components/ui/button"
import CouponsTable from "./CouponsTable"

export default function CouponsPage() {
    const navigate = useNavigate()
    const { getCoupons, loading, error } = useGet()
    const [data, setData] = useState<CouponsResponseDto[]>()

    const fetchData = async () => {
        const res = await getCoupons()
        if (res && res.isSuccess && res.result) {
            setData(res.result)
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    if (loading) {
        return (
            <div>loading...</div>
        )
    }

    if (error || !data) {
        return (
            <div>There was a problem: {error}</div>
        )
    }

    return (
        <div>

            <Card className="">
                <CardHeader>
                    <CardTitle>
                        <Tags />
                        Coupons
                    </CardTitle>    
                    <CardDescription>
                        Manage and create new coupons below.
                    </CardDescription>
                    <ProtectedComponent allowedRoles={["ADMINISTRADOR"]}>
                        <div className="flex justify-end">
                            <Button
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => navigate('/coupon/form')}
                            >
                                <Plus />
                                Add Coupon
                            </Button>
                        </div>
                    </ProtectedComponent>
                </CardHeader>
                <CardContent>
                    <CouponsTable coupons={data}/>
                </CardContent>
            </Card>
            
        </div>

    )

}