import {useLocation, useNavigate, useParams} from "react-router-dom";
import {CheckCircle, Upload, X} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {useRef, useState} from "react";
import {addPhoto} from "@/api/vehicle.ts";
import {useAuth} from "@/context/AuthProvider.tsx";

const AddPhotoPage = () => {

    const location = useLocation();
    const { make, model, licensePlate } = location.state ?? {}
    const {user} = useAuth();
    const {uuid} = useParams();
    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement>(null);

    const [apiError, setApiError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null);

    const handleFileSelect = () => {
        inputRef.current?.click();
    }

    const handleSubmit = async () => {
        setIsLoading(true)
        setApiError(null);
        try {
            await addPhoto(uuid!, file!, user!.token)
            navigate("/employee/vehicles")
        } catch (error) {
            setApiError(error instanceof Error ? error.message : "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <main className="min-h-screen flex items-center justify-center py-30">
                <div className="flex flex-col border border-zinc-700 rounded-xl bg-zinc-800 px-8 pt-14 pb-10 mt-20 gap-2 w-full max-w-xl">
                    <h1 className="text-zinc-300 text-2xl font-bold text-center">Add Photo</h1>
                    <p className="text-zinc-600 text-xs text-center">{make} {model} · {licensePlate}</p>
                    {apiError && (
                        <div className="text-sm text-red-400 bg-red-950 border border-red-900 rounded-md px-3 py-2">
                            {apiError}
                        </div>
                    )}
                    {!file ? (
                        <div className="flex flex-col border-2 border-dashed border-zinc-600  rounded-md mt-3 px-3 py-2">
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                ref={inputRef}
                                onChange={(e) => setFile(e.target.files?.[0] ?? null)}/>
                            <div
                                onClick={handleFileSelect}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) => {
                                    e.preventDefault()
                                    setFile(e.dataTransfer.files[0])
                                }}
                                className="flex flex-col items-center justify-center gap-2 px-3 py-6">
                                <Upload size={30} className="text-zinc-600" />
                                <p className="text-zinc-400">click or drag image here</p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center border-2 border-dashed border-zinc-600 bg-navy rounded-md mt-3 px-3 py-3 gap-2">
                            <CheckCircle size={20} className="text-teal-500 shrink-0" />
                            <div className="flex flex-col flex-1 min-w-0">
                                <span className="text-zinc-200 text-sm truncate">{file.name}</span>
                                <span className="text-zinc-400 text-xs">{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                            </div>
                            <X size={16}
                               className="text-zinc-400 shrink-0 cursor-pointer"
                               onClick={(e) => { e.stopPropagation(); setFile(null); }} />
                        </div>
                    )}
                    <Button
                        onClick={handleSubmit}
                        disabled={!file || isLoading}
                        className="mt-3 py-5 bg-navy-light">
                        Upload
                    </Button>
                </div>
            </main>
        </>
    )
}

export default AddPhotoPage