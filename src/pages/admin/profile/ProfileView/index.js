import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Card } from 'react-bootstrap';
import { BsPencilSquare } from 'react-icons/bs';
import Spinner from 'react-bootstrap/Spinner';
import { useToast } from '../../../../hooks/useToast';

import Cookies from 'js-cookie';
import style from './index.module.scss';
import AdminApi from '../../../../api/Admin';
import ProfileEditApi from '../../../../api/ProfileEdit';
import ModalData from './components/ModalData';

const AdminProfile = () => {
  const [profileName, setprofileName] = useState(null);
  const loggedInUserId = Cookies.get('admin_id');
  const [status, setStatus] = useState(false);
  const [modalShow, setModalShow] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [submitStatus, setSubmitStatus] = useState(false);
  const [error, setError] = useState('');
  const [avatar, setAvatar] = useState([]);
  const toast = useToast();

  const handleOnSubmit = async (image) => {
    let data = new FormData();
    data.append('image', image.image);
    toast('Processing', 'Uploading image...');
    try {
      await ProfileEditApi.uploadImage(data);
      toast('Success', 'Successfully Upload.');
      setSuccessMessage('Upload Successful');
      setStatus(true);
      AdminApi.getAllUsers(loggedInUserId).then(({ data }) => {
        setAvatar(data.avatar);
        setStatus(false);
        setModalShow(false);
      });
    } catch (error) {
      if (error?.response?.data?.errors) {
        toast('Error', 'Please enter a valid input to successfully upload.');
        setError(error?.response?.data?.errors);}
      setSubmitStatus(false);
    }
  };

  useEffect(() => {
    AdminApi.getAllUsers(loggedInUserId).then(({ data }) => {
      setprofileName(data[0]);
      setAvatar(data.avatar);
    });
  }, []);

  return (
    <div className={style.mainBody}>
      <div
        className="d-flex justify-content-center align-items-center text-align-center"
        style={{ marginTop: '329px', marginLeft: '881px' }}
      >
        <div>
          <div>
            <div>
              <div>
                <img src={
                  profileName?.avatar 
                    ? avatar 
                    : 'https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png' 
                } 
                className={
                  profileName?.avatar 
                    ? style.biUserPosition 
                    : style.biUserPosition1} />
              </div>
              <a onClick={() => setModalShow(true)}>
                <BsPencilSquare
                  size="20px"
                  color="black"
                  className={style.buttonEditIcon}
                />
              </a>
              <ModalData
                error={error}
                status={status}
                modalShow={modalShow}
                submitStatus={submitStatus}
                setModalShow={setModalShow}
                handleOnSubmit={handleOnSubmit}
                successMessage={successMessage}
              />
            </div>
          </div>
          <Card
            className={style.bodyCard}
          >
            {profileName === null ? (
              <div className={style.loading}>
                <Spinner animation="border" role="status"></Spinner>
                <span className={style.loadingWord}>Loading</span>
              </div>
            ) : (
              <Form style={{ marginTop: '20px' }}>
                <Form.Group className={style.marginForForm} controlId="formBasicName">
                  <Form.Label className={style.FormGroupStyle}>
                Name
                  </Form.Label>
                  <Form.Control
                    style={{ fontSize: '14px' }}
                    value={profileName?.name}
                    disabled="disabled"
                    className={style.formControlstyle}
                  />
                </Form.Group>

                <Form.Group className={style.marginForForm} controlId="formBasicEmail">
                  <Form.Label
                    className={style.FormGroupStyle}>
                Email
                  </Form.Label>
                  <Form.Control
                    style={{ fontSize: '14px' }}
                    value={profileName?.email}
                    disabled="disabled"
                    className={style.formControlstyle}
                  />
                </Form.Group>
                <a href="/admin/profile/edit-password">
                  <Button className={style.changepassbutton} variant="primary">
                Change Password
                  </Button>
                </a>
                <a href="/admin/profile/edit">
                  <Button className={style.editbutton} variant="primary">
                Edit
                  </Button>
                </a>
              </Form>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
