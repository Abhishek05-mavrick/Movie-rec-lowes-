
import MovieCard from './MovieCard';

export default function MovieList({ movies = [] }) {
  if (movies.length === 0) {
    return (
      <section className="empty-state">
        <h2>No movies found</h2>
        <p>Try another search or select a different genre.</p>
      </section>
    );
  }

  return (
    <section className="movie-grid" aria-label="Movie list">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </section>
  );
}
