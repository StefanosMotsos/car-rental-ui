import { z } from "zod"

export const rentalCreateSchema = z.object({
    vehicleUuid: z.string().uuid(),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
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