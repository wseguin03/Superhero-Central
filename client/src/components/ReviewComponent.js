import React, { useState, useEffect } from 'react';
import MainScreenComponent from './MainScreenComponent';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const ReviewComponent = () => {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [list, setList] = useState(null);
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userInfo.token}`
          },
        };
        const { data } = await axios.get(`/api/lists/${id}`, config);
        setList(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchList();
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userInfo.token}`
        },
      };
      const requestBody = {
        rating: Number(rating),
        comment,
      };
      const { data } = await axios.post(
        `/api/lists/${id}/reviews`,
        requestBody,
        config
      );

      setReviews(prevReviews => [...prevReviews, data]);
      setRating('');
      setComment('');

      // Redirect to the public lists page after submitting the review
      window.location.href = '/public-lists';
    } catch (error) {
      setError(error.response && error.response.data.message
        ? error.response.data.message
        : error.message);
    }
  }

  return (
    <>
      {list && (
        <MainScreenComponent title={`Review List: ${list.name}`}>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="rating">
              <Form.Label>Rating</Form.Label>
              <Form.Control as="select" value={rating} onChange={(e) => setRating(e.target.value)}>
                <option value="">Select Rating</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="comment">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type='submit'>
              Review List
            </Button>
          </Form>
        </MainScreenComponent>
      )}
    </>
  );
};

export default ReviewComponent;
