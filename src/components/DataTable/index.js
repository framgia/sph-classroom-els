import React from 'react';
import { PropTypes } from 'prop-types';
import { Table } from 'react-bootstrap';

import style from './index.module.scss';

const DataTable = ({ tableHeaderNames, renderTableData }) => {
  return (
    <Table className={style.formatTable}>
      <thead>
        <tr>
          {tableHeaderNames.map((header, idx) => {
            return <td className={style.classCol} key={idx}>{header.title}</td>;
          })}
          <td className={style.classCol}>Delete</td>
        </tr>
      </thead>
      <tbody>{renderTableData()}</tbody>
    </Table>
  );
};

DataTable.propTypes = {
  tableHeaderNames: PropTypes.array,
  renderTableData: PropTypes.func
};

export default DataTable;