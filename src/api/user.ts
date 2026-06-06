import axios from "axios";
import type {CustomerReadOnlyDTO, EmployeeReadOnlyDTO} from "@/schemas/user.ts";
import type {CustomerUpdateDTO, EmployeeUpdateDTO} from "@/schemas/auth.ts";

const API_URL = import.meta.env.VITE_API_URL

export async function getCustomer(token: string): Promise<CustomerReadOnlyDTO> {
    try {
        const res = await axios.get(`${API_URL}/customers/me`, {
            headers: { "Authorization": `Bearer ${token}` }
        })
        return res.data
    } catch (error) {
        let detail = "Failed to fetch customer"
        if (axios.isAxiosError(error)) {
            const data = error.response?.data
            if (typeof data?.detail === "string") detail = data.detail
        }
        throw new Error(detail, { cause: error })
    }
}

export async function updateCustomer(
    fields: CustomerUpdateDTO,
    token: string
): Promise<CustomerReadOnlyDTO> {
    try {
        const res = await axios.put(`${API_URL}/customers/me`, fields, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
        return res.data
    } catch (error) {
        let detail = "Update failed"
        if (axios.isAxiosError(error)) {
            const data = error.response?.data
            if (typeof data?.detail === "string") detail = data.detail
        }
        throw new Error(detail, { cause: error })
    }
}

export async function getEmployee(token: string, uuid: string): Promise<EmployeeReadOnlyDTO> {
    try {
        const res = await axios.get(`${API_URL}/employees/${uuid}`, {
            headers: { "Authorization": `Bearer ${token}` }
        })
        return res.data
    } catch (error) {
        let detail = "Failed to fetch employee"
        if (axios.isAxiosError(error)) {
            const data = error.response?.data
            if (typeof data?.detail === "string") detail = data.detail
        }
        throw new Error(detail, { cause: error })
    }
}

export async function updateEmployee(
    fields: EmployeeUpdateDTO,
    uuid: string,
    token: string
): Promise<EmployeeReadOnlyDTO> {
    try {
        const res = await axios.put(`${API_URL}/employees/${uuid}`, fields, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
        return res.data
    } catch (error) {
        let detail = "Update failed"
        if (axios.isAxiosError(error)) {
            const data = error.response?.data
            if (typeof data?.detail === "string") detail = data.detail
        }
        throw new Error(detail, { cause: error })
    }
}

