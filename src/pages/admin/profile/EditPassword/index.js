import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useToast } from '../../../../hooks/useToast';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import style from './index.module.scss';

import AdminApi from '../../../../api/Admin';

const EditPassword = () => {
  const { control, handleSubmit, reset } = useForm();
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(false);

  const history = useHistory();
  const toast = useToast();

  const handleOnSubmit = async ({
    password,
    new_password,
    password_confirmation
  }) => {
    setSubmitStatus(true);
    toast('Processing', 'Updating your current password...');
    setErrors({});

    await AdminApi.updatePassword({
      password,
      new_password,
      password_confirmation
    })
      .then(({ data }) => {
        history.push('/admin/profile');
        toast('Success', data.message);
        setSubmitStatus(false);
        reset({
          password: '',
          new_password: '',
          password_confirmation: ''
        });
      })
      .catch((error) => {
        setSubmitStatus(false);
        toast(
          'Error',
          error?.response?.data?.message ||
            error?.response?.data?.error?.password
        );
        setErrors(
          error?.response?.data?.errors || error?.response?.data?.error
        );
      });
  };

  return (
    <div className="d-inline-flex">
      <Form onSubmit={handleSubmit(handleOnSubmit)} className={style.form}>
        <h3 className={style.formTitle}>Change Password</h3>
        <div>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className={style.inputLabel}>
              Current Password
            </Form.Label>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value, ref } }) => (
                <Form.Control
                  className={style.inputField}
                  type="password"
                  placeholder="enter current password"
                  onChange={onChange}
                  value={value}
                  ref={ref}
                  isInvalid={!!errors?.password}
                  maxLength={20}
                  autocomplete="on"
                  required
                />
              )}
            />
            <Form.Control.Feedback
              className={style.validationMessage}
              type="invalid"
            >
              {errors?.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicNewPassword">
            <Form.Label className={style.inputLabel}>New Password</Form.Label>
            <Controller
              control={control}
              name="new_password"
              render={({ field: { onChange, value, ref } }) => (
                <Form.Control
                  className={style.inputField}
                  type="password"
                  placeholder="min. of 6 characters"
                  onChange={onChange}
                  value={value}
                  ref={ref}
                  isInvalid={!!errors?.new_password}
                  maxLength={20}
                  autocomplete="on"
                  required
                />
              )}
            />
            <Form.Control.Feedback
              className={style.validationMessage}
              type="invalid"
            >
              {errors?.new_password}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
            <Form.Label className={style.inputLabel}>
              Confirm Password
            </Form.Label>
            <Controller
              control={control}
              name="password_confirmation"
              render={({ field: { onChange, value, ref } }) => (
                <Form.Control
                  className={style.inputField}
                  type="password"
                  placeholder="match new password"
                  onChange={onChange}
                  value={value}
                  ref={ref}
                  isInvalid={!!errors?.password_confirmation}
                  maxLength={20}
                  autocomplete="on"
                  required
                />
              )}
            />
            <Form.Control.Feedback
              className={style.validationMessage}
              type="invalid"
            >
              {errors?.password_confirmation}
            </Form.Control.Feedback>
          </Form.Group>
        </div>
        <Button
          className={style.changeButton}
          type="submit"
          disabled={submitStatus}
        >
          Change
        </Button>
        <Link to="/admin/profile" className={style.cancelButton}>
          Cancel
        </Link>
      </Form>
    </div>
  );
};

export default EditPassword;
