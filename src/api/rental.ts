import type {RentalCreateDTO, RentalReadOnlyDTO} from "@/schemas/rental.ts";
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