interface StatCardProps {
    title: string
    description: string
}

const StatCard = (
    { title, description }: StatCardProps) => {
    return (
        <>
            <div className="flex flex-col items-center text-center max-w-xs">
                <h2 className="text-zinc-300 text-3xl font-bold">{title}</h2>
                <p className="text-zinc-300 text-lg">{description}</p>
            </div>
        </>
    )
}

export default StatCard