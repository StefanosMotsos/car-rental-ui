import {Field, FieldError, FieldLabel} from "@/components/ui/field.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";
import {type CustomerSignupDTO, customerSignupSchema} from "@/schemas/auth.ts";
import {registerCustomer} from "@/api/auth.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import PasswordInput from "@/components/ui/PasswordInput.tsx";
import {Link, useNavigate} from "react-router-dom";

const RegisterCustomerPage = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CustomerSignupDTO>({
        resolver: zodResolver(customerSignupSchema)
    });

    const [apiError, setApiError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = async (data: CustomerSignupDTO) => {
        setIsLoading(true);
        setApiError(null);
        try {
            await registerCustomer(data);
            navigate("/login");
        } catch (error) {
            setApiError(error instanceof Error ? error.message : "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="min-h-screen flex items-center justify-center py-30"
        >
            <div className="flex flex-col border border-zinc-700 rounded-xl bg-zinc-800 px-8 pt-14 pb-10 mt-20 gap-8 w-full max-w-xl">
                <h1 className="text-zinc-300 text-2xl font-bold">Create your Account</h1>
                {apiError && (
                    <div className="text-sm text-red-400 bg-red-950 border border-red-900 rounded-md px-3 py-2">
                        {apiError}
                    </div>
                )}
                <div className="flex gap-4 items-center justify-center">
                    <Field className="w-full">
                        <FieldLabel className="text-zinc-400 text-xs tracking-widest">FIRST NAME</FieldLabel>
                        <input {...register("firstname")} className="bg-zinc-900 border border-zinc-600 rounded-md px-3 py-2 text-zinc-100 text-sm outline-none w-full" />
                        {errors.firstname && (
                            <FieldError className="text-xs text-red-400">{errors.firstname.message}</FieldError>
                        )}
                    </Field>
                    <Field className="w-full">
                        <FieldLabel className="text-zinc-400 text-xs tracking-widest">LAST NAME</FieldLabel>
                        <input {...register("lastname")} className="bg-zinc-900 border border-zinc-600 rounded-md px-3 py-2 text-zinc-100 text-sm outline-none w-full" />
                        {errors.lastname && (
                            <FieldError className="text-xs text-red-400">{errors.lastname.message}</FieldError>
                        )}
                    </Field>
                </div>
                <Field className="w-full">
                    <FieldLabel className="text-zinc-400 text-xs tracking-widest">USERNAME</FieldLabel>
                    <input {...register("username")} className="bg-zinc-900 border border-zinc-600 rounded-md px-3 py-2 text-zinc-100 text-sm outline-none w-full" />
                    {errors.username && (
                        <FieldError className="text-xs text-red-400">{errors.username.message}</FieldError>
                    )}
                </Field>
                <Field className="w-full">
                    <FieldLabel className="text-zinc-400 text-xs tracking-widest">PASSWORD</FieldLabel>
                    <PasswordInput register={register}/>
                    {errors.password && (
                        <FieldError className="text-xs text-red-400">{errors.password.message}</FieldError>
                    )}
                </Field>
                <Field className="w-full">
                    <FieldLabel className="text-zinc-400 text-xs tracking-widest">EMAIL</FieldLabel>
                    <input type="email" {...register("email")} className="bg-zinc-900 border border-zinc-600 rounded-md px-3 py-2 text-zinc-100 text-sm outline-none w-full" />
                    {errors.email && (
                        <FieldError className="text-xs text-red-400">{errors.email.message}</FieldError>
                    )}
                </Field>
                <div className="flex gap-4 items-center justify-center">
                    <Field className="w-full">
                        <FieldLabel className="text-zinc-400 text-xs tracking-widest">DATE OF BIRTH</FieldLabel>
                        <input type="date" {...register("dateOfBirth")} className="bg-zinc-900 border border-zinc-600 rounded-md px-3 py-2 text-zinc-100 text-sm outline-none w-full" />
                        {errors.dateOfBirth && (
                            <FieldError className="text-xs text-red-400">{errors.dateOfBirth.message}</FieldError>
                        )}
                    </Field>
                    <Field className="w-full">
                        <FieldLabel className="text-zinc-400 text-xs tracking-widest">DRIVER LICENSE</FieldLabel>
                        <input {...register("driverLicense")} className="bg-zinc-900 border border-zinc-600 rounded-md px-3 py-2 text-zinc-100 text-sm outline-none w-full" />
                        {errors.driverLicense && (
                            <FieldError className="text-xs text-red-400">{errors.driverLicense.message}</FieldError>
                        )}
                    </Field>
                </div>
                <Button disabled={isLoading} className="mt-3 py-5 bg-navy-light">
                    {isLoading ? "Creating account..." : "Create Account"}
                </Button>
                <div className="flex items-center justify-center gap-1 border-t border-zinc-700 pt-4 text-sm text-zinc-400">
                    <p>Already have an account?</p>
                    <Link to="/login" className="text-blue-500 font-medium">Sign in</Link>
                </div>
            </div>
        </form>
        </>
    )
}

export default RegisterCustomerPage;