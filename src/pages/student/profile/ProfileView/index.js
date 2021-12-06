import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { MdEdit } from 'react-icons/md';
import style from './index.module.css';
import { Card } from 'react-bootstrap';

const ProfileView = () => {
  return (
    <div className='d-flex justify-content-center align-items-center text-align-center' style={{marginTop:'150px'}} >
      <Card style={{ width: '430px', padding:'50px', paddingTop:'20px', backgroundColor:'#E0EAEC' }}>
        <div className={style.HeadingText}>Account Info</div>
        <Form style={{marginTop:'20px'}}>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label style={{marginBottom: '0px', color: '#48535B', fontSize: '16px' }}>Name</Form.Label>
            <a href='/profile/edit '>
              <MdEdit className={style.editbuttonone} />
            </a>
            <Form.Control style={{fontSize:'14px' }} type='text' name='name' value='Jane Doe' />
          </Form.Group>

          <Form.Group className='mb-4' controlId='formBasicPassword'>
            <Form.Label style={{marginBottom: '0px', color: '#48535B', fontSize: '16px' }}>Email</Form.Label>
            <a href='/profile/edit '>
              <MdEdit className={style.editbuttonTwo} />
            </a>
            <Form.Control style={{fontSize:'14px' }} type='email' name='email' value='janedoe@gmail.com' />
          </Form.Group>
          <Button  className= {style.changepassbutton} variant='primary' type='submit'>
            Change Password
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default ProfileView;
