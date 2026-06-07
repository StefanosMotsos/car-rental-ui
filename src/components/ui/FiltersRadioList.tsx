type FilterRadioListProps = {
    label: string
    options: string[]
    onSelectionChange: (selected: string) => void
    addClasses?: string
}

const FiltersRadioList = ({ label, options, onSelectionChange, addClasses }: FilterRadioListProps) => {
    return (
        <div className="flex flex-col gap-2 mt-3">
            <span className="label-field">{label}</span>
            <ul className={`flex flex-col gap-2 max-h-36 overflow-y-auto ${addClasses ?? ""}`}>
                {(options ?? []).map((option) => (
                    <li key={option} className="flex items-center gap-2 tracking-widest text-zinc-200 ml-3">
                        <input
                            onChange={() => onSelectionChange(option)}
                            type="radio"
                            name={label}
                            className="w-3 h-3" />
                        <label className="text-zinc-300 text-sm cursor-pointer">{option}</label>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default FiltersRadioList