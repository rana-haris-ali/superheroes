import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';
import { getPageNumbers } from '@/utils/getPageNumbers';
import { Dispatch, SetStateAction } from 'react';

const MyPagination = ({
	currentPage,
	totalPages,
	setCurrentPage,
}: {
	currentPage: number;
	totalPages: number;
	setCurrentPage: Dispatch<SetStateAction<number>>;
}) => {
	const pageNumbers = getPageNumbers(currentPage, totalPages);

	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						aria-disabled={currentPage <= 1}
						tabIndex={currentPage <= 1 ? -1 : undefined}
						className={
							currentPage <= 1 ? 'pointer-events-none opacity-50' : undefined
						}
						onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
					/>
				</PaginationItem>

				{pageNumbers.map((page, index) => (
					<PaginationItem key={index}>
						{page === '...' ? (
							<PaginationEllipsis />
						) : (
							<PaginationLink
								href='#'
								className={currentPage === page ? 'active' : undefined}
								onClick={() => setCurrentPage(page)}
							>
								{page}
							</PaginationLink>
						)}
					</PaginationItem>
				))}

				<PaginationItem>
					<PaginationNext
						href='#'
						aria-disabled={currentPage >= totalPages}
						tabIndex={currentPage >= totalPages ? -1 : undefined}
						className={
							currentPage >= totalPages
								? 'pointer-events-none opacity-50'
								: undefined
						}
						onClick={() =>
							currentPage < totalPages && setCurrentPage(currentPage + 1)
						}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};

export default MyPagination;
