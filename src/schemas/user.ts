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

export const userReadOnlySchema = z.object({
    uuid: z.string().uuid(),
    username: z.string(),
    email: z.string(),
    firstname: z.string(),
    lastname: z.string(),
    roleName: z.string(),
    isDeleted: z.boolean(),
})

export type UserReadOnlyDTO = z.infer<typeof userReadOnlySchema>

export const paginatedCustomerSchema = z.object({
    data: z.array(customerReadOnlySchema),
    totalRecords: z.number(),
    pageNumber: z.number(),
    pageSize: z.number(),
    totalPages: z.number(),
})
export type PaginatedCustomer = z.infer<typeof paginatedCustomerSchema>

export const paginatedEmployeeSchema = z.object({
    data: z.array(employeeReadOnlySchema),
    totalRecords: z.number(),
    pageNumber: z.number(),
    pageSize: z.number(),
    totalPages: z.number(),
})
export type PaginatedEmployee = z.infer<typeof paginatedEmployeeSchema>

export const paginatedUserSchema = z.object({
    data: z.array(userReadOnlySchema),
    totalRecords: z.number(),
    pageNumber: z.number(),
    pageSize: z.number(),
    totalPages: z.number(),
})
export type PaginatedUser = z.infer<typeof paginatedUserSchema>

export const userManagementFiltersSchema = z.object({
    username: z.string().optional(),
    firstname: z.string().optional(),
    lastname: z.string().optional(),
    email: z.string().optional(),
    driverLicenceNumber: z.string().optional(),
    userRole: z.string().optional(),
    pageNumber: z.number().optional(),
    pageSize: z.number().optional(),
})
export type UserManagementFilters = z.infer<typeof userManagementFiltersSchema>