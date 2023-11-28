import React, { useState, useEffect, Fragment } from 'react';
import { Button, Form, Container, Row, Card} from 'react-bootstrap';
import Fuse from 'fuse.js';
import './SearchComponent.css';
import MainScreenComponent from './MainScreenComponent';


const SearchComponent = () => {
  const [name, setName] = useState('');
  const [publisher, setPublisher] = useState('');
  const [race, setRace] = useState('');
  const [power, setPower] = useState('');
  const [searchResults, setSearchResults] = useState([]);  
  const [backendData, setBackendData] = useState([]);
  const [selectedListHeros, setSelectedListHeros] = useState([]);
  const [listName, setListName] = useState('');
  const [listDescription, setListDescription] = useState('');

    const [selectedHero, setSelectedHero] = useState();
    // const [selectedHeroCard, setselectedHeroCard] = useState(null);
const handleAddToList = () => {
  if (selectedHero) {
    setSelectedListHeros((prevHeros) => {
      const updatedHeros = [...prevHeros, selectedHero.id];
      console.log("Selected List Heros: ", JSON.stringify(updatedHeros));
      return updatedHeros;
    });
  }
};
    
// console.log("Selected List Heros: ", selectedListHeros);

const handleHeroClick = (hero) => {
    if (selectedHero === hero) {
      setSelectedHero(null); // deselect the superhero when it's clicked again
    } else {
      setSelectedHero(hero);
    }
  };

const clearSelectedHeros = (hero) => {
      setSelectedListHeros([]); // deselect the superhero when it's clicked again
  
  };

  console.log(listName);
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
            const {data} = await axios.post('/create-list',{listName,listDescription,selectedListHeros},config)
            console.log(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            setLoading(false)
            setError(false)
        
    }
    catch(error){
        setError(error.response.data.message)
        setLoading(false)
    }
}
  };









  const userInfo = localStorage.getItem('userInfo');
  const user = JSON.parse(userInfo);

  return (
    <MainScreenComponent title= 'Search For Heros'>
<Row>
        <Container>
          <h3>Create a List</h3>
          <Form>
                    <Form.Group controlId="list-name">
                      <Form.Label>Search by name</Form.Label>
                      <Form.Control type="list-name" placeholder="Enter a list name"
                       onChange={(e) => setListName(e.target.value)}/>
                    </Form.Group>
                   
                    <Form.Group controlId="list-description">
                      <Form.Label>Add a Description</Form.Label>
                      <Form.Control type="list-description" placeholder="Enter a list description"
                      onChange={(e) => setListDescription(e.target.value)}/>
                      
                    </Form.Group>

                    <Button variant="primary">
                      Create List
                    </Button>
                    <Button className = "clear-btn"variant="primary" onClick={clearSelectedHeros}>
                      Clear List
                    </Button>
                  </Form>
          </Container>
</Row>
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
    <ul className="superhero-list-item">
    
      {searchResults.map((hero, index) => (
        <li key={index} className="superhero-item" onClick={() => handleHeroClick(hero)}>
          <Card style={{ height: selectedHero === hero ? 'auto' : '7rem' }}>
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
              <a href={`https://duckduckgo.com/?q=${encodeURIComponent(hero.name)}`} target="_blank" rel="noopener noreferrer">
                <Button color="primary">Search Hero</Button>
                </a>
                <Button className='list-btn'variant="primary" onClick={handleAddToList}>
                      Add to List
                    </Button>
            </Card.Body>
          </Card>
        </li>
      ))}
    </ul>
  </Container>

    </Row>
    </MainScreenComponent>
      );
    };


export default SearchComponent;
