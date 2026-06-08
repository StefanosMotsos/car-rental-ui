import type {RentalReadOnlyDTO} from "@/schemas/rental.ts";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Ellipsis} from "lucide-react";
import {updateRental} from "@/api/rental.ts";
import {useAuth} from "@/context/AuthProvider.tsx";
import StatusBadge from "@/components/shared/StatusBadge.tsx";

type RentalTableProps = {
    rentals: RentalReadOnlyDTO[];
    refetch: () => void;
}

const RentalTable = ({ rentals, refetch } : RentalTableProps) => {

    const { user } = useAuth()

    const handleApprove = async (uuid: string) => {
        await updateRental(user!.token, { status: "Approved" }, uuid)
        refetch()
    }

    const handleReject = async (uuid: string) => {
        await updateRental(user!.token, { status: "Rejected" }, uuid)
        refetch()
    }

    const handleReturned = async (uuid: string) => {
        await updateRental(user!.token, { status: "Returned" }, uuid)
        refetch()
    }

    return (
        <>
            <div className="border border-zinc-700 rounded-xl bg-zinc-900 overflow-x-auto w-full">
                <Table>
                    <TableHeader>
                        <TableRow className="border-zinc-700 bg-zinc-800 hover:bg-zinc-800">
                            {user!.role !== "CUSTOMER" && (
                                <TableHead className="label-field">CUSTOMER</TableHead>
                            )}
                            <TableHead className="label-field">VEHICLE</TableHead>
                            <TableHead className="label-field">L.PLATE</TableHead>
                            <TableHead className="label-field">START DATE</TableHead>
                            <TableHead className="label-field">END DATE</TableHead>
                            <TableHead className="label-field">TOTAL COST</TableHead>
                            <TableHead className="label-field">STATUS</TableHead>
                            {user!.role !== "CUSTOMER" && (
                                <>
                                    <TableHead className="label-field">EMPLOYEE</TableHead>
                                    <TableHead className="label-field">ACTIONS</TableHead>
                                </>
                            )}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rentals.map((r) => (
                            <TableRow key={r.uuid} className="border-zinc-700 hover:bg-zinc-700 text-zinc-300">
                                {user!.role !== "CUSTOMER" && (
                                    <TableCell>{r.customerFirstname} {r.customerLastname}</TableCell>
                                )}
                                <TableCell>{r.vehicleMake} {r.vehicleModel}</TableCell>
                                <TableCell>{r.vehicleLicensePlate}</TableCell>
                                <TableCell>{r.startDate}</TableCell>
                                <TableCell>{r.endDate}</TableCell>
                                <TableCell>{r.totalCost
                                    ? `€${r.totalCost.toLocaleString('el-GR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "—"}</TableCell>
                                <TableCell>
                                    {r.status === "Approved" ? (
                                        <StatusBadge status="Approved"/>
                                    ) : r.status === "Pending" ? (
                                        <StatusBadge status="Pending"/>
                                    ) : r.status === "Rejected" ? (
                                        <StatusBadge status="Rejected"/>
                                    ) : (
                                        <StatusBadge status="Returned"/>
                                    )}
                                </TableCell>
                                {user!.role !== "CUSTOMER" && (
                                    <>
                                        <TableCell>
                                            {r.employeeFirstname && r.employeeLastname
                                                ? `${r.employeeFirstname} ${r.employeeLastname}`
                                                : "—"}
                                        </TableCell>
                                        {r.status === "Pending" ? (
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
                                                            onClick={() => handleApprove(r.uuid)}
                                                            className="hover:bg-zinc-700 cursor-pointer">
                                                            Approve
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => handleReject(r.uuid)}
                                                            className="hover:bg-zinc-700 cursor-pointer">
                                                            Reject
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        ) : r.status === "Approved" ? (
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
                                                            onClick={() => handleReturned(r.uuid)}
                                                            className="hover:bg-zinc-700 cursor-pointer">
                                                            Returned
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        ) : (
                                            <TableCell />
                                        )}
                                    </>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}

export default RentalTable;