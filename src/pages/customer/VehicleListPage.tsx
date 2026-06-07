import SearchBar from "@/components/shared/SearchBar.tsx";
import FiltersSidebar from "@/components/shared/FiltersSidebar.tsx";
import VehicleCard from "@/components/ui/VehicleCard.tsx";
import ListPagination from "@/components/shared/ListPagination.tsx";
import { useVehicles } from "@/hooks/useVehicles.ts";
import VehicleListControls from "@/components/ui/VehicleListControls.tsx";
import type {VehicleFilters} from "@/schemas/vehicle.ts";
import {Spinner} from "@/components/ui/spinner.tsx";

const VehicleListPage = () => {
    const { vehicles, isLoading, page, setPage, totalPages, setFilters } = useVehicles()

    const makers = vehicles.length > 0 ? [...new Set(vehicles.map(v => v.make))] : []

    return (
        <main className="min-h-screen flex flex-col items-center justify-center pt-40 pb-30 px-12">
            <SearchBar onSearch={(value) => setFilters(f => ({ ...f, search: value }))} />
            <hr className="border-zinc-600 w-full max-w-5xl mt-6" />
            <div className="flex w-full gap-8 mt-12 mr-16 overflow-hidden">
                <FiltersSidebar<VehicleFilters>
                    onFiltersChange={(filters) => setFilters(filters)}
                    setPage={setPage}
                >
                    <VehicleListControls makers={makers} />
                </FiltersSidebar>
                <div className="flex-1 grid grid-cols-4 gap-2">
                    {isLoading ? (
                        <div className="flex items-center text-center gap-4">
                            <Spinner className="size-8" />
                        </div>
                    ) : (
                        vehicles.map(vehicle => (
                            <VehicleCard
                                key={vehicle.uuid}
                                vehicle={vehicle}/>
                        ))
                    )}
                </div>
            </div>
            <ListPagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage} />
        </main>
    )
}

export default VehicleListPage