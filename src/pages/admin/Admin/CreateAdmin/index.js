import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useToast } from '../../../../hooks/useToast';
import Form from 'react-bootstrap/Form';
import Button from '../../../../components/Button';
import InputField from '../../../../components/InputField';
import AdminApi from '../../../../api/Admin';
import style from './index.module.scss';

const CreateAdmin = () => {
  const toast = useToast();
  const history = useHistory();
  const { control, handleSubmit, reset } = useForm();

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(false);

  const handleOnSubmit = async ({ name, email }) => {
    setSubmitStatus(true);
    toast('Processing', `Creating an admin account for ${name}...`);
    setErrors({});

    await AdminApi.createAdmin({ name, email })
      .then(({ data }) => {
        toast('Success', data.message);
        setSubmitStatus(false);
        reset({
          name: '',
          email: ''
        });
        history.push('/admin/users');
      })
      .catch((error) => {
        setSubmitStatus(false);
        toast('Error', error?.response?.data?.message);
        setErrors(error?.response?.data?.errors);
      });
  };

  return (
    <div className={style.container}>
      <Form onSubmit={handleSubmit(handleOnSubmit)} className={style.form}>
        <h3 className={style.formTitle}>Create Admin</h3>
        <div>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className={style.inputLabel}>Name</Form.Label>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value, ref } }) => (
                <InputField
                  ref={ref}
                  type="text"
                  value={value}
                  onChange={onChange}
                  fieldSize="md"
                  isInvalid={!!errors?.name}
                  placeholder="e.g. John Doe"
                  maxLength={50}
                />
              )}
            />
            <Form.Control.Feedback
              className={style.validationMessage}
              type="invalid"
            >
              {errors?.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className={style.inputLabel}>Email</Form.Label>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value, ref } }) => (
                <InputField
                  ref={ref}
                  type="email"
                  value={value}
                  onChange={onChange}
                  fieldSize="md"
                  isInvalid={!!errors?.email}
                  placeholder="e.g. johndoe@gmail.com"
                  maxLength={50}
                />
              )}
            />
            <Form.Control.Feedback
              className={style.validationMessage}
              type="invalid"
            >
              {errors?.email}
            </Form.Control.Feedback>
          </Form.Group>
        </div>
        <Button
          buttonLabel="Create"
          buttonSize="sm"
          type="submit"
          disabled={submitStatus}
        />
        <Link to="/admin/users" className={style.cancelButton}>
          Cancel
        </Link>
      </Form>
    </div>
  );
};

export default CreateAdmin;
