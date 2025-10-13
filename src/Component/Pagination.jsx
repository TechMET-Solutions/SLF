import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// Pagination logic with dots
function getPagination(current, total, delta = 1) {
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= total; i++) {
        if (
            i === 1 ||
            i === total ||
            (i >= current - delta && i <= current + delta)
        ) {
            range.push(i);
        }
    }

    for (let i of range) {
        if (l) {
            if (i - l === 2) {
                rangeWithDots.push(l + 1);
            } else if (i - l !== 1) {
                rangeWithDots.push("...");
            }
        }
        rangeWithDots.push(i);
        l = i;
    }

    return rangeWithDots;
}

// Reusable Pagination component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const paginationItems = getPagination(currentPage, totalPages);

    return (
        <div className="flex justify-center items-center px-6 py-3 border-t gap-2">
            {/* Previous Button */}
            <button
                className="px-3 py-1 border border-gray-300  rounded-md disabled:opacity-50 cursor-pointer"
                onClick={() => onPageChange(currentPage - 1)}
                // disabled={currentPage === 1}
                disabled={currentPage === 1 || totalPages === 0}
            >
                <span 
                    className="flex items-center justify-center gap-2">
                    <FaArrowLeft />
                    Previous
                </span>
            </button>

            {/* Page Numbers with Dots */}
            <div className="flex gap-2">
                {paginationItems.map((item, index) =>
                    item === "..." ? (
                        <span key={`ellipsis-${index}`} className="px-3 py-1">
                            ...
                        </span>
                    ) : (
                        <button
                            key={item}
                            onClick={() => onPageChange(item)}
                            className={`px-3 py-1.5 rounded-md ${currentPage === item ? "bg-[#0b2c69] text-white" : ""
                                }`}
                        >
                            {item}
                        </button>
                    )
                )}
            </div>

            {/* Next Button */}
            <button
                className="px-3 py-1 shadow border border-gray-300 rounded-md disabled:opacity-50 cursor-pointer"
                onClick={() => onPageChange(currentPage + 1)}
                // disabled={currentPage === totalPages}
                disabled={currentPage === totalPages || totalPages === 0}
            >
                <span 
                className="flex items-center justify-center gap-2 ">
                    Next <FaArrowRight />
                </span>
            </button>
        </div>
    );
};

export default Pagination;
