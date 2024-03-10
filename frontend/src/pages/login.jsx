import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import { Form, Button, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        navigate('/profile'); 
      } else {
        console.error('Login failed:', await response.text());
        const errorMessage = await response.json();
        setError(errorMessage.error);
      }
    } catch (error) {
      console.error('Login error:', error.message);
      setError("Incorrect Username or Password.");

    }
  };

  return (

    <Container>
      <div className="d-flex justify-content-center">
        <Card style={{ width: '40rem' }}>
          <Card.Body>
            <div className="m-4">
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicUsername">
                  <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Form.Control
                      type="text"
                      placeholder="Username"
                      name="username"
                      value={loginData.username}
                      onChange={handleChange}
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
                  value={loginData.password}
                  onChange={handleChange}
                  required
                  style={{width: '200px'}}
                  className="form-control-sm"/>
                </div>
                </Form.Group>

                {error && (
                  <div style={{ color: 'red', textAlign: 'center', marginBottom: '10px', fontSize: 'large' }}>
                    {error}
                  </div>
                )}

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
      </div>
    </Container>
  );
};

export default LoginPage