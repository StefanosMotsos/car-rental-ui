import type {
    PaginatedVehicle,
    VehicleCreateDTO,
    VehicleFilters,
    VehicleReadOnlyDTO,
    VehicleUpdateDTO
} from "@/schemas/vehicle.ts";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL

export async function addVehicle(fields: VehicleCreateDTO, token: string) : Promise<VehicleReadOnlyDTO> {
    try {
        const res = await axios.post(API_URL + "/vehicles", fields, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        return res.data
    } catch (error) {
        let detail = "Register Failed"
        if (axios.isAxiosError(error)) {
            const data = error.response?.data
            if (typeof data?.detail === "string") detail = data.detail
        }
        throw new Error(detail, { cause: error })
    }
}

export async function addPhoto(uuid: string, file: File, token: string): Promise<void> {
    try {
        const formData = new FormData();
        formData.append("photo", file)
        await axios.post(API_URL + `/vehicles/${uuid}/photo`, formData, {
            headers: {"Authorization": `Bearer ${token}`}
        })
    } catch (error) {
        let detail = "Photo Upload Failed"
        if (axios.isAxiosError(error)) {
            const data = error.response?.data
            if (typeof data?.detail === "string") detail = data.detail
        }
        throw new Error(detail, { cause: error })
    }
}

export async function getVehicle(uuid: string, token: string): Promise<VehicleReadOnlyDTO> {
    try {
        const res = await axios.get(`${API_URL}/vehicles/${uuid}`, {
            headers: { "Authorization": `Bearer ${token}` }
        })
        return res.data
    } catch (error) {
        let detail = "Failed to fetch Vehicle"
        if (axios.isAxiosError(error)) {
            const data = error.response?.data
            if (typeof data?.detail === "string") detail = data.detail
        }
        throw new Error(detail, { cause: error })
    }
}

export async function getVehicles(token: string, filters?: VehicleFilters) : Promise<PaginatedVehicle> {
    try {
        const res = await axios.get(`${API_URL}/vehicles/`, {
            headers: {"Authorization": `Bearer ${token}` },
            params: filters
        })
        return res.data
    } catch (error) {
        let detail = "Failed to fetch Vehicles"
        if (axios.isAxiosError(error)) {
            const data = error.response?.data
            if (typeof data?.detail === "string") detail = data.detail
        }
        throw new Error(detail, { cause: error })
    }
}

export async function updateVehicle(uuid: string, fields: VehicleUpdateDTO, token: string): Promise<VehicleReadOnlyDTO> {
    try {
        const res = await axios.put(`${API_URL}/vehicles/${uuid}`, fields, {
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

export async function deleteVehicle(uuid: string, token: string): Promise<void> {
    try {
        await axios.delete(`${API_URL}/vehicles/${uuid}`, {
            headers: { "Authorization": `Bearer ${token}` }
        })
    } catch (error) {
        let detail = "Failed to delete vehicle"
        if (axios.isAxiosError(error)) {
            const data = error.response?.data
            if (typeof data?.detail === "string") detail = data.detail
        }
        throw new Error(detail, { cause: error })
    }
}