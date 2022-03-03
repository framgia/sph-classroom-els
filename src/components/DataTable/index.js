import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { Table } from 'react-bootstrap';
import { BsArrowUp, BsArrowDown } from 'react-icons/bs';

import style from './index.module.scss';
import { useEffect } from 'react';

/*
    To use this component, pass the following props:
    
    > tableHeader : its prop-type is an array, therefore you should only pass an array of objects containing the table header names.
                    User "title" as the key for your table header names

        e.g. 

        const tableHeader = [
            {
                title: //insert header name
            }
        ]
    
    > renderTableData : its prop-type is a function, therefore you should only pass a function that would render the list of data needed for the table.
    > titleHeaderStyle : it will take the style.
    > sortOptions      : to get the initial value.
    > setSortOptions   : To get the value of the sortBy and sortDescsription, to determine how to sort the list.
  */

const DataTable = ({
  tableHeaderNames,
  renderTableData,
  titleHeaderStyle,
  sortOptions,
  setSortOptions
}) => {
  const [sortBy, setSortBy] = useState(sortOptions.sortBy);
  const [sortDirection, setSortDirection] = useState(sortOptions.sortDirection);

  useEffect(() => {
    setSortOptions({ sortBy, sortDirection });
  }, [sortDirection]);

  const renderArrowIcons = (name) => {
    if (sortBy === name && sortBy !== 'Edit') {
      return sortDirection === 'asc' ? (
        <BsArrowUp className={style.arrowIcons} />
      ) : (
        <BsArrowDown className={style.arrowIcons} />
      );
    }
  };

  const onSortClick = (headerName) => {
    if (sortBy !== headerName) {
      setSortBy(headerName);
      setSortDirection('asc');
    } else if (sortDirection === 'asc') {
      setSortDirection('desc');
    } else {
      setSortBy('');
      setSortDirection('');
    }
  };

  return (
    <Table className={style.formatTable}>
      <thead>
        <tr>
          {tableHeaderNames.map((header, idx) => {
            return (
              <td
                className={titleHeaderStyle}
                onClick={() => {
                  onSortClick(header.title);
                }}
                key={idx}
              >
                <div
                  className={header.title !== 'Edit' ? style.headerName : ''}
                >
                  <span>{header.title}</span>
                  <div>{renderArrowIcons(header.title)}</div>
                </div>
              </td>
            );
          })}
          <td className={titleHeaderStyle}>Delete</td>
        </tr>
      </thead>
      <tbody>{renderTableData()}</tbody>
    </Table>
  );
};

DataTable.propTypes = {
  tableHeaderNames: PropTypes.array,
  renderTableData: PropTypes.func,
  titleHeaderStyle: PropTypes.any,
  sortOptions: PropTypes.object,
  setSortOptions: PropTypes.func
};

export default DataTable;
