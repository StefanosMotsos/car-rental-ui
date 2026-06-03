import {Button} from "../ui/button.tsx";
import {Link} from "react-router-dom";
import {useAuth} from "@/context/AuthProvider.tsx";
import {ChevronDown} from "lucide-react";

const Header = () => {

    const { user } = useAuth()
    console.log(user)

    return (
        <>
            <header className="fixed top-0 left-0 z-50 grid grid-cols-3 items-center px-28 header-gradient w-full h-25">
                <img src="/mcr-logo.png" alt="Motsos Car Rentals" className="h-[90px] w-auto ml-12" />
                <span className="text-gray-700 tracking-widest text-lg text-center">ENJOY THE LIFE</span>
                <div className="flex justify-end">
                    {user ? (
                        <Button variant="ghost" className="text-primary text-lg hover:text-xl hover:bg-transparent hover:text-primary h-10 px-6">
                            <span className="min-w-[80px] text-center">{user.username}</span>
                            <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    ) : (
                        <Button variant="ghost" className="border border-primary text-primary hover:bg-primary hover:text-white h-10 px-6">
                            <Link to="/login">Login</Link>
                        </Button>
                    )}
                </div>
            </header>
        </>
    )
}

export default Header