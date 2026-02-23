interface PaginationProps {
    pageNumber: number
    pageSize: number
    totalPages: number
    totalCount: number
    itemCount: number
    onPageChange: (page: number) => void
    onPageSizeChange: (pageSize: number) => void
}

const PAGE_SIZE_OPTIONS = [5, 10, 20, 50]

export default function Pagination({
    pageNumber,
    pageSize,
    totalPages,
    totalCount,
    itemCount,
    onPageChange,
    onPageSizeChange,
}: PaginationProps) {
    return (
        <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-500">
                Showing {itemCount} of {totalCount} results
            </p>

            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-500">Rows per page</label>
                    <select
                        value={pageSize}
                        onChange={e => onPageSizeChange(Number(e.target.value))}
                        className="border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {PAGE_SIZE_OPTIONS.map(size => (
                            <option key={size} value={size}>{size}</option>
                        ))}
                    </select>
                </div>

                <span className="text-sm text-gray-600">
                    Page {pageNumber} of {totalPages}
                </span>

                <div className="flex gap-1">
                    <button
                        onClick={() => onPageChange(1)}
                        disabled={pageNumber === 1}
                        className="px-2 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 hover:bg-gray-50 transition-colors"
                    >
                        «
                    </button>
                    <button
                        onClick={() => onPageChange(pageNumber - 1)}
                        disabled={pageNumber === 1}
                        className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 hover:bg-gray-50 transition-colors"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => onPageChange(pageNumber + 1)}
                        disabled={pageNumber === totalPages}
                        className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 hover:bg-gray-50 transition-colors"
                    >
                        Next
                    </button>
                    <button
                        onClick={() => onPageChange(totalPages)}
                        disabled={pageNumber === totalPages}
                        className="px-2 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 hover:bg-gray-50 transition-colors"
                    >
                        »
                    </button>
                </div>
            </div>
        </div>
    )
}