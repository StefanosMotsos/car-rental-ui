import { SlidersHorizontal } from "lucide-react";
import {createContext, useContext, useState} from "react";

type FiltersContextProps<T> = {
    updateFilter: (patch: Partial<T>) => void
    resetKey: number
}

const FilterContext = createContext<FiltersContextProps<any> | null>(null)

export const useFilters = <T,>() => {
    const ctx = useContext(FilterContext)
    if (!ctx) throw new Error("useFilters must be used inside FiltersSidebar")
    return ctx as FiltersContextProps<T>
}

type FiltersSidebarProps<T> = {
    onFiltersChange: (filters: T) => void
    setPage: (page: number) => void
    children: React.ReactNode
}

const FiltersSidebar = <T,> ({ onFiltersChange, setPage, children }: FiltersSidebarProps<T>) => {

    const [resetKey, setResetKey] = useState(0)
    const [localFilters, setLocalFilters] = useState<T>({} as T)

    const updateFilter = (patch: Partial<T>) => {
        const updated = { ...localFilters, ...patch }
        setLocalFilters(updated)
        onFiltersChange(updated)
        setPage(1)
    }

    const handleClear = () => {
        setResetKey(k => k + 1)
        setLocalFilters({} as T)
        onFiltersChange({} as T)
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
                <FilterContext.Provider value={{ updateFilter, resetKey }}>
                    {children}
                </FilterContext.Provider>
            </div>
        </>
    )
}

export default FiltersSidebar