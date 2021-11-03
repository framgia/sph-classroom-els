import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import style from './index.module.css';

const Registration = () => {
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
      <Container style={{marginTop:'132px'}}>
          <Stack gap={2} className="col-md-5 mx-auto" id={style.log01}>
              <Form>
                  <div>
                      <Form.Group className="mb-3" controlId="CurrentPassword">
                          <Form.Label><h5>Name</h5></Form.Label>
                          <Form.Control  className="cntrs" type="password" placeholder="Input Username" />
                          <Form.Text className="text-muted">
                          </Form.Text>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="CurrentPassword">
                          <Form.Label><h5>Email</h5></Form.Label>
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

                      <Form.Group className="mb-3" controlId="NewPassword">
                          <Form.Label><h5>Password</h5></Form.Label>
                          <Form.Control  className="cntrs" type="password" placeholder="************" />
                          <Form.Text className="text-muted">
                          </Form.Text>
                      </Form.Group>
                      
                      <center style={{marginTop:'65px'}}>
                          <Button style={{backgroundColor:'green',padding:'10px 30px'}} type="submit">
                          Sign Up
                          </Button>
                      </center>
                      
                      <center>
                          <div className="cnb">
                          <p className={style.sign}>Already have an Account?</p>
                          <h5 className={style.sign}>
                              <a style={{textDecoration:'none'}} href="">Sign In</a>
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

export default Registration;
