import React, { useEffect, useState } from 'react'
import MainScreenComponent from './MainScreenComponent'
import './PublicListComponent.css'
import { Container, Row,Card, Col } from 'react-bootstrap';

const MyListComponent = () => {
  const [lists, setLists] = useState([]);
  const [loginState, setLoginState] = useState(false);
  const [selectedList, setselectedList] = useState(null);
  const [listInfo, setListInfo] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleListClick = (hero) => {
    if (selectedList === hero) {
      setselectedList(null); // deselect the superhero when it's clicked again
    } else {
      setselectedList(hero);
    }
  };

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if(userInfo){
      setLoginState(true);
    }
  }, []); // Empty dependency array means this effect runs once on mount
  
  useEffect(() => {
    setLoading(true);
    fetch('/create-list')
      .then((response) => response.json())
      .then((data) => {
        const publicLists = data.filter(list => list.public === true);
        setLists(publicLists);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  useEffect(() => {
    if (lists.length > 0) {
      // Only run if lists is not empty
      Promise.all(lists.map(list =>
        fetch(`list-db/${list.name}`)
          .then((response) => response.json())
      ))
      .then(dataArray => {
        // Sort each results array by lastChanged date in descending order
        const sortedDataArray = dataArray.map(data => {
          if (data.results) {
            data.results.sort((a, b) => new Date(b.lastChanged) - new Date(a.lastChanged));
          }
          return data;
        });
  
        setListInfo(sortedDataArray);
        setLoading(false); // Set loading to false here, after listInfo is set
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
    }
  }, [lists]);
  
  return (
  <MainScreenComponent title="Public-Lists">
     <Row>
      <Container>
        <ul className="public-lists">
          {lists.map((list, index) => (
            <li key={index} className="superhero-item" onClick={() => handleListClick(list)}>
              <Card style={{ height: selectedList === list ? 'auto' : '7rem' }}>
                <Card.Header>{list.name}</Card.Header>
                <Card.Body>
                  <Row className='list-body'>
                    <Col className='list-body-column'>
                      <Card.Text>
                        {!loading && listInfo.length > 0 && listInfo[index] ? (
                          <>
                            <p><strong>Created By:</strong> {listInfo[index].user}</p>
                          </>
                        ) : null}
                      </Card.Text>
                    </Col>
                    <Col className='list-body-column'>
                      <Card.Text>
                        {!loading && listInfo.length > 0 && listInfo[index] ? (
                          <>
                            <p><strong>Last Changed:</strong> {
                              new Date(listInfo[index].lastChanged).toISOString().slice(0, 16)
                            }</p>
                          </>
                        ) : null}
                      </Card.Text>
                    </Col>
                    <Col className='list-body-column'>
                      <Card.Text>
                        <strong>Number of Heroes:</strong> {list.list.length}<br />
                      </Card.Text>
                    </Col>
                    <Col className='list-body-column'>
                      <Card.Text>
                        <strong>Average rating:</strong> {list.rating}<br />
                      </Card.Text>
                    </Col>
                  </Row>
{/* 
                  <Row className='ratings-reviews'>

                  </Row> */}
                  {selectedList === list && listInfo[index] && listInfo[index].results ? (
                    
                   <Card style={{ height: selectedList === list ? 'auto' : '7rem' }}>
                  <Card.Text id='desc-tag'><h5><strong>Description:</strong> {list.description} <br /></h5></Card.Text>

                      <Card.Header>Hero Data</Card.Header>
                      <Card.Body>
                        {listInfo[index].results.map((hero, heroIndex) => (
                          <div key={heroIndex}>
                            <br />
                            <h4><strong>Hero Name:</strong> {hero.info.name} <br /></h4>
                            <strong>Publisher:</strong> {hero.info.Publisher} <br />
                            <strong>Powers:</strong> {Object.entries(hero.power).map(([key, value], i) => (
                              <span key={i}>{key}: {value.toString()}, </span>
                            ))}
                            <br />
                            <strong>Race:</strong> {hero.info.Race} <br />
                            <strong>Gender:</strong> {hero.info.Gender} <br />
                            <strong>Eye color:</strong> {hero.info["Eye color"]} <br />
                            <strong>Hair color:</strong> {hero.info["Hair color"]} <br />
                            <strong>Height:</strong> {hero.info.Height} cm <br />
                            <strong>Skin color:</strong> {hero.info["Skin color"]} <br />
                            <strong>Alignment:</strong> {hero.info.Alignment} <br />
                            <strong>Weight:</strong> {hero.info.Weight} kg
                          </div>
                      
                        ))}
                      </Card.Body>
                    </Card>
                  ) : null}
                </Card.Body>
              </Card>
            </li>
          ))}
        </ul>
      </Container>
    </Row>
  </MainScreenComponent>      
    
  );
}

export default MyListComponent;

