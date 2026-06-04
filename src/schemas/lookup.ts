import {z} from "zod";

export const categorySchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().nullable().optional(),
})

export type CategoryReadOnlyDTO = z.infer<typeof categorySchema>