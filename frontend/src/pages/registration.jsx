//registration.jsx 
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";


const Registration = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: '',
    password: '',
    name: '',
    email: '',
  });

  const generateError = (error) =>
    toast.error(error, {
      position: "top-left",
    });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:4000/register", {
        ...values, 
      },{
        withCredentials: true,
      });
      if (data) {
        if(data.errors) {
          const { username, password, email } = data.errors;
          if(username) generateError(username);
          if(email) generateError(email);
          else if (password) generateError(password);
        } else {
          navigate("/login");
        }
      }
    } catch(err) {
      console.log(err);
    }
  };

  return (
    <div className="registration-container">
      <h2>Create your account</h2>

      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange= {(e) => setValues({...values, [e.target.name]: e.target.value})}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange= {(e) => setValues({...values, [e.target.name]: e.target.value})}
            required
          />
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange= {(e) => setValues({...values, [e.target.name]: e.target.value})}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange= {(e) => setValues({...values, [e.target.name]: e.target.value})}
            required
          />
        </div>
        <button type="submit">Create your account</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Registration;
