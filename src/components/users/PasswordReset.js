import React from 'react';
import '../css/GlobalStyle.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';

const PasswordReset = () => (<center>
    <Container>
        <Stack gap={2} className="col-md-5 mx-auto">

            <Form className="cont-ps">

                <div className="cent" align="start">
                    <Form.Group className="mb-3" controlId="Email">
                        <Form.Label>Reset Password</Form.Label>
                        <Form.Control type="text" placeholder="Enter you Email" />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <center>
                        <Button variant="primary" type="submit" id="btp">
                            Send the recovery link
                        </Button>
                    </center>

                    <center>
                        <div className="cnb">
                            <a href="#Login" className="left">Cancel</a>
                        </div>
                    </center>

                </div>
            </Form>

        </Stack>
    </Container>
</center>);
export default PasswordReset;