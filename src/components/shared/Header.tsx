import {Button} from "../ui/button.tsx";
import {Link} from "react-router-dom";
import {useAuth} from "@/context/AuthProvider.tsx";
import {ChevronDown} from "lucide-react";
import {useState} from "react";
import DropdownItem from "@/components/ui/DropdownItem.tsx";

const Header = () => {

    const { user, logout } = useAuth();
    const [isOpen, setOpen] = useState(false);

    return (
        <>
            <header className="fixed top-0 left-0 z-50 grid grid-cols-3 items-center px-28 header-gradient w-full h-25">
                <Link to="/"><img src="/mcr-logo.png" alt="Motsos Car Rentals" className="h-[90px] w-auto ml-12" /></Link>
                <span className="text-gray-700 tracking-widest text-lg text-center">ENJOY THE LIFE</span>
                <div className="flex justify-end">
                    {user ? (
                        <div className="relative">
                            <Button
                                onClick={() => setOpen(!isOpen)}
                                variant="ghost"
                                className="text-primary text-lg hover:text-xl hover:bg-transparent hover:text-primary h-10 px-6">
                                <span className="min-w-[80px] text-center">{user.username}</span>
                                <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                            {isOpen && (
                                <ul className="dropdown-color text-primary py-2 flex flex-col items-center justify-center gap-2
                                    absolute mt-2 rounded-lg border border-zinc-600 w-full">
                                    {user.role === "CUSTOMER" && (
                                        <>
                                            <DropdownItem label="View Vehicles" href="/customer/vehicles" />
                                            <DropdownItem label="Rental History" href="/customer/rentals" />
                                            <DropdownItem label="Update Profile" href="/customer/edit" />
                                        </>
                                    )}
                                    {user.role === "EMPLOYEE" && (
                                        <>
                                            <DropdownItem label="View Vehicles" href="/employee/vehicles" />
                                            <DropdownItem label="View Rentals" href="/employee/rentals" />
                                        </>
                                    )}
                                    {user.role === "ADMIN" && (
                                        <>
                                            <DropdownItem label="View Vehicles" href="/employee/vehicles" />
                                            <DropdownItem label="View Rentals" href="/employee/rentals" />
                                            <DropdownItem label="Register Employee" href="/register/employee" />
                                            <DropdownItem label="Update Employee" href={"/admin/employee/edit"} />
                                            <DropdownItem label="User Management" href="/admin/users" />
                                        </>
                                    )}
                                    <li onClick={logout} className="text-center py-2 cursor-pointer">Logout</li>
                                </ul>
                            )}
                        </div>
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