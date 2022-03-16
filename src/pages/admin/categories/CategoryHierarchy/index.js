import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useToast } from '../../../../hooks/useToast';
import { GoKebabVertical } from 'react-icons/go';
import ListGroup from 'react-bootstrap/ListGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Spinner from 'react-bootstrap/Spinner';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import CategoryApi from '../../../../api/Category';
import style from './index.module.scss';

const CategoryHierarchy = () => {
  const toast = useToast();
  const history = useHistory();

  const queryParams = new URLSearchParams(window.location.search);
  const categoryID = queryParams.get('categoryID');
  const [categories, setCategories] = useState();
  const [chosenCategoryPathID, setChosenCategoryPathID] = useState(categoryID);

  useEffect(() => {
    setCategories(null);
    chosenCategoryPathID
      ? toast('Processing', 'Getting the subcategories...')
      : toast('Processing', 'Getting the root categories...');

    load();
  }, [chosenCategoryPathID]);

  const load = () => {
    CategoryApi.getCategories({
      category_id: chosenCategoryPathID
    })
      .then(({ data }) => {
        setCategories(data.data);
        history.replace({ categoryID });
      })
      .catch(() =>
        toast('Error', 'There was an error getting the list of categories.')
      );
  };

  const onCategoryClick = (category) => {
    if (category.subcategories_count > 0) {
      setChosenCategoryPathID(category.id);
    } else {
      toast('Message', 'This category does not have a subcategory.');
    }
  };

  return (
    <div className={style.mainContent}>
      <section className={style.headerSection}>
        <span className={style.pageTitle}>Category Hierarchy</span>
        <Breadcrumbs
          chosenCategoryPathID={chosenCategoryPathID}
          setChosenCategoryPathID={setChosenCategoryPathID}
        />
      </section>
      <ListGroup>
        {categories ? (
          categories?.map((category, idx) => {
            return (
              <ListGroup.Item key={idx} className={style.listItems}>
                <div
                  className={style.clickableArea}
                  onClick={() => {
                    onCategoryClick(category, idx);
                  }}
                >
                  <Link
                    to={`/admin/edit-category/${category.id}?categoryViewType=Hierarchy`}
                  >
                    <span className={style.categoryName}>{category.name}</span>
                  </Link>
                </div>
                <Dropdown>
                  <Dropdown.Toggle className={style.kebabMenu} bsPrefix="none">
                    <GoKebabVertical />
                  </Dropdown.Toggle>
                  <Dropdown.Menu className={style.kebabMenuList}>
                    <Dropdown.Item className={style.kebabMenuItems}>
                      Move to...
                    </Dropdown.Item>
                    <Dropdown.Item
                      as={Link}
                      to={`/admin/add-category?categoryViewType=Hierarchy&categoryID=${category.id}`}
                      className={style.kebabMenuItems}
                    >
                      Add child
                    </Dropdown.Item>
                    <Dropdown.Item className={style.kebabMenuItems}>
                      Delete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
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
