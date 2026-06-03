import {z} from "zod";

export const jwtTokenSchema = z.object({
    token: z.string()
})

export const userLoginSchema = z.object({
    username: z.string().min(1, { message: "Username is required" }),
    password: z.string().min(1, { message: "Password is required" }),
})

export type UserLoginDTO = z.infer<typeof userLoginSchema>

export const jwtPayloadSchema = z.object({
    nameid: z.string(),
    unique_name: z.string().min(1),
    email: z.string().min(1),
    role: z.string().min(1),
    uuid: z.string().min(1),
    exp: z.number().int()
})

export type UserPayload = z.infer<typeof jwtPayloadSchema>