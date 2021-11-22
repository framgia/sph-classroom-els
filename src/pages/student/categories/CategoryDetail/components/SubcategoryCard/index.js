import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { PropTypes } from 'prop-types';

import style from './index.module.css';

const SubcategoryCard = ({ category }) => {
  return (
    <Card className={style.card}>
      <Card.Header id={style.cardHeader}>
        <p className={style.cardTitle}>{category?.name}</p>
        <p className={style.cardSubtitle}>{category?.description}</p>
      </Card.Header>
      <Card.Body>
        <Link
          to={
            category?.subcategories_count
              ? `/categories/${category.id}/sub`
              : `/categories/${category.id}/quizzes`
          }
        >
          <div id={style.Subtitle}>
            {category?.subcategories_count
              ? `View Available SubCategories: ${category?.subcategories_count}`
              : 'Check Available Quizzes'}
          </div>
        </Link>
      </Card.Body>
    </Card>
  );
};

SubcategoryCard.propTypes = {
  category: PropTypes.object
};

export default SubcategoryCard;
