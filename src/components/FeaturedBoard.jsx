import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

export default function FeaturedBoard({ movies = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const featured = movies.slice(0, 5);
  const activeMovie = featured[activeIndex];

  useEffect(() => {
    if (featured.length < 2) return undefined;
    const timer = setInterval(() => {
      setActiveIndex((index) => (index + 1) % featured.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [featured.length]);

  useEffect(() => {
    if (activeIndex >= featured.length) setActiveIndex(0);
  }, [activeIndex, featured.length]);

  if (!activeMovie) return <section className="hero hero-loading"><p>Curating your next watch...</p></section>;

  return (
    <section className="featured-board" aria-label="Featured movies">
      <img className="featured-backdrop" src={activeMovie.poster} alt="" />
      <div className="featured-overlay" />
      <div className="featured-content">
        <p className="eyebrow">EDITOR'S SPOTLIGHT</p>
        <h1>{activeMovie.title}</h1>
        <div className="featured-meta"><Rating value={activeMovie.rating} /><span>{activeMovie.year}</span><span>{activeMovie.genre}</span></div>
        <p>{activeMovie.description}</p>
        <Link className="button" to={`/movie/${activeMovie.id}`}>View details</Link>
      </div>
      <div className="featured-dots" role="tablist" aria-label="Featured movie slides">
        {featured.map((movie, index) => (
          <button
            aria-label={`Show ${movie.title}`}
            aria-selected={index === activeIndex}
            className={index === activeIndex ? 'featured-dot active' : 'featured-dot'}
            key={movie.id}
            onClick={() => setActiveIndex(index)}
            role="tab"
            type="button"
          />
        ))}
      </div>
    </section>
  );
}
