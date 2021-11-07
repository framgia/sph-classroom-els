import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import style from './index.module.css';

const Login = () => {
  return (
    <div>
      <div>
        <div>
          <Navbar id={style.navbar} expand="lg">
            <Container fluid>
              <Navbar.Brand id={style.title}>E-Learning</Navbar.Brand>
            </Container>
          </Navbar>
        </div>
      </div>
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

                      <p className={style.sign}>
                          <a style={{textDecoration:'none'}} href="/reset-password">Forgot password?</a>
                      </p>
                      
                      <center>
                          <Button className={style.Btncolor} type="submit">
                          <h5>Sign In</h5>
                          </Button>
                      </center>
                      
                      <center>
                          <div className="cnb">
                          <p className={style.sign}>No Account Yet?</p>
                          <h5 className={style.sign}>
                              <a style={{textDecoration:'none'}} href="/registration">Sign Up</a>
                          </h5>
                          </div>
                      </center>
                  </div>
              </Form>
          </Stack>
      </Container >
    </div>
  );
};

export default Login;
