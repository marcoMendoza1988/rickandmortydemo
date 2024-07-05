import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const getVisiblePages = () => {
    const totalButtonsDesktop = 10;
    const totalButtonsTablet = 5;
    const totalButtonsMobile = 3;

    const totalButtons = window.innerWidth >= 1024 
      ? totalButtonsDesktop 
      : window.innerWidth >= 768 
      ? totalButtonsTablet 
      : totalButtonsMobile;

    let start = Math.max(currentPage - Math.floor(totalButtons / 2), 1);
    let end = start + totalButtons - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(end - totalButtons + 1, 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded-2xl disabled:opacity-50 text-[#35c9dd]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>

      </button>
      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 border rounded-2xl ${currentPage === page ? 'bg-[#35c9dd] text-white' : 'text-[#35c9dd] border-[#a9f3fd]'}`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border rounded-2xl disabled:opacity-50 text-[#35c9dd]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>

      </button>
    </div>
  );
};

export default Pagination;
