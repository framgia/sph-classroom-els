import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import style from './index.module.css';
import Modal from 'react-bootstrap/Modal';

const PasswordReset = () => {

    const [show, setShow] = useState(false);


    return (<center>

        <Container>
            <Stack gap={2} className="col-md-5 mx-auto">

                <Form className={style.contentstyle}>

                    <div className={style.center} align="start">
                        <Form.Group className="mb - 3" controlId="Email">
                            <Form.Label>Reset Password</Form.Label>
                            <Form.Control type="text" placeholder="Enter you Email" />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>

                        <center>
                            <Button onClick={() => { setShow(true); }} variant="primary" id={style.button}>
                                <span className={style.textbutton}>Send the recovery link</span>
                            </Button>
                        </center>

                        <center>
                            <div>
                                <a href="login" className={style.cancel}>Cancel</a>
                            </div>
                        </center>
                    </div>
                </Form>
            </Stack>
        </Container>

        <Modal show={show} onHide={() => { setShow(false); }} className={style.modalcenter}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Password Reset
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={style.textmodal}>
                    An email has been sent. Please click the link when you get it.
                </div>
            </Modal.Body>
        </Modal>
    </center>);

};
export default PasswordReset;