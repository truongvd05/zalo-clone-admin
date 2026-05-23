function Pagination({ currentPage, totalPages, totalItems, limit, onPageChange }) {
    const from = (currentPage - 1) * limit + 1;
    const to = Math.min(currentPage * limit, totalItems);

    const getPages = () => {
        if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
        if (currentPage <= 4) return [1, 2, 3, 4, 5, "...", totalPages];
        if (currentPage >= totalPages - 3) return [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
        return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
    };

    return (
        <div className="flex items-center justify-between border-t mt-auto border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <button
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                    Previous
                </button>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                    Next
                </button>
            </div>

            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{from}</span> to <span className="font-medium">{to}</span> of <span className="font-medium">{totalItems}</span> results
                </p>

                <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-xs">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => onPageChange(currentPage - 1)}
                        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50"
                    >
                        <span className="sr-only">Previous</span>
                        <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="size-5">
                            <path fillRule="evenodd" clipRule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" />
                        </svg>
                    </button>

                    {getPages().map((p, i) =>
                        p === "..." ? (
                            <span key={`dot-${i}`} className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300">
                                ...
                            </span>
                        ) : (
                            <button
                                key={p}
                                onClick={() => onPageChange(p)}
                                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-20
                                    ${p === currentPage
                                        ? "z-10 bg-indigo-600 text-white ring-indigo-600"
                                        : "text-gray-900 hover:bg-gray-50"
                                    }`}
                            >
                                {p}
                            </button>
                        )
                    )}

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => onPageChange(currentPage + 1)}
                        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50"
                    >
                        <span className="sr-only">Next</span>
                        <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="size-5">
                            <path fillRule="evenodd" clipRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" />
                        </svg>
                    </button>
                </nav>
            </div>
        </div>
    );
}

export default Pagination;