// Create page numbers (e.g. 1, 2, 3 ... 48, 49, 50)
export const getPageNumbers = (currentPage: number, totalPages: number, maxPagesToShow = 5): (number | '...')[] => {
	const pageNumbers: (number | '...')[] = [];

	if (totalPages <= maxPagesToShow + 2) {
		// If there are fewer total pages than the limit, show all pages
		for (let i = 1; i <= totalPages; i++) {
			pageNumbers.push(i);
		}
	} else {
		// Always show the first two pages
		pageNumbers.push(1);
		pageNumbers.push(2);
		if (currentPage > 2) {
			if (currentPage > 3) {
				pageNumbers.push('...');
			}
		}

		// Define startPage and endPage based on currentPage
		const startPage = Math.max(currentPage - 1, 3);
		let endPage = Math.min(currentPage + 1, totalPages);

		// If near the last page, adjust startPage to show last pages correctly
		if (currentPage >= totalPages - 2) {
			endPage = totalPages;
		}

		// Add page numbers within the range
		for (let i = startPage; i <= endPage; i++) {
			pageNumbers.push(i);
		}

		// Show ellipsis if we're not near the last few pages
		if (currentPage < totalPages - 2) {
			if (currentPage < totalPages - 3) {
				pageNumbers.push('...');
			}
			pageNumbers.push(totalPages - 1);
			pageNumbers.push(totalPages);
		}
	}

	return pageNumbers;
};