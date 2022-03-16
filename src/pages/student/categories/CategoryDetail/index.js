import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useToast } from '../../../../hooks/useToast';
import { LinkContainer } from 'react-router-bootstrap';
import { BsFillArrowLeftSquareFill } from 'react-icons/bs';
import Spinner from 'react-bootstrap/Spinner';
import Pagination from '../../../../components/Pagination';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import CategoryApi from '../../../../api/Category';
import SubcategoryCard from './components/SubcategoryCard';
import style from './index.module.scss';

function Subcategories() {
  const toast = useToast();
  const history = useHistory();
  const categoryId = useParams().id;
  const queryParams = new URLSearchParams(window.location.search);
  const pageNum = queryParams.get('page');

  const [categories, setCategories] = useState(null);
  const [category, setCategory] = useState(null);
  const [chosenCategoryPathID, setChosenCategoryPathID] = useState(categoryId);
  const [page, setPage] = useState(pageNum ? pageNum : 1);
  const [perPage, setPerPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [lastPage, setLastPage] = useState(0);

  useEffect(() => {
    setCategories(null);

    if (!chosenCategoryPathID) {
      history.push('/categories');
    } else {
      history.push(`/categories/${chosenCategoryPathID}/sub?page=${page}`);

      load();
    }
  }, [chosenCategoryPathID, page]);

  const load = () => {
    CategoryApi.show({ categoryId: chosenCategoryPathID })
      .then(({ data }) => {
        setCategory(data.data);
        CategoryApi.getAll({ category_id: chosenCategoryPathID }, page).then(
          ({ data }) => {
            setCategories(data.data);
            setPerPage(data.per_page);
            setTotalItems(data.total);
            setLastPage(data.last_page);
          }
        );
      })
      .catch(() =>
        toast('Error', 'There was an error getting the list of subcategories.')
      );
  };

  const onPageChange = (selected) => {
    setPage(selected + 1);
  };

  const renderCatList = () => {
    return categories.map((subcategory, idx) => {
      return (
        <SubcategoryCard
          key={idx}
          category={subcategory}
          setChosenCategoryPathID={setChosenCategoryPathID}
        />
      );
    });
  };

  return (
    <div className={style.subcategoryContainer}>
      <div className={style.subTile}>
        <div>
          <p className={style.header}>
            <LinkContainer
              to={
                category?.category_id
                  ? `/categories/${category?.category_id}/sub`
                  : '/categories'
              }
              className={style.backButton}
            >
              <BsFillArrowLeftSquareFill size="50" />
            </LinkContainer>
            <div className={style.pageTitle}>
              <span className={style.pageTitleName}>{category?.name}</span>
              <Breadcrumbs
                chosenCategoryPathID={chosenCategoryPathID}
                setChosenCategoryPathID={setChosenCategoryPathID}
              />
            </div>
          </p>
        </div>
        <div id={style.quizlink}>
          {category?.quizzes_count ? (
            <a
              className={style.linkToQuizzes}
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

      {categories && categories?.length <= 0 ? (
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
