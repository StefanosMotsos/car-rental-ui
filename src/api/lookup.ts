import type {CategoryReadOnlyDTO} from "@/schemas/lookup.ts";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL

export async function getCategories(token: string) : Promise<CategoryReadOnlyDTO[]> {
    try {
        const res = await axios.get(API_URL + "/lookup/categories", {
            headers: {"Authorization": `Bearer ${token}`}
        })
        return res.data
    } catch (error) {
        let detail = "Failed to fetch categories"
        if (axios.isAxiosError(error)) {
            const data = error.response?.data
            if (typeof data?.detail === "string") detail = data.detail
        }
        throw new Error(detail, { cause: error })
    }
}