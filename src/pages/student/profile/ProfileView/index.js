import React from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { BiPencil } from 'react-icons/bi'
import style from './index.module.css'

const ProfileView = () => {
  return (

    <div className= {style.centercard}>
            <div className={style.containers}>  
               <div className= {style.inputcontainer}>
                <div className={style.inputdetail}>
                    <Form.Label className= {style.label1}>Name</Form.Label>
                    <Form.Control className={style.control1} type="text" name="name" value="Jane Doe"/>
                    <a href="/Studentlist/ChangePassword "><BiPencil className={style.editbuttonone}/></a>
                    
                    
                </div>
                <div className={style.inputdetail}>
                    <Form.Label className={style.label1}>Email</Form.Label>
                    <Form.Control className={style.control1}type="email" name="email" value="janedoe@gmail.com"/>
                    <BiPencil className={style.editbuttontwo}/>
                </div>
                </div>
                <div style={{marginLeft: '350px', paddingTop: '40px'} } className={`${style.detailinput} `}>
                    <Button  className= {style.changepassbutton} > Change Password</Button>
                </div>
            </div>
        </div>
  )
};

export default ProfileView;
