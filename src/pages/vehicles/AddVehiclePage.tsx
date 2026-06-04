import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useAuth} from "@/context/AuthProvider.tsx";
import {useEffect, useState} from "react";
import {Field, FieldError, FieldLabel} from "@/components/ui/field.tsx";
import {Button} from "@/components/ui/button.tsx";
import {createVehicleSchema, TIER_TYPES, type VehicleCreateDTO} from "@/schemas/vehicle.ts";
import {addVehicle} from "@/api/vehicle.ts";
import type {CategoryReadOnlyDTO} from "@/schemas/lookup.ts";
import {getCategories} from "@/api/lookup.ts";
import {useNavigate} from "react-router-dom";

const AddVehiclePage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<VehicleCreateDTO>({
        resolver: zodResolver(createVehicleSchema) as any
    })

    const { user } = useAuth();
    const navigate = useNavigate();
    const [apiError, setApiError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [categories, setCategories] = useState<CategoryReadOnlyDTO[]>([]);

    const onSubmit = async (data: VehicleCreateDTO) => {
        setIsLoading(true);
        setApiError(null);
        try {
            const vehicle = await addVehicle(data, user!.token);
            navigate(`/add/vehicle/${vehicle.uuid}/photo`, {
                state: { make: data.make, model: data.model, licensePlate: data.licensePlate }
            })
        } catch (error) {
            setApiError(error instanceof Error ? error.message : "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        const fetchCategories = async () => {
            setApiError(null);
            try {
                setCategories(await getCategories(user!.token));
            } catch (error) {
                setApiError(error instanceof Error ? error.message : "Something went wrong")
            }
        }
        fetchCategories();
    }, [])

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="min-h-screen flex items-center justify-center py-30"
            >
                <div className="flex flex-col border border-zinc-700 rounded-xl bg-zinc-800 px-8 pt-14 pb-10 mt-20 gap-8 w-full max-w-xl">
                    <h1 className="text-zinc-300 text-2xl font-bold">Add Vehicle</h1>
                    {apiError && (
                        <div className="text-sm text-red-400 bg-red-950 border border-red-900 rounded-md px-3 py-2">
                            {apiError}
                        </div>
                    )}
                    <div className="flex gap-4 items-center justify-center">
                        <Field className="w-full">
                            <FieldLabel className="text-zinc-400 text-xs tracking-widest">MAKE</FieldLabel>
                            <input {...register("make")} className="bg-zinc-900 border border-zinc-600 rounded-md px-3 py-2 text-zinc-100 text-sm outline-none w-full" />
                            {errors.make && (
                                <FieldError className="text-xs text-red-400">{errors.make.message}</FieldError>
                            )}
                        </Field>
                        <Field className="w-full">
                            <FieldLabel className="text-zinc-400 text-xs tracking-widest">MODEL</FieldLabel>
                            <input {...register("model")} className="bg-zinc-900 border border-zinc-600 rounded-md px-3 py-2 text-zinc-100 text-sm outline-none w-full" />
                            {errors.model && (
                                <FieldError className="text-xs text-red-400">{errors.model.message}</FieldError>
                            )}
                        </Field>
                    </div>
                    <div className="flex gap-4 items-center justify-center">
                        <Field className="w-full">
                            <FieldLabel className="text-zinc-400 text-xs tracking-widest">YEAR</FieldLabel>
                            <input type="number" {...register("year")} className="bg-zinc-900 border border-zinc-600 rounded-md px-3 py-2 text-zinc-100 text-sm outline-none w-full" />
                            {errors.year && (
                                <FieldError className="text-xs text-red-400">{errors.year.message}</FieldError>
                            )}
                        </Field>
                        <Field className="w-full">
                            <FieldLabel className="text-zinc-400 text-xs tracking-widest">LICENSE PLATE</FieldLabel>
                            <input {...register("licensePlate")} className="bg-zinc-900 border border-zinc-600 rounded-md px-3 py-2 text-zinc-100 text-sm outline-none w-full" />
                            {errors.licensePlate && (
                                <FieldError className="text-xs text-red-400">{errors.licensePlate.message}</FieldError>
                            )}
                        </Field>
                    </div>
                    <div className="flex gap-4 items-center justify-center">
                        <Field className="w-full">
                            <FieldLabel className="text-zinc-400 text-xs tracking-widest">DAILY RATE (€)</FieldLabel>
                            <input type="number" step="0.01" {...register("dailyRate")} className="bg-zinc-900 border border-zinc-600 rounded-md px-3 py-2 text-zinc-100 text-sm outline-none w-full" />
                            {errors.dailyRate && (
                                <FieldError className="text-xs text-red-400">{errors.dailyRate.message}</FieldError>
                            )}
                        </Field>
                        <Field className="w-full">
                            <FieldLabel className="text-zinc-400 text-xs tracking-widest">TIER TYPE</FieldLabel>
                            <select
                                {...register("tierType")}
                                defaultValue=""
                                className="bg-zinc-900 border border-zinc-600 rounded-md px-3 py-2 text-zinc-100 text-sm outline-none w-full"
                            >
                                <option value="" disabled>Select Tier:</option>
                                {TIER_TYPES.map(t => (
                                    <option key={t} value={t}>{t}</option>
                                ))}
                            </select>
                            {errors.tierType && (
                                <FieldError className="text-xs text-red-400">{errors.tierType.message}</FieldError>
                            )}
                        </Field>
                    </div>
                    <Field className="w-full">
                        <FieldLabel className="text-zinc-400 text-xs tracking-widest">CATEGORY</FieldLabel>
                        <select
                            {...register("categoryId")}
                            defaultValue=""
                            className="bg-zinc-900 border border-zinc-600 rounded-md px-3 py-2 text-zinc-100 text-sm outline-none w-full"
                        >
                            <option value="" disabled>Select Category:</option>
                            {categories.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                        {errors.categoryId && (
                            <FieldError className="text-xs text-red-400">{errors.categoryId.message}</FieldError>
                        )}
                    </Field>
                    <Button disabled={isLoading} className="mt-3 py-5 bg-navy-light">
                        {isLoading ? "Adding..." : "Add Vehicle"}
                    </Button>
                </div>
            </form>
        </>
    )
}

export default AddVehiclePage