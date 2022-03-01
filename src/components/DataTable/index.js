import React from 'react';
import { PropTypes } from 'prop-types';
import { Table } from 'react-bootstrap';

import style from './index.module.scss';

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
  */
const DataTable = ({ tableHeaderNames, renderTableData, titleHeaderStyle }) => {
  return (
    <Table className={style.formatTable}>
      <thead>
        <tr>
          {tableHeaderNames.map((header, idx) => {
            return <td className={titleHeaderStyle} key={idx}>{header.title}</td>;
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
  titleHeaderStyle: PropTypes.any
};

export default DataTable;
