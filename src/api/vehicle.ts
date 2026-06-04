import type {VehicleCreateDTO, VehicleReadOnlyDTO} from "@/schemas/vehicle.ts";
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