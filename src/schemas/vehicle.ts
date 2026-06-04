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