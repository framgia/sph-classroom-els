import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Button from '../../../../components/Button';
import InputField from '../../../../components/InputField';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import style from './index.module.scss';

const UsersEdit = () => {
  const { control } = useForm();

  return (
    <Container className={style.formContainer}>
      <Form className={style.card}>
        <div className={style.headingText}>Change Password</div>
        <Form.Group className="mb-4 mt-4" controlId="currentPassword">
          <Form.Label className={style.inputLabels}>
            Current Password
          </Form.Label>
          <Controller
            control={control}
            name="current_password"
            defaultValue=""
            render={({ field: { onChange, value, ref } }) => (
              <InputField
                ref={ref}
                type="password"
                value={value}
                fieldSize="md"
                maxLength={20}
                onChange={onChange}
                isInvalid=""
                placeholder="Enter current password here..."
              />
            )}
          />
          <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4" controlId="newPassword">
          <Form.Label className={style.inputLabels}>New Password</Form.Label>
          <Controller
            control={control}
            name="new_password"
            defaultValue=""
            render={({ field: { onChange, value, ref } }) => (
              <InputField
                ref={ref}
                type="password"
                value={value}
                fieldSize="md"
                maxLength={20}
                onChange={onChange}
                isInvalid=""
                placeholder="min. of 6 characters"
              />
            )}
          />
          <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4" controlId="confirmPassword">
          <Form.Label className={style.inputLabels}>
            Confirm Password
          </Form.Label>
          <Controller
            control={control}
            name="confirm_password"
            defaultValue=""
            render={({ field: { onChange, value, ref } }) => (
              <InputField
                ref={ref}
                type="password"
                value={value}
                fieldSize="md"
                maxLength={20}
                onChange={onChange}
                isInvalid=""
                placeholder="match with new password"
              />
            )}
          />
          <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
        </Form.Group>

        <div className={style.formButtons}>
          <div>
            <Link to="/profile/view" className={style.cancel}>
              Cancel
            </Link>
          </div>
          <Button
            buttonLabel="Change"
            buttonSize="sm"
            type="submit"
            disabled=""
          />
        </div>
      </Form>
    </Container>
  );
};
export default UsersEdit;
