import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useToast } from '../../../../hooks/useToast';
import { GoKebabVertical } from 'react-icons/go';
import ListGroup from 'react-bootstrap/ListGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Spinner from 'react-bootstrap/Spinner';
import ChangeLocation from '../../../../components/ChangeLocation';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import CategoryApi from '../../../../api/Category';
import style from './index.module.scss';
import ConfirmationModal from '../../../../components/ConfirmationModal';

const CategoryHierarchy = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const categoryID = queryParams.get('categoryID');

  const TYPE = 'withPathDisplay';
  const history = useHistory();
  const toast = useToast();

  const [show, setShow] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isMoved, setIsMoved] = useState(false);
  const [location, setLocation] = useState(null);
  const [categories, setCategories] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [parentCategoryID, setParentCategoryID] = useState(null);
  const [chosenCategoryPathID, setChosenCategoryPathID] = useState(categoryID);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);
  const [itemToDelete, setItemToDelete] = useState({});
  const [canDelete, setCanDelete] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  useEffect(() => {
    if (show && selectedCategory?.id === location?.id) {
      toast(
        'Error',
        'Cannot move to your own category. Please choose another.'
      );
    }

    if (isSaved) {
      location ? setParentCategoryID(location?.id) : setParentCategoryID(null);
      setIsMoved(true);
      setLocation(null);
    }
  }, [location, isSaved]);

  useEffect(() => {
    if (isMoved) {
      if (selectedCategory?.id !== parentCategoryID) {
        handleOnSubmit();
      } else {
        toast(
          'Error',
          'Cannot move to your own category. Please choose another.'
        );
      }
      setIsMoved(false);
    }
  }, [isMoved]);

  const handleOnSubmit = async () => {
    if (selectedCategory) {
      toast('Processing', 'Updating Category...');
      CategoryApi.update(
        selectedCategory.name,
        selectedCategory.description,
        parentCategoryID,
        selectedCategory.id
      )
        .then(() => {
          toast('Success', 'Successfully Updated Category.');
          load();
        })
        .catch((error) => {
          toast('Error', error);
        });
    }
  };

  const onDropdownClick = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    if (deleteConfirmed) {
      toast('Processing', `Deleting ${itemToDelete.name}...`);

      CategoryApi.deleteCategory(itemToDelete.id)
        .then(({ data }) => {
          toast('Success', data.message);
          setDeleteConfirmed(false);
          load();
        })
        .catch(() =>
          toast(
            'Error',
            'There was an error encountered while deleting the category.'
          )
        );
    }
  }, [deleteConfirmed]);

  return (
    <div className={style.mainContent}>
      <ConfirmationModal
        showModal={showConfirmationModal}
        setShowModal={setShowConfirmationModal}
        itemToDelete={itemToDelete.name}
        setDeleteConfirmed={setDeleteConfirmed}
        canDelete={canDelete}
      />
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
                    <Dropdown.Item
                      className={style.kebabMenuItems}
                      onClick={handleShow}
                    >
                      Move to...
                    </Dropdown.Item>
                    <Dropdown.Item
                      as={Link}
                      to={`/admin/add-category?categoryViewType=Hierarchy&categoryID=${category.id}`}
                      className={style.kebabMenuItems}
                    >
                      Add child
                    </Dropdown.Item>
                    <Dropdown.Item 
                      className={style.kebabMenuItems}
                      onClick={() => {
                        if (category.subcategories_count <= 0) {
                          setCanDelete(true);
                        } else {
                          setCanDelete(false);
                        }
                        setItemToDelete(category);
                        setShowConfirmationModal(true);
                      }}
                    >
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

        {categories?.length === 0 ? (
          <div className={style.spinner}>
            <span>No Sub-Category</span>
          </div>
        ) : ('')}
      </ListGroup>
      <ChangeLocation
        show={show}
        handleClose={handleClose}
        location={location}
        setLocation={setLocation}
        setLocationPathDisplay={() => {}}
        type={TYPE}
        isSaved={isSaved}
        setIsSaved={setIsSaved}
        modalHeaderTitle="Move to..."
      />
    </div>
  );
};

export default CategoryHierarchy;
