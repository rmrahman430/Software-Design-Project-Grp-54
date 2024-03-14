import "bootstrap/dist/css/bootstrap.min.css"
import React, { useState, useEffect } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";


const LoginPage = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: "", password: "" });

  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/login",
        {
          ...values,
        },
        { withCredentials: true }
      );
      if (data) {
        if (data.errors) {
          const { username, password } = data.errors;
          if (username) generateError(username);
          else if (password) generateError(password);
        } else {
          navigate("/profile");
          window.location.reload();
        }
      }
    } catch (ex) {
      console.log(ex);
    }
  };
  return (

    <Container>
      <div className="d-flex justify-content-center">
        <Card style={{ width: '40rem' }}>
          <Card.Body>
            <div className="m-4">
              <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group controlId="formBasicUsername">
                  <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Form.Control
                      type="text"
                      placeholder="Username"
                      name="username"
                      onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                      required
                      style={{width: '200px'}}
                      className="form-control-sm"/>
                  </div>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Form.Text className="text-muted" style={{padding: '10px'}} >
                    Please enter your unique username.
                    </Form.Text>
                    </div>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                <div style={{display: 'flex', justifyContent: 'center'}}>
                  <Form.Control 
                  type="password" 
                  placeholder="Password" 
                  name="password"
                  onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                  required
                  style={{width: '200px'}}
                  className="form-control-sm"/>
                </div>
                </Form.Group>

                <div style={{display: 'flex', justifyContent: 'center', paddingTop: "10px"}}>
                  <Button variant="primary" type="submit">
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
        <ToastContainer />
      </div>
    </Container>
  );
};

export default LoginPage