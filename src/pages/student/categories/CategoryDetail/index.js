import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import style from './index.module.css';
import Pagination from '../../../../components/Pagination';
import { LinkContainer } from 'react-router-bootstrap';
import { BsFillArrowLeftSquareFill } from 'react-icons/bs';

import CategoryApi from '../../../../api/Category';
import SubcategoryCard from './components/SubcategoryCard';

function Subcategories() {
  const [categories, setCategories] = useState(null);
  const [category, setCategory] = useState(null);
  const categoryId = useParams().id;
  const queryParams = new URLSearchParams(window.location.search);
  const pageNum = queryParams.get('page');
  const history = useHistory();
  const [page, setPage] = useState(pageNum ? pageNum : 1);
  const [perPage, setPerPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [lastPage, setLastPage] = useState(0);

  useEffect(() => {
    CategoryApi.show({ categoryId }).then(({ data }) => {
      setCategory(data.data);
      CategoryApi.getAll({ category_id: categoryId }, page).then(({ data }) => {
        setCategories(data.data);
        setPerPage(data.per_page);
        setTotalItems(data.total);
        setLastPage(data.last_page);
      });
    });
  }, [categoryId, page]);

  const onPageChange = (selected) => {
    setPage(selected + 1);

    history.push(`/categories/${categoryId}/sub?page=${selected + 1}`);
  };

  const renderCatList = () => {
    return categories.map((subcategory, idx) => {
      return <SubcategoryCard key={idx} category={subcategory} />;
    });
  };

  return (
    <div style={{ padding: '0px 196px', color: '#48535B' }}>
      <div className={style.subTile}>
        <div>
          <p className={style.title}>
            <LinkContainer
              to={
                category?.category_id
                  ? `/categories/${category?.category_id}/sub`
                  : '/categories'
              }
              className={style.titleSpacing}
            >
              <BsFillArrowLeftSquareFill size="50" id={style.backIcon} />
            </LinkContainer>
            {category?.name}
          </p>
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

      {categories?.length <= 0 ? (
        <div className={style.noResultsMessage}>
          <p className={style.message}>NO RESULTS FOUND</p>
        </div>
      ) : (
        <div className="pt-4">
          <Pagination
            page={page}
            perPage={perPage}
            totalItems={totalItems}
            pageCount={lastPage}
            onPageChange={onPageChange}
          ></Pagination>
        </div>
      )}
    </div>
  );
}

export default Subcategories;
