import SearchBar from "@/components/shared/SearchBar.tsx";
import FiltersSidebar from "@/components/shared/FiltersSidebar.tsx";
import type {VehicleFilters} from "@/schemas/vehicle.ts";
import VehicleListControls from "@/components/ui/VehicleListControls.tsx";
import ListPagination from "@/components/shared/ListPagination.tsx";
import {useVehicles} from "@/hooks/useVehicles.ts";
import VehicleTable from "@/components/ui/VehicleTable.tsx";
import {Spinner} from "@/components/ui/spinner.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router-dom";

const EmployeeVehicleListPage = () => {
    const { vehicles, isLoading, page, setPage, totalPages, setFilters, refetch } = useVehicles()

    const makers = vehicles.length > 0 ? [...new Set(vehicles.map(v => v.make))] : []

    const navigate = useNavigate();

    if (isLoading) return (
        <div className="flex items-center text-center gap-4">
            <Spinner className="size-8" />
        </div>
    )

    return (
        <>
            <main className="min-h-screen flex flex-col items-center justify-center pt-40 pb-30 px-12">
                <div className="relative w-full flex items-center justify-center">
                    <SearchBar onSearch={(value) => setFilters(f => ({ ...f, search: value }))} />
                    <Button
                        onClick={() => navigate("/employee/add/vehicle")}
                        className="absolute right-0 bg-navy-light py-6 px-3 text-xl rounded-xl">
                        Add Vehicle
                    </Button>
                </div>
                <hr className="border-zinc-600 w-full max-w-5xl mt-6" />
                <div className="flex w-full gap-8 mt-12 mr-16 overflow-hidden">
                    <FiltersSidebar<VehicleFilters>
                        onFiltersChange={(filters) => setFilters(filters)}
                        setPage={setPage}
                    >
                        <VehicleListControls makers={makers} />
                    </FiltersSidebar>
                    <div className="flex-1">
                        {isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <Spinner className="size-8" />
                            </div>
                        ) : (
                            <VehicleTable
                                vehicles={vehicles}
                                refetch={refetch}/>
                        )}
                        <ListPagination
                            page={page}
                            totalPages={totalPages}
                            onPageChange={setPage} />
                    </div>
                </div>
            </main>
        </>
    )
}

export default EmployeeVehicleListPage