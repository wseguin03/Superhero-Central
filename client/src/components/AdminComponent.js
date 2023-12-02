import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Card, Container, Row, Col} from 'react-bootstrap';
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
                            <Button variant='danger' onClick={() => toggleFlag(review._id)}>{review.flagged ? 'Unflag Review' : 'Flag Review'}</Button>                            </Card.Body>
                        </Card>
                        </Col>
                    ))}
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