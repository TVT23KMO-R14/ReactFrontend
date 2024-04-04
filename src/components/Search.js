
import React from 'react';

const SearchResults = ({ movies, onMovieSelect }) => {
  return (
    <div>
      <h2>Search Results</h2>
      <ul>
        {movies.map(movie => (
          <li key={movie.id} onClick={() => onMovieSelect(movie)}>
            {movie.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;