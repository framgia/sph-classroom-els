import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { PropTypes } from 'prop-types';
import style from './index.module.css';

const SubcategoryCard = ({ category }) => {
  return (
    <Card className={style.card}>
      <Card.Header id={style.cardHeader}>{category?.name}</Card.Header>
      <Card.Body>
        <Link
          to={
            category?.subcategories_count
              ? `/categories/${category.id}/sub`
              : `/categories/${category.id}/quizzes`
          }
        >
          <div className={style.cardContent}>
            <table style={{ width: '100%' }}>
              <tr>
                <td className={style.forSeccolum}>{category?.description}</td>
              </tr>
              <tr>
                <td id={style.listTable}>Available Quizzes:</td>
                <td className={style.forSeccolum}>
                  {category?.total_quizzes ?? '0'}
                </td>
              </tr>
            </table>
          </div>
        </Link>
      </Card.Body>
    </Card>
  );
};

SubcategoryCard.propTypes = {
  category: PropTypes.objects,
};

export default SubcategoryCard;
