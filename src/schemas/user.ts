import { z } from "zod"

export const customerReadOnlySchema = z.object({
    uuid: z.string().uuid(),
    username: z.string(),
    email: z.string(),
    firstname: z.string(),
    lastname: z.string(),
    roleName: z.string(),
    isDeleted: z.boolean(),
    driverLicense: z.string(),
    dateOfBirth: z.string(),
})

export const employeeReadOnlySchema = z.object({
    uuid: z.string().uuid(),
    username: z.string(),
    email: z.string(),
    firstname: z.string(),
    lastname: z.string(),
    roleName: z.string(),
    isDeleted: z.boolean(),
    phoneNumber: z.string(),
})

export type CustomerReadOnlyDTO = z.infer<typeof customerReadOnlySchema>
export type EmployeeReadOnlyDTO = z.infer<typeof employeeReadOnlySchema>