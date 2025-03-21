import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
type TFooterProps = {
  itemLength: number;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  endIndex: number;
};
const Footer = ({
  itemLength,
  totalPages,
  currentPage,
  onPageChange,
  endIndex,
}: TFooterProps) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePrevClick = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };
  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-muted-foreground">
        Showing <strong>{endIndex}</strong> of <strong>{itemLength}</strong>
        users
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" onClick={handlePrevClick} />
          </PaginationItem>

          {pageNumbers.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={page === currentPage}
                onClick={() => onPageChange(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {totalPages > 10 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext href="#" onClick={handleNextClick} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Footer;
