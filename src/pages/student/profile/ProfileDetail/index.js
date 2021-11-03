import React from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { BiPencil } from 'react-icons/bi'

const ProfileDetail = () => {
  return (

    <div>
            <div className="detail-container">
                <div className="detail-input">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" value="Jane Doe"/>
                    {/* <BiPencil className="edit-button-one"/> */}
                </div>
                <div className="detail-input">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value="janedoe@gmail.com"/>
                    {/* <BiPencil className="edit-button-two"/> */}
                </div>
                <div className="detail-input changepass-button">
                    <Button>Change Password</Button>
                </div>
            </div>
        </div>
  )
};

export default ProfileDetail;
