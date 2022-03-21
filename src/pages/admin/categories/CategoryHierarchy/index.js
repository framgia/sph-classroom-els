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
import ChangeLocation from '../../../../components/ChangeLocation';

const CategoryHierarchy = () => {
  const toast = useToast();
  const history = useHistory();
  const TYPE = 'withPathDisplay';
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [location, setLocation] = useState(null);
  const [parentCategories, setParentCategories] = useState(null);
  const [parentCategoryID, setParentCategoryID] = useState(null);
  const [locationPathDisplay, setLocationPathDisplay] = useState('');
  const [isSaved,setIsSaved] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();
  // const description = selectedCategory.description
  

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
        setParentCategoryID(data.data.category_id);
        if (data.data.category_id) {
          getParentCategories();
        } else {
          setLocationPathDisplay('Root');
        }
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

  useEffect(() => {
    if (isSaved) {
      setParentCategoryID(location?.id);
      setLocation(null);
    }
  }, [location, isSaved]);

  const getParentCategories = () => {
    CategoryApi.getParentCategories(chosenCategoryPathID)
      .then(({ data }) => {
        setParentCategories(data);
      })
      .catch((error) => toast('Error', error));
  };

  useEffect(() => {
    if (parentCategoryID) {
      // console.log(parentCategoryID);
      handleOnSubmit();
    }
  }, [parentCategoryID])

  const handleOnSubmit = async () => {
    console.log(parentCategoryID);
    if (selectedCategory) {
      toast('Processing', 'Updating Category...');
      CategoryApi.update(selectedCategory.name, selectedCategory.description, parentCategoryID, selectedCategory.id)
        .then(() => {
          toast('Success', 'Successfully Updated Category.');
          load();
        })
        .catch(() => {
          // console.log(error);
          // toast('Error', error);
        });
    }
  };

  useEffect(() => {
    parentCategories?.forEach((p, idx) =>
      !idx
        ? setLocationPathDisplay((path) => path.concat(p.name))
        : setLocationPathDisplay((path) => path.concat(' > ', p.name))
    );
  }, [parentCategories]);

  const onDropdownClick = (category) => {
    setSelectedCategory(category);
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
                <Dropdown
                  onClick={() => {
                    onDropdownClick(category);
                  }}
                >
                  <Dropdown.Toggle className={style.kebabMenu} bsPrefix="none">
                    <GoKebabVertical />
                  </Dropdown.Toggle>
                  <Dropdown.Menu className={style.kebabMenuList}>
                    <Dropdown.Item className={style.kebabMenuItems} onClick={handleShow}>
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
      <ChangeLocation
        show={show}
        handleClose={handleClose}
        location={location}
        setLocation={setLocation}
        setLocationPathDisplay={setLocationPathDisplay}
        type={TYPE}
        isSaved={isSaved}
        setIsSaved={setIsSaved}
      />
    </div>
  );
};

export default CategoryHierarchy;