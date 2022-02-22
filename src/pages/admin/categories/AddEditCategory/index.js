import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import { Card, Button, Form } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { BsFillArrowLeftSquareFill } from 'react-icons/bs';
import { CgMenuCake } from 'react-icons/cg';
import { useToast } from '../../../../hooks/useToast';
import Spinner from 'react-bootstrap/Spinner';

import style from './index.module.scss';

import ChangeLocation from '../../../../components/ChangeLocation';
import CategoryApi from '../../../../api/Category';

const AddEditCategory = () => {
  const loc = useLocation();
  const TYPE = 'Category';
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { control, handleSubmit, reset } = useForm();
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(false);
  const { category_id } = useParams();
  const [category, setCategory] = useState(null);
  const [location, setLocation] = useState(null);
  const [locationPath, setLocationPath] = useState('');

  const history = useHistory();
  const toast = useToast();

  useEffect(() => {
    if (loc.pathname !== '/admin/add-category') {
      CategoryApi.show({ categoryId: category_id }).then(({ data }) => {
        setCategory(data.data);
      });
    }
  }, []);

  const detectTypo = () => {
    toast('Error', 'Category name is Already Taken. Please try again...');
    setSubmitStatus(false);
  };

  const handleOnSubmit = async ({ name, description }) => {
    setSubmitStatus(true);
    setErrors('');

    if (loc.pathname === '/admin/add-category') {
      toast('Processing', 'Adding a Category...');
      CategoryApi.store(name, description)
        .then(() => {
          toast('Success', 'Successfully Added Category.');
          history.push('/admin/categories');
        })
        .catch((error) => {
          detectTypo(error);
          reset({
            name: '',
            description: ''
          });
        });
    } else if (loc.pathname === `/admin/edit-category/${category_id}`) {
      toast('Processing', 'Updating Category...');
      CategoryApi.update(name, description, category_id)
        .then(() => {
          toast('Success', 'Successfully Updated Category.');
          history.push('/admin/categories');
        })
        .catch((error) => detectTypo(error));
    } else {
      toast('Error', 'Invalid Url. Please try again...');
    }
  };

  console.log(location?.name);

  return (
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
        {category || loc.pathname === '/admin/add-category' ? (
          <Form onSubmit={handleSubmit(handleOnSubmit)}>
            <Form.Group className={style.inputFieldContainer} controlId="name">
              <Form.Label className={style.inputLabel}>Title</Form.Label>
              <Controller
                control={control}
                name="name"
                defaultValue={category?.name}
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Control
                    className={style.inputFieldTitle}
                    onChange={onChange}
                    value={value}
                    ref={ref}
                    type="title"
                    placeholder="Category Name"
                    isInvalid={!!errors?.name}
                    required
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
              <Form.Control
                className={style.inputFieldTitle}
                readOnly="readonly"
                type="text"
                value={locationPath}
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
                  <Form.Control
                    className={style.inputFieldDescription}
                    onChange={onChange}
                    value={value}
                    ref={ref}
                    as="textarea"
                    placeholder="Category Description"
                    isInvalid={!!errors?.description}
                  />
                )}
              />
              <Form.Control.Feedback type="invalid">
                {errors?.description}
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              className={style.button}
              type="submit"
              disabled={submitStatus}
            >
              {loc.pathname === '/admin/add-category'
                ? 'Add Category'
                : 'Save Category'}
            </Button>
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
          setLocationPath={setLocationPath}
          type={TYPE}
        />
      </div>
    </Card>
  );
};

export default AddEditCategory;
