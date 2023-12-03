import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Card, Container, Row, Col, Form} from 'react-bootstrap';
import './AdminComponent.css'
import MainScreenComponent from './MainScreenComponent';
import { set } from 'mongoose';
const AdminComponent = () => {
    const [users, setUsers] = useState([]);
    const [isMainAdmin, setIsMainAdmin] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isFlagged, setIsFlagged] = useState(false);

    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
    const username = userInfo ? userInfo.username : null;
    const [reviews, setReviews] = useState([]);

    const [toolsDescription, setToolsDescription] = useState('');
    const [dmcaTakedownProcedure, setDmcaTakedownProcedure] = useState('');
    const [editToolsDescription, setEditToolsDescription] = useState('');
    const [editDmcaTakedownProcedure, setEditDmcaTakedownProcedure] = useState('');

    
    
    useEffect(() => {});


    useEffect(() => {
        if(username === 'admin') {
            setIsMainAdmin(true);
            console.log('Admin is logged in')
        }
        if(userInfo.isAdmin){            
            setIsAdmin(true);
        }
      
        }
    , [isAdmin, isMainAdmin]);
    useEffect(() => {
        const fetchData = async () => {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).token : null}`
                },
            }

            const { data } = await axios.get('/api/users', config);
            const filteredData = data.filter(user => user.username !== 'admin');
            setUsers(filteredData);

            const { data: listsData } = await axios.get('/api/reviews/all', config);
            setReviews(listsData);
        }

        fetchData();
    }, []);
   
const handleDeactivate = async (id) => {
    const user = users.find((user) => user._id === id);
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).token : null}`
        },
    }

    const { data } = await axios.put(`/api/users/${id}`, { isFlagged: !user.isFlagged }, config);
    setUsers(users.map(user => user._id === id ? data : user));
}
const handleAdminToggle = async (id) => {
    const user = users.find((user) => user._id === id);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).token : null}`
      },
    }
  
    const { data } = await axios.put(`/api/users/${id}`, { isAdmin: !user.isAdmin }, config);
    setUsers(users.map(user => user._id === id ? data : user));
  }
const toggleFlag = async (reviewId) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).token : null}`
        },
    }

    const { data } = await axios.put(`/api/reviews/${reviewId}`, {}, config);
    
    // Update the reviews state
    setReviews(reviews.map((review) => review._id === reviewId ? {...review, flagged: !review.flagged} : review));
}

// ...


const handleUpdateToolsDescription = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).token : null}`,
        },
      };

      const updatedToolsPolicy = {
        policyDescription: editToolsDescription,
      };

      const response = await axios.put('/api/admin/toolsDescription', updatedToolsPolicy, config);

      // Update the state with the new tools description
      setToolsDescription(response.data.policyDescription);
    } catch (error) {
      console.error('Error updating tools description:', error);
      // Handle errors as needed
    }
  };

  const handleUpdateDmcaTakedownProcedure = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).token : null}`,
        },
      };

      const updatedDmcaPolicy = {
        policyDescription: editDmcaTakedownProcedure,
      };

      const response = await axios.put('/api/admin/dmcaTakedownProcedure', updatedDmcaPolicy, config);


      // Update the state with the new DMCA takedown procedure
      setDmcaTakedownProcedure(response.data.policyDescription);
    } catch (error) {
      console.error('Error updating DMCA takedown procedure:', error);
      // Handle errors as needed
    }
  };
  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        // const response1 = await fetch('/api/admin/toolsDescription');
        // const data1 = await response1.json();
        // setEditToolsDescription(data1.policyDescription);

        const response2 = await fetch('/api/admin/dmcaTakedownProcedure');
        const data2 = await response2.json();
        setEditDmcaTakedownProcedure(data2.policyDescription);
      } catch (error) {
        console.error('Failed to fetch policies:', error);
      }
    };

    fetchPolicies();
  }, []);

const recordTakedown = async (id) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).token : null}`
      },
    }

    const response = await axios.post(`/api/dispute/${id}`, {}, config);
    const data = await response.data;

    if (!response.ok) {
      throw new Error(data.message || 'Could not record takedown.');
    }

    // Update the reviews in the state to mark the review as taken down
  } catch (error) {
    console.error('Failed to record takedown:', error);
  }
};
    if(isAdmin){
    return (
            <MainScreenComponent title= 'Admin Terminal'>
                <Container>
                    <div className='section-title'>
                        <h2>Users</h2>
                    </div>
                    <Row>
                        {users.map(user => (
                            <Col md={4} key={user._id}>
                                <Card>
                                    <Card.Header as="h5">{user.username}</Card.Header>
                                    <Card.Body>
                                        <Card.Title>{user.email}</Card.Title>
                                       
                                        {isMainAdmin ? (
                                            <Button variant="secondary" className="no-hover-move" onClick={() => handleAdminToggle(user._id)}>
                                            {user.isAdmin ? 'Remove Administrator' : 'Give Administrator'}
                                          </Button>
                                        ): null}
                                       <Button variant="danger" className="no-hover-move" onClick={() => handleDeactivate(user._id)}>
                                        {user.isFlagged ? 'Activate' : 'Deactivate'}
                                    </Button> 
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <Row>

                    <div className='section-title'>
                        <h2>Reviews</h2>
                    </div>

                    {reviews.map(review => (
                        
                        <Col md={4} key={review._id}>
                            

                        <Card>
                          <Card.Header as="h5">{review.user}</Card.Header>
                          <Card.Body>
                            <Card.Title>{review.comment}</Card.Title>
                            <Card.Text>
                              {review.rating}/5
                            </Card.Text>
                            <Button variant='danger' onClick={() => toggleFlag(review._id)}>{review.flagged ? 'Unflag Review' : 'Flag Review'}</Button>
                            <Button variant='warning' href = {`/dispute/${review._id}`} onClick={() => recordTakedown(review._id)}>Record Takedown</Button>
                          </Card.Body>
                        </Card>
                        </Col>
                    ))}
                    </Row>

                    <Row>
          <div className="section-title">
            <h2>Policies</h2>
          </div>
          <Col md={6}>
            <Form>
              {/* <Form.Group controlId="toolsDescription">
                <Form.Label>Tools Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={editToolsDescription}
                  onChange={(e) => setEditToolsDescription(e.target.value)}
                />
                <Button variant="primary" onClick={handleUpdateToolsDescription}>
                  Update Tools Description
                </Button>
              </Form.Group> */}
            </Form>
          </Col>
          <Col md={12}>
            <Form>
              <Form.Group controlId="dmcaTakedownProcedure">
                <Form.Label>DMCA Takedown Procedure</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={editDmcaTakedownProcedure}
                  onChange={(e) => setEditDmcaTakedownProcedure(e.target.value)}
                />
                <Button variant="primary" onClick={handleUpdateDmcaTakedownProcedure}>
                  Update DMCA Takedown Procedure
                </Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
                </Container>
            </MainScreenComponent>
        
    )}
    else{
        return(
            <MainScreenComponent title= 'Admin Terminal'>
                <h1>Access Denied</h1>
            </MainScreenComponent>
        )
    }
}

export default AdminComponent;