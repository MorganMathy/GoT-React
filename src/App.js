import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Stats from './pages/Stats';
import Books from './pages/Books';
import Characters from './pages/Characters';
import Houses from './pages/Houses';
import CharacterDetails from './pages/CharacterDetails';
import BookDetails from './pages/BookDetails';
import HouseDetails from './pages/HouseDetails';
import './App.scss';

function App() {
  return (
    <BrowserRouter>
  <div>
    <NavBar />
    <Routes>
      <Route path="/" element={<Stats />} />
      <Route path="/books" element={<Books />} />
      <Route path="/characters" element={<Characters />} />
      <Route path="/characters/:id" element={<CharacterDetails />} /> 
      <Route path="/books/:id" element={<BookDetails />} /> 
      <Route path="/houses/:id" element={<HouseDetails />} /> 
      <Route path="/houses" element={<Houses />} />
    </Routes>
  </div>
</BrowserRouter>

  );
}

export default App;
