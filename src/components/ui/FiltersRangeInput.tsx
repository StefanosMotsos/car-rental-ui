import { useState } from "react";

type FiltersRangeInputProps = {
    label: string
    onRangeChange: (min: string, max: string) => void
}

const FiltersRangeInput = ({ label, onRangeChange }: FiltersRangeInputProps) => {

    const [min, setMin] = useState("")
    const [max, setMax] = useState("")

    return (
        <div className="flex flex-col gap-2 mt-3">
            <span className="label-field">{label}</span>
            <div className="flex items-center gap-2">
                <input
                    type="number"
                    placeholder="Min"
                    value={min}
                    onChange={(e) => { setMin(e.target.value); onRangeChange(e.target.value, max) }}
                    className="w-full bg-zinc-800 border border-zinc-600 text-white text-sm rounded-md px-2 py-1" />
                <span className="text-zinc-400 text-xs">—</span>
                <input
                    type="number"
                    placeholder="Max"
                    value={max}
                    onChange={(e) => { setMax(e.target.value); onRangeChange(min, e.target.value) }}
                    className="w-full bg-zinc-800 border border-zinc-600 text-white text-sm rounded-md px-2 py-1" />
            </div>
        </div>
    )
}

export default FiltersRangeInput