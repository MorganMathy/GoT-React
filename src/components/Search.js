import React from 'react';

const Search = ({ value, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="input-group mb-3">
        {/* Champ de saisie de recherche */}
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          value={value}
          onChange={onChange}
        />
        
        {/* Bouton de recherche */}
        <button className="btn btn-primary" type="submit">
          Search
        </button>
      </div>
    </form>
  );
}

export default Search;
