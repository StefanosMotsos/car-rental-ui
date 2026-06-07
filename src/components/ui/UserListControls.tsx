import {useFilters} from "@/components/shared/FiltersSidebar.tsx";
import type {UserManagementFilters} from "@/schemas/user.ts";

type UserListControlsProps = {
    activeTab: "customers" | "employees" | "users";
}

const UserListControls = ({ activeTab }: UserListControlsProps) => {

    const { updateFilter, resetKey } = useFilters<UserManagementFilters>();

    return (
        <>
            <div className="mt-3">
                <span className="label-field">USERNAME</span>
            </div>
            <input
                key={`username-${resetKey}`}
                type="text"
                onChange={(e) => updateFilter({ username: e.target.value })}
                className="w-full bg-zinc-800 border border-zinc-600 text-white text-sm rounded-md px-2 py-1 mb-3" />
            <span className="label-field">EMAIL</span>
            <input
                key={`email-${resetKey}`}
                type="email"
                onChange={(e) => updateFilter({ email: e.target.value })}
                className="w-full bg-zinc-800 border border-zinc-600 text-white text-sm rounded-md px-2 py-1 mb-3" />
            {activeTab === "users" ? (
                <>
                    <span className="label-field">ROLE</span>
                    <input
                        key={`role-${resetKey}`}
                        type="text"
                        onChange={(e) => updateFilter({ userRole: e.target.value })}
                        className="w-full bg-zinc-800 border border-zinc-600 text-white text-sm rounded-md px-2 py-1 mb-3" />
                </>
            ) : (
                <>
                    <span className="label-field">FIRST NAME</span>
                    <input
                        key={`firstname-${resetKey}`}
                        type="text"
                        onChange={(e) => updateFilter({ firstname: e.target.value })}
                        className="w-full bg-zinc-800 border border-zinc-600 text-white text-sm rounded-md px-2 py-1 mb-3" />
                    <span className="label-field">LAST NAME</span>
                    <input
                        key={`lastname-${resetKey}`}
                        type="text"
                        onChange={(e) => updateFilter({ lastname: e.target.value })}
                        className="w-full bg-zinc-800 border border-zinc-600 text-white text-sm rounded-md px-2 py-1 mb-3" />
                    {activeTab === "customers" && (
                        <>
                            <span className="label-field">DRIVER LICENSE</span>
                            <input
                                key={`license-${resetKey}`}
                                type="text"
                                onChange={(e) => updateFilter({ driverLicenceNumber: e.target.value })}
                                className="w-full bg-zinc-800 border border-zinc-600 text-white text-sm rounded-md px-2 py-1 mb-3" />
                        </>
                    )}
                </>
            )}
        </>
    )
}

export default UserListControls;