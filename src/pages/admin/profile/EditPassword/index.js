import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useToast } from '../../../../hooks/useToast';
import Form from 'react-bootstrap/Form';
import InputField from '../../../../components/InputField';
import Button from '../../../../components/Button';
import AdminApi from '../../../../api/Admin';
import style from './index.module.scss';

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
    <div className={style.formContainer}>
      <Form className={style.card} onSubmit={handleSubmit(handleOnSubmit)}>
        <div className={style.headingText}>Change Password</div>
        <Form.Group className="mb-4 mt-4" controlId="currentPassword">
          <Form.Label className={style.inputLabels}>
            Current Password
          </Form.Label>
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
                placeholder="Enter current password here..."
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors?.password}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4" controlId="newPassword">
          <Form.Label className={style.inputLabels}>New Password</Form.Label>
          <Controller
            control={control}
            name="new_password"
            render={({ field: { onChange, value, ref } }) => (
              <InputField
                ref={ref}
                type="password"
                value={value}
                fieldSize="md"
                maxLength={20}
                onChange={onChange}
                isInvalid={!!errors?.new_password}
                placeholder="min. of 6 characters"
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors?.new_password}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4" controlId="confirmPassword">
          <Form.Label className={style.inputLabels}>
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
          <Form.Control.Feedback style={{ width: '300px' }} type="invalid">
            {errors?.password_confirmation}
          </Form.Control.Feedback>
        </Form.Group>

        <div className={style.formButtons}>
          <div>
            <Link to="/admin/profile" className={style.cancel}>
              Cancel
            </Link>
          </div>
          <Button
            buttonLabel="Change"
            buttonSize="sm"
            type="submit"
            disabled={submitStatus}
          />
        </div>
      </Form>
    </div>
  );
};

export default EditPassword;
