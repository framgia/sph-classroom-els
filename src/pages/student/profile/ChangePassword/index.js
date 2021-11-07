import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import style from './index.module.css';

const UsersEdit = () => {
  return (
    <Container>
    <Form className={style.cont}>
    <div className={style.cent}>
      <Form.Group className="mb-3" controlId="CurrentPassword">
        <Form.Label>Current Password</Form.Label>
        <Form.Control  className={style.cntrs} type="password" placeholder="************" />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="NewPassword">
        <Form.Label>New Password</Form.Label>
        <Form.Control  className={style.cntrs} type="password" placeholder="************" />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="ConfirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control  className={style.cntrs} type="password" placeholder="************" />
        <Form.Text className="text-muted">
        </Form.Text>
       </Form.Group>

      <center>
        <Button variant="primary" type="submit" id={style.btp} className={style.btns}>
         Change
        </Button>
      </center>
      
      <center>
        <div className={style.cnb}>
        <a href="/profile" className={style.cnb} >Cancel</a>
        </div>
      </center>
    </div>
    </Form>
  </Container >
  );
};
export default UsersEdit;