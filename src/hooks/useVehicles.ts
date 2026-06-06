import {useEffect, useState} from "react";
import type {VehicleFilters, VehicleReadOnlyDTO} from "@/schemas/vehicle.ts";
import {getVehicles} from "@/api/vehicle.ts";
import {useAuth} from "@/context/AuthProvider.tsx";

export const useVehicles = () => {
    const { user } = useAuth()
    const [vehicles, setVehicles] = useState<VehicleReadOnlyDTO[]>([])
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [filters, setFilters] = useState<VehicleFilters>({})


    useEffect(() => {
        const fetch = async () => {
            setLoading(true)
            setError(null)
            try {
                const result = await getVehicles(user!.token, { ...filters, pageNumber: page })
                setVehicles(result.data)
                setTotalPages(result.totalPages)
            } catch (e) {
                setError(e instanceof Error ? e.message : "Something went wrong")
            } finally {
                setLoading(false)
            }
        }
        fetch()
    }, [page, filters])

    return {
        vehicles,
        isLoading,
        error,
        page,
        setPage,
        totalPages,
        filters,
        setFilters
    }
}