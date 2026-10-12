import React from 'react';

export default function SearchBar({ value, onChange, onSubmit }) {
  return (
    <form className="search-bar" onSubmit={onSubmit}>
      <input value={value} onChange={(event) => onChange(event.target.value)} placeholder="Search movies..." aria-label="Search movies" />
      {value && <button type="button" onClick={() => onChange('')}>Clear</button>}
      <button className="button" type="submit">Search</button>
    </form>
  );
}
