import {useForm} from "react-hook-form";
import {
    TIER_TYPES,
    updateVehicleSchema,
    type VehicleUpdateDTO
} from "@/schemas/vehicle.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {useAuth} from "@/context/AuthProvider.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import type {CategoryReadOnlyDTO} from "@/schemas/lookup.ts";
import {getVehicle, updateVehicle} from "@/api/vehicle.ts";
import {getCategories} from "@/api/lookup.ts";
import {Field, FieldError, FieldLabel} from "@/components/ui/field.tsx";
import {Button} from "@/components/ui/button.tsx";

const UpdateVehiclePage = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors},
    } = useForm<VehicleUpdateDTO>({
        resolver: zodResolver(updateVehicleSchema) as any
    })

    const {user} = useAuth();
    const { uuid } = useParams<{ uuid: string }>()
    const navigate = useNavigate();
    const [apiError, setApiError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [categories, setCategories] = useState<CategoryReadOnlyDTO[]>([]);

    const onSubmit = async (data: VehicleUpdateDTO) => {
        setIsLoading(true);
        setApiError(null);
        try {
            await updateVehicle(uuid! ,data, user!.token);
            navigate(`/employee/vehicles`)
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

        const fetchVehicle = async () => {
            try {
                const vehicle = await getVehicle(uuid!, user!.token)
                setValue("make", vehicle.make)
                setValue("model", vehicle.model)
                setValue("year", vehicle.year)
                setValue("licensePlate", vehicle.licensePlate)
                setValue("dailyRate", vehicle.dailyRate)
                setValue("tierType", vehicle.tierType)
                setValue("categoryId", vehicle.categoryId)
                setValue("status", vehicle.status)
            } catch (error) {
                setApiError(error instanceof Error ? error.message : "Something went wrong")
            }
        }
        fetchVehicle()
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="min-h-screen flex items-center justify-center py-30"
            >
                <div className="flex flex-col border border-zinc-700 rounded-xl bg-zinc-800 px-8 pt-14 pb-10 mt-20 gap-8 w-full max-w-xl">
                    <h1 className="text-zinc-300 text-2xl font-bold">Update Vehicle</h1>
                    {apiError && (
                        <div className="text-sm text-red-400 bg-red-950 border border-red-900 rounded-md px-3 py-2">
                            {apiError}
                        </div>
                    )}
                    <div className="flex gap-4 items-center justify-center">
                        <Field className="w-full">
                            <FieldLabel className="label-field">MAKE</FieldLabel>
                            <input {...register("make")} className="bg-zinc-900 border border-zinc-600 rounded-md px-3 py-2 text-zinc-100 text-sm outline-none w-full" />
                            {errors.make && (
                                <FieldError className="text-xs text-red-400">{errors.make.message}</FieldError>
                            )}
                        </Field>
                        <Field className="w-full">
                            <FieldLabel className="label-field">MODEL</FieldLabel>
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
                            <FieldLabel className="label-field">LICENSE PLATE</FieldLabel>
                            <input {...register("licensePlate")} className="bg-zinc-900 border border-zinc-600 rounded-md px-3 py-2 text-zinc-100 text-sm outline-none w-full" />
                            {errors.licensePlate && (
                                <FieldError className="text-xs text-red-400">{errors.licensePlate.message}</FieldError>
                            )}
                        </Field>
                    </div>
                    <div className="flex gap-4 items-center justify-center">
                        <Field className="w-full">
                            <FieldLabel className="label-field">DAILY RATE (€)</FieldLabel>
                            <input type="number" step="0.01" {...register("dailyRate")} className="bg-zinc-900 border border-zinc-600 rounded-md px-3 py-2 text-zinc-100 text-sm outline-none w-full" />
                            {errors.dailyRate && (
                                <FieldError className="text-xs text-red-400">{errors.dailyRate.message}</FieldError>
                            )}
                        </Field>
                        <Field className="w-full">
                            <FieldLabel className="label-field">TIER TYPE</FieldLabel>
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
                        <FieldLabel className="label-field">CATEGORY</FieldLabel>
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
                    <Field className="w-full">
                        <FieldLabel className="label-field">STATUS</FieldLabel>
                        <select
                            {...register("status")}
                            defaultValue=""
                            className="bg-zinc-900 border border-zinc-600 rounded-md px-3 py-2 text-zinc-100 text-sm outline-none w-full"
                        >
                            <option value="" disabled>Select Status:</option>
                            <option value="Available">Available</option>
                            <option value="Rented">Rented</option>
                            <option value="Maintenance">Maintenance</option>
                        </select>
                        {errors.status && (
                            <FieldError className="text-xs text-red-400">{errors.status.message}</FieldError>
                        )}
                    </Field>
                    <Button disabled={isLoading} className="mt-3 py-5 bg-navy-light">
                        {isLoading ? "Updating..." : "Update Vehicle"}
                    </Button>
                </div>
            </form>
        </>
    )

}

export default UpdateVehiclePage;