import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ page, totalPages, onPageChange, totalItems, pageSize }) {
  if (totalPages <= 1) return null;

  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, totalItems);

  return (
    <div className="flex items-center justify-between border-t border-[#dcdddf] px-4 py-3">
      <p className="text-xs text-[#6b7280]">
        Showing <span className="font-medium text-[#1b3040]">{from}–{to}</span> of{" "}
        <span className="font-medium text-[#1b3040]">{totalItems}</span>
      </p>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="inline-flex h-8 w-8 items-center cursor-pointer justify-center rounded-md text-[#6b7280] hover:bg-[#f2f2f2] hover:text-[#1b496d] disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            className={`inline-flex h-8 w-8 items-center cursor-pointer justify-center rounded-md text-sm font-medium transition-colors ${
              p === page
                ? "bg-[#1b496d] text-white"
                : "text-[#6b7280] hover:bg-[#f2f2f2] hover:text-[#1b496d]"
            }`}
          >
            {p}
          </button>
        ))}

        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[#6b7280] hover:bg-[#f2f2f2] cursor-pointer hover:text-[#1b496d] disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
          aria-label="Next page"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}