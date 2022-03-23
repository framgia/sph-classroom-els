import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useToast } from '../../../../hooks/useToast';
import Form from 'react-bootstrap/Form';
import Button from '../../../../components/Button';
import InputField from '../../../../components/InputField';
import AdminApi from '../../../../api/Admin';
import style from './index.module.scss';

const SetAdminPassword = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const email = queryParams.get('email');
  const history = useHistory();
  const toast = useToast();

  const { control, handleSubmit, reset } = useForm();
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(false);

  const handleOnSubmit = async ({ password, password_confirmation }) => {
    setSubmitStatus(true);
    toast('Processing', 'Saving your new password...');
    setErrors({});

    await AdminApi.setNewPassword({ email, password, password_confirmation })
      .then(({ data }) => {
        history.push('/admin/login');
        toast('Success', data.message);
        setSubmitStatus(false);
        reset({
          password: '',
          password_confirmation: ''
        });
      })
      .catch((error) => {
        setSubmitStatus(false);
        toast('Error', error?.response?.data?.message);
        setErrors(error?.response?.data?.errors);
      });
  };

  return (
    <div className={style.formContainer}>
      <Form onSubmit={handleSubmit(handleOnSubmit)} className={style.form}>
        <h3 className={style.formTitle}>Set Password</h3>
        <div>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className={style.inputLabel}>New Password</Form.Label>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value, ref } }) => (
                <InputField
                  ref={ref}
                  type="password"
                  value={value}
                  fieldSize="md"
                  maxLength={20}
                  onChange={onChange}
                  isInvalid={!!errors?.password}
                  placeholder="min. of 6 characters"
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

          <Form.Group className="mb-3 mt-4" controlId="formBasicPassword">
            <Form.Label className={style.inputLabel}>
              Confirm Password
            </Form.Label>
            <Controller
              control={control}
              name="password_confirmation"
              render={({ field: { onChange, value, ref } }) => (
                <InputField
                  ref={ref}
                  type="password"
                  value={value}
                  fieldSize="md"
                  maxLength={20}
                  onChange={onChange}
                  isInvalid={!!errors?.password_confirmation}
                  placeholder="match with new password"
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
          buttonLabel="Change"
          buttonSize="sm"
          type="submit"
          disabled={submitStatus}
        />
      </Form>
    </div>
  );
};

export default SetAdminPassword;
