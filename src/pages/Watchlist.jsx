
import { Link } from 'react-router-dom';
import { movies } from '../data/movies';
import { useMovieLists } from '../context/MovieListsContext';
import MovieCard from '../components/MovieCard';
import React from 'react';

export default function Watchlist() {
  const { watchlistIds, toggleWatchlist } = useMovieLists();

  const watchlistMovies = movies.filter((movie) =>
    watchlistIds.includes(movie.id)
  );

  return (
    <section>
      <div className="page-heading">
        <h1>Your Watchlist</h1>
        <p>All the movies you want to watch next.</p>
      </div>

      {watchlistMovies.length === 0 ? (
        <div className="empty-state">
          <h2>Your watchlist is empty</h2>
          <p>Discover a movie and add it here for later.</p>
          <Link className="button" to="/">
            Discover Movies
          </Link>
        </div>
      ) : (
        <div className="movie-grid">
          {watchlistMovies.map((movie) => (
            <div key={movie.id} className="saved-movie">
              <MovieCard movie={movie} />

              <button
                type="button"
                className="button"
                onClick={() => toggleWatchlist(movie.id)}
              >
                Remove from Watchlist
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
