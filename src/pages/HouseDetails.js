import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getHouseById } from '../services/ApiHouses';
import { Card, ListGroup, Tab, Nav, Spinner } from 'react-bootstrap';

function HouseDetails() {
  const { id } = useParams();
  const [house, setHouse] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchHouse = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getHouseById(id);
      setHouse(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching house:', error);
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchHouse();
  }, [fetchHouse]);

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (!house) {
    return <div>House not found.</div>;
  }

  return (
    <div>
      <h2>{house.name}</h2>
      <Card>
        <Tab.Container id="house-details-tabs" defaultActiveKey="general">
          <Card.Header>
            <Nav variant="tabs">
              <Nav.Item>
                <Nav.Link eventKey="general">General</Nav.Link>
              </Nav.Item>
              {house.ancestralWeapons && house.ancestralWeapons[0] !== "" && (
                <Nav.Item>
                  <Nav.Link eventKey="ancestralWeapons">Ancestral Weapons</Nav.Link>
                </Nav.Item>
              )}
              <Nav.Item>
                <Nav.Link eventKey="titles">Titles</Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>
          <Card.Body>
            <Tab.Content>
              <Tab.Pane eventKey="general">
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <strong>Region:</strong> {house.region}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Coat of Arms:</strong> {house.coatOfArms}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Words:</strong> {house.words}
                  </ListGroup.Item>
                </ListGroup>
              </Tab.Pane>
              <Tab.Pane eventKey="ancestralWeapons">
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <strong>Ancestral Weapons:</strong>
                    <ul>
                      {house.ancestralWeapons.map((weapon) => (
                        <li key={weapon}>{weapon}</li>
                      ))}
                    </ul>
                  </ListGroup.Item>
                </ListGroup>
              </Tab.Pane>
              <Tab.Pane eventKey="titles">
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <strong>Titles:</strong>
                    <ul>
                      {house.titles.map((title) => (
                        <li key={title}>{title}</li>
                      ))}
                    </ul>
                  </ListGroup.Item>
                </ListGroup>
              </Tab.Pane>
            </Tab.Content>
          </Card.Body>
        </Tab.Container>
      </Card>
    </div>
  );
}

export default HouseDetails;
