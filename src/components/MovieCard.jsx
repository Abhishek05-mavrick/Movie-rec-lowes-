
import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

export default function MovieCard({ movie }) {
  return (
    <Link
      className="movie-card"
      to={`/movie/${movie.id}`}
    >
      <img
        src={movie.poster}
        alt={`${movie.title} poster`}
        loading="lazy"
      />

      <div className="movie-card-content">
        <h3>{movie.title}</h3>
        <p>{movie.year} · {movie.genre}</p>
        <Rating value={movie.rating} />
      </div>
    </Link>
  );
}
