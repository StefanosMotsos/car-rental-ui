import { z } from "zod"

const today = new Date()
today.setHours(0, 0, 0, 0)
const maxDate = new Date()
maxDate.setFullYear(maxDate.getFullYear() + 2)

export const rentalCreateSchema = z.object({
    vehicleUuid: z.string().uuid(),
    startDate: z.string().min(1, "Start date is required").refine(val => {
        const date = new Date(val)
        return date >= today && date <= maxDate
    }, { message: "Start date must be today or later, within 2 years" }),
    endDate: z.string().min(1, "End date is required").refine(val => {
        const date = new Date(val)
        return date >= today && date <= maxDate
    }, { message: "End date must be today or later, within 2 years" }),
    pickupLocationId: z.number({ error: "Pickup location is required" }),
    dropoffLocationId: z.number({ error: "Dropoff location is required" }),
})

export const rentalReadOnlySchema = z.object({
    uuid: z.string().uuid(),
    startDate: z.string(),
    endDate: z.string(),
    totalCost: z.number().nullable().optional(),
    status: z.enum(["Pending", "Approved", "Rejected", "Returned"]),
    insertedAt: z.string(),
    customerUuid: z.string().uuid(),
    customerFirstname: z.string(),
    customerLastname: z.string(),
    employeeUuid: z.string().uuid().nullable().optional(),
    employeeFirstname: z.string().nullable().optional(),
    employeeLastname: z.string().nullable().optional(),
    vehicleUuid: z.string().uuid(),
    vehicleMake: z.string(),
    vehicleModel: z.string(),
    vehicleLicensePlate: z.string(),
    pickupLocationId: z.number(),
    pickupLocationName: z.string(),
    dropoffLocationId: z.number(),
    dropoffLocationName: z.string(),
})

export type RentalCreateDTO = z.infer<typeof rentalCreateSchema>
export type RentalReadOnlyDTO = z.infer<typeof rentalReadOnlySchema>

export const paginatedRentalSchema = z.object({
    data: z.array(rentalReadOnlySchema),
    totalRecords: z.number(),
    pageNumber: z.number(),
    pageSize: z.number(),
    totalPages: z.number(),
})

export type PaginatedRental = z.infer<typeof paginatedRentalSchema>

export const rentalFiltersSchema = z.object({
    status: z.enum(["Pending", "Approved", "Rejected", "Returned"]).optional(),
    customerName: z.string().optional(),
    employeeName: z.string().optional(),
    search: z.string().optional(),
    minTotalCost: z.number().optional(),
    maxTotalCost: z.number().optional(),
    pageNumber: z.number().optional(),
    pageSize: z.number().optional(),
})

export type RentalFilters = z.infer<typeof rentalFiltersSchema>

export const rentalUpdateSchema = z.object({
    status: z.enum(["Pending", "Approved", "Rejected", "Returned"]),
})

export type RentalUpdateDTO = z.infer<typeof rentalUpdateSchema>