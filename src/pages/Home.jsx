import React, { useEffect, useMemo, useRef, useState } from 'react';
import { genres, movies as localMovies } from '../data/movies';
import {
  getMovieRail,
  isTmdbConfigured,
  searchMovies,
} from '../api/tmdb';
import FeaturedBoard from '../components/FeaturedBoard';
import GenreFilter from '../components/GenreFilter';
import Loading from '../components/Loading';
import MovieList from '../components/MovieList';
import MovieRail from '../components/MovieRail';
import SearchBar from '../components/SearchBar';
import { useApp } from '../context/AppContext';

const emptyRails = {
  popular: [],
  topRated: [],
  highestGrossing: [],
  drama: [],
  thriller: [],
};

const mergeMovies = (...collections) => {
  const unique = new Map();
  collections.flat().forEach((movie) => {
    if (movie?.id && !unique.has(movie.id)) unique.set(movie.id, movie);
  });
  return [...unique.values()];
};

export default function Home() {
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('All');
  const [rails, setRails] = useState(emptyRails);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState('');
  const searchRequest = useRef(0);
  const { isFavorite, isInWatchlist, toggleMovieFavorite, toggleMovieWatchlist } = useApp();

  useEffect(() => {
    let isCurrent = true;
    const loadRails = async () => {
      if (!isTmdbConfigured) {
        setRails({
          popular: localMovies,
          topRated: [...localMovies].sort((a, b) => b.rating - a.rating),
          highestGrossing: localMovies.slice(0, 10),
          drama: localMovies.filter((movie) => movie.genre === 'Drama'),
          thriller: localMovies.filter((movie) => movie.genre === 'Horror' || movie.genre === 'Action'),
        });
        setIsLoading(false);
        return;
      }

      try {
        const [popular, topRated, highestGrossing, drama, thriller] = await Promise.all([
          getMovieRail({ sortBy: 'popularity.desc', pages: 2 }),
          getMovieRail({ sortBy: 'vote_average.desc', minimumVotes: 500, pages: 3 }),
          getMovieRail({ sortBy: 'revenue.desc', pages: 3 }),
          getMovieRail({ sortBy: 'popularity.desc', genreId: 18, pages: 3 }),
          getMovieRail({ sortBy: 'popularity.desc', genreId: 53, pages: 3 }),
        ]);
        if (isCurrent) setRails({ popular, topRated, highestGrossing, drama, thriller });
      } catch {
        if (isCurrent) {
          setError('TMDB is temporarily unavailable. Showing the local collection.');
          setRails({ popular: localMovies, topRated: localMovies, highestGrossing: localMovies, drama: localMovies, thriller: localMovies });
        }
      } finally {
        if (isCurrent) setIsLoading(false);
      }
    };
    loadRails();
    return () => { isCurrent = false; };
  }, []);

  useEffect(() => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      setSearchResults([]);
      return undefined;
    }
    const requestId = searchRequest.current + 1;
    searchRequest.current = requestId;
    const timer = setTimeout(async () => {
      setSearchLoading(true);
      setError('');
      try {
        if (isTmdbConfigured) {
          const responses = await Promise.all(
            [1, 2, 3].map((page) => searchMovies(trimmedQuery, page)),
          );
          if (requestId === searchRequest.current) {
            setSearchResults(mergeMovies(...responses.map((response) => response.movies)));
          }
        } else {
          setSearchResults(localMovies.filter((movie) => movie.title.toLowerCase().includes(trimmedQuery.toLowerCase())));
        }
      } catch {
        if (requestId === searchRequest.current) setError('Search is unavailable right now. Try again shortly.');
      } finally {
        if (requestId === searchRequest.current) setSearchLoading(false);
      }
    }, 450);
    return () => clearTimeout(timer);
  }, [query]);

  const actions = {
    isFavorite,
    isInWatchlist,
    onToggleFavorite: toggleMovieFavorite,
    onToggleWatchlist: toggleMovieWatchlist,
  };
  const filteredSearchResults = useMemo(() => (
    genre === 'All' ? searchResults : searchResults.filter((movie) => movie.genre === genre)
  ), [genre, searchResults]);

  return (
    <div className="home-page">
      <FeaturedBoard movies={rails.popular} />
      <section className="discovery-header">
        <div>
          <p className="eyebrow">DISCOVER YOUR NEXT OBSESSION</p>
          <h2>{query.trim() ? `Search results for “${query.trim()}”` : 'Browse the collection'}</h2>
        </div>
        <div className="discovery-controls">
          <SearchBar value={query} onChange={setQuery} onSubmit={(event) => event.preventDefault()} />
          <GenreFilter genres={genres} value={genre} onChange={setGenre} />
        </div>
      </section>
      {error && <p className="form-message form-error" role="alert">{error}</p>}
      {query.trim() ? (
        searchLoading ? <Loading message="Searching TMDB..." /> : <MovieList movies={filteredSearchResults} {...actions} />
      ) : isLoading ? (
        <Loading message="Curating your movie shelves..." />
      ) : (
        <div className="movie-rails">
          <MovieRail title="Trending now" subtitle="What movie fans are watching today" movies={rails.popular} actions={actions} accent />
          <MovieRail title="Top rated" subtitle="Highly rated by the community" movies={rails.topRated} actions={actions} />
          <MovieRail title="Highest grossing" subtitle="The biggest cinematic events" movies={rails.highestGrossing} actions={actions} />
          <MovieRail title="Drama essentials" subtitle="Stories that stay with you" movies={rails.drama} actions={actions} />
          <MovieRail title="Thrillers & suspense" subtitle="Keep your eyes on the screen" movies={rails.thriller} actions={actions} />
        </div>
      )}
    </div>
  );
}
