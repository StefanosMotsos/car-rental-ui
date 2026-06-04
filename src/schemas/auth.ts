import {z} from "zod";

export const jwtTokenSchema = z.object({
    token: z.string()
})

export type JwtTokenDTO = z.infer<typeof jwtTokenSchema>

export const userLoginSchema = z.object({
    username: z.string().min(1, { message: "Username is required" }),
    password: z.string().min(1, { message: "Password is required" }),
})

export type UserLoginDTO = z.infer<typeof userLoginSchema>

export const jwtPayloadSchema = z.object({
    nameid: z.string(),
    unique_name: z.string().min(1),
    email: z.string().min(1),
    role: z.enum(["CUSTOMER", "EMPLOYEE", "ADMIN"]),
    uuid: z.string().min(1),
    exp: z.number().int()
})

export type UserPayload = z.infer<typeof jwtPayloadSchema>



const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?\W).{8,}$/

const baseSignupSchema = z.object({
    username: z.string()
        .min(2, { message: "Username must be at least 2 characters" })
        .max(50, { message: "Username must be at most 50 characters" }),
    email: z.string()
        .email({ message: "Invalid email address" })
        .max(50, { message: "Email must be at most 50 characters" }),
    password: z.string()
        .regex(passwordRegex, { message: "Password must be at least 8 characters and include uppercase, lowercase, number, and special character" }),
    firstname: z.string()
        .min(2, { message: "First name must be at least 2 characters" })
        .max(50, { message: "First name must be at most 50 characters" }),
    lastname: z.string()
        .min(2, { message: "Last name must be at least 2 characters" })
        .max(50, { message: "Last name must be at most 50 characters" }),
})

export const customerSignupSchema = baseSignupSchema.extend({
    dateOfBirth: z.string()
        .min(1, { message: "Date of birth is required" }),
    driverLicense: z.string()
        .min(5, { message: "Driver license must be at least 5 characters" })
        .max(20, { message: "Driver license must be at most 20 characters" }),
})

export const employeeSignupSchema = baseSignupSchema.extend({
    phoneNumber: z.string()
        .min(10, { message: "Phone number must be at least 10 characters" })
        .max(20, { message: "Phone number must be at most 20 characters" }),
})

export type CustomerSignupDTO = z.infer<typeof customerSignupSchema>
export type EmployeeSignupDTO = z.infer<typeof employeeSignupSchema>