import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Button, Form } from 'react-bootstrap';
import { BsFillArrowLeftSquareFill } from 'react-icons/bs';
import { CgMenuCake } from 'react-icons/cg';

import style from './index.module.scss';

import ChangeLocation from '../../../../components/ChangeLocation';

const AddEditCategory = () => {
  const location = useLocation();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Card style={{ width: '1063px' }} className={style.card}>
      <Card.Header className={style.header}>
        <div>
          <a href="/admin/categories">
            <BsFillArrowLeftSquareFill className={style.backArrow} />
          </a>
        </div>
        <div className={style.headerText}>
          <span>
            {location.pathname === '/admin/add-category'
              ? 'Add a Category'
              : 'Edit Category'}
          </span>
        </div>
      </Card.Header>
      <Card.Body className={style.cardBody}>
        <Form>
          <div className={style.inputFieldContainer}>
            <Form.Label className={style.inputLabel}>Title</Form.Label>
            <Form.Control type="title" className={style.inputFieldTitle} />
          </div>
          <div className={style.inputFieldContainer}>
            <Form.Label className={style.inputLabel}>Location</Form.Label>
            <Form.Control
              className={style.inputFieldTitle}
              readonly="readonly"
              type="text"
              onClick={handleShow}
            />
            <CgMenuCake className={style.menuIcon} onClick={handleShow} />
          </div>
          <Form.Label className={`${style.inputLabel} mt-3`}>
            Description
          </Form.Label>
          <Form.Control as="textarea" className={style.inputFieldDescription} />
        </Form>
        <Button className={style.button}>
          {location.pathname === '/admin/add-category'
            ? 'Add Category'
            : 'Save Category'}
        </Button>
      </Card.Body>
      <div className={style.modalContainer}>
        <ChangeLocation
          show={show}
          handleClose={handleClose}
          handleShow={handleShow}
        />
      </div>
    </Card>
  );
};

export default AddEditCategory;
