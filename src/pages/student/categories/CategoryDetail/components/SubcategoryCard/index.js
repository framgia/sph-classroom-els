import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { PropTypes } from 'prop-types';
import style from './index.module.css';

const SubcategoryCard = ({title, firstRow, secRow, thirRow}) => {

  return (
    <Card className={style.card}>
      <Card.Header id={style.cardHeader}>{title}</Card.Header >
      <Card.Body >
        <Link >
          <div className={style.cardContent}>
            <table style={{width: '100%'}}>
              <tr>
                <td id={style.listTable}>Level:</td>
                <td className={style.forSeccolum}>{firstRow}</td>
              </tr>
              <tr>
                <td id={style.listTable}>Available Quizzes:</td>
                <td className={style.forSeccolum}>{secRow}</td>
              </tr>
              <tr>
                <td id={style.listTable}>Quizzes Taken:</td>
                <td className={style.forSeccolum}>{thirRow}</td>
              </tr>
                    
            </table>
          </div>
        </Link>   
      </Card.Body>
    </Card>
  );
};

SubcategoryCard.propTypes = {

  title: PropTypes.string,
  firstRow: PropTypes.string,
  secRow: PropTypes.string,
  thirRow: PropTypes.string
};

export default SubcategoryCard;