import type {CustomerReadOnlyDTO, EmployeeReadOnlyDTO, UserReadOnlyDTO} from "@/schemas/user.ts";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Ellipsis} from "lucide-react";
import {useNavigate} from "react-router-dom";

type UserTableProps = {
    data: UserReadOnlyDTO[] | CustomerReadOnlyDTO[] | EmployeeReadOnlyDTO[];
    activeTab: "customers" | "employees" | "users"
}

const UserTable = ({ data, activeTab } : UserTableProps) => {
    const navigate = useNavigate();

    return (
        <>
            <div className="border border-zinc-700 rounded-xl bg-zinc-900 overflow-x-auto w-full">
                <Table>
                    <TableHeader>
                        <TableRow className="border-zinc-700 bg-zinc-800 hover:bg-zinc-800">
                            <TableHead className="label-field">USERNAME</TableHead>
                            <TableHead className="label-field">EMAIL</TableHead>
                            <TableHead className="label-field">ROLE</TableHead>
                            {activeTab !== "users" && (
                                <TableHead className="label-field">NAME</TableHead>
                            )}
                            {activeTab === "customers" && (
                                <>
                                    <TableHead className="label-field">DATE OF BIRTH</TableHead>
                                    <TableHead className="label-field">DRIVER LICENSE</TableHead>
                                </>
                            )}
                            {activeTab === "employees" && (
                                <TableHead className="label-field">PHONE</TableHead>
                            )}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {activeTab === "customers" && (data as CustomerReadOnlyDTO[]).map((c) => (
                            <TableRow key={c.uuid} className="border-zinc-700 hover:bg-zinc-700 text-zinc-300">
                                <TableCell>{c.username}</TableCell>
                                <TableCell>{c.email}</TableCell>
                                <TableCell>{c.roleName}</TableCell>
                                <TableCell>{c.firstname} {c.lastname}</TableCell>
                                <TableCell>{c.dateOfBirth}</TableCell>
                                <TableCell>{c.driverLicense}</TableCell>
                            </TableRow>
                        ))}
                        {activeTab === "employees" && (data as EmployeeReadOnlyDTO[]).map((e) => (
                            <TableRow key={e.uuid} className="border-zinc-700 hover:bg-zinc-700 text-zinc-300">
                                <TableCell>{e.username}</TableCell>
                                <TableCell>{e.email}</TableCell>
                                <TableCell>{e.roleName}</TableCell>
                                <TableCell>{e.firstname} {e.lastname}</TableCell>
                                <TableCell>{e.phoneNumber}</TableCell>
                                <TableCell className="pl-6">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="size-8">
                                                <Ellipsis />
                                                <span className="sr-only">Open menu</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="bg-zinc-800 border-zinc-700 text-zinc-200">
                                            <DropdownMenuItem
                                                onClick={() => navigate(`/admin/employees/${e.uuid}/edit`)}
                                                className="hover:bg-zinc-700 cursor-pointer">
                                                Edit
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                        {activeTab === "users" && (data as UserReadOnlyDTO[]).map((u) => (
                            <TableRow key={u.uuid} className="border-zinc-700 hover:bg-zinc-700 text-zinc-300">
                                <TableCell>{u.username}</TableCell>
                                <TableCell>{u.email}</TableCell>
                                <TableCell>{u.roleName}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}

export default UserTable