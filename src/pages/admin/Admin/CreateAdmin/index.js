import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useToast } from '../../../../hooks/useToast';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import style from './index.module.scss';

import AdminApi from '../../../../api/Admin';

const CreateAdmin = () => {
  const { control, handleSubmit, reset } = useForm();
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(false);

  const toast = useToast();

  const handleOnSubmit = async ({ name, email }) => {
    setSubmitStatus(true);
    toast('Processing', `Creating an admin account for ${name}...`);
    setErrors({});

    try {
      const response = await AdminApi.createAdmin({
        name,
        email
      });
      toast('Success', response?.data?.message);
      setSubmitStatus(false);
      reset({
        name: '',
        email: ''
      });
    } catch (error) {
      setSubmitStatus(false);
      toast('Error', error?.response?.data?.message);
      setErrors(error?.response?.data?.errors);
    }
  };

  return (
    <div className="d-inline-flex">
      <Form
        onSubmit={handleSubmit(handleOnSubmit)}
        className={style.formContainer}
      >
        <h3 className={style.formTitle}>Create Admin</h3>
        <div>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className={style.inputLabel}>Name</Form.Label>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value, ref } }) => (
                <Form.Control
                  className={style.inputField}
                  type="text"
                  placeholder="e.g. John Doe"
                  onChange={onChange}
                  value={value}
                  ref={ref}
                  isInvalid={!!errors?.name}
                  maxLength={50}
                  required
                />
              )}
            />
            <Form.Control.Feedback type="invalid">
              {errors?.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className={style.inputLabel}>Email</Form.Label>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value, ref } }) => (
                <Form.Control
                  className={style.inputField}
                  type="email"
                  placeholder="e.g. johndoe@gmail.com"
                  onChange={onChange}
                  value={value}
                  ref={ref}
                  isInvalid={!!errors?.email}
                  maxLength={50}
                  required
                />
              )}
            />
            <Form.Control.Feedback type="invalid">
              {errors?.email}
            </Form.Control.Feedback>
          </Form.Group>
        </div>
        <Button
          className={style.createButton}
          type="submit"
          disabled={submitStatus}
        >
          Create
        </Button>
        <Link to="/admin/admin-accounts" className={style.cancelButton}>
          Cancel
        </Link>
      </Form>
    </div>
  );
};

export default CreateAdmin;
