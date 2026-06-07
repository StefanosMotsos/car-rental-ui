import axios from "axios";
import type {
    CustomerReadOnlyDTO,
    EmployeeReadOnlyDTO, PaginatedCustomer, PaginatedEmployee,
    PaginatedUser, UserManagementFilters
} from "@/schemas/user.ts";
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

export async function deleteCustomer(uuid: string, token: string): Promise<void> {
    try {
        await axios.delete(`${API_URL}/customers/${uuid}`, {
            headers: { "Authorization": `Bearer ${token}` }
        })
    } catch (error) {
        let detail = "Failed to delete customer"
        if (axios.isAxiosError(error)) {
            const data = error.response?.data
            if (typeof data?.detail === "string") detail = data.detail
        }
        throw new Error(detail, { cause: error })
    }
}

export async function deleteEmployee(uuid: string, token: string): Promise<void> {
    try {
        await axios.delete(`${API_URL}/employees/${uuid}`, {
            headers: { "Authorization": `Bearer ${token}` }
        })
    } catch (error) {
        let detail = "Failed to delete employee"
        if (axios.isAxiosError(error)) {
            const data = error.response?.data
            if (typeof data?.detail === "string") detail = data.detail
        }
        throw new Error(detail, { cause: error })
    }
}

export async function getUsers(
    token: string,
    filters?: UserManagementFilters
) : Promise<PaginatedUser> {

    try {
        const res = await axios.get(API_URL + "/users/", {
            headers: {
                "Authorization": `Bearer ${token}`},
            params: filters
        })
        return res.data
    } catch (error) {
        let detail = "Failed to fetch Users"
        if (axios.isAxiosError(error)) {
            const data = error.response?.data
            if (typeof data?.detail === "string") detail = data.detail
        }
        throw new Error(detail, { cause: error })
    }
}

export async function getCustomers(
    token: string,
    filters?: UserManagementFilters
) : Promise<PaginatedCustomer> {

    try {
        const res = await axios.get(API_URL + "/customers/", {
            headers: {
                "Authorization": `Bearer ${token}`},
            params: filters
        })
        return res.data
    } catch (error) {
        let detail = "Failed to fetch Customers"
        if (axios.isAxiosError(error)) {
            const data = error.response?.data
            if (typeof data?.detail === "string") detail = data.detail
        }
        throw new Error(detail, { cause: error })
    }
}

export async function getEmployees(
    token: string,
    filters?: UserManagementFilters
) : Promise<PaginatedEmployee> {

    try {
        const res = await axios.get(API_URL + "/employees/", {
            headers: {
                "Authorization": `Bearer ${token}`},
            params: filters
        })
        return res.data
    } catch (error) {
        let detail = "Failed to fetch Employees"
        if (axios.isAxiosError(error)) {
            const data = error.response?.data
            if (typeof data?.detail === "string") detail = data.detail
        }
        throw new Error(detail, { cause: error })
    }
}

