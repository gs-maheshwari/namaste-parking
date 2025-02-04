import { useState } from "react";

import styles from "./Pagination.module.css";
import { Button } from "../ui";

interface PaginationProps {
  totalItems: number;
  onPageChange: (offset: number, limit: number) => void;
}

const ITEMS_PER_PAGE = 20;

const Pagination = ({ totalItems, onPageChange }: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const newOffset = (newPage - 1) * ITEMS_PER_PAGE;
    onPageChange(newOffset, ITEMS_PER_PAGE);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <div className={styles.pagination}>
      <Button
        className={styles.button}
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      <span className={styles.pageInfo}>
        Page {currentPage} of {totalPages}
      </span>
      <Button
        className={styles.button}
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
