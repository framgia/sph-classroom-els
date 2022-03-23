import React from 'react';
import { BiBookAlt } from 'react-icons/bi';
import { PropTypes } from 'prop-types';

import style from './index.module.css';

const CategoryLearned = ({ categoryLearned }) => {
  return (
    <table style={{ width: '100%' }}>
      <tbody>
        <tr>
          <td className={style.listTable}>
            <BiBookAlt size="20px" style={{ margin: '0px 17px 5px 0px' }} />
            {categoryLearned.name}
          </td>
          <td className={style.forSeccolum}>
            {categoryLearned.quizzes.length} out of{' '}
            {categoryLearned.quizzes_count} Quizzes Taken
          </td>
        </tr>
      </tbody>
    </table>
  );
};

CategoryLearned.propTypes = {
  categoryLearned: PropTypes.object
};

export default CategoryLearned;
