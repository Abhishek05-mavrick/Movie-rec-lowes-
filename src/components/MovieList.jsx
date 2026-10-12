
import React from 'react';
import MovieCard from './MovieCard';

export default function MovieList({ movies }) {
  if (!movies || movies.length === 0) {
    return (
      <p className="placeholder-card">
        No movies found. Try another search or genre.
      </p>
    );
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
