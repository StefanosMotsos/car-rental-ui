type StatusBadgeProps = {
    status: string
}

const getStatusCSS = (status: string) => {
    if (["Available", "Approved"].includes(status))
        return "bg-green-950 text-green-400 border border-green-800"
    if (["Rented", "Pending"].includes(status))
        return "bg-amber-950 text-amber-400 border border-amber-800"
    if (["Maintenance", "Rejected"].includes(status))
        return "bg-red-950 text-red-400 border border-red-800"
    return "bg-zinc-800 text-zinc-400 border border-zinc-600"
}

const StatusBadge = ({ status }: StatusBadgeProps) => (
    <span className={`text-xs px-2 py-1 rounded-full ${getStatusCSS(status)}`}>
        {status}
    </span>
)

export default StatusBadge