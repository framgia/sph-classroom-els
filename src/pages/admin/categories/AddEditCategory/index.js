import React from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { BsFillArrowLeftSquareFill } from 'react-icons/bs';

import style from './index.module.scss';

const AddEditCategory = ({ location }) => {
  return (
    <Card style={{ width: '1063px' }} className={style.card}>
      <Card.Header className={style.header}>
        <div>
          <a href="/admin/categories">
            <BsFillArrowLeftSquareFill className={style.backarrow} />
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
      <Card.Body style={{ margin: '1.5rem 1rem' }}>
        <Form>
          <Form.Label className={style.textTitle}>Title</Form.Label>
          <Form.Control type="title" className={style.inputFieldTitle} />
          <Form.Label className={style.textDescription}>Description</Form.Label>
          <Form.Control as="textarea" className={style.inputFieldDescription} />
        </Form>
        <Button className={style.button}>
          {location.pathname === '/admin/add-category'
            ? 'Add Category'
            : 'Save Category'}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default AddEditCategory;
