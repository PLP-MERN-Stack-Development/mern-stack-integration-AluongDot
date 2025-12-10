import React from "react";

function Pagination({ page, setPage, totalPages }) {
  return (
    <div className="flex justify-center mt-8">
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className="px-4 py-2 border rounded-l-lg disabled:opacity-50"
      >
        Prev
      </button>

      <span className="px-4 py-2 border-t border-b">{page} / {totalPages}</span>

      <button
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
        className="px-4 py-2 border rounded-r-lg disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;