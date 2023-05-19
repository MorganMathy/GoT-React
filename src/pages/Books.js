import React, { useEffect, useState } from 'react';
import { getBooksByFive } from '../services/ApiBooks';
import { Table, Spinner, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { formatReleaseDate } from '../components/FormatDate';

function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchBooks();
  }, []);

  // Fonction de récupération des livres depuis l'API
  async function fetchBooks() {
    try {
      const { results, totalPages } = await getBooksByFive(currentPage);
      setBooks(results);
      setTotalPages(totalPages);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching books:', error);
      setLoading(false);
    }
  }

  // Fonction de chargement de plus de livres
  async function handleLoadMore() {
    if (currentPage < totalPages) {
      setLoading(true);
      try {
        const nextPage = currentPage + 1;
        const { results, totalPages: newTotalPages } = await getBooksByFive(nextPage);
        setBooks(prevBooks => [...prevBooks, ...results]);
        setTotalPages(newTotalPages);
        setCurrentPage(nextPage);
      } catch (error) {
        console.error('Error loading more books:', error);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div>
      <h2 className="text-center mb-4">Books</h2>
      {loading ? ( // Affichage du spinner de chargement si loading est vrai
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <> {/* Fragment React utilisé pour éviter un wrapper div supplémentaire */}
          <Table striped bordered responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Number of Pages</th>
                <th>Released</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr key={index}>
                  <td>{book.name}</td>
                  <td>{book.numberOfPages}</td>
                  <td>{formatReleaseDate(book.released)}</td>
                  <td>
                    <Link to={`/books/${book.id}`}>View Details</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {currentPage < totalPages && ( // Affichage du bouton "Load more" s'il y a encore des pages à charger
            <div className="text-center">
              <Button variant="primary" onClick={handleLoadMore}>
                Load more...
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Books;
