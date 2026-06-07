import {useAuth} from "@/context/AuthProvider.tsx";
import {useEffect, useState} from "react";
import type {CustomerReadOnlyDTO, EmployeeReadOnlyDTO, UserManagementFilters, UserReadOnlyDTO} from "@/schemas/user.ts";
import {getCustomers, getEmployees, getUsers} from "@/api/user.ts";

export const useUsers = (activeTab: "customers" | "employees" | "users") => {
    const { user } = useAuth()
    const [data, setData] = useState<CustomerReadOnlyDTO[] | EmployeeReadOnlyDTO[] | UserReadOnlyDTO[]>([])
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [filters, setFilters] = useState<UserManagementFilters>({})

    useEffect(() => {
        const fetch = async () => {
            setLoading(true)
            setError(null)
            try {
                const params = { ...filters, pageNumber: page }
                const result =
                    activeTab === "customers" ? await getCustomers(user!.token, params) :
                        activeTab === "employees" ? await getEmployees(user!.token, params) :
                            await getUsers(user!.token, params)
                setData(result.data)
                setTotalPages(result.totalPages)
            } catch (e) {
                setError(e instanceof Error ? e.message : "Something went wrong")
            } finally {
                setLoading(false)
            }
        }
        fetch()
    }, [page, filters, activeTab])

    return { data, isLoading, error, page, setPage, totalPages, filters, setFilters }
}