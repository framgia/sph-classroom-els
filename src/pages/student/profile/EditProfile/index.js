import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Card } from 'react-bootstrap';
import style from './index.module.css';

const EditProfile = () => {
  return (
    <div className='d-flex justify-content-center align-items-center text-align-center' style={{marginTop:'150px'}} >
      <Card style={{ width: '430px', padding:'50px', paddingTop:'20px', backgroundColor:'#E0EAEC' }}>
        <div className={style.HeadingText}>Edit Account Info</div>
        <Form style={{marginTop:'20px'}}>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label style={{ marginBottom: '0px', color: '#48535B' }}>Name</Form.Label>
            <Form.Control type='text' name='name' value='Jane Doe' />
          </Form.Group>

          <Form.Group className='mb-4' controlId='formBasicPassword'>
            <Form.Label style={{ marginBottom: '0px', color: '#48535B' }}>Email</Form.Label>
            <Form.Control type='email' name='email' value='janedoe@gmail.com' />
          </Form.Group>
          <Button
            className={style.changepassbutton}
            variant='primary'
            type='submit'
          >
            Change
          </Button>
          <div>
            <a className={style.cancel} href='/profile'>
              Cancel
            </a>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default EditProfile;
