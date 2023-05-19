import React from 'react';
import { Pagination as BootstrapPagination } from 'react-bootstrap';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePageChange = (page) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <BootstrapPagination>
      {/* Premier bouton de pagination */}
      <BootstrapPagination.First onClick={() => handlePageChange(1)} />

      {/* Bouton précédent de pagination */}
      <BootstrapPagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={isFirstPage} />

      {/* Numéro de page actuel */}
      <BootstrapPagination.Item active>{currentPage}</BootstrapPagination.Item>

      {/* Bouton suivant de pagination */}
      <BootstrapPagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={isLastPage} />

      {/* Dernier bouton de pagination */}
      <BootstrapPagination.Last onClick={() => handlePageChange(totalPages)} />
    </BootstrapPagination>
  );
}

export default Pagination;
