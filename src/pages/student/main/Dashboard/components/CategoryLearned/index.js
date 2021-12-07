import React from 'react';
import { BiBookAlt } from 'react-icons/bi';
import { PropTypes } from 'prop-types';

import style from './index.module.css';

const CategoryLearned = ({ categorylearned }) => {
  return (
    <table style={{ width: '100%' }}>
      <tr>
        <td className={style.listTable}>
          <BiBookAlt size='20px' style={{ margin: '0px 17px 5px 0px' }} />
          {categorylearned.name}
        </td>
        <td className={style.forSeccolum}>
          {categorylearned.quizzes.length} out of{' '}
          {categorylearned.quizzes_count} Quizzes Taken
        </td>
      </tr>
    </table>
  );
};

CategoryLearned.propTypes = {
  categorylearned: PropTypes.object
};

export default CategoryLearned;
