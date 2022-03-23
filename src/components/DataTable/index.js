import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { Spinner, Table, Button } from 'react-bootstrap';
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
                canSort: //bool
            }
        ]
    
    > renderTableData : its prop-type is a function, therefore you should only pass a function that would render the list of data needed for the table.
    > titleHeaderStyle : it will take the style.
    > sortOptions      : to get the initial value.
    > setSortOptions   : To get the value of the sortBy and sortDescsription, to determine how to sort the list.
    > data             : This is the data you want to load inside the table, this is only to determine if the data is still being loaded or not.
    > headerStyle and onSpinner     : Pass a boolean to checnge the syle. 
  */

const DataTable = ({
  tableHeaderNames,
  renderTableData,
  titleHeaderStyle,
  sortOptions,
  setSortOptions,
  headerStyle = true,
  data,
  onSpinner = true
}) => {
  const [sortBy, setSortBy] = useState(sortOptions.sortBy);
  const [sortDirection, setSortDirection] = useState(sortOptions.sortDirection);

  useEffect(() => {
    setSortOptions({ sortBy, sortDirection });
  }, [sortBy, sortDirection]);

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
    <Table className={headerStyle ? style.formatTable : style.tableConvention}>
      <thead>
        <tr>
          {tableHeaderNames.map((header, idx) => {
            return (
              <td
                className={titleHeaderStyle}
                onClick={() => {
                  if (header?.canSort) {
                    onSortClick(header.title);
                  }
                }}
                key={idx}
              >
                <div className={header?.canSort ? style.headerName : ''}>
                  <span>{header.title}</span>
                  <div>{renderArrowIcons(header.title)}</div>
                </div>
              </td>
            );
          })}
        </tr>
      </thead>
      {data ? (
        <tbody>
          {data.length > 0 ? (
            renderTableData()
          ) : (
            <span className={onSpinner ? style.noResultsFound : style.noAspects}>No Results Found</span>
          )}
        </tbody>
      ) : (
        <Button className={onSpinner ? style.spinner : style.noAspects} disabled>
          <Spinner animation="border" />
          <span>Loading</span>
        </Button>
      )}
    </Table>
  );
};

DataTable.propTypes = {
  tableHeaderNames: PropTypes.array,
  renderTableData: PropTypes.func,
  titleHeaderStyle: PropTypes.any,
  sortOptions: PropTypes.object,
  setSortOptions: PropTypes.func,
  data: PropTypes.array,
  onSpinner: PropTypes.bool,
  headerStyle: PropTypes.bool
};

export default DataTable;
