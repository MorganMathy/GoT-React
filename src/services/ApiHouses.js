import axios from 'axios';
import { calculateTotalPages } from '../components/CalculateTotalPages';

const API_URL = 'https://www.anapioficeandfire.com/api/houses';

// Récupérer toutes les maisons avec pagination
export function getAllHouses(page) {
  const pageSize = 10;
  const url = `${API_URL}?page=${page}&pageSize=${pageSize}`;

  return axios
    .get(url)
    .then((response) => {
      const houses = response.data.map((house) => ({
        ...house,
        id: house.url.split('/').pop(),
      }));

      return {
        results: houses,
        totalPages: calculateTotalPages(response.headers.link),
      };
    })
    .catch((error) => {
      console.error('Error fetching houses:', error);
      throw error;
    });
}

// Récupérer une maison spécifique par ID
export async function getHouseById(id) {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching house:', error);
    throw error;
  }
}
