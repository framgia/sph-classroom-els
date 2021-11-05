import React from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { BiPencil } from 'react-icons/bi'

import { HiOutlinePencil } from "react-icons/hi";
import style from './index.module.css';

const EditProfile = () => {
  return (

    <div className={style.center}>
            <div className={style.containeredit}>  
            <div className={style.inputscontainer}>
                <div className={style.inputs}>
                    <Form.Label className={style.Label}>Name</Form.Label>
                    <Form.Control className={style.Control} type="text" name="name" value="Doe Jane"/>
                    {/* <BiPencil className={style.editbuttonone}/> */}
                    
                </div>
                <div className={style.inputs}>
                    <Form.Label className={style.Label}>Email</Form.Label>
                    <Form.Control className={style.Control}type="email" name="email" value="doejane1@gmail.com"/>
                    {/* <BiPencil className={style.editbuttontwo}/> */}
                </div>
                </div>
                <div className={style.Button}>
                
                <div>
                <a className={style.cancel} href="">Cancel</a>
                </div>

               
                <div>
                
                <Button className={style.ChangepassButton} > Change </Button> 
                
                </div>
                
            </div>
            </div>
    </div>
  )
};

export default EditProfile;

