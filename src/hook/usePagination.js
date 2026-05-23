import { useState } from "react";

export function usePagination(initialPage = 1) {
    const [currentPage, setCurrentPage] = useState(initialPage);

    const goTo = (page) => setCurrentPage(page);
    const next = (totalPages) =>
        setCurrentPage((p) => Math.min(p + 1, totalPages));
    const prev = () => setCurrentPage((p) => Math.max(p - 1, 1));
    const reset = () => setCurrentPage(1);

    return { currentPage, goTo, next, prev, reset };
}
