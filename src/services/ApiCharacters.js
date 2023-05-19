import axios from 'axios';
import { getBookById } from './ApiBooks';
import { getHouseById } from './ApiHouses';
import { calculateTotalPages } from '../components/CalculateTotalPages';

const API_URL = 'https://www.anapioficeandfire.com/api/characters';

// Récupérer tous les personnages avec pagination, recherche par nom et statut de vie
export function getCharacters(page, name = '', isAlive = null) {
  const pageSize = 10;
  const url = `${API_URL}?page=${page}&pageSize=${pageSize}&name=${name}&isAlive=${isAlive}`;

  return axios
    .get(url)
    .then((response) => {
      const characters = response.data.map((character) => ({
        ...character,
        id: character.url.split('/').pop(),
      }));

      return {
        results: characters,
        totalPages: calculateTotalPages(response.headers.link),
      };
    })
    .catch((error) => {
      console.error('Error fetching characters:', error);
      throw error;
    });
}

// Récupérer un personnage spécifique par ID
export async function getCharacterById(characterId) {
  const url = `${API_URL}/${characterId}`;

  try {
    const response = await axios.get(url);
    const character = response.data;

    // Récupérer les détails d'allégeance
    const allegiancePromises = character.allegiances.map(async (allegianceUrl) => {
      const allegianceId = allegianceUrl.split('/').pop();
      const allegiance = await getHouseById(allegianceId);
      return {
        name: allegiance.name,
        region: allegiance.region,
        coatOfArms: allegiance.coatOfArms,
        words: allegiance.words,
      };
    });

    const allegiances = await Promise.all(allegiancePromises);

    // Récupérer les détails des livres
    const bookPromises = character.books.map(async (bookUrl) => {
      const bookId = bookUrl.split('/').pop();
      const book = await getBookById(bookId);
      return {
        name: book.name,
        numberOfPages: book.numberOfPages,
        released: book.released,
      };
    });

    const books = await Promise.all(bookPromises);

    // Mettre à jour l'objet character avec les détails d'allégeance et de livre
    character.books = books;
    character.allegiances = allegiances;

    console.log(character);
    return character;
  } catch (error) {
    console.error(`Error fetching character with ID ${characterId}:`, error);
    throw error;
  }
}
