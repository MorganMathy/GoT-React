import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCharacterById } from '../services/ApiCharacters';
import { Card, ListGroup, Tab, Nav } from 'react-bootstrap';

function CharacterDetails() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fonction de récupération des détails du personnage depuis l'API
  const fetchCharacter = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getCharacterById(id);
      setCharacter(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching character:', error);
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCharacter();
  }, [fetchCharacter]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!character) {
    return <div>Character not found.</div>;
  }

  return (
    <div>
      <h2>{character.name}</h2>
      <Card>
        <Tab.Container id="character-details-tabs" defaultActiveKey="general">
          <Card.Header>
            <Nav variant="tabs">
              <Nav.Item>
                <Nav.Link eventKey="general">General</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="books">Books</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="allegiances">Allegiances</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="tvSeries">TV Series</Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>
          <Card.Body>
            <Tab.Content>
              <Tab.Pane eventKey="general">
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <strong>Culture:</strong> {character.culture}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Born:</strong> {character.born}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Died:</strong> {character.died || 'Alive'}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Titles:</strong>
                    <ul>
                      {character.titles.map((title) => (
                        <li key={title}>{title}</li>
                      ))}
                    </ul>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Aliases:</strong>
                    <ul>
                      {character.aliases.map((alias) => (
                        <li key={alias}>{alias}</li>
                      ))}
                    </ul>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Played by:</strong> {character.playedBy}
                  </ListGroup.Item>
                </ListGroup>
              </Tab.Pane>
              <Tab.Pane eventKey="books">
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <strong>Books:</strong>
                    <ul>
                      {character.books.map((book) => (
                        <li key={book.url}>
                          <Link to={`/books/${book.id}`}>{book.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </ListGroup.Item>
                </ListGroup>
              </Tab.Pane>
              {character.allegiances && (
                <Tab.Pane eventKey="allegiances">
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <strong>Allegiances:</strong>
                      <ul>
                        {character.allegiances.map((allegiance) => (
                          <li key={allegiance.url}>
                            <Link to={`/allegiances/${allegiance.id}`}>{allegiance.name}</Link>
                          </li>
                        ))}
                      </ul>
                    </ListGroup.Item>
                  </ListGroup>
                </Tab.Pane>
              )}
              <Tab.Pane eventKey="tvSeries">
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <strong>TV Series:</strong>
                    <ul>
                      {character.tvSeries.map((series) => (
                        <li key={series}>{series}</li>
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

export default CharacterDetails;
