interface PaginationType {
  total_pages: number;
}

interface PaginationProps {
  isLoading: boolean;
  showFavorites: boolean;
  pagination: PaginationType | null;
  setCurrentPage: (value: number | ((prevPage: number) => number)) => void;
  currentPage: number;
}

const Pagination = ({
  isLoading,
  showFavorites,
  pagination,
  setCurrentPage,
  currentPage,
}: PaginationProps) => {
  return (
    <>
      {!isLoading &&
        !showFavorites &&
        pagination &&
        pagination.total_pages > 1 && (
          <div className="mt-10 flex justify-center">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white"
              >
                Previous
              </button>

              <div className="flex items-center gap-1">
                {Array.from(
                  { length: Math.min(5, pagination.total_pages) },
                  (_, i) => {
                    let pageNum: number;
                    if (pagination.total_pages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= pagination.total_pages - 2) {
                      pageNum = pagination.total_pages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-9 h-9 flex items-center justify-center rounded-md ${
                          currentPage === pageNum
                            ? "bg-[#d5dbe9] text-black hover:bg-[#d5dbe9]/80"
                            : "bg-white hover:bg-gray-100 border border-gray-300"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  }
                )}
              </div>

              <button
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.min(pagination.total_pages, page + 1)
                  )
                }
                disabled={currentPage === pagination.total_pages}
                className="px-4 py-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white"
              >
                Next
              </button>
            </div>
          </div>
        )}
    </>
  );
};

export default Pagination;
