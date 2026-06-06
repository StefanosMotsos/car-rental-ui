import { SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import type { VehicleFilters } from "@/schemas/vehicle.ts";
import FiltersRadioList from "@/components/ui/FiltersRadioList.tsx";
import { getCategories } from "@/api/lookup.ts";
import { useAuth } from "@/context/AuthProvider.tsx";
import type { CategoryReadOnlyDTO } from "@/schemas/lookup.ts";
import FiltersRangeInput from "@/components/ui/FiltersRangeInput.tsx";

type FiltersSidebarProps = {
    onFiltersChange: (filters: VehicleFilters) => void
    setPage: (page: number) => void
    makers: string[]
}

const FiltersSidebar = ({ onFiltersChange, setPage, makers }: FiltersSidebarProps) => {

    const { user } = useAuth()

    const [resetKey, setResetKey] = useState(0)
    const [categories, setCategories] = useState<CategoryReadOnlyDTO[]>([])
    const [localFilters, setLocalFilters] = useState<VehicleFilters>({})

    useEffect(() => {
        const fetch = async () => {
            setCategories(await getCategories(user!.token))
        }
        fetch()
    }, [])

    const updateFilter = (patch: Partial<VehicleFilters>) => {
        const updated = { ...localFilters, ...patch }
        setLocalFilters(updated)
        onFiltersChange(updated)
        setPage(1)
    }

    const handleClear = () => {
        setResetKey(k => k + 1)
        setLocalFilters({})
        onFiltersChange({})
        setPage(1)
    }

    return (
        <>
            <div className="w-56 shrink-0">
                <div className="flex items-center justify-center py-2 gap-2 bg-zinc-800 rounded-lg">
                    <SlidersHorizontal size={20} className="text-zinc-200"/>
                    <span className="text-zinc-200">Filters</span>
                </div>
                <hr className="border-zinc-600 w-full max-w-5xl mt-4" />
                <button
                    onClick={handleClear}
                    className="w-full mt-5 py-2 rounded-lg text-sm tracking-widest text-zinc-400 border border-zinc-600 hover:border-zinc-400 hover:text-zinc-200 transition-colors">
                    CLEAR FILTERS
                </button>
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
                <FiltersRangeInput
                    key={`rate-${resetKey}`}
                    label="DAILY RATE"
                    onRangeChange={(min, max) => updateFilter({ minDailyRate: Number(min) || undefined, maxDailyRate: Number(max) || undefined })} />
                <FiltersRangeInput
                    key={`year-${resetKey}`}
                    label="YEAR"
                    onRangeChange={(min, max) => updateFilter({ minYear: Number(min) || undefined, maxYear: Number(max) || undefined })} />
            </div>
        </>
    )
}

export default FiltersSidebar