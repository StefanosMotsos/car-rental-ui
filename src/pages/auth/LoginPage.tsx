import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import {type UserLoginDTO, userLoginSchema} from "../../schemas/auth.ts";
import {Link, useNavigate} from "react-router-dom";
import {Button} from "../../components/ui/button.tsx";
import {useAuth} from "@/context/AuthProvider.tsx";
import {useEffect, useState} from "react";

const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<UserLoginDTO>({
        resolver: zodResolver(userLoginSchema)
    })

    const {user, loginUser} = useAuth();
    const [apiError, setApiError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) return;
        if (user.role === "CUSTOMER") navigate("/customer/vehicles");
        else navigate("/employee/rentals");
    }, [user]);

    const onSubmit = async (data: UserLoginDTO) => {
        setApiError(null);
        try {
            await loginUser(data);
        } catch (error) {
            setApiError(error instanceof Error ? error.message : "Something went wrong");
        }
    }

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="min-h-screen flex items-center justify-center"
            >
                <div className="flex flex-col border border-zinc-700 rounded-xl bg-zinc-800 px-8 py-12 mt-20 gap-5 w-full max-w-sm">
                    <p className="text-zinc-600 text-xs text-center tracking-widest italic w-full mb-2">* First request may take up to 1 minute to wake the server</p>
                    <h1 className="text-zinc-300 text-2xl font-bold">Sign In</h1>
                    {apiError && (
                        <div
                            className="text-sm text-red-400 bg-red-950 border border-red-900 rounded-md px-3 py-2"
                        >
                            {apiError}
                        </div>
                    )}
                    <div className="flex flex-col gap-1">
                        <label className="label-field">
                            USERNAME
                        </label>
                        <input
                            type="text" {...register("username")}
                            className="bg-zinc-900 border border-zinc-600 rounded-md px-3 py-2 text-zinc-100 text-sm outline-none"
                        />
                        {errors.username && (
                            <span className="text-xs text-red-400">{errors.username.message}</span>
                        )}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="label-field">
                            PASSWORD
                        </label>
                        <input
                            type="password" {...register("password")}
                            className="bg-zinc-900 border border-zinc-600 rounded-md px-3 py-2 text-zinc-100 text-sm outline-none"
                        />
                        {errors.password && (
                            <span className="text-xs text-red-400">{errors.password.message}</span>
                        )}
                    </div>
                    <Button className="w-full bg-navy-light">Sign in</Button>
                    <div className="flex items-center justify-center gap-1 border-t border-zinc-700 pt-4 text-sm text-zinc-400">
                        <p>Don't have an account?</p>
                        <Link to="/register" className="text-blue-500 font-medium">Create one</Link>
                    </div>
                </div>
            </form>
        </>
    )
}
export default LoginPage;