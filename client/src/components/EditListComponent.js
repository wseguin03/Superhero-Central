import React from 'react'
import {Form, Container, Dropdown, Button} from 'react-bootstrap';
import MainScreenComponent from './MainScreenComponent';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const EditListComponent = () => {

const [listName, setListName] = useState('');
  const [listDescription, setListDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedListHeros, setSelectedListHeros] = useState([]);

    const { id } = useParams();

        useEffect(() => {
            const fetchList = async () => {
                const { data } = await axios.get(`/api/lists/${id}`);
                setListName(data.name);
                setListDescription(data.description);
                setIsPublic(data.public);
                setSelectedListHeros(data.list);
            };

            fetchList();
        }, [id]);

       
        const submitHandler = async (e) => {
            e.preventDefault();
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if(userInfo && userInfo.token){
              try{
                const config = {
                  headers:{
                    'Content-type':'application/json',
                    'Authorization': `Bearer ${userInfo.token}`
                  }
                }
                setLoading(true)
                const {data} = await axios.put(`/api/lists/${id}`,{
                  name: listName,
                  description: listDescription, 
                  list: selectedListHeros,
                  public: isPublic,
                  lastChanged: Date.now().toString().slice(0, 16)                
                },config)
                console.log(data)
                setLoading(false)
                setError(false)
              
                // history.push('/mylist')
              }catch(error){
                setError(error.response.data.message)
                setLoading(false)
              }
            }
          }
return (
    <MainScreenComponent title='Edit List'>
      <Container>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="list-name">
            <Form.Label>Edit List Name</Form.Label>
            <Form.Control
              type="list-name"
              placeholder="Enter a list name"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="list-name">
            <Form.Label>Edit List Description</Form.Label>
            <Form.Control
              type="list-description"
              placeholder="Enter a list description"
              value={listDescription}
              onChange={(e) => setListDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="list-publicity">
            <Form.Label>Edit List Publicity</Form.Label>
            <Dropdown>
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                {isPublic ? 'Public' : 'Private'}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setIsPublic(true)}>Public</Dropdown.Item>
                <Dropdown.Item onClick={() => setIsPublic(false)}>Private</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
          <Form.Group>
            <Form.Label>Selected Publicity: {isPublic ? 'Public' : 'Private'}</Form.Label>
          </Form.Group>
          <Form.Group>
            <Button type="submit" variant="primary">
              Submit Changes
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </MainScreenComponent>
  );

};
export default EditListComponent