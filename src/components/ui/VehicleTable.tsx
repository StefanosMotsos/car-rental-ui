import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import type {VehicleReadOnlyDTO} from "@/schemas/vehicle.ts";
import {useAuth} from "@/context/AuthProvider.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Ellipsis} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {deleteVehicle} from "@/api/vehicle.ts";
import StatusBadge from "@/components/shared/StatusBadge.tsx";

type VehicleTableProps = {
    vehicles: VehicleReadOnlyDTO[]
    refetch: () => void;
}

const VehicleTable = ({ vehicles, refetch }: VehicleTableProps) => {

    const { user } = useAuth();
    const navigate = useNavigate()

    const [deleteOpen, setDeleteOpen] = useState(false)
    const [selectedUuid, setSelectedUuid] = useState<string | null>(null)

    const handleDelete = async () => {
        if (!selectedUuid) return
        await deleteVehicle(selectedUuid, user!.token)
        setDeleteOpen(false)
        refetch()
    }

    return (
        <>
            <div className="border border-zinc-700 rounded-xl bg-zinc-900 overflow-hidden w-full">
                <Table>
                    <TableHeader>
                        <TableRow className="border-zinc-700 bg-zinc-800 hover:bg-zinc-800">
                            <TableHead className="label-field">MAKE</TableHead>
                            <TableHead className="label-field">MODEL</TableHead>
                            <TableHead className="label-field">YEAR</TableHead>
                            <TableHead className="label-field">L.PLATE</TableHead>
                            <TableHead className="label-field">D.RATE</TableHead>
                            <TableHead className="label-field">TIER</TableHead>
                            <TableHead className="label-field">CATEGORY</TableHead>
                            <TableHead className="label-field">STATUS</TableHead>
                            {user?.role === "ADMIN"  && (
                                <TableHead className="label-field">ACTIONS</TableHead>
                            )}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {vehicles.map((v) => (
                            <TableRow key={v.uuid} className="border-zinc-700 hover:bg-zinc-700 text-zinc-300">
                                <TableCell>{v.make}</TableCell>
                                <TableCell>{v.model}</TableCell>
                                <TableCell>{v.year}</TableCell>
                                <TableCell>{v.licensePlate}</TableCell>
                                <TableCell>€{v.dailyRate.toFixed(2)}</TableCell>
                                <TableCell>{v.tierType}</TableCell>
                                <TableCell>{v.categoryName}</TableCell>
                                <TableCell>
                                    {v.status === "Available" ? (
                                        <StatusBadge status="Available"/>
                                    ) : v.status === "Rented" ? (
                                        <StatusBadge status="Rented"/>
                                    ) : (
                                        <StatusBadge status="Maintenance"/>
                                    )}
                                </TableCell>
                                {user?.role === "ADMIN" && (
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
                                                    onClick={() => navigate(`/admin/vehicles/${v.uuid}/edit`)}
                                                    className="hover:bg-zinc-700 cursor-pointer">
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => navigate(`/employee/add/vehicle/${v.uuid}/photo`)}
                                                    className="hover:bg-zinc-700 cursor-pointer">
                                                    Add Photo
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator className="bg-zinc-700" />
                                                <DropdownMenuItem variant="destructive"
                                                                  className="hover:bg-red-950 cursor-pointer"
                                                                  onClick={() => { setSelectedUuid(v.uuid); setDeleteOpen(true) }}  >
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                <AlertDialogContent className="bg-zinc-800 border-zinc-700 text-zinc-200">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Vehicle</AlertDialogTitle>
                        <AlertDialogDescription className="text-zinc-400">
                            This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="bg-zinc-700 text-zinc-200 border-zinc-600">Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-red-700 text-white hover:bg-red-900">
                            Confirm Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default VehicleTable