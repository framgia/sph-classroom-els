import React, { useState, useEffect } from 'react';
import QuestionApi from '../../../../../api/Question';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import style from './index.module.scss';

const CategoryLearned = ({learning}) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    QuestionApi.getAll(learning.quiz_id).then(({ data }) => {
      setTotal(data.data.length);
    });
  }, []);

  return (
    <tr>
      <td className={style.tblData1}>
        <Link
          className={style.tbleColum}
          to={'/learningsdetail'}
        >
          {learning.title}
        </Link>
      </td>
      <td className={style.tblData1}>{learning.score}/{total}</td>
      <td className={style.tblData1}>{learning.title} &gt; {learning.name}</td>
      <td className={style.tblData1}>{learning.description}</td>
    </tr>
  );
};

CategoryLearned.propTypes = {
  learning: PropTypes.object,
};

export default CategoryLearned;
