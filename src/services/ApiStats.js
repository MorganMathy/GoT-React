import axios from 'axios';
import { calculateTotalPages } from '../components/CalculateTotalPages';

const API_URL = 'https://www.anapioficeandfire.com/api';

// Récupérer les statistiques des livres
export async function getBookStats() {
  try {
    let totalBooks = 0;
    let releasedBooks = 0;
    const years = [];
    const bookCounts = [];
    const pagesByBook = [];

    let page = 1;
    let totalPages = 1;

    while (page <= totalPages) {
      const response = await axios.get(`${API_URL}/books?page=${page}`);
      const books = response.data;
      totalPages = calculateTotalPages(response.headers.link);

      totalBooks += books.length;
      releasedBooks += books.filter((book) => book.released).length;

      books.forEach((book) => {
        if (book.released) {
          const year = book.released.split('-')[0];
          if (!years.includes(year)) {
            years.push(year);
            bookCounts.push(1);
          } else {
            const index = years.indexOf(year);
            bookCounts[index]++;
          }
        }

        if (book.numberOfPages) {
          pagesByBook.push({
            name: book.name,
            pages: book.numberOfPages,
          });
        }
      });

      page++;
    }

    return {
      totalBooks,
      releasedBooks,
      years,
      bookCounts,
      pagesByBook,
    };
  } catch (error) {
    console.error('Error fetching book stats:', error);
    throw error;
  }
}

// Récupérer les statistiques des personnages
export async function getCharactersStats() {
  try {
    let totalCharacters = 0;
    let deadCharacters = 0;
    let aliveCharacters = 0;
    let maleCharacters = 0;
    let femaleCharacters = 0;
    let page = 1;
    let totalPages = 1;

    const processCharacters = (characters) => {
      characters.forEach((character) => {
        if (character.died !== "") {
          deadCharacters++;
        }
        if (character.gender === "Male") {
          maleCharacters++;
        }
      });
    };

    while (page <= totalPages) {
      const response = await axios.get(`${API_URL}/characters?page=${page}&pageSize=50`);
      const characters = response.data;
      totalCharacters += characters.length;
      processCharacters(characters);
      totalPages = calculateTotalPages(response.headers.link);
      page++;
    }

    aliveCharacters = totalCharacters - deadCharacters;
    femaleCharacters = totalCharacters - maleCharacters;

    return {
      aliveCharacters,
      deadCharacters,
      femaleCharacters,
      maleCharacters
    };
  } catch (error) {
    console.error('Error fetching characters stats:', error);
    throw error;
  }
}

// Récupérer les statistiques des maisons
export async function getHousesStats() {
  try {
    let housesWithAncestralWeapons = 0;
    let totalHouses = 0;
    let deadHouses = 0;
    let page = 1;
    let totalPages = 1;
    let housesWithoutAncestralWeapons = 0;
    let aliveHouses = 0;

    const processHouses = (houses) => {
      houses.forEach((house) => {
        if (house.diedOut !== "") {
          deadHouses++;
        }
        if (house.ancestralWeapons.some((weapon) => weapon !== "")) {
          housesWithAncestralWeapons++;
        }
      });
    };

    while (page <= totalPages) {
      const response = await axios.get(`${API_URL}/houses?page=${page}&pageSize=50`);
      const houses = response.data;
      totalHouses += houses.length;
      processHouses(houses);
      totalPages = calculateTotalPages(response.headers.link);
      page++;
    }

    aliveHouses = totalHouses - deadHouses;
    housesWithoutAncestralWeapons = totalHouses - housesWithAncestralWeapons;

    return {
      aliveHouses,
      deadHouses,
      housesWithoutAncestralWeapons,
      housesWithAncestralWeapons
    };
  } catch (error) {
    console.error('Error fetching houses stats:', error);
    throw error;
  }
}
