import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import MainScreenComponent from "./MainScreenComponent";
import "./RegisterComponent.css";

// import { set } from "mongoose";
import axios from "axios";

function RegisterComponent({ history }) {
  const navigate = useNavigate(); 

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
//   const dispatch = useDispatch();

//   const userRegister = useSelector((state) => state.userRegister);
//   const { loading, error, userInfo } = userRegister;

    
//   useEffect(() => {
//     if (userInfo) {
//       history.push("/");
//     }
//   }, [history, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(email)
    if (password !== confirmpassword) {
      setMessage("Passwords do not match");
    // } else dispatch(register(username, email, password));
    }else{
        setMessage(null)
        try {
            setLoading(true)
            const config = {
                headers:{
                    'Content-type':'application/json'
                }
            }
            const {data} = await axios.post('/api/users',{username,email,password},config)
            console.log(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            setLoading(false)
            setError(false)
            navigate('/login')
        
    }
    catch(error){
        setError(error.response.data.message)
        setLoading(false)
    }
}
  };

  return (
    <MainScreenComponent title="REGISTER">
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="username"
              value={username}
              placeholder="Enter username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmpassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>


          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            Have an Account ? <a href='/login'>Login</a>
          </Col>
        </Row>
      </div>
    </MainScreenComponent>
  );
}

export default RegisterComponent;