import {useFilters} from "@/components/shared/FiltersSidebar.tsx";
import type {RentalFilters} from "@/schemas/rental.ts";
import FiltersRadioList from "@/components/ui/FiltersRadioList.tsx";
import FiltersRangeInput from "@/components/ui/FiltersRangeInput.tsx";
import {useAuth} from "@/context/AuthProvider.tsx";

const RentalListControls = () => {

    const { updateFilter, resetKey } = useFilters<RentalFilters>();
    const { user } = useAuth();

    return (
        <>
            <FiltersRadioList
                key={`status-${resetKey}`}
                label="STATUS"
                options={["Pending", "Approved", "Rejected", "Returned"]}
                onSelectionChange={(selected) => updateFilter({ status: selected as RentalFilters["status"] })} />
            {user!.role !== "CUSTOMER" && (
                <div className="flex flex-col gap-1 mt-3">
                    <span className="label-field">CUSTOMER</span>
                    <input
                        key={`customer-${resetKey}`}
                        type="text"
                        onChange={(e) => updateFilter({ customerName: e.target.value })}
                        className="w-full bg-zinc-800 border border-zinc-600 text-white text-sm rounded-md px-2 py-1 mb-3" />
                    <span className="label-field">EMPLOYEE</span>
                    <input
                        key={`employee-${resetKey}`}
                        type="text"
                        onChange={(e) => updateFilter({ employeeName: e.target.value })}
                        className="w-full bg-zinc-800 border border-zinc-600 text-white text-sm rounded-md px-2 py-1 mb-3" />
                </div>
            )}
            <FiltersRangeInput
                key={`cost-${resetKey}`}
                label="TOTAL COST"
                onRangeChange={(min, max) => updateFilter({ minTotalCost: Number(min) || undefined,
                                                                                maxTotalCost: Number(max) || undefined })} />
        </>
    )
}

export default RentalListControls;