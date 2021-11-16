import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import style from './changepass.module.css';

const ChangePassword = () => {
  return (

    <div>
      <div className={style.containeredit}>  
        <div className={style.inputscontainer}>
          <div className={style.inputs}>
            <Form.Label className={style.Label}>Name</Form.Label>
            <Form.Control className={style.Control} type="text" name="name" value="Doe Jane"/>
                    
          </div>
          <div className={style.inputs}>
            <Form.Label className={style.Label}>Email</Form.Label>
            <Form.Control className={style.Control}type="email" name="email" value="doejane1@gmail.com"/>
          </div>
        </div>
        <div className={style.Button}>
                
          <div>
            <a className={style.cancel} href="/">Cancel</a>
          </div>

               
          <div>
                
            <Button className={style.ChangepassButton} > Change </Button> 
                
          </div>
                
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;

