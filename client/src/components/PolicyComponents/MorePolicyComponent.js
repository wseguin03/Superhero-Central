import React, { useEffect, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

import MainSreenComponent from '../MainScreenComponent';
const MorePolicyComponent = () => {
  const [policies, setPolicies] = useState([]);
  const [policyName, setPolicyName] = useState('');
  const [policyDescription, setPolicyDescription] = useState('');
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    if(userInfo && userInfo.isAdmin) {
      setIsAdmin(true);
    }
  }, [userInfo]);
  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await axios.get('/api/admin/more');
        const filteredPolicies = response.data.filter(policy => policy.policyName !== 'dmcaTakedownProcedure');
        setPolicies(filteredPolicies);
      } catch (error) {
        console.error('Failed to fetch policies:', error);
      }
    };

    fetchPolicies();
  }, []);

  const handleCreate = async () => {
    try {

      if (userInfo && isAdmin) {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const response = await axios.post('/api/admin/', { name: policyName, policyDescription }, config);
        setPolicies([...policies, response.data]);
      } else {
        console.error('Unauthorized');
      }
    } catch (error) {
      console.error('Failed to create policy:', error);
    }
  };

  // const handleUpdate = async () => {
  //   try {
  //     const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  //     if (userInfo && userInfo.isAdmin) {
  //       const config = {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${userInfo.token}`,
  //         },
  //       };

  //       const response = await axios.put(`/api/admin/${policyName}`, { policyDescription }, config);
  //       setPolicies(policies.map(policy => policy.policyName === policyName ? response.data : policy));
  //     } else {
  //       console.error('Unauthorized');
  //     }
  //   } catch (error) {
  //     console.error('Failed to update policy:', error);
  //   }
  // };

  return (
    <MainSreenComponent title = 'Superhero-Select Policies'>
      <Container>
        {isAdmin ? (
        <Form>
          <Form.Group controlId="policyName">
            <Form.Label>Policy Name</Form.Label>
            <Form.Control type="text" value={policyName} onChange={(e) => setPolicyName(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="policyDescription">
            <Form.Label>Policy Description</Form.Label>
            <Form.Control type="text" value={policyDescription} onChange={(e) => setPolicyDescription(e.target.value)} />
          </Form.Group>
          <Button variant="primary" onClick={handleCreate}>Create Policy</Button>
          
          {/* <Button variant="secondary" onClick={handleUpdate}>Update Policy</Button> */}
        </Form>): null}
        {policies.map((policy) => (
  <div key={policy._id}>
    {isAdmin ? (
      <Link to={`/policy/${policy.policyName}`}>
        <h2>{policy.policyName}</h2>
      </Link>
    ) : (
      <h2>{policy.policyName}</h2>
    )}
    <p>{policy.policyDescription}</p>
  </div>
))}
      </Container>
    </MainSreenComponent>
  );
};

export default MorePolicyComponent;