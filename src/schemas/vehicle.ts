import { z } from "zod"

export const createVehicleSchema = z.object({
    make: z.string()
        .min(2, "Min 2 characters")
        .max(50),
    model: z.string()
        .min(2, "Min 2 characters")
        .max(50),
    year: z.coerce
        .number({ error: "Year is required" })
        .int()
        .min(1900)
        .max(2038),
    licensePlate: z.string()
        .min(2, "Min 2 characters")
        .max(20),
    dailyRate: z.coerce
        .number({ error: "Daily rate is required" })
        .min(1)
        .max(9999.99),
    tierType: z
        .enum(["Economy", "Standard", "Luxury", "VIP"] as const,
        {error: "Select a tier type",}),
    categoryId: z.coerce
        .number({ error: "Select a category" })
        .int()
        .min(1, "Select a category"),
})

export type VehicleCreateDTO = z.infer<typeof createVehicleSchema>
export const TIER_TYPES = ["Economy", "Standard", "Luxury", "VIP"] as const

export const updateVehicleSchema = createVehicleSchema.extend({
    status: z.enum(["Available", "Rented", "Maintenance"], { error: "Select a status" })
})
export type VehicleUpdateDTO = z.infer<typeof updateVehicleSchema>

export const vehicleSchema = z.object({
    uuid: z.string().uuid(),
    make: z.string(),
    model: z.string(),
    year: z.number(),
    licensePlate: z.string(),
    dailyRate: z.number(),
    tierType: z.enum(["Economy", "Standard", "Luxury", "VIP"]),
    status: z.enum(["Available", "Rented", "Maintenance"]),
    categoryId: z.number(),
    categoryName: z.string(),
    photoUrl: z.string().nullable().optional(),
})

export type VehicleReadOnlyDTO = z.infer<typeof vehicleSchema>

export const paginatedVehicleSchema = z.object({
    data: z.array(vehicleSchema),
    totalRecords: z.number(),
    pageNumber: z.number(),
    pageSize: z.number(),
    totalPages: z.number(),
})

export type PaginatedVehicle = z.infer<typeof paginatedVehicleSchema>

export const vehicleFiltersSchema = z.object({
    search: z.string().optional(),
    licensePlate: z.string().optional(),
    make: z.string().optional(),
    model: z.string().optional(),
    minYear: z.number().optional(),
    maxYear: z.number().optional(),
    minDailyRate: z.number().optional(),
    maxDailyRate: z.number().optional(),
    status: z.enum(["Available", "Rented", "Maintenance"]).optional(),
    tierType: z.enum(["Economy", "Standard", "Luxury", "VIP"]).optional(),
    categoryId: z.number().optional(),
    pageNumber: z.number().optional(),
    pageSize: z.number().optional(),
})

export type VehicleFilters = z.infer<typeof vehicleFiltersSchema>