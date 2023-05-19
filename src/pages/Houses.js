import React, { useEffect, useState } from 'react';
import { getAllHouses } from '../services/ApiHouses';
import { Table, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from '../components/Pagination';

function Houses() {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHouses(currentPage);
  }, [currentPage]);

  async function fetchHouses(page) {
    try {
      setLoading(true);
      const data = await getAllHouses(page);
      setHouses(data.results);
      setTotalPages(data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching houses:', error);
      setLoading(false);
    }
  }

  function handleHouseClick(house) {
    navigate(`/houses/${house.id}`);
  }

  function handlePaginationClick(page) {
    setCurrentPage(page);
  }

  return (
    <div>
      <h2 className="text-center mb-4">Houses</h2>
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
                <th>Region</th>
                <th>Coat of Arms</th>
              </tr>
            </thead>
            <tbody>
              {houses.map((house) => (
                <tr key={house.id} onClick={() => handleHouseClick(house)}>
                  <td>{house.name}</td>
                  <td>{house.region}</td>
                  <td>{house.coatOfArms}</td>
                  <td><Link to={`/houses/${house.id}`}>View Details</Link></td>
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

export default Houses;
