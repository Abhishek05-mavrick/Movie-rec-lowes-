
import { Link, useParams } from 'react-router-dom';
import { movies } from '../data/movies';
import Rating from '../components/Rating';
import { useMovieLists } from '../context/MovieListsContext';
import React from 'react';

export default function MovieDetails() {
  const { movieId } = useParams();
  const movie = movies.find((item) => item.id === Number(movieId));

  const {
    isFavorite,
    isInWatchlist,
    toggleFavorite,
    toggleWatchlist,
  } = useMovieLists();

  if (!movie) {
    return (
      <section className="empty-state">
        <h1>Movie not found</h1>
        <Link className="button" to="/">
          Back to discover
        </Link>
      </section>
    );
  }

  const favorite = isFavorite(movie.id);
  const saved = isInWatchlist(movie.id);

  return (
    <article className="details">
      <img src={movie.poster} alt={`${movie.title} poster`} />

      <div>
        <p className="eyebrow">
          {movie.genre} · {movie.year}
        </p>

        <h1>{movie.title}</h1>

        <Rating value={movie.rating} />

        <p className="details-description">
          {movie.description}
        </p>

        <div className="details-actions">
          <button
            type="button"
            className="button"
            aria-pressed={favorite}
            onClick={() => toggleFavorite(movie.id)}
          >
            {favorite ? '♥ Favorited' : '♡ Add to Favorites'}
          </button>

          <button
            type="button"
            className="button"
            aria-pressed={saved}
            onClick={() => toggleWatchlist(movie.id)}
          >
            {saved ? '✓ In Watchlist' : '+ Add to Watchlist'}
          </button>
        </div>
      </div>
    </article>
  );
}
