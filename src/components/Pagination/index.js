import React from 'react';
import ReactPaginate from 'react-paginate';

import style from './index.module.css';

const Pagination = ({ props }) => {
  const { page, perPage, totalItems, pageCount, onPageChange } = props;
  const amountPerPage = () => {
    let start = page * perPage - (perPage - 1);
    let end = Math.min(start + perPage - 1, totalItems);

    return `${start} - ${end} of ${totalItems}`;
  };

  return (
    <div className="d-flex align-items-center">
      <p className={style.pageDescription}>{amountPerPage()}</p>
      <ReactPaginate
        containerClassName={`pagination`}
        pageLinkClassName={`page-link ${style.pageLink}`}
        breakLinkClassName={`page-link ${style.pageLink}`}
        previousClassName={`page-link ${style.pageLink}`}
        nextClassName={`active`}
        nextClassName={`page-link ${style.pageLink}`}
        activeClassName={`active ${style.activeLink}`}
        breakLabel="..."
        nextLabel="Next"
        onPageChange={onPageChange}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="Prev"
        renderOnZeroPageCount={null}
        forcePage={page - 1}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default Pagination;
