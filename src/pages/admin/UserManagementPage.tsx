import {useUsers} from "@/hooks/useUsers.ts";
import {useState} from "react";
import FiltersSidebar from "@/components/shared/FiltersSidebar.tsx";
import {Spinner} from "@/components/ui/spinner.tsx";
import ListPagination from "@/components/shared/ListPagination.tsx";
import {Button} from "@/components/ui/button.tsx";
import type {UserManagementFilters} from "@/schemas/user.ts";
import UserListControls from "@/components/ui/UserListControls.tsx";
import UserTable from "@/components/ui/UserTable.tsx";


const UserManagementPage = () => {

    const [activeTab, setActiveTab] = useState<"customers" | "employees" | "users">("customers")
    const {data, isLoading, page, setPage, totalPages, setFilters} = useUsers(activeTab)

    return (
        <>
            <main className="min-h-screen flex flex-col items-center justify-center pt-40 pb-30 px-12">
                <div className="w-full flex items-center justify-center gap-4">
                    <Button
                        onClick={() => { setActiveTab("customers"); setPage(1) }}
                        className={activeTab === "customers" ? "bg-navy-light px-6 py-7 rounded-xl text-lg"
                            : "bg-zinc-800 px-6 py-7 rounded-xl text-lg text-zinc-300 hover:bg-zinc-700"}>
                        Customers
                    </Button>
                    <Button
                        onClick={() => { setActiveTab("employees"); setPage(1) }}
                        className={activeTab === "employees" ? "bg-navy-light px-6 py-7 rounded-xl text-lg"
                            : "bg-zinc-800 px-6 py-7 rounded-xl text-lg text-zinc-300 hover:bg-zinc-700"}>
                        Employees
                    </Button>
                    <Button
                        onClick={() => { setActiveTab("users"); setPage(1) }}
                        className={activeTab === "users" ? "bg-navy-light px-6 py-7 rounded-xl text-lg"
                            : "bg-zinc-800 px-6 py-7 rounded-xl text-lg text-zinc-300 hover:bg-zinc-700"}>
                        Users
                    </Button>
                </div>
                <hr className="border-zinc-600 w-full max-w-5xl mt-6" />
                <div className="flex w-full gap-8 mt-12 mr-16 overflow-hidden">
                    <FiltersSidebar<UserManagementFilters>
                        onFiltersChange={(filters) => setFilters(filters)}
                        setPage={setPage}
                    >
                        <UserListControls activeTab={activeTab} />
                    </FiltersSidebar>
                    <div className="flex-1">
                        {isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <Spinner className="size-8" />
                            </div>
                        ) : (
                            <UserTable data={data} activeTab={activeTab} />
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

export default UserManagementPage