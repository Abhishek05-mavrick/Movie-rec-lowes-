
import React from 'react';

export default function SearchBar({ search, onSearch }) {
  return (
    <input
      type="search"
      className="search-input"
      placeholder="Search movies by title..."
      aria-label="Search movies by title"
      value={search}
      onChange={(event) => onSearch(event.target.value)}
    />
  );
}
