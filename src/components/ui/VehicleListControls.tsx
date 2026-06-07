import FiltersRadioList from "@/components/ui/FiltersRadioList.tsx";
import type {VehicleFilters} from "@/schemas/vehicle.ts";
import FiltersRangeInput from "@/components/ui/FiltersRangeInput.tsx";
import {useEffect, useState} from "react";
import type {CategoryReadOnlyDTO} from "@/schemas/lookup.ts";
import {getCategories} from "@/api/lookup.ts";
import {useAuth} from "@/context/AuthProvider.tsx";
import {useFilters} from "@/components/shared/FiltersSidebar.tsx";

type VehicleListControlsProps = {
    makers: string[]
}

const VehicleListControls = ({makers} : VehicleListControlsProps) => {

    const { user } = useAuth()
    const [categories, setCategories] = useState<CategoryReadOnlyDTO[]>([])

    const { updateFilter, resetKey } = useFilters<VehicleFilters>();

    useEffect(() => {
        const fetch = async () => {
            setCategories(await getCategories(user!.token))
        }
        fetch()
    }, [])

    return (
        <>
            <FiltersRadioList
                key={`tier-${resetKey}`}
                label="TIER"
                options={["Economy", "Standard", "Luxury", "VIP"]}
                onSelectionChange={(selected) => updateFilter({ tierType: selected as VehicleFilters["tierType"] })} />
            <FiltersRadioList
                key={`category-${resetKey}`}
                label="CATEGORY"
                options={categories.map(c => c.name)}
                onSelectionChange={(selected) => updateFilter({ categoryId: categories.find(c => c.name === selected)?.id })}
                addClasses="custom-scroll" />
            <FiltersRadioList
                key={`make-${resetKey}`}
                label="MANUFACTURER"
                options={makers}
                onSelectionChange={(selected) => updateFilter({ make: selected })}
                addClasses="custom-scroll" />
            {(user?.role === "EMPLOYEE" || user?.role === "ADMIN") && (
                <div className="flex flex-col gap-2">
                    <FiltersRadioList
                        key={`status-${resetKey}`}
                        label="STATUS"
                        options={["Available", "Rented", "Maintenance"]}
                        onSelectionChange={(selected) => updateFilter({ status: selected as VehicleFilters["status"] })}/>
                    <div className="flex flex-col gap-2 mt-3">
                        <span className="label-field">LICENSE PLATE</span>
                        <input
                            key={`plate-${resetKey}`}
                            type="text"
                            onChange={(e) => updateFilter({ licensePlate: e.target.value })}
                            className="w-full bg-zinc-800 border border-zinc-600 text-white text-sm rounded-md px-2 py-1" />
                    </div>
                </div>
            )}
            <FiltersRangeInput
                key={`rate-${resetKey}`}
                label="DAILY RATE"
                onRangeChange={(min, max) => updateFilter({ minDailyRate: Number(min) || undefined, maxDailyRate: Number(max) || undefined })} />
            <FiltersRangeInput
                key={`year-${resetKey}`}
                label="YEAR"
                onRangeChange={(min, max) => updateFilter({ minYear: Number(min) || undefined, maxYear: Number(max) || undefined })} />
        </>
    )
}

export default VehicleListControls