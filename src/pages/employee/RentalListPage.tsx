import SearchBar from "@/components/shared/SearchBar.tsx";
import FiltersSidebar from "@/components/shared/FiltersSidebar.tsx";
import {Spinner} from "@/components/ui/spinner.tsx";
import ListPagination from "@/components/shared/ListPagination.tsx";
import {useRentals} from "@/hooks/useRentals.ts";
import type {RentalFilters} from "@/schemas/rental.ts";
import {useEffect} from "react";
import RentalListControls from "@/components/ui/RentalListControls.tsx";
import RentalTable from "@/components/ui/RentalTable.tsx";

const RentalListPage = () => {

    const { rentals, isLoading, page, setPage, totalPages, setFilters, refetch } = useRentals()

    useEffect(() => {
        setFilters(f => ({ ...f, status: "Pending" }))
    }, [])

    return (
        <>
            <main className="min-h-screen flex flex-col items-center justify-center pt-40 pb-30 px-12">
                <div className="w-full flex items-center justify-center">
                    <SearchBar onSearch={(value) => setFilters(f => ({ ...f, search: value }))} />
                </div>
                <hr className="border-zinc-600 w-full max-w-5xl mt-6" />
                <div className="flex w-full gap-8 mt-12 mr-16 overflow-hidden">
                    <FiltersSidebar<RentalFilters>
                        onFiltersChange={(filters) => setFilters(filters)}
                        setPage={setPage}
                    >
                        <RentalListControls/>
                    </FiltersSidebar>
                    <div className="flex-1">
                        <p className="text-zinc-600 text-xs tracking-widest italic w-full mb-8">* List auto-filtered to Pending</p>
                        {isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <Spinner className="size-8" />
                            </div>
                        ) : (
                            <RentalTable rentals={rentals} refetch={refetch} />
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

export default RentalListPage;