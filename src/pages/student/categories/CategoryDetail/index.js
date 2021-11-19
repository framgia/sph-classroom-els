import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import style from './index.module.css';

import CategoryApi from '../../../../api/Category';
import SubcategoryCard from './components/SubcategoryCard';

function Subcategories() {
  const [categories, setCategories] = useState(null);
  const [category, setCategory] = useState(null);
  const categoryId = useParams().id;

  useEffect(() => {
    CategoryApi.show({ categoryId }).then(({ data }) => {
      setCategory(data.data);
      CategoryApi.getAll({ category_id: categoryId }).then(({ data }) => {
        setCategories(data.data);
      });
    });
  }, [categoryId]);

  const renderCatList = () => {
    return categories.map((subcategory, idx) => {
      return <SubcategoryCard key={idx} category={subcategory} />;
    });
  };

  return (
    <div>
      <div className={style.subTile}>
        <div>
          <p className={style.title}>{category?.name}</p>
        </div>
        <div id={style.quizlink}>
          {category?.quizzes_count ? (
            <a
              style={{ color: 'black', fontSize: '24px' }}
              href={`/categories/${category?.id}/quizzes`}
            >
              Check Available Quizzes &gt;&gt;
            </a>
          ) : (
            ''
          )}
        </div>
      </div>

      {categories === null ? (
        <div className={style.loading}>
          <Spinner animation="border" role="status"></Spinner>
          <span className={style.loadingWord}>Loading</span>
        </div>
      ) : (
        <div className={style.cardList}>{renderCatList()}</div>
      )}
    </div>
  );
}

export default Subcategories;
