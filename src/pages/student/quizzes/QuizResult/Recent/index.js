import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { CgTimer } from 'react-icons/cg';
import { PropTypes } from 'prop-types';

import style from './index.module.css';

const Recent = (props) => {
  return (
    <Card className={style.bg}>
      <Card.Header className={style.forContainerBar}>
        <table style={{ width: '100%' }}>
          <tbody>
            <tr>
              <td className={style.titleText}>{props.title}</td>
              <td style={{ textAlign: 'right' }}>
                <CgTimer size='10px' />5 Mins
              </td>
            </tr>
          </tbody>
        </table>
      </Card.Header>
      <Card.Body>
        <div>
          <table style={{ width: '100%' }}>
            <tbody>
              <tr>
                <td className={style.listTable}>Attempt</td>
                <td className={style.forSeccolum}>8</td>
              </tr>
              <tr>
                <td className={style.listTable}>Highest Score</td>
                <td className={style.forSeccolum}>8/10</td>
              </tr>
              <tr>
                <td id={style.listTable}>Latest Score</td>
                <td className={style.forSeccolum2}>7/10</td>
              </tr>
            </tbody>
          </table>
          <Link to={'/categories/1/quizzes'}>
            <p className={style.retake}>Retake Quiz</p>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

Recent.propTypes = {
  title: PropTypes.string
};

export default Recent;
