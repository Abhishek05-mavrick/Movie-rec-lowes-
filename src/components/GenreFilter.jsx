
import React from 'react';
import { allGenres } from '../services/tmdb';

export default function GenreFilter({
  selectedGenre,
  onGenreChange,
}) {
  return (
    <select
      className="genre-select"
      value={selectedGenre}
      onChange={(event) => onGenreChange(event.target.value)}
      aria-label="Filter movies by genre"
    >
      {allGenres.map((genre) => (
        <option key={genre} value={genre}>
          {genre === 'All' ? 'All genres' : genre}
        </option>
      ))}
    </select>
  );
}
