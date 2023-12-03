import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Container, Form } from 'react-bootstrap';

const PolicyComponent = () => {
  const { name } = useParams();
  const [policy, setPolicy] = useState('');
  const [editPolicy, setEditPolicy] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    setIsAdmin(userInfo && userInfo.isAdmin);

    const fetchPolicy = async () => {
      try {
        const response = await fetch(`/api/admin/${name}`);
        const data = await response.json();
        setPolicy(data.policyDescription);
        setEditPolicy(data.policyDescription);
      } catch (error) {
        console.error('Failed to fetch policy:', error);
      }
    };

    fetchPolicy();
  }, [name]);
  
  const handleEdit = async () => {
    if(isAdmin){
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const response = await fetch(`/api/admin/${name}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userInfo.token}`
        },
        body: JSON.stringify({ policyDescription: editPolicy }),
      });
      const data = await response.json();
      setPolicy(data.policyDescription);
    } catch (error) {
      console.error('Failed to update policy:', error);
    }
  }else{
    alert("You are not authorized to edit this policy");
  
  }
  
}

  return (
    <Container>
      <p>{policy}</p>
      {isAdmin && (
        <>
          <Form.Control
            as="textarea"
            rows={5}
            value={editPolicy}
            onChange={(e) => setEditPolicy(e.target.value)}
          />
          <Button onClick={handleEdit}>Edit</Button>
        </>
      )}
    </Container>
  );
};

export default PolicyComponent;