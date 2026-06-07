import { Field, FieldError, FieldLabel } from "@/components/ui/field.tsx";
import type { VehicleReadOnlyDTO } from "@/schemas/vehicle.ts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/AuthProvider.tsx";
import { useEffect, useState } from "react";
import { type RentalCreateDTO, rentalCreateSchema } from "@/schemas/rental.ts";
import { createRental } from "@/api/rental.ts";
import { getLocations } from "@/api/lookup.ts";
import type { LocationReadOnlyDTO } from "@/schemas/lookup.ts";
import { Button } from "@/components/ui/button.tsx";

type RentalFormProps = {
    vehicle: VehicleReadOnlyDTO
}

const inputClass = "bg-zinc-800 border border-zinc-600 rounded-md px-3 py-2 text-zinc-100 text-sm outline-none w-full"

const RentalForm = ({ vehicle }: RentalFormProps) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RentalCreateDTO>({
        resolver: zodResolver(rentalCreateSchema),
        defaultValues: {
            vehicleUuid: vehicle.uuid
        }
    });

    const { user } = useAuth();
    const [apiError, setApiError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [locations, setLocations] = useState<LocationReadOnlyDTO[]>([]);

    useEffect(() => {
        const fetchLocations = async () => {
            setApiError(null);
            try {
                setLocations(await getLocations(user!.token));
            } catch (error) {
                setApiError(error instanceof Error ? error.message : "Something went wrong");
            }
        }
        fetchLocations();
    }, [])

    const onSubmit = async (data: RentalCreateDTO) => {
        setIsLoading(true);
        setApiError(null);
        try {
            await createRental(data, user!.token);
            setSuccess(true);
        } catch (error) {
            setApiError(error instanceof Error ? error.message : "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            {success ? (
                <div className="text-sm text-green-400 bg-green-950 border border-green-900 rounded-md px-3 py-2">
                    Rental submitted successfully
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    <span className="text-zinc-400 text-sm">{vehicle.make} {vehicle.model} · <span className="text-blue-400">${vehicle.dailyRate}/day</span></span>
                    <hr className="border-zinc-700 w-full" />
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                        {apiError && (
                            <div className="text-sm text-red-400 bg-red-950 border border-red-900 rounded-md px-3 py-2">
                                {apiError}
                            </div>
                        )}
                        <div className="flex gap-4">
                            <Field className="w-full">
                                <FieldLabel className="label-field">START DATE</FieldLabel>
                                <input type="date" {...register("startDate")} className={inputClass} />
                                {errors.startDate && (
                                    <FieldError className="text-xs text-red-400">{errors.startDate.message}</FieldError>
                                )}
                            </Field>
                            <Field className="w-full">
                                <FieldLabel className="label-field">END DATE</FieldLabel>
                                <input type="date" {...register("endDate")} className={inputClass} />
                                {errors.endDate && (
                                    <FieldError className="text-xs text-red-400">{errors.endDate.message}</FieldError>
                                )}
                            </Field>
                        </div>
                        <Field className="w-full">
                            <FieldLabel className="label-field">PICK-UP LOCATION</FieldLabel>
                            <select
                                {...register("pickupLocationId", { valueAsNumber: true })}
                                defaultValue=""
                                className={inputClass}>
                                <option value="" disabled>Select location</option>
                                {locations.map(l => (
                                    <option key={l.id} value={l.id}>{l.name}</option>
                                ))}
                            </select>
                            {errors.pickupLocationId && (
                                <FieldError className="text-xs text-red-400">{errors.pickupLocationId.message}</FieldError>
                            )}
                        </Field>
                        <Field className="w-full">
                            <FieldLabel className="label-field">DROP-OFF LOCATION</FieldLabel>
                            <select
                                {...register("dropoffLocationId", { valueAsNumber: true })}
                                defaultValue=""
                                className={inputClass}>
                                <option value="" disabled>Select location</option>
                                {locations.map(l => (
                                    <option key={l.id} value={l.id}>{l.name}</option>
                                ))}
                            </select>
                            {errors.dropoffLocationId && (
                                <FieldError className="text-xs text-red-400">{errors.dropoffLocationId.message}</FieldError>
                            )}
                        </Field>
                        <Button disabled={isLoading} className="mt-1 py-5 bg-navy-light hover:bg-navy w-full">
                            {isLoading ? "Submitting..." : "Confirm Rental"}
                        </Button>
                    </form>
                </div>
            )}
        </>
    )
}

export default RentalForm