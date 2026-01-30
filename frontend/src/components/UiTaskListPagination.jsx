import React from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { cn } from '@/lib/utils';

const UiTaskListPagination = ({ page, handlePrev, handleNext, numberPage, handlePageChange }) => {
    const generatePages = () => {
        const pages = []; // mang so trang se hien ra ne

        if (numberPage < 4) {
            for (let i = 1; i <= numberPage; i++) {
                pages.push(i);
            }
        } else {
            if (page < 2) {
                pages.push(1, 2, 3, "...", numberPage);
            } else if (page >= numberPage - 1) {
                pages.push(1, "...", numberPage - 1, numberPage);
            } else {
                pages.push(1, "...", page, "...", numberPage);
            }
        }
        return pages;
    };
    const pageToShow = generatePages();
    return (
        <div className='flex justify-center mt-4'>
            <Pagination>
                <PaginationContent>
                    {/* di ve trang truoc */}
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={page === 1 ? undefined : handlePrev}
                            className={cn("cursor-pointer", page === 1 && "pointer-events-none opacity-50")}
                        />
                    </PaginationItem>
                    {/* isActive={p === page}: highlight trang hiện tại
                        onClick={() => {...}}: xử lý khi click 
                        {p} Hiển thị số trang (1, 2, 3...)*/}

                    {pageToShow.map((p, index) => (
                        <PaginationItem key={index}>
                            {p === "..." ? (
                                <PaginationEllipsis />
                            ) : (
                                <PaginationLink
                                    isActive={p === page}
                                    onClick={() => {
                                        if (p !== page) handlePageChange(p);
                                    }}
                                    className="cursor-pointer"
                                >
                                    {p}
                                </PaginationLink>
                            )}
                        </PaginationItem>
                    ))}


                    {/* nay la dung de danh so
                        <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                         <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem> */}



                    {/* trang sau */}
                    <PaginationItem>
                        <PaginationNext onClick={page === numberPage ? undefined : handleNext}
                            className={cn("cursor-pointer", page === numberPage && "pointer-events-none opacity-50")} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>

    )
}

export default UiTaskListPagination;