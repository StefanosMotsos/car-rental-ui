import type {CustomerSignupDTO, EmployeeSignupDTO, JwtTokenDTO, UserLoginDTO} from "../schemas/auth.ts";
import axios from "axios";
import type {CustomerReadOnlyDTO, EmployeeReadOnlyDTO} from "@/schemas/user.ts";

const API_URL = import.meta.env.VITE_API_URL;

export async function login(
    fields: UserLoginDTO): Promise<JwtTokenDTO> {
    try {
        const res = await axios.post(API_URL + "/auth/login", fields, {
            headers: { "Content-Type": "application/json" },
        })
        return res.data
    } catch (error) {
        let detail = "Login Failed"
        if (axios.isAxiosError(error)) {
            const data = error.response?.data
            if (typeof data?.detail === "string") detail = data.detail
        }
        throw new Error(detail, { cause: error })
    }
}

export async function registerCustomer(
    fields: CustomerSignupDTO): Promise<CustomerReadOnlyDTO> {

    try {
        const res = await axios.post(API_URL + "/auth/register", fields, {
            headers: { "Content-Type": "application/json" },
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

export async function registerEmployee(
    fields: EmployeeSignupDTO,
    token: string
): Promise<EmployeeReadOnlyDTO> {

    try {
        const res = await axios.post(API_URL + "/auth/register/employee", fields, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
        return res.data
    } catch (error) {
        let detail = "Employee register Failed"
        if (axios.isAxiosError(error)) {
            const data = error.response?.data
            if (typeof data?.detail === "string") detail = data.detail
        }
        throw new Error(detail, { cause: error })
    }
}