import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import style from './index.module.css';
import Modal from './Modal';

const PasswordReset = () => (<center>

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
                        <Button variant="primary" type="submit" id={style.button}>
                            Send the recovery link
                            <Modal />
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
</center>);

export default PasswordReset;