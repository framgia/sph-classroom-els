import React from 'react';
import '../css/GlobalStyle.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Navigationbar from '../Navbar';
import style from './Login.module.css'

const Login = () => {
  return (
    <Navigationbar />,
    <Container style={{marginTop:'200px'}}>
        <Stack gap={2} className="col-md-5 mx-auto" id={style.log01}>
            <Form>
                <div>
                    <Form.Group className="mb-3" controlId="CurrentPassword">
                        <Form.Label><h5>Username</h5></Form.Label>
                        <Form.Control  className="cntrs" type="password" placeholder="Input Username" />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="NewPassword">
                        <Form.Label><h5>Password</h5></Form.Label>
                        <Form.Control  className="cntrs" type="password" placeholder="************" />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <h5 className={style.sign}>
                        <a style={{textDecoration:'none'}} href="">Forgot password?</a>
                    </h5>
                    
                    <center>
                        <Button style={{backgroundColor:'green',padding:'10px 30px'}} type="submit">
                        Sign In
                        </Button>
                    </center>
                    
                    <center>
                        <div className="cnb">
                        <p className={style.sign}>No Account Yet?</p>
                        <h5 className={style.sign}>
                            <a style={{textDecoration:'none'}} href="">Sign Up</a>
                        </h5>
                        </div>
                    </center>
                </div>
            </Form>
        </Stack>
    </Container >
  );
};
export default Login;