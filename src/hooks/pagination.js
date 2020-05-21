import {useState} from "react";

export function usePagination(totalPages = -1) {
    const [currentPage, setPage] = useState(0)
    const [pages, setPages] = useState(totalPages)

    return {
        page: currentPage,
        hasNext: () => pages < 0 ? true : currentPage < (pages - 1),
        hasPrevious: () => currentPage > 0,
        setPage,
        setPages,
        next: () => (pages < 0 ? true : currentPage < pages) && setPage(currentPage+1),
        previous: () => currentPage > 0 && setPage(currentPage-1)
    }
}