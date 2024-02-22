//login.jsx
import React from "react";

import "bootstrap/dist/css/bootstrap.min.css"
import { Form, Button, Card, Container } from "react-bootstrap";

const LoginPage = () => {
  return (
    <Container>
      <div className="d-flex justify-content-center">
        <Card style={{ width: '40rem' }}>
          <Card.Body>
            <div className="m-4">
              <Form>
                <Form.Group controlId="formBasicUsername">
                  <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Form.Control type="text" placeholder="Username" required style={{width: '200px'}} className="form-control-sm"/>
                  </div>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Form.Text className="text-muted" style={{padding: '10px'}} >
                    Please enter your unique username.
                    </Form.Text>
                    </div>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                <div style={{display: 'flex', justifyContent: 'center'}}>
                  <Form.Control type="password" placeholder="Password" required style={{width: '200px'}} className="form-control-sm"/>
                </div>
                </Form.Group>
                <div style={{display: 'flex', justifyContent: 'center', paddingTop: "10px"}}>
                  <Button variant="primary" type="submit" >
                    Submit
                  </Button>
                </div>
              </Form>
              <div>
                <span><a href="/register">Register Account</a></span>
              </div>
              
            </div>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default LoginPage