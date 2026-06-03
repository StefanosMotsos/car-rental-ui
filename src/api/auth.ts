import type {JwtTokenDTO, UserLoginDTO} from "../schemas/auth.ts";
import axios from "axios";

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