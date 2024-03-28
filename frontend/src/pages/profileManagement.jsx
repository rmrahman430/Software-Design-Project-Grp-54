import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card, Container, ListGroup  } from "react-bootstrap";
import { useCookies } from 'react-cookie';
import { ToastContainer } from "react-toastify";
import axios from 'axios';

const ProfileManagement = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [profileDetails, setProfileDetails] = useState([]);

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
            const response = await axios.get('http://localhost:4000/profile/retrieval');
            setProfileDetails(response.data);
        } catch (error) {
            console.error('Error fetching tracking data:', error);
        }
    };

    fetchProfileDetails();
    }, []); 

    const jwt = cookies.jwt;
    const parts = jwt.split('.');
    const header = JSON.parse(atob(parts[0]));
    const payload = JSON.parse(atob(parts[1]));

    const userId = payload.id;

    const filteredProfile = profileDetails.filter(profile => profile.user === userId);
    console.log(userId);

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
              <Form>
                <ListGroup>
                {filteredProfile.map(profile => (
                <React.Fragment key={profile.user}>
                    <ListGroup.Item><strong>Full Name:</strong> {profile.fullname}</ListGroup.Item>
                    <ListGroup.Item><strong>Address 1:</strong> {profile.address1}</ListGroup.Item>
                    <ListGroup.Item><strong>Address 2:</strong> {profile.address2}</ListGroup.Item>
                    <ListGroup.Item><strong>City:</strong> {profile.city}</ListGroup.Item>
                    <ListGroup.Item><strong>State:</strong> {profile.state}</ListGroup.Item>
                    <ListGroup.Item><strong>Zipcode:</strong> {profile.zipcode}</ListGroup.Item>
                    </React.Fragment>
                  ))}
                </ListGroup>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>

                  <Button variant="primary" type="submit" style={{ width: '30%' }} onClick={() => navigate('/updateprofile')}>
                    Update Info
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

export default ProfileManagement;
