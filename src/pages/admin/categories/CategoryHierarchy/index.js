import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../../../../hooks/useToast';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import CategoryApi from '../../../../api/Category';
import { GoKebabVertical } from 'react-icons/go';
import { RiArrowRightSLine } from 'react-icons/ri';
import style from './index.module.scss';

const CategoryHierarchy = () => {
  const toast = useToast();
  const [categories, setCategories] = useState();
  const [chosenCategoryPathID, setChosenCategoryPathID] = useState(null);
  const [breadcrumbs, setBreadCrumbs] = useState([]);

  useEffect(() => {
    console.log(breadcrumbs);
    setCategories(null);
    chosenCategoryPathID ? toast('Processing', 'Getting Subcategories...') : '';

    CategoryApi.getCategories({ category_id: chosenCategoryPathID })
      .then(({ data }) => {
        setCategories(data.data);
      })
      .catch(() =>
        toast('Error', 'There was an error getting the list of categories.')
      );
  }, [chosenCategoryPathID]);

  const onCategoryClick = (category, index) => {
    if (category.subcategories_count > 0) {
      setChosenCategoryPathID(category.id);
      setBreadCrumbs([
        ...breadcrumbs,
        { id: category.id, name: category.name, idx: index }
      ]);
    } else {
      toast('Message', 'This category does not have a subcategory.');
    }
  };

  const onBreadcrumbClick = (category_id, index) => {
    console.log(breadcrumbs);
    setBreadCrumbs(breadcrumbs.slice(0, index + 1));
    setChosenCategoryPathID(category_id);
  };

  return (
    <div className={style.mainContent}>
      <div>
        <div className={style.breadcrumbsContainer}>
          <span>Category Hierarchy</span>
          <RiArrowRightSLine className={style.breadcrumbArrowIcon} />
          <span
            className={style.breadcrumbs}
            onClick={() => {
              setChosenCategoryPathID(null);
              setBreadCrumbs([]);
            }}
          >
            Root
          </span>
          {breadcrumbs?.map((breadcrumb, idx) => {
            return (
              <Fragment key={idx}>
                <RiArrowRightSLine className={style.breadcrumbArrowIcon} />
                <span
                  className={style.breadcrumbs}
                  onClick={() => {
                    onBreadcrumbClick(breadcrumb.id, idx);
                  }}
                >
                  {breadcrumb.name}
                </span>
              </Fragment>
            );
          })}
        </div>
      </div>
      <ListGroup>
        {categories ? (
          categories?.map((category, idx) => {
            return (
              <ListGroup.Item
                key={idx}
                className={style.listItems}
                onClick={() => {
                  onCategoryClick(category, idx);
                }}
              >
                <Link to={`/admin/edit-category/${category.id}`}>
                  <span className={style.categoryName}>{category.name}</span>
                </Link>
                <GoKebabVertical />
              </ListGroup.Item>
            );
          })
        ) : (
          <div className={style.spinner}>
            <Spinner animation="border" />
            <span>Loading</span>
          </div>
        )}
      </ListGroup>
    </div>
  );
};

export default CategoryHierarchy;
