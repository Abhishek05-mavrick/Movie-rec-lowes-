import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

export default function MovieCard({
  movie, isFavorite, isInWatchlist, onToggleFavorite, onToggleWatchlist,
}) {
  return (
    <article className="movie-card">
      <Link to={`/movie/${movie.id}`} className="movie-card-link" aria-label={`View details for ${movie.title}`}>
        {movie.poster ? (
          <img className="movie-poster" src={movie.poster} alt={`${movie.title} poster`} loading="lazy" />
        ) : <div className="poster-fallback">No poster</div>}
        <div className="movie-card-content">
          <h3>{movie.title}</h3>
          <p>{movie.genre} · {movie.year || 'Year unknown'}</p>
          <Rating value={movie.rating} />
        </div>
      </Link>
      <div className="movie-card-actions">
        <button type="button" onClick={() => onToggleFavorite(movie)}>
          {isFavorite ? '♥ Saved' : '♡ Favorite'}
        </button>
        <button type="button" onClick={() => onToggleWatchlist(movie)}>
          {isInWatchlist ? '✓ Listed' : '+ Watchlist'}
        </button>
      </div>
    </article>
  );
}
