//profileManagement.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card, Container } from "react-bootstrap";

const ProfileManagement = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    fullName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipcode: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile Data:', profile);

    navigate('/fuel-quote');
  };

  const states = ["NY", "CA", "TX", "FL", "PA"]; 

  return (
    <Container>
      <div className="d-flex justify-content-center">
        <Card style={{ width: '40rem' }}>
          <Card.Body>
            <div className="m-4">
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formFullName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter full name"
                    maxLength="50"
                    required
                    name="fullName"
                    value={profile.fullName}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="formAddress1">
                  <Form.Label>Address 1</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="1234 Main St"
                    maxLength="100"
                    required
                    name="address1"
                    value={profile.address1}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="formAddress2">
                  <Form.Label>Address 2</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Apartment, studio, or floor"
                    maxLength="100"
                    name="address2"
                    value={profile.address2}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="formCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="City"
                    maxLength="100"
                    required
                    name="city"
                    value={profile.city}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="formState">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    as="select"
                    required
                    name="state"
                    value={profile.state}
                    onChange={handleChange}
                  >
                    <option value="">Choose...</option>
                    {states.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="formZipcode">
                  <Form.Label>Zipcode</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Zipcode"
                    maxLength="9"
                    required
                    pattern="\d{5}(-\d{4})?"
                    name="zipcode"
                    value={profile.zipcode}
                    onChange={handleChange}
                  />
                  <Form.Text className="text-muted">
                    Enter a 5-digit code or a 9-digit code with a dash.
                  </Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
                
              </Form>
            </div>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default ProfileManagement;
