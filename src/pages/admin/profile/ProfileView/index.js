import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Card } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';

import Cookies from 'js-cookie';
import style from './index.module.scss';
import AdminApi from '../../../../api/Admin';

const AdminProfile = () => {
  const [profileName, setprofileName] = useState(null);
  const loggedInUserId = Cookies.get('admin_id');

  useEffect(() => {
    AdminApi.getAllUsers(loggedInUserId).then(({ data }) => {
      setprofileName(data[0]);
    });
  }, []);

  return (
    <div className={style.mainBody}>
      <div
        className="d-flex justify-content-center align-items-center text-align-center"
        style={{ marginTop: '329px', marginLeft: '881px' }}
      >
        <div>
          <Card
            className={style.bodyCard}
          >
            {profileName === null ? (
              <div className={style.loading}>
                <Spinner animation="border" role="status"></Spinner>
                <span className={style.loadingWord}>Loading</span>
              </div>
            ) : (
              <Form style={{ width: '80%' }}>
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
                    className={style.FormGroupStyle}
                  >
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
