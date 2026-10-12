import React from 'react';
import MovieCard from './MovieCard';

export default function MovieRail({
  title, subtitle, movies, actions, accent = false,
}) {
  if (!movies?.length) return null;

  return (
    <section className={`movie-rail${accent ? ' movie-rail-accent' : ''}`}>
      <div className="rail-heading">
        <div>
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
        <span className="rail-count">{movies.length} titles</span>
      </div>
      <div className="rail-scroller">
        {movies.map((movie) => (
          <div className="rail-item" key={`${title}-${movie.id}`}>
            <MovieCard movie={movie} {...actions} />
          </div>
        ))}
      </div>
    </section>
  );
}
