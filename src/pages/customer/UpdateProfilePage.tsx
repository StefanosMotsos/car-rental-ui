import {useForm} from "react-hook-form";
import {
    type CustomerUpdateDTO,
    customerUpdateSchema
} from "@/schemas/auth.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect, useState} from "react";
import {Field, FieldError, FieldLabel} from "@/components/ui/field.tsx";
import PasswordInput from "@/components/ui/PasswordInput.tsx";
import {Button} from "@/components/ui/button.tsx";
import {getCustomer, updateCustomer} from "@/api/user.ts";
import {useAuth} from "@/context/AuthProvider.tsx";
import {Link} from "react-router-dom";

const UpdateProfilePage = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<CustomerUpdateDTO>({
        resolver: zodResolver(customerUpdateSchema)
    });

    const { user } = useAuth();
    const [apiError, setApiError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState<boolean>(false);

    useEffect(() => {
        const fetch = async () => {

            try {
                const response = await getCustomer(user!.token);
                setValue("firstname", response.firstname)
                setValue("lastname", response.lastname)
                setValue("username", response.username)
                setValue("email", response.email)
                setValue("dateOfBirth", response.dateOfBirth)
                setValue("driverLicense", response.driverLicense)
            } catch (error) {
                setApiError(error instanceof Error ? error.message : "Something went wrong")
            }
        }
        fetch()
    }, [])

    const onSubmit = async (data: CustomerUpdateDTO) => {
        setIsLoading(true);
        setApiError(null);
        try {
            await updateCustomer(data, user!.token);
            setSuccess(true);
            window.scrollTo(0, 0)
        } catch (error) {
            setApiError(error instanceof Error ? error.message : "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            {success ? (
                <div className="min-h-screen flex items-center justify-center">
                    <div className="flex flex-col border border-zinc-700 rounded-xl bg-zinc-800 px-8 py-14 gap-6 w-full max-w-xl text-center">
                        <h1 className="text-zinc-300 text-2xl font-bold">{user!.username} was updated successfully</h1>
                        <div className="flex gap-4 justify-center">
                            <Link to="/customer/vehicles" className="text-blue-400 hover:text-blue-300 text-sm">View Vehicles</Link>
                            <Link to="/customer/rentals" className="text-blue-400 hover:text-blue-300 text-sm">View Rentals</Link>
                        </div>
                    </div>
                </div>
            ) : (
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="min-h-screen flex items-center justify-center py-30"
                >
                    <div className="flex flex-col border border-zinc-700 rounded-xl bg-zinc-800 px-8 pt-14 pb-10 mt-20 gap-8 w-full max-w-xl">
                        <h1 className="text-zinc-300 text-2xl font-bold">Update your Account</h1>
                        {apiError && (
                            <div className="text-sm text-red-400 bg-red-950 border border-red-900 rounded-md px-3 py-2">
                                {apiError}
                            </div>
                        )}
                        <div className="flex gap-4 items-center justify-center">
                            <Field className="w-full">
                                <FieldLabel className="label-field">FIRST NAME</FieldLabel>
                                <input {...register("firstname")} className="bg-zinc-900 border border-zinc-600 rounded-md px-3 py-2 text-zinc-100 text-sm outline-none w-full" />
                                {errors.firstname && (
                                    <FieldError className="text-xs text-red-400">{errors.firstname.message}</FieldError>
                                )}
                            </Field>
                            <Field className="w-full">
                                <FieldLabel className="label-field">LAST NAME</FieldLabel>
                                <input {...register("lastname")} className="bg-zinc-900 border border-zinc-600 rounded-md px-3 py-2 text-zinc-100 text-sm outline-none w-full" />
                                {errors.lastname && (
                                    <FieldError className="text-xs text-red-400">{errors.lastname.message}</FieldError>
                                )}
                            </Field>
                        </div>
                        <Field className="w-full">
                            <FieldLabel className="label-field">USERNAME</FieldLabel>
                            <input {...register("username")} className="bg-zinc-900 border border-zinc-600 rounded-md px-3 py-2 text-zinc-100 text-sm outline-none w-full" />
                            {errors.username && (
                                <FieldError className="text-xs text-red-400">{errors.username.message}</FieldError>
                            )}
                        </Field>
                        <Field className="w-full">
                            <FieldLabel className="label-field">PASSWORD</FieldLabel>
                            <PasswordInput register={register}/>
                            {errors.password && (
                                <FieldError className="text-xs text-red-400">{errors.password.message}</FieldError>
                            )}
                        </Field>
                        <Field className="w-full">
                            <FieldLabel className="label-field">EMAIL</FieldLabel>
                            <input type="email" {...register("email")} className="bg-zinc-900 border border-zinc-600 rounded-md px-3 py-2 text-zinc-100 text-sm outline-none w-full" />
                            {errors.email && (
                                <FieldError className="text-xs text-red-400">{errors.email.message}</FieldError>
                            )}
                        </Field>
                        <div className="flex gap-4 items-center justify-center">
                            <Field className="w-full">
                                <FieldLabel className="label-field">DATE OF BIRTH</FieldLabel>
                                <input type="date" {...register("dateOfBirth")} className="bg-zinc-900 border border-zinc-600 rounded-md px-3 py-2 text-zinc-100 text-sm outline-none w-full" />
                                {errors.dateOfBirth && (
                                    <FieldError className="text-xs text-red-400">{errors.dateOfBirth.message}</FieldError>
                                )}
                            </Field>
                            <Field className="w-full">
                                <FieldLabel className="label-field">DRIVER LICENSE</FieldLabel>
                                <input {...register("driverLicense")} className="bg-zinc-900 border border-zinc-600 rounded-md px-3 py-2 text-zinc-100 text-sm outline-none w-full" />
                                {errors.driverLicense && (
                                    <FieldError className="text-xs text-red-400">{errors.driverLicense.message}</FieldError>
                                )}
                            </Field>
                        </div>
                        <Button disabled={isLoading} className="mt-3 py-5 bg-navy-light">
                            {isLoading ? "Updating account..." : "Update Account"}
                        </Button>
                    </div>
                </form>
            )}
        </>
    )
}

export default UpdateProfilePage