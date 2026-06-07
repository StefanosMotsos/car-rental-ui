import type {
    PaginatedRental,
    RentalCreateDTO,
    RentalFilters,
    RentalReadOnlyDTO,
    RentalUpdateDTO
} from "@/schemas/rental.ts";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export async function createRental(
    fields: RentalCreateDTO,
    token: string
): Promise<RentalReadOnlyDTO> {

    try {
        const res = await axios.post(API_URL + "/rentals", fields, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
        return res.data
    } catch (error) {
        let detail = "Rental Creation Failed"
        if (axios.isAxiosError(error)) {
            const data = error.response?.data
            if (typeof data?.detail === "string") detail = data.detail
        }
        throw new Error(detail, { cause: error })
    }
}

export async function getRentals(
    token: string,
    filters?: RentalFilters
) : Promise<PaginatedRental> {

    try {
        const res = await axios.get(API_URL + "/rentals/", {
            headers: {
                "Authorization": `Bearer ${token}`},
                params: filters
        })
        return res.data
    } catch (error) {
        let detail = "Failed to fetch Rentals"
        if (axios.isAxiosError(error)) {
            const data = error.response?.data
            if (typeof data?.detail === "string") detail = data.detail
        }
        throw new Error(detail, { cause: error })
    }
}

export async function getRentalHistory(
    token: string,
    filters?: RentalFilters
) : Promise<PaginatedRental> {

    try {
        const res = await axios.get(API_URL + "/rentals/rental-history", {
            headers: {
                "Authorization": `Bearer ${token}`},
            params: filters
        })
        return res.data
    } catch (error) {
        let detail = "Failed to fetch Rentals"
        if (axios.isAxiosError(error)) {
            const data = error.response?.data
            if (typeof data?.detail === "string") detail = data.detail
        }
        throw new Error(detail, { cause: error })
    }
}

export async function updateRental (
    token: string,
    fields: RentalUpdateDTO,
    uuid: string
) : Promise<RentalReadOnlyDTO> {

    try {
        const res = await axios.patch(`${API_URL}/rentals/${uuid}`, fields, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        return res.data
    } catch (error) {
        let detail = "Update Failed"
        if (axios.isAxiosError(error)) {
            const data = error.response?.data
            if (typeof data?.detail === "string") detail = data.detail
        }
        throw new Error(detail, { cause: error })
    }
}