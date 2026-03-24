
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";


const SIBLING_COUNT = 1;
const DOTS = "...";

function getPaginationRange(currentPage: number, totalPage: number) {
  const totalPageNumbers = SIBLING_COUNT * 2 + 5;

  if (totalPageNumbers >= totalPage) {
    return Array.from({ length: totalPage }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - SIBLING_COUNT, 1);
  const rightSiblingIndex = Math.min(currentPage + SIBLING_COUNT, totalPage);

  const showLeftDots = leftSiblingIndex > 2;
  const showRightDots = rightSiblingIndex < totalPage - 2;

  if (!showLeftDots && showRightDots) {
    const leftRange = Array.from({ length: 3 + SIBLING_COUNT * 2 }, (_, i) => i + 1);
    return [...leftRange, DOTS, totalPage];
  }

  if (showLeftDots && !showRightDots) {
    const rightRange = Array.from(
      { length: 3 + SIBLING_COUNT * 2 },
      (_, i) => totalPage - (3 + SIBLING_COUNT * 2) + 1 + i
    );
    return [1, DOTS, ...rightRange];
  }

  const middleRange = Array.from(
    { length: rightSiblingIndex - leftSiblingIndex + 1 },
    (_, i) => leftSiblingIndex + i
  );
  return [1, DOTS, ...middleRange, DOTS, totalPage];
}

const ManagePagination = ({ meta }: any) => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPage = Number(meta?.page);
  const totalPage = Number(meta?.totalPage);

  const updatePage = (page: number) => {
    if (page < 1 || page > totalPage) return;
    const params = new URLSearchParams(location.search);
    params.set("page", page.toString());
    params.set("limit", meta.limit.toString());
    navigate(`?${params.toString()}`);
  };

  const paginationRange = getPaginationRange(currentPage, totalPage);

  if (!totalPage) return null;

  // Calculate shown entries info
  const limit = Number(meta?.limit ?? 10);
  const total = Number(meta?.total ?? 0);
  const from = total === 0 ? 0 : (currentPage - 1) * limit + 1;
  const to = Math.min(currentPage * limit, total);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-4 border-t border-th-border">

      {/* Left — entry count info */}
      <p className="text-theme-xs text-th-text-muted whitespace-nowrap">
        {total > 0 ? (
          <>Showing <span className="font-medium text-th-text">{from}–{to}</span> of <span className="font-medium text-th-text">{total}</span> results</>
        ) : (
          "No results"
        )}
      </p>

      {/* Right — pagination controls */}
      <div className="flex items-center gap-1">

        {/* Prev button */}
        <button
          disabled={currentPage === 1 || totalPage === 1}
          onClick={() => updatePage(currentPage - 1)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-th-border text-theme-xs font-medium text-th-text-muted
            hover:bg-th-background hover:text-th-text transition-colors
            disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-th-text-muted"
        >
          <IoIosArrowBack className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Prev</span>
        </button>

        {/* Page numbers */}
        <div className="flex items-center gap-1">
          {paginationRange.map((page, index) => {
            if (page === DOTS) {
              return (
                <span
                  key={`dots-${index}`}
                  className="flex items-center justify-center w-8 h-8 text-theme-xs text-th-text-muted select-none"
                >
                  ···
                </span>
              );
            }

            const isActive = page === currentPage;

            return (
              <button
                key={page}
                onClick={() => updatePage(page as number)}
                className={`flex items-center justify-center w-8 h-8 rounded-lg text-theme-xs font-medium transition-colors
                  ${isActive
                    ? "bg-brand-500 text-white shadow-sm"
                    : "text-th-text-muted hover:bg-th-background hover:text-th-text border border-transparent hover:border-th-border"
                  }`}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* Next button */}
        <button
          disabled={currentPage === totalPage || totalPage === 1}
          onClick={() => updatePage(currentPage + 1)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-th-border text-theme-xs font-medium text-th-text-muted
            hover:bg-th-background hover:text-th-text transition-colors
            disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-th-text-muted"
        >
          <span className="hidden sm:inline">Next</span>
          <IoIosArrowForward  className="w-3.5 h-3.5" />
        </button>

      </div>
    </div>
  );
};

export default ManagePagination;