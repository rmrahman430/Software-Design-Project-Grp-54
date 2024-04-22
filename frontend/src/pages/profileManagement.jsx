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
  const [isFetching, setIsFetching] = useState(true);

  
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
          const userData = response.data.profiles.filter(profile => profile.user === userId);
          if(!userData) {
            console.log("no profile match");
          } else {
            setProfileDetails(userData);
            console.log(userData);
          }
        })
        .catch(error => console.error('Error:', error));
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchProfileDetails();
    setIsFetching(false);
  }, [cookies]); 

  console.log("test",profileDetails._id);

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
                {isFetching ? (
                  <p>Loading profile information...</p>  // Display loading message during fetch
                ) : profileDetails.length > 0 ?(
                  <ListGroup>
                    {profileDetails.map((profile) => (
                      <React.Fragment key={profile._id}>
                        <ListGroup.Item><strong>Full Name:</strong> {profile.fullname}</ListGroup.Item>
                        <ListGroup.Item><strong>Address 1:</strong> {profile.address1}</ListGroup.Item>
                        <ListGroup.Item><strong>Address 2:</strong> {profile.address2}</ListGroup.Item>
                        <ListGroup.Item><strong>City:</strong> {profile.city}</ListGroup.Item>
                        <ListGroup.Item><strong>State:</strong> {profile.state}</ListGroup.Item>
                        <ListGroup.Item><strong>Zipcode:</strong> {profile.zipcode}</ListGroup.Item>
                      </React.Fragment>
                    ))}
                  </ListGroup>
                ) : (
                  <p>No profile details retrieved.</p>
                )}
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
