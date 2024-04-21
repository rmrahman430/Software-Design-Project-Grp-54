import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card, Container } from "react-bootstrap";
import { useCookies } from 'react-cookie';
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';

const ProfileUpdate = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [profileData, setProfileData] = useState({
    fullname: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipcode: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/profile/update", {...profileData},
        { withCredentials: true }
      );
      console.log(response.data);
      if (response.data.created) {
        toast.success("Profile created successfully!");
        window.location.reload();
      } else if (response.data.updated) {
        toast.success("Profile updated successfully!")
        navigate('/profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error("Failed to update profile.");
    }
  };

  useEffect(() => {
    const verifyUser = async () => {
      try {
        if (!cookies.jwt) {
          navigate("/login");
        } else {
          const { data } = await axios.post("http://localhost:4000/profile", {}, { withCredentials: true });
          if (!data || !data.status) {
            removeCookie("jwt");
            navigate("/login");
          } else {
            console.log('success');
          }
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);

  useEffect(() => {

    const fetchProfileDetails = async () => {
      try {
        axios.get('http://localhost:4000/profile/retrieval')
        .then(response => {
          const jwt = cookies.jwt;
          const parts = jwt.split('.');
          const payload = JSON.parse(atob(parts[1]));
          const userId = payload.id;
          const userData = response.data.filter(profile => profile.user === userId);
          if(!userData) {
            console.log("no profile match");
          } else {
            setProfileData(userData[0]);
          }
        })
        .catch(error => console.error('Error:', error));
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchProfileDetails();
  }, [cookies]);

  const states = ["NY", "CA", "TX", "FL", "PA", "FL"];

  const logOut = () => {
    removeCookie("jwt");
    navigate('/login');
    window.location.reload();
  } 

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
                    name="fullname"
                    value={profileData?.fullname}
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
                    value={profileData?.address1}
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
                    value={profileData?.address2}
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
                    value={profileData?.city}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="formState">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    as="select"
                    required
                    name="state"
                    value={profileData?.state}
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
                    maxLength="5"
                    required
                    pattern="\d{5}(-\d{4})?"
                    name="zipcode"
                    value={profileData?.zipcode}
                    onChange={handleChange}
                  />
                  <Form.Text className="text-muted">
                    Enter a 5-digit code.
                  </Form.Text>
                </Form.Group>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>

                  <Button variant="primary" type="submit" style={{ width: '30%' }}>
                    Submit
                  </Button>

                  <Button className="private" type="submit" onClick={logOut} style={{ width: '30%' }}>
                    Log Out
                  </Button>    

                </div>
              </Form>
            </div>
          </Card.Body>
        </Card>
        <ToastContainer />
      </div>
    </Container>
  );
};

export default ProfileUpdate;
