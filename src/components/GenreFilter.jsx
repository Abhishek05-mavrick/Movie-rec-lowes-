import React from 'react';

export default function GenreFilter({ genres, value, onChange }) {
  return (
    <label className="genre-filter">
      Genre
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {genres.map((genre) => <option key={genre} value={genre}>{genre}</option>)}
      </select>
    </label>
  );
}
