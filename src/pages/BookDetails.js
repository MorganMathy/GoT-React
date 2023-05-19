import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Card, ListGroup, Tab, Nav, Spinner } from 'react-bootstrap';
import { getBookById } from '../services/ApiBooks';
import { formatReleaseDate } from '../components/FormatDate';

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fonction de récupération des détails du livre depuis l'API
  const fetchBook = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getBookById(id);
      setBook(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching book:', error);
      setLoading(false);
    }
  }, [id]);

  // Appel de la fonction de récupération des détails du livre au chargement du composant
  useEffect(() => {
    fetchBook();
  }, [fetchBook]);

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (!book) {
    return <div>Book not found.</div>;
  }

  return (
    <div>
      <h2>{book.name}</h2>
      <Card>
        <Tab.Container id="book-details-tabs" defaultActiveKey="general">
          <Card.Header>
            <Nav variant="tabs">
              <Nav.Item>
                <Nav.Link eventKey="general">General</Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>
          <Card.Body>
            <Tab.Content>
              <Tab.Pane eventKey="general">
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <strong>ISBN:</strong> {book.isbn}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Authors:</strong>{' '}
                    {book.authors.map((author) => author)}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Number of Pages:</strong> {book.numberOfPages}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Publisher:</strong> {book.publisher}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Country:</strong> {book.country}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Released:</strong>{' '}
                    {formatReleaseDate(book.released)}
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

export default BookDetails;
