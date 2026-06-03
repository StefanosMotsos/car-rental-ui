import {useState} from "react";
import {Eye, EyeOff} from "lucide-react";
import type {UseFormRegister} from "react-hook-form";

interface PasswordInputProps {
    register: UseFormRegister<{ password: string }>
}

const PasswordInput = (
    {register}: PasswordInputProps) => {

    const [toggle, setToggle] = useState(false);

    return (
        <>
            <div className="relative w-full">
                <input
                    type={toggle ? "text" : "password"}
                    className="bg-zinc-900 border border-zinc-600 rounded-md px-3 py-2 text-zinc-100 text-sm outline-none w-full pr-10"
                    {...register("password")}
                />
                <button
                    type="button"
                    onClick={() => setToggle(!toggle)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
                >
                    {toggle ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
            </div>
        </>
    )
}

export default PasswordInput