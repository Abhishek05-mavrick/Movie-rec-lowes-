
import React, { useEffect, useMemo, useState } from 'react';
import SearchBar from '../components/SearchBar';
import GenreFilter from '../components/GenreFilter';
import MovieList from '../components/MovieList';
import {
  getPopularMovies,
  searchMovies,
} from '../services/tmdb';

export default function Home() {
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    const timer = setTimeout(async () => {
      setLoading(true);
      setError('');

      try {
        const result = search.trim()
          ? await searchMovies(search.trim())
          : await getPopularMovies();

        if (!cancelled) {
          setMovies(result.movies);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Failed to load movies.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }, 400);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [search]);

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      return (
        selectedGenre === 'All' ||
        movie.genre === selectedGenre
      );
    });
  }, [movies, selectedGenre]);

  return (
    <main>
      <section className="hero">
        <p className="eyebrow">YOUR NEXT FAVORITE FILM</p>
        <h1>Find stories worth watching.</h1>
        <p>
          Discover popular movies, timeless classics,
          and new favorites from around the world.
        </p>
      </section>

      <section>
        <div className="section-heading">
          <h2>
            {search.trim() ? 'Search results' : 'Popular movies'}
          </h2>
          <span>{filteredMovies.length} movies</span>
        </div>

        <div className="discovery-controls">
          <SearchBar
            search={search}
            onSearch={setSearch}
          />

          <GenreFilter
            selectedGenre={selectedGenre}
            onGenreChange={setSelectedGenre}
          />
        </div>

        {loading && <p>Loading movies...</p>}

        {!loading && error && (
          <p role="alert">
            {error}
            <br />
            Check your API key and internet connection.
          </p>
        )}

        {!loading && !error && filteredMovies.length === 0 && (
          <p>No movies found. Try another title or genre.</p>
        )}

        {!loading && !error && filteredMovies.length > 0 && (
          <MovieList movies={filteredMovies} />
        )}
      </section>
    </main>
  );
}
