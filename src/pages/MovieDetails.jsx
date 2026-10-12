import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { movies } from '../data/movies';
import { getMovieDetails, isTmdbConfigured } from '../api/tmdb';
import Rating from '../components/Rating';
import { useApp } from '../context/AppContext';

export default function MovieDetails() {
  const { movieId } = useParams();
  const movie = movies.find((item) => item.id === Number(movieId));
  const { cachedMovies, isFavorite, isInWatchlist, toggleMovieFavorite, toggleMovieWatchlist } = useApp();
  const [remoteMovie, setRemoteMovie] = useState(null);
  useEffect(() => {
    if (!movie && isTmdbConfigured) getMovieDetails(Number(movieId)).then(setRemoteMovie).catch(() => {});
  }, [movie, movieId]);
  const selectedMovie = movie || cachedMovies.find((item) => item.id === Number(movieId)) || remoteMovie;

  if (!selectedMovie) return <section className="empty-state"><h1>Movie not found</h1><Link className="button" to="/">Back to discover</Link></section>;
  return (
    <article className="details">
      {selectedMovie.poster ? <img src={selectedMovie.poster} alt={`${selectedMovie.title} poster`} /> : <div className="poster-fallback">No poster</div>}
      <div>
        <p className="eyebrow">{selectedMovie.genre} · {selectedMovie.year}</p>
        <h1>{selectedMovie.title}</h1>
        <Rating value={selectedMovie.rating} />
        <p className="details-description">{selectedMovie.description}</p>
        <div className="details-actions">
          <button className="button" type="button" onClick={() => toggleMovieWatchlist(selectedMovie)}>{isInWatchlist(selectedMovie.id) ? 'Remove from watchlist' : 'Add to watchlist'}</button>
          <button className="button secondary-button" type="button" onClick={() => toggleMovieFavorite(selectedMovie)}>{isFavorite(selectedMovie.id) ? 'Remove from favorites' : 'Add to favorites'}</button>
        </div>
      </div>
    </article>
  );
}
