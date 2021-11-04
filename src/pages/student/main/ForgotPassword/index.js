import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import style from './index.module.css';

const PasswordReset = () => (<center>
    <Container>
        <Stack gap={2} className="col-md-5 mx-auto">

            <Form className={style.contps}>

                <div className={style.cent} align="start">
                    <Form.Group className="mb - 3" controlId="Email">
                        <Form.Label>Reset Password</Form.Label>
                        <Form.Control type="text" placeholder="Enter you Email" />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <center>
                        <Button variant="primary" type="submit" id={style.btp}>
                            <a href="NewPassword" className={style.textbtp}>Send the recovery link</a>
                        </Button>
                    </center>

                    <center>
                        <div className={style.cnb}>
                            <a href="Login">Cancel</a>
                        </div>
                    </center>
                </div>
            </Form>
        </Stack>
    </Container>
</center>);

export default PasswordReset;