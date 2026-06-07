import { Card, CardContent } from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import type { VehicleReadOnlyDTO } from "@/schemas/vehicle.ts";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog.tsx";
import RentalForm from "@/components/ui/RentalForm.tsx";

type VehicleCardProps = {
    vehicle: VehicleReadOnlyDTO
}

const VehicleCard = ({ vehicle }: VehicleCardProps) => {

    const [showDetails, setShowDetails] = useState(false)

    return (
        <Card className="h-fit pt-0 pb-2 bg-zinc-900 border border-zinc-700">
            <CardContent className="p-0">
                {vehicle.photoUrl && (
                    <div className="bg-white rounded-t-xl">
                        <img
                            src={vehicle.photoUrl ? `${import.meta.env.VITE_API_URL.replace('/api/v1', '')}${vehicle.photoUrl}` : ""}
                            alt={`${vehicle.make} ${vehicle.model}`}
                            className="w-full h-32 object-contain rounded-t-xl" />
                    </div>
                )}
                <div className="p-3 pb-0">
                    <h2 className="text-white text-lg font-bold mb-2">{vehicle.make} {vehicle.model}</h2>
                    <div className="flex flex-col gap-1">
                        <span className="text-blue-400">${vehicle.dailyRate}/day</span>
                        <span className="text-zinc-400">{vehicle.year}</span>
                    </div>
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showDetails ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                        <div className="pt-2 pb-1 flex flex-col gap-1 border-t border-zinc-700 mt-2">
                            <span className="text-zinc-400 text-sm">Category: {vehicle.categoryName}</span>
                            <span className="text-zinc-400 text-sm">Plate: {vehicle.licensePlate}</span>
                            <span className="text-zinc-400 text-sm">Tier: {vehicle.tierType}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 w-full">
                        <Button
                            onClick={() => setShowDetails(d => !d)}
                            className="mt-2 bg-zinc-800 border border-zinc-600 hover:bg-zinc-900">
                            {showDetails ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            <span className="text-zinc-200">{showDetails ? "Less" : "More"}</span>
                        </Button>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="flex-1 mt-2 bg-navy-light hover:bg-navy">
                                    <span className="text-zinc-200">Rent</span>
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-zinc-900 border border-zinc-700 text-zinc-100">
                                <DialogHeader>
                                    <DialogTitle className="text-white">Rent Vehicle</DialogTitle>
                                </DialogHeader>
                                <RentalForm vehicle={vehicle} />
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default VehicleCard;