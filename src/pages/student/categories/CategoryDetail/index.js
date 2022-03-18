import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useToast } from '../../../../hooks/useToast';
import { LinkContainer } from 'react-router-bootstrap';
import { BsFillArrowLeftSquareFill } from 'react-icons/bs';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';

import Pagination from '../../../../components/Pagination';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import CategoryApi from '../../../../api/Category';
import SubcategoryCard from './components/SubcategoryCard';
import QuizzesCard from './components/QuizzesCard';
import QuizApi from '../../../../api/Quiz';
import style from './index.module.scss';

function Subcategories() {
  const toast = useToast();
  const history = useHistory();
  const categoryId = useParams().id;
  const queryParams = new URLSearchParams(window.location.search);
  const pageNum = queryParams.get('page');

  const [categories, setCategories] = useState(null);
  const [quizzes, setQuizzes] = useState(null);
  const [category, setCategory] = useState(null);
  const [chosenCategoryPathID, setChosenCategoryPathID] = useState(categoryId);
  const [categoryPage, setCategoryPage] = useState(pageNum ? pageNum : 1);
  const [perCategoryPage, setPerCategoryPage] = useState(0);
  const [totalCategoryItems, setTotalCategoryItems] = useState(0);
  const [lastCategoryPage, setLastCategoryPage] = useState(0);
  const [quizzesPage, setQuizzesPage] = useState(pageNum ? pageNum : 1);
  const [perQuizzesPage, setPerQuizzesPage] = useState(0);
  const [totalQuizzesItems, setTotalQuizzesItems] = useState(0);
  const [lastQuizzesPage, setLastQuizzesPage] = useState(0);
  const data = categories && quizzes;

  useEffect(() => {
    setCategories(null);

    if (!chosenCategoryPathID) {
      history.push('/categories');
    } else {
      history.push(`/categories/${chosenCategoryPathID}/sub?page=${categoryPage}&page=${quizzesPage}`);

      load();
    }
  }, [chosenCategoryPathID, categoryPage, quizzesPage]);

  const load = () => {
    CategoryApi.show({ categoryId: chosenCategoryPathID })
      .then(({ data }) => {
        setCategory(data.data);
        CategoryApi.getAll({ category_id: chosenCategoryPathID }, categoryPage).then(
          ({ data }) => {
            setCategories(data.data);
            setPerCategoryPage(data.per_page);
            setTotalCategoryItems(data.total);
            setLastCategoryPage(data.last_page);
          }
        );
        QuizApi.categoryQuizzes({ category_id: categoryId, quizzesPage }).then(({data}) => {
          setQuizzes(data.data);
          setPerQuizzesPage(data.per_page);
          setTotalQuizzesItems(data.total);
          setLastQuizzesPage(data.last_page);
        }
        );
      })
      .catch(() =>
        toast('Error', 'There was an error getting the list of subcategories.')
      );
  };

  const onCategoryPageChange = (selected) => {
    setCategoryPage(selected + 1);
  };

  const onQuizzesPageChange = (selected) => {
    setQuizzesPage(selected + 1);
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

  const renderQuizList = () => {
    return quizzes.map((quiz, idx) => {
      return <QuizzesCard quiz={quiz} key={idx}/>;
    });
  };

  const noResultMessage = (messageText) => {
    return (
      <div className={style.noResultsMessage}>
        <p className={style.message}>{messageText}</p>
      </div>
    );
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
      </div>

      { !data ? (
        <div className={style.loading}>
          <Spinner animation="border" role="status"></Spinner>
          <span className={style.loadingWord}>Loading</span>
        </div>
      ) : (
        <div>
          <Row className={style.cardList}>
            {renderCatList()}
          </Row>
          {categories?.length <= 0 ? (
            <div>{noResultMessage('NO RESULTS FOUND')}</div>
          ) : (
            <div className="pt-4">
              <Pagination
                page={categoryPage}
                perPage={perCategoryPage}
                totalItems={totalCategoryItems}
                pageCount={lastCategoryPage}
                onPageChange={onCategoryPageChange}
              ></Pagination>
            </div>
          )}
          <div className={style.header}>Quizzes</div>
          <Row className={style.cardList}>
            {renderQuizList()}
          </Row>
          {quizzes?.length <= 0 ? (
            <div>{noResultMessage('NO RELATED QUIZZES FOUND')}</div>
          ) : (
            <div className="pt-4">
              <Pagination
                page={quizzesPage}
                perPage={perQuizzesPage}
                totalItems={totalQuizzesItems}
                pageCount={lastQuizzesPage}
                onPageChange={onQuizzesPageChange}
              ></Pagination>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Subcategories;
