import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Dispute = () => {
  const [dateRequestReceived, setDateRequestReceived] = useState('');
  const [dateNoticeSent, setDateNoticeSent] = useState('');
  const [dateDisputeReceived, setDateDisputeReceived] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('');
  const [disputeExists, setDisputeExists] = useState(false);
  const { reviewId } = useParams();
  const navigate = useNavigate();

const config = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).token : null}`
  },
}
function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed in JavaScript
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

useEffect(() => {
  const fetchDispute = async () => {
    try {
      const response = await axios.get(`/api/dispute/${reviewId}`, config);
      const dispute = response.data;

      if (dispute) {
        setDateRequestReceived(dispute.dateRequestReceived ? formatDate(dispute.dateRequestReceived) : '');
        setDateNoticeSent(dispute.dateNoticeSent ? formatDate(dispute.dateNoticeSent) : '');
        setDateDisputeReceived(dispute.dateDisputeReceived ? formatDate(dispute.dateDisputeReceived) : '');
        setNotes(dispute.notes || '');
        setStatus(dispute.status || '');
        setDisputeExists(true);
      } else {
        setDisputeExists(false);
      }
    } catch (error) {
      console.error('Failed to fetch dispute:', error);
    }
  };

  fetchDispute();
}, [reviewId]);
  

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const disputeData = {
      dateRequestReceived: dateRequestReceived.includes('T') ? formatDate(dateRequestReceived) : dateRequestReceived,
      dateNoticeSent: dateNoticeSent.includes('T') ? formatDate(dateNoticeSent) : dateNoticeSent,
      dateDisputeReceived: dateDisputeReceived.includes('T') ? formatDate(dateDisputeReceived) : dateDisputeReceived,
      notes,
      status,
    };

    let response;
    if (disputeExists) {
      response = await axios.put(`/api/dispute/${reviewId}`, disputeData, config);
    } else {
      response = await axios.post(`/api/dispute/${reviewId}`, disputeData, config);
    }
    
      navigate('/admin');
  
    // rest of your code
  } catch (error) {
    console.error('Failed to save dispute:', error);
  }
};

const handleDelete = async () => {
  try {
    const response = await axios.delete(`/api/dispute/${reviewId}`, config);
    navigate('/admin');

  } catch (error) {
    console.error('Failed to delete dispute:', error);
  }
};
// In your form
<Button variant="danger" onClick={handleDelete}>Delete</Button>
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="dateRequestReceived">
          <Form.Label>Date Request Received</Form.Label>
          <Form.Control type="date" value={dateRequestReceived} onChange={(e) => setDateRequestReceived(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="dateNoticeSent">
          <Form.Label>Date Notice Sent</Form.Label>
          <Form.Control type="date" value={dateNoticeSent} onChange={(e) => setDateNoticeSent(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="dateDisputeReceived">
          <Form.Label>Date Dispute Received</Form.Label>
          <Form.Control type="date" value={dateDisputeReceived} onChange={(e) => setDateDisputeReceived(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="notes">
          <Form.Label>Notes</Form.Label>
          <Form.Control as="textarea" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="status">
          <Form.Label>Status</Form.Label>
          <Form.Control as="select" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">Select status</option>
            <option value="Active">Active</option>
            <option value="Processed">Processed</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit" >
          Submit
        </Button>
        <Button variant="danger" onClick={handleDelete}>Delete</Button>
      </Form>
    </Container>
  );
};

export default Dispute;