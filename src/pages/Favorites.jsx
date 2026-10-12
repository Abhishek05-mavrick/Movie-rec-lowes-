
import { Link } from 'react-router-dom';
import { movies } from '../data/movies';
import { useMovieLists } from '../context/MovieListsContext';
import MovieCard from '../components/MovieCard';
import React from 'react';

export default function Favorites() {
  const { favoriteIds, toggleFavorite } = useMovieLists();

  const favoriteMovies = movies.filter((movie) =>
    favoriteIds.includes(movie.id)
  );

  return (
    <section>
      <div className="page-heading">
        <h1>Your Favorites</h1>
        <p>Movies you love, all in one place.</p>
      </div>

      {favoriteMovies.length === 0 ? (
        <div className="empty-state">
          <h2>No favorites yet</h2>
          <p>Explore movies and save the ones you love.</p>
          <Link className="button" to="/">
            Discover Movies
          </Link>
        </div>
      ) : (
        <div className="movie-grid">
          {favoriteMovies.map((movie) => (
            <div key={movie.id} className="saved-movie">
              <MovieCard movie={movie} />

              <button
                type="button"
                className="button"
                onClick={() => toggleFavorite(movie.id)}
              >
                Remove from Favorites
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
