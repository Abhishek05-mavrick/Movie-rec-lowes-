import { Link } from 'react-router-dom';
import { movies } from '../data/movies';
import Rating from '../components/Rating';
import React from 'react';

export default function Home() {
  return (
    <div>
      <section className="hero">
        <p className="eyebrow">YOUR NEXT FAVORITE FILM</p>
        <h1>Find stories worth watching.</h1>
        <p>Browse a hand-picked collection of films, from timeless classics to modern masterpieces.</p>
      </section>
      <section>
        <div className="section-heading">
          <h2>Featured movies</h2>
          <span>{movies.length} movies</span>
        </div>
        <div className="movie-grid">
          {movies.map((movie) => (
            <Link className="movie-card" to={`/movie/${movie.id}`} key={movie.id}>
              <img src={movie.poster} alt={`${movie.title} poster`} />
              <div className="movie-card-content">
                <h3>{movie.title}</h3>
                <p>{movie.year} · {movie.genre}</p>
                <Rating value={movie.rating} />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
