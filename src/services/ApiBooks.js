import axios from 'axios';
import { calculateTotalPages } from '../components/CalculateTotalPages';

const API_URL = 'https://www.anapioficeandfire.com/api/books';

// Récupérer tous les livres avec pagination
export async function getAllBooks(page) {
  try {
    const response = await axios.get(API_URL, {
      params: {
        page: page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
}

// Récupérer un livre spécifique par ID
export async function getBookById(bookId) {
  const url = `${API_URL}/${bookId}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching book with ID ${bookId}:`, error);
    throw error;
  }
}

// Récupérer les livres par groupe de cinq avec pagination
export async function getBooksByFive(page) {
  const pageSize = 5;
  const url = `${API_URL}?page=${page}&pageSize=${pageSize}`;

  try {
    const response = await axios.get(url);
    const books = response.data.map((book) => ({
      ...book,
      id: book.url.split('/').pop(),
    }));

    return {
      results: books,
      totalPages: calculateTotalPages(response.headers.link),
    };
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
}
