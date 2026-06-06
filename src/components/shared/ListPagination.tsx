import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination.tsx";

type ListPaginationProps = {
    page: number
    totalPages: number
    onPageChange: (page: number) => void
}

const ListPagination = ({ page, totalPages, onPageChange }: ListPaginationProps) => {
    return (
        <Pagination className="mt-6 ml-10 text-zinc-400">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => onPageChange(Math.max(1, page - 1))}
                        className="cursor-pointer text-zinc-400 hover:text-white hover:bg-zinc-700" />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                    <PaginationItem key={pageNum}>
                        <PaginationLink
                            onClick={() => onPageChange(pageNum)}
                            isActive={pageNum === page}
                            className={`cursor-pointer hover:text-white hover:bg-zinc-700 ${
                                pageNum === page
                                    ? "text-white bg-zinc-700 border border-zinc-500"
                                    : "text-zinc-400"
                            }`}>
                            {pageNum}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationNext
                        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
                        className="cursor-pointer text-zinc-400 hover:text-white hover:bg-zinc-700" />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default ListPagination;