import React, { useState, useEffect } from 'react';
import { getCharacters } from '../services/ApiCharacters';
import { Table, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Pagination from '../components/Pagination';
import Search from '../components/Search';

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchCharacters(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

  // Fonction de récupération des personnages depuis l'API
  async function fetchCharacters(page, name = "") {
    try {
      setLoading(true);
      const data = await getCharacters(page, name);
      setCharacters(data.results);
      setTotalPages(data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching characters:', error);
      setLoading(false);
    }
  }

  // Gestion de la soumission du formulaire de recherche
  function handleSearchSubmit(e) {
    e.preventDefault();
    fetchCharacters(1, searchQuery);
  }

  // Gestion du clic sur un personnage pour afficher les détails
  function handleCharacterClick(character) {
    navigate(`/characters/${character.id}`);
  }

  // Gestion du clic sur la pagination
  function handlePaginationClick(page) {
    setCurrentPage(page);
  }

  return (
    <div>
      <h2 className="text-center mb-4">Characters</h2>
      <Search
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onSubmit={handleSearchSubmit}
      />
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          <Table striped bordered responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Gender</th>
                <th>Culture</th>
                <th>Born</th>
                <th>Died</th>
              </tr>
            </thead>
            <tbody>
              {characters.map((character) => (
                <tr key={character.id} onClick={() => handleCharacterClick(character)}>
                  <td><strong>{character.name}</strong></td>
                  <td>{character.gender}</td>
                  <td>{character.culture}</td>
                  <td>{character.born}</td>
                  <td>{character.died}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="d-flex justify-content-center mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePaginationClick}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Characters;
