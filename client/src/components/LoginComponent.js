import React, { useEffect, useState } from 'react';
import MainScreenComponent from './MainScreenComponent';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import './LoginComponent.css';
import axios from 'axios';
import Loading from './Loading';
import ErrorMessage from './ErrorMessage';
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {
    const [userFlagged, setUserFlagged] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loginState, setLoginState] = useState(false);
    
const navigate = useNavigate();

const submitHandler = async (e) => {
  e.preventDefault();

  try {
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }
    setLoading(true)
    const { data } = await axios.post('/api/users/login', { email, password }, config)

    console.log(data);
    localStorage.setItem('userInfo', JSON.stringify(data));

    setLoading(false)
    setError(false)
    setLoginState(true);
    navigate('/') // Redirect to '/'
  } catch (error) {
    setError(error.response.data.message)
    setLoading(false)
  }
}

// const login = async (e) => {
//   e.preventDefault();

//   try {
//     const { data } = await axios.post('/api/users/login', { email, password });

//     if (!data.isVerified) {
//       setError('Please verify your account to login');
//       return;
//     }

//     // ...rest of login logic
//   } catch (error) {
//     setError(error.response.data.message);
//   }
// };

// ...rest of component



    return (
        <MainScreenComponent title='Login'>
            <div className='login-container'>
                {error &&<ErrorMessage variant='danger'>{error}</ErrorMessage>}
                {loading && <Loading/>}
            <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email"  onChange={(e)=>setEmail(e.target.value)}/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
      </Form.Group>
      {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group> */}
        <Button variant="primary" type="submit">
          Sign in
        </Button>
      
      
      <Row className='login-register'>
  <Col>
    New Member? <a href='/register'>Register Here!</a>
  </Col>
</Row>
    </Form>
            </div>
        </MainScreenComponent>
    );
}

export default LoginComponent;