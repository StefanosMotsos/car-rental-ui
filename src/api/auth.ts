import type {JwtTokenDTO, UserLoginDTO} from "../schemas/auth.ts";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export async function login({
    username,
    password,
}: UserLoginDTO): Promise<JwtTokenDTO> {
    const form = new URLSearchParams()
    form.append("username", username)
    form.append("password", password)

    try {
        const res = await axios.post(API_URL + "/auth/login", form, {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
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