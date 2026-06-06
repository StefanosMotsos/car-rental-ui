import {Search} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";

type SearchBarProps = {
    onSearch: (value: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {

    const [inputValue, setInputValue] = useState("")

    return (
        <>
            <div className="relative w-full max-w-lg flex items-center justify-center gap-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none"/>
                <input type="text"
                       value={inputValue} onChange={(e) => setInputValue(e.target.value)}
                       onKeyDown={(e) => { if (e.key === "Enter") onSearch(inputValue) }}
                       className="w-full rounded-xl bg-zinc-800 border border-zinc-500 text-zinc-400 py-2 pl-9"
                       placeholder="Search Vehicles" />
                <Button
                    onClick={() => onSearch(inputValue)}
                    className="bg-navy-light py-5 rounded-xl">
                    Search
                </Button>
            </div>
        </>
    )
}

export default SearchBar