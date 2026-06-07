import {useAuth} from "@/context/AuthProvider.tsx";
import {useEffect, useState} from "react";
import type {RentalFilters, RentalReadOnlyDTO} from "@/schemas/rental.ts";
import {getRentalHistory, getRentals} from "@/api/rental.ts";

export const useRentals = () => {
    const { user } = useAuth()
    const [rentals, setRentals] = useState<RentalReadOnlyDTO[]>([])
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [filters, setFilters] = useState<RentalFilters>()
    const refetch = () => setFilters(f => ({ ...f }))

    useEffect(() => {
        const fetch = async () => {
            setLoading(true)
            setError(null)
            try {
                const result = user?.role === "CUSTOMER"
                    ? await getRentalHistory(user!.token, { ...filters, pageNumber: page })
                    : await getRentals(user!.token, { ...filters, pageNumber: page })
                setRentals(result.data)
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
        rentals,
        isLoading,
        error,
        page,
        setPage,
        totalPages,
        setFilters,
        refetch,
    }
}