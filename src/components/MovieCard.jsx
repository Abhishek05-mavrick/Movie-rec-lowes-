
import { Link } from 'react-router-dom';
import Rating from './Rating';
import React from 'react';

export default function MovieCard({ movie }) {
  if (!movie) return null;

  return (
    <article className="movie-card">
      <Link
        to={`/movie/${movie.id}`}
        className="movie-card-link"
        aria-label={`View details for ${movie.title}`}
      >
        <img
          className="movie-poster"
          src={movie.poster}
          alt={`${movie.title} poster`}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src =
              'https://placehold.co/400x600/111827/FFFFFF?text=Poster+Unavailable';
          }}
        />

        <div className="movie-card-content">
          <h3>{movie.title}</h3>
          <p>{movie.genre} · {movie.year}</p>
          <Rating value={movie.rating} />
          <p className="movie-card-description">
            {movie.description}
          </p>
        </div>
      </Link>
    </article>
  );
}
