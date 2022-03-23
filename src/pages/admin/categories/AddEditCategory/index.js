import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import { Card, Form } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { BsFillArrowLeftSquareFill } from 'react-icons/bs';
import { CgMenuCake } from 'react-icons/cg';
import { useToast } from '../../../../hooks/useToast';
import Spinner from 'react-bootstrap/Spinner';
import InputField from '../../../../components/InputField';
import Button from '../../../../components/Button';

import style from './index.module.scss';

import ChangeLocation from '../../../../components/ChangeLocation';
import CategoryApi from '../../../../api/Category';

const AddEditCategory = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const categoryViewType = queryParams.get('categoryViewType');
  const categoryID = queryParams.get('categoryID');
  const loc = useLocation();
  const TYPE = 'withPathDisplay';
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { control, handleSubmit } = useForm();
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(false);
  const { category_id } = useParams();
  const [category, setCategory] = useState(null);
  const [location, setLocation] = useState(null);
  const [parentCategories, setParentCategories] = useState(null);
  const [parentCategoryID, setParentCategoryID] = useState(null);
  const [locationPathDisplay, setLocationPathDisplay] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const history = useHistory();
  const toast = useToast();

  useEffect(() => {
    if (isSaved) {
      setParentCategoryID(location?.id);
      setLocation(null);
    }
  }, [location, isSaved]);

  useEffect(() => {
    if (
      categoryViewType === 'Hierarchy' &&
      loc.pathname === '/admin/add-category'
    ) {
      getParentCategories();
      setParentCategoryID(categoryID);
    } else if (loc.pathname !== '/admin/add-category') {
      load();
    } else {
      setLocationPathDisplay('Root');
    }
  }, []);

  const load = () => {
    CategoryApi.show({ categoryId: category_id })
      .then(({ data }) => {
        setCategory(data.data);
        setParentCategoryID(data.data.category_id);
        if (data.data.category_id) {
          getParentCategories();
        } else {
          setLocationPathDisplay('Root');
        }
      })
      .catch((error) => toast('Error', error));
  };

  const getParentCategories = () => {
    CategoryApi.getParentCategories(category_id || categoryID)
      .then(({ data }) => {
        setParentCategories(data);
      })
      .catch((error) => toast('Error', error));
  };

  useEffect(() => {
    parentCategories?.forEach((p, idx) =>
      idx === 0
        ? setLocationPathDisplay((path) => path.concat(p.name))
        : setLocationPathDisplay((path) => path.concat(' > ', p.name))
    );
  }, [parentCategories]);

  const detectTypo = (error) => {
    if (loc.pathname === '/admin/add-category') {
      setSubmitStatus(false);
      if (error?.response?.data?.errors?.name) {
        toast('Error', error?.response?.data?.errors?.name);
      } else {
        toast('Error', error?.response?.data?.errors?.description);
      }
    } else {
      setSubmitStatus(false);
      if (error?.response?.data?.errors?.name) {
        toast('Error', error?.response?.data?.errors?.name);
      } else {
        toast('Error', error?.response?.data?.errors?.description);
      }
    }
  };

  const handleOnSubmit = async ({ name, description }) => {
    setSubmitStatus(true);
    setErrors('');

    if (loc.pathname === '/admin/add-category') {
      toast('Processing', 'Adding a Category...');
      CategoryApi.store(name, description, parentCategoryID)
        .then(() => {
          toast('Success', 'Successfully Added Category.');
          categoryViewType === 'Hierarchy'
            ? history.push(`/admin/category-hierarchy?categoryID=${categoryID}`)
            : history.push('/admin/categories');
        })
        .catch((error) => {
          detectTypo(error);
        });
    } else if (loc.pathname === `/admin/edit-category/${category_id}`) {
      toast('Processing', 'Updating Category...');
      CategoryApi.update(name, description, parentCategoryID, category_id)
        .then(() => {
          toast('Success', 'Successfully Updated Category.');
          categoryViewType === 'Hierarchy'
            ? history.push(
                `/admin/category-hierarchy?categoryID=${category_id}`
            )
            : history.push('/admin/categories');
        })
        .catch((error) => detectTypo(error));
    } else {
      toast('Error', 'Invalid Url. Please try again...');
    }
  };

  const buttonLabel = (loc.pathname === '/admin/add-category'
    ? 'Add Category'
    : 'Save Category'
  );

  return (
    <div className={style.cardContainer}>
      <Card className={style.card}>
        <Card.Header className={style.header}>
          <div>
            <a href="/admin/categories">
              <BsFillArrowLeftSquareFill className={style.backArrow} />
            </a>
          </div>
          <div className={style.headerText}>
            <span>
              {loc.pathname === '/admin/add-category'
                ? 'Add a Category'
                : 'Edit Category'}
            </span>
          </div>
        </Card.Header>
        <Card.Body className={style.cardBody}>
          {(category && locationPathDisplay) ||
          loc.pathname === '/admin/add-category' ? (
              <Form onSubmit={handleSubmit(handleOnSubmit)}>
                <Form.Group
                  className={style.inputFieldContainer}
                  controlId="name"
                >
                  <Form.Label className={style.inputLabel}>Title</Form.Label>
                  <Controller
                    control={control}
                    name="name"
                    defaultValue={category?.name}
                    render={({ field: { onChange, value, ref } }) => (
                      <InputField
                        fieldSize="lg"
                        placeholder="Category Name"
                        type="text"
                        value={value}
                        onChange={onChange}
                        ref={ref}
                        isInvalid={!!errors?.name}
                        maxLength={50}
                      />
                    )}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.name}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  className={style.inputFieldContainer}
                  controlId="lacation"
                >
                  <Form.Label className={style.inputLabel}>Location</Form.Label>
                  <InputField
                    readOnly="readonly"
                    fieldSize="lg"
                    type="text"
                    value={locationPathDisplay}
                    onClick={handleShow}
                  />
                  <CgMenuCake className={style.menuIcon} onClick={handleShow} />
                </Form.Group>
                <Form.Group controlId="description">
                  <Form.Label className={`${style.inputLabel} mt-3`}>
                  Description
                  </Form.Label>
                  <Controller
                    control={control}
                    name="description"
                    defaultValue={category?.description}
                    render={({ field: { onChange, value, ref } }) => (
                      <InputField
                        inputStyle={style.inputFieldDescription}
                        onChange={onChange}
                        value={value}
                        ref={ref}
                        as="textarea"
                        placeholder="Category Description"
                        isInvalid={!!errors?.description}
                        maxLength={255}
                      />
                    )}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.description}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button
                  buttonStyle={style.button}
                  type="submit"
                  disabled={submitStatus}
                  buttonSize="def"
                  buttonLabel = {buttonLabel}
                />
              </Form>
            ) : (
              <div className={style.loading}>
                <Spinner animation="border" role="status"></Spinner>
                <span className={style.loadingWord}>Loading</span>
              </div>
            )}
        </Card.Body>
        <div className={style.modalContainer}>
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
      </Card>
    </div>
  );
};

export default AddEditCategory;
