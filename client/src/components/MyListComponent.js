import React, { useState, useEffect, Fragment } from 'react';
import { Button, Form, Container, Row, Card} from 'react-bootstrap';
import Fuse from 'fuse.js';
import './MyListComponent.css';


const MyListComponent = () => {
  const [name, setName] = useState('');
  const [publisher, setPublisher] = useState('');
  const [race, setRace] = useState('');
  const [power, setPower] = useState('');
  const [searchResults, setSearchResults] = useState([]);  
  const [backendData, setBackendData] = useState([]);

  
    const [selectedHero, setSelectedHero] = useState(null);

    
const handleHeroClick = (hero) => {
    if (selectedHero === hero) {
      setSelectedHero(null); // deselect the superhero when it's clicked again
    } else {
      setSelectedHero(hero);
    }
  };

  
  useEffect(() => {
    fetch('/info-db')
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)
        setBackendData(data);
        // console.log("Backend Data: "+ backendData)
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);
//   console.log("Backend Data: "+ backendData)
  const fuseOptions = {
    keys: ['name', 'Publisher', 'Race', 'Power'], // Adjust keys based on your backendData structure
    includeScore: true,
    threshold: 0.3
  };

  const fuse = new Fuse(backendData, fuseOptions);

  
  const performSearch = () => {
    const searchCriteria = { name, Publisher: publisher, Race: race, Power: power };
    let intersectionResults = [];
  
    // Loop through each non-empty field and update search results
    Object.keys(searchCriteria).forEach((field) => {
      if (searchCriteria[field]) {
        const results = fuse.search(searchCriteria[field]);
        intersectionResults = intersectionResults.length === 0
          ? results.map((result) => result.item)
          : intersectionResults.filter((hero) => results.some((result) => result.item.id === hero.id));
      }
    });
    setSearchResults(intersectionResults.length > 0 ? intersectionResults : backendData.slice(0, 10));
    console.log("Search Results: ", intersectionResults);
  };
  


  const userInfo = localStorage.getItem('userInfo');
  const user = JSON.parse(userInfo);

  return (
    <>
        <Row className='search-input'>
                <Container>
                  <Form>
                    <Form.Group controlId="name-search">
                      <Form.Label>Search by name</Form.Label>
                      <Form.Control type="name" placeholder="Enter a hero name" onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="publisher-search">
                      <Form.Label>Search by publisher</Form.Label>
                      <Form.Control type="publisher" placeholder="Enter a publisher" onChange={(e) => setPublisher(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="race-search">
                      <Form.Label>Search by race</Form.Label>
                      <Form.Control type="race" placeholder="Enter a race" onChange={(e) => setRace(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="power-search">
                      <Form.Label>Search by power</Form.Label>
                      <Form.Control type="power" placeholder="Enter a power" onChange={(e) => setPower(e.target.value)} />
                    </Form.Group>
                  

                    <Button variant="primary" onClick={performSearch}>
                      Search
                    </Button>
                  </Form>
                  {/* <SearchResults backendData={backendData} search={search} /> */}
                </Container>
        </Row>
        <Row className='search-results'>
        <Container>
    <ul className="superhero-list">
    
      {searchResults.map((hero, index) => (
        <li key={index} className="superhero-item" onClick={() => handleHeroClick(hero)}>
          <Card style={{ height: selectedHero === hero ? '20rem' : '7rem' }}>
            <Card.Header>{hero.name}</Card.Header>
            <Card.Body>
              <Card.Text>
              <strong>Publisher:</strong> {hero.Publisher} <br />
                {selectedHero === hero && (
                  <>
                    <br />
                    <strong>Race:</strong> {hero.Race} <br />
                    <strong>Gender:</strong> {hero.Gender} <br />
                    <strong>Eye color:</strong> {hero["Eye color"]} <br />
                    <strong>Hair color:</strong> {hero["Hair color"]} <br />
                    <strong>Height:</strong> {hero.Height} cm <br />
                    <strong>Skin color:</strong> {hero["Skin color"]} <br />
                    <strong>Alignment:</strong> {hero.Alignment} <br />
                    <strong>Weight:</strong> {hero.Weight} kg
                  </>
                )}
              </Card.Text>
            </Card.Body>
          </Card>
        </li>
      ))}
    </ul>
  </Container>

    </Row>
    </>
      );
    };


export default MyListComponent;
